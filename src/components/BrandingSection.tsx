import { motion } from "motion/react";
import { ChefHat, Sparkles, Cpu, Map, ArrowRight, Check } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const aiCapabilities = [
  "AI-assisted recipe generation from available ingredients",
  "Smart inventory tracking with expiry awareness",
  "Meal planning optimization based on nutritional goals",
  "Voice-guided cooking assistant with step-aware context",
];

const roadmapItems = [
  {
    phase: "Current",
    label: "Recipe Decision Engine",
    status: "active",
    description: "LLM-powered suggestions from pantry snapshot",
  },
  {
    phase: "Next",
    label: "Smart Inventory AI",
    status: "planned",
    description: "Vision-based ingredient recognition at intake",
  },
  {
    phase: "Future",
    label: "Nutritional Intelligence",
    status: "planned",
    description: "Personalized diet optimization with health context",
  },
  {
    phase: "Vision",
    label: "Multimodal Sous Chef",
    status: "concept",
    description: "Voice + visual real-time cooking guidance",
  },
];

const statusStyles: Record<string, string> = {
  active: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  planned: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  concept: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
};

export function BrandingSection() {
  return (
    <section id="chefgenie" className="py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-slate-50/60 dark:bg-white/[0.01]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-white/[0.06] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-white/[0.06] to-transparent" />
        <div className="absolute right-0 top-1/2 w-[500px] h-[500px] bg-emerald-500/5 dark:bg-emerald-600/6 rounded-full blur-[120px] -translate-y-1/2" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-xs uppercase tracking-[0.15em] text-blue-500 dark:text-blue-400">
            Featured Project
          </span>
          <div className="flex items-center gap-3 mt-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
              <ChefHat className="w-5 h-5 text-orange-500" />
            </div>
            <h2 className="text-4xl sm:text-5xl tracking-tight text-slate-900 dark:text-white">
              ChefGenie
            </h2>
          </div>
          <p className="text-slate-500 dark:text-slate-500 mt-3 max-w-lg">
            An experimental AI product exploring intelligent kitchen management —
            where applied AI meets everyday human decision-making.
          </p>
        </motion.div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] overflow-hidden"
        >
          <div className="grid lg:grid-cols-5">
            {/* Left — Image */}
            <div className="lg:col-span-2 relative min-h-[300px] lg:min-h-0">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1681264368290-13171e3bb4d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGtpdGNoZW4lMjBjb29raW5nJTIwYWklMjBhc3Npc3RhbnQlMjBhcHB8ZW58MXx8fHwxNzc1MTExODc5fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="ChefGenie - Smart Kitchen AI"
                className="w-full h-full object-cover min-h-[300px]"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white dark:to-[#0d0d1a] lg:block hidden" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent lg:hidden" />

              {/* AI badge */}
              <motion.div
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1.5 bg-white/90 dark:bg-black/70 backdrop-blur-sm rounded-lg border border-slate-200 dark:border-white/10"
              >
                <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                <span className="text-xs text-slate-700 dark:text-slate-300">AI Experimental</span>
              </motion.div>
            </div>

            {/* Right — Content */}
            <div className="lg:col-span-3 p-7 lg:p-10">
              <div className="grid sm:grid-cols-2 gap-8">
                {/* AI Capabilities */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Cpu className="w-4 h-4 text-orange-500" />
                    <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-500">
                      AI Capabilities
                    </p>
                  </div>
                  <ul className="space-y-3">
                    {aiCapabilities.map((cap) => (
                      <li key={cap} className="flex items-start gap-2.5">
                        <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-600 dark:text-slate-400">{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Roadmap */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Map className="w-4 h-4 text-blue-500" />
                    <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-500">
                      AI Integration Roadmap
                    </p>
                  </div>
                  <div className="space-y-3">
                    {roadmapItems.map((item, i) => (
                      <motion.div
                        key={item.phase}
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 }}
                        className="flex items-start gap-3"
                      >
                        {/* Timeline dot */}
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                              item.status === "active"
                                ? "bg-emerald-500"
                                : item.status === "planned"
                                ? "bg-blue-500"
                                : "bg-violet-500/50"
                            }`}
                          />
                          {i < roadmapItems.length - 1 && (
                            <div className="w-px h-full min-h-[16px] bg-slate-200 dark:bg-white/[0.06] mt-1" />
                          )}
                        </div>
                        <div className="-mt-0.5">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-sm text-slate-900 dark:text-white">
                              {item.label}
                            </span>
                            <span
                              className={`text-[10px] px-1.5 py-0.5 rounded-full border ${statusStyles[item.status]}`}
                            >
                              {item.phase}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-600">
                            {item.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/[0.05] flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-600 uppercase tracking-wider">
                    Core Tech
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {["Flutter", "OpenAI API", "Firebase", "TFLite"].map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/[0.06]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
                >
                  Learn more <ArrowRight className="w-3.5 h-3.5" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
