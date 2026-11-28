// "Software dari era lama sampai AI" — a teaching series in three strands:
// history, theory and hands-on practice. Decks are slides, posts are swipeable cards.
// To add one: append its entry to the list and its slides under the same slug.
import type { Deck, DeckSlide, Post, PostSlide } from './data';
import { decks2, deckSlides2, posts2, postSlides2 } from './library-more';
import { workflowDecks, workflowDeckSlides, workflowPosts, workflowPostSlides } from './agent-workflow';

const DATE = '2026-11-28';
const deck = (slug: string, title: string, type: string, tags: string[], desc: string): Deck =>
  ({ slug, title, type, tags, desc, lang: 'ID', slides: 0, color: '', date: DATE });
const post = (slug: string, title: string, tag: string, desc: string): Post =>
  ({ slug, title, tag, desc, date: DATE, color: '', accent: tag });
const card = (label: string, title: string, body: string, extra: Partial<PostSlide> = {}): PostSlide =>
  ({ num: '', label, title, body, theme: 'white', ...extra });

/* ───────────────────────── decks ───────────────────────── */

export const moreDecks: Deck[] = [
  ...workflowDecks,
  ...decks2,
  deck('sejarah-software', 'Dari Kartu Berlubang ke AI Agent', 'History Deck', ['sejarah', 'software', 'ai'],
    'Program pertama ditulis seabad sebelum komputernya ada. Dari sana sampai AI agent, polanya ternyata selalu sama.'),
  deck('dari-waterfall-ke-devops', 'Dari Waterfall ke Agile ke DevOps', 'Theory Deck', ['proses', 'agile', 'devops'],
    'Orang yang mempopulerkan Waterfall sendiri menulis bahwa metodenya berisiko. Lalu kenapa dunia memakainya puluhan tahun?'),
  deck('paradigma-pemrograman', 'Paradigma Pemrograman: Prosedural, OOP, Fungsional', 'Theory Deck', ['teori', 'typescript', 'oop'],
    'Tiga programmer, satu keranjang belanja, tiga kode yang sama sekali berbeda. Mana yang benar?'),
  deck('cara-kerja-llm', 'Cara Kerja LLM untuk Programmer', 'Theory Deck', ['ai', 'llm', 'teori'],
    'AI-mu tidak "tahu" apa-apa. Ia menebak kata berikutnya. Begitu paham ini, kamu berhenti tertipu jawabannya.'),
  deck('praktik-git-10-menit', 'Praktik: Git dalam 10 Menit', 'Tutorial Deck', ['git', 'tutorial', 'dasar'],
    'Pernah kehilangan kode hasil begadang? Sepuluh menit ini memastikan itu tidak terulang.'),
  deck('praktik-test-pertama-bun', 'Praktik: Test Pertamamu dengan Bun', 'Tutorial Deck', ['testing', 'bun', 'typescript', 'tutorial'],
    'Tulis tes yang GAGAL dulu. Kedengarannya terbalik, tapi begini cara programmer bisa tidur nyenyak.'),
  deck('praktik-ngoding-dengan-ai-agent', 'Praktik: Ngoding Bareng AI Agent', 'Tutorial Deck', ['ai', 'agent', 'tutorial'],
    'Agent bisa menulis 500 baris dalam semenit. Termasuk 500 baris yang salah. Ini cara memegang kemudinya.')
];

