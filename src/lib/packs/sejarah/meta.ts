import type { Deck, Post, BlogPost } from '../../data';

const DATE = '2026-11-28';
const deck = (slug: string, title: string, tags: string[], desc: string, slides: number): Deck =>
  ({ slug, title, type: 'History Deck', tags, desc, lang: 'ID', slides, color: '', date: DATE });
const post = (slug: string, title: string, desc: string): Post =>
  ({ slug, title, tag: 'sejarah', desc, date: DATE, color: '', accent: 'sejarah' });
const note = (slug: string, title: string, mins: number, tags: string[], excerpt: string): BlogPost =>
  ({ slug, title, date: DATE, mins, tags, excerpt });

export const decks: Deck[] = [
  deck('sejarah-grace-hopper', 'Grace Hopper dan Compiler yang Ditertawakan', ['sejarah', 'compiler', 'cobol'],
    'Awal 1950-an, ide menulis program dengan kata-kata dianggap mustahil. Grace Hopper membuat compiler-nya lebih dulu, lalu meyakinkan orang belakangan.', 8),
  deck('sejarah-unix', 'Unix: Sistem Operasi dari Komputer Bekas', ['sejarah', 'unix', 'os'],
    'Dibuat di PDP-7 yang jarang dipakai, setelah proyek besar ditinggalkan. Setengah abad kemudian, idenya ada di setiap terminal yang kamu buka.', 8),
  deck('sejarah-internet', 'Dari ARPANET ke TCP/IP: Internet Dimulai dengan Crash', ['sejarah', 'internet', 'jaringan'],
    'Pesan pertama di ARPANET cuma dua huruf, karena sistemnya crash di huruf ketiga. Begini jaringan kecil itu berubah menjadi internet.', 8),
  deck('sejarah-web', 'World Wide Web: Proposal yang Disebut Samar', ['sejarah', 'web', 'http'],
    'Atasan Tim Berners-Lee menulis "vague but exciting" di sampul proposalnya. Dari dokumen itu lahir URL, HTTP, dan HTML.', 8),
  deck('sejarah-javascript', 'JavaScript: Prototipe Sepuluh Hari yang Menguasai Web', ['sejarah', 'javascript', 'web'],
    'Prototipe pertamanya selesai dalam sekitar sepuluh hari. Keanehannya masih kamu temui sampai hari ini, dan ada alasan kenapa tidak pernah diperbaiki.', 8),
  deck('sejarah-sql', 'Edgar Codd, Tabel, dan Lahirnya SQL', ['sejarah', 'database', 'sql'],
    'Tahun 1970, seorang peneliti IBM menulis bahwa programmer tidak perlu tahu cara data disimpan. Dari paper itu lahir bahasa yang masih kamu tulis tiap hari.', 8),
  deck('sejarah-version-control', 'Sebelum Git Ada SCCS, RCS, CVS, dan Subversion', ['sejarah', 'git', 'version-control'],
    'Git baru lahir tahun 2005. Lebih dari tiga puluh tahun sebelumnya, programmer sudah bergulat dengan masalah yang sama: siapa mengubah apa.', 9),
  deck('sejarah-apollo-11', 'Apollo 11: Alarm 1202 dan Software yang Tidak Panik', ['sejarah', 'apollo', 'reliability'],
    'Beberapa menit sebelum mendarat di Bulan, komputer Apollo 11 berkali-kali menyalakan alarm. Pendaratan tetap jalan karena software-nya dirancang untuk itu.', 9),
  deck('sejarah-java', 'Java: Dari Set-Top Box ke Android', ['sejarah', 'java', 'android'],
    'Java dirancang untuk perangkat elektronik rumah, gagal di sana, lalu menguasai server dan ponsel. Android memakai bahasanya tanpa memakai JVM-nya.', 8),
  deck('sejarah-browser-wars', 'Perang Browser dan Kenapa Standar Web Penting', ['sejarah', 'browser', 'web-standards'],
    'Pernah ada masa ketika situs ditulis untuk satu browser saja. Perang Netscape, Internet Explorer, Firefox, dan Chrome menjelaskan kenapa itu berbahaya.', 8)
];

