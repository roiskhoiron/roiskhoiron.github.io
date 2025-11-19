import { motion } from "motion/react";
import { Code, Sparkles, Coffee, Heart } from "lucide-react";
import { PhotoSwitcher } from "./PhotoSwitcher";
import { useState } from "react";
import imgPhoto1 from "figma:asset/d32f49c82653caf8c303866215ac61f721b9440e.png";
import imgPhoto2 from "figma:asset/4b819441208d57e40fee6dee2a89f1597026d00b.png";
import imgMascot from "figma:asset/d736fd53b3f8375b27cbdda00c20fb9e200b49c2.png";

const aboutPhotos = [imgPhoto1, imgPhoto2];

export function AboutSection() {
  const [currentPhoto, setCurrentPhoto] = useState(0);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-cyan-400/10 dark:bg-cyan-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 dark:bg-purple-700/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Photo with Bubble Design */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            {/* Bubble Background */}
            <div className="relative">
              {/* Main Photo with Bubble Border */}
              <div className="relative rounded-[3rem] overflow-hidden border-8 border-dashed border-blue-400/30 dark:border-cyan-500/30 p-4 bg-gradient-to-br from-cyan-100 via-blue-50 to-purple-100 dark:from-cyan-900 dark:via-blue-950 dark:to-purple-900">
                <div className="rounded-[2.5rem] overflow-hidden shadow-2xl">
                  <motion.img
                    key={currentPhoto}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    src={aboutPhotos[currentPhoto]}
                    alt="Rois Khoiron - Casual"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>

              {/* Photo Switcher */}
              <PhotoSwitcher
                currentPhoto={currentPhoto}
                onPhotoChange={setCurrentPhoto}
                totalPhotos={aboutPhotos.length}
              />

              {/* Floating Mascot */}
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, -10, 0],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -bottom-10 -right-10 w-40 h-40 z-10"
              >
                <img
                  src={imgMascot}
                  alt="CodingSkuy Character"
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
              </motion.div>

              {/* Decorative Bubbles */}
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-6 -left-6 w-16 h-16 bg-yellow-400 dark:bg-yellow-500 rounded-full shadow-lg flex items-center justify-center"
              >
                <Code className="w-8 h-8 text-white" />
              </motion.div>

              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2.5, delay: 0.5, repeat: Infinity }}
                className="absolute top-1/4 -right-8 w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600 rounded-full shadow-lg opacity-80"
              />

              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2.2, delay: 1, repeat: Infinity }}
                className="absolute bottom-1/3 -left-8 w-14 h-14 bg-cyan-500 dark:bg-cyan-600 rounded-full shadow-lg opacity-70"
              />
            </div>
          </motion.div>

          {/* Right - About Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 order-1 lg:order-2"
          >
            {/* Section Title */}
            <div className="space-y-2">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block"
              >
                <span className="text-cyan-600 dark:text-cyan-400 flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5" />
                  Tentang Saya
                </span>
              </motion.div>
              <h2 className="text-4xl sm:text-5xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Tentang Saya
              </h2>
              <h3 className="text-2xl text-slate-500 dark:text-slate-400">About Me</h3>
            </div>

            {/* Indonesian Description */}
            <div className="space-y-4 p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border-2 border-blue-200 dark:border-blue-700 shadow-lg">
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Halo! 👋 Saya Rois Khoiron, seorang Mobile Developer yang passionate dalam membangun aplikasi mobile yang keren dan bermanfaat. 
                Dengan pengalaman lebih dari 5 tahun, saya sudah menangani berbagai project dari startup hingga enterprise.
              </p>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Selain coding, saya juga founder channel YouTube <span className="text-blue-600 dark:text-cyan-400">CodingSkuy!</span> — sebuah channel edukasi programming 
                yang dibuat dengan pendekatan fun dan engaging. Karena menurut saya, belajar coding itu harusnya seru, bukan bikin stress! 😄
              </p>
            </div>

            {/* English Description */}
            <div className="space-y-4 p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/50 dark:to-purple-900/50 rounded-2xl border-2 border-purple-200 dark:border-purple-700 shadow-lg">
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Hi! I'm Rois Khoiron, a passionate Mobile Developer focused on building amazing and useful mobile applications. 
                With over 5 years of experience, I've worked on various projects from startups to enterprise solutions.
              </p>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Beyond coding, I'm also the founder of the YouTube channel <span className="text-blue-600 dark:text-cyan-400">CodingSkuy!</span> — an educational programming 
                channel designed with a fun and engaging approach. Because I believe learning to code should be enjoyable, not stressful!
              </p>
            </div>

            {/* Fun Facts */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-4 bg-cyan-500 dark:bg-cyan-600 rounded-xl shadow-lg text-white text-center"
              >
                <Coffee className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">Powered by Coffee</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-4 bg-purple-500 dark:bg-purple-600 rounded-xl shadow-lg text-white text-center"
              >
                <Heart className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">Love Clean Code</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}