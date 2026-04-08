import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { BookOpenText, ExternalLink, CalendarDays, RefreshCw } from "lucide-react";
import { useLanguage, type Language } from "../contexts/LanguageContext";

type MediumItem = {
  title: string;
  pubDate: string;
  link: string;
  thumbnail?: string;
  description?: string;
  categories?: string[];
};

type MediumResponse = {
  status: string;
  items?: MediumItem[];
};

type Article = {
  title: string;
  date: string;
  link: string;
  thumbnail: string | null;
  excerpt: string;
  categories: string[];
};

const MEDIUM_RSS = "https://medium.com/feed/@rois.khoiron";
const RSS_TO_JSON = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(MEDIUM_RSS)}`;

const copy: Record<Language, {
  tag: string;
  titleTop: string;
  titleBottom: string;
  description: string;
  readArticle: string;
  viewAll: string;
  loading: string;
  empty: string;
  failed: string;
}> = {
  id: {
    tag: "Karya Tulis",
    titleTop: "Tulisan dari",
    titleBottom: "Medium",
    description: "Beberapa artikel terbaru saya tentang engineering, AI, product thinking, dan pengalaman membangun software nyata.",
    readArticle: "Baca artikel",
    viewAll: "Lihat semua di Medium",
    loading: "Memuat artikel terbaru...",
    empty: "Belum ada artikel yang bisa ditampilkan saat ini.",
    failed: "Gagal memuat artikel. Silakan buka profil Medium saya langsung.",
  },
  en: {
    tag: "Writing",
    titleTop: "Articles from",
    titleBottom: "Medium",
    description: "A selection of my latest articles on engineering, AI, product thinking, and building real-world software.",
    readArticle: "Read article",
    viewAll: "View all on Medium",
    loading: "Loading latest articles...",
    empty: "No articles are available to display right now.",
    failed: "Failed to load articles. Please visit my Medium profile directly.",
  },
  zh: {
    tag: "写作",
    titleTop: "来自",
    titleBottom: "Medium 的文章",
    description: "这里展示我关于工程、AI、产品思维与真实软件实践的最新文章。",
    readArticle: "阅读文章",
    viewAll: "在 Medium 查看全部",
    loading: "正在加载最新文章...",
    empty: "当前没有可展示的文章。",
    failed: "文章加载失败，请直接访问我的 Medium 主页。",
  },
  ja: {
    tag: "執筆",
    titleTop: "Medium の",
    titleBottom: "記事",
    description: "エンジニアリング、AI、プロダクト思考、実践的な開発に関する最新記事を紹介します。",
    readArticle: "記事を読む",
    viewAll: "Mediumですべて見る",
    loading: "最新記事を読み込み中...",
    empty: "現在表示できる記事がありません。",
    failed: "記事の読み込みに失敗しました。Mediumプロフィールをご覧ください。",
  },
};

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function toExcerpt(html: string | undefined, max = 150) {
  const text = stripHtml(html || "");
  if (text.length <= max) return text;
  return `${text.slice(0, max).trim()}...`;
}

function localeByLanguage(language: Language) {
  if (language === "id") return "id-ID";
  if (language === "zh") return "zh-CN";
  if (language === "ja") return "ja-JP";
  return "en-US";
}

export function MediumArticlesSection() {
  const { language } = useLanguage();
  const text = copy[language];
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let mounted = true;

    const loadArticles = async () => {
      try {
        const response = await fetch(RSS_TO_JSON, { cache: "no-store" });
        if (!response.ok) throw new Error(`RSS fetch failed: ${response.status}`);

        const json = (await response.json()) as MediumResponse;
        if (json.status !== "ok") throw new Error("Medium API status is not ok");

        const mapped = (json.items || []).slice(0, 6).map((item) => ({
          title: item.title,
          date: item.pubDate,
          link: item.link,
          thumbnail: item.thumbnail || null,
          excerpt: toExcerpt(item.description, 170),
          categories: (item.categories || []).slice(0, 3),
        }));

        if (mounted) {
          setArticles(mapped);
          setFailed(false);
        }
      } catch {
        if (mounted) {
          setFailed(true);
          setArticles([]);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadArticles();
    return () => {
      mounted = false;
    };
  }, []);

  const locale = useMemo(() => localeByLanguage(language), [language]);

  return (
    <section id="writing" className="py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-slate-50/50 dark:bg-white/[0.015]" />
        <div className="absolute left-1/3 top-0 w-[520px] h-[520px] bg-sky-500/5 dark:bg-sky-600/8 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-xs uppercase tracking-[0.15em] text-blue-500 dark:text-blue-400 inline-flex items-center gap-1.5">
            <BookOpenText className="w-3.5 h-3.5" />
            {text.tag}
          </span>
          <h2 className="text-4xl sm:text-5xl tracking-tight text-slate-900 dark:text-white mt-3 leading-tight">
            {text.titleTop}
            <span className="block bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
              {text.titleBottom}
            </span>
          </h2>
          <p className="text-slate-500 dark:text-slate-500 mt-4 max-w-2xl">{text.description}</p>
        </motion.div>

        {loading && (
          <div className="rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] p-6 text-sm text-slate-600 dark:text-slate-400 inline-flex items-center gap-2">
            <RefreshCw className="w-4 h-4 animate-spin" />
            {text.loading}
          </div>
        )}

        {!loading && !failed && articles.length === 0 && (
          <p className="text-sm text-slate-500 dark:text-slate-400">{text.empty}</p>
        )}

        {!loading && failed && (
          <div className="rounded-2xl border border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10 p-5">
            <p className="text-sm text-amber-700 dark:text-amber-300">{text.failed}</p>
          </div>
        )}

        {!loading && articles.length > 0 && (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {articles.map((article, index) => (
              <motion.article
                key={article.link}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
                className="rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] overflow-hidden flex flex-col"
              >
                {article.thumbnail ? (
                  <img src={article.thumbnail} alt={article.title} className="w-full h-44 object-cover" />
                ) : (
                  <div className="h-44 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-white/[0.04] dark:to-white/[0.02] flex items-center justify-center">
                    <BookOpenText className="w-8 h-8 text-slate-400" />
                  </div>
                )}

                <div className="p-5 flex-1 flex flex-col">
                  <div className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-2">
                    <CalendarDays className="w-3.5 h-3.5" />
                    {new Date(article.date).toLocaleDateString(locale, {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    })}
                  </div>

                  <h3 className="text-slate-900 dark:text-white tracking-tight leading-snug mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3 mb-4">
                    {article.excerpt}
                  </p>

                  {article.categories.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {article.categories.map((category) => (
                        <span
                          key={category}
                          className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/[0.05] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/[0.06]"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  )}

                  <a
                    href={article.link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-auto inline-flex items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
                  >
                    {text.readArticle}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        <div className="mt-8">
          <a
            href="https://medium.com/@rois.khoiron"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 dark:border-white/[0.12] text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors"
          >
            {text.viewAll}
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
