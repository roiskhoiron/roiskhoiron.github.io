import { motion } from "motion/react";
import { Github, Linkedin, Youtube, Mail, Heart, Code2 } from "lucide-react";
import imgCharacterWave from "figma:asset/d736fd53b3f8375b27cbdda00c20fb9e200b49c2.png";

export function Footer() {
  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/roiskhoiron",
      color: "hover:text-slate-800",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://linkedin.com/in/rois-khoiron",
      color: "hover:text-blue-600",
    },
    {
      name: "YouTube",
      icon: Youtube,
      url: "https://youtube.com/@codingskuy",
      color: "hover:text-red-600",
    },
    {
      name: "Email",
      icon: Mail,
      url: "mailto:rois.khoiron@gmail.com",
      color: "hover:text-purple-600",
    },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Left Column - Branding */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              {/* Logo/Name */}
              <h3 className="text-3xl bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Rois Khoiron
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Mobile Developer | Flutter Expert | CodingSkuy! Founder
              </p>
              <p className="text-slate-400 text-xs italic">
                Building awesome mobile apps with passion & fun! 🚀
              </p>
            </motion.div>

            {/* Waving Character */}
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-32"
            >
              <img
                src={imgCharacterWave}
                alt="CodingSkuy Character Waving"
                className="w-full h-auto drop-shadow-2xl"
              />
            </motion.div>
          </div>

          {/* Middle Column - Quick Links */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h4 className="text-xl mb-4 flex items-center gap-2">
                <Code2 className="w-5 h-5 text-cyan-400" />
                Quick Links
              </h4>
              <ul className="space-y-3">
                {[
                  { name: "About", name_id: "Tentang" },
                  { name: "Skills", name_id: "Keahlian" },
                  { name: "Portfolio", name_id: "Portofolio" },
                  { name: "Experience", name_id: "Pengalaman" },
                  { name: "Contact", name_id: "Kontak" },
                ].map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <a
                      href={`#${link.name.toLowerCase()}`}
                      className="text-slate-300 hover:text-cyan-400 transition-colors text-sm flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.name_id} / {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Right Column - Social Media */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="text-xl mb-4">Connect With Me</h4>
              <p className="text-slate-300 text-sm mb-6">
                Mari terhubung dan berkolaborasi bersama!
              </p>

              {/* Social Icons */}
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-slate-300 ${social.color} transition-all duration-300 hover:bg-white/20`}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>

              {/* CodingSkuy Badge */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="mt-6 inline-block"
              >
                <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg px-4 py-2 text-sm">
                  <Youtube className="w-4 h-4 inline mr-2" />
                  CodingSkuy! Channel
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="border-t border-white/10 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-slate-400 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Rois Khoiron. All rights reserved.
            </p>

            {/* Made with Love */}
            <motion.div
              className="flex items-center gap-2 text-slate-400 text-sm"
              whileHover={{ scale: 1.05 }}
            >
              <span>Made with</span>
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart className="w-4 h-4 text-red-500 fill-current" />
              </motion.div>
              <span>using React & Tailwind CSS</span>
            </motion.div>

            {/* Tagline */}
            <p className="text-cyan-400 text-sm italic">
              "Keep coding, keep learning, keep smiling! 😊"
            </p>
          </div>
        </motion.div>
      </div>

      {/* Decorative Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500" />
    </footer>
  );
}
