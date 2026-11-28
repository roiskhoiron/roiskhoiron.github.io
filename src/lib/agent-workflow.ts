// "Agent Workflow" — a four-part series based on Khoiron's own open repositories
// (github.com/roiskhoiron/*-agent-workflow). Facts here follow the repos' READMEs;
// update this file when the kits change.
import type { Deck, DeckSlide, Post, PostSlide } from './data';

const DATE = '2026-11-29';
const deck = (slug: string, title: string, desc: string): Deck =>
  ({ slug, title, type: 'Workflow Deck', tags: ['ai-agent', 'workflow', 'kanban'], desc, lang: 'ID', slides: 0, color: '', date: DATE });
const post = (slug: string, title: string, desc: string): Post =>
  ({ slug, title, tag: 'workflow', desc, date: DATE, color: '', accent: 'workflow' });
const card = (label: string, title: string, body: string, extra: Partial<PostSlide> = {}): PostSlide =>
  ({ num: '', label, title, body, theme: 'white', ...extra });

export const workflowDecks: Deck[] = [
  deck('agent-workflow-1-tiket-ke-pr', 'Agent Workflow #1: Dari Tiket ke PR, Kendali Tetap di Kamu',
    'AI agent mengerjakan tiket kanban-mu dari Todo sampai siap di-review. Satu kolom tidak pernah boleh ia sentuh. Part 1 dari 4.'),
  deck('agent-workflow-2-spec-dulu', 'Agent Workflow #2: Spec Dulu, Baru Tiket',
    'Tiket yang kabur menghasilkan kode yang ngawur. Di part 2, agent menulis PRD, alur, dan kontrak API, dan setiap dokumen harus lolos gerbang.'),
  deck('agent-workflow-3-develop-tiket', 'Agent Workflow #3: Membedah /develop-tiket',
    'Satu perintah, empat dunia: mobile, backend, frontend, dan desain. Apa yang sebenarnya terjadi setelah kamu menekan Enter?'),
  deck('agent-workflow-4-pagar-pengaman', 'Agent Workflow #4: QA Buta dan Agent yang Dilarang ke Production',
    'Bagaimana kalau penguji tidak boleh melihat kodenya, dan agent DevOps tidak boleh menyentuh production? Part terakhir: pagar pengamannya.')
];

