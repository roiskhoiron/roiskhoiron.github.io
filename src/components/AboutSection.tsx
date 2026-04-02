import { motion } from "motion/react";
import { MapPin, Calendar, Layers, TrendingUp } from "lucide-react";
import imgProfile from "figma:asset/4b819441208d57e40fee6dee2a89f1597026d00b.png";

const highlights = [
  {
    icon: Calendar,
    value: "5+ Years",
    label: "Mobile Engineering",
    sub: "From junior dev to Head of Mobile",
  },
  {
    icon: Layers,
    value: "50+ Apps",
    label: "Products Shipped",
    sub: "Startup to enterprise scale",
  },
  {
    icon: TrendingUp,
    value: "AI-Native",
    label: "Current Direction",
    sub: "Real-world AI integration",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 dark:bg-blue-600/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-500/5 dark:bg-violet-600/8 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">
          {/* Left — Profile Photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative max-w-[400px] mx-auto">
              {/* Glow ring */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-violet-600/20 rounded-2xl blur-2xl scale-95" />

              {/* Photo container */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-white/[0.08] shadow-2xl bg-slate-100 dark:bg-white/[0.02]">
                <img
                  src={imgProfile}
                  alt="Rois Khoiron"
                  className="w-full h-auto object-cover"
                />
                {/* Gradient overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-slate-900/60 to-transparent" />

                {/* Name tag */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-sm text-white">Jakarta, Indonesia</span>
                  </div>
                </div>
              </div>

              {/* Decorative corner accent */}
              <motion.div
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-3 -right-3 w-6 h-6 bg-blue-500 rounded-full blur-md"
              />
              <motion.div
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-3 -left-3 w-8 h-8 bg-violet-500 rounded-full blur-md"
              />
            </div>
          </motion.div>

          {/* Right — Position Statement */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8 order-1 lg:order-2"
          >
            {/* Section label */}
            <div>
              <span className="text-xs uppercase tracking-[0.15em] text-blue-500 dark:text-blue-400">
                Position Statement
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-4xl sm:text-5xl tracking-tight text-slate-900 dark:text-white leading-tight">
              Engineering for
              <span className="block bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
                the AI Era
              </span>
            </h2>

            {/* Narrative paragraphs */}
            <div className="space-y-5">
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                With over 5 years building mobile applications — from Android
                Native to Flutter and SwiftUI — I've watched mobile development
                transform. What once required cloud round-trips now runs at the
                edge. What once needed teams of specialists now ships with a
                single AI-augmented engineer.
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                I'm evolving toward AI-native application building: embedding
                intelligence directly into mobile products, not as a feature
                toggle, but as the foundation of how they think and respond. My
                focus is grounded in real-world problem solving — not the hype
                cycle.
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Currently serving as Head of Mobile Developer at PT. Digital
                Sekuriti Indonesia, bridging product thinking with engineering
                execution across a team building security-critical applications.
              </p>
            </div>

            {/* Highlight cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {highlights.map((item, i) => (
                <motion.div
                  key={item.value}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -2 }}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] hover:border-blue-300 dark:hover:border-blue-500/30 transition-all duration-200"
                >
                  <item.icon className="w-4 h-4 text-blue-500 dark:text-blue-400 mb-3" />
                  <p className="text-lg text-slate-900 dark:text-white tracking-tight">
                    {item.value}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    {item.label}
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-600 mt-1">
                    {item.sub}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
