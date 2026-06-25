import { motion } from "motion/react";
import { useState } from "react";
import {
  Mic,
  Zap,
  Layers,
  ShoppingCart,
  Code2,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { useLanguage, type Language } from "@/contexts/LanguageContext";

const copy: Record<Language, {
  sectionTag: string;
  titleTop: string;
  titleBottom: string;
  description: string;
  problem: string;
  approach: string;
  capability: string;
  impact: string;
  details: string;
  tabs: { production: string; openSource: string; research: string };
}> = {
  id: {
    sectionTag: "Proyek & Portofolio",
    titleTop: "Produksi, Open Source,",
    titleBottom: "& Riset",
    description: "Dari sistem produksi yang melayani pengguna nyata, kontribusi open source, hingga eksplorasi teknologi masa depan.",
    problem: "Masalah",
    approach: "Pendekatan",
    capability: "Kemampuan AI",
    impact: "Dampak Pengguna",
    details: "Detail",
    tabs: { production: "Produksi", openSource: "Open Source", research: "Riset" },
  },
  en: {
    sectionTag: "Projects & Portfolio",
    titleTop: "Production, Open Source,",
    titleBottom: "& Research",
    description: "From production systems serving real users to open source contributions and technology exploration.",
    problem: "Problem",
    approach: "Approach",
    capability: "AI Capability",
    impact: "User Impact",
    details: "Details",
    tabs: { production: "Production", openSource: "Open Source", research: "Research" },
  },
  zh: {
    sectionTag: "项目与作品集",
    titleTop: "生产、开源",
    titleBottom: "与研究",
    description: "从服务真实用户的生产系统，到开源贡献与技术探索。",
    problem: "问题",
    approach: "方案",
    capability: "AI 能力",
    impact: "用户影响",
    details: "详情",
    tabs: { production: "生产", openSource: "开源", research: "研究" },
  },
  ja: {
    sectionTag: "プロジェクト & ポートフォリオ",
    titleTop: "本番、オープンソース、",
    titleBottom: "＆研究",
    description: "実際のユーザーを支える本番システムから、オープンソース貢献、技術探求まで。",
    problem: "課題",
    approach: "アプローチ",
    capability: "AI能力",
    impact: "ユーザー影響",
    details: "詳細",
    tabs: { production: "本番", openSource: "オープンソース", research: "研究" },
  },
};

type ProjectItem = {
  id: number;
  category: "production" | "openSource" | "research";
  tag: string;
  icon: typeof Mic;
  color: string;
  title: string;
  subtitle: string;
  problem: string;
  approach: string;
  aiCapability?: string;
  impact: string;
  tags: string[];
};

const projectData: Record<Language, ProjectItem[]> = {
  id: [
    {
      id: 1,
      category: "production",
      tag: "ChefGenie",
      icon: Layers,
      color: "cyan",
      title: "ChefGenie",
      subtitle: "AI-Kitchen Companion App",
      problem: "Kesulitan dalam manajemen dapur, resep, dan inventaris bahan makanan secara efisien.",
      approach: "Mengembangkan aplikasi AI companion untuk dapur dengan fitur rekomendasi resep, pelacakan stok, dan meal planning.",
      impact: "Produksi aktif — sistem keputusan dapur berbasis AI",
      tags: ["Flutter", "OpenAI API", "Firebase", "TFLite"],
    },
    {
      id: 2,
      category: "production",
      tag: "EnB Mobile Care",
      icon: ShoppingCart,
      color: "blue",
      title: "Trade-In System (Erajaya)",
      subtitle: "Platform tukar tambah untuk 200+ outlet",
      problem: "Proses trade-in manual tidak efisien dan rawan error di ratusan outlet ritel.",
      approach: "Membangun ekosistem aplikasi Android untuk trade-in online, validasi otomatis, dan monitoring outlet.",
      impact: "Diimplementasikan di 200+ outlet ritel nasional (Erajaya & Ibox)",
      tags: ["Android", "Kotlin", "REST API", "Clean Architecture", "Firebase"],
    },
    {
      id: 3,
      category: "production",
      tag: "Digital Sekuriti",
      icon: Code2,
      color: "emerald",
      title: "AI Care & Callink",
      subtitle: "Layanan kesehatan digital & perpesanan",
      problem: "Kebutuhan aplikasi mobile enterprise dengan standar keamanan tinggi dan integrasi real-time.",
      approach: "Mengembangkan AI Care (layanan kesehatan digital) dan Callink (aplikasi perpesanan) dengan arsitektur aman dan scalable.",
      impact: "Produksi aktif — melayani pengguna enterprise",
      tags: ["Flutter", "Firebase", "Security", "Real-Time"],
    },
    {
      id: 4,
      category: "research",
      tag: "AI On-Device",
      icon: Mic,
      color: "blue",
      title: "VoiceNav AI",
      subtitle: "Navigasi bebas tangan untuk pekerja mobile",
      problem: "Navigasi sering butuh mata ke layar saat berkendara atau saat tangan sedang sibuk.",
      approach: "Speech recognition on-device + klasifikasi intent yang berjalan penuh secara offline.",
      aiCapability: "NLP offline, deteksi intent, parsing perintah kontekstual",
      impact: "Interaksi layar berkurang 70% saat berkendara",
      tags: ["TFLite", "Flutter", "On-Device NLP"],
    },
    {
      id: 5,
      category: "research",
      tag: "Edge Inference",
      icon: Zap,
      color: "cyan",
      title: "EdgeVision",
      subtitle: "Deteksi objek real-time di edge",
      problem: "AI berbasis cloud menambah latensi dan memunculkan risiko privasi pada konteks mobile sensitif.",
      approach: "Model TFLite teroptimasi dengan kuantisasi int8 berjalan <50ms di perangkat mid-range.",
      aiCapability: "Kuantisasi model, edge ML, akselerasi hardware",
      impact: "Latensi inferensi <50ms pada perangkat entry-level",
      tags: ["TFLite", "NNAPI", "Model Optimization"],
    },
    {
      id: 6,
      category: "openSource",
      tag: "Komunitas",
      icon: Code2,
      color: "violet",
      title: "CodingSkuy",
      subtitle: "Platform dokumentasi pembelajaran engineering",
      problem: "Kurangnya sumber belajar pemrograman yang terstruktur dan relevan dengan industri di Indonesia.",
      approach: "Membangun repositori pengetahuan terbuka yang berisi tutorial, code snippet, dan best practice engineering.",
      impact: "10K+ subscriber, 100+ konten tutorial",
      tags: ["Flutter", "Open Source", "Community", "Documentation"],
    },
  ],
  en: [
    {
      id: 1,
      category: "production",
      tag: "ChefGenie",
      icon: Layers,
      color: "cyan",
      title: "ChefGenie",
      subtitle: "AI-Kitchen Companion App",
      problem: "Difficulty managing kitchen inventory, recipes, and meal planning efficiently.",
      approach: "Built an AI-powered kitchen companion app with recipe recommendations, inventory tracking, and meal planning.",
      impact: "In production — AI-assisted kitchen decision system",
      tags: ["Flutter", "OpenAI API", "Firebase", "TFLite"],
    },
    {
      id: 2,
      category: "production",
      tag: "EnB Mobile Care",
      icon: ShoppingCart,
      color: "blue",
      title: "Trade-In System (Erajaya)",
      subtitle: "Trade-in platform for 200+ retail outlets",
      problem: "Manual trade-in process was inefficient and error-prone across hundreds of retail outlets.",
      approach: "Built Android app ecosystem for online trade-in, automated validation, and outlet monitoring.",
      impact: "Deployed across 200+ retail outlets nationwide (Erajaya & Ibox)",
      tags: ["Android", "Kotlin", "REST API", "Clean Architecture", "Firebase"],
    },
    {
      id: 3,
      category: "production",
      tag: "Digital Sekuriti",
      icon: Code2,
      color: "emerald",
      title: "AI Care & Callink",
      subtitle: "Digital health service & messaging app",
      problem: "Need for enterprise mobile apps with high security standards and real-time integration.",
      approach: "Developed AI Care (digital health service) and Callink (messaging app) with secure, scalable architecture.",
      impact: "In production — serving enterprise users",
      tags: ["Flutter", "Firebase", "Security", "Real-Time"],
    },
    {
      id: 4,
      category: "research",
      tag: "On-Device AI",
      icon: Mic,
      color: "blue",
      title: "VoiceNav AI",
      subtitle: "Hands-free navigation for mobile workers",
      problem: "Navigation requires eyes on screen while driving or operating in hands-busy environments.",
      approach: "On-device speech recognition + intent classification running fully offline.",
      aiCapability: "Offline NLP, intent detection, contextual command parsing",
      impact: "70% reduction in screen interaction while driving",
      tags: ["TFLite", "Flutter", "On-Device NLP"],
    },
    {
      id: 5,
      category: "research",
      tag: "Edge Inference",
      icon: Zap,
      color: "cyan",
      title: "EdgeVision",
      subtitle: "Real-time object detection at the edge",
      problem: "Cloud AI introduces latency and raises privacy concerns for sensitive mobile contexts.",
      approach: "Optimized TFLite models with int8 quantization running sub-50ms on mid-range devices.",
      aiCapability: "Model quantization, edge ML, hardware acceleration",
      impact: "<50ms inference latency on entry-level hardware",
      tags: ["TFLite", "NNAPI", "Model Optimization"],
    },
    {
      id: 6,
      category: "openSource",
      tag: "Community",
      icon: Code2,
      color: "violet",
      title: "CodingSkuy",
      subtitle: "Engineering learning documentation platform",
      problem: "Lack of structured, industry-relevant programming resources in Indonesia.",
      approach: "Built an open knowledge repository with tutorials, code snippets, and engineering best practices.",
      impact: "10K+ subscribers, 100+ tutorial contents",
      tags: ["Flutter", "Open Source", "Community", "Documentation"],
    },
  ],
  zh: [
    {
      id: 1,
      category: "production",
      tag: "ChefGenie",
      icon: Layers,
      color: "cyan",
      title: "ChefGenie",
      subtitle: "AI 厨房伴侣应用",
      problem: "厨房库存、菜谱与膳食计划管理效率低下。",
      approach: "开发 AI 驱动的厨房伴侣应用，支持菜谱推荐、库存追踪与膳食规划。",
      impact: "已投产 — AI 辅助厨房决策系统",
      tags: ["Flutter", "OpenAI API", "Firebase", "TFLite"],
    },
    {
      id: 2,
      category: "production",
      tag: "EnB Mobile Care",
      icon: ShoppingCart,
      color: "blue",
      title: "以旧换新系统（Erajaya）",
      subtitle: "覆盖 200+ 门店的交易平台",
      problem: "人工以旧换新流程在数百家门店中效率低下且易出错。",
      approach: "构建 Android 应用生态，实现在线以旧换新、自动验证与门店监控。",
      impact: "在全国 200+ 零售门店部署（Erajaya & Ibox）",
      tags: ["Android", "Kotlin", "REST API", "Clean Architecture", "Firebase"],
    },
    {
      id: 3,
      category: "production",
      tag: "Digital Sekuriti",
      icon: Code2,
      color: "emerald",
      title: "AI Care & Callink",
      subtitle: "数字健康服务与通讯应用",
      problem: "需要具备高安全标准与实时集成能力的企业级移动应用。",
      approach: "开发 AI Care（数字健康服务）与 Callink（通讯应用），采用安全可扩展架构。",
      impact: "已投产 — 服务企业用户",
      tags: ["Flutter", "Firebase", "Security", "Real-Time"],
    },
    {
      id: 4,
      category: "research",
      tag: "端侧 AI",
      icon: Mic,
      color: "blue",
      title: "VoiceNav AI",
      subtitle: "面向移动工作者的免手导航",
      problem: "在驾驶或双手繁忙场景下，导航常常要求用户持续看屏幕。",
      approach: "采用端侧语音识别与意图分类，完整离线运行。",
      aiCapability: "离线 NLP、意图识别、上下文命令解析",
      impact: "驾驶时屏幕交互减少 70%",
      tags: ["TFLite", "Flutter", "On-Device NLP"],
    },
    {
      id: 5,
      category: "research",
      tag: "边缘推理",
      icon: Zap,
      color: "cyan",
      title: "EdgeVision",
      subtitle: "边缘端实时目标检测",
      problem: "云端 AI 会带来延迟，并在敏感移动场景中引发隐私风险。",
      approach: "使用 int8 量化优化 TFLite 模型，在中端设备实现 <50ms 推理。",
      aiCapability: "模型量化、边缘 ML、硬件加速",
      impact: "入门设备推理延迟低于 50ms",
      tags: ["TFLite", "NNAPI", "Model Optimization"],
    },
    {
      id: 6,
      category: "openSource",
      tag: "社区",
      icon: Code2,
      color: "violet",
      title: "CodingSkuy",
      subtitle: "工程学习文档平台",
      problem: "缺乏结构化的、与行业相关的编程学习资源。",
      approach: "构建开放知识库，包含教程、代码片段与工程最佳实践。",
      impact: "10K+ 订阅者，100+ 教程内容",
      tags: ["Flutter", "Open Source", "Community", "Documentation"],
    },
  ],
  ja: [
    {
      id: 1,
      category: "production",
      tag: "ChefGenie",
      icon: Layers,
      color: "cyan",
      title: "ChefGenie",
      subtitle: "AI キッチンコンパニオンアプリ",
      problem: "キッチンの在庫管理、レシピ検索、食事計画を効率的に行うのが難しい。",
      approach: "レシピ提案、在庫追跡、食事計画機能を備えた AI 駆動のキッチンコンパニオンアプリを開発。",
      impact: "本番稼働中 — AI 支援キッチン判断システム",
      tags: ["Flutter", "OpenAI API", "Firebase", "TFLite"],
    },
    {
      id: 2,
      category: "production",
      tag: "EnB Mobile Care",
      icon: ShoppingCart,
      color: "blue",
      title: "トレードインシステム（Erajaya）",
      subtitle: "200+ 拠点に対応するプラットフォーム",
      problem: "手動による下取りプロセスは非効率でエラーが発生しやすい。",
      approach: "オンライン下取り、自動検証、拠点監視を備えた Android アプリエコシステムを構築。",
      impact: "全国 200+ の小売店舗で導入（Erajaya & Ibox）",
      tags: ["Android", "Kotlin", "REST API", "Clean Architecture", "Firebase"],
    },
    {
      id: 3,
      category: "production",
      tag: "Digital Sekuriti",
      icon: Code2,
      color: "emerald",
      title: "AI Care & Callink",
      subtitle: "デジタルヘルスサービス＆メッセージングアプリ",
      problem: "高いセキュリティ基準とリアルタイム統合を備えたエンタープライズモバイルアプリが必要。",
      approach: "AI Care（デジタルヘルスサービス）と Callink（メッセージングアプリ）をセキュアでスケーラブルなアーキテクチャで開発。",
      impact: "本番稼働中 — エンタープライズユーザーに提供",
      tags: ["Flutter", "Firebase", "Security", "Real-Time"],
    },
    {
      id: 4,
      category: "research",
      tag: "オンデバイス AI",
      icon: Mic,
      color: "blue",
      title: "VoiceNav AI",
      subtitle: "モバイルワーカー向けハンズフリーナビ",
      problem: "運転中や手が塞がる環境では、ナビ利用時に画面注視が必要になりがちです。",
      approach: "端末内音声認識と意図分類を組み合わせ、完全オフラインで動作。",
      aiCapability: "オフライン NLP、意図検出、文脈コマンド解析",
      impact: "運転中の画面操作を 70% 削減",
      tags: ["TFLite", "Flutter", "On-Device NLP"],
    },
    {
      id: 5,
      category: "research",
      tag: "エッジ推論",
      icon: Zap,
      color: "cyan",
      title: "EdgeVision",
      subtitle: "エッジでのリアルタイム物体検出",
      problem: "クラウドAIは遅延とプライバシー懸念を生み、モバイル現場で課題になります。",
      approach: "int8量子化した最適化TFLiteモデルで、中価格帯端末でも50ms未満を実現。",
      aiCapability: "モデル量子化、エッジML、ハードウェアアクセラレーション",
      impact: "エントリー端末で推論遅延 <50ms",
      tags: ["TFLite", "NNAPI", "Model Optimization"],
    },
    {
      id: 6,
      category: "openSource",
      tag: "コミュニティ",
      icon: Code2,
      color: "violet",
      title: "CodingSkuy",
      subtitle: "エンジニアリング学習ドキュメントプラットフォーム",
      problem: "構造化された業界関連のプログラミング学習リソースが不足している。",
      approach: "チュートリアル、コードスニペット、ベストプラクティスを備えた公開ナレッジリポジトリを構築。",
      impact: "10K+ 登録者、100+ チュートリアル",
      tags: ["Flutter", "Open Source", "Community", "Documentation"],
    },
  ],
};

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
  const { language } = useLanguage();
  const text = copy[language];
  const projects = projectData[language];
  const [expanded, setExpanded] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"production" | "openSource" | "research">("production");

  const filteredProjects = projects.filter((p) => p.category === activeTab);
  const tabKeys: Array<"production" | "openSource" | "research"> = ["production", "openSource", "research"];

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
          className="mb-10"
        >
          <span className="text-xs uppercase tracking-[0.15em] text-blue-500 dark:text-blue-400">
            {text.sectionTag}
          </span>
          <h2 className="text-4xl sm:text-5xl tracking-tight text-slate-900 dark:text-white mt-3 leading-tight">
            {text.titleTop}
            <span className="block bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
              {text.titleBottom}
            </span>
          </h2>
          <p className="text-slate-500 dark:text-slate-500 mt-4 max-w-xl">
            {text.description}
          </p>
        </motion.div>

        {/* Category tabs */}
        <div className="flex gap-2 mb-10">
          {tabKeys.map((key) => (
            <motion.button
              key={key}
              onClick={() => { setActiveTab(key); setExpanded(null); }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-4 py-2 rounded-xl text-sm transition-all duration-200 ${
                activeTab === key
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "bg-slate-100 dark:bg-white/[0.05] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/[0.08] hover:border-blue-300 dark:hover:border-blue-500/30"
              }`}
            >
              {text.tabs[key]}
            </motion.button>
          ))}
        </div>

        {/* Project grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredProjects.map((project, i) => {
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
                className={`group relative rounded-2xl border border-slate-200 dark:border-white/[0.07] ${colors.border} bg-white dark:bg-white/[0.02] p-6 cursor-pointer transition-all duration-200 hover:shadow-lg dark:hover:shadow-none hover:-translate-y-0.5`}
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
                  <span className="text-slate-400 dark:text-slate-600 text-xs uppercase tracking-wider">{text.problem} — </span>
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
                        {text.approach}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{project.approach}</p>
                    </div>
                    {project.aiCapability && (
                      <div>
                        <p className="text-xs uppercase tracking-wider text-slate-400 dark:text-slate-600 mb-1">
                          {text.capability}
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{project.aiCapability}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-xs uppercase tracking-wider text-slate-400 dark:text-slate-600 mb-1">
                        {text.impact}
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
                      {text.details} <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
