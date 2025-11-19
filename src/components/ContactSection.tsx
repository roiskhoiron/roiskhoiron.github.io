import { motion } from "motion/react";
import { Send, Mail, MessageSquare, User, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { useState } from "react";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock form submission
    console.log("Form submitted:", formData);
    alert("Terima kasih! Pesan Anda telah terkirim 😊");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <motion.div
              animate={{ rotate: [0, 15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Send className="w-8 h-8 text-blue-600" />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-8 h-8 text-purple-600" />
            </motion.div>
          </div>

          <h2 className="text-4xl sm:text-5xl bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent">
            Hubungi Saya
          </h2>
          <h3 className="text-2xl text-slate-500">Get in Touch</h3>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Punya project menarik atau ingin berkolaborasi? Jangan ragu untuk menghubungi saya!
          </p>
        </motion.div>

        {/* Contact Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Decorative Elements */}
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute -top-12 -left-12 w-24 h-24 border-4 border-dashed border-cyan-500/30 rounded-full"
          />
          <motion.div
            animate={{
              rotate: [360, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 25, repeat: Infinity }}
            className="absolute -bottom-12 -right-12 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"
          />

          {/* Form Card */}
          <div className="bg-white rounded-3xl shadow-2xl border-4 border-white p-8 sm:p-12 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50" />

            {/* Floating Doodles */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute top-8 right-8 opacity-20"
            >
              <MessageSquare className="w-16 h-16 text-cyan-500" />
            </motion.div>

            <motion.div
              animate={{
                y: [0, -15, 0],
                x: [0, 5, 0],
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute bottom-8 left-8 opacity-20"
            >
              <Mail className="w-12 h-12 text-purple-500" />
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              {/* Bilingual Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl text-slate-800 mb-1">Kirim Pesan</h3>
                <p className="text-slate-500">Send me a message</p>
              </div>

              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2 text-slate-700">
                  <User className="w-4 h-4 text-blue-600" />
                  Nama / Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Nama lengkap Anda / Your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="border-2 border-blue-200 focus:border-blue-500 rounded-xl py-6"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2 text-slate-700">
                  <Mail className="w-4 h-4 text-purple-600" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="border-2 border-purple-200 focus:border-purple-500 rounded-xl py-6"
                />
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <Label htmlFor="message" className="flex items-center gap-2 text-slate-700">
                  <MessageSquare className="w-4 h-4 text-cyan-600" />
                  Pesan / Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="Tuliskan pesan Anda di sini... / Write your message here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={6}
                  className="border-2 border-cyan-200 focus:border-cyan-500 rounded-xl resize-none"
                />
              </div>

              {/* Submit Button */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 hover:from-blue-700 hover:via-purple-700 hover:to-cyan-600 text-white group shadow-xl"
                >
                  <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                  Kirim Pesan / Send Message
                </Button>
              </motion.div>

              {/* Info Text */}
              <div className="text-center pt-4">
                <p className="text-sm text-slate-500">
                  Atau hubungi langsung via email:{" "}
                  <a
                    href="mailto:rois.khoiron@gmail.com"
                    className="text-blue-600 hover:text-blue-700 underline"
                  >
                    rois.khoiron@gmail.com
                  </a>
                </p>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Paper Airplane Doodle */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 45, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 right-0 opacity-30 pointer-events-none"
        >
          <Send className="w-16 h-16 text-blue-500" />
        </motion.div>
      </div>
    </section>
  );
}
