// Blog content. Every article here is original writing by Khoiron Rois, based on
// his own sessions, decks and projects. To publish a new note: add an entry to
// `blogData` and its body to `blogFull` under the same slug.
import type { BlogPost } from './data';

// Bodies are plain semantic HTML; all styling comes from `.prose` in styles.css.
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const p = (...html: string[]) => html.map((h) => `<p>${h}</p>`).join('');
const ul = (...items: string[]) => `<ul>${items.map((i) => `<li>${i}</li>`).join('')}</ul>`;
const pre = (code: string) => `<pre>${esc(code)}</pre>`;
const c = (code: string) => `<code>${esc(code)}</code>`;
const b = (text: string) => `<strong>${text}</strong>`;

export const blogData: BlogPost[] = [
  {
    title: 'Situs ini: dari 4,5 MB ke 155 KB',
    slug: 'situs-ini-dari-4-5-mb-ke-155-kb',
    date: '2026-11-27',
    mins: 5,
    tags: ['performance', 'web', 'ai-agent', 'svelte'],
    excerpt: 'Saya mengaudit portofolio ini bersama AI coding agent. Empat keputusan memangkas lebih dari 95% ukuran halaman, lalu desainnya saya tulis ulang dari nol.',
    featured: true
  },
  {
    title: 'CodingSchool: mentor AI yang tidak langsung memberi jawaban',
    slug: 'codingschool-mentor-ai',
    date: '2026-11-27',
    mins: 4,
    tags: ['ai', 'education', 'open-source', 'opencode'],
    excerpt: 'Kenapa plugin open source saya memakai dua persona, lima level bantuan, dan sebuah "gerbang" yang menahan penulisan kode sampai kamu paham.'
  },
  {
    title: 'Promise.all vs allSettled: satpam galak dan satpam sabar',
    slug: 'promise-all-vs-allsettled',
    date: '2026-09-13',
    mins: 3,
    tags: ['typescript', 'backend', 'javascript'],
    excerpt: 'Satu API gagal, semua data ikut hilang. Analogi yang saya pakai untuk memilih antara fail fast dan graceful degradation.'
  },
  {
    title: 'TypeScript itu kontrak, bukan penjaga runtime',
    slug: 'typescript-itu-kontrak',
    date: '2026-09-12',
    mins: 4,
    tags: ['typescript', 'bun', 'backend', 'cli'],
    excerpt: 'Pelajaran dari proyek CLI mini: tipe yang rapi tidak melindungi dari input user dan file yang hilang.'
  },
  {
    title: 'Dari Kotlin ke TypeScript: kenapa $a tidak jalan',
    slug: 'dari-kotlin-ke-typescript-template-literal',
    date: '2026-09-12',
    mins: 2,
    tags: ['typescript', 'kotlin', 'tips'],
    excerpt: 'Kebiasaan string template Kotlin terbawa ke JavaScript, dan hasilnya teks mentah di console.'
  },
  {
    title: 'KMP itu leverage, bukan pengganti Flutter',
    slug: 'kmp-leverage-bukan-pengganti',
    date: '2026-09-11',
    mins: 4,
    tags: ['kotlin', 'kmp', 'flutter', 'mobile'],
    excerpt: 'Catatan saya dari sesi Iqbal Fauzi: nilai terbesar Kotlin Multiplatform ada di migrasi bertahap, bukan di perang framework.'
  }
];

type Full = { lead: string; sections: { id: string; title: string; body: string }[] };

