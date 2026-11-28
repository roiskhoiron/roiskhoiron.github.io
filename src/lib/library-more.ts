// Second batch of the teaching series: more history, theory and practice.
import type { Deck, DeckSlide, Post, PostSlide } from './data';

const DATE = '2026-11-29';
const deck = (slug: string, title: string, type: string, tags: string[], desc: string): Deck =>
  ({ slug, title, type, tags, desc, lang: 'ID', slides: 0, color: '', date: DATE });
const post = (slug: string, title: string, tag: string, desc: string): Post =>
  ({ slug, title, tag, desc, date: DATE, color: '', accent: tag });
const card = (label: string, title: string, body: string, extra: Partial<PostSlide> = {}): PostSlide =>
  ({ num: '', label, title, body, theme: 'white', ...extra });

export const decks2: Deck[] = [
  deck('sejarah-mobile', 'Dari Snake di Nokia ke Flutter', 'History Deck', ['sejarah', 'mobile', 'flutter', 'kotlin'],
    'iPhone pertama tidak punya App Store. Begini ceritanya aplikasi mobile berubah dari game ular menjadi industri raksasa.'),
  deck('sejarah-open-source', 'Open Source: dari Printer Macet ke GitHub', 'History Deck', ['sejarah', 'open-source', 'git'],
    'Semuanya bermula dari satu printer yang macet. Empat puluh tahun kemudian, hampir semua software berdiri di atas kode gratis.'),
  deck('clean-architecture', 'Clean Architecture Tanpa Drama', 'Theory Deck', ['arsitektur', 'teori', 'mobile'],
    'Ganti database tanpa menyentuh logic bisnis? Bisa, asal satu aturan ini tidak dilanggar.'),
  deck('design-patterns', '5 Design Pattern yang Benar-Benar Dipakai', 'Theory Deck', ['teori', 'oop', 'typescript'],
    'Buku aslinya berisi 23 pattern. Di pekerjaan sehari-hari, lima ini yang terus muncul.'),
  deck('praktik-rest-api-bun', 'Praktik: REST API Pertamamu dalam 30 Baris', 'Tutorial Deck', ['bun', 'api', 'backend', 'tutorial'],
    'Tanpa framework, tanpa install apa pun selain Bun. Tiga puluh baris, dan kamu punya server yang bisa dipanggil.'),
  deck('praktik-debugging', 'Praktik: Debugging seperti Detektif', 'Tutorial Deck', ['debugging', 'tutorial', 'dasar'],
    'Berhenti menebak-nebak. Enam langkah yang mengubah "kok error sih" menjadi "oh, di sini masalahnya".')
];

