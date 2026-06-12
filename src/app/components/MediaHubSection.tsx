import { motion } from "motion/react";
import { BookOpen, Video, Layers, ArrowRight, Clock } from "lucide-react";
import { CodingSkuyMascot } from "./CodingSkuyMascot";

interface MediaHubSectionProps {
  darkMode: boolean;
}

const featured = [
  {
    type: "Article",
    icon: BookOpen,
    color: "#3d8bff",
    title: "Panduan Lengkap BLoC Pattern di Flutter 2024",
    desc: "Dari dasar hingga production-ready — arsitektur yang scalable untuk aplikasi Flutter kompleks.",
    readTime: "12 min read",
    category: "Flutter",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=340&fit=crop&auto=format",
    tags: ["Flutter", "Architecture", "BLoC"],
    big: true,
  },
  {
    type: "Tutorial",
    icon: Layers,
    color: "#8b5cf6",
    title: "Build REST API dengan FastAPI & PostgreSQL",
    desc: "Full setup dari awal hingga deploy ke cloud.",
    readTime: "8 min",
    category: "Backend",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=240&fit=crop&auto=format",
    tags: ["Python", "FastAPI", "PostgreSQL"],
    big: false,
  },
  {
    type: "Video",
    icon: Video,
    color: "#ff6b35",
    title: "Integrasi Claude API ke Flutter App",
    desc: "Bangun AI chatbot dalam 30 menit.",
    readTime: "32 min watch",
    category: "AI",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&h=240&fit=crop&auto=format",
    tags: ["AI", "Flutter", "Claude"],
    big: false,
  },
  {
    type: "Series",
    icon: Layers,
    color: "#00d4ff",
    title: "Flutter Mastery: 30 Hari Challenge",
    desc: "30 proyek kecil untuk jago Flutter.",
    readTime: "30-episode series",
    category: "Flutter",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=240&fit=crop&auto=format",
    tags: ["Flutter", "Challenge"],
    big: false,
  },
];

export function MediaHubSection({ darkMode }: MediaHubSectionProps) {
  const cardBg = darkMode ? "#0d1629" : "#ffffff";
  const borderColor = darkMode ? "rgba(61,139,255,0.15)" : "rgba(0,85,255,0.1)";
  const textMuted = darkMode ? "#7c8db5" : "#64748b";
  const textMain = darkMode ? "#e8f0ff" : "#0d1117";

  return (
    <section id="media" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: darkMode
            ? "radial-gradient(ellipse at 20% 50%, rgba(139,92,246,0.08) 0%, transparent 60%)"
            : "radial-gradient(ellipse at 20% 50%, rgba(139,92,246,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with mascot */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-16"
        >
          <div className="flex items-center gap-6">
            <CodingSkuyMascot variant="idea" size={80} className="flex-shrink-0" />
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-1 rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#ff6b35]" />
                <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: "#8b5cf6" }}>
                  CodingSkuy Media
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black" style={{ color: textMain }}>
                Learn,{" "}
                <span className="bg-gradient-to-r from-[#8b5cf6] to-[#ff6b35] bg-clip-text text-transparent">
                  Build,
                </span>{" "}
                Share
              </h2>
            </div>
          </div>
          <a
            href="#"
            className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-semibold border transition-all hover:scale-105"
            style={{
              borderColor: darkMode ? "rgba(139,92,246,0.3)" : "rgba(139,92,246,0.2)",
              color: "#8b5cf6",
            }}
          >
            All Content <ArrowRight size={15} />
          </a>
        </motion.div>

        {/* Magazine grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Featured — big card spans 2 rows */}
          {featured.filter((f) => f.big).map((item) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className="lg:col-span-2 lg:row-span-2 group rounded-3xl overflow-hidden cursor-pointer transition-all duration-300"
              style={{
                background: cardBg,
                border: `1px solid ${borderColor}`,
                boxShadow: darkMode ? "0 12px 40px rgba(0,0,0,0.3)" : "0 12px 40px rgba(0,85,255,0.07)",
              }}
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span
                    className="px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1"
                    style={{
                      background: `${item.color}20`,
                      color: item.color,
                      border: `1px solid ${item.color}40`,
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <item.icon size={11} />
                    {item.type}
                  </span>
                  <span
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold"
                    style={{ background: "rgba(0,0,0,0.5)", color: "white", backdropFilter: "blur(8px)" }}
                  >
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 leading-snug" style={{ color: textMain }}>{item.title}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: textMuted }}>{item.desc}</p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded-md text-xs font-mono" style={{ background: `${item.color}10`, color: item.color }}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="flex items-center gap-1 text-xs" style={{ color: textMuted }}>
                    <Clock size={11} /> {item.readTime}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Small cards */}
          {featured.filter((f) => !f.big).map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="group rounded-3xl overflow-hidden cursor-pointer transition-all duration-300"
              style={{
                background: cardBg,
                border: `1px solid ${borderColor}`,
                boxShadow: darkMode ? "0 8px 24px rgba(0,0,0,0.2)" : "0 8px 24px rgba(0,85,255,0.05)",
              }}
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <span
                  className="absolute top-3 left-3 px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1"
                  style={{
                    background: `${item.color}20`,
                    color: item.color,
                    border: `1px solid ${item.color}40`,
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <item.icon size={10} /> {item.type}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-sm mb-1 leading-snug" style={{ color: textMain }}>{item.title}</h3>
                <p className="text-xs leading-relaxed mb-3" style={{ color: textMuted }}>{item.desc}</p>
                <span className="text-xs" style={{ color: textMuted }}>
                  <Clock size={10} className="inline mr-1" />{item.readTime}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