export const moreDeckSlides: Record<string, DeckSlide[]> = {
  ...workflowDeckSlides,
  ...deckSlides2,
  'sejarah-software': [
    { layout: 'cover', subtitle: 'Sejarah singkat pengembangan software', title: 'Dari Kartu Berlubang ke AI Agent', message: 'Hampir dua abad dalam sepuluh slide. Alatnya berubah total, tapi beberapa pola terus berulang.', points: ['1843: algoritma pertama yang diterbitkan.', 'Sekarang: program yang menulis program.'] },
    { layout: 'bullets', subtitle: '1843 – 1949', title: 'Sebelum Ada "Programmer"', message: 'Program lahir lebih dulu daripada komputernya.', points: ['1843: Ada Lovelace menerbitkan catatan berisi algoritma untuk Analytical Engine milik Charles Babbage.', '1945–46: ENIAC diprogram dengan kabel dan sakelar oleh enam programmer perempuan.', '1948–49: komputer stored-program (Manchester Baby, EDSAC). Program menjadi data di dalam memori.'] },
    { layout: 'bullets', subtitle: '1957 – 1972', title: 'Bahasa Tingkat Tinggi', message: 'Manusia berhenti menulis dalam bahasa mesin.', points: ['1957: FORTRAN dari tim John Backus di IBM, untuk perhitungan ilmiah.', '1959: COBOL untuk bisnis, dipengaruhi karya Grace Hopper.', '1969: Unix lahir di Bell Labs.', '1972: bahasa C oleh Dennis Ritchie. Unix lalu ditulis ulang dengan C.'] },
    { layout: 'split', subtitle: '1968', title: 'Jawabannya', leftTitle: 'Krisis Software', leftPoints: ['Proyek terlambat dan melebihi anggaran.', 'Hardware makin cepat, software makin rumit.', 'Bug ditemukan setelah sistem dipakai.'], rightTitle: 'Software Engineering', rightPoints: ['Konferensi NATO 1968 mempopulerkan istilah ini.', 'Software diperlakukan sebagai disiplin rekayasa.', 'Lahir perhatian pada desain, pengujian, dan proses.'] },
    { layout: 'bullets', subtitle: '1981 – 1995', title: 'PC, OOP, dan Web', message: 'Komputer masuk ke rumah, lalu saling terhubung.', points: ['1981: IBM PC membuat komputer pribadi jadi standar kantor.', '1985: C++ membawa pemrograman berorientasi objek ke arus utama.', '1991: Linux dirilis, dan situs web pertama online di CERN.', '1995: Java dan JavaScript lahir di tahun yang sama.'] },
    { layout: 'bullets', subtitle: '2001 – 2008', title: 'Agile, Git, Cloud, Mobile', message: 'Empat hal yang membentuk cara kerja hari ini.', points: ['2001: Agile Manifesto ditulis oleh 17 praktisi.', '2005: Linus Torvalds membuat Git untuk kernel Linux.', '2006: AWS meluncurkan S3 dan EC2. Server bisa disewa per jam.', '2007–08: iPhone, App Store, dan Android. Aplikasi pindah ke saku.'] },
    { layout: 'bullets', subtitle: '2009 – 2016', title: 'DevOps dan Container', message: 'Jarak antara "selesai ditulis" dan "sampai ke pengguna" dipangkas.', points: ['2009: DevOpsDays pertama di Ghent, Belgia.', '2013: Docker membuat container mudah dipakai.', '2014: Kubernetes dirilis oleh Google.', 'CI/CD berubah dari kemewahan menjadi standar.'] },
    { layout: 'bullets', subtitle: '2017 – sekarang', title: 'Era AI', message: 'Abstraksi naik satu tingkat lagi: bahasa manusia.', points: ['2017: paper "Attention Is All You Need" memperkenalkan arsitektur Transformer.', '2021: GitHub Copilot hadir sebagai technical preview.', 'Akhir 2022: ChatGPT membuat LLM dipakai publik luas.', 'Sesudahnya: coding agent yang membaca repo, menjalankan perintah, dan menguji hasilnya.'] },
    { layout: 'cards', subtitle: 'Benang merah', title: 'Pola yang Terus Berulang', message: 'Setiap era mengulang empat hal ini.', cards: [{ title: 'Abstraksi naik', desc: 'Kabel, assembly, bahasa tingkat tinggi, framework, lalu bahasa manusia.', icon: '↑' }, { title: 'Umpan balik makin cepat', desc: 'Dari menunggu semalaman menjadi hitungan detik.', icon: '⟳' }, { title: 'Distribusi makin murah', desc: 'Pita, disket, internet, app store.', icon: '→' }, { title: 'Yang tidak berubah', desc: 'Memahami masalah tetap bagian tersulit.', icon: '◆' }] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'Sejarah berguna untuk menebak apa yang akan bertahan.', points: ['Alat datang dan pergi, prinsip rekayasa bertahan.', 'Setiap lompatan abstraksi dulu juga ditakuti akan "menggantikan programmer".', 'Yang tergantikan adalah pekerjaan mengetik, bukan pekerjaan berpikir.'] }
  ],

  'dari-waterfall-ke-devops': [
    { layout: 'cover', subtitle: 'Evolusi proses pengembangan', title: 'Dari Waterfall ke Agile ke DevOps', message: 'Setiap metode lahir sebagai jawaban atas masalah metode sebelumnya.', points: ['1970: Waterfall.', '2001: Agile.', '2009: DevOps.'] },
    { layout: 'bullets', subtitle: '1970', title: 'Waterfall', message: 'Dikenal dari paper Winston Royce, "Managing the Development of Large Software Systems".', points: ['Tahap berurutan: requirement, desain, implementasi, pengujian, operasi.', 'Setiap tahap selesai dulu sebelum tahap berikutnya dimulai.', 'Ironinya: Royce sendiri menulis bahwa model satu arah ini berisiko dan menyarankan iterasi.'] },
    { layout: 'split', subtitle: 'Kapan dipakai', title: 'Kurang cocok', leftTitle: 'Waterfall cocok', leftPoints: ['Requirement stabil dan jelas sejak awal.', 'Biaya perubahan sangat mahal.', 'Contoh: perangkat medis, penerbangan.'], rightTitle: 'Waterfall bermasalah', rightPoints: ['Kebutuhan pengguna belum pasti.', 'Umpan balik baru datang di akhir.', 'Kesalahan asumsi terlambat ketahuan.'] },
    { layout: 'bullets', subtitle: '2001', title: 'Agile Manifesto', message: 'Tujuh belas praktisi berkumpul di Snowbird, Utah, dan menyepakati empat nilai.', points: ['Individu dan interaksi, di atas proses dan alat.', 'Software yang berjalan, di atas dokumentasi lengkap.', 'Kolaborasi dengan pelanggan, di atas negosiasi kontrak.', 'Merespons perubahan, di atas mengikuti rencana.'] },
    { layout: 'cards', subtitle: 'Praktik Agile', title: 'Empat Nama yang Sering Muncul', message: 'Berbeda cara, sama tujuan: iterasi pendek dan umpan balik cepat.', cards: [{ title: 'Scrum', desc: 'Sprint tetap, backlog, review, dan retrospektif.', icon: 'S' }, { title: 'Kanban', desc: 'Visualkan alur kerja, batasi pekerjaan yang berjalan.', icon: 'K' }, { title: 'XP', desc: 'TDD, pair programming, integrasi berkelanjutan.', icon: 'X' }, { title: 'Intinya', desc: 'Kirim sedikit, pelajari, perbaiki, ulangi.', icon: '⟳' }] },
    { layout: 'bullets', subtitle: '2009', title: 'DevOps', message: 'Agile mempercepat penulisan kode. DevOps mempercepat pengirimannya.', points: ['Tim development dan operations bekerja dalam satu alur.', 'CI: setiap commit di-build dan dites otomatis.', 'CD: rilis kecil dan sering, bukan rilis besar yang menegangkan.', 'Infrastruktur ditulis sebagai kode dan ikut di-review.'] },
    { layout: 'bullets', subtitle: 'Mengukur hasil', title: 'Empat Metrik DORA', message: 'Riset DORA mengukur performa pengiriman software dengan empat angka.', points: ['Deployment frequency: seberapa sering rilis.', 'Lead time for changes: dari commit sampai production.', 'Change failure rate: persentase rilis yang bermasalah.', 'Time to restore: seberapa cepat pulih dari insiden.'] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'Metode bukan agama. Semuanya menjawab pertanyaan yang sama.', points: ['Seberapa cepat kita tahu bahwa kita salah?', 'Semakin murah perubahan, semakin pendek iterasinya.', 'Pilih proses berdasarkan risiko, bukan tren.'] }
  ],

  'paradigma-pemrograman': [
    { layout: 'cover', subtitle: 'Satu masalah, tiga cara berpikir', title: 'Paradigma Pemrograman', message: 'Kita hitung total keranjang belanja dengan tiga gaya, lalu bandingkan.', points: ['Lisp (1958) membawa gaya fungsional.', 'Smalltalk (1972) mempopulerkan OOP.'] },
    { layout: 'code', subtitle: 'Gaya 1', title: 'Prosedural', message: 'Program adalah urutan langkah yang mengubah data.', code: `let total = 0\nfor (const item of cart) {\n  total += item.price * item.qty\n}\nconsole.log(total)`, points: ['Mudah diikuti dari atas ke bawah.', 'Cocok untuk script pendek.'] },
    { layout: 'code', subtitle: 'Gaya 2', title: 'Berorientasi Objek', message: 'Data dan perilakunya disatukan di dalam objek.', code: `class Cart {\n  private items: Item[] = []\n\n  add(item: Item) {\n    this.items.push(item)\n  }\n\n  total() {\n    return this.items.reduce(\n      (s, i) => s + i.price * i.qty, 0)\n  }\n}`, points: ['Detail disembunyikan (encapsulation).', 'Cocok untuk domain yang kompleks.'] },
    { layout: 'code', subtitle: 'Gaya 3', title: 'Fungsional', message: 'Program adalah rangkaian fungsi murni tanpa mengubah data asal.', code: `const total = (cart: Item[]) =>\n  cart\n    .map(i => i.price * i.qty)\n    .reduce((a, b) => a + b, 0)`, points: ['Input sama, hasil selalu sama.', 'Mudah dites dan digabungkan.'] },
    { layout: 'cards', subtitle: 'Perbandingan', title: 'Kapan Pakai yang Mana', message: 'Setiap gaya punya wilayah terkuatnya.', cards: [{ title: 'Prosedural', desc: 'Script, otomasi, alur linear.', icon: '1' }, { title: 'OOP', desc: 'Aturan bisnis dengan banyak entitas.', icon: '2' }, { title: 'Fungsional', desc: 'Transformasi data, logic yang perlu dites ketat.', icon: '3' }, { title: 'Deklaratif', desc: 'SQL, SwiftUI, Compose, Flutter: sebutkan hasilnya, bukan langkahnya.', icon: '4' }] },
    { layout: 'split', subtitle: 'Konsep kunci', title: 'Aman', leftTitle: 'Mutable', leftPoints: ['Data diubah di tempat.', 'Hemat memori.', 'Risiko: bagian lain ikut berubah tanpa disadari.'], rightTitle: 'Immutable', rightPoints: ['Setiap perubahan membuat data baru.', 'Lebih mudah dilacak dan dites.', 'Dasar dari state management UI modern.'] },
    { layout: 'bullets', subtitle: 'Di dunia nyata', title: 'Hampir Selalu Campuran', message: 'Bahasa modern tidak memaksa satu gaya.', points: ['Kotlin, Swift, dan TypeScript mendukung OOP dan fungsional sekaligus.', 'UI modern bergaya deklaratif.', 'Logic inti sering ditulis sebagai fungsi murni, lalu dibungkus objek.'] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'Paradigma adalah alat berpikir, bukan identitas.', points: ['Pelajari ketiganya supaya bisa memilih.', 'Pisahkan logic murni dari efek samping.', 'Gaya terbaik adalah yang paling mudah dibaca timmu.'] }
  ],

  'cara-kerja-llm': [
    { layout: 'cover', subtitle: 'Untuk programmer, tanpa matematika', title: 'Cara Kerja LLM', message: 'Kalau tahu cara kerjanya, kamu tahu kapan harus percaya dan kapan harus memeriksa.', points: ['LLM memprediksi, bukan mencari.', 'Konteks menentukan kualitas jawaban.'] },
    { layout: 'bullets', subtitle: 'Konsep 1', title: 'Token dan Prediksi', message: 'Inti sebuah LLM lebih sederhana daripada kesannya.', points: ['Teks dipecah menjadi token, yaitu potongan kata.', 'Model memprediksi token berikutnya, lalu mengulanginya terus.', 'Ia tidak membuka database jawaban. Ia menghasilkan kelanjutan yang paling mungkin.'] },
    { layout: 'bullets', subtitle: 'Konsep 2', title: 'Context Window', message: 'Semua yang "dilihat" model dalam satu waktu.', points: ['Isinya: instruksi, percakapan, file, dan hasil tool.', 'Ukurannya terbatas.', 'Yang tidak ada di konteks tidak diketahui model.', 'Karena itu, memberi konteks yang relevan lebih penting daripada kata-kata ajaib.'] },
    { layout: 'split', subtitle: 'Konsep 3', title: 'Penangkalnya', leftTitle: 'Kenapa Halusinasi', leftPoints: ['Model menghasilkan teks yang terdengar benar.', 'Data latihnya punya batas tanggal.', 'Nama fungsi atau versi library bisa dikarang.'], rightTitle: 'Cara Menguranginya', rightPoints: ['Berikan sumbernya: dokumen atau kode asli.', 'Minta model menjalankan dan menguji.', 'Periksa hal yang mudah diverifikasi.'] },
    { layout: 'cards', subtitle: 'Konsep 4', title: 'Empat Teknik Penting', message: 'Hampir semua produk AI adalah kombinasi dari empat hal ini.', cards: [{ title: 'Prompt', desc: 'Instruksi yang jelas: tujuan, konteks, batasan.', icon: 'P' }, { title: 'RAG', desc: 'Ambil dokumen yang relevan, lalu masukkan ke konteks.', icon: 'R' }, { title: 'Tool use', desc: 'Model meminta program menjalankan fungsi, misalnya membaca file.', icon: 'T' }, { title: 'Agent', desc: 'Model dan tool berputar dalam loop sampai tugas selesai.', icon: 'A' }] },
    { layout: 'code', subtitle: 'Di balik layar', title: 'Loop Sebuah Agent', message: 'Versi sederhana dari cara kerja coding agent.', code: `while (!selesai) {\n  const langkah = await model(konteks)\n\n  if (langkah.tool) {\n    const hasil = await jalankan(langkah.tool)\n    konteks.push(hasil)\n  } else {\n    selesai = true\n  }\n}`, points: ['Model memutuskan langkah berikutnya.', 'Hasil tool kembali menjadi konteks.'] },
    { layout: 'bullets', subtitle: 'Dampaknya', title: 'Apa Artinya untuk Programmer', message: 'Perannya bergeser, tidak hilang.', points: ['Kamu menjadi pemberi arah dan reviewer.', 'Kemampuan membaca kode makin penting daripada kecepatan mengetik.', 'Tes otomatis menjadi pagar pengaman utama.', 'Tanggung jawab atas hasilnya tetap pada manusia.'] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'Tiga kalimat untuk diingat.', points: ['LLM memprediksi teks, bukan mengetahui fakta.', 'Kualitas jawaban mengikuti kualitas konteks.', 'Percaya setelah diverifikasi.'] }
  ],

  'praktik-git-10-menit': [
    { layout: 'cover', subtitle: 'Tutorial praktik', title: 'Git dalam 10 Menit', message: 'Git dibuat Linus Torvalds pada 2005 untuk kernel Linux. Sekarang hampir semua tim memakainya.', points: ['Buka terminal di folder proyekmu.', 'Ikuti urutannya dari awal.'] },
    { layout: 'code', subtitle: 'Langkah 1', title: 'Mulai Mencatat', message: 'Jadikan folder ini repository, lalu simpan kondisi pertamanya.', code: `git init\ngit add .\ngit commit -m "feat: commit pertama"`, points: ['add memilih perubahan.', 'commit menyimpannya ke riwayat.'] },
    { layout: 'code', subtitle: 'Langkah 2', title: 'Lihat Kondisi', message: 'Tiga perintah yang paling sering diketik.', code: `git status          # apa yang berubah?\ngit diff            # perubahan baris per baris\ngit log --oneline   # riwayat singkat`, points: ['Biasakan status sebelum commit.'] },
    { layout: 'code', subtitle: 'Langkah 3', title: 'Kerja di Branch', message: 'Branch adalah jalur terpisah supaya main tetap aman.', code: `git switch -c fitur-login\n\n# ...ubah kode...\n\ngit add .\ngit commit -m "feat: form login"`, points: ['Satu fitur, satu branch.'] },
    { layout: 'code', subtitle: 'Langkah 4', title: 'Gabungkan', message: 'Setelah fitur selesai, bawa perubahannya ke main.', code: `git switch main\ngit merge fitur-login\ngit branch -d fitur-login`, points: ['Kalau ada conflict, Git menandai barisnya.', 'Perbaiki, lalu add dan commit.'] },
    { layout: 'code', subtitle: 'Langkah 5', title: 'Kirim ke Remote', message: 'Hubungkan dengan GitHub supaya ada cadangan dan bisa berkolaborasi.', code: `git remote add origin <url-repo>\ngit push -u origin main\n\n# mengambil perubahan orang lain\ngit pull`, points: ['-u cukup sekali di awal.'] },
    { layout: 'split', subtitle: 'Kebiasaan', title: 'Hindari', leftTitle: 'Lakukan', leftPoints: ['Commit kecil dan sering.', 'Pesan commit menjelaskan alasannya.', 'Pull sebelum mulai bekerja.'], rightTitle: 'Jangan', rightPoints: ['Commit file rahasia seperti .env.', 'push --force ke branch bersama.', 'Satu commit raksasa di akhir minggu.'] },
    { layout: 'bullets', subtitle: 'Latihan', title: 'Coba Sekarang', message: 'Lima menit untuk mengunci pemahaman.', points: ['Buat folder baru dan jalankan git init.', 'Buat dua commit di main.', 'Buat branch, ubah satu file, lalu merge.', 'Baca hasilnya dengan git log --oneline.'] }
  ],

  'praktik-test-pertama-bun': [
    { layout: 'cover', subtitle: 'Tutorial praktik', title: 'Test Pertamamu dengan Bun', message: 'Test-driven development dipopulerkan Kent Beck lewat Extreme Programming. Idenya: tulis tesnya dulu.', points: ['Butuh: Bun terpasang.', 'Waktu: sekitar 10 menit.'] },
    { layout: 'bullets', subtitle: 'Siklusnya', title: 'Red, Green, Refactor', message: 'Tiga langkah yang diulang terus.', points: ['Red: tulis tes yang gagal.', 'Green: tulis kode secukupnya sampai tes lolos.', 'Refactor: rapikan kode, tes tetap hijau.'] },
    { layout: 'code', subtitle: 'Red', title: 'Tulis Tesnya Dulu', message: 'Fungsi sum belum ada. Itu memang disengaja.', code: `// sum.test.ts\nimport { test, expect } from "bun:test"\nimport { sum } from "./sum"\n\ntest("menjumlahkan dua angka", () => {\n  expect(sum(2, 3)).toBe(5)\n})`, points: ['Jalankan: bun test', 'Hasilnya gagal, karena ./sum belum dibuat.'] },
    { layout: 'code', subtitle: 'Green', title: 'Kode Secukupnya', message: 'Tulis implementasi paling sederhana yang membuat tes lolos.', code: `// sum.ts\nexport const sum = (a: number, b: number) =>\n  a + b`, points: ['Jalankan lagi: bun test', 'Sekarang tesnya lolos.'] },
    { layout: 'code', subtitle: 'Red lagi', title: 'Tambah Kasus Sulit', message: 'Input dari pengguna tidak selalu valid.', code: `test("menolak input bukan angka", () => {\n  expect(() => sum(NaN, 1)).toThrow()\n})`, points: ['Tes baru ini gagal.', 'Kegagalan itu menunjukkan apa yang harus dikerjakan.'] },
    { layout: 'code', subtitle: 'Green lagi', title: 'Perbaiki Kodenya', message: 'Tambahkan validasi sampai kedua tes lolos.', code: `export function sum(a: number, b: number) {\n  if (Number.isNaN(a) || Number.isNaN(b)) {\n    throw new Error("bukan angka")\n  }\n  return a + b\n}`, points: ['Dua tes, dua-duanya hijau.'] },
    { layout: 'split', subtitle: 'Apa yang dites', title: 'Tidak perlu', leftTitle: 'Layak Dites', leftPoints: ['Logic dan perhitungan.', 'Kasus tepi: kosong, nol, negatif.', 'Bug yang pernah terjadi.'], rightTitle: 'Bukan Prioritas', rightPoints: ['Kode library pihak ketiga.', 'Getter dan setter sederhana.', 'Detail implementasi yang sering berubah.'] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'Tes adalah jaring pengaman, bukan beban.', points: ['Tes yang gagal dulu membuktikan tesnya benar-benar memeriksa sesuatu.', 'Logic murni paling mudah dites.', 'Dengan AI agent, tes adalah cara tercepat memeriksa hasilnya.'] }
  ],

  'praktik-ngoding-dengan-ai-agent': [
    { layout: 'cover', subtitle: 'Tutorial praktik', title: 'Ngoding Bareng AI Agent', message: 'Agent bekerja cepat. Tugasmu memastikan ia bekerja ke arah yang benar.', points: ['Alur kerja lima langkah.', 'Template prompt yang bisa disalin.'] },
    { layout: 'bullets', subtitle: 'Alur kerja', title: 'Lima Langkah', message: 'Urutan ini mencegah sebagian besar masalah.', points: ['Tulis tujuan dan batasannya.', 'Minta rencana dulu, jangan langsung kode.', 'Kerjakan per langkah kecil.', 'Jalankan tes di setiap langkah.', 'Review diff sebelum commit.'] },
    { layout: 'code', subtitle: 'Template', title: 'Prompt yang Lengkap', message: 'Empat bagian: tujuan, konteks, batasan, dan definisi selesai.', code: `Tujuan: tambah fitur hapus todo di CLI.\nKonteks: logic di src/todo.ts,\n  CLI di src/cli.ts.\nBatasan: jangan ubah format file data.\nSelesai jika: \`bun test\` lolos dan\n  \`todo delete 2\` menghapus item ke-2.\n\nBuat rencana dulu, jangan langsung ngoding.`, points: ['Definisi selesai membuat hasilnya bisa diperiksa.'] },
    { layout: 'split', subtitle: 'Perbandingan', title: 'Lebih baik', leftTitle: 'Prompt Lemah', leftPoints: ['"Bikinin fitur hapus."', 'Tanpa konteks file.', 'Tanpa cara memeriksa hasil.'], rightTitle: 'Prompt Kuat', rightPoints: ['Tujuan yang spesifik.', 'Menunjuk file yang relevan.', 'Punya definisi selesai yang bisa dites.'] },
    { layout: 'cards', subtitle: 'Keamanan', title: 'Empat Pagar Pengaman', message: 'Pasang sebelum agent mulai bekerja.', cards: [{ title: 'Git', desc: 'Commit dulu sebelum mulai, supaya selalu bisa kembali.', icon: 'G' }, { title: 'Tes otomatis', desc: 'Bukti bahwa kode berjalan, bukan sekadar klaim.', icon: 'T' }, { title: 'Review diff', desc: 'Baca perubahan baris per baris sebelum commit.', icon: 'R' }, { title: 'Rahasia', desc: 'Jangan pernah menempel API key atau isi .env.', icon: '!' }] },
    { layout: 'bullets', subtitle: 'Waspada', title: 'Kapan Harus Curiga', message: 'Empat situasi yang paling sering menghasilkan jawaban salah.', points: ['API atau library versi terbaru.', 'Angka, tanggal, dan fakta spesifik.', 'Kode yang menyangkut keamanan.', 'Klaim "sudah saya tes" tanpa menunjukkan hasilnya.'] },
    { layout: 'bullets', subtitle: 'Latihan', title: 'Coba 15 Menit', message: 'Pakai proyek kecil yang sudah punya tes.', points: ['Commit kondisi sekarang.', 'Tulis prompt dengan template tadi.', 'Minta rencana, lalu setujui satu langkah.', 'Jalankan tes dan baca diff-nya.'] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'Agent mempercepat, kamu yang mengarahkan.', points: ['Konteks yang jelas mengalahkan prompt yang panjang.', 'Langkah kecil lebih aman daripada satu permintaan besar.', 'Yang kamu commit adalah tanggung jawabmu.'] }
  ]
};

