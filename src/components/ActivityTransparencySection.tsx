import { motion } from "motion/react";
import { ExternalLink, MessageCircle, RefreshCw, ShieldCheck, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type StatusKey =
  | "todo"
  | "in_progress"
  | "review_feedback"
  | "ready_validation"
  | "ready_handover"
  | "unknown";

type ActivityEntry = {
  id: string;
  source: "project" | "discussion";
  sourceType: string;
  title: string;
  url: string;
  number: number | null;
  state: string;
  status: string;
  statusKey: StatusKey;
  updatedAt: string;
  repository: string | null;
  labels: string[];
  comments?: number;
};

type FunnelStage = {
  key: StatusKey;
  label: string;
  count: number;
};

type ActivityPayload = {
  generatedAt: string;
  owner: string;
  discussionRepo: string;
  project: {
    number: number;
    title: string;
    url: string;
  };
  funnel: FunnelStage[];
  projectItems: ActivityEntry[];
  discussions: ActivityEntry[];
  warnings: string[];
};

const FALLBACK_DATA: ActivityPayload = {
  generatedAt: "2026-04-07T03:00:00.000Z",
  owner: "roiskhoiron",
  discussionRepo: "roiskhoiron/.github",
  project: {
    number: 9,
    title: "Public Activity Board",
    url: "https://github.com/users/roiskhoiron/projects/9",
  },
  funnel: [
    { key: "todo", label: "Todo", count: 2 },
    { key: "in_progress", label: "In Progress", count: 1 },
    { key: "review_feedback", label: "Review/Feedback", count: 1 },
    { key: "ready_validation", label: "Ready to Validation", count: 1 },
    { key: "ready_handover", label: "Ready to Handover", count: 1 },
    { key: "unknown", label: "Unmapped", count: 0 },
  ],
  projectItems: [
    {
      id: "demo-1",
      source: "project",
      sourceType: "Issue",
      title: "Publish daily sprint recap page",
      url: "https://github.com/users/roiskhoiron/projects/9",
      number: 1,
      state: "OPEN",
      status: "In Progress",
      statusKey: "in_progress",
      updatedAt: "2026-04-07T02:30:00.000Z",
      repository: "roiskhoiron/roiskhoiron.github.io",
      labels: ["daily", "public"],
    },
  ],
  discussions: [
    {
      id: "discussion-demo-1",
      source: "discussion",
      sourceType: "Discussion",
      title: "What activity detail do you want to see every day?",
      url: "https://github.com/roiskhoiron/.github/discussions",
      number: 1,
      state: "OPEN",
      status: "Ideas",
      statusKey: "review_feedback",
      updatedAt: "2026-04-07T02:00:00.000Z",
      repository: "roiskhoiron/.github",
      labels: ["feedback"],
      comments: 3,
    },
  ],
  warnings: [],
};

const STATUS_ORDER: StatusKey[] = [
  "todo",
  "in_progress",
  "review_feedback",
  "ready_validation",
  "ready_handover",
];

const STAGE_META: Record<StatusKey, {
  text: string;
  dot: string;
  line: string;
  ring: string;
  cardBorder: string;
  chip: string;
}> = {
  todo: {
    text: "text-teal-500 dark:text-teal-300",
    dot: "bg-teal-500",
    line: "bg-teal-500",
    ring: "ring-teal-500/45",
    cardBorder: "border-teal-400/40",
    chip: "bg-teal-500/10 text-teal-700 dark:text-teal-300 border-teal-500/25",
  },
  in_progress: {
    text: "text-amber-500 dark:text-amber-300",
    dot: "bg-amber-500",
    line: "bg-amber-500",
    ring: "ring-amber-500/45",
    cardBorder: "border-amber-400/40",
    chip: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/25",
  },
  review_feedback: {
    text: "text-fuchsia-500 dark:text-fuchsia-300",
    dot: "bg-fuchsia-500",
    line: "bg-fuchsia-500",
    ring: "ring-fuchsia-500/45",
    cardBorder: "border-fuchsia-400/40",
    chip: "bg-fuchsia-500/10 text-fuchsia-700 dark:text-fuchsia-300 border-fuchsia-500/25",
  },
  ready_validation: {
    text: "text-sky-500 dark:text-sky-300",
    dot: "bg-sky-500",
    line: "bg-sky-500",
    ring: "ring-sky-500/45",
    cardBorder: "border-sky-400/40",
    chip: "bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/25",
  },
  ready_handover: {
    text: "text-lime-600 dark:text-lime-300",
    dot: "bg-lime-600 dark:bg-lime-500",
    line: "bg-lime-600 dark:bg-lime-500",
    ring: "ring-lime-500/45",
    cardBorder: "border-lime-500/40",
    chip: "bg-lime-500/10 text-lime-700 dark:text-lime-300 border-lime-500/25",
  },
  unknown: {
    text: "text-slate-500 dark:text-slate-300",
    dot: "bg-slate-500",
    line: "bg-slate-500",
    ring: "ring-slate-500/40",
    cardBorder: "border-slate-400/40",
    chip: "bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/25",
  },
};

function formatDate(dateString: string) {
  try {
    return new Date(dateString).toLocaleString("id-ID", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return dateString;
  }
}

function sourceLabel(item: ActivityEntry) {
  if (item.sourceType === "Issue") return "Issue";
  if (item.sourceType === "PullRequest") return "Pull Request";
  if (item.sourceType === "DraftIssue") return "Draft";
  return item.sourceType;
}

export function ActivityTransparencySection() {
  const [data, setData] = useState<ActivityPayload>(FALLBACK_DATA);
  const [loading, setLoading] = useState(true);
  const [activeStage, setActiveStage] = useState<StatusKey>("todo");

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      try {
        const response = await fetch("/data/activity.json", { cache: "no-store" });
        if (!response.ok) throw new Error("Failed to load activity data");
        const json = (await response.json()) as ActivityPayload;
        if (mounted) setData(json);
      } catch {
        if (mounted) setData(FALLBACK_DATA);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadData();
    return () => {
      mounted = false;
    };
  }, []);

  const stageEntries = useMemo(() => {
    const map = new Map<StatusKey, ActivityEntry[]>();
    for (const key of STATUS_ORDER) map.set(key, []);

    const sorted = [...data.projectItems].sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );

    for (const item of sorted) {
      if (map.has(item.statusKey)) map.get(item.statusKey)?.push(item);
    }

    return map;
  }, [data.projectItems]);

  const timelineStages = useMemo(
    () =>
      STATUS_ORDER.map((key) => ({
        key,
        label: data.funnel.find((stage) => stage.key === key)?.label || key,
        count: data.funnel.find((stage) => stage.key === key)?.count || 0,
        items: stageEntries.get(key) || [],
      })),
    [data.funnel, stageEntries],
  );

  useEffect(() => {
    const firstWithData = timelineStages.find((stage) => stage.items.length > 0)?.key || "todo";
    setActiveStage(firstWithData);
  }, [timelineStages]);

  const activeItems = stageEntries.get(activeStage) || [];
  const activeLabel = timelineStages.find((stage) => stage.key === activeStage)?.label || "Stage";
  const openDiscussions = data.discussions.filter((discussion) => discussion.state === "OPEN").slice(0, 4);

  return (
    <section id="activity" className="py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.08] bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.2),transparent_55%)]" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-teal-600 dark:text-teal-300">
            <ShieldCheck className="h-3.5 w-3.5" />
            Live Activity Flow
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl tracking-tight text-slate-900 dark:text-white">
            Timeline transparansi kerja
          </h2>
          <p className="mt-3 max-w-3xl text-slate-600 dark:text-slate-400">
            Desain timeline ini mengikuti format slide klasik: node di garis tengah, callout bergantian atas-bawah,
            dan interaksi hover untuk membuka detail item per langkah.
          </p>
        </motion.div>

        <div className="rounded-3xl border border-slate-200 dark:border-white/[0.08] bg-white/85 dark:bg-[#090d1a]/80 backdrop-blur-sm p-5 md:p-7">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">Sync</p>
              <p className="text-sm text-slate-700 dark:text-slate-300">{formatDate(data.generatedAt)}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={data.project.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300/70 dark:border-white/[0.12] px-3 py-1.5 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors"
              >
                Lihat Project <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href={`https://github.com/${data.discussionRepo}/discussions`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-teal-600 hover:bg-teal-500 px-3 py-1.5 text-xs text-white transition-colors"
              >
                Ikut Diskusi <MessageCircle className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="hidden md:block relative h-[380px] mb-8">
            <div className="absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 bg-slate-300/85 dark:bg-white/[0.18]" />
            <div className="grid grid-cols-5 h-full">
              {timelineStages.map((stage, index) => {
                const isTop = index % 2 === 1;
                const isActive = activeStage === stage.key;
                const meta = STAGE_META[stage.key];

                return (
                  <div
                    key={stage.key}
                    className="relative"
                    onMouseEnter={() => setActiveStage(stage.key)}
                    onFocus={() => setActiveStage(stage.key)}
                  >
                    <motion.button
                      type="button"
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: index * 0.07 }}
                      onClick={() => setActiveStage(stage.key)}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                    >
                      <span className="relative block">
                        <span className={`absolute inset-0 rounded-full ring-1 ${meta.ring} scale-[1.75]`} />
                        <span className={`absolute inset-0 rounded-full ring-1 ${meta.ring} scale-[2.35]`} />
                        <span
                          className={`block h-5 w-5 rounded-full border-2 border-white/90 dark:border-[#090d1a] ${meta.dot} ${
                            isActive ? "scale-110" : ""
                          } transition-transform`}
                        />
                      </span>
                    </motion.button>

                    <span
                      className={`absolute left-1/2 -translate-x-1/2 w-[2px] h-20 ${meta.line} ${
                        isTop ? "top-[calc(50%-80px)]" : "top-1/2"
                      }`}
                    />
                    <span
                      className={`absolute left-1/2 -translate-x-1/2 h-3 w-3 rounded-full ${meta.dot} ${
                        isTop ? "top-[calc(50%-88px)]" : "top-[calc(50%+80px)]"
                      }`}
                    />

                    <motion.button
                      type="button"
                      onClick={() => setActiveStage(stage.key)}
                      className={`absolute left-1/2 -translate-x-1/2 w-[180px] rounded-xl border bg-white/90 dark:bg-[#0d1424]/90 p-3 text-left transition-all ${
                        isTop ? "top-[36px]" : "bottom-[36px]"
                      } ${meta.cardBorder} ${isActive ? "shadow-lg scale-[1.02]" : "hover:scale-[1.01]"}`}
                      initial={{ opacity: 0, y: isTop ? -10 : 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: index * 0.07 + 0.05 }}
                    >
                      <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                        Step {index + 1}
                      </p>
                      <p className={`mt-1 text-lg leading-none ${meta.text}`}>{stage.count}</p>
                      <p className="mt-1 text-sm text-slate-900 dark:text-white leading-tight">{stage.label}</p>
                    </motion.button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="md:hidden mb-5 grid grid-cols-2 gap-2">
            {timelineStages.map((stage, index) => {
              const isActive = activeStage === stage.key;
              const meta = STAGE_META[stage.key];
              return (
                <button
                  key={stage.key}
                  type="button"
                  onClick={() => setActiveStage(stage.key)}
                  className={`rounded-xl border p-3 text-left transition ${meta.cardBorder} ${
                    isActive ? "bg-white dark:bg-white/[0.07]" : "bg-slate-50 dark:bg-white/[0.02]"
                  }`}
                >
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Step {index + 1}</p>
                  <p className="text-sm text-slate-900 dark:text-white">{stage.label}</p>
                  <p className={`text-lg ${meta.text}`}>{stage.count}</p>
                </button>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-4">
            <motion.div
              key={activeStage}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-slate-50/70 dark:bg-slate-900/30 p-4 md:p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg text-slate-900 dark:text-white tracking-tight">{activeLabel} Items</h3>
                {loading && <RefreshCw className="w-4 h-4 text-slate-400 animate-spin" />}
              </div>

              <div className="space-y-2.5">
                {activeItems.length === 0 && (
                  <p className="text-sm text-slate-500 dark:text-slate-400">Belum ada item pada stage ini.</p>
                )}
                {activeItems.map((item) => {
                  const meta = STAGE_META[item.statusKey] || STAGE_META.unknown;
                  return (
                    <a
                      key={item.id}
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group block rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.03] p-3 hover:border-cyan-300 dark:hover:border-cyan-500/40 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm text-slate-900 dark:text-white leading-snug group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors">
                            {item.title}
                          </p>
                          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                            {item.repository || "Public board"}
                            {item.number ? ` • #${item.number}` : ""} • {formatDate(item.updatedAt)}
                          </p>
                        </div>
                        <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] ${meta.chip}`}>
                          {sourceLabel(item)}
                        </span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </motion.div>

            <aside className="rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] p-4 md:p-5">
              <h3 className="text-lg text-slate-900 dark:text-white tracking-tight">Audience Signal</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Diskusi terbuka terbaru dari publik.</p>

              <div className="mt-4 space-y-2.5">
                {openDiscussions.length === 0 && (
                  <p className="text-sm text-slate-500 dark:text-slate-400">Belum ada diskusi open.</p>
                )}
                {openDiscussions.map((discussion) => (
                  <a
                    key={discussion.id}
                    href={discussion.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group block rounded-xl border border-slate-200 dark:border-white/[0.08] bg-slate-50/70 dark:bg-slate-900/30 p-3 hover:border-teal-300 dark:hover:border-teal-500/40 transition-colors"
                  >
                    <p className="text-sm text-slate-900 dark:text-white group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-colors leading-snug">
                      {discussion.title}
                    </p>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      {discussion.comments || 0} komentar • {formatDate(discussion.updatedAt)}
                    </p>
                  </a>
                ))}
              </div>

              <div className="mt-4 rounded-xl border border-cyan-200/80 dark:border-cyan-500/30 bg-gradient-to-br from-cyan-50 to-emerald-50 dark:from-cyan-500/10 dark:to-emerald-500/10 p-3">
                <p className="text-xs uppercase tracking-[0.12em] text-cyan-700 dark:text-cyan-300 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" />
                  Open Collaboration
                </p>
                <p className="mt-1 text-sm text-slate-700 dark:text-slate-200">
                  Alur kerja publik ini sengaja dibuat agar siapa pun bisa memberi feedback langsung di setiap tahapan.
                </p>
              </div>
            </aside>
          </div>
        </div>

        {data.warnings.length > 0 && (
          <div className="mt-4 rounded-lg border border-amber-200/80 bg-amber-50 px-3 py-2 text-xs text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300">
            {data.warnings.join(" | ")}
          </div>
        )}
      </div>
    </section>
  );
}
