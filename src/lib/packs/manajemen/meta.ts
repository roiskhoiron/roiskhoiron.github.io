import type { Deck, Post, BlogPost } from '../../data';

const DATE = '2026-11-28';
const deck = (slug: string, title: string, tags: string[], slides: number, desc: string): Deck =>
  ({ slug, title, type: 'Management Deck', tags, desc, lang: 'ID', slides, color: '', date: DATE });
const post = (slug: string, title: string, desc: string): Post =>
  ({ slug, title, tag: 'manajemen', desc, date: DATE, color: '', accent: 'manajemen' });
const note = (slug: string, title: string, mins: number, tags: string[], excerpt: string): BlogPost =>
  ({ slug, title, date: DATE, mins, tags, excerpt });

export const decks: Deck[] = [
  deck('peta-keputusan-ai', 'Peta Keputusan: Apa yang Tidak Diserahkan ke AI', ['manajemen', 'ai-agent', 'akuntabilitas'], 8,
    'AI bisa membuka PR, menjalankan tes, bahkan deploy. Pertanyaannya: keputusan mana yang tetap harus punya nama manusia di belakangnya?'),
  deck('mengukur-tim-era-ai', 'Mengukur Tim Engineering Saat AI Ikut Menulis Kode', ['manajemen', 'metrik', 'dora'], 8,
    'Begitu AI masuk tim, baris kode dan jumlah PR gampang naik. Masalahnya, dua angka itu tidak pernah mengukur hal yang kamu pedulikan.'),
  deck('biaya-nyata-ai-coding', 'Biaya Nyata AI Coding: Bukan Cuma Langganan', ['manajemen', 'biaya', 'ai'], 8,
    'Harga langganan per kursi adalah angka yang paling mudah dilihat. Biaya lainnya muncul di review, rework, utang teknis, dan keamanan.'),
  deck('bottleneck-pindah-ke-review', 'Bottleneck Pindah: Dari Menulis ke Me-review', ['manajemen', 'code-review', 'tim'], 8,
    'Saat AI mempercepat penulisan kode, antrean berpindah ke meja reviewer. Struktur tim dan cara review harus ikut berubah.'),
  deck('spec-adalah-aset-baru', 'Spec Adalah Aset Baru Tim Engineering', ['manajemen', 'spec', 'product'], 8,
    'AI mengerjakan persis apa yang tertulis. Tiket yang kabur dulu ditambal oleh intuisi programmer. Sekarang, tidak ada yang menambalnya.'),
  deck('junior-developer-era-ai', 'Junior Developer di Era AI: Dari Mana Senior Berikutnya?', ['manajemen', 'karier', 'mentoring'], 8,
    'Kalau AI mengerjakan semua tugas level junior, siapa yang jadi senior lima tahun lagi? Pertanyaan ini milik CTO, bukan cuma milik junior.'),
  deck('kebijakan-ai-data-sensitif', 'Kebijakan AI untuk Perusahaan yang Memegang Data Sensitif', ['manajemen', 'keamanan', 'kebijakan'], 8,
    'Larangan total mendorong orang memakai AI diam-diam. Izin tanpa aturan membuat data pelanggan masuk ke prompt. Ini kerangka di antara keduanya.'),
  deck('rencana-adopsi-ai-90-hari', 'Rencana Adopsi AI 90 Hari untuk Tim Engineering', ['manajemen', 'adopsi-ai', 'strategi'], 8,
    'Membagikan lisensi ke semua orang di hari pertama bukan rencana adopsi. Ini kerangka tiga fase: pilot, perluasan, standardisasi.'),
  deck('rekrutmen-engineer-era-ai', 'Merekrut Engineer Saat Kandidat Memakai AI', ['manajemen', 'rekrutmen', 'interview'], 8,
    'Soal algoritma yang bisa diselesaikan chatbot dalam hitungan detik tidak lagi membedakan kandidat. Ini cara merancang wawancara yang tetap bermakna.'),
  deck('estimasi-saat-ai-menulis-kode', 'Estimasi dan Perencanaan Saat AI Menulis Sebagian Kode', ['manajemen', 'estimasi', 'planning'], 8,
    'AI mempercepat bagian yang paling mudah diestimasi. Bagian yang sulit, seperti kebutuhan kabur dan integrasi, tetap sulit. Begini menyesuaikan planning.')
];