export const blogFull: Record<string, Full> = {
  'situs-ini-dari-4-5-mb-ke-155-kb': {
    lead: 'Halaman depan portofolio ini dulu mengunduh 4,5 MB dalam 44 request. Sekarang 155 KB dalam 7 request.',
    sections: [
      {
        id: 'titik-awal',
        title: 'Titik awal',
        body: p(
          `Saya meminta AI coding agent mengevaluasi situs ini dari tiga sisi: journey, experience, dan performa. Langkah pertamanya bukan menulis kode, tapi mengukur. Hasil ukurnya: halaman depan mengunduh ${b('4,5 MB dalam 44 request')}.`,
          'Secara visual situs ini terlihat ringan: latar gelap, teks, beberapa kartu. Tidak ada video, tidak ada galeri. Jadi ke mana 4,5 MB itu pergi?'
        )
      },
      {
        id: 'empat-penyebab',
        title: 'Empat penyebab, empat keputusan',
        body:
          ul(
            `${b('Foto profil 2,5 MB.')} File aslinya 2048 piksel, padahal ditampilkan sebagai lingkaran 168 piksel. Diganti WebP yang ukurannya sesuai tampilan, sekitar 12 KB. Lebih dari separuh berat halaman hilang dari satu gambar.`,
            `${b('Tailwind lewat CDN.')} Praktis saat prototyping, tapi di production browser harus mengunduh 126 KB JavaScript lalu menyusun CSS di perangkat pengunjung, sambil menahan render. Sekarang CSS disusun saat build.`,
            `${b('Three.js untuk 160 titik.')} Latar partikel memakai engine 3D lengkap. Awalnya diganti canvas 2D, lalu dihapus sama sekali: pola titik di latar sekarang cukup satu baris CSS.`,
            `${b('Layar loading buatan.')} Ada progress bar 1,35 detik yang tidak menunggu apa pun. Sekarang tidak ada lagi: konten langsung tampil.`
          ) +
          p('Setelah empat perubahan itu, halaman depan turun menjadi 242 KB dalam 9 request.')
      },
      {
        id: 'desain-ulang',
        title: 'Lalu desainnya ditulis ulang',
        body: p(
          'Langkah berikutnya lebih besar: tampilan situs ini saya rombak total menjadi tema buku catatan lab, dengan CSS yang ditulis tangan tanpa framework dan hanya dua file font.',
          `Efek sampingnya ke performa ternyata positif. Halaman depan sekarang ${b('155 KB dalam 7 request')}, dengan JavaScript 46 KB dan CSS 9 KB (gzip). Lebih dari separuhnya adalah dua file font.`
        )
      },
      {
        id: 'pelajaran',
        title: 'Yang saya pelajari',
        body:
          p(
            `Pelajaran pertama: ${b('ukur dulu, baru percaya.')} Tampilan yang sederhana tidak menjamin halaman yang ringan.`,
            `Pelajaran kedua: tiga dari empat masalah itu adalah keputusan yang terasa keren saat dibuat, yaitu engine 3D, animasi loading, dan tooling serba instan. Disiplin yang biasa dipakai di mobile, seperti menghitung ukuran aplikasi dan waktu buka, berlaku sama di web.`,
            `Pelajaran ketiga soal bekerja dengan AI agent. Agent bisa menemukan dan memperbaiki masalah teknis dengan cepat, tapi keputusan produknya tetap harus saya ambil: apakah efek 3D itu layak dipertahankan, konten mana yang ditampilkan, apa yang ingin saya sampaikan ke pengunjung.`
          )
      },
      {
        id: 'coba-sendiri',
        title: 'Coba di situsmu sendiri',
        body:
          p('Buka DevTools, tab Network, matikan cache, lalu muat ulang. Urutkan berdasarkan ukuran. Tiga baris teratas hampir selalu menjelaskan sebagian besar masalah.') +
          ul(
            'Gambar: apakah ukuran file sebanding dengan ukuran tampilnya?',
            'Script pihak ketiga: mana yang menahan render, dan mana yang bisa dipindah ke build?',
            'Library: adakah yang dipakai hanya untuk satu efek kecil?'
          )
      }
    ]
  },

  'codingschool-mentor-ai': {
    lead: 'CodingSchool adalah plugin open source untuk belajar software engineering bersama AI, tanpa menjadi tergantung pada AI.',
    sections: [
      {
        id: 'masalahnya',
        title: 'Masalah yang ingin saya selesaikan',
        body: p(
          'AI coding assistant sangat bagus dalam satu hal: menghasilkan kode yang jalan. Untuk engineer berpengalaman itu mempercepat kerja. Untuk orang yang sedang belajar, itu bisa jadi jebakan, karena kode yang jalan terasa seperti pemahaman padahal bukan.',
          `Saya pernah mengajar pemrograman dasar untuk anak-anak, jadi pertanyaan tentang cara belajar yang benar dekat dengan saya. CodingSchool mencoba menjawab satu pertanyaan: bagaimana kalau AI-nya berperan sebagai mentor, bukan mesin penjawab? Kalimat pembuka README-nya: ${b('"Stop copying code you don\'t understand."')}`
        )
      },
      {
        id: 'dua-persona',
        title: 'Dua persona, satu tujuan',
        body:
          p('CodingSchool memisahkan dua peran yang biasanya dicampur:') +
          ul(
            `${b('Teacher')} mendiagnosis dulu sebelum mengajar, memberi petunjuk bertahap, dan menutup sesi dengan refleksi. Teacher tidak punya akses menulis file sama sekali.`,
            `${b('Coach')} mendampingi pengerjaan proyek: menyusun timeline, me-review kode dan arsitektur, serta memindai kepatuhan OWASP Top 10.`
          ) +
          p('Alurnya: Teacher membangun pemahaman, lalu menyerahkan proyek akhir ke Coach. Setelah proyek selesai, Coach mengembalikan sesi ke Teacher. Prinsip Teacher saya tulis begini di README: mentor mengoptimalkan pertumbuhan jangka panjang, bukan penyelesaian tugas jangka pendek.')
      },
      {
        id: 'lima-level',
        title: 'Lima level bantuan',
        body:
          p('Bantuan tidak diberikan sekaligus. Ada lima tingkat, dan mentor hanya naik tingkat kalau memang diperlukan:') +
          ul('Pertanyaan Sokratik', 'Dorongan terarah', 'Analogi', 'Pseudocode', 'Solusi lengkap') +
          p('Solusi lengkap tetap ada, tapi sebagai pilihan terakhir, bukan pilihan pertama.')
      },
      {
        id: 'claim-gate',
        title: 'Gerbang pemahaman',
        body: p(
          `Bagian yang paling khas adalah ${b('comprehension claim gate')}. Sebelum kode boleh ditulis, kamu harus membuka sebuah "klaim": pernyataan tentang apa yang akan kamu buat dan kenapa. Selama klaim belum dibuka, penulisan file diblokir.`,
          'Setelah itu Coach menilai hasilnya dengan salah satu dari empat putusan: lulus, lulus sebagian lalu lanjut, gagal, atau kembalikan. Progres belajar dicatat otomatis ke sebuah handbook di dalam repo, satu commit per kemajuan, sehingga riwayat belajarmu bisa dibaca ulang.'
        )
      },
      {
        id: 'mencoba',
        title: 'Mencobanya',
        body:
          p('CodingSchool berlisensi MIT dan berjalan di OpenCode, Claude Code, Pi, dan host MCP lainnya. Kontennya tersedia dalam bahasa Inggris dan Indonesia.') +
          pre('npm i @codingskuy/coding-school\nnpx @codingskuy/coding-school setup') +
          p(`Kode sumbernya ada di <a href="https://github.com/codingskuy/coding-school" target="_blank" rel="noopener">github.com/codingskuy/coding-school</a>. Masukan dan kontribusi sangat saya harapkan.`)
      }
    ]
  },

  'promise-all-vs-allsettled': {
    lead: 'Saat mengambil data dari beberapa API sekaligus, saya ketemu jebakan Promise.all: satu gagal, semuanya dianggap gagal.',
    sections: [
      {
        id: 'satpam-galak',
        title: 'Promise.all, si satpam galak',
        body:
          p(`${c('Promise.all')} menunggu semua promise selesai. Tapi begitu satu saja reject, ia langsung melempar error dan hasil yang lain tidak pernah sampai ke tangan kita.`) +
          pre('const hasil = await Promise.all([\n  ambilUser(1),  // berhasil\n  ambilUser(2),  // gagal\n  ambilUser(3),  // tidak ketahuan\n])\n// langsung throw: data user 1 dan 3 ikut hilang') +
          p('Seperti satpam galak: satu tamu bermasalah, seluruh rombongan ditolak masuk.')
      },
      {
        id: 'satpam-sabar',
        title: 'allSettled, si satpam sabar',
        body:
          p(`${c('Promise.allSettled')} juga menunggu semuanya selesai, tapi tidak peduli berhasil atau gagal. Setelah itu ia melapor satu per satu, lengkap dengan statusnya.`) +
          pre("const hasil = await Promise.allSettled([\n  ambilUser(1),\n  ambilUser(2),\n  ambilUser(3),\n])\n// [\n//   { status: 'fulfilled', value: 'User 1' },\n//   { status: 'rejected',  reason: Error },\n//   { status: 'fulfilled', value: 'User 3' }\n// ]")
      },
      {
        id: 'pesanan-kue',
        title: 'Analogi pesanan kue',
        body: p(
          'Bayangkan kamu memesan tiga kue: coklat, keju, dan strawberry. Ternyata keju habis.',
          `Dengan ${c('Promise.all')}, toko membatalkan seluruh pesanan dan kamu pulang tanpa tahu apakah coklat dan strawberry sebenarnya tersedia. Dengan ${c('allSettled')}, toko menyiapkan yang ada lalu melapor: coklat siap, keju habis, strawberry siap. Kamu yang memutuskan langkah berikutnya.`
        )
      },
      {
        id: 'kapan-pakai-apa',
        title: 'Kapan pakai yang mana',
        body:
          ul(
            `${b('Promise.all')} untuk operasi yang memang harus semua atau tidak sama sekali. Contohnya langkah-langkah yang saling bergantung. Ini pola ${b('fail fast')}.`,
            `${b('Promise.allSettled')} untuk halaman yang masih berguna walau sebagian datanya gagal. Contohnya dashboard dengan tiga sumber: kalau API cuaca mati, peta dan data dari database tetap tampil. Ini pola ${b('graceful degradation')}.`
          ) +
          p(`Satu catatan: dengan ${c('allSettled')} error tidak lagi dilempar otomatis, jadi kamu wajib memeriksa ${c('status')} tiap hasil. Kalau tidak, kegagalan akan lewat tanpa suara.`, 'Pilih berdasarkan apa yang dibutuhkan pengguna, bukan berdasarkan kebiasaan mengetik.')
      }
    ]
  },

  'typescript-itu-kontrak': {
    lead: 'Proyek pertama di seri belajar bareng TypeScript: kalkulator dan todo berbasis CLI dengan Bun.',
    sections: [
      {
        id: 'proyeknya',
        title: 'Proyeknya',
        body:
          p('Di sesi belajar bareng CodingSkuy, proyek pertamanya sengaja kecil: kalkulator dengan pure function dan todo list yang menyimpan data ke file, dijalankan dengan Bun dan TypeScript. Bun dipilih karena menjalankan TypeScript langsung tanpa langkah compile manual.') +
          pre('src/\n├── calculator.ts    # pure functions\n├── todo.ts          # domain logic + IO\n├── cli.ts           # controller\n└── utils/args.ts    # helpers') +
          p('Proyeknya sederhana, tapi ada satu pelajaran yang menurut saya sering terlewat oleh pemula.')
      },
      {
        id: 'compile-vs-runtime',
        title: 'Compile time bukan runtime',
        body: p(
          `TypeScript memeriksa kode ${b('saat kamu menulisnya')}. Ia memastikan tipe cocok dan interface terpenuhi. Begitu program berjalan, semua tipe itu sudah hilang, dan yang tersisa adalah JavaScript yang menerima apa saja.`,
          'Artinya TypeScript tidak tahu apa yang diketik user, dan tidak tahu apakah sebuah file benar-benar ada. Dua hal itu hanya bisa dijawab saat runtime.'
        )
      },
      {
        id: 'tiga-jebakan',
        title: 'Tiga jebakan yang kami temui',
        body: ul(
          `${b('Input selalu string.')} Argumen dari ${c('process.argv.slice(2)')} tidak pernah berupa angka. Menulis ${c('as number')} hanya membungkam compiler. Yang benar: ubah dengan ${c('Number()')} lalu periksa dengan ${c('isNaN()')}.`,
          `${b('File bisa belum ada.')} Saat todo dijalankan pertama kali, file datanya belum dibuat. ${c('Bun.file(path).exists()')} perlu dicek sebelum membaca.`,
          `${b('Error ditangani di tempat yang salah.')} Pembagian dengan nol adalah urusan kalkulator, bukan urusan CLI. Kalau validasinya ada di logic, fungsi itu bisa dipakai ulang dan diuji.`
        )
      },
      {
        id: 'pure-vs-side-effect',
        title: 'Pisahkan logic dari side effect',
        body: p(
          'Kalkulator ditulis sebagai pure function: input masuk, hasil keluar, tidak menyentuh file atau terminal. Semua yang berhubungan dengan dunia luar, yaitu membaca argumen, mencetak hasil, dan menulis file, dikumpulkan di lapisan CLI.',
          'Keuntungannya langsung terasa: logic bisa diuji tanpa mock filesystem.'
        )
      },
      {
        id: 'intinya',
        title: 'Intinya',
        body: p(
          `Tipe adalah kontrak antar bagian kode yang kamu tulis sendiri. Di batas sistem, tempat data datang dari user, file, atau jaringan, kontrak itu belum berlaku sampai kamu memvalidasinya. Kode yang bersih bukan hanya soal struktur folder. Backend yang kokoh ${b('mengantisipasi kegagalan')}, bukan sekadar menangkap error.`
        )
      }
    ]
  },

  'dari-kotlin-ke-typescript-template-literal': {
    lead: 'Waktu baru pindah dari Kotlin ke JavaScript, saya berkali-kali menulis string interpolation dengan cara Kotlin.',
    sections: [
      {
        id: 'masalahnya',
        title: 'Masalahnya',
        body:
          p('Di Kotlin, variabel bisa langsung disisipkan ke string dengan tanda dolar di dalam kutip dua. Kebiasaan itu saya bawa ke TypeScript:') +
          pre('let a = 5; let b = 10; let hasil = a + b;\n\nconsole.log("$a + $b = $hasil");\n// tercetak: $a + $b = $hasil') +
          p('Tidak ada error dan tidak ada peringatan. Hasilnya teks mentah. Di JavaScript, kutip dua dan kutip satu hanya menghasilkan teks biasa.')
      },
      {
        id: 'solusinya',
        title: 'Solusinya: backtick',
        body:
          pre('console.log(`${a} + ${b} = ${hasil}`);\n// tercetak: 5 + 10 = 15') +
          p(`Cara saya mengingatnya: backtick adalah gerbang template, dan ${c('${}')} adalah lubang tempat memasukkan nilai. Kurung kurawalnya wajib. Di Kotlin, ${c('$a')} saja sudah cukup untuk variabel sederhana.`)
      },
      {
        id: 'kenapa-ini-penting',
        title: 'Kenapa hal sekecil ini saya tulis',
        body: p(
          'Karena bug seperti ini tidak ditangkap compiler. Sintaksnya valid, hanya hasilnya yang salah. Pindah bahasa bukan cuma soal menghafal sintaks baru. Kita juga harus sadar kebiasaan lama mana yang diam-diam ikut terbawa.',
          'Setelah terbiasa, template literal justru terasa lebih bersih dibanding menyambung string dengan operator tambah, terutama untuk string yang panjang.'
        )
      }
    ]
  },

  'kmp-leverage-bukan-pengganti': {
    lead: 'Saya datang ke sesi Kotlin Multiplatform dengan satu anggapan, dan pulang dengan anggapan yang berbeda.',
    sections: [
      {
        id: 'ekspektasi',
        title: 'Ekspektasi saya salah',
        body: p(
          'Saya sehari-hari bekerja dengan Flutter, SwiftUI, dan Kotlin. Jadi ketika mengikuti sesi Kotlin Multiplatform (KMP) dari Iqbal Fauzi, Senior Mobile Developer di Bobobox, saya datang dengan rasa ingin tahu: di mana posisi KMP dibanding Flutter?',
          'Jawabannya: positioning KMP sangat berbeda dari yang saya bayangkan.'
        )
      },
      {
        id: 'demo',
        title: 'Demo di device low-end',
        body: p(
          'Yang membuat sesi itu meyakinkan: KMP dijalankan langsung di device low-end. Bukan slide, bukan klaim. Ada dua pertanyaan yang biasanya dijawab terpisah, yaitu seberapa cepat kita menulis kode dan seberapa baik hasilnya saat dijalankan. KMP mencoba menjawab keduanya sekaligus.'
        )
      },
      {
        id: 'share',
        title: 'Yang di-share hanya yang masuk akal',
        body:
          p('KMP tidak memaksa UI menjadi satu abstraksi. Yang dibagi antar platform adalah bagian yang memang layak dibagi:') +
          ul('Business logic dan aturan domain', 'Networking dan data layer', 'Validasi dan state management') +
          p('UI tetap native dan tetap spesifik per platform.')
      },
      {
        id: 'migrasi-bertahap',
        title: 'Nilai terbesarnya: migrasi bertahap',
        body: p(
          `Untuk perusahaan yang sudah berinvestasi besar di aplikasi native Android dan iOS, KMP tidak menuntut rewrite dari nol. Kamu bisa masuk ${b('per modul')}, mulai dari bagian yang paling memberi nilai, tanpa membuang codebase lama dan tanpa mengambil risiko migrasi sekaligus.`,
          'Dari sisi bisnis, itu argumen yang jauh lebih kuat daripada perbandingan fitur.'
        )
      },
      {
        id: 'false-binary',
        title: 'KMP tidak akan membunuh Flutter',
        body:
          ul(
            `${b('Flutter')}: UI lintas platform dengan satu codebase. Kuat saat memulai produk dari nol.`,
            `${b('KMP')}: logic dibagi, UI tetap native. Kuat saat codebase native sudah berjalan.`
          ) +
          p('Dua pendekatan untuk dua konteks. Pertanyaannya bukan siapa yang menang, tapi masalah apa yang sedang kamu hadapi.')
      },
      {
        id: 'problem-first',
        title: 'Problem first, framework second',
        body:
          p('Tiga pertanyaan sebelum memilih framework:') +
          ul('Codebase kita sekarang seperti apa?', 'Berapa besar investasi yang sudah ada di native?', 'Framework mana yang memberi leverage terbesar untuk kondisi itu?') +
          p('Solusi terbaik kadang bukan mengganti semuanya, tapi membuat yang sudah ada menjadi lebih kuat. Terima kasih kepada Iqbal Fauzi untuk insight dan demonya.')
      }
    ]
  }
};
