import { motion } from "motion/react";
import { ExternalLink, Github, Smartphone, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";

const projects = [
  {
    id: 1,
    title: "E-Commerce Mobile App",
    titleEn: "E-Commerce Mobile App",
    description: "Aplikasi e-commerce lengkap dengan payment gateway dan real-time tracking",
    descriptionEn: "Complete e-commerce app with payment gateway and real-time tracking",
    tech: ["Flutter", "Firebase", "Stripe"],
    color: "from-blue-500 to-cyan-500",
    gradient: "bg-gradient-to-br from-blue-100 to-cyan-100",
  },
  {
    id: 2,
    title: "Social Media Dashboard",
    titleEn: "Social Media Dashboard",
    description: "Dashboard analytics untuk monitoring performa media sosial",
    descriptionEn: "Analytics dashboard for social media performance monitoring",
    tech: ["Flutter", "REST API", "Charts"],
    color: "from-purple-500 to-pink-500",
    gradient: "bg-gradient-to-br from-purple-100 to-pink-100",
  },
  {
    id: 3,
    title: "Fitness Tracker App",
    titleEn: "Fitness Tracker App",
    description: "Aplikasi tracking aktivitas olahraga dengan AI recommendations",
    descriptionEn: "Fitness activity tracking app with AI recommendations",
    tech: ["Android Native", "ML Kit", "SQLite"],
    color: "from-green-500 to-emerald-500",
    gradient: "bg-gradient-to-br from-green-100 to-emerald-100",
  },
  {
    id: 4,
    title: "Food Delivery App",
    titleEn: "Food Delivery App",
    description: "Platform food delivery dengan fitur real-time order tracking",
    descriptionEn: "Food delivery platform with real-time order tracking",
    tech: ["Flutter", "Firebase", "Google Maps"],
    color: "from-orange-500 to-red-500",
    gradient: "bg-gradient-to-br from-orange-100 to-red-100",
  },
  {
    id: 5,
    title: "Learning Management System",
    titleEn: "Learning Management System",
    description: "Platform belajar online dengan video streaming dan quiz interaktif",
    descriptionEn: "Online learning platform with video streaming and interactive quiz",
    tech: ["Flutter", "Video Player", "Firebase"],
    color: "from-indigo-500 to-blue-500",
    gradient: "bg-gradient-to-br from-indigo-100 to-blue-100",
  },
  {
    id: 6,
    title: "Crypto Wallet App",
    titleEn: "Crypto Wallet App",
    description: "Dompet digital untuk mengelola cryptocurrency dengan keamanan tinggi",
    descriptionEn: "Digital wallet for managing cryptocurrency with high security",
    tech: ["Flutter", "Blockchain API", "Biometric"],
    color: "from-yellow-500 to-amber-500",
    gradient: "bg-gradient-to-br from-yellow-100 to-amber-100",
  },
];

export function PortfolioSection() {
  return (
    <section id="portfolio" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/50 dark:via-blue-950/30 to-transparent pointer-events-none" />

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
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block"
            >
              <Sparkles className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
            </motion.div>
          </div>
          <h2 className="text-4xl sm:text-5xl bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent">
            Portofolio Project
          </h2>
          <h3 className="text-2xl text-slate-500 dark:text-slate-400">Selected Works</h3>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Beberapa project mobile app yang sudah saya kerjakan dengan teknologi modern dan best practices
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <Card className="group overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
                {/* Card Header with Gradient */}
                <div className={`${project.gradient} p-6 relative overflow-hidden`}>
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -mr-16 -mt-16" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/20 rounded-full -ml-12 -mb-12" />
                  
                  {/* Project Icon */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className={`w-16 h-16 bg-gradient-to-br ${project.color} rounded-2xl flex items-center justify-center shadow-lg mb-4 relative z-10`}
                  >
                    <Smartphone className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* Floating Sparkles */}
                  <motion.div
                    animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute top-4 right-4"
                  >
                    <Sparkles className="w-6 h-6 text-yellow-500" />
                  </motion.div>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-4 bg-white">
                  {/* Title */}
                  <div>
                    <h4 className="text-xl text-slate-800 mb-1">{project.title}</h4>
                    <p className="text-sm text-slate-500">{project.titleEn}</p>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <p className="text-sm text-slate-600">{project.description}</p>
                    <p className="text-xs text-slate-400 italic">{project.descriptionEn}</p>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="bg-slate-100 text-slate-700 hover:bg-slate-200"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-4 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-blue-300 text-blue-600 hover:bg-blue-50"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Demo
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-slate-300 text-slate-600 hover:bg-slate-50"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </Button>
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`} />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Tertarik untuk berkolaborasi atau melihat project lainnya?
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          >
            <Github className="w-5 h-5 mr-2" />
            View More on GitHub
          </Button>
        </motion.div>
      </div>
    </section>
  );
}