export const posts: Post[] = [
  post('keputusan-milik-manusia', 'AI Boleh Membuka PR. Bukan Menekan Merge.',
    'Empat keputusan yang tetap harus punya nama manusia, secepat apa pun agent-mu: Done, merge, production, dan akuntabilitas.'),
  post('baris-kode-bukan-produktivitas', 'Baris Kode Naik. Belum Tentu Timmu Membaik.',
    'Kalau dashboard-mu menghitung baris kode dan jumlah PR, AI sedang membuatnya terlihat hijau. Ini yang sebaiknya diukur.'),
  post('tagihan-ai-di-luar-invoice', 'Tagihan AI yang Tidak Ada di Invoice',
    'Langganan AI per orang terlihat murah. Empat biaya lainnya dibayar dengan jam kerja dan risiko yang tidak masuk laporan keuangan.'),
  post('membaca-kode-tidak-makin-murah', 'Menulis Kode Makin Murah. Membacanya Tidak.',
    'AI mempercepat satu tahap, lalu antrean pindah ke reviewer. Tiga perubahan supaya review tidak jadi titik macet baru.'),
  post('ai-menebak-bukan-bertanya', 'AI Tidak Bertanya Kalau Tiketmu Kabur',
    'Programmer manusia akan menghampiri mejamu. Agent akan menebak. Tiga hal yang harus ada di tiket sebelum dikerjakan siapa pun.'),
  post('senior-lima-tahun-lagi', 'Siapa yang Jadi Senior Lima Tahun Lagi?',
    'Tugas level junior adalah tempat senior dibentuk. Kalau semuanya diambil AI, tim sedang menghapus jalur talentanya sendiri.'),
  post('apa-yang-boleh-masuk-prompt', 'Sebelum Menempel ke Prompt, Tanyakan Ini',
    'Satu Ctrl+V bisa mengirim data pelanggan ke server pihak ketiga. Kebijakan AI dimulai dari satu pertanyaan: data ini kelas apa?'),
  post('adopsi-ai-tiga-fase', 'Bagi Lisensi ke Semua Orang Bukan Rencana',
    'Adopsi AI yang bisa dipertanggungjawabkan butuh baseline, satu tim pilot, dan kriteria berhenti. Ini versi 90 harinya.'),
  post('wawancara-saat-kandidat-pakai-ai', 'Soal Interview-mu Dijawab AI dalam Detik',
    'Kalau tes rekrutmen bisa diselesaikan chatbot, tes itu mengukur siapa yang punya chatbot. Ganti dengan format yang mengukur penilaian.'),
  post('estimasi-bukan-soal-mengetik', 'Kode Jadi Cepat. Tanggal Rilis Belum Tentu.',
    'AI memangkas waktu mengetik, tapi ketidakpastian proyek jarang ada di keyboard. Cara menyesuaikan estimasi tanpa memotong rata.')
];

export const notes: BlogPost[] = [
  note('ai-tidak-bisa-ditelepon-jam-dua-pagi', 'AI Tidak Bisa Ditelepon Jam Dua Pagi', 4, ['manajemen', 'akuntabilitas', 'ai-agent'],
    'Saat production mati tengah malam, yang dibangunkan adalah manusia. Karena itu, keputusan tertentu tidak boleh berpindah tangan, secepat apa pun agent-nya.'),
  note('saat-jumlah-pr-jadi-target', 'Begitu Jumlah PR Jadi Target, Angkanya Berhenti Berarti', 4, ['manajemen', 'metrik', 'dora'],
    'Hukum Goodhart berlaku untuk manusia. Untuk AI agent, ia berlaku lebih cepat lagi, karena agent tidak pernah lelah membuat PR.'),
  note('harga-langganan-bukan-pertanyaannya', 'Harga Langganan AI Bukan Pertanyaan yang Tepat', 4, ['manajemen', 'biaya', 'utang-teknis'],
    'Rapat anggaran sering berhenti di harga per kursi. Pertanyaan yang lebih berguna: siapa yang membaca semua kode baru itu, dan berapa jamnya?'),
  note('reviewer-adalah-jalur-kritis', 'Reviewer Sekarang Ada di Jalur Kritis Timmu', 4, ['manajemen', 'code-review', 'tim'],
    'Dulu yang ditunggu adalah programmer selesai menulis. Sekarang yang ditunggu adalah seseorang sempat membaca. Struktur tim belum tentu siap.'),
  note('menulis-spec-bukan-administrasi', 'Menulis Spec Bukan Pekerjaan Administrasi', 4, ['manajemen', 'spec', 'product'],
    'Banyak engineer menganggap PRD dan acceptance criteria sebagai birokrasi. Di tim yang memakai AI, dokumen itu justru jadi sumber paling hulu dari kode.'),
  note('jangan-hapus-anak-tangga-pertama', 'Jangan Hapus Anak Tangga Pertama', 4, ['manajemen', 'karier', 'mentoring'],
    'Setiap senior engineer pernah menghabiskan sore untuk bug konyol. Kalau AI menghapus semua sore seperti itu, dari mana intuisi mereka akan datang?'),
  note('kebijakan-ai-yang-dipatuhi', 'Kebijakan AI yang Tidak Dipatuhi Lebih Berbahaya dari Tidak Ada', 4, ['manajemen', 'keamanan', 'kebijakan'],
    'Larangan memakai AI terdengar aman di rapat direksi. Di lapangan, larangan itu sering berarti AI tetap dipakai, hanya saja tanpa jejak.'),
  note('adopsi-ai-mulai-dari-satu-tim', 'Mulai Adopsi AI dari Satu Tim yang Membosankan', 4, ['manajemen', 'adopsi-ai', 'strategi'],
    'Godaannya adalah memilih tim paling antusias sebagai pilot. Pilihan yang lebih berguna sering kali tim yang prosesnya paling rapi dan paling rajin mencatat.'),
  note('larangan-ai-di-interview', 'Melarang AI di Interview Menyelesaikan Masalah yang Salah', 4, ['manajemen', 'rekrutmen', 'interview'],
    'Perusahaan sibuk mendeteksi kandidat yang memakai AI. Pertanyaan yang lebih berguna: kalau AI boleh dipakai, apa yang masih membedakan kandidat yang baik?'),
  note('ai-mempercepat-bagian-yang-jarang-telat', 'AI Mempercepat Bagian yang Jarang Bikin Proyek Telat', 4, ['manajemen', 'estimasi', 'planning'],
    'Proyek software jarang telat karena programmer lambat mengetik. Karena itu, mempercepat ketikan tidak otomatis memajukan tanggal rilis.')
];