export const workflowDeckSlides: Record<string, DeckSlide[]> = {
  'agent-workflow-1-tiket-ke-pr': [
    { layout: 'cover', subtitle: 'Agent Workflow · Part 1 dari 4', title: 'Dari Tiket ke PR, Kendali Tetap di Kamu', message: 'Saya membangun satu set workflow open source supaya AI agent bisa mengerjakan tiket kanban, tanpa pernah mengambil keputusan yang seharusnya milik manusia.', points: ['Tujuh kit, satu kerangka yang sama.', 'Sumber: github.com/roiskhoiron'] },
    { layout: 'bullets', subtitle: 'Masalahnya', title: 'Agent Pintar, Proses Berantakan', message: 'Memberi agent sebuah tiket itu mudah. Yang sulit adalah memastikan hasilnya bisa dipercaya.', points: ['Tiket tidak jelas, agent tetap ngoding.', 'Kode selesai, tapi tidak pernah dites di perangkat.', 'Agent menutup tiket sendiri.', 'Tidak ada jejak apa yang sudah dilakukan.'] },
    { layout: 'bullets', subtitle: 'Kerangkanya', title: 'Satu Papan, Empat Kolom', message: 'Semua kit memakai papan kanban yang sama.', points: ['Todo: tiket menunggu.', 'In Progress: tiket sudah diperiksa dan sedang dikerjakan.', 'Ready To Review: PR siap, bukti tes terlampir.', 'Done: hanya manusia yang boleh memindahkan ke sini.'] },
    { layout: 'cards', subtitle: 'Perintahnya', title: 'Lima Perintah yang Sama di Semua Kit', message: 'Pelajari sekali, pakai di mobile, backend, frontend, QA, DevOps, dan desain.', cards: [{ title: '/validate-tiket', desc: 'Periksa tiket sebelum dikerjakan. Bug dicoba ulang dulu.', icon: '1' }, { title: '/develop-tiket', desc: 'Rencana, kode, review, tes, PR, lalu ke Ready To Review.', icon: '2' }, { title: '/rilis-tiket', desc: 'Tindak lanjut setelah review: revisi atau merge dengan izin.', icon: '3' }, { title: '/branch-manager', desc: 'Menyiapkan rilis per versi. Tag dibuat setelah manusia merge.', icon: '4' }] },
    { layout: 'bullets', subtitle: 'Perintah kelima', title: '/audit-issue: Hanya Membaca', message: 'Untuk keluhan dari lapangan yang belum jadi tiket.', points: ['Agent menyelidiki tanpa mengubah apa pun.', 'Hasilnya laporan, bukan commit.', 'Aman dijalankan kapan saja.'] },
    { layout: 'split', subtitle: 'Dua mode kerja', title: '--tim', leftTitle: '--solo', leftPoints: ['Satu agent menjalankan semua peran berurutan.', 'Cocok untuk tiket kecil.', 'Lebih hemat.'], rightTitle: 'Tim Agent', rightPoints: ['Peran dibagi: perencana, programmer, reviewer, QA, rilis.', 'Dikoordinasi sebuah SPV.', 'Cocok untuk tiket yang berisiko.'] },
    { layout: 'bullets', subtitle: 'Tujuh kit', title: 'Satu Kerangka, Tujuh Bidang', message: 'Setiap kit menyesuaikan langkahnya dengan bidangnya.', points: ['SDD: dari kebutuhan bisnis menjadi tiket.', 'Mobile, Backend, Frontend: dari tiket menjadi PR.', 'UI/UX: dari tiket menjadi prototipe.', 'QA: dari Ready To Review menjadi rekomendasi.', 'DevOps: dari tiket menjadi runbook dan playbook.'] },
    { layout: 'bullets', subtitle: 'Lanjut ke Part 2', title: 'Takeaways', message: 'Prinsipnya: agent mengerjakan, manusia memutuskan.', points: ['Papan kanban menjadi kontrak antara kamu dan agent.', 'Done, merge rilis, dan production selalu milik manusia.', 'Part 2: bagaimana tiketnya sendiri dibuat dengan benar.'] }
  ],

  'agent-workflow-2-spec-dulu': [
    { layout: 'cover', subtitle: 'Agent Workflow · Part 2 dari 4', title: 'Spec Dulu, Baru Tiket', message: 'Kit SDD mengubah satu kebutuhan bisnis menjadi tiket yang siap masuk papan kanban. Agent menulis dokumennya, reviewer independen memeriksanya, manusia yang memutuskan.', points: ['Perintah: /initiate-epic-ticket', 'Hasil: PRD, alur, kontrak API, tiket.'] },
    { layout: 'bullets', subtitle: 'Kenapa perlu', title: 'Sampah Masuk, Sampah Keluar', message: 'Agent mengerjakan persis apa yang tertulis di tiket.', points: ['Tiket satu kalimat menghasilkan tebakan.', 'Kontrak API yang berubah diam-diam merusak aplikasi.', 'Memperbaiki spec jauh lebih murah daripada memperbaiki kode.'] },
    { layout: 'bullets', subtitle: 'Alurnya', title: 'Empat Dokumen, Empat Peran', message: 'Untuk kebutuhan ukuran sedang dan besar, alurnya berurutan.', points: ['PdM menulis PRD.', 'Product Designer menulis alur lengkap dengan state-nya.', 'HoE menulis kontrak API.', 'PjM memecahnya menjadi tiket.'] },
    { layout: 'bullets', subtitle: 'Inti kit ini', title: 'Gerbang di Setiap Dokumen', message: 'Tidak ada dokumen yang lanjut tanpa lolos review.', points: ['Reviewer mencatat temuan.', 'Penulis menjawab: diperbaiki, ditolak, atau diteruskan.', 'Gerbang lolos hanya jika tidak ada temuan terbuka.', 'Setelah dua kali revisi, proses berhenti dan manusia turun tangan.'] },
    { layout: 'split', subtitle: 'Ukuran menentukan jalur', title: 'Sedang dan besar', leftTitle: 'Kebutuhan Kecil', leftPoints: ['Agent mengusulkan ukurannya.', 'Langsung menjadi tiket.', 'Cukup satu gerbang.'], rightTitle: 'Jalur Lengkap', rightPoints: ['PRD, alur, kontrak, tiket.', 'Gerbang di tiap tahap.', 'Perubahan API butuh persetujuan pemiliknya.'] },
    { layout: 'bullets', subtitle: 'Aturan yang dipaksa script', title: 'Bukan Sekadar Imbauan', message: 'Aturannya diperiksa oleh script, bukan diserahkan pada niat baik agent.', points: ['Dokumen yang berubah wajib di-review ulang.', 'Tiket Mobile punya sembilan bagian berurutan, tanpa placeholder.', 'Versi kontrak di tiket harus cocok.', 'Persetujuan mengunci isi epic.'] },
    { layout: 'code', subtitle: 'Mencobanya', title: 'Pasang dan Cek Status', message: 'Pemasangan lewat satu script, lalu pantau status epic.', code: `git clone https://github.com/roiskhoiron/sdd-agent-workflow\ncd sdd-agent-workflow\n./install.sh\n\n# status sebuah epic\npython3 .sdd/scripts/sdd.py status docs/epics/<slug>`, points: ['Butuh Python 3.8+, Bash, dan Git.', 'Papan default: GitHub Projects.'] },
    { layout: 'bullets', subtitle: 'Catatan jujur', title: 'Status Saat Ini', message: 'Kit ini masih muda, dan itu perlu disebut.', points: ['Template tiket yang sudah jadi baru untuk Mobile, kontrak, dan desain.', 'Alur agent-nya belum pernah dijalankan dari awal sampai akhir.', 'Part 3: apa yang terjadi setelah tiket masuk papan.'] }
  ],

  'agent-workflow-3-develop-tiket': [
    { layout: 'cover', subtitle: 'Agent Workflow · Part 3 dari 4', title: 'Membedah /develop-tiket', message: 'Perintahnya sama di setiap kit, tapi "selesai" berarti hal yang berbeda untuk mobile, backend, frontend, dan desain.', points: ['Dari In Progress ke Ready To Review.', 'Bukti tes selalu ikut.'] },
    { layout: 'bullets', subtitle: 'Kerangka umum', title: 'Urutan yang Selalu Sama', message: 'Apa pun bidangnya, langkah besarnya tidak berubah.', points: ['Baca tiket dan buat rencana.', 'Tulis kode beserta tesnya.', 'Review, dan kembali ke kode bila ada temuan.', 'Uji di lingkungan nyata.', 'Buka PR, tulis komentar di tiket, pindah ke Ready To Review.'] },
    { layout: 'bullets', subtitle: 'Kit Mobile', title: 'Harus Jalan di Perangkat', message: 'Untuk proyek native iOS, Android, dan KMP.', points: ['Kode ditulis dengan TDD.', 'Fitur dites di perangkat, bukan hanya di unit test.', 'Aplikasi di-build sebelum PR dibuka.', 'Tiap tiket dikerjakan di git worktree sendiri.'] },
    { layout: 'bullets', subtitle: 'Kit Backend', title: 'Migrasi Harus Bisa Mundur', message: 'Kesalahan di backend merusak data, jadi langkahnya lebih ketat.', points: ['Migrasi ditulis naik dan turun.', 'Satu database tes Docker sekali pakai per tiket.', 'Spec OpenAPI dibuat dari kode dan dicocokkan dengan kontrak.', 'Deploy ke server dev, lalu dites di sana.'] },
    { layout: 'bullets', subtitle: 'Kit Frontend', title: 'Dibandingkan State demi State', message: 'Kembaran kit Mobile, dengan browser sebagai pengganti perangkat.', points: ['Dites di ukuran laptop, tablet, dan ponsel.', 'Tampilan dibandingkan dengan prototipe UI/UX per state.', 'Screenshot diberi anotasi.', 'Halaman preview dilampirkan di PR.'] },
    { layout: 'bullets', subtitle: 'Kit UI/UX', title: 'Hasilnya Prototipe, Bukan Aplikasi', message: 'Agent mengerjakan tiket desain sampai bisa diklik.', points: ['Token, komponen, layar, lalu state untuk tiap kasus.', 'Prototipe HTML, CSS, dan JavaScript disimpan di git.', 'Tiap state punya alamatnya sendiri.', 'Kecocokan visual tetap diputuskan manusia.'] },
    { layout: 'code', subtitle: 'Contoh pemakaian', title: 'Flag yang Mengubah Cara Kerja', message: 'Satu perintah, beberapa cara menjalankannya.', code: `/validate-tiket PROJ-1234\n\n# dua tiket sekaligus, dikerjakan tim agent\n/develop-tiket PROJ-1234 PROJ-1240 --tim\n\n# satu agent, satu PR per tiket\n/develop-tiket PROJ-1234 --solo --separate`, points: ['--batch menggabungkan tiket dalam satu PR.'] },
    { layout: 'bullets', subtitle: 'Lanjut ke Part 4', title: 'Takeaways', message: 'Definisi "selesai" harus spesifik per bidang.', points: ['Mobile: jalan di perangkat.', 'Backend: migrasi aman dan kontrak terpenuhi.', 'Frontend: cocok dengan prototipe di tiga ukuran layar.', 'Part 4: siapa yang memeriksa, dan apa yang dilarang.'] }
  ],

  'agent-workflow-4-pagar-pengaman': [
    { layout: 'cover', subtitle: 'Agent Workflow · Part 4 dari 4', title: 'QA Buta dan Agent yang Dilarang ke Production', message: 'Agent yang bisa menjalankan perintah juga bisa menjalankan perintah yang salah. Part terakhir ini membahas pagar pengamannya.', points: ['Kit QA dan kit DevOps.', 'Dan batas kemampuan pagar itu sendiri.'] },
    { layout: 'bullets', subtitle: 'Kit QA', title: 'Penguji yang Tidak Boleh Melihat Kode', message: 'Agent QA menguji pekerjaan agent lain secara independen.', points: ['Test case disusun dari acceptance criteria, bukan dari diff.', 'Dalam mode buta, perintah untuk membuka diff diblokir.', 'Agent QA tidak pernah menulis kode produk.', 'Hasilnya rekomendasi. Keputusan Done tetap di QA manusia.'] },
    { layout: 'split', subtitle: 'Kenapa buta', title: 'Tanpa melihat diff', leftTitle: 'Melihat Diff', leftPoints: ['Tes mengikuti cara kode ditulis.', 'Asumsi programmer ikut terbawa.', 'Kasus yang terlupa tetap terlupa.'], rightTitle: 'Mode Buta', rightPoints: ['Tes mengikuti kebutuhan pengguna.', 'Menemukan apa yang tidak dikerjakan.', 'Sama seperti cara QA manusia yang baik.'] },
    { layout: 'bullets', subtitle: 'Kit DevOps', title: 'Dokumen Dulu, Baru Kode', message: 'Urutannya tetap dan tidak bisa dilompati.', points: ['Runbook ditulis sebelum playbook.', 'Lint, lalu check mode.', 'Dijalankan dua kali di staging: run kedua harus tanpa perubahan.', 'Pemilik infrastruktur menjawab setuju atau tolak dengan alasan.'] },
    { layout: 'bullets', subtitle: 'Janji kit DevOps', title: 'Agent Tidak Menyentuh Production', message: 'Agent hanya menguji di staging dan menyiapkan rilis.', points: ['Penerapan ke production dilakukan manusia atau pipeline.', 'Staging hanya bisa ditulis satu agent dalam satu waktu.', 'Rahasia disaring dari laporan.', 'PR tetap Draft sampai disetujui.'] },
    { layout: 'cards', subtitle: 'Berlaku di semua kit', title: 'Empat Hal yang Dilarang', message: 'Aturan ini sama untuk mobile sampai DevOps.', cards: [{ title: 'Memindah ke Done', desc: 'Done selalu keputusan manusia.', icon: '1' }, { title: 'Menutup issue', desc: 'Termasuk menulis "Closes #123" di PR.', icon: '2' }, { title: 'Merge PR rilis', desc: 'Agent menyiapkan, manusia yang merge.', icon: '3' }, { title: 'Force-push', desc: 'Tidak ada push paksa atau menimpa tag.', icon: '4' }] },
    { layout: 'bullets', subtitle: 'Jujur soal batasnya', title: 'Guard Bukan Jimat', message: 'Hook guard memblokir perintah berbahaya, tapi ia hanya membaca teks perintah.', points: ['Host production yang tersembunyi di .env tidak terlihat olehnya.', 'SSH langsung juga tidak terlihat.', 'Karena itu: jangan simpan kunci production di mesin agent.', 'Cakupan guard berbeda di tiap alat AI.'] },
    { layout: 'bullets', subtitle: 'Penutup seri', title: 'Takeaways', message: 'Empat part, satu gagasan.', points: ['Beri agent proses, bukan hanya prompt.', 'Pisahkan yang mengerjakan dari yang memeriksa.', 'Simpan keputusan yang tidak bisa dibatalkan untuk manusia.', 'Semua kit terbuka di github.com/roiskhoiron dan masih tahap uji coba.'] }
  ]
};