/* ─────────────────────── carousels ─────────────────────── */

export const morePosts: Post[] = [
  ...workflowPosts,
  ...posts2,
  post('lima-era-software', '5 Era Software dalam 60 Detik', 'sejarah', 'Dulu mengganti program berarti mencabut dan memasang kabel berhari-hari. Sekarang cukup satu kalimat.'),
  post('bug-pertama', 'Kisah "Bug" Pertama', 'sejarah', 'Bug pertama di dunia benar-benar seekor serangga. Tapi ceritanya tidak sesederhana yang sering diulang.'),
  post('hukum-klasik-software', '5 Hukum Klasik Software', 'teori', 'Proyekmu telat? Jangan tambah orang. Lima hukum ini sudah memperingatkan sejak 1975.'),
  post('solid-bahasa-manusia', 'SOLID dalam Bahasa Manusia', 'teori', 'Lima huruf yang hampir selalu ditanyakan saat interview, dijelaskan tanpa satu pun jargon.'),
  post('big-o-tanpa-pusing', 'Big-O Tanpa Pusing', 'teori', 'Kodemu kencang dengan 10 data, lalu sekarat dengan 10.000. Big-O menjelaskan kenapa.'),
  post('git-6-perintah', 'Git: 6 Perintah Tiap Hari', 'tutorial', 'Git punya ratusan perintah. Untuk kerja harian, kamu cuma butuh enam.'),
  post('rest-api-6-kartu', 'REST API dalam 6 Kartu', 'tutorial', 'Hampir semua aplikasi di ponselmu ngobrol dengan cara yang sama. Enam kartu, dan kamu ikut paham.'),
  post('anatomi-prompt-coding', 'Anatomi Prompt untuk Coding', 'tutorial', 'AI memberimu kode yang ngawur? Bisa jadi prompt-mu kehilangan empat bagian ini.')
];

