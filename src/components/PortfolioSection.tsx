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
import { useLanguage, type Language } from "../contexts/LanguageContext";

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
  hint: string;
}> = {
  id: {
    sectionTag: "Proyek AI-Native",
    titleTop: "Saat Mobile Bertemu",
    titleBottom: "Kecerdasan Terapan",
    description: "Eksplorasi AI on-device, integrasi LLM, dan UX mobile berpusat pada manusia.",
    problem: "Masalah",
    approach: "Pendekatan",
    capability: "Kemampuan AI",
    impact: "Dampak Pengguna",
    details: "Detail",
    hint: "Klik kartu untuk melihat Masalah → Pendekatan → Kemampuan AI → Dampak",
  },
  en: {
    sectionTag: "AI-Native Projects",
    titleTop: "Where Mobile Meets",
    titleBottom: "Applied Intelligence",
    description: "Industry-direction projects exploring the intersection of on-device AI, LLM integration, and human-centered mobile UX.",
    problem: "Problem",
    approach: "Approach",
    capability: "AI Capability",
    impact: "User Impact",
    details: "Details",
    hint: "Click any card to explore Problem → Approach → AI Capability → Impact",
  },
  zh: {
    sectionTag: "AI 原生项目",
    titleTop: "当移动端遇见",
    titleBottom: "可落地智能",
    description: "探索端侧 AI、LLM 集成与以人为中心的移动 UX。",
    problem: "问题",
    approach: "方案",
    capability: "AI 能力",
    impact: "用户影响",
    details: "详情",
    hint: "点击卡片查看 问题 → 方案 → AI 能力 → 影响",
  },
  ja: {
    sectionTag: "AIネイティブプロジェクト",
    titleTop: "モバイルと",
    titleBottom: "実践知能の交点",
    description: "オンデバイスAI、LLM統合、人間中心のモバイルUXを探るプロジェクト。",
    problem: "課題",
    approach: "アプローチ",
    capability: "AI能力",
    impact: "ユーザー影響",
    details: "詳細",
    hint: "カードをクリックして 課題 → アプローチ → AI能力 → 影響 を確認",
  },
};

type ProjectItem = {
  id: number;
  tag: string;
  icon: typeof Mic;
  color: string;
  title: string;
  subtitle: string;
  problem: string;
  approach: string;
  aiCapability: string;
  impact: string;
  tags: string[];
};