export const workflowPosts: Post[] = [
  post('agent-workflow-1-lima-perintah', 'Agent Workflow #1: 5 Perintah, 1 Papan',
    'Kamu tidak butuh 50 prompt untuk menyuruh AI mengerjakan tiket. Cukup lima perintah dan satu papan kanban. Part 1 dari 4.'),
  post('agent-workflow-2-gerbang-review', 'Agent Workflow #2: Gerbang yang Menolak Dokumen Jelek',
    'Agent boleh menulis PRD. Tapi PRD-nya tidak boleh lewat sebelum semua temuan reviewer dijawab. Begini cara kerja gerbangnya.'),
  post('agent-workflow-3-yang-dilarang', 'Agent Workflow #3: 6 Hal yang Tidak Boleh Dilakukan Agent',
    'Semakin bebas agent-mu, semakin penting daftar ini. Enam larangan yang membuat akses terminal untuk agent jadi masuk akal.'),
  post('agent-workflow-4-pasang-sendiri', 'Agent Workflow #4: Pasang Sendiri dalam 3 Langkah',
    'Clone, install, tes. Tiga langkah untuk mencoba workflow ini di proyekmu, plus status jujur tiap kit.')
];

export const workflowPostSlides: Record<string, PostSlide[]> = {
  'agent-workflow-1-lima-perintah': [
    card('workflow · 1/4', '5 Perintah, 1 Papan', 'Satu set workflow open source untuk AI agent yang mengerjakan tiket kanban. Geser untuk melihat kelima perintahnya.'),
    card('papan', 'Todo → Done', 'Empat kolom: Todo, In Progress, Ready To Review, Done.', { bullets: ['Agent bekerja sampai Ready To Review.', 'Done selalu dipindah manusia.'] }),
    card('1', '/validate-tiket', 'Tiket diperiksa dulu sebelum dikerjakan. Bug dicoba ulang, hasilnya ditulis sebagai komentar di tiket.'),
    card('2', '/develop-tiket', 'Rencana, kode, review, tes, lalu PR. Tiket baru pindah ke Ready To Review setelah bukti tesnya ada.'),
    card('3', '/rilis-tiket', 'Menindaklanjuti hasil review: kembali ke Todo untuk revisi, atau merge PR setelah diizinkan.'),
    card('4', '/branch-manager', 'Menyiapkan rilis per versi: laporan, regresi, dan PR rilis. Tag dibuat setelah manusia yang merge.'),
    card('5', '/audit-issue', 'Menyelidiki keluhan tanpa mengubah apa pun. Hanya membaca, hasilnya laporan.')
  ],

  'agent-workflow-2-gerbang-review': [
    card('workflow · 2/4', 'Gerbang yang Menolak Dokumen Jelek', 'Di kit SDD, setiap dokumen buatan agent harus melewati gerbang sebelum lanjut ke tahap berikutnya.'),
    card('langkah 1', 'Reviewer Mencatat Temuan', 'Reviewer independen membaca dokumen dan menulis apa saja yang kurang atau salah.'),
    card('langkah 2', 'Penulis Wajib Menjawab', 'Setiap temuan dijawab dengan salah satu dari tiga pilihan.', { bullets: ['Diperbaiki.', 'Ditolak, dengan alasan.', 'Diteruskan ke pihak lain.'] }),
    card('langkah 3', 'Lolos Jika Bersih', 'Gerbang terbuka hanya ketika tidak ada lagi temuan yang terbuka.'),
    card('batas', 'Maksimal Dua Revisi', 'Kalau setelah dua kali revisi masih belum lolos, proses berhenti. Manusia yang turun tangan.', { bullets: ['Mencegah agent berputar tanpa akhir.'] }),
    card('kuncinya', 'Diperiksa Script', 'Aturan gerbang ini dijalankan oleh script, bukan dititipkan pada janji agent. Dokumen yang berubah otomatis wajib di-review ulang.')
  ],

  'agent-workflow-3-yang-dilarang': [
    card('workflow · 3/4', '6 Hal yang Tidak Boleh Dilakukan Agent', 'Daftar larangan yang sama di semua kit. Inilah yang membuat akses terminal untuk agent jadi masuk akal.'),
    card('1', 'Memindah Tiket ke Done', 'Done adalah keputusan manusia. Agent berhenti di Ready To Review.'),
    card('2', 'Menutup Issue', 'Termasuk lewat jalan belakang: agent tidak menulis "Closes #123" di deskripsi PR.'),
    card('3', 'Merge PR Rilis', 'Agent menyiapkan PR rilis dan laporannya. Yang menekan tombol merge tetap manusia.'),
    card('4', 'Force-Push', 'Tidak ada push paksa, dan tag yang sudah ada tidak boleh ditimpa.'),
    card('5', 'Menyentuh Production', 'Database production, deploy production, dan inventory production tertutup tanpa izin eksplisit.'),
    card('6', 'Membocorkan Rahasia', 'Kredensial tidak boleh muncul di laporan atau komentar tiket.', { bullets: ['Catatan: guard hanya membaca teks perintah.', 'Jangan simpan kunci production di mesin agent.'] })
  ],

  'agent-workflow-4-pasang-sendiri': [
    card('workflow · 4/4', 'Pasang Sendiri dalam 3 Langkah', 'Semua kit dipasang dengan cara yang sama. Contoh ini memakai kit Backend.'),
    card('1', 'Clone', 'Ambil kit yang sesuai dengan bidangmu.', { code: `git clone https://github.com/roiskhoiron/Backend-Agent-Workflow.git\ncd Backend-Agent-Workflow` }),
    card('2', 'Install', 'Script akan menanyakan alat AI dan cakupan pemasangannya.', { code: `./install.sh`, bullets: ['Cakupan: global atau per proyek.'] }),
    card('3', 'Tes', 'Pastikan pemasangannya benar sebelum dipakai.', { code: `bash tests/run.sh` }),
    card('mulai', 'Tiket Pertama', 'Buka alat AI-mu di dalam proyek, lalu jalankan perintah pertama.', { code: `/validate-tiket PROJ-1234` }),
    card('status jujur', 'Masih Tahap Uji Coba', 'Kit Mobile, DevOps, dan UI/UX siap dicoba di tiket nyata. Backend baru lolos tes otomatis. QA masih versi 0.1. Coba dulu di proyek yang tidak kritis.')
  ]
};
