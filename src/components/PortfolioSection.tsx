import { motion } from "motion/react";
import { useState } from "react";
import {
  Mic,
  Sparkles,
  Zap,
  MessageSquare,
  Layers,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

const projects = [
  {
    id: 1,
    tag: "On-Device AI",
    icon: Mic,
    color: "blue",
    title: "VoiceNav AI",
    subtitle: "Hands-free navigation for mobile workers",
    problem:
      "Navigation requires eyes on screen while driving or operating in hands-busy environments.",
    approach:
      "On-device speech recognition + intent classification running fully offline.",
    aiCapability: "Offline NLP, intent detection, contextual command parsing",
    impact: "70% reduction in screen interaction while driving",
    tags: ["TFLite", "Flutter", "On-Device NLP"],
  },
  {
    id: 2,
    tag: "Personalized UX",
    icon: Sparkles,
    color: "violet",
    title: "StyleSense",
    subtitle: "Visual personalization engine for e-commerce",
    problem: "Fashion apps serve generic recommendations that ignore individual taste evolution.",
    approach:
      "Computer vision + behavioral tracking to build real-time preference profiles.",
    aiCapability: "Visual similarity models, preference learning, behavioral AI",
    impact: "3× higher conversion rate vs. rule-based recommendations",
    tags: ["ML Kit", "Android Compose", "Behavioral AI"],
  },
  {
    id: 3,
    tag: "Edge Inference",
    icon: Zap,
    color: "cyan",
    title: "EdgeVision",
    subtitle: "Real-time object detection at the edge",
    problem:
      "Cloud AI introduces latency and raises privacy concerns for sensitive mobile contexts.",
    approach:
      "Optimized TFLite models with int8 quantization running sub-50ms on mid-range devices.",
    aiCapability: "Model quantization, edge ML, hardware acceleration",
    impact: "<50ms inference latency on entry-level hardware",
    tags: ["TFLite", "NNAPI", "Model Optimization"],
  },
  {
    id: 4,
    tag: "Embedded Assistant",
    icon: MessageSquare,
    color: "emerald",
    title: "ContextBot",
    subtitle: "App-aware AI assistant that reduces support burden",
    problem:
      "Users abandon apps at critical moments when they encounter friction or confusion.",
    approach:
      "LLM-powered assistant with deep awareness of current app state and user journey.",
    aiCapability: "LLM integration, context injection, retrieval-augmented guidance",
    impact: "45% reduction in support ticket volume post-launch",
    tags: ["OpenAI API", "Flutter", "RAG", "State-Aware AI"],
  },
  {
    id: 5,
    tag: "Multimodal Interaction",
    icon: Layers,
    color: "rose",
    title: "MultiSense",
    subtitle: "Unified voice + text + vision input layer",
    problem:
      "Single-modal input limits accessibility and increases friction for complex mobile workflows.",
    approach:
      "Unified multimodal processing pipeline that interprets voice, text, and camera inputs together.",
    aiCapability: "Vision-language models, audio processing, multimodal fusion",
    impact: "60% increase in task completion rate for accessibility users",
    tags: ["Gemini API", "Flutter", "Camera ML", "Whisper"],
  },
];

const colorMap: Record<string, { bg: string; border: string; text: string; dot: string; tag: string }> = {
  blue: {
    bg: "bg-blue-500/8 dark:bg-blue-500/10",
    border: "hover:border-blue-400/40 dark:hover:border-blue-500/30",
    text: "text-blue-600 dark:text-blue-400",
    dot: "bg-blue-500",
    tag: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  },
  violet: {
    bg: "bg-violet-500/8 dark:bg-violet-500/10",
    border: "hover:border-violet-400/40 dark:hover:border-violet-500/30",
    text: "text-violet-600 dark:text-violet-400",
    dot: "bg-violet-500",
    tag: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
  },
  cyan: {
    bg: "bg-cyan-500/8 dark:bg-cyan-500/10",
    border: "hover:border-cyan-400/40 dark:hover:border-cyan-500/30",
    text: "text-cyan-600 dark:text-cyan-400",
    dot: "bg-cyan-500",
    tag: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
  },
  emerald: {
    bg: "bg-emerald-500/8 dark:bg-emerald-500/10",
    border: "hover:border-emerald-400/40 dark:hover:border-emerald-500/30",
    text: "text-emerald-600 dark:text-emerald-400",
    dot: "bg-emerald-500",
    tag: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  },
  rose: {
    bg: "bg-rose-500/8 dark:bg-rose-500/10",
    border: "hover:border-rose-400/40 dark:hover:border-rose-500/30",
    text: "text-rose-600 dark:text-rose-400",
    dot: "bg-rose-500",
    tag: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
  },
};

export function PortfolioSection() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="projects" className="py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.07] dark:opacity-[0.1]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(99,102,241,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-xs uppercase tracking-[0.15em] text-blue-500 dark:text-blue-400">
            AI-Native Projects
          </span>
          <h2 className="text-4xl sm:text-5xl tracking-tight text-slate-900 dark:text-white mt-3 leading-tight">
            Where Mobile Meets
            <span className="block bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
              Applied Intelligence
            </span>
          </h2>
          <p className="text-slate-500 dark:text-slate-500 mt-4 max-w-xl">
            Industry-direction projects exploring the intersection of on-device AI,
            LLM integration, and human-centered mobile UX.
          </p>
        </motion.div>

        {/* Project grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {projects.map((project, i) => {
            const colors = colorMap[project.color];
            const isExpanded = expanded === project.id;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                layout
                className={`group relative rounded-2xl border border-slate-200 dark:border-white/[0.07] ${colors.border} bg-white dark:bg-white/[0.02] p-6 cursor-pointer transition-all duration-200 hover:shadow-lg dark:hover:shadow-none hover:-translate-y-0.5 ${
                  i === 4 ? "md:col-span-2 xl:col-span-1" : ""
                }`}
                onClick={() => setExpanded(isExpanded ? null : project.id)}
              >
                {/* Category tag */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border ${colors.tag}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                    {project.tag}
                  </span>
                  <motion.div
                    animate={{ rotate: isExpanded ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRight className={`w-4 h-4 ${colors.text} opacity-50`} />
                  </motion.div>
                </div>

                {/* Icon + Title */}
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className={`w-9 h-9 rounded-lg ${colors.bg} flex items-center justify-center flex-shrink-0`}
                  >
                    <project.icon className={`w-4 h-4 ${colors.text}`} />
                  </div>
                  <div>
                    <h3 className="text-slate-900 dark:text-white tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-500 mt-0.5">
                      {project.subtitle}
                    </p>
                  </div>
                </div>

                {/* Problem */}
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                  <span className="text-slate-400 dark:text-slate-600 text-xs uppercase tracking-wider">Problem — </span>
                  {project.problem}
                </p>

                {/* Expanded detail */}
                <motion.div
                  initial={false}
                  animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-white/[0.05]">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-slate-400 dark:text-slate-600 mb-1">
                        Approach
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{project.approach}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-slate-400 dark:text-slate-600 mb-1">
                        AI Capability
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{project.aiCapability}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-slate-400 dark:text-slate-600 mb-1">
                        User Impact
                      </p>
                      <p className={`text-sm ${colors.text}`}>{project.impact}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/[0.04] text-slate-500 dark:text-slate-500 border border-slate-200 dark:border-white/[0.06]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Expand hint */}
                {!isExpanded && (
                  <div className={`absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity`}>
                    <span className={`text-xs ${colors.text} flex items-center gap-1`}>
                      Details <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        <p className="text-center text-xs text-slate-400 dark:text-slate-600 mt-8">
          Click any card to explore Problem → Approach → AI Capability → Impact
        </p>
      </div>
    </section>
  );
}
