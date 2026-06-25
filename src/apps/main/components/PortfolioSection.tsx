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
      tag: "Android Native",
      icon: ShoppingCart,
      color: "blue",
      title: "Sistem Trade-In Retail",
      subtitle: "Platform tukar tambah untuk 200+ outlet",
      problem: "Proses trade-in manual tidak efisien dan rawan error di ratusan outlet.",
      approach: "Membangun sistem Android end-to-end dengan integrasi REST API, validasi otomatis, dan dashboard monitoring.",
      impact: "Diimplementasikan di 200+ outlet ritel nasional",
      tags: ["Android", "Kotlin", "REST API", "Clean Architecture", "Room DB"],
    },
    {
      id: 2,
      category: "production",
      tag: "Mobile Platform",
      icon: Layers,
      color: "violet",
      title: "Platform Mobile Multi-Produk",
      subtitle: "Arsitektur dan kepemimpinan tim 8+ engineer",
      problem: "Pengembangan lintas platform yang tidak terkoordinasi menyebabkan duplikasi dan inkonsistensi.",
      approach: "Menstandardisasi arsitektur, membangun shared component library, dan memimpin roadmap delivery.",
      impact: "Tim 8+ developer, delivery multi-platform yang konsisten",
      tags: ["Flutter", "Jetpack Compose", "SwiftUI", "CI/CD", "Riverpod"],
    },
    {
      id: 3,
      category: "production",
      tag: "Keamanan",
      icon: Code2,
      color: "emerald",
      title: "Aplikasi Keamanan Kritikal",
      subtitle: "Produksi untuk keamanan digital",
      problem: "Kebutuhan aplikasi mobile yang memenuhi standar keamanan tinggi dan kepatuhan regulasi.",
      approach: "Mengembangkan aplikasi dengan arsitektur aman, enkripsi data, dan audit keamanan berkala.",
      impact: "Produksi aktif melayani pengguna enterprise",
      tags: ["Flutter", "Firebase", "Security", "Product Strategy"],
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
      tag: "Android Native",
      icon: ShoppingCart,
      color: "blue",
      title: "Retail Trade-In System",
      subtitle: "Trade-in platform for 200+ outlets",
      problem: "Manual trade-in process was inefficient and error-prone across hundreds of outlets.",
      approach: "Built an end-to-end Android system with REST API integration, automated validation, and monitoring dashboard.",
      impact: "Deployed across 200+ retail outlets nationwide",
      tags: ["Android", "Kotlin", "REST API", "Clean Architecture", "Room DB"],
    },
    {
      id: 2,
      category: "production",
      tag: "Mobile Platform",
      icon: Layers,
      color: "violet",
      title: "Multi-Product Mobile Platform",
      subtitle: "Architecture & leadership for 8+ engineer team",
      problem: "Uncoordinated cross-platform development caused duplication and inconsistency.",
      approach: "Standardized architecture, built shared component library, and led delivery roadmap.",
      impact: "Team of 8+ developers, consistent multi-platform delivery",
      tags: ["Flutter", "Jetpack Compose", "SwiftUI", "CI/CD", "Riverpod"],
    },
    {
      id: 3,
      category: "production",
      tag: "Security",
      icon: Code2,
      color: "emerald",
      title: "Security-Critical Application",
      subtitle: "Production app for digital security",
      problem: "Need for mobile applications meeting high security standards and regulatory compliance.",
      approach: "Developed secure architecture with data encryption, regular security audits, and compliance.",
      impact: "In production serving enterprise users",
      tags: ["Flutter", "Firebase", "Security", "Product Strategy"],
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
      tag: "Android 原生",
      icon: ShoppingCart,
      color: "blue",
      title: "零售以旧换新系统",
      subtitle: "覆盖 200+ 门店的交易平台",
      problem: "人工以旧换新流程在数百家门店中效率低下且易出错。",
      approach: "构建端到端 Android 系统，集成 REST API、自动验证与监控面板。",
      impact: "在全国 200+ 零售门店部署",
      tags: ["Android", "Kotlin", "REST API", "Clean Architecture", "Room DB"],
    },
    {
      id: 2,
      category: "production",
      tag: "移动平台",
      icon: Layers,
      color: "violet",
      title: "多产品移动平台",
      subtitle: "8+ 人工程团队的架构与领导",
      problem: "跨平台开发缺乏协调，导致重复工作与不一致。",
      approach: "统一架构，构建共享组件库，主导交付路线图。",
      impact: "管理 8+ 人开发团队，多平台一致交付",
      tags: ["Flutter", "Jetpack Compose", "SwiftUI", "CI/CD", "Riverpod"],
    },
    {
      id: 3,
      category: "production",
      tag: "安全",
      icon: Code2,
      color: "emerald",
      title: "安全关键型应用",
      subtitle: "面向数字安全的产业应用",
      problem: "需要满足高安全标准与法规合规的移动应用。",
      approach: "采用安全架构开发，包含数据加密、定期安全审计与合规检查。",
      impact: "已投产，服务于企业用户",
      tags: ["Flutter", "Firebase", "Security", "Product Strategy"],
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
      tag: "Android ネイティブ",
      icon: ShoppingCart,
      color: "blue",
      title: "小売トレードインシステム",
      subtitle: "200+ 拠点に対応するプラットフォーム",
      problem: "手動による下取りプロセスは非効率でエラーが発生しやすい。",
      approach: "REST API 統合、自動検証、モニタリングダッシュボードを備えたエンドツーエンドの Android システムを構築。",
      impact: "全国 200+ の小売店舗で導入",
      tags: ["Android", "Kotlin", "REST API", "Clean Architecture", "Room DB"],
    },
    {
      id: 2,
      category: "production",
      tag: "モバイルプラットフォーム",
      icon: Layers,
      color: "violet",
      title: "マルチプロダクトモバイル基盤",
      subtitle: "8 名以上のエンジニアチームを統率",
      problem: "調整不足のクロスプラットフォーム開発が重複と不整合を生んでいた。",
      approach: "アーキテクチャを標準化し、共通コンポーネントライブラリを構築、デリバリーロードマップを主導。",
      impact: "8 名以上の開発者チームを統率、一貫したマルチプラットフォーム提供",
      tags: ["Flutter", "Jetpack Compose", "SwiftUI", "CI/CD", "Riverpod"],
    },
    {
      id: 3,
      category: "production",
      tag: "セキュリティ",
      icon: Code2,
      color: "emerald",
      title: "セキュリティ重視のアプリケーション",
      subtitle: "デジタルセキュリティの本番アプリ",
      problem: "高いセキュリティ基準と規制コンプライアンスを満たすモバイルアプリが必要。",
      approach: "データ暗号化、定期セキュリティ監査、コンプライアンス対応を含むセキュアなアーキテクチャで開発。",
      impact: "本番稼働中、エンタープライズユーザーに提供",
      tags: ["Flutter", "Firebase", "Security", "Product Strategy"],
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
