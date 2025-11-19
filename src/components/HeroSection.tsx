import { motion } from "motion/react";
import { ChevronDown, Sparkles, Code2, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import imgPhoto1 from "figma:asset/4b819441208d57e40fee6dee2a89f1597026d00b.png";
import imgBrandingCharacter from "figma:asset/5324dd422297e333b64d5a5da3e021de9f48b24c.png";

export function HeroSection() {
  const scrollToPortfolio = () => {
    document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Badge className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-0 px-4 py-2">
                <Sparkles className="w-4 h-4 mr-2" />
                CodingSkuy!
              </Badge>
            </motion.div>

            {/* Main Headlines */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent">
                Halo, Saya Rois — Mobile Developer yang Suka Ngulik!
              </h1>
              <h2 className="text-2xl sm:text-3xl text-slate-600">
                Hi, I'm Rois — A Mobile Developer Who Loves Building Cool Stuff!
              </h2>
            </div>

            {/* Subheadline */}
            <p className="text-lg text-slate-700 max-w-xl">
              Mobile Developer dengan 5+ tahun pengalaman dalam Flutter, Android Native, dan iOS SwiftUI. 
              Founder channel <span className="text-blue-600">CodingSkuy!</span> — tempat belajar coding yang seru dan menyenangkan!
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={scrollToPortfolio}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white group"
              >
                <Sparkles className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                Lihat Portofolio
              </Button>
              <Button
                onClick={scrollToPortfolio}
                size="lg"
                variant="outline"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                View Portfolio
              </Button>
            </div>

            {/* Decorative Doodles */}
            <div className="flex gap-4 pt-4">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Code2 className="w-8 h-8 text-cyan-500" />
              </motion.div>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, delay: 0.3, repeat: Infinity }}
              >
                <Zap className="w-8 h-8 text-yellow-500" />
              </motion.div>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, delay: 0.6, repeat: Infinity }}
              >
                <Sparkles className="w-8 h-8 text-purple-500" />
              </motion.div>
            </div>
          </motion.div>

          {/* Right Content - Photo with Decorations */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* Glowing Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 rounded-3xl blur-2xl opacity-30 animate-pulse" />
              
              {/* Main Photo */}
              <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-gradient-to-br from-blue-100 to-purple-100">
                <img
                  src={imgPhoto1}
                  alt="Rois Khoiron"
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Floating Character Mascot */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 5, 0, -5, 0],
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-8 -right-8 w-32 h-32 z-10"
              >
                <img
                  src={imgBrandingCharacter}
                  alt="CodingSkuy Mascot"
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
              </motion.div>

              {/* Decorative Elements */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-6 -left-6 w-20 h-20 border-4 border-dashed border-cyan-500 rounded-full"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-1/4 -left-4 w-12 h-12 bg-yellow-400 rounded-lg rotate-12 opacity-80"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
                className="absolute bottom-1/4 -right-4 w-16 h-16 bg-purple-500 rounded-full opacity-60"
              />
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8 text-slate-400" />
        </motion.div>
      </div>
    </section>
  );
}
