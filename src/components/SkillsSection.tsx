import { motion } from "motion/react";
import { GitBranch, Users, Brain, BarChart2 } from "lucide-react";
import { useLanguage, type Language } from "../contexts/LanguageContext";

const copy: Record<Language, { tag: string; titleTop: string; titleBottom: string; description: string }> = {
  id: {
    tag: "Filosofi Engineering",
    titleTop: "Prinsip yang",
    titleBottom: "Mengarahkan Setiap Build",
    description: "Model berpikir yang saya gunakan di setiap produk, dari UI mobile hingga desain sistem AI.",
  },
  en: {
    tag: "Engineering Philosophy",
    titleTop: "Principles That",
    titleBottom: "Guide Every Build",
    description: "The mental models I apply across every product — from mobile UI to AI system design.",
  },
  zh: {
    tag: "工程理念",
    titleTop: "指导每次构建的",
    titleBottom: "核心原则",
    description: "我在每个产品中使用的思维模型，从移动 UI 到 AI 系统设计。",
  },
  ja: {
    tag: "エンジニアリング哲学",
    titleTop: "すべての構築を導く",
    titleBottom: "原則",
    description: "モバイルUIからAIシステム設計まで、私が一貫して適用する思考モデルです。",
  },
};

type Pillar = {
  icon: typeof GitBranch;
  color: string;
  title: string;
  description: string;
  principles: string[];
};

const pillarData: Record<Language, Pillar[]> = {
  id: [
    {
      icon: GitBranch,
      color: "blue",
      title: "System Thinking",
      description: "Saya merancang software sebagai sistem yang saling terhubung, bukan fitur yang berdiri sendiri.",
      principles: ["Clean Architecture", "Modular Design", "Dependency Management", "Scalable Patterns"],
    },
    {
      icon: Brain,
      color: "violet",
      title: "Human-Centered AI",
      description: "AI harus melayani tujuan manusia. Setiap kapabilitas AI saya ukur dari dampaknya pada kejelasan, kepercayaan, dan kontrol pengguna.",
      principles: ["Explainable Outputs", "Progressive Disclosure", "Graceful Fallback", "Privacy by Default"],
    },
    {
      icon: Users,
      color: "cyan",
      title: "Arsitektur Bersih",
      description: "Pemisahan concern adalah fondasi agar kode tetap sehat, testable, dan mudah berkembang.",
      principles: ["Domain-Driven Design", "SOLID Principles", "Test Coverage", "Decoupled Layers"],
    },
    {
      icon: BarChart2,
      color: "emerald",
      title: "Keputusan Berbasis Data",
      description: "Intuisi memunculkan hipotesis, data memvalidasi arah. Saya gunakan evidence untuk menentukan prioritas produk.",
      principles: ["Hypothesis Testing", "Model Evaluation", "UX Analytics", "Feedback Loops"],
    },
  ],
  en: [
    {
      icon: GitBranch,
      color: "blue",
      title: "System Thinking",
      description: "Designing software as interconnected systems, not isolated features.",
      principles: ["Clean Architecture", "Modular Design", "Dependency Management", "Scalable Patterns"],
    },
    {
      icon: Brain,
      color: "violet",
      title: "Human-Centered AI",
      description: "AI should serve human goals. Every AI capability is measured by clarity, trust, and user control.",
      principles: ["Explainable Outputs", "Progressive Disclosure", "Graceful Fallback", "Privacy by Default"],
    },
    {
      icon: Users,
      color: "cyan",
      title: "Clean Architecture",
      description: "Separation of concerns keeps code testable, independent, and sustainable for long-term growth.",
      principles: ["Domain-Driven Design", "SOLID Principles", "Test Coverage", "Decoupled Layers"],
    },
    {
      icon: BarChart2,
      color: "emerald",
      title: "Data-Driven Decisions",
      description: "Intuition informs hypotheses; data validates direction across UX and model performance decisions.",
      principles: ["Hypothesis Testing", "Model Evaluation", "UX Analytics", "Feedback Loops"],
    },
  ],
  zh: [
    {
      icon: GitBranch,
      color: "blue",
      title: "系统思维",
      description: "将软件视为彼此联动的系统，而不是孤立功能的堆叠。",
      principles: ["整洁架构", "模块化设计", "依赖管理", "可扩展模式"],
    },
    {
      icon: Brain,
      color: "violet",
      title: "以人为中心的 AI",
      description: "AI 应服务于人的目标，每项能力都要提升清晰度、信任感与可控性。",
      principles: ["可解释输出", "渐进式披露", "平滑降级", "默认隐私保护"],
    },
    {
      icon: Users,
      color: "cyan",
      title: "整洁架构",
      description: "关注点分离是代码可演进、可测试、可维护的基础。",
      principles: ["领域驱动设计", "SOLID 原则", "测试覆盖", "解耦分层"],
    },
    {
      icon: BarChart2,
      color: "emerald",
      title: "数据驱动决策",
      description: "直觉提出假设，数据验证方向，让产品与模型迭代更可靠。",
      principles: ["假设检验", "模型评估", "UX 数据分析", "反馈闭环"],
    },
  ],
  ja: [
    {
      icon: GitBranch,
      color: "blue",
      title: "システム思考",
      description: "機能単体ではなく、相互接続されたシステムとしてソフトウェアを設計します。",
      principles: ["クリーンアーキテクチャ", "モジュラー設計", "依存関係管理", "スケーラブルパターン"],
    },
    {
      icon: Brain,
      color: "violet",
      title: "人間中心の AI",
      description: "AI は人の目的に貢献すべきです。明確さ・信頼・制御性への寄与で評価します。",
      principles: ["説明可能な出力", "段階的開示", "安全なフォールバック", "プライバシー・バイ・デフォルト"],
    },
    {
      icon: Users,
      color: "cyan",
      title: "クリーンアーキテクチャ",
      description: "関心の分離は、コードを長期的に進化可能にするための前提です。",
      principles: ["ドメイン駆動設計", "SOLID原則", "テストカバレッジ", "疎結合レイヤー"],
    },
    {
      icon: BarChart2,
      color: "emerald",
      title: "データ駆動の意思決定",
      description: "仮説は直感から、方向性の確証はデータから。証拠ベースで優先順位を決めます。",
      principles: ["仮説検証", "モデル評価", "UX分析", "フィードバックループ"],
    },
  ],
};

