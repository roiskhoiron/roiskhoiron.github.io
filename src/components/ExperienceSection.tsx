import { motion } from "motion/react";
import { Smartphone, Layers, Brain, ArrowRight } from "lucide-react";
import { useLanguage, type Language } from "../contexts/LanguageContext";

const copy: Record<Language, { tag: string; titleTop: string; titleBottom: string; milestone: string }> = {
  id: {
    tag: "Evolusi Tech Stack",
    titleTop: "Dari Mobile Native",
    titleBottom: "ke AI-Driven Builder",
    milestone: "Pencapaian Utama",
  },
  en: {
    tag: "Tech Stack Evolution",
    titleTop: "From Mobile Native",
    titleBottom: "to AI-Driven Builder",
    milestone: "Key Milestone",
  },
  zh: {
    tag: "技术栈演进",
    titleTop: "从原生移动开发",
    titleBottom: "到 AI 驱动构建",
    milestone: "关键里程碑",
  },
  ja: {
    tag: "技術スタックの進化",
    titleTop: "モバイルネイティブから",
    titleBottom: "AI駆動ビルダーへ",
    milestone: "主なマイルストーン",
  },
};

type Stage = {
  era: string;
  phase: string;
  role: string;
  subtitle: string;
  icon: typeof Smartphone;
  color: string;
  description: string;
  skills: string[];
  milestone: string;
};

