import { motion } from "motion/react";
import { Code2, Smartphone, Database, Zap, Blocks, Terminal } from "lucide-react";
import imgFlutterLogo from "figma:asset/31245bcd6a6df6a4286bc8b8157adb1b5d2af354.png";
import imgCharacter from "figma:asset/cbb3501d397ab703c4f7dd604efd0afbea6ad23e.png";

const skills = [
  {
    name: "Flutter",
    icon: imgFlutterLogo,
    color: "from-blue-500 to-cyan-500",
    category: "Mobile Framework",
  },
  {
    name: "Dart",
    icon: Terminal,
    color: "from-cyan-500 to-blue-600",
    category: "Language",
  },
  {
    name: "Android Native",
    icon: Smartphone,
    color: "from-green-500 to-emerald-500",
    category: "Platform",
  },
  {
    name: "Firebase",
    icon: Database,
    color: "from-yellow-500 to-orange-500",
    category: "Backend",
  },
  {
    name: "REST API",
    icon: Zap,
    color: "from-purple-500 to-pink-500",
    category: "Integration",
  },
  {
    name: "Python",
    icon: Code2,
    color: "from-blue-600 to-indigo-600",
    category: "Language",
  },
];

export function SkillsSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
        >
          <div className="inline-block">
            <div className="flex items-center justify-center gap-2 text-cyan-600 mb-4">
              <Code2 className="w-6 h-6" />
              <Blocks className="w-6 h-6" />
              <Zap className="w-6 h-6" />
            </div>
          </div>
          <h2 className="text-4xl sm:text-5xl bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent">
            Keahlian Utama
          </h2>
          <h3 className="text-2xl text-slate-500">Core Skills</h3>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Tools dan teknologi yang saya gunakan untuk membangun aplikasi mobile yang powerful dan scalable
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group"
            >
              <div className={`relative p-8 rounded-2xl bg-gradient-to-br ${skill.color} shadow-xl hover:shadow-2xl transition-all duration-300`}>
                {/* Decorative Doodles */}
                <div className="absolute top-2 right-2 opacity-20 group-hover:opacity-40 transition-opacity">
                  <motion.div
                    animate={{ rotate: [0, 10, 0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Code2 className="w-6 h-6 text-white" />
                  </motion.div>
                </div>

                <div className="relative z-10 space-y-4">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    {typeof skill.icon === 'string' ? (
                      <img src={skill.icon} alt={skill.name} className="w-12 h-12 object-contain" />
                    ) : (
                      <skill.icon className="w-10 h-10 text-white" />
                    )}
                  </div>

                  {/* Content */}
                  <div>
                    <h4 className="text-2xl text-white mb-1">{skill.name}</h4>
                    <p className="text-white/80 text-sm">{skill.category}</p>
                  </div>

                  {/* Lightning Doodle */}
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, delay: index * 0.2, repeat: Infinity }}
                    className="absolute bottom-4 right-4"
                  >
                    <Zap className="w-6 h-6 text-yellow-300 opacity-60" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Character Mascot with Fun Stats */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mt-16"
        >
          <div className="bg-gradient-to-br from-blue-100 via-purple-100 to-cyan-100 rounded-3xl p-8 shadow-2xl border-4 border-white">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left - Character */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="relative"
              >
                <img
                  src={imgCharacter}
                  alt="CodingSkuy Character"
                  className="w-full max-w-xs mx-auto drop-shadow-2xl"
                />
                
                {/* Floating Code Brackets */}
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute top-0 left-0 text-6xl text-cyan-500 opacity-30"
                >
                  {"{"}
                </motion.div>
                <motion.div
                  animate={{ rotate: [360, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute bottom-0 right-0 text-6xl text-purple-500 opacity-30"
                >
                  {"}"}
                </motion.div>
              </motion.div>

              {/* Right - Stats */}
              <div className="space-y-6">
                <h3 className="text-3xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Fun Stats & Achievements
                </h3>
                
                <div className="space-y-4">
                  <motion.div
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-md"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                      <Smartphone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl text-blue-600">50+</p>
                      <p className="text-sm text-slate-600">Apps Developed</p>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-md"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <Code2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl text-purple-600">5+</p>
                      <p className="text-sm text-slate-600">Years Experience</p>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-md"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl text-orange-600">Clean Code</p>
                      <p className="text-sm text-slate-600">Architecture Expert</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
