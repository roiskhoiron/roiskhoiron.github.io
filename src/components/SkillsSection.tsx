import { motion } from "motion/react";
import { GitBranch, Users, Brain, BarChart2 } from "lucide-react";

const pillars = [
  {
    icon: GitBranch,
    color: "blue",
    title: "System Thinking",
    description:
      "Designing software as interconnected systems — not isolated features. Understanding how data flows, services communicate, and user behaviors compound across the entire product.",
    principles: ["Clean Architecture", "Modular Design", "Dependency Management", "Scalable Patterns"],
  },
  {
    icon: Brain,
    color: "violet",
    title: "Human-Centered AI",
    description:
      "AI should serve human goals, not optimize for metrics in isolation. Every AI capability I ship is evaluated on its contribution to real user outcomes — clarity, trust, and control.",
    principles: ["Explainable Outputs", "Progressive Disclosure", "Fallback Gracefully", "Privacy by Default"],
  },
  {
    icon: Users,
    color: "cyan",
    title: "Clean Architecture",
    description:
      "Separation of concerns isn't just a principle — it's the difference between code that evolves and code that rots. Testability, independence, and clarity are non-negotiable.",
    principles: ["Domain-Driven Design", "SOLID Principles", "Test Coverage", "Decoupled Layers"],
  },
  {
    icon: BarChart2,
    color: "emerald",
    title: "Data-Driven Decisions",
    description:
      "Intuition informs hypotheses; data validates them. From A/B testing mobile UX patterns to evaluating model performance, I let evidence shape direction — not assumptions.",
    principles: ["Hypothesis Testing", "Model Evaluation", "UX Analytics", "Feedback Loops"],
  },
];

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
            Engineering Philosophy
          </span>
          <h2 className="text-4xl sm:text-5xl tracking-tight text-slate-900 dark:text-white mt-3 leading-tight">
            Principles That
            <span className="block bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
              Guide Every Build
            </span>
          </h2>
          <p className="text-slate-500 dark:text-slate-500 mt-4 max-w-xl">
            The mental models I apply across every product — from mobile UI to AI system design.
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