const stageData: Record<Language, Stage[]> = {
  id: [
    {
      era: "2019 – 2022",
      phase: "01",
      role: "Mobile Developer",
      subtitle: "Fondasi & Craft",
      icon: Smartphone,
      color: "blue",
      description: "Memulai dari Android Native (XML, MVVM), lalu berkembang ke Kotlin, integrasi REST API, dan Clean Architecture.",
      skills: ["Android Native", "Kotlin", "MVVM", "REST APIs", "Clean Architecture", "Agile/Scrum"],
      milestone: "Merilis sistem trade-in yang dipakai di 200+ outlet retail",
    },
    {
      era: "2022 – 2024",
      phase: "02",
      role: "Product Engineer",
      subtitle: "Skala & Kepemimpinan",
      icon: Layers,
      color: "violet",
      description: "Naik dari Senior Developer menjadi Head of Mobile, memimpin tim lintas fungsi dan menata delivery lintas platform.",
      skills: ["Flutter", "Jetpack Compose", "SwiftUI", "CI/CD", "Team Leadership", "Product Roadmap"],
      milestone: "Membangun dan mengelola tim mobile engineering berisi 8+ developer",
    },
    {
      era: "2024 – Sekarang",
      phase: "03",
      role: "AI-Driven Builder",
      subtitle: "Intelligence & Automation",
      icon: Brain,
      color: "cyan",
      description: "Berfokus ke aplikasi mobile AI-native dengan integrasi LLM, on-device ML, dan kemampuan multimodal.",
      skills: ["LLM Integration", "TFLite / Edge ML", "Prompt Engineering", "AI Product Design", "Flutter AI", "System Architecture"],
      milestone: "Mengembangkan ChefGenie sebagai sistem keputusan dapur berbasis AI",
    },
  ],
  en: [
    {
      era: "2019 – 2022",
      phase: "01",
      role: "Mobile Developer",
      subtitle: "Foundation & Craft",
      icon: Smartphone,
      color: "blue",
      description: "Started with Android Native (XML, MVVM), then grew into Kotlin, REST API integration, and Clean Architecture.",
      skills: ["Android Native", "Kotlin", "MVVM", "REST APIs", "Clean Architecture", "Agile/Scrum"],
      milestone: "Shipped a trade-in system used across 200+ retail outlets",
    },
    {
      era: "2022 – 2024",
      phase: "02",
      role: "Product Engineer",
      subtitle: "Scale & Leadership",
      icon: Layers,
      color: "violet",
      description: "Moved from Senior Developer to Head of Mobile, leading cross-functional teams and multi-platform delivery.",
      skills: ["Flutter", "Jetpack Compose", "SwiftUI", "CI/CD", "Team Leadership", "Product Roadmap"],
      milestone: "Built and managed a mobile engineering team of 8+ developers",
    },
    {
      era: "2024 – Present",
      phase: "03",
      role: "AI-Driven Builder",
      subtitle: "Intelligence & Automation",
      icon: Brain,
      color: "cyan",
      description: "Focused on AI-native mobile apps by integrating LLMs, on-device ML, and multimodal experiences.",
      skills: ["LLM Integration", "TFLite / Edge ML", "Prompt Engineering", "AI Product Design", "Flutter AI", "System Architecture"],
      milestone: "Developing ChefGenie as an AI-assisted kitchen decision system",
    },
  ],
  zh: [
    {
      era: "2019 – 2022",
      phase: "01",
      role: "移动开发工程师",
      subtitle: "基础与打磨",
      icon: Smartphone,
      color: "blue",
      description: "从 Android Native（XML、MVVM）起步，逐步深入 Kotlin、REST API 集成与整洁架构。",
      skills: ["Android Native", "Kotlin", "MVVM", "REST APIs", "Clean Architecture", "Agile/Scrum"],
      milestone: "交付覆盖 200+ 零售网点的 trade-in 系统",
    },
    {
      era: "2022 – 2024",
      phase: "02",
      role: "产品工程师",
      subtitle: "规模与领导力",
      icon: Layers,
      color: "violet",
      description: "从高级开发晋升为移动负责人，带领跨职能团队推进跨平台交付。",
      skills: ["Flutter", "Jetpack Compose", "SwiftUI", "CI/CD", "Team Leadership", "Product Roadmap"],
      milestone: "搭建并管理 8+ 人移动工程团队",
    },
    {
      era: "2024 – 至今",
      phase: "03",
      role: "AI 驱动构建者",
      subtitle: "智能与自动化",
      icon: Brain,
      color: "cyan",
      description: "聚焦 AI 原生移动应用，整合 LLM、端侧 ML 与多模态能力。",
      skills: ["LLM Integration", "TFLite / Edge ML", "Prompt Engineering", "AI Product Design", "Flutter AI", "System Architecture"],
      milestone: "正在开发 ChefGenie 智能厨房决策系统",
    },
  ],
  ja: [
    {
      era: "2019 – 2022",
      phase: "01",
      role: "モバイル開発者",
      subtitle: "基礎と実践",
      icon: Smartphone,
      color: "blue",
      description: "Android Native（XML、MVVM）から始め、Kotlin、REST API統合、クリーンアーキテクチャへ拡張。",
      skills: ["Android Native", "Kotlin", "MVVM", "REST APIs", "Clean Architecture", "Agile/Scrum"],
      milestone: "200以上の小売拠点で使われるトレードインシステムをリリース",
    },
    {
      era: "2022 – 2024",
      phase: "02",
      role: "プロダクトエンジニア",
      subtitle: "拡張とリーダーシップ",
      icon: Layers,
      color: "violet",
      description: "シニア開発者からモバイル責任者へ。クロスファンクショナルチームを率いて開発を推進。",
      skills: ["Flutter", "Jetpack Compose", "SwiftUI", "CI/CD", "Team Leadership", "Product Roadmap"],
      milestone: "8名以上のモバイルエンジニアチームを構築・運営",
    },
    {
      era: "2024 – 現在",
      phase: "03",
      role: "AI駆動ビルダー",
      subtitle: "知能と自動化",
      icon: Brain,
      color: "cyan",
      description: "LLM、オンデバイスML、マルチモーダルを統合したAIネイティブなモバイル開発に注力。",
      skills: ["LLM Integration", "TFLite / Edge ML", "Prompt Engineering", "AI Product Design", "Flutter AI", "System Architecture"],
      milestone: "AI支援キッチン判断システム ChefGenie を開発中",
    },
  ],
};

