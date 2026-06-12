import { motion } from "motion/react";
import { MapPin, Mail, Smartphone, Server, Brain, PenTool, Users } from "lucide-react";

interface AboutSectionProps {
  darkMode: boolean;
}

const highlights = [
  { icon: Smartphone, label: "Mobile Dev", color: "#3d8bff", desc: "Flutter & Android native" },
  { icon: Server, label: "Backend", color: "#00d4ff", desc: "REST API & Cloud services" },
  { icon: Brain, label: "AI Exploration", color: "#8b5cf6", desc: "LLM, MCP & Agents" },
  { icon: PenTool, label: "Tech Writing", color: "#ff6b35", desc: "Articles & tutorials" },
  { icon: Users, label: "Community", color: "#ffd700", desc: "Building together" },
];

export function AboutSection({ darkMode }: AboutSectionProps) {
  const cardBg = darkMode ? "#0d1629" : "#ffffff";
  const borderColor = darkMode ? "rgba(61,139,255,0.15)" : "rgba(0,85,255,0.1)";
  const textMuted = darkMode ? "#7c8db5" : "#64748b";
  const textMain = darkMode ? "#e8f0ff" : "#0d1117";

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-16"
        >
          <div className="w-8 h-1 rounded-full bg-gradient-to-r from-[#3d8bff] to-[#00d4ff]" />
          <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: "#3d8bff" }}>
            Tentang CodingSkuy
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — photo + info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            {/* Profile photo card */}
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{
                background: cardBg,
                border: `1px solid ${borderColor}`,
                boxShadow: darkMode ? "0 24px 60px rgba(0,0,0,0.4)" : "0 24px 60px rgba(0,85,255,0.08)",
              }}
            >
              {/* Photo */}
              <div className="aspect-[4/3] relative overflow-hidden">
                <img
                  src="https://media.licdn.com/dms/image/v2/D5603AQGOE-f4m7IIDQ/profile-displayphoto-crop_800_800/B56ZpCgsUyIsAI-/0/1762052459433?e=1782950400&v=beta&t=qAA8WLRc4lCQu0JgH4EIJjZ3tXgJijh-vfa2kZAkjJo"
                  alt="Rois Khoiron — Software Engineer"
                  className="w-full h-full object-cover"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#060b18]/80 via-transparent to-transparent" />
                {/* Name overlay */}
                <div className="absolute bottom-4 left-4">
                  <p className="text-white font-bold text-xl">Rois Khoiron</p>
                  <p className="text-[#00d4ff] text-sm font-medium">Software Engineer & Educator</p>
                </div>
              </div>

              {/* Info chips */}
              <div className="p-5 flex flex-wrap gap-2">
                <span className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full" style={{ background: darkMode ? "#131e38" : "#e8edff", color: textMuted }}>
                  <MapPin size={11} /> Bandung, Indonesia
                </span>
                <span className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full" style={{ background: darkMode ? "#131e38" : "#e8edff", color: textMuted }}>
                  <Mail size={11} /> rois@codingskuy.com
                </span>
                <span className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full" style={{ background: "rgba(0,212,255,0.1)", color: "#00d4ff", border: "1px solid rgba(0,212,255,0.2)" }}>
                  ✅ Open to Work
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right — story + highlights */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-8"
          >
            <div>
              <h2 className="text-4xl sm:text-5xl font-black mb-4" style={{ color: textMain }}>
                Cerita{" "}
                <span className="bg-gradient-to-r from-[#3d8bff] to-[#00d4ff] bg-clip-text text-transparent">
                  CodingSkuy
                </span>
              </h2>
              <div className="flex flex-col gap-4" style={{ color: textMuted }}>
                <p className="leading-relaxed">
                  <strong style={{ color: "#3d8bff" }}>CodingSkuy!</strong> adalah platform belajar teknologi yang dibangun dari keprihatinan — betapa sulitnya menemukan konten berkualitas berbahasa Indonesia untuk belajar coding. Semuanya dimulai dari catatan kecil Rois Khoiron saat belajar otodidak, berkembang menjadi media dengan 150+ artikel, puluhan video tutorial, dan ribuan anggota komunitas.
                </p>
                <p className="leading-relaxed">
                  Misi kami sederhana: membuat belajar teknologi jadi menyenangkan, praktis, dan accessible untuk semua developer Indonesia — melalui artikel, video, learning paths, eksperimen AI, dan komunitas yang saling mendukung.
                </p>
              </div>
            </div>

            {/* Highlights grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {highlights.map(({ icon: Icon, label, color, desc }) => (
                <motion.div
                  key={label}
                  whileHover={{ y: -3, scale: 1.02 }}
                  className="p-4 rounded-2xl cursor-default transition-all duration-200"
                  style={{
                    background: cardBg,
                    border: `1px solid ${borderColor}`,
                    boxShadow: darkMode ? "0 4px 20px rgba(0,0,0,0.2)" : "0 4px 20px rgba(0,85,255,0.04)",
                  }}
                >
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-2" style={{ background: `${color}15` }}>
                    <Icon size={16} style={{ color }} />
                  </div>
                  <p className="text-sm font-semibold mb-0.5" style={{ color: textMain }}>{label}</p>
                  <p className="text-xs leading-snug" style={{ color: textMuted }}>{desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Story card */}
            <div
              className="p-5 rounded-2xl"
              style={{
                background: darkMode ? "rgba(61,139,255,0.06)" : "rgba(0,85,255,0.03)",
                border: `1px solid ${borderColor}`,
              }}
            >
              <p className="text-sm italic leading-relaxed" style={{ color: textMuted }}>
                "CodingSkuy lahir dari pengalaman pahit-belajar coding dari sumber berbahasa Inggris yang tidak selalu mudah dipahami. Sekarang kami hadir dengan 150+ konten berkualitas dalam bahasa Indonesia — dan baru memulai."
              </p>
              <p className="text-xs font-semibold mt-3" style={{ color: "#3d8bff" }}>— Rois Khoiron, Founder</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