export const morePostSlides: Record<string, PostSlide[]> = {
  ...workflowPostSlides,
  ...postSlides2,
  'lima-era-software': [
    card('sejarah', '5 Era Software dalam 60 Detik', 'Cara manusia membuat software sudah berubah lima kali. Geser untuk melihat lompatannya.'),
    card('Era 1 · 1940-an', 'Kabel dan Sakelar', 'ENIAC diprogram dengan memindahkan kabel. Mengganti program berarti merakit ulang mesin.', { bullets: ['Program belum disimpan di memori.', 'Mengubahnya butuh waktu berhari-hari.'] }),
    card('Era 2 · 1950–70-an', 'Bahasa Tingkat Tinggi', 'FORTRAN (1957), COBOL (1959), dan C (1972) membuat manusia menulis logika, bukan angka mesin.', { bullets: ['Compiler menerjemahkan ke bahasa mesin.', 'Kode mulai bisa dipindah antar komputer.'] }),
    card('Era 3 · 1980–90-an', 'PC dan Internet', 'Komputer masuk ke rumah, lalu web lahir pada 1991. Software mulai dipakai semua orang.', { bullets: ['OOP menjadi arus utama.', 'Java dan JavaScript lahir pada 1995.'] }),
    card('Era 4 · 2000–2010-an', 'Agile, Cloud, Mobile', 'Agile (2001), Git (2005), AWS (2006), dan smartphone (2007) mengubah cara tim bekerja dan merilis.', { bullets: ['Rilis dari tahunan menjadi harian.', 'Server disewa, bukan dibeli.'] }),
    card('Era 5 · 2020-an', 'AI', 'LLM menulis kode dari bahasa manusia. Coding agent bisa membaca repo dan menjalankan tes.', { bullets: ['Abstraksi naik satu tingkat lagi.', 'Peran programmer bergeser ke arah dan review.'] }),
    card('benang merah', 'Yang Tidak Berubah', 'Di setiap era, alatnya berganti. Bagian tersulit tetap sama: memahami masalah yang mau diselesaikan.')
  ],

  'bug-pertama': [
    card('sejarah', 'Kisah "Bug" Pertama', 'Cerita paling terkenal di dunia pemrograman, dan satu koreksi kecil terhadapnya.'),
    card('9 September 1947', 'Seekor Ngengat', 'Operator komputer Harvard Mark II menemukan ngengat terjepit di sebuah relay dan membuat mesin bermasalah.'),
    card('logbook', 'Ditempel di Buku Catatan', 'Ngengat itu ditempel di logbook dengan tulisan: "First actual case of bug being found."', { bullets: ['Cerita ini dipopulerkan oleh Grace Hopper.', 'Logbook-nya kini disimpan di museum Smithsonian.'] }),
    card('koreksi', 'Tapi Katanya Lebih Tua', 'Kata "bug" untuk gangguan teknis sudah dipakai insinyur jauh sebelumnya. Thomas Edison menulisnya dalam surat tahun 1878.', { bullets: ['Itu sebabnya catatannya menulis "actual".', 'Leluconnya: kali ini bug-nya sungguhan.'] }),
    card('pelajaran', 'Kenapa Cerita Ini Bertahan', 'Karena intinya masih berlaku: catat apa yang kamu temukan. Logbook 1947 itu adalah laporan bug yang baik.')
  ],

  'hukum-klasik-software': [
    card('teori', '5 Hukum Klasik Software', 'Lima kalimat pendek yang terus terbukti benar di proyek nyata.'),
    card('Hukum Brooks · 1975', 'Menambah Orang, Menambah Telat', 'Fred Brooks: menambah orang ke proyek software yang terlambat membuatnya makin terlambat.', { bullets: ['Orang baru butuh waktu belajar.', 'Jalur komunikasi bertambah lebih cepat daripada jumlah orang.'] }),
    card('Hukum Conway · 1968', 'Sistem Meniru Organisasi', 'Melvin Conway: organisasi merancang sistem yang meniru struktur komunikasinya sendiri.', { bullets: ['Tiga tim cenderung menghasilkan tiga modul.', 'Mau mengubah arsitektur? Lihat dulu struktur timnya.'] }),
    card('Knuth · 1974', 'Jangan Optimasi Terlalu Dini', 'Donald Knuth menyebut optimasi prematur sebagai akar banyak masalah.', { bullets: ['Ukur dulu, baru optimalkan.', 'Kode yang jelas lebih mudah dipercepat nanti.'] }),
    card('YAGNI', 'You Aren\'t Gonna Need It', 'Prinsip dari Extreme Programming: jangan bangun fitur sampai benar-benar dibutuhkan.', { bullets: ['Fitur "siapa tahu nanti" jarang dipakai.', 'Setiap baris kode harus dirawat.'] }),
    card('Hukum Hyrum', 'Semua Perilaku Akan Diandalkan', 'Dengan cukup banyak pengguna, setiap perilaku API yang bisa diamati akan diandalkan seseorang, termasuk bug-nya.', { bullets: ['Mengubah detail kecil bisa merusak pengguna.', 'Karena itu versi dan changelog penting.'] }),
    card('ringkasan', 'Satu Benang Merah', 'Kelimanya bicara hal yang sama: software adalah urusan manusia dan komunikasi, bukan hanya kode.')
  ],

  'solid-bahasa-manusia': [
    card('teori', 'SOLID dalam Bahasa Manusia', 'Lima prinsip desain dari Robert C. Martin. Satu kartu, satu prinsip, satu kalimat.'),
    card('S', 'Single Responsibility', 'Satu class punya satu alasan untuk berubah.', { bullets: ['Class yang menghitung jangan ikut mencetak laporan.', 'Tanda bahaya: nama class berisi kata "dan".'] }),
    card('O', 'Open/Closed', 'Terbuka untuk ditambah, tertutup untuk diubah.', { bullets: ['Fitur baru ditambah lewat kode baru.', 'Kode lama yang sudah teruji tidak disentuh.'] }),
    card('L', 'Liskov Substitution', 'Turunan harus bisa menggantikan induknya tanpa merusak program.', { bullets: ['Kalau subclass melempar error di method warisan, desainnya salah.'] }),
    card('I', 'Interface Segregation', 'Lebih baik beberapa interface kecil daripada satu yang gemuk.', { bullets: ['Jangan paksa class mengimplementasi method yang tidak dipakainya.'] }),
    card('D', 'Dependency Inversion', 'Bergantung pada abstraksi, bukan pada detail.', { bullets: ['Logic bisnis mengenal "Repository", bukan "MySQL".', 'Hasilnya: mudah dites dan mudah diganti.'] }),
    card('catatan', 'Bukan Aturan Mati', 'SOLID adalah panduan untuk kode yang mudah diubah. Untuk script kecil, menerapkan semuanya justru berlebihan.')
  ],

  'big-o-tanpa-pusing': [
    card('teori', 'Big-O Tanpa Pusing', 'Big-O menjawab satu pertanyaan: kalau datanya bertambah, seberapa cepat pekerjaannya ikut bertambah?'),
    card('O(1)', 'Konstan', 'Waktunya sama, berapa pun jumlah datanya.', { bullets: ['Contoh: mengambil elemen array lewat indeks.', 'Seperti membuka halaman buku dari nomor halamannya.'] }),
    card('O(log n)', 'Logaritmik', 'Setiap langkah membuang separuh data.', { bullets: ['Contoh: binary search pada data terurut.', 'Satu juta data cukup sekitar 20 langkah.'] }),
    card('O(n)', 'Linear', 'Data dua kali lipat, waktu dua kali lipat.', { code: `for (const user of users) {\n  if (user.id === id) return user\n}` }),
    card('O(n²)', 'Kuadratik', 'Loop di dalam loop. Aman untuk data kecil, berbahaya untuk data besar.', { code: `for (const a of items)\n  for (const b of items)\n    bandingkan(a, b)` }),
    card('praktik', 'Cara Pakainya', 'Kamu tidak perlu menghitung semuanya. Cukup curiga pada loop bersarang dan pencarian berulang di dalam loop.')
  ],

  'git-6-perintah': [
    card('tutorial', 'Git: 6 Perintah Tiap Hari', 'Enam perintah ini menutup sebagian besar pekerjaan harianmu dengan Git.'),
    card('1', 'git status', 'Lihat apa yang berubah sebelum melakukan apa pun.', { code: `git status` }),
    card('2', 'git add', 'Pilih perubahan yang mau disimpan.', { code: `git add src/todo.ts\ngit add .   # semua perubahan` }),
    card('3', 'git commit', 'Simpan ke riwayat dengan pesan yang jelas.', { code: `git commit -m "fix: validasi input kosong"` }),
    card('4', 'git switch', 'Pindah atau buat branch.', { code: `git switch main\ngit switch -c fitur-baru` }),
    card('5', 'git pull', 'Ambil perubahan terbaru dari remote sebelum mulai bekerja.', { code: `git pull` }),
    card('6', 'git push', 'Kirim commit-mu ke remote.', { code: `git push`, bullets: ['Urutan harian: pull, kerja, add, commit, push.'] })
  ],

  'rest-api-6-kartu': [
    card('tutorial', 'REST API dalam 6 Kartu', 'REST berasal dari disertasi Roy Fielding tahun 2000. Idenya sederhana: semua hal adalah resource yang punya alamat.'),
    card('1 · Resource', 'Semua Punya URL', 'Setiap data diwakili sebuah alamat.', { code: `/users        # semua user\n/users/42     # user nomor 42` }),
    card('2 · Method', 'Kata Kerjanya', 'Method HTTP menyatakan apa yang ingin dilakukan.', { bullets: ['GET: ambil data.', 'POST: buat data baru.', 'PUT / PATCH: ubah data.', 'DELETE: hapus data.'] }),
    card('3 · Status', 'Jawaban Server', 'Tiga digit yang memberi tahu hasilnya.', { bullets: ['200 dan 201: berhasil.', '400 dan 404: permintaanmu salah atau datanya tidak ada.', '401: belum login.', '500: server yang bermasalah.'] }),
    card('4 · Praktik', 'Memanggil API', 'Contoh mengambil satu user dengan fetch.', { code: `const res = await fetch("/users/42")\nif (!res.ok) throw new Error(res.statusText)\nconst user = await res.json()` }),
    card('ringkasan', 'Yang Perlu Diingat', 'URL menunjuk benda, method menunjuk tindakan, status code menunjuk hasil. Selalu periksa res.ok sebelum membaca datanya.')
  ],

  'anatomi-prompt-coding': [
    card('tutorial', 'Anatomi Prompt untuk Coding', 'Prompt yang baik bukan yang panjang, tapi yang lengkap. Ada empat bagian.'),
    card('1', 'Tujuan', 'Apa yang ingin dicapai, dalam satu kalimat spesifik.', { bullets: ['Lemah: "perbaiki bug ini".', 'Kuat: "todo dengan judul kosong seharusnya ditolak".'] }),
    card('2', 'Konteks', 'Tunjukkan file dan bagian yang relevan.', { bullets: ['Model hanya tahu apa yang ada di konteksnya.', 'Sebutkan nama file dan fungsinya.'] }),
    card('3', 'Batasan', 'Apa yang tidak boleh diubah.', { bullets: ['"Jangan ubah format file data."', '"Jangan tambah dependency baru."'] }),
    card('4', 'Definisi Selesai', 'Cara memeriksa bahwa hasilnya benar.', { code: `Selesai jika \`bun test\` lolos\ndan input kosong menampilkan error.` }),
    card('bonus', 'Minta Rencana Dulu', 'Tambahkan satu kalimat: "Buat rencana dulu, jangan langsung ngoding." Kamu bisa mengoreksi arah sebelum kode ditulis.')
  ]
};