const colorStyles: Record<string, {
  accent: string;
  iconBg: string;
  phase: string;
  tag: string;
  line: string;
  dot: string;
  connector: string;
}> = {
  blue: {
    accent: "text-blue-600 dark:text-blue-400",
    iconBg: "bg-blue-500/10 dark:bg-blue-500/15",
    phase: "text-blue-500/40 dark:text-blue-400/30",
    tag: "bg-blue-500/8 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/15",
    line: "bg-blue-500",
    dot: "bg-blue-500 shadow-blue-500/50",
    connector: "bg-gradient-to-r from-blue-500 to-violet-500",
  },
  violet: {
    accent: "text-violet-600 dark:text-violet-400",
    iconBg: "bg-violet-500/10 dark:bg-violet-500/15",
    phase: "text-violet-500/40 dark:text-violet-400/30",
    tag: "bg-violet-500/8 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/15",
    line: "bg-violet-500",
    dot: "bg-violet-500 shadow-violet-500/50",
    connector: "bg-gradient-to-r from-violet-500 to-cyan-500",
  },
  cyan: {
    accent: "text-cyan-600 dark:text-cyan-400",
    iconBg: "bg-cyan-500/10 dark:bg-cyan-500/15",
    phase: "text-cyan-500/40 dark:text-cyan-400/30",
    tag: "bg-cyan-500/8 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/15",
    line: "bg-cyan-500",
    dot: "bg-cyan-500 shadow-cyan-500/50",
    connector: "",
  },
};

export function ExperienceSection() {
  const { language } = useLanguage();
  const text = copy[language];
  const stages = stageData[language];

  return (
    <section id="timeline" className="py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-1/2 w-[600px] h-[600px] bg-violet-500/5 dark:bg-violet-600/6 rounded-full blur-[130px] -translate-y-1/2" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-xs uppercase tracking-[0.15em] text-blue-500 dark:text-blue-400">
            {text.tag}
          </span>
          <h2 className="text-4xl sm:text-5xl tracking-tight text-slate-900 dark:text-white mt-3 leading-tight">
            {text.titleTop}
            <span className="block bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              {text.titleBottom}
            </span>
          </h2>
        </motion.div>

        {/* Timeline track — desktop */}
        <div className="hidden lg:block relative mb-8">
          <div className="absolute top-[22px] left-[8.33%] right-[8.33%] h-px bg-slate-200 dark:bg-white/[0.06]">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3 }}
              style={{ transformOrigin: "left" }}
              className="absolute inset-0 bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-500"
            />
          </div>

          {/* Dots */}
          <div className="grid grid-cols-3">
            {stages.map((stage, i) => {
              const styles = colorStyles[stage.color];
              return (
                <div key={stage.phase} className="flex justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.2, type: "spring" }}
                    className={`w-[18px] h-[18px] rounded-full ${styles.dot} border-2 border-white dark:border-[#080811] shadow-lg`}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Stage cards */}
        <div className="grid lg:grid-cols-3 gap-5">
          {stages.map((stage, i) => {
            const styles = colorStyles[stage.color];
            return (
              <motion.div
                key={stage.phase}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="relative rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.07] p-6 hover:border-slate-300 dark:hover:border-white/[0.12] transition-all duration-200 group"
              >
                {/* Phase number watermark */}
                <div
                  className={`absolute top-4 right-5 text-6xl select-none pointer-events-none ${styles.phase}`}
                  style={{ fontWeight: 900, lineHeight: 1 }}
                >
                  {stage.phase}
                </div>

                {/* Icon + Era */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl ${styles.iconBg} flex items-center justify-center`}>
                    <stage.icon className={`w-5 h-5 ${styles.accent}`} />
                  </div>
                  <span className="text-xs text-slate-400 dark:text-slate-600">{stage.era}</span>
                </div>

                {/* Role */}
                <h3 className={`text-slate-900 dark:text-white tracking-tight mb-1`}>
                  {stage.role}
                </h3>
                <p className={`text-xs ${styles.accent} mb-4`}>{stage.subtitle}</p>

                {/* Description */}
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-5">
                  {stage.description}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {stage.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`text-xs px-2 py-0.5 rounded-md border ${styles.tag}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Milestone */}
                <div className={`border-t border-slate-100 dark:border-white/[0.05] pt-4`}>
                  <p className="text-xs text-slate-400 dark:text-slate-600 uppercase tracking-wider mb-1">
                    {text.milestone}
                  </p>
                  <p className={`text-sm ${styles.accent}`}>{stage.milestone}</p>
                </div>

                {/* Right arrow between cards (desktop) */}
                {i < stages.length - 1 && (
                  <div className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                    <div className="w-8 h-8 rounded-full bg-white dark:bg-[#0d0d1a] border border-slate-200 dark:border-white/[0.08] flex items-center justify-center">
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />
                    </div>
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
