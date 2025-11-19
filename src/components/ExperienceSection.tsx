import { motion } from "motion/react";
import { Briefcase, Calendar, MapPin, ChevronRight } from "lucide-react";
import { Card } from "./ui/card";

const experiences = [
  {
    company: "PT. DIGITAL SEKURITI INDONESIA",
    location: "Jakarta & Yogyakarta",
    period: "Feb 2022 – Sekarang",
    periodEn: "Feb 2022 – Present",
    type: "Cybersecurity Company",
    positions: [
      {
        title: "HEAD OF MOBILE DEVELOPER",
        titleEn: "Head of Mobile Developer",
        period: "Current",
        responsibilities: [
          "Membangun dan mengelola tim mobile developer untuk meningkatkan kualitas dan efisiensi",
          "Memimpin roadmap teknis pengembangan aplikasi mobile berbasis Flutter, Jetpack Compose, dan SwiftUI",
          "Mengembangkan standar kode dan workflow development (CI/CD, code review)",
          "Berkolaborasi dengan tim product dan project untuk menentukan aturan kerja yang terintegrasi",
        ],
      },
      {
        title: "SENIOR MOBILE DEVELOPER",
        titleEn: "Senior Mobile Developer",
        period: "Feb 2022 – Mid 2023",
        responsibilities: [
          "Menangani project secara langsung sebagai PIC pengembangan aplikasi",
          "Mengembangkan aplikasi dengan Clean Architecture",
          "Menyiapkan dan membagi task dalam tim",
          "Meningkatkan performa dan skalabilitas aplikasi dengan refactoring modular",
        ],
      },
    ],
    color: "from-blue-500 to-cyan-500",
  },
  {
    company: "PT ENB MOBILE CARE (Powered by Erajaya)",
    location: "Jakarta",
    period: "Apr 2021 – Jan 2022",
    periodEn: "Apr 2021 – Jan 2022",
    type: "Marketing Services Company",
    positions: [
      {
        title: "SENIOR MOBILE DEVELOPER",
        titleEn: "Senior Mobile Developer",
        period: "9 months",
        responsibilities: [
          "Memimpin implementasi fitur-fitur utama untuk aplikasi trade-in smartphone di berbagai entitas retail",
          "Berkolaborasi dengan tim QA, backend, dan UI/UX untuk menjaga stabilitas dan usability aplikasi",
          "Mengaudit arsitektur dan alur kode project legacy dan merefactor menjadi lebih modular",
          "Mengintegrasikan third-party API untuk validasi IMEI dan proses logistik perangkat",
        ],
      },
    ],
    color: "from-purple-500 to-pink-500",
  },
  {
    company: "PT HAPPY LIFE INDONESIA",
    location: "Jakarta",
    period: "Sept 2020 – Apr 2021",
    periodEn: "Sept 2020 – Apr 2021",
    type: "Application Development Company",
    positions: [
      {
        title: "JUNIOR MOBILE DEVELOPER",
        titleEn: "Junior Mobile Developer",
        period: "7 months",
        responsibilities: [
          "Merancang dan mengimplementasikan user interface berbasis XML sesuai Material Design guidelines",
          "Mengintegrasikan RESTful API untuk pengambilan konten dinamis dan sistem pencarian vendor",
          "Membuat modul interaktif seperti quiz, audio interaktif, dan galeri vendor",
          "Berkolaborasi dengan tim design, content, dan QA dalam sprint mingguan menggunakan metode Agile/Scrum",
        ],
      },
    ],
    color: "from-green-500 to-emerald-500",
  },
];

export function ExperienceSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-transparent via-purple-50/30 to-transparent">
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
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Briefcase className="w-8 h-8 text-blue-600 mx-auto mb-4" />
            </motion.div>
          </div>
          <h2 className="text-4xl sm:text-5xl bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent">
            Pengalaman Kerja
          </h2>
          <h3 className="text-2xl text-slate-500">Work Experience</h3>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Perjalanan karir saya dalam dunia mobile development
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-500 transform -translate-x-1/2" />

          {/* Experience Cards */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative grid lg:grid-cols-2 gap-8 items-center ${
                  index % 2 === 0 ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* Timeline Dot */}
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className={`hidden lg:block absolute left-1/2 top-1/2 w-6 h-6 bg-gradient-to-br ${exp.color} rounded-full border-4 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2 z-10`}
                />

                {/* Card */}
                <div className={`${index % 2 === 0 ? "lg:col-start-1" : "lg:col-start-2"}`}>
                  <Card className="p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-0 bg-white overflow-hidden group">
                    {/* Decorative Background */}
                    <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${exp.color} opacity-5 rounded-full -mr-32 -mt-32 group-hover:opacity-10 transition-opacity`} />

                    <div className="relative z-10 space-y-6">
                      {/* Company Header */}
                      <div>
                        <div className={`inline-block px-4 py-2 bg-gradient-to-r ${exp.color} rounded-lg mb-4`}>
                          <Briefcase className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-2xl text-slate-800 mb-2">
                          {exp.company}
                        </h3>
                        <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-slate-400" />
                            {exp.location}
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-slate-400" />
                            <span>{exp.period}</span>
                          </div>
                        </div>
                        <p className="text-sm text-slate-500 mt-2 italic">{exp.type}</p>
                      </div>

                      {/* Positions */}
                      {exp.positions.map((position, posIndex) => (
                        <div key={posIndex} className="space-y-3">
                          <div className="border-l-4 border-blue-500 pl-4">
                            <h4 className="text-lg text-slate-800">
                              {position.title}
                            </h4>
                            <p className="text-sm text-slate-500">{position.titleEn}</p>
                            {position.period && (
                              <p className="text-xs text-slate-400 mt-1">{position.period}</p>
                            )}
                          </div>

                          <ul className="space-y-2">
                            {position.responsibilities.slice(0, 3).map((resp, respIndex) => (
                              <motion.li
                                key={respIndex}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: respIndex * 0.1 }}
                                className="flex items-start gap-3 text-sm text-slate-600"
                              >
                                <ChevronRight className="w-4 h-4 text-cyan-500 flex-shrink-0 mt-0.5" />
                                <span>{resp}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

                {/* Empty space for alternating layout */}
                <div className={`hidden lg:block ${index % 2 === 0 ? "lg:col-start-2" : "lg:col-start-1"}`} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