const colorStyles: Record<string, { icon: string; border: string; tag: string; line: string }> = {
  blue: {
    icon: "text-blue-500 dark:text-blue-400 bg-blue-500/10",
    border: "hover:border-blue-400/30 dark:hover:border-blue-500/25",
    tag: "bg-blue-500/8 text-blue-600 dark:text-blue-400 border-blue-500/15",
    line: "bg-blue-500",
  },
  violet: {
    icon: "text-violet-500 dark:text-violet-400 bg-violet-500/10",
    border: "hover:border-violet-400/30 dark:hover:border-violet-500/25",
    tag: "bg-violet-500/8 text-violet-600 dark:text-violet-400 border-violet-500/15",
    line: "bg-violet-500",
  },
  cyan: {
    icon: "text-cyan-500 dark:text-cyan-400 bg-cyan-500/10",
    border: "hover:border-cyan-400/30 dark:hover:border-cyan-500/25",
    tag: "bg-cyan-500/8 text-cyan-600 dark:text-cyan-400 border-cyan-500/15",
    line: "bg-cyan-500",
  },
  emerald: {
    icon: "text-emerald-500 dark:text-emerald-400 bg-emerald-500/10",
    border: "hover:border-emerald-400/30 dark:hover:border-emerald-500/25",
    tag: "bg-emerald-500/8 text-emerald-600 dark:text-emerald-400 border-emerald-500/15",
    line: "bg-emerald-500",
  },
};

export function SkillsSection() {
  const { language } = useLanguage();
  const text = copy[language];
  const pillars = pillarData[language];

  return (
    <section id="philosophy" className="py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background tint */}
      <div className="absolute inset-0 bg-slate-50/50 dark:bg-white/[0.015] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-white/[0.06] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-white/[0.06] to-transparent" />

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
            <span className="block bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
              {text.titleBottom}
            </span>
          </h2>
          <p className="text-slate-500 dark:text-slate-500 mt-4 max-w-xl">
            {text.description}
          </p>
        </motion.div>

        {/* Pillars grid */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {pillars.map((pillar, i) => {
            const styles = colorStyles[pillar.color];
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -3 }}
                className={`group relative p-6 rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.07] ${styles.border} transition-all duration-200 hover:shadow-md dark:hover:shadow-none`}
              >
                {/* Top line accent */}
                <div className={`absolute top-0 left-6 right-6 h-[2px] ${styles.line} rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                {/* Icon */}
                <div className={`w-10 h-10 rounded-xl ${styles.icon} flex items-center justify-center mb-5`}>
                  <pillar.icon className="w-5 h-5" />
                </div>

                {/* Title */}
                <h3 className="text-slate-900 dark:text-white tracking-tight mb-3">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-5">
                  {pillar.description}
                </p>

                {/* Principles list */}
                <ul className="space-y-1.5">
                  {pillar.principles.map((principle) => (
                    <li
                      key={principle}
                      className={`text-xs px-2.5 py-1 rounded-lg border ${styles.tag} inline-flex items-center gap-1.5 mr-1.5 mb-1`}
                    >
                      <span className={`w-1 h-1 rounded-full ${styles.line}`} />
                      {principle}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