export const deckSlides2: Record<string, DeckSlide[]> = {
  'sejarah-mobile': [
    { layout: 'cover', subtitle: 'Sejarah mobile development', title: 'Dari Snake di Nokia ke Flutter', message: 'Tahun 1997 "aplikasi mobile" berarti game ular. Kurang dari 30 tahun kemudian, ponsel jadi komputer utama miliaran orang.', points: ['Siapa yang menang, siapa yang hilang.', 'Dan kenapa framework terus berganti.'] },
    { layout: 'bullets', subtitle: '1997 – 2006', title: 'Era Ponsel Fitur', message: 'Aplikasi ada, tapi dikunci pabrikan dan operator.', points: ['1997: Snake terpasang di Nokia 6110.', '1999: Java ME memungkinkan aplikasi kecil lintas ponsel.', 'Symbian dan BlackBerry menguasai ponsel pintar awal.', 'Masalahnya: tiap ponsel berbeda, distribusi sulit.'] },
    { layout: 'bullets', subtitle: '2007 – 2008', title: 'Dua Tahun yang Mengubah Semuanya', message: 'iPhone pertama bahkan belum bisa dipasangi aplikasi pihak ketiga.', points: ['2007: iPhone dirilis dengan layar sentuh penuh.', 'Juli 2008: App Store dibuka dengan sekitar 500 aplikasi.', 'Akhir 2008: Android 1.0 hadir di HTC Dream.', 'Untuk pertama kalinya, developer bisa menjual langsung ke pengguna.'] },
    { layout: 'split', subtitle: '2008 – 2014', title: 'Android', leftTitle: 'iOS', leftPoints: ['Bahasa: Objective-C.', 'Alat: Xcode.', '2014: Apple memperkenalkan Swift.'], rightTitle: 'Dua Dunia', rightPoints: ['Bahasa: Java.', 'Alat: Eclipse, lalu Android Studio.', 'Satu aplikasi berarti dua tim dan dua codebase.'] },
    { layout: 'bullets', subtitle: '2015 – 2018', title: 'Mimpi Satu Codebase', message: 'Biaya dua tim melahirkan gelombang cross-platform.', points: ['2015: React Native dibuka sebagai open source.', '2017: Google menjadikan Kotlin bahasa resmi Android.', 'Desember 2018: Flutter 1.0 dirilis.', 'Pertanyaannya bergeser: native atau cross-platform?'] },
    { layout: 'bullets', subtitle: '2019 – 2021', title: 'UI Menjadi Deklaratif', message: 'Semua platform tiba di kesimpulan yang sama.', points: ['2019: Apple mengumumkan SwiftUI.', '2021: Jetpack Compose mencapai versi 1.0.', 'Flutter sudah deklaratif sejak awal.', 'Kamu menulis "tampilannya seperti apa", bukan "cara mengubahnya".'] },
    { layout: 'bullets', subtitle: '2023 – sekarang', title: 'Berbagi Logic, Dibantu AI', message: 'Perdebatannya tidak lagi hitam-putih.', points: ['November 2023: Kotlin Multiplatform dinyatakan stabil.', 'Logic dibagi, UI boleh tetap native.', 'AI agent mulai menulis fitur dari tiket.', 'Pilihan stack ditentukan konteks tim, bukan tren.'] },
    { layout: 'cards', subtitle: 'Benang merah', title: 'Empat Pelajaran dari 25 Tahun', message: 'Polanya berulang di setiap gelombang.', cards: [{ title: 'Distribusi menang', desc: 'App Store mengalahkan teknologi yang lebih dulu ada.', icon: '1' }, { title: 'Biaya mendorong inovasi', desc: 'Cross-platform lahir dari mahalnya dua tim.', icon: '2' }, { title: 'UI makin deklaratif', desc: 'Tiga platform, satu arah yang sama.', icon: '3' }, { title: 'Dasar tetap sama', desc: 'State, jaringan, dan lifecycle tidak ke mana-mana.', icon: '4' }] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'Framework yang kamu pakai hari ini kemungkinan bukan yang terakhir.', points: ['Investasikan waktu pada konsep, bukan sintaks.', 'Pahami platform di bawah framework-mu.', 'Yang bertahan adalah developer yang cepat belajar ulang.'] }
  ],

  'sejarah-open-source': [
    { layout: 'cover', subtitle: 'Sejarah open source', title: 'Dari Printer Macet ke GitHub', message: 'Gerakan yang menopang hampir semua software modern bermula dari seorang programmer yang kesal karena tidak boleh memperbaiki printer.', points: ['1983: proyek GNU.', 'Sekarang: jutaan proyek terbuka.'] },
    { layout: 'bullets', subtitle: '1983 – 1989', title: 'Software Bebas', message: 'Richard Stallman ingin kode bisa dipelajari dan diubah siapa pun.', points: ['1983: proyek GNU diumumkan.', '1985: Free Software Foundation berdiri.', '1989: lisensi GPL versi pertama.', 'Idenya: kebebasan memakai, mempelajari, mengubah, dan membagikan.'] },
    { layout: 'bullets', subtitle: '1991', title: 'Sebuah Hobi Bernama Linux', message: 'Linus Torvalds mengumumkan kernel buatannya sebagai proyek hobi.', points: ['GNU punya alat, tapi belum punya kernel.', 'Linux mengisi kekosongan itu.', 'Ribuan orang ikut menyumbang lewat internet.', 'Sekarang Linux menjalankan sebagian besar server dunia dan Android.'] },
    { layout: 'bullets', subtitle: '1998', title: 'Lahirnya Istilah "Open Source"', message: 'Nama baru supaya dunia bisnis mau mendengar.', points: ['Netscape membuka kode browsernya.', 'Istilah "open source" mulai dipakai.', 'Open Source Initiative didirikan.', 'Fokusnya bergeser dari ideologi ke manfaat praktis.'] },
    { layout: 'bullets', subtitle: '2005 – 2008', title: 'Git dan GitHub', message: 'Berkontribusi berubah dari kirim patch lewat email menjadi satu tombol.', points: ['2005: Git dibuat untuk pengembangan kernel Linux.', '2008: GitHub diluncurkan.', 'Pull request membuat kolaborasi jadi kebiasaan.', '2018: Microsoft mengakuisisi GitHub.'] },
    { layout: 'cards', subtitle: 'Lisensi', title: 'Tiga Lisensi yang Wajib Dikenal', message: 'Sebelum memakai library, lihat lisensinya.', cards: [{ title: 'MIT', desc: 'Sangat longgar. Boleh dipakai apa saja asal mencantumkan lisensinya.', icon: 'M' }, { title: 'Apache 2.0', desc: 'Longgar, plus perlindungan soal paten.', icon: 'A' }, { title: 'GPL', desc: 'Turunan yang didistribusikan harus ikut terbuka.', icon: 'G' }, { title: 'Tanpa lisensi', desc: 'Bukan berarti bebas. Secara hukum, hak cipta tetap penuh.', icon: '!' }] },
    { layout: 'bullets', subtitle: 'Mulai berkontribusi', title: 'Kontribusi Pertamamu', message: 'Tidak harus menulis fitur besar.', points: ['Perbaiki typo atau dokumentasi yang membingungkan.', 'Laporkan bug dengan langkah yang bisa diulang.', 'Cari label "good first issue".', 'Baca CONTRIBUTING.md sebelum membuka pull request.'] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'Kamu memakai open source setiap hari, sadar atau tidak.', points: ['Hampir setiap aplikasi bergantung pada kode terbuka.', 'Lisensi menentukan apa yang boleh kamu lakukan.', 'Berkontribusi adalah cara belajar tercepat dari kode orang lain.'] }
  ],

  'clean-architecture': [
    { layout: 'cover', subtitle: 'Teori arsitektur', title: 'Clean Architecture Tanpa Drama', message: 'Diperkenalkan Robert C. Martin pada 2012. Intinya cuma satu aturan, sisanya adalah konsekuensi.', points: ['Bukan soal jumlah folder.', 'Soal arah ketergantungan.'] },
    { layout: 'bullets', subtitle: 'Masalahnya', title: 'Kenapa Kode Jadi Sulit Diubah', message: 'Gejala yang hampir semua proyek alami.', points: ['Logic bisnis bercampur dengan kode UI.', 'Ganti API berarti mengubah puluhan file.', 'Tes butuh server dan database sungguhan.', 'Satu perubahan kecil merusak bagian lain.'] },
    { layout: 'cards', subtitle: 'Lapisan', title: 'Empat Lingkaran', message: 'Dari yang paling stabil di tengah sampai yang paling sering berubah di luar.', cards: [{ title: 'Entities', desc: 'Aturan bisnis inti. Tidak tahu apa pun soal framework.', icon: '1' }, { title: 'Use cases', desc: 'Alur aplikasi: "buat pesanan", "login".', icon: '2' }, { title: 'Adapters', desc: 'Penerjemah: controller, presenter, repository.', icon: '3' }, { title: 'Frameworks', desc: 'UI, database, jaringan. Detail yang bisa diganti.', icon: '4' }] },
    { layout: 'bullets', subtitle: 'Satu aturan', title: 'The Dependency Rule', message: 'Ketergantungan hanya boleh mengarah ke dalam.', points: ['Lapisan dalam tidak boleh tahu lapisan luar.', 'Use case tidak mengimpor Flutter, Retrofit, atau SQLite.', 'Lapisan luar yang menyesuaikan diri.'] },
    { layout: 'code', subtitle: 'Contoh', title: 'Bergantung pada Abstraksi', message: 'Use case hanya mengenal interface, bukan implementasinya.', code: `interface TodoRepository {\n  save(todo: Todo): Promise<void>\n}\n\nclass AddTodo {\n  constructor(private repo: TodoRepository) {}\n\n  async run(title: string) {\n    if (!title.trim()) throw new Error("kosong")\n    await this.repo.save({ title, done: false })\n  }\n}`, points: ['Implementasi bisa file, SQLite, atau API.', 'Saat tes, cukup repository palsu.'] },
    { layout: 'split', subtitle: 'Jujur saja', title: 'Biayanya', leftTitle: 'Manfaatnya', leftPoints: ['Logic bisa dites tanpa UI dan database.', 'Framework bisa diganti tanpa menulis ulang inti.', 'Tim bisa bekerja paralel per lapisan.'], rightTitle: 'Harganya', rightPoints: ['Lebih banyak file dan interface.', 'Berlebihan untuk aplikasi kecil.', 'Butuh disiplin seluruh tim.'] },
    { layout: 'bullets', subtitle: 'Praktik', title: 'Mulai dari Mana', message: 'Tidak perlu merombak semuanya sekaligus.', points: ['Pindahkan logic keluar dari widget atau view.', 'Bungkus akses data di balik interface.', 'Tulis tes untuk use case paling penting.', 'Tambah lapisan hanya saat rasa sakitnya muncul.'] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'Arsitektur yang baik menunda keputusan yang mahal.', points: ['Satu aturan: ketergantungan mengarah ke dalam.', 'Tujuannya kemudahan berubah, bukan kerapian folder.', 'Terapkan sesuai ukuran masalahnya.'] }
  ],

  'design-patterns': [
    { layout: 'cover', subtitle: 'Teori desain', title: '5 Design Pattern yang Benar-Benar Dipakai', message: 'Buku "Design Patterns" (1994) dari empat penulis yang dijuluki Gang of Four memuat 23 pattern. Kita ambil lima yang paling sering muncul.', points: ['Pattern adalah nama untuk solusi yang berulang.', 'Bukan resep wajib.'] },
    { layout: 'code', subtitle: 'Pattern 1', title: 'Strategy', message: 'Ganti-ganti algoritma tanpa if-else yang memanjang.', code: `type Shipping = (kg: number) => number\n\nconst reguler: Shipping = kg => kg * 5000\nconst kilat: Shipping = kg => kg * 12000\n\nfunction ongkir(kg: number, hitung: Shipping) {\n  return hitung(kg)\n}\n\nongkir(2, kilat)`, points: ['Menambah opsi baru tidak mengubah kode lama.'] },
    { layout: 'code', subtitle: 'Pattern 2', title: 'Observer', message: 'Banyak pihak ingin tahu saat sesuatu berubah.', code: `class Store<T> {\n  private subs: ((v: T) => void)[] = []\n\n  subscribe(fn: (v: T) => void) {\n    this.subs.push(fn)\n  }\n\n  set(value: T) {\n    this.subs.forEach(fn => fn(value))\n  }\n}`, points: ['Dasar dari state management dan stream.'] },
    { layout: 'code', subtitle: 'Pattern 3', title: 'Factory', message: 'Pembuatan objek dipusatkan di satu tempat.', code: `function createLogger(env: string) {\n  if (env === "production") {\n    return new RemoteLogger()\n  }\n  return new ConsoleLogger()\n}\n\nconst log = createLogger(process.env.NODE_ENV!)`, points: ['Pemanggil tidak perlu tahu class konkretnya.'] },
    { layout: 'code', subtitle: 'Pattern 4', title: 'Adapter', message: 'Menyambungkan dua bentuk yang tidak cocok.', code: `// library lama mengembalikan snake_case\nfunction toUser(raw: any): User {\n  return {\n    id: raw.user_id,\n    fullName: raw.full_name\n  }\n}`, points: ['Perubahan API pihak ketiga berhenti di sini.'] },
    { layout: 'split', subtitle: 'Pattern 5', title: 'Risikonya', leftTitle: 'Singleton', leftPoints: ['Hanya ada satu instance.', 'Cocok untuk konfigurasi atau koneksi.', 'Mudah diakses dari mana saja.'], rightTitle: 'Hati-hati', rightPoints: ['State global menyulitkan tes.', 'Ketergantungan jadi tersembunyi.', 'Sering lebih baik di-inject.'] },
    { layout: 'bullets', subtitle: 'Peringatan', title: 'Jangan Memaksakan Pattern', message: 'Pattern yang dipaksakan lebih buruk daripada tanpa pattern.', points: ['Mulai dari kode sederhana.', 'Pakai pattern saat masalahnya benar-benar muncul.', 'Nama pattern berguna untuk berkomunikasi dengan tim.'] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'Kamu mungkin sudah memakainya tanpa tahu namanya.', points: ['Strategy dan Observer ada di hampir semua framework UI.', 'Adapter melindungimu dari perubahan pihak luar.', 'Kenali namanya supaya diskusi desain jadi singkat.'] }
  ],

  'praktik-rest-api-bun': [
    { layout: 'cover', subtitle: 'Tutorial praktik', title: 'REST API Pertamamu dalam 30 Baris', message: 'Tanpa framework. Hanya Bun dan satu file. Di akhir, kamu punya API todo yang bisa dipanggil dari aplikasi mobile.', points: ['Butuh: Bun terpasang.', 'Waktu: sekitar 15 menit.'] },
    { layout: 'code', subtitle: 'Langkah 1', title: 'Server Paling Sederhana', message: 'Buat file server.ts, lalu jalankan dengan bun run server.ts.', code: `Bun.serve({\n  port: 3000,\n  fetch(req) {\n    return new Response("halo dari Bun")\n  }\n})`, points: ['Buka http://localhost:3000 di browser.'] },
    { layout: 'code', subtitle: 'Langkah 2', title: 'Kembalikan JSON', message: 'Aplikasi mobile bicara dengan JSON, bukan teks.', code: `const todos = [\n  { id: 1, title: "Belajar Bun", done: false }\n]\n\nBun.serve({\n  port: 3000,\n  fetch(req) {\n    return Response.json(todos)\n  }\n})`, points: ['Response.json mengatur header-nya otomatis.'] },
    { layout: 'code', subtitle: 'Langkah 3', title: 'Routing Sederhana', message: 'Bedakan permintaan lewat path dan method.', code: `fetch(req) {\n  const url = new URL(req.url)\n\n  if (url.pathname === "/todos" && req.method === "GET") {\n    return Response.json(todos)\n  }\n\n  return new Response("Not found", { status: 404 })\n}`, points: ['Path yang tidak dikenal harus dijawab 404.'] },
    { layout: 'code', subtitle: 'Langkah 4', title: 'Terima Data Baru', message: 'POST membuat todo baru. Jadikan fetch sebagai fungsi async.', code: `if (url.pathname === "/todos" && req.method === "POST") {\n  const body = await req.json()\n\n  if (!body.title) {\n    return Response.json({ error: "title wajib" }, { status: 400 })\n  }\n\n  const todo = { id: todos.length + 1, title: body.title, done: false }\n  todos.push(todo)\n  return Response.json(todo, { status: 201 })\n}`, points: ['Validasi dulu, baru simpan.'] },
    { layout: 'code', subtitle: 'Langkah 5', title: 'Coba dari Terminal', message: 'Uji kedua endpoint dengan curl.', code: `curl http://localhost:3000/todos\n\ncurl -X POST http://localhost:3000/todos \\\n  -H "Content-Type: application/json" \\\n  -d '{"title":"Ngoding kuy"}'`, points: ['Coba kirim tanpa title dan lihat status 400.'] },
    { layout: 'split', subtitle: 'Sebelum production', title: 'Masih kurang', leftTitle: 'Sudah Ada', leftPoints: ['Routing dasar.', 'Validasi input.', 'Status code yang benar.'], rightTitle: 'Belum Ada', rightPoints: ['Penyimpanan permanen.', 'Autentikasi.', 'Penanganan error dan logging.'] },
    { layout: 'bullets', subtitle: 'Latihan', title: 'Lanjutkan Sendiri', message: 'Tiga tantangan untuk memperdalam.', points: ['Tambahkan DELETE /todos/:id.', 'Simpan data ke file supaya tidak hilang saat restart.', 'Tulis satu tes untuk validasi title.'] }
  ],

  'praktik-debugging': [
    { layout: 'cover', subtitle: 'Tutorial praktik', title: 'Debugging seperti Detektif', message: 'Programmer yang cepat bukan yang jarang kena bug, tapi yang punya cara mencarinya.', points: ['Enam langkah berurutan.', 'Berlaku di bahasa apa pun.'] },
    { layout: 'bullets', subtitle: 'Langkah 1', title: 'Baca Pesan Error Sampai Habis', message: 'Kedengarannya sepele, tapi paling sering dilewati.', points: ['Baca jenis error-nya, bukan hanya baris merahnya.', 'Cari nama file dan nomor baris di stack trace.', 'Baris paling atas yang berasal dari kodemu biasanya kuncinya.'] },
    { layout: 'bullets', subtitle: 'Langkah 2', title: 'Buat Bug-nya Bisa Diulang', message: 'Bug yang tidak bisa diulang tidak bisa dibuktikan sudah diperbaiki.', points: ['Catat langkah persisnya.', 'Catat input yang dipakai.', 'Kecilkan sampai contoh paling sederhana yang masih gagal.'] },
    { layout: 'code', subtitle: 'Langkah 3', title: 'Lihat Datanya', message: 'Jangan menebak isi variabel. Lihat.', code: `function total(items: Item[]) {\n  console.log("items:", items)\n\n  return items.reduce((s, i) => {\n    console.log(i.price, i.qty)\n    return s + i.price * i.qty\n  }, 0)\n}`, points: ['Atau pasang breakpoint di debugger.', 'Hapus log setelah selesai.'] },
    { layout: 'bullets', subtitle: 'Langkah 4', title: 'Belah Dua Masalahnya', message: 'Teknik yang sama dengan binary search.', points: ['Matikan separuh kode. Bug masih ada?', 'Kalau ya, masalahnya di separuh yang tersisa.', 'Ulangi sampai tersisa beberapa baris.', 'Untuk riwayat commit, git bisect melakukan ini otomatis.'] },
    { layout: 'bullets', subtitle: 'Langkah 5', title: 'Satu Hipotesis, Satu Perubahan', message: 'Mengubah lima hal sekaligus membuatmu tidak tahu mana yang memperbaiki.', points: ['Tulis dugaanmu dalam satu kalimat.', 'Ubah satu hal saja, lalu uji.', 'Salah? Kembalikan perubahan itu sebelum mencoba yang lain.'] },
    { layout: 'bullets', subtitle: 'Langkah 6', title: 'Kunci dengan Tes', message: 'Bug yang sudah diperbaiki jangan sampai kembali.', points: ['Tulis tes yang gagal karena bug itu.', 'Perbaiki sampai tesnya lolos.', 'Catat penyebabnya di pesan commit.'] },
    { layout: 'bullets', subtitle: 'Bonus', title: 'Saat Benar-Benar Buntu', message: 'Tiga jalan keluar yang terbukti ampuh.', points: ['Jelaskan masalahnya dengan suara keras, bahkan ke bebek karet.', 'Istirahat lima belas menit.', 'Minta AI menjelaskan error-nya, lalu periksa sendiri jawabannya.'] }
  ]
};