const projectData: Record<Language, ProjectItem[]> = {
  id: [
    {
      id: 1,
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
      id: 2,
      tag: "UX Personal",
      icon: Sparkles,
      color: "violet",
      title: "StyleSense",
      subtitle: "Mesin personalisasi visual untuk e-commerce",
      problem: "Aplikasi fashion sering memberi rekomendasi generik yang tidak mengikuti perubahan selera pengguna.",
      approach: "Computer vision + pelacakan perilaku untuk membangun profil preferensi real-time.",
      aiCapability: "Model kemiripan visual, pembelajaran preferensi, behavioral AI",
      impact: "Konversi 3× lebih tinggi dibanding rekomendasi berbasis rule",
      tags: ["ML Kit", "Android Compose", "Behavioral AI"],
    },
    {
      id: 3,
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
      id: 4,
      tag: "Asisten Tertanam",
      icon: MessageSquare,
      color: "emerald",
      title: "ContextBot",
      subtitle: "Asisten AI sadar konteks aplikasi untuk menekan beban support",
      problem: "Pengguna sering meninggalkan aplikasi saat menemui friksi atau kebingungan di momen kritis.",
      approach: "Asisten berbasis LLM yang memahami state aplikasi dan journey pengguna secara mendalam.",
      aiCapability: "Integrasi LLM, context injection, panduan berbasis retrieval",
      impact: "Volume tiket support turun 45% setelah peluncuran",
      tags: ["OpenAI API", "Flutter", "RAG", "State-Aware AI"],
    },
    {
      id: 5,
      tag: "Interaksi Multimodal",
      icon: Layers,
      color: "rose",
      title: "MultiSense",
      subtitle: "Lapisan input terpadu: suara + teks + visual",
      problem: "Input tunggal membatasi aksesibilitas dan menambah friksi pada workflow mobile yang kompleks.",
      approach: "Pipeline multimodal terpadu yang memproses suara, teks, dan kamera secara bersamaan.",
      aiCapability: "Vision-language model, pemrosesan audio, multimodal fusion",
      impact: "Task completion pengguna aksesibilitas naik 60%",
      tags: ["Gemini API", "Flutter", "Camera ML", "Whisper"],
    },
  ],
  en: [
    {
      id: 1,
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
      id: 2,
      tag: "Personalized UX",
      icon: Sparkles,
      color: "violet",
      title: "StyleSense",
      subtitle: "Visual personalization engine for e-commerce",
      problem: "Fashion apps serve generic recommendations that ignore individual taste evolution.",
      approach: "Computer vision + behavioral tracking to build real-time preference profiles.",
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
      problem: "Cloud AI introduces latency and raises privacy concerns for sensitive mobile contexts.",
      approach: "Optimized TFLite models with int8 quantization running sub-50ms on mid-range devices.",
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
      problem: "Users abandon apps at critical moments when they encounter friction or confusion.",
      approach: "LLM-powered assistant with deep awareness of current app state and user journey.",
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
      problem: "Single-modal input limits accessibility and increases friction for complex mobile workflows.",
      approach: "Unified multimodal processing pipeline that interprets voice, text, and camera inputs together.",
      aiCapability: "Vision-language models, audio processing, multimodal fusion",
      impact: "60% increase in task completion rate for accessibility users",
      tags: ["Gemini API", "Flutter", "Camera ML", "Whisper"],
    },
  ],
  zh: [
    {
      id: 1,
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
      id: 2,
      tag: "个性化 UX",
      icon: Sparkles,
      color: "violet",
      title: "StyleSense",
      subtitle: "电商视觉个性化引擎",
      problem: "时尚应用常给出通用推荐，无法反映用户口味变化。",
      approach: "结合计算机视觉与行为追踪，实时构建偏好画像。",
      aiCapability: "视觉相似模型、偏好学习、行为智能",
      impact: "转化率较规则推荐提升 3 倍",
      tags: ["ML Kit", "Android Compose", "Behavioral AI"],
    },
    {
      id: 3,
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
      id: 4,
      tag: "内嵌助手",
      icon: MessageSquare,
      color: "emerald",
      title: "ContextBot",
      subtitle: "感知应用上下文的 AI 助手，降低支持压力",
      problem: "用户在关键环节遇到阻碍时，往往直接放弃应用。",
      approach: "构建具备应用状态与用户路径感知能力的 LLM 助手。",
      aiCapability: "LLM 集成、上下文注入、检索增强引导",
      impact: "上线后支持工单量下降 45%",
      tags: ["OpenAI API", "Flutter", "RAG", "State-Aware AI"],
    },
    {
      id: 5,
      tag: "多模态交互",
      icon: Layers,
      color: "rose",
      title: "MultiSense",
      subtitle: "统一语音 + 文本 + 视觉输入层",
      problem: "单一输入模式限制可访问性，并增加复杂流程中的操作阻力。",
      approach: "统一多模态处理管线，同时解析语音、文本与相机输入。",
      aiCapability: "视觉语言模型、音频处理、多模态融合",
      impact: "可访问性用户任务完成率提升 60%",
      tags: ["Gemini API", "Flutter", "Camera ML", "Whisper"],
    },
  ],
  ja: [
    {
      id: 1,
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
      id: 2,
      tag: "パーソナライズ UX",
      icon: Sparkles,
      color: "violet",
      title: "StyleSense",
      subtitle: "EC向けビジュアルパーソナライズエンジン",
      problem: "ファッションアプリの汎用推薦は、個々の嗜好変化を捉えきれません。",
      approach: "画像認識と行動トラッキングで、リアルタイムに嗜好プロファイルを生成。",
      aiCapability: "視覚類似モデル、嗜好学習、行動AI",
      impact: "ルールベース推薦比でCVR 3倍",
      tags: ["ML Kit", "Android Compose", "Behavioral AI"],
    },
    {
      id: 3,
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
      id: 4,
      tag: "組み込みアシスタント",
      icon: MessageSquare,
      color: "emerald",
      title: "ContextBot",
      subtitle: "アプリ文脈を理解するAIアシスタント",
      problem: "ユーザーは重要な場面で迷うと、アプリを離脱しやすくなります。",
      approach: "アプリ状態とユーザージャーニーを深く理解するLLMアシスタントを実装。",
      aiCapability: "LLM統合、コンテキスト注入、検索拡張ガイダンス",
      impact: "リリース後のサポートチケットを 45% 削減",
      tags: ["OpenAI API", "Flutter", "RAG", "State-Aware AI"],
    },
    {
      id: 5,
      tag: "マルチモーダル",
      icon: Layers,
      color: "rose",
      title: "MultiSense",
      subtitle: "音声 + テキスト + 画像の統合入力レイヤー",
      problem: "単一モード入力はアクセシビリティを下げ、複雑な操作で摩擦を生みます。",
      approach: "音声・テキスト・カメラ入力を同時解釈する統合マルチモーダル処理を構築。",
      aiCapability: "視覚言語モデル、音声処理、マルチモーダル融合",
      impact: "アクセシビリティ利用者の完了率が 60% 向上",
      tags: ["Gemini API", "Flutter", "Camera ML", "Whisper"],
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
                    <div>
                      <p className="text-xs uppercase tracking-wider text-slate-400 dark:text-slate-600 mb-1">
                        {text.capability}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{project.aiCapability}</p>
                    </div>
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

        <p className="text-center text-xs text-slate-400 dark:text-slate-600 mt-8">
          {text.hint}
        </p>
      </div>
    </section>
  );
}