export const posts: Post[] = [
  post('hopper-compiler-pertama', 'Menulis Program dengan Kata-Kata Pernah Dianggap Lelucon',
    'Awal 1950-an, komputer dianggap hanya bisa berhitung. Grace Hopper membuat compiler, lalu menunggu orang mau memakainya.'),
  post('unix-filosofi', 'Satu Karakter yang Mengubah Cara Programmer Berpikir',
    'Karakter | di terminalmu lahir di Bell Labs tahun 1973. Di baliknya ada filosofi yang masih berlaku untuk desain software hari ini.'),
  post('arpanet-lo', 'Pesan Pertama Internet Cuma Dua Huruf',
    'Oktober 1969, sebuah komputer di UCLA mencoba login ke komputer di SRI. Sistemnya crash setelah dua huruf. Itulah awal internet.'),
  post('web-proposal-samar', 'Proposal Web Pertama Disebut "Samar tapi Menarik"',
    'Bukan perusahaan teknologi yang melahirkan web, tapi laboratorium fisika di Swiss. Dan atasannya sempat ragu.'),
  post('javascript-sepuluh-hari', 'Bahasa yang Menjalankan Web Dibuat dalam Sekitar 10 Hari',
    'Brendan Eich, Netscape, Mei 1995. Prototipe yang dikerjakan terburu-buru itu sekarang jalan di setiap browser di dunia.'),
  post('codd-tabel', 'Ide Terbaik IBM Tidak Langsung Dijual oleh IBM',
    'Edgar Codd menulis model relasional di IBM tahun 1970. Produk SQL komersial pertama justru datang dari perusahaan lain.'),
  post('vcs-sebelum-git', 'Git Baru Lahir 2005. Sebelumnya Pakai Apa?',
    'SCCS, RCS, CVS, Subversion. Empat generasi version control, masing-masing lahir untuk menambal sakit kepala generasi sebelumnya.'),
  post('apollo-alarm-1202', 'Alarm Berbunyi Beberapa Menit Sebelum Mendarat di Bulan',
    'Alarm 1202 di Apollo 11 bukan tanda software gagal. Itu tanda software melakukan persis apa yang dirancang tim Margaret Hamilton.'),
  post('java-di-android', 'Android Memakai Java, Tapi Bukan JVM',
    'Kode Android dulu ditulis dalam Java, tapi tidak pernah dijalankan di Java Virtual Machine. Perbedaan kecil itu berujung sidang sampai Mahkamah Agung AS.'),
  post('perang-browser', 'Dulu Situs Ditulis untuk Satu Browser Saja',
    'Tag blink, tag marquee, lalu IE6 yang mandek bertahun-tahun. Perang browser adalah alasan kode web-mu bisa jalan di mana saja hari ini.')
];

export const notes: BlogPost[] = [
  note('hopper-bahasa-inggris', 'Kenapa "Program dalam Bahasa Inggris" Pernah Dianggap Konyol', 4, ['sejarah', 'compiler', 'karier'],
    'Keberatan terhadap compiler tahun 1950-an terdengar sangat masuk akal pada zamannya. Dan bunyinya mirip sekali dengan keberatan terhadap alat baru hari ini.'),
  note('unix-dan-pipa', 'Sepuluh Halaman Program Melawan Enam Baris Shell', 4, ['sejarah', 'unix', 'shell'],
    'Tahun 1986, Donald Knuth menulis program panjang yang indah untuk menghitung kata. Doug McIlroy menjawabnya dengan pipeline enam baris.'),
  note('internet-bukan-untuk-perang-nuklir', 'Internet Tidak Dibuat untuk Bertahan dari Bom Nuklir', 4, ['sejarah', 'internet', 'jaringan'],
    'Cerita populernya: ARPANET dibuat agar komunikasi militer selamat dari serangan nuklir. Kenyataannya lebih menarik, dan lebih berguna untuk programmer.'),
  note('web-yang-tidak-dipatenkan', 'Web Menang karena Tidak Dijual', 4, ['sejarah', 'web', 'open-source'],
    'Gopher sempat lebih populer daripada web. Lalu satu keputusan lisensi di tahun 1993 mengubah arah internet.'),
  note('javascript-tidak-boleh-rusak', 'Kenapa typeof null Masih "object" Sampai Hari Ini', 4, ['sejarah', 'javascript', 'kompatibilitas'],
    'Bug dari tahun 1995 itu sudah dikenal semua orang. Tidak ada yang memperbaikinya, dan itu keputusan yang benar.'),
  note('sql-tidak-tergantikan', 'SQL Lebih Tua dari Kebanyakan Programmer, dan Belum Tergantikan', 4, ['sejarah', 'sql', 'database'],
    'Sudah berkali-kali SQL diramalkan mati. Ia selalu kembali, karena ide Codd bukan soal sintaks tapi soal siapa yang memikirkan cara mengambil data.'),
  note('git-lahir-dari-lisensi', 'Git Lahir karena Sebuah Lisensi Dicabut', 4, ['sejarah', 'git', 'open-source'],
    'Kernel Linux pernah memakai version control berbayar secara gratis. Ketika izin itu dicabut, Linus Torvalds menulis penggantinya sendiri.'),
  note('hamilton-software-engineering', 'Saat Software Belum Dianggap Rekayasa', 4, ['sejarah', 'apollo', 'software-engineering'],
    'Di program Apollo, hardware punya insinyur dan prosedur. Software dianggap urusan belakangan. Margaret Hamilton menolak anggapan itu.'),
  note('java-oracle-google', 'Sebelas Tahun Bertengkar Soal API Java', 4, ['sejarah', 'java', 'android'],
    'Oracle menggugat Google tahun 2010 dan baru selesai di Mahkamah Agung AS tahun 2021. Pertanyaannya penting untuk semua programmer: siapa pemilik sebuah API?'),
  note('standar-web-ie6', 'IE6 dan Pelajaran dari Satu Pemenang', 4, ['sejarah', 'browser', 'web-standards'],
    'Internet Explorer memenangkan perang browser pertama. Hadiahnya bagi programmer web adalah bertahun-tahun bekerja di sekitar browser yang tidak berubah.')
];
