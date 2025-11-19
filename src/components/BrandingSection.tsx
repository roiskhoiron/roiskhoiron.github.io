import { motion } from "motion/react";
import { Youtube, Sparkles, Users, PlayCircle, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";
import imgYouTubeCover from "figma:asset/f13190e76de5ebafdc579365a3f1ee2623769589.png";
import imgCharacter1 from "figma:asset/5324dd422297e333b64d5a5da3e021de9f48b24c.png";
import imgCharacter2 from "figma:asset/e4bfc5d15ea099ac9bf84f497fdcf999e95e0ebe.png";
import imgCharacter3 from "figma:asset/b0dad22240b7c7ccb59841c5d2c79531572d3534.png";

export function BrandingSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-cyan-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItMnpNNDQgNDR2Mi0yem0wLTMwdjItMnptLTIwLTIwdjItMnpNMiAydjItMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40" />
        
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-6"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="inline-block"
          >
            <Youtube className="w-12 h-12 text-red-500 mx-auto mb-4" />
          </motion.div>
          
          <h2 className="text-4xl sm:text-6xl text-white">
            CodingSkuy!
          </h2>
          
          <div className="space-y-3">
            <p className="text-2xl sm:text-3xl text-cyan-400">
              Belajar Coding Itu Seru!
            </p>
            <p className="text-xl sm:text-2xl text-purple-300">
              Learning to Code Should Be Fun!
            </p>
          </div>

          <p className="text-slate-300 max-w-2xl mx-auto">
            Channel YouTube edukatif yang membuat belajar programming jadi lebih menyenangkan 
            dengan karakter lucu dan penjelasan yang mudah dipahami!
          </p>
        </motion.div>

        {/* YouTube Cover */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 group cursor-pointer">
            <img
              src={imgYouTubeCover}
              alt="CodingSkuy YouTube Channel"
              className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
            />
            
            {/* Play Overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.2 }}
                className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center shadow-2xl"
              >
                <PlayCircle className="w-16 h-16 text-white fill-current" />
              </motion.div>
            </div>

            {/* Floating Sparkles */}
            <motion.div
              animate={{ y: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-8 left-8"
            >
              <Sparkles className="w-8 h-8 text-yellow-400" />
            </motion.div>
            <motion.div
              animate={{ y: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
              className="absolute top-8 right-8"
            >
              <Sparkles className="w-8 h-8 text-cyan-400" />
            </motion.div>
          </div>
        </motion.div>

        {/* Characters Showcase */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            { img: imgCharacter1, delay: 0 },
            { img: imgCharacter2, delay: 0.2 },
            { img: imgCharacter3, delay: 0.4 },
          ].map((character, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: character.delay }}
              whileHover={{ y: -10 }}
              className="relative"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-colors">
                <motion.div
                  animate={{
                    y: [0, -15, 0],
                  }}
                  transition={{ duration: 2 + index, repeat: Infinity }}
                >
                  <img
                    src={character.img}
                    alt={`CodingSkuy Character ${index + 1}`}
                    className="w-full h-auto drop-shadow-2xl"
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center"
          >
            <Users className="w-10 h-10 text-cyan-400 mx-auto mb-3" />
            <p className="text-3xl text-white mb-1">10K+</p>
            <p className="text-slate-300">Subscribers</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center"
          >
            <PlayCircle className="w-10 h-10 text-purple-400 mx-auto mb-3" />
            <p className="text-3xl text-white mb-1">100+</p>
            <p className="text-slate-300">Tutorial Videos</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center"
          >
            <TrendingUp className="w-10 h-10 text-yellow-400 mx-auto mb-3" />
            <p className="text-3xl text-white mb-1">50K+</p>
            <p className="text-slate-300">Total Views</p>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <p className="text-white mb-6 text-lg">
            Join ribuan developer yang belajar bareng CodingSkuy!
          </p>
          <Button
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white group"
          >
            <Youtube className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            Subscribe ke Channel
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