export const posts2: Post[] = [
  post('y2k-bug-paling-mahal', 'Y2K: Dua Digit yang Bikin Dunia Panik', 'sejarah', 'Demi menghemat dua angka, programmer zaman dulu meninggalkan bom waktu. Tagihannya datang tepat di tahun 2000.'),
  post('clean-code-6-kebiasaan', '6 Kebiasaan Clean Code', 'teori', 'Kode dibaca jauh lebih sering daripada ditulis. Enam kebiasaan kecil supaya rekan timmu tidak mengumpat.'),
  post('debugging-5-langkah', 'Stuck di Bug? Pakai 5 Langkah Ini', 'tutorial', 'Berhenti mengubah kode secara acak sambil berharap. Lima langkah untuk menemukan bug dengan sengaja.'),
  post('terminal-7-perintah', 'Terminal Itu Nggak Seram: 7 Perintah', 'tutorial', 'Layar hitam itu cuma butuh tujuh perintah untuk mulai terasa seperti rumah.')
];

export const postSlides2: Record<string, PostSlide[]> = {
  'y2k-bug-paling-mahal': [
    card('sejarah', 'Y2K: Dua Digit yang Bikin Dunia Panik', 'Tahun 1999, bank, maskapai, dan pemerintah di seluruh dunia berlomba memperbaiki satu keputusan kecil dari puluhan tahun sebelumnya.'),
    card('asal mula', 'Menghemat Dua Angka', 'Di era memori sangat mahal, tahun disimpan dengan dua digit: 75, bukan 1975.', { bullets: ['Keputusan yang masuk akal pada zamannya.', 'Tidak ada yang mengira kodenya dipakai puluhan tahun.'] }),
    card('masalahnya', 'Ketika 99 Menjadi 00', 'Tahun 2000 akan dibaca sebagai 1900. Perhitungan umur, bunga, dan jadwal bisa kacau.', { code: `// 2000 dibaca 00\nconst umur = 0 - 75   // -75 tahun?` }),
    card('responsnya', 'Kerja Besar-besaran', 'Jutaan baris kode lama diperiksa dan diperbaiki. Biayanya diperkirakan mencapai ratusan miliar dolar di seluruh dunia.'),
    card('hasilnya', 'Hampir Tidak Terjadi Apa-apa', 'Pergantian tahun berjalan dengan gangguan kecil saja. Justru karena perbaikannya dikerjakan.', { bullets: ['Pencegahan yang berhasil terlihat seperti kepanikan yang sia-sia.'] }),
    card('berikutnya', 'Sudah Ada Antrean: 2038', 'Sistem yang menyimpan waktu sebagai angka 32-bit akan kehabisan ruang pada 19 Januari 2038. Pelajarannya sama: jalan pintas hari ini adalah tagihan orang lain nanti.')
  ],

  'clean-code-6-kebiasaan': [
    card('teori', '6 Kebiasaan Clean Code', 'Tidak butuh buku tebal. Enam kebiasaan ini sudah mengubah cara orang membaca kodemu.'),
    card('1', 'Nama yang Menjelaskan', 'Nama yang baik menghapus kebutuhan akan komentar.', { code: `// kurang jelas\nconst d = 7\n\n// jelas\nconst batasHariRetur = 7` }),
    card('2', 'Fungsi Melakukan Satu Hal', 'Kalau kamu butuh kata "dan" untuk menjelaskannya, pecah fungsinya.', { bullets: ['Lebih mudah diberi nama.', 'Lebih mudah dites.'] }),
    card('3', 'Keluar Lebih Awal', 'Tangani kasus gagal di awal supaya alur utama tidak menjorok ke dalam.', { code: `if (!user) return null\nif (!user.aktif) return null\n\nreturn buatSesi(user)` }),
    card('4', 'Hindari Angka Ajaib', 'Angka tanpa nama memaksa pembaca menebak maksudnya.', { code: `const PAJAK = 0.11\n\nconst total = harga * (1 + PAJAK)` }),
    card('5', 'Komentar Menjawab "Kenapa"', 'Kode sudah menunjukkan "apa". Komentar yang berguna menjelaskan alasannya.', { bullets: ['Contoh: "API lama mengirim tanggal dalam WIB".'] }),
    card('6', 'Tinggalkan Lebih Bersih', 'Setiap menyentuh file, rapikan satu hal kecil. Dalam setahun, selisihnya terasa besar.')
  ],

  'debugging-5-langkah': [
    card('tutorial', 'Stuck di Bug? Pakai 5 Langkah Ini', 'Debugging bukan bakat. Ini prosedur yang bisa dilatih.'),
    card('1', 'Baca Error-nya', 'Sampai habis. Jenis error, nama file, dan nomor barisnya.', { bullets: ['Sebagian besar jawaban sudah tertulis di sana.'] }),
    card('2', 'Ulangi Bug-nya', 'Temukan langkah persis yang selalu memunculkannya.', { bullets: ['Tidak bisa diulang berarti tidak bisa dibuktikan sudah beres.'] }),
    card('3', 'Lihat, Jangan Tebak', 'Cetak nilainya atau pasang breakpoint.', { code: `console.log("user:", user)\nconsole.log("total:", total)` }),
    card('4', 'Belah Dua', 'Matikan separuh kode. Bug masih ada? Cari di separuh sisanya, lalu ulangi.'),
    card('5', 'Ubah Satu Hal', 'Satu dugaan, satu perubahan, satu pengujian. Setelah beres, tulis tes supaya bug itu tidak kembali.')
  ],

  'terminal-7-perintah': [
    card('tutorial', 'Terminal Itu Nggak Seram', 'Tujuh perintah untuk berpindah, melihat, dan mencari. Sisanya bisa menyusul.'),
    card('1', 'pwd', 'Aku sedang di folder mana?', { code: `pwd` }),
    card('2', 'ls', 'Ada apa saja di sini?', { code: `ls\nls -la   # termasuk file tersembunyi` }),
    card('3', 'cd', 'Pindah folder.', { code: `cd proyek\ncd ..    # naik satu tingkat` }),
    card('4', 'mkdir', 'Buat folder baru.', { code: `mkdir belajar-git` }),
    card('5', 'cat', 'Tampilkan isi file.', { code: `cat package.json` }),
    card('6', 'grep', 'Cari teks di dalam file.', { code: `grep -rn "TODO" src` }),
    card('7', 'Pipa |', 'Sambungkan hasil satu perintah ke perintah lain.', { code: `ls | grep ".ts"`, bullets: ['Inilah kekuatan terminal: perintah kecil yang digabung.'] })
  ]
};
