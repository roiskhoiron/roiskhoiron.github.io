import type { DeckSlide, PostSlide } from '../../data';
import { p, ul, pre, c, b, type Full } from '../../blog-html';

const card = (label: string, title: string, body: string, extra: Partial<PostSlide> = {}): PostSlide =>
  ({ num: '', label, title, body, theme: 'white', ...extra });

/* ───────────────────────── decks ───────────────────────── */

export const deckSlides: Record<string, DeckSlide[]> = {
  'sejarah-grace-hopper': [
    { layout: 'cover', subtitle: 'Sejarah compiler', title: 'Grace Hopper dan Compiler yang Ditertawakan', message: 'Awal 1950-an, menulis program dengan kata-kata dianggap mustahil. Hopper tetap membuatnya, lalu menunggu dunia menyusul.', points: ['Sistem A-0 untuk UNIVAC I.', 'Dari sana jalurnya menuju FLOW-MATIC dan COBOL.'] },
    { layout: 'bullets', subtitle: 'Konteks', title: 'Programmer Menulis Angka', message: 'Sebelum compiler, program adalah deretan kode mesin yang disusun dengan tangan.', points: ['Setiap instruksi berupa angka atau kode pendek yang harus dihafal.', 'Rutin yang sama disalin ulang ke banyak program, dan salah salin menjadi bug.', 'Komputer sangat mahal. Waktu mesin dijaga ketat, waktu manusia dianggap murah.'] },
    { layout: 'bullets', subtitle: 'Sistem A-0', title: 'Biar Mesin yang Merakit Program', message: 'A-0 mengambil subrutin dari pustaka dan menyusunnya menjadi satu program utuh.', points: ['Programmer menulis kode pendek yang merujuk ke subrutin tertentu.', 'A-0 mencari subrutin itu lalu menggabungkannya.', 'Dengan kacamata hari ini, cara kerjanya lebih mirip linker atau loader.', 'Ide intinya tetap sama dengan compiler modern: program yang menulis program.'] },
    { layout: 'split', subtitle: 'Penolakan', leftTitle: 'Kata Para Ahli', leftPoints: ['Komputer hanya untuk aritmetika.', 'Kode buatan mesin pasti boros memori.', 'Programmer sungguhan menulis kode mesin.'], title: 'Argumen Hopper', rightTitle: 'Buka Pintunya', rightPoints: ['Compiler-nya sudah berjalan, tinggal dipakai.', 'Orang bisnis tidak akan belajar kode mesin.', 'Lebih banyak orang bisa ikut memprogram.'] },
    { layout: 'code', subtitle: 'Hasilnya · COBOL (1959)', title: 'Kode yang Dibaca seperti Kalimat', message: 'Hopper bekerja di FLOW-MATIC, yang ikut memengaruhi COBOL. Contoh ini jalan dengan cobc -x -free.', code: `IDENTIFICATION DIVISION.
PROGRAM-ID. HITUNG.
DATA DIVISION.
WORKING-STORAGE SECTION.
01 HARGA PIC 9(5) VALUE 1500.
01 PAJAK PIC 9(5) VALUE 150.
01 TOTAL PIC 9(6).
PROCEDURE DIVISION.
    ADD HARGA TO PAJAK GIVING TOTAL.
    DISPLAY "TOTAL: " TOTAL.
    STOP RUN.`, points: ['Manajer bisa membaca baris ADD tanpa kursus.', 'COBOL masih menjalankan banyak sistem bank dan pemerintahan.'] },
    { layout: 'cards', subtitle: 'Warisan', title: 'Yang Kamu Pakai Tiap Hari', message: 'Hampir semua alat kerjamu berdiri di atas ide yang dulu ditolak.', cards: [{ title: 'Compiler', desc: 'Kotlin, Swift, Dart, TypeScript: semuanya diterjemahkan oleh program lain.', icon: '1' }, { title: 'Kode lepas dari mesin', desc: 'Program ditulis untuk manusia, lalu diterjemahkan untuk mesin.', icon: '2' }, { title: 'Pustaka rutin', desc: 'Ide A-0 menyusun subrutin hidup lagi di package manager.', icon: '3' }, { title: 'Mengajar', desc: 'Hopper terkenal membagikan kabel sepanjang jarak tempuh cahaya dalam satu nanodetik.', icon: '4' }] },
    { layout: 'bullets', subtitle: 'Pola', title: 'Abstraksi Selalu Dicurigai', message: 'Keberatan terhadap compiler terdengar akrab sampai hari ini.', points: ['Compiler: "kodenya pasti lambat."', 'Garbage collector: "programmer jadi malas mengurus memori."', 'Framework: "itu bukan pemrograman sungguhan."', 'AI coding agent: argumen yang sama, alat yang baru.'] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'Hopper tidak menang debat. Ia menang dengan alat yang berjalan.', points: ['Bukti yang bisa dijalankan lebih meyakinkan daripada presentasi.', 'Abstraksi yang baik membuka profesi untuk lebih banyak orang.', 'Pertanyaan yang tepat bukan "apakah ini curang", tapi "apakah hasilnya benar".'] }
  ],

  'sejarah-unix': [
    { layout: 'cover', subtitle: 'Bell Labs, 1969', title: 'Unix dan Filosofi Alat Kecil', message: 'Dua programmer, satu komputer yang jarang dipakai, dan ide yang masih hidup di setiap terminal.', points: ['Ken Thompson dan Dennis Ritchie.', 'Pipe: satu karakter yang mengubah cara berpikir.'] },
    { layout: 'bullets', subtitle: 'Latar', title: 'Setelah Multics Ditinggalkan', message: 'Bell Labs mundur dari Multics, proyek sistem operasi bersama MIT dan General Electric yang dinilai terlalu besar dan lambat.', points: ['Thompson mulai menulis sistem baru di sebuah PDP-7.', 'Namanya plesetan dari Multics: Unics, lalu menjadi Unix.', 'Targetnya sederhana: sistem yang nyaman untuk programmer itu sendiri.'] },
    { layout: 'bullets', subtitle: '1969 – 1973', title: 'Dari Assembly ke C', message: 'Keputusan bahasa yang membuat Unix bisa pindah rumah.', points: ['1969: versi awal di PDP-7, ditulis dalam assembly.', '1972: Ritchie mengembangkan bahasa C.', '1973: kernel Unix ditulis ulang dalam C.', 'Sistem operasi tidak lagi terikat ke satu jenis mesin.'] },
    { layout: 'bullets', subtitle: 'Pipe · 1973', title: 'Ide Doug McIlroy', message: 'McIlroy lama mendorong agar program bisa disambung seperti selang. Thompson akhirnya menambahkan pipe ke Unix.', points: ['Output satu program langsung menjadi input program berikutnya.', 'Karakter | di shell menjadi penghubungnya.', 'Setiap program tidak perlu tahu siapa yang ada di sebelahnya.'] },
    { layout: 'cards', subtitle: 'Filosofi Unix', title: 'Empat Aturan yang Bertahan', message: 'Tiga yang pertama diringkas McIlroy. Yang keempat mengikuti dengan sendirinya.', cards: [{ title: 'Satu tugas saja', desc: 'Buat program yang melakukan satu hal, dan melakukannya dengan baik.', icon: '1' }, { title: 'Bisa disambung', desc: 'Tulis program yang bisa bekerja sama dengan program lain.', icon: '2' }, { title: 'Teks sebagai antarmuka', desc: 'Aliran teks bisa dibaca oleh program apa pun.', icon: '3' }, { title: 'Mudah diganti', desc: 'Bagian kecil bisa ditukar tanpa membongkar semuanya.', icon: '4' }] },
    { layout: 'code', subtitle: 'Dalam praktik', title: 'Lima Program, Nol Baris Baru', message: 'Mencari lima alamat IP paling sering di log server.', code: `cut -d' ' -f1 access.log \\
  | sort \\
  | uniq -c \\
  | sort -rn \\
  | head -5`, points: ['Setiap langkah bisa dicoba dan dicek sendiri.', 'Butuh hasil berbeda? Ganti satu potongan saja.'] },
    { layout: 'split', subtitle: 'Warisan', leftTitle: 'Keturunan Unix', leftPoints: ['BSD, yang ikut membentuk macOS dan iOS.', 'Linux, yang meniru desain Unix.', 'Android, berjalan di atas kernel Linux.'], title: 'Warisan idenya', rightTitle: 'Di Kode Harianmu', rightPoints: ['Layanan kecil yang dirangkai menjadi sistem.', 'Rantai map, filter, reduce.', 'CLI modern yang tetap bisa disambung dengan |.'] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'Unix lahir kecil, dan justru karena itu bertahan.', points: ['Komponen kecil lebih mudah dipahami, dites, dan diganti.', 'Antarmuka yang sederhana mengalahkan antarmuka yang pintar.', 'Sebelum menulis program baru, cek apakah alat yang ada bisa disambung.'] }
  ],

  'sejarah-internet': [
    { layout: 'cover', subtitle: 'Dari ARPANET ke TCP/IP', title: 'Internet Dimulai dengan Pesan "LO"', message: 'Jaringan riset kecil berubah menjadi jaringan antar jaringan. Kuncinya bukan kabel, tapi kesepakatan protokol.', points: ['1969: ARPANET terhubung.', '1 Januari 1983: ARPANET pindah ke TCP/IP.'] },
    { layout: 'bullets', subtitle: 'Latar', title: 'Kenapa ARPANET Dibuat', message: 'ARPA mendanai riset komputer di banyak kampus. Komputernya mahal dan tidak bisa saling bicara.', points: ['Tujuan utamanya berbagi sumber daya komputer antar lembaga riset.', 'Ide packet switching datang dari Paul Baran dan Donald Davies secara terpisah.', 'Data dipotong menjadi paket kecil yang bisa lewat jalur berbeda.'] },
    { layout: 'bullets', subtitle: '29 Oktober 1969', title: 'Pesan Pertama', message: 'Komputer di UCLA mencoba login ke komputer di SRI.', points: ['Yang mau dikirim adalah kata LOGIN.', 'Huruf L dan O sampai, lalu sistem crash.', 'Jadi pesan pertama di ARPANET adalah "LO".', 'Akhir 1969 ada empat node: UCLA, SRI, UC Santa Barbara, dan University of Utah.'] },
    { layout: 'split', subtitle: 'Masalah 1970-an', leftTitle: 'Satu Jaringan', leftPoints: ['ARPANET memakai protokol NCP.', 'Bekerja baik di dalam jaringannya sendiri.', 'Jaringan radio dan satelit tidak bisa ikut.'], title: 'Solusinya', rightTitle: 'Antar Jaringan', rightPoints: ['Vint Cerf dan Bob Kahn merancang TCP, paper 1974.', 'Jaringan cukup mengantar paket, ujungnya yang cerdas.', 'Kemudian dipecah: TCP untuk keandalan, IP untuk alamat.'] },
    { layout: 'cards', subtitle: 'Lapisan', title: 'Siapa Mengerjakan Apa', message: 'Setiap lapisan hanya peduli pada tugasnya sendiri.', cards: [{ title: 'Link', desc: 'Ethernet, Wi-Fi, seluler. Apa saja yang bisa membawa bit.', icon: '1' }, { title: 'IP', desc: 'Alamat dan rute. Berusaha mengantar, tanpa janji sampai.', icon: '2' }, { title: 'TCP', desc: 'Urutan dan pengiriman ulang. Paket hilang dikirim lagi.', icon: '3' }, { title: 'Aplikasi', desc: 'HTTP, email, DNS. Yang kamu tulis setiap hari.', icon: '4' }] },
    { layout: 'bullets', subtitle: '1 Januari 1983', title: 'Flag Day', message: 'ARPANET berhenti memakai NCP. Setiap host harus bicara TCP/IP.', points: ['Peralihannya disiapkan bertahun-tahun.', 'Tanggal ini sering disebut hari lahir internet modern.', 'Sejak itu jaringan apa pun bisa bergabung asal bicara IP.'] },
    { layout: 'code', subtitle: 'Coba sendiri', title: 'Lihat Paketmu Berjalan', message: 'Dua perintah untuk melihat lapisan-lapisan tadi bekerja.', code: `# Jalur paket dari laptopmu ke server
traceroute example.com

# Koneksi TCP, TLS, lalu request HTTP
curl -v https://example.com`, points: ['Setiap baris traceroute adalah satu router di jalan.', 'curl -v menunjukkan koneksi sebelum data datang.'] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'Internet bertahan karena desainnya rendah hati.', points: ['Jaringan sederhana, kecerdasan di ujung.', 'Protokol terbuka mengalahkan jaringan tertutup.', 'Perubahan besar butuh tanggal tegas dan persiapan panjang.'] }
  ],

  'sejarah-web': [
    { layout: 'cover', subtitle: 'CERN, Maret 1989', title: 'Web Lahir dari Proposal yang "Samar"', message: 'Tim Berners-Lee mengajukan sistem untuk mengelola informasi. Atasannya, Mike Sendall, menulis di sampulnya: "Vague but exciting".', points: ['Bukan dari perusahaan teknologi.', 'Dari laboratorium fisika partikel.'] },
    { layout: 'bullets', subtitle: 'Masalahnya', title: 'Informasi yang Tercecer di CERN', message: 'Proposalnya berjudul "Information Management: A Proposal".', points: ['Peneliti datang dan pergi, pengetahuannya ikut pergi.', 'Setiap tim memakai komputer dan format dokumen berbeda.', 'Usulannya: dokumen yang saling terhubung lewat link, bisa dibaca dari mesin apa pun.'] },
    { layout: 'cards', subtitle: 'Tiga penemuan', title: 'Fondasi yang Masih Dipakai', message: 'Berners-Lee tidak menciptakan internet. Ia membangun lapisan di atasnya.', cards: [{ title: 'URL', desc: 'Alamat unik untuk setiap dokumen di mana pun ia berada.', icon: '1' }, { title: 'HTTP', desc: 'Cara meminta dan mengirim dokumen lewat jaringan.', icon: '2' }, { title: 'HTML', desc: 'Bahasa penanda dokumen, lengkap dengan link.', icon: '3' }, { title: 'Browser + server', desc: 'Yang pertama ditulis Berners-Lee di komputer NeXT.', icon: '4' }] },
    { layout: 'bullets', subtitle: 'Kronologi', title: 'Dari Proposal ke Publik', message: 'Lima tahun yang membentuk internet yang kamu kenal.', points: ['1989: proposal pertama di CERN.', '1990: versi revisi bersama Robert Cailliau; browser dan server pertama berjalan.', '1991: web bisa diakses orang di luar CERN.', '1993: CERN melepas software web ke domain publik. Setahun kemudian W3C berdiri.'] },
    { layout: 'code', subtitle: 'Protokolnya', title: 'HTTP Bisa Diketik Manusia', message: 'Request HTTP pada dasarnya teks biasa. Kirim manual dengan netcat:', code: `printf 'GET / HTTP/1.1\\r\\nHost: example.com\\r\\n\\r\\n' \\
  | nc example.com 80`, points: ['Versi paling awal bahkan lebih sederhana: GET dan path saja.', 'Server membalas dengan status, header, lalu HTML.'] },
    { layout: 'split', subtitle: 'Keputusan 1993', leftTitle: 'Bisa Saja Dijual', leftPoints: ['Lisensi berbayar untuk server dan browser.', 'Gopher, pesaingnya, mulai bicara biaya lisensi.', 'Banyak pihak jadi ragu memakai Gopher.'], title: 'Yang terjadi', rightTitle: 'Diberikan Gratis', rightPoints: ['Software web CERN dilepas ke domain publik.', 'Siapa pun boleh membuat browser dan server.', 'Lahir Mosaic, Netscape, dan seluruh ekosistemnya.'] },
    { layout: 'bullets', subtitle: 'Hari ini', title: 'Yang Masih Sama Sejak 1991', message: 'Teknologinya berubah, fondasinya tidak.', points: ['URL tetap alamat universal.', 'HTTP tetap request dan response, walau kini HTTP/2 dan HTTP/3.', 'HTML tetap bahasa dasar halaman.', 'CERN memulihkan situs pertamanya di info.cern.ch. Kamu masih bisa membukanya.'] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'Web menang karena sederhana dan terbuka.', points: ['Masalah yang jelas lebih penting daripada proposal yang rapi.', 'Standar sederhana mudah diimplementasikan banyak orang.', 'Keterbukaan bisa menjadi strategi, bukan sekadar kebaikan hati.'] }
  ],

  'sejarah-javascript': [
    { layout: 'cover', subtitle: 'Netscape, Mei 1995', title: 'JavaScript: Prototipe Sepuluh Hari', message: 'Brendan Eich diminta membuat bahasa scripting untuk browser. Prototipe pertamanya selesai dalam sekitar sepuluh hari.', points: ['Dari Mocha ke LiveScript ke JavaScript.', 'Dari tombol form ke server dan aplikasi mobile.'] },
    { layout: 'bullets', subtitle: 'Konteks', title: 'Kenapa Harus Buru-Buru', message: 'Netscape sedang berlomba merebut web, dan butuh bahasa ringan untuk halaman.', points: ['Java untuk komponen besar, bahasa scripting untuk perekat kecil.', 'Eich diminta membuat bahasa yang terlihat seperti Java.', 'Di dalamnya ia memasukkan ide dari Scheme dan Self: fungsi kelas satu dan prototype.'] },
    { layout: 'bullets', subtitle: 'Soal nama', title: 'Bukan Saudara Java', message: 'Namanya berganti dua kali sebelum dirilis.', points: ['Mocha, lalu LiveScript.', 'Menjadi JavaScript lewat kerja sama Netscape dengan Sun, saat Java sedang naik daun.', 'Bahasanya sendiri sangat berbeda dari Java.'] },
    { layout: 'code', subtitle: 'Jejak sepuluh hari', title: 'Keanehan yang Tidak Pernah Hilang', message: 'Coba di console browser mana pun.', code: `typeof null        // "object"
"5" - 2            // 3
"5" + 2            // "52"
[] == false        // true
0.1 + 0.2 === 0.3  // false`, points: ['Baris terakhir bukan salah JS: itu sifat angka floating point.', 'Sisanya bertahan karena web tidak boleh rusak.'] },
    { layout: 'bullets', subtitle: 'Standar', title: 'Dari JScript ke ECMAScript', message: 'Microsoft membuat versinya sendiri untuk Internet Explorer, bernama JScript.', points: ['Netscape membawa bahasanya ke Ecma International.', '1997: standar ECMA-262 edisi pertama terbit.', 'ES2015 menjadi pembaruan besar: let, const, class, arrow function, module.', 'Sejak itu standarnya rilis setiap tahun.'] },
    { layout: 'cards', subtitle: 'Empat lompatan', title: 'Dari Mainan ke Platform', message: 'JavaScript tidak menang di hari pertama. Ia menang bertahap.', cards: [{ title: 'Ajax · 2005', desc: 'Istilah yang menamai teknik di balik Gmail dan Google Maps.', icon: '1' }, { title: 'V8 · 2008', desc: 'Engine Chrome membuat JS cukup cepat untuk aplikasi besar.', icon: '2' }, { title: 'Node.js · 2009', desc: 'Ryan Dahl membawa V8 ke server.', icon: '3' }, { title: 'TypeScript · 2012', desc: 'Tipe statis di atas JS, tanpa meninggalkan ekosistemnya.', icon: '4' }] },
    { layout: 'split', subtitle: 'Kenapa menang', leftTitle: 'Bukan yang Terbaik', leftPoints: ['Desain awalnya terburu-buru.', 'Aturan konversi tipe yang membingungkan.', 'Bertahun-tahun tanpa sistem module.'], title: 'Tapi karena', rightTitle: 'Ada di Mana-Mana', rightPoints: ['Tertanam di setiap browser.', 'Tidak perlu install apa pun untuk mencobanya.', 'Kode lama dijaga tetap jalan.'] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'Distribusi sering mengalahkan desain.', points: ['Keputusan cepat bisa hidup puluhan tahun. Pilih default dengan hati-hati.', 'Kompatibilitas mundur adalah janji yang mahal, tapi membangun kepercayaan.', 'Pakai linter dan TypeScript untuk menghindari jebakan lama.'] }
  ],

  'sejarah-sql': [
    { layout: 'cover', subtitle: 'IBM San Jose, 1970', title: 'Codd, Tabel, dan Lahirnya SQL', message: 'Edgar F. Codd menulis bahwa programmer tidak perlu tahu bagaimana data disimpan. Ide itu mengubah database selamanya.', points: ['Paper: "A Relational Model of Data for Large Shared Data Banks".', 'Diterbitkan di Communications of the ACM.'] },
    { layout: 'bullets', subtitle: 'Sebelum 1970', title: 'Database yang Harus Dinavigasi', message: 'Model hierarkis dan network mendominasi, misalnya IMS milik IBM sendiri.', points: ['Data disusun sebagai pohon atau jaring pointer.', 'Program menelusuri jalur: dari induk ke anak, record demi record.', 'Struktur penyimpanan berubah, program ikut ditulis ulang.'] },
    { layout: 'bullets', subtitle: 'Ide Codd', title: 'Data sebagai Relasi', message: 'Dasarnya teori himpunan, tapi bentuknya akrab: tabel.', points: ['Data disimpan sebagai baris dan kolom.', 'Hubungan antar data dinyatakan lewat nilai, bukan pointer.', 'Program menyatakan data apa yang diinginkan, bukan jalur mengambilnya.', 'Cara penyimpanan bisa berubah tanpa mengubah program.'] },
    { layout: 'split', subtitle: 'Dua cara bertanya', leftTitle: 'Navigasional', leftPoints: ['Buka record pelanggan.', 'Ikuti pointer ke setiap pesanan.', 'Jumlahkan sendiri di dalam loop.'], title: 'Relasional', rightTitle: 'Deklaratif', rightPoints: ['Sebutkan tabel dan syaratnya.', 'Database memilih urutan dan index.', 'Hasilnya kembali sebagai tabel baru.'] },
    { layout: 'code', subtitle: 'Hasilnya hari ini', title: 'Kamu Menyebut Hasilnya, Bukan Caranya', message: 'Total belanja per pelanggan sejak awal 2026.', code: `SELECT p.nama, SUM(o.total) AS belanja
FROM pelanggan p
JOIN pesanan o ON o.pelanggan_id = p.id
WHERE o.tanggal >= '2026-01-01'
GROUP BY p.nama
ORDER BY belanja DESC;`, points: ['Tidak ada loop, tidak ada pointer.', 'Query optimizer yang menentukan cara eksekusinya.'] },
    { layout: 'bullets', subtitle: 'Dari paper ke produk', title: 'System R dan SEQUEL', message: 'IBM membangun prototipe System R untuk menguji ide Codd.', points: ['Donald Chamberlin dan Raymond Boyce merancang bahasa SEQUEL.', 'Namanya diubah menjadi SQL karena masalah merek dagang.', 'Produk SQL komersial pertama justru datang dari Relational Software, yang kemudian bernama Oracle.', 'IBM menyusul dengan produknya sendiri, termasuk DB2.'] },
    { layout: 'cards', subtitle: 'Warisan', title: 'Yang Datang dari Satu Paper', message: 'Konsep yang kamu pakai saat mendesain tabel.', cards: [{ title: 'Primary key', desc: 'Setiap baris punya identitas yang jelas.', icon: '1' }, { title: 'Foreign key', desc: 'Hubungan antar tabel lewat nilai, bukan alamat memori.', icon: '2' }, { title: 'Normalisasi', desc: 'Simpan satu fakta di satu tempat supaya tidak saling bertentangan.', icon: '3' }, { title: 'Independensi data', desc: 'Index dan penyimpanan bisa diubah tanpa mengubah query.', icon: '4' }] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'Codd menerima Turing Award tahun 1981 untuk karya ini.', points: ['Pisahkan apa yang kamu mau dari bagaimana cara mendapatkannya.', 'Abstraksi yang tepat bisa bertahan lebih dari lima puluh tahun.', 'Belajar SQL dengan serius adalah investasi yang jarang basi.'] }
  ],

  'sejarah-version-control': [
    { layout: 'cover', subtitle: 'Sejarah version control', title: 'Sebelum Git: SCCS, RCS, CVS, Subversion', message: 'Git lahir tahun 2005. Masalah yang ia selesaikan sudah ada sejak awal 1970-an.', points: ['Empat generasi alat, satu pertanyaan.', 'Siapa mengubah apa, kapan, dan kenapa?'] },
    { layout: 'bullets', subtitle: 'Tanpa version control', title: 'laporan_final_v2_fix_BENAR', message: 'Kalau kamu pernah menamai file seperti ini, kamu sudah merasakan masalahnya.', points: ['Tidak tahu versi mana yang terakhir benar.', 'Dua orang mengedit file yang sama, satu perubahan hilang.', 'Bug muncul, tapi tidak ada cara melihat apa yang berubah kemarin.'] },
    { layout: 'bullets', subtitle: '1972 – 1982', title: 'SCCS dan RCS', message: 'Generasi pertama: melacak riwayat satu file, di satu mesin.', points: ['1972: SCCS dibuat Marc Rochkind di Bell Labs.', '1982: RCS dibuat Walter Tichy, menyimpan perubahan dengan lebih efisien.', 'Setiap file punya riwayat sendiri. Tidak ada konsep "satu commit untuk banyak file".', 'Untuk mengedit, kamu mengunci file-nya dulu.'] },
    { layout: 'split', subtitle: 'Dua model kerja', leftTitle: 'Kunci Dulu', leftPoints: ['Ambil kunci, edit, kembalikan.', 'Tidak pernah ada konflik.', 'Tapi rekan setim harus menunggu.'], title: 'Model berikutnya', rightTitle: 'Salin lalu Gabung', rightPoints: ['Semua orang mengedit bersamaan.', 'Perubahan digabung saat dikirim.', 'Konflik ditangani manusia, kalau ada.'] },
    { layout: 'bullets', subtitle: 'CVS dan Subversion', title: 'Generasi Server Pusat', message: 'Satu repository di server, semua developer terhubung ke sana.', points: ['CVS dimulai Dick Grune pada 1986 sebagai kumpulan script di atas RCS.', 'CVS membuat banyak orang bisa bekerja bersamaan lewat jaringan.', 'Subversion dimulai tahun 2000 dengan misi menjadi "CVS yang benar".', 'Subversion membawa commit atomik dan riwayat untuk folder.'] },
    { layout: 'bullets', subtitle: '2005', title: 'Generasi Terdistribusi', message: 'Setiap developer memegang salinan riwayat yang lengkap.', points: ['Kernel Linux kehilangan akses gratis ke BitKeeper.', 'Linus Torvalds menulis Git dalam hitungan minggu.', 'Di periode yang sama lahir Mercurial dengan tujuan serupa.', 'Pemeliharaan Git kemudian diserahkan ke Junio Hamano.'] },
    { layout: 'code', subtitle: 'Bedanya terasa di sini', title: 'Commit ke Server vs Commit Lokal', message: 'Di Subversion, commit langsung mengubah server. Di Git, commit tinggal di laptopmu dulu.', code: `# Subversion
svn checkout https://svn.example.com/repo/trunk
svn commit -m "fix login"

# Git
git clone https://git.example.com/repo.git
git commit -am "fix login"
git push`, points: ['Commit Git bisa dibuat offline.', 'Push adalah langkah terpisah, setelah kamu yakin.'] },
    { layout: 'cards', subtitle: 'Yang dibawa Git', title: 'Kenapa Git Menang', message: 'Bukan karena mudah dipelajari. Karena cepat dan aman.', cards: [{ title: 'Semua lokal', desc: 'Log, diff, dan commit tidak perlu menunggu server.', icon: '1' }, { title: 'Branch murah', desc: 'Membuat branch hanya menulis satu penunjuk kecil.', icon: '2' }, { title: 'Hash isi', desc: 'Setiap objek diberi nama dari hash isinya. Perubahan diam-diam ketahuan.', icon: '3' }, { title: 'Hosting', desc: 'Layanan seperti GitHub membuat kolaborasi lewat Git jadi kebiasaan.', icon: '4' }] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'Setiap generasi menjawab sakit kepala generasi sebelumnya.', points: ['Penguncian file berganti menjadi penggabungan perubahan.', 'Server pusat berganti menjadi salinan lengkap di tiap laptop.', 'Masalah intinya tetap: tim butuh riwayat yang bisa dipercaya.'] }
  ],

  'sejarah-apollo-11': [
    { layout: 'cover', subtitle: '20 Juli 1969', title: 'Apollo 11 dan Alarm 1202', message: 'Beberapa menit sebelum mendarat, komputer pemandu menyalakan alarm berkali-kali. Pendaratan tetap jalan.', points: ['Software dari MIT Instrumentation Laboratory.', 'Tim software dipimpin Margaret Hamilton.'] },
    { layout: 'bullets', subtitle: 'Orangnya', title: 'Margaret Hamilton', message: 'Hamilton memimpin divisi yang menulis software penerbangan untuk misi Apollo.', points: ['Ia mendorong agar software diperlakukan sebagai disiplin rekayasa.', 'Ia dikenal sebagai salah satu orang pertama yang memakai istilah "software engineering".', 'Tahun 2016 ia menerima Presidential Medal of Freedom.'] },
    { layout: 'bullets', subtitle: 'Mesinnya', title: 'Apollo Guidance Computer', message: 'Komputer yang jauh lebih lemah dari kalkulator di HP-mu hari ini.', points: ['Memori kerja sekitar 2K word, memori program sekitar 36K word.', 'Program disimpan di core rope memory yang dirajut dengan tangan.', 'Astronot berinteraksi lewat DSKY: angka "verb" dan "noun".'] },
    { layout: 'bullets', subtitle: 'Saat turun ke Bulan', title: 'Alarm 1202, lalu 1201', message: 'Armstrong dan Aldrin melaporkan alarm yang tidak mereka kenali dari ingatan.', points: ['Kodenya berarti komputer kelebihan beban kerja.', 'Di Houston, Steve Bales dan Jack Garman harus memutuskan dalam hitungan detik.', 'Mereka tahu alarm ini aman selama tidak terus-menerus. Jawabannya: "Go".'] },
    { layout: 'split', subtitle: 'Apa yang terjadi', leftTitle: 'Penyebab', leftPoints: ['Data radar rendezvous terus meminta waktu komputer.', 'Waktu itu tidak ada dalam rencana pendaratan.', 'Antrian tugas penuh.'], title: 'Respons software', rightTitle: 'Restart Terkendali', rightPoints: ['Komputer restart dan membuang tugas tak penting.', 'Tugas pendaratan tetap berjalan.', 'Alarm memberi tahu kru apa yang terjadi.'] },
    { layout: 'code', subtitle: 'Ilustrasi idenya', title: 'Prioritas Saat Kelebihan Beban', message: 'Ini bukan kode AGC asli (aslinya assembly AGC), hanya gambaran prinsipnya.', code: `type Job = { name: string; priority: number }

function onOverload(jobs: Job[], slots: number) {
  // pertahankan yang paling penting
  return [...jobs]
    .sort((a, b) => b.priority - a.priority)
    .slice(0, slots)
}`, points: ['Saat sumber daya habis, pilih yang harus selamat.', 'Lebih baik turun kualitas daripada mati total.'] },
    { layout: 'cards', subtitle: 'Pelajaran desain', title: 'Empat Prinsip dari Apollo', message: 'Berlaku untuk aplikasi mobile dan backend-mu.', cards: [{ title: 'Prioritas jelas', desc: 'Tentukan dari awal tugas mana yang tidak boleh berhenti.', icon: '1' }, { title: 'Gagal dengan anggun', desc: 'Kelebihan beban memangkas fitur, bukan mematikan sistem.', icon: '2' }, { title: 'Error yang informatif', desc: 'Kode alarm memberi tim cukup info untuk memutuskan.', icon: '3' }, { title: 'Uji yang aneh-aneh', desc: 'Simulasi skenario salah pakai, bukan hanya jalur normal.', icon: '4' }] },
    { layout: 'bullets', subtitle: 'Warisan', title: 'Kodenya Bisa Kamu Baca', message: 'Kode sumber Apollo Guidance Computer kini tersedia publik di GitHub.', points: ['Penuh komentar dan nama rutin yang jenaka.', 'Bukti bahwa software kritis tetap ditulis manusia, dengan kebiasaan manusia.', 'Foto Hamilton di samping tumpukan listing kodenya menjadi ikon.'] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'Software terbaik bukan yang tidak pernah error, tapi yang tahu harus apa saat error.', points: ['Rancang untuk kondisi yang tidak direncanakan.', 'Pesan error adalah antarmuka untuk manusia yang sedang panik.', 'Reliability adalah keputusan desain, bukan keberuntungan.'] }
  ],

  'sejarah-java': [
    { layout: 'cover', subtitle: 'Sun Microsystems, 1990-an', title: 'Java: Dari Set-Top Box ke Android', message: 'Dirancang untuk perangkat elektronik rumah, gagal di sana, lalu menguasai server dan ponsel.', points: ['Write once, run anywhere.', 'Dan cerita Android yang memakai bahasanya tanpa JVM-nya.'] },
    { layout: 'bullets', subtitle: 'Awal', title: 'Proyek Green dan Bahasa Oak', message: 'Tim James Gosling di Sun menyiapkan software untuk perangkat konsumen.', points: ['Bahasanya mula-mula bernama Oak.', 'Nama itu sudah dipakai pihak lain, jadi diganti menjadi Java.', 'Pasar perangkat pintar belum siap. Tapi web sedang meledak.'] },
    { layout: 'code', subtitle: 'Write once, run anywhere', title: 'Bytecode, Bukan Kode Mesin', message: 'javac menghasilkan bytecode. JVM di tiap sistem operasi yang menjalankannya.', code: `// Hello.java
public class Hello {
  public static void main(String[] args) {
    System.out.println("Halo dari JVM");
  }
}

// javac Hello.java  -> Hello.class
// java Hello        -> jalan di OS apa pun`, points: ['Satu file .class untuk Windows, Linux, dan macOS.', 'Programmer bercanda: "write once, debug everywhere".'] },
    { layout: 'bullets', subtitle: '1995 – 2000-an', title: 'Tiga Panggung Java', message: 'Java diumumkan resmi tahun 1995, lalu menyebar ke tiga arah.', points: ['Applet di browser: populer sebentar, lalu ditinggalkan.', 'Server dan enterprise: di sinilah Java paling kuat.', 'Java ME di ponsel fitur: game dan aplikasi kecil sebelum era smartphone.'] },
    { layout: 'split', subtitle: 'Android', leftTitle: 'Yang Dipakai', leftPoints: ['Bahasa Java dan sintaksnya.', 'Banyak API inti, seperti java.util.', 'Tooling dan jutaan programmer Java.'], title: 'Yang tidak dipakai', rightTitle: 'JVM-nya', rightPoints: ['Bytecode diubah menjadi format .dex.', 'Dijalankan Dalvik, lalu ART.', 'Pustaka inti diimplementasi ulang.'] },
    { layout: 'bullets', subtitle: 'Sengketa', title: 'Oracle Melawan Google', message: 'Oracle membeli Sun tahun 2010, lalu menggugat Google di tahun yang sama.', points: ['Pokok perkaranya: Google meniru struktur API Java untuk Android.', 'Kasusnya bolak-balik pengadilan lebih dari satu dekade.', '2021: Mahkamah Agung AS memutuskan penggunaan Google termasuk fair use.'] },
    { layout: 'cards', subtitle: 'Sesudahnya', title: 'Android Hari Ini', message: 'Java tetap ada, tapi tidak lagi sendirian.', cards: [{ title: 'Kotlin 2017', desc: 'Google mengumumkan dukungan resmi Kotlin di Android.', icon: '1' }, { title: 'Kotlin-first 2019', desc: 'Dokumentasi dan API baru mengutamakan Kotlin.', icon: '2' }, { title: 'Tetap JVM bytecode', desc: 'Kotlin dikompilasi ke bytecode, lalu ke .dex seperti Java.', icon: '3' }, { title: 'Interop', desc: 'Kode Java lama dan Kotlin baru hidup di proyek yang sama.', icon: '4' }] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'Produk bisa gagal di pasar tujuannya, lalu menang di pasar lain.', points: ['Lapisan virtual machine membeli portabilitas dengan sedikit performa.', 'Bahasa, runtime, dan API adalah tiga hal yang berbeda.', 'Ekosistem dan programmer yang sudah ada sering lebih berharga dari teknologinya.'] }
  ],

  'sejarah-browser-wars': [
    { layout: 'cover', subtitle: 'Perang browser', title: 'Netscape, IE, Firefox, Chrome', message: 'Dua perang browser, satu pelajaran: web yang dikuasai satu pihak berhenti berkembang.', points: ['Perang pertama: Netscape melawan Internet Explorer.', 'Perang kedua: Firefox dan Chrome melawan stagnasi.'] },
    { layout: 'bullets', subtitle: '1993 – 1995', title: 'Mosaic, lalu Netscape', message: 'Browser grafis membuat web bisa dipakai orang biasa.', points: ['Mosaic dibuat di NCSA, salah satunya oleh Marc Andreessen.', 'Andreessen lalu ikut mendirikan Netscape. Navigator cepat menguasai pasar.', 'Microsoft merilis Internet Explorer tahun 1995.'] },
    { layout: 'bullets', subtitle: 'Perang pertama', title: 'Fitur Eksklusif di Mana-Mana', message: 'Setiap browser menambah fitur sendiri untuk menarik developer.', points: ['Netscape punya tag blink, IE punya tag marquee.', 'JavaScript di Netscape, JScript di IE, dengan perbedaan perilaku.', 'Situs memasang lencana "best viewed with" browser tertentu.', 'IE disertakan bersama Windows, dan pangsa Netscape runtuh.'] },
    { layout: 'split', subtitle: 'Sesudah menang', leftTitle: 'IE6 · 2001', leftPoints: ['Browser dominan tanpa pesaing serius.', 'Pembaruan besar berikutnya baru datang 2006.', 'Bug CSS-nya dihafal satu generasi developer.'], title: 'Akibatnya', rightTitle: 'Web yang Mandek', rightPoints: ['Developer menulis untuk bug, bukan untuk standar.', 'Banyak intranet terkunci ke IE selama bertahun-tahun.', 'Inovasi pindah ke plugin seperti Flash.'] },
    { layout: 'bullets', subtitle: 'Perang kedua', title: 'Firefox dan Chrome', message: 'Kode Netscape dibuka tahun 1998 dan menjadi proyek Mozilla.', points: ['2004: Firefox 1.0 dirilis, dengan tab dan pemblokir pop-up.', '2004: Apple, Mozilla, dan Opera membentuk WHATWG, yang kemudian melahirkan HTML5.', '2008: Google merilis Chrome dengan engine V8.', 'Persaingan kembali, dan browser mulai berlomba mematuhi standar.'] },
    { layout: 'code', subtitle: 'Bekasnya di kode', title: 'Tebak Browser vs Cek Fitur', message: 'Era perang browser melahirkan user-agent sniffing. Standar membuat feature detection jadi mungkin.', code: `// Dulu: menebak dari nama browser
if (navigator.userAgent.includes('MSIE')) {
  pakaiCaraLama()
}

// Sekarang: cek fiturnya langsung
if ('IntersectionObserver' in window) {
  lazyLoadGambar()
}`, points: ['Nama browser bisa bohong, fitur tidak.', 'Cek fitur tetap jalan saat browser baru muncul.'] },
    { layout: 'cards', subtitle: 'Kenapa standar penting', title: 'Yang Dijaga Standar Web', message: 'Standar adalah perjanjian antara pembuat browser dan kamu.', cards: [{ title: 'Portabilitas', desc: 'Satu kode jalan di Chrome, Firefox, dan Safari.', icon: '1' }, { title: 'Umur panjang', desc: 'Halaman lama tetap terbuka di browser baru.', icon: '2' }, { title: 'Persaingan sehat', desc: 'Browser bersaing di kecepatan, bukan di mengunci developer.', icon: '3' }, { title: 'Aksesibilitas', desc: 'HTML yang benar bisa dibaca screen reader.', icon: '4' }] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'Pertanyaan perang browser belum selesai, hanya berganti pemain.', points: ['Saat satu engine terlalu dominan, risiko stagnasi kembali.', 'Uji aplikasimu di lebih dari satu browser.', 'Tulis untuk standar, bukan untuk bug satu browser.'] }
  ]
};

/* ───────────────────────── carousels ───────────────────────── */

export const postSlides: Record<string, PostSlide[]> = {
  'hopper-compiler-pertama': [
    card('sejarah', 'Program dengan Kata-Kata? Dulu Itu Lelucon', 'Awal 1950-an, program adalah deretan angka. Ide menulisnya dengan kata-kata dianggap mustahil. Geser untuk melihat siapa yang membuktikan sebaliknya.'),
    card('UNIVAC I', 'Grace Hopper', 'Matematikawan dan perwira Angkatan Laut AS yang bekerja di tim UNIVAC. Ia lelah melihat programmer menyalin rutin yang sama berulang kali.'),
    card('Sistem A-0', 'Program yang Menyusun Program', 'Hopper membuat A-0: programmer menulis kode pendek, mesin mencari subrutinnya dan merakitnya sendiri.', { bullets: ['Sering disebut salah satu compiler pertama.', 'Hari ini cara kerjanya lebih mirip linker.'] }),
    card('penolakan', '"Komputer Cuma Bisa Berhitung"', 'Hopper kemudian mengenang: compiler-nya sudah berjalan, tapi tidak ada yang mau menyentuhnya. Orang yakin komputer hanya untuk aritmetika.'),
    card('COBOL · 1959', 'Kode yang Dibaca Manajer', 'Lewat FLOW-MATIC, idenya ikut membentuk COBOL.', { code: `ADD HARGA TO PAJAK GIVING TOTAL.\nDISPLAY "TOTAL: " TOTAL.` }),
    card('pelajaran', 'Abstraksi Selalu Ditertawakan Dulu', 'Compiler, garbage collector, framework, AI. Semuanya pernah disebut "bukan pemrograman sungguhan". Hopper tidak berdebat. Ia membuat alat yang berjalan.')
  ],

  'unix-filosofi': [
    card('sejarah', 'Satu Karakter yang Mengubah Cara Berpikir', 'Karakter | yang kamu ketik di terminal lahir di Bell Labs tahun 1973. Di baliknya ada cara berpikir tentang desain software.'),
    card('1969', 'Unix Lahir di Komputer Bekas', 'Ken Thompson dan Dennis Ritchie membuat Unix di sebuah PDP-7, setelah Bell Labs mundur dari proyek Multics.'),
    card('1973', 'Pipe dari Doug McIlroy', 'McIlroy ingin program disambung seperti selang air. Thompson menambahkan pipe: output satu program menjadi input program lain.'),
    card('filosofi', 'Tiga Aturan McIlroy', 'Ringkasan yang masih dikutip sampai hari ini.', { bullets: ['Buat program yang melakukan satu hal dengan baik.', 'Buat program yang bisa bekerja sama.', 'Pakai aliran teks, karena itu antarmuka universal.'] }),
    card('praktik', 'Hitung File Tanpa Menulis Program', 'Dua program kecil, satu jawaban.', { code: `ls | wc -l` }),
    card('hari ini', 'Idenya Ada di Kodemu', 'Rantai map dan filter, layanan kecil yang saling memanggil, CLI yang bisa disambung. Semuanya cucu dari satu karakter di tahun 1973.')
  ],

  'arpanet-lo': [
    card('sejarah', 'Pesan Pertama Internet Cuma Dua Huruf', 'Bukan "hello world". Bukan juga kalimat bersejarah. Hanya dua huruf, karena sistemnya crash di huruf ketiga.'),
    card('29 Oktober 1969', 'UCLA Mencoba Login ke SRI', 'Tim di UCLA ingin mengetik LOGIN ke komputer di Stanford Research Institute lewat ARPANET.'),
    card('crash', 'L, O, lalu Mati', 'Huruf L sampai. Huruf O sampai. Di huruf G, sistem di sisi penerima crash.', { bullets: ['Pesan pertama: "LO".', 'Login berhasil dicoba lagi setelah diperbaiki.'] }),
    card('1970-an', 'Satu Jaringan Tidak Cukup', 'ARPANET hanya bisa bicara dengan dirinya sendiri. Vint Cerf dan Bob Kahn merancang TCP agar jaringan berbeda bisa tersambung.'),
    card('1 Januari 1983', 'Flag Day', 'ARPANET resmi pindah dari NCP ke TCP/IP. Sejak hari itu, jaringan apa pun bisa bergabung asal bicara protokol yang sama.'),
    card('pelajaran', 'Sistem Besar Dimulai dari Crash', 'Internet tidak lahir sempurna. Ia lahir dari percobaan yang gagal di huruf ketiga, lalu diperbaiki terus selama puluhan tahun.')
  ],

  'web-proposal-samar': [
    card('sejarah', 'Proposal Web Disebut "Samar tapi Menarik"', 'Web tidak lahir di Silicon Valley. Ia lahir dari laboratorium fisika di perbatasan Swiss dan Prancis, lewat proposal yang hampir diabaikan.'),
    card('CERN · Maret 1989', 'Masalah Dokumentasi', 'Tim Berners-Lee melihat informasi di CERN terus hilang. Peneliti pindah, dokumennya tercecer di komputer yang berbeda-beda.'),
    card('sampulnya', '"Vague but Exciting"', 'Atasannya, Mike Sendall, menulis tiga kata itu di sampul proposal. Bukan penolakan, tapi juga belum persetujuan.'),
    card('1990', 'Tiga Penemuan', 'Berners-Lee menulis semuanya di komputer NeXT.', { bullets: ['URL: alamat untuk setiap dokumen.', 'HTTP: cara mengambilnya.', 'HTML: cara menulisnya, lengkap dengan link.'] }),
    card('1993', 'Diberikan Gratis', 'CERN melepas software web ke domain publik. Siapa pun boleh membuat browser dan server tanpa bayar lisensi.'),
    card('pelajaran', 'Proposal Tidak Perlu Sempurna', 'Yang penting masalahnya nyata dan orangnya terus membangun. Proposal "samar" itu sekarang dipakai miliaran orang setiap hari.')
  ],

  'javascript-sepuluh-hari': [
    card('sejarah', 'Bahasa Web Dibuat dalam Sekitar 10 Hari', 'Mei 1995, Brendan Eich di Netscape menulis prototipe bahasa scripting untuk browser. Waktunya sangat singkat, dan jejaknya masih ada.'),
    card('nama', 'Mocha, LiveScript, JavaScript', 'Namanya berganti dua kali. Kata "Java" dipakai karena kerja sama dengan Sun saat Java sedang populer. Bahasanya sendiri sangat berbeda.'),
    card('jejak', 'Keanehan yang Masih Ada', 'Coba di console browser-mu.', { code: `typeof null   // "object"\n"5" - 2       // 3\n"5" + 2       // "52"` }),
    card('1997', 'Jadi Standar ECMAScript', 'Microsoft punya JScript sendiri. Supaya tidak pecah, bahasanya distandarkan di Ecma sebagai ECMA-262.'),
    card('2008 – 2009', 'Dari Browser ke Mana-Mana', 'Engine V8 di Chrome membuat JavaScript cepat. Setahun kemudian Node.js membawanya ke server.', { bullets: ['Lalu React Native, Electron, dan banyak lagi.', 'TypeScript menambahkan tipe di atasnya.'] }),
    card('pelajaran', 'Distribusi Mengalahkan Desain', 'JavaScript bukan bahasa yang paling rapi. Ia menang karena sudah terpasang di setiap browser, dan kode lamanya tidak pernah dirusak.')
  ],

  'codd-tabel': [
    card('sejarah', 'Ide Terbaik IBM Tidak Langsung Dijual IBM', 'Model relasional ditulis peneliti IBM tahun 1970. Produk SQL komersial pertama justru datang dari perusahaan kecil di California.'),
    card('1970', 'Edgar F. Codd', 'Di IBM San Jose, Codd menerbitkan "A Relational Model of Data for Large Shared Data Banks". Isinya: simpan data sebagai tabel.'),
    card('masalahnya', 'Database yang Harus Dinavigasi', 'Sebelumnya, program menelusuri pointer dari record ke record. Struktur penyimpanan berubah, programnya ikut ditulis ulang.'),
    card('idenya', 'Sebut Hasilnya, Bukan Caranya', 'Kamu menulis data apa yang kamu mau. Database yang memikirkan jalannya.', { code: `SELECT nama FROM pelanggan\nWHERE kota = 'Bandung';` }),
    card('System R', 'SEQUEL Menjadi SQL', 'Tim IBM, termasuk Donald Chamberlin dan Raymond Boyce, merancang SEQUEL. Namanya diganti SQL karena masalah merek dagang.', { bullets: ['Perusahaan yang kelak bernama Oracle merilis produk SQL lebih dulu.', 'IBM menyusul dengan produknya sendiri.'] }),
    card('pelajaran', 'Abstraksi yang Bertahan 50 Tahun', 'Bahasa datang dan pergi. Query SQL yang kamu tulis hari ini masih memakai ide dari satu paper tahun 1970.')
  ],

  'vcs-sebelum-git': [
    card('sejarah', 'Git Baru Lahir 2005. Sebelumnya?', 'Programmer sudah melacak perubahan kode lebih dari tiga puluh tahun sebelum Git. Empat generasi, empat cara.'),
    card('1972', 'SCCS', 'Dibuat Marc Rochkind di Bell Labs. Riwayat disimpan per file, di satu mesin.', { bullets: ['Belum ada commit untuk banyak file sekaligus.', 'Kerja tim berarti bergantian.'] }),
    card('1982', 'RCS', 'Dibuat Walter Tichy. Lebih efisien, tapi tetap per file dan memakai kunci: satu file, satu orang yang boleh mengedit.'),
    card('1986 dan 2000', 'CVS lalu Subversion', 'CVS membuat tim bekerja bersamaan lewat server pusat. Subversion datang untuk memperbaiki kekurangan CVS.', { bullets: ['Server mati, semua orang berhenti commit.', 'Subversion membawa commit atomik.'] }),
    card('2005', 'Git', 'Linux kehilangan akses gratis ke BitKeeper. Linus Torvalds menulis Git: setiap laptop menyimpan riwayat lengkap, branch jadi murah.'),
    card('pelajaran', 'Setiap Alat Menjawab Sakit Kepala', 'Kunci file, lalu server pusat, lalu terdistribusi. Kalau Git terasa rumit, ingat bahwa setiap fiturnya lahir dari masalah nyata.')
  ],

  'apollo-alarm-1202': [
    card('sejarah', 'Alarm Berbunyi Menjelang Mendarat di Bulan', '20 Juli 1969. Beberapa menit sebelum menyentuh permukaan Bulan, komputer Apollo 11 menyalakan alarm yang tidak dihafal kru.'),
    card('1202', 'Komputer Kelebihan Beban', 'Kode 1202 dan 1201 berarti komputer pemandu punya lebih banyak tugas daripada kapasitasnya.'),
    card('Houston', 'Keputusan dalam Hitungan Detik', 'Steve Bales, dibantu Jack Garman, tahu alarm itu aman selama tidak terus-menerus. Jawabannya ke kru: "Go".'),
    card('desainnya', 'Software yang Tahu Prioritas', 'Saat beban penuh, komputer restart dan membuang tugas yang tidak penting.', { bullets: ['Tugas pendaratan tetap berjalan.', 'Kru tetap tahu apa yang sedang terjadi.'] }),
    card('timnya', 'Margaret Hamilton', 'Hamilton memimpin tim yang menulis software penerbangan di MIT Instrumentation Lab. Ia memperjuangkan software sebagai disiplin rekayasa.'),
    card('pelajaran', 'Error Itu Bukan Kegagalan', 'Kegagalan adalah sistem yang mati saat error. Apollo 11 mendarat karena software-nya dirancang untuk kondisi yang tidak direncanakan.')
  ],

  'java-di-android': [
    card('sejarah', 'Android Memakai Java, Tapi Bukan JVM', 'Selama bertahun-tahun aplikasi Android ditulis dalam Java. Tapi kodenya tidak pernah dijalankan oleh Java Virtual Machine.'),
    card('1995', 'Write Once, Run Anywhere', 'Sun merilis Java dengan janji: kompilasi sekali menjadi bytecode, lalu jalan di mana pun ada JVM.'),
    card('cara kerja', 'Dua Langkah', 'Kode jadi bytecode, JVM menjalankannya.', { code: `javac Hello.java\njava Hello` }),
    card('Android', 'Bahasanya Ya, Mesinnya Tidak', 'Android mengubah bytecode menjadi format .dex dan menjalankannya di Dalvik, lalu ART. Pustaka intinya ditulis ulang.'),
    card('2010 – 2021', 'Sampai ke Mahkamah Agung', 'Oracle membeli Sun lalu menggugat Google soal API Java. Tahun 2021, Mahkamah Agung AS memutuskan Google menang dengan alasan fair use.', { bullets: ['Pertanyaannya: siapa pemilik sebuah API?'] }),
    card('hari ini', 'Kotlin Mengambil Alih', 'Sejak 2019 Google menyebut Android "Kotlin-first". Tapi Kotlin tetap dikompilasi ke bytecode yang sama. Warisan Java masih di sana.')
  ],

  'perang-browser': [
    card('sejarah', 'Dulu Situs Ditulis untuk Satu Browser', '"Best viewed with Netscape." "Best viewed with Internet Explorer." Lencana seperti itu pernah biasa. Begini ceritanya.'),
    card('1994 – 1995', 'Netscape Lawan IE', 'Netscape Navigator menguasai web awal. Microsoft merilis Internet Explorer dan menyertakannya bersama Windows.'),
    card('senjatanya', 'Fitur Eksklusif', 'Setiap browser menambah fitur sendiri supaya developer memilih pihak.', { bullets: ['Netscape: tag blink.', 'IE: tag marquee.', 'Perilaku JavaScript yang tidak sama.'] }),
    card('2001', 'IE6 Menang, Lalu Diam', 'Setelah Netscape runtuh, pembaruan besar IE berikutnya baru datang 2006. Developer menghabiskan waktu untuk mengakali bug-nya.'),
    card('2004 – 2008', 'Firefox dan Chrome', 'Firefox lahir dari kode Netscape yang dibuka. Chrome datang dengan V8. Persaingan kembali, dan standar kembali dihormati.'),
    card('pelajaran', 'Standar Itu Melindungimu', 'Karena ada standar, kodemu jalan di Chrome, Firefox, dan Safari. Tulis untuk standar, bukan untuk satu browser favorit.')
  ]
};

/* ───────────────────────── notes ───────────────────────── */

export const noteBodies: Record<string, Full> = {
  'hopper-bahasa-inggris': {
    lead: 'Keberatan terhadap compiler di tahun 1950-an bukan kebodohan. Justru karena masuk akal, ia layak dipelajari.',
    sections: [
      { id: 'dunia-angka', title: 'Dunia tempat program adalah angka', body: p(
        'Bayangkan pekerjaanmu adalah menerjemahkan rumus menjadi deretan kode mesin, lalu memeriksanya baris demi baris dengan tangan. Komputer seperti UNIVAC I sangat mahal dan langka. Setiap menit waktu mesin berharga.',
        'Dalam dunia seperti itu, menyerahkan penerjemahan ke program lain terdengar boros. Programmer yang baik bisa menulis kode mesin yang lebih hemat daripada hasil terjemahan otomatis. Itu argumen teknis yang sah, bukan sekadar gengsi.'
      ) },
      { id: 'yang-dibangun-hopper', title: 'Yang dibangun Hopper', body: p(
        `Grace Hopper melihat masalah lain. Programmer terus menyalin rutin yang sama, dan setiap salinan adalah kesempatan untuk salah. Sistem ${b('A-0')} miliknya mengambil subrutin dari pustaka dan menyusunnya otomatis menjadi program.`,
        'Hopper kemudian mengenang bahwa ia sudah punya compiler yang berjalan, tapi orang enggan memakainya. Mereka yakin komputer hanya bisa mengerjakan aritmetika, bukan menulis program.'
      ) },
      { id: 'lebih-jauh-lagi', title: 'Lalu ia melangkah lebih jauh', body: p(
        'Langkah berikutnya lebih kontroversial: program bisnis yang ditulis dengan kata-kata bahasa Inggris. Argumen Hopper sederhana. Orang yang mengurus gaji dan inventaris tidak akan pernah mau belajar notasi matematika, apalagi kode mesin.',
        `Gagasan itu menjadi FLOW-MATIC, lalu ikut memengaruhi ${b('COBOL')} pada 1959. Baris seperti ${c('ADD HARGA TO PAJAK GIVING TOTAL.')} terasa kaku hari ini, tapi saat itu ia membuka pemrograman untuk orang yang bukan matematikawan.`
      ) },
      { id: 'argumen-yang-sama', title: 'Argumen yang sama, alat yang baru', body: p(
        'Perhatikan polanya. Compiler dituduh menghasilkan kode lambat. Garbage collector dituduh membuat programmer malas. Framework dituduh bukan pemrograman sungguhan. Hari ini AI coding agent menerima tuduhan yang hampir sama persis.',
        'Sebagian keberatan itu benar pada masanya. Compiler awal memang menghasilkan kode yang kurang efisien. Tapi biaya mesin turun, sementara biaya waktu manusia tidak.'
      ) + ul(
        'Pertanyaan yang salah: apakah alat ini curang?',
        'Pertanyaan yang benar: apakah hasilnya benar, dan siapa yang memeriksanya?'
      ) + p('Hopper tidak memenangkan perdebatan dengan presentasi. Ia menang karena alatnya berjalan, dan karena ia terus mendorong orang untuk mencobanya.') }
    ]
  },

  'unix-dan-pipa': {
    lead: 'Satu soal, dua legenda, dua jawaban yang sangat berbeda. Keduanya benar, untuk alasan yang berbeda.',
    sections: [
      { id: 'soalnya', title: 'Soalnya sederhana', body: p(
        'Pada 1986, Jon Bentley menulis kolom "Programming Pearls" di Communications of the ACM. Ia meminta Donald Knuth menulis program untuk satu tugas: baca sebuah teks, lalu tampilkan sejumlah kata yang paling sering muncul beserta jumlahnya.',
        `Knuth adalah penulis ${b('The Art of Computer Programming')}. Ia menjawab dengan literate programming, gaya yang ia rancang sendiri: program dan penjelasannya ditulis bersama seperti esai.`
      ) },
      { id: 'jawaban-knuth', title: 'Jawaban Knuth', body: p(
        'Program Knuth panjang, teliti, dan indah. Ia merancang struktur data khusus untuk menyimpan kata, menjelaskan setiap keputusan, dan membuat semuanya efisien. Sebagai karya tulis, itu mengagumkan.',
        'Lalu Bentley meminta Doug McIlroy, orang di balik pipe Unix, untuk mengulasnya.'
      ) },
      { id: 'jawaban-mcilroy', title: 'Jawaban McIlroy', body: p(
        'McIlroy memuji kualitas tulisan Knuth. Lalu ia menunjukkan bahwa tugas yang sama bisa diselesaikan dengan menyambung program Unix yang sudah ada:'
      ) + pre(`tr -cs A-Za-z '\\n' |
tr A-Z a-z |
sort |
uniq -c |
sort -rn |
sed 10q`) + p(
        `Pecah teks menjadi satu kata per baris, jadikan huruf kecil, urutkan, hitung yang kembar, urutkan berdasarkan jumlah, ambil sepuluh teratas. Versi asli McIlroy menerima jumlah kata sebagai argumen. Tidak ada struktur data baru, tidak ada bug baru di ${c('sort')}, karena ${c('sort')} sudah dipakai dan diuji ribuan orang.`
      ) },
      { id: 'bukan-soal-menang', title: 'Bukan soal siapa yang menang', body: p(
        'Cerita ini sering dipakai untuk mengejek program panjang. Itu pembacaan yang malas. Knuth diminta mendemonstrasikan literate programming, bukan mencari jalan tercepat. Dan pipeline McIlroy bisa ditulis justru karena ada orang yang dulu menulis sort dan uniq dengan sangat hati-hati.',
        `Pelajarannya ada di tengah. Sebelum menulis komponen baru, ${b('cek apakah masalahnya bisa diselesaikan dengan menyambung yang sudah ada')}. Kalau tidak bisa, tulis komponen yang kecil dan bisa disambung, supaya orang berikutnya bisa melakukan apa yang McIlroy lakukan.`
      ) }
    ]
  },

  'internet-bukan-untuk-perang-nuklir': {
    lead: 'Mitos ini setengah benar. Bagian yang salah justru menyimpan pelajaran desain yang paling berguna.',
    sections: [
      { id: 'mitosnya', title: 'Cerita yang sering kamu dengar', body: p(
        'Versi populernya begini: militer Amerika butuh jaringan komunikasi yang tetap hidup walau sebagian kota hancur oleh bom nuklir, maka lahirlah ARPANET, lalu internet.',
        'Cerita itu mudah diingat dan dramatis. Masalahnya, ia mencampur dua proyek yang berbeda.'
      ) },
      { id: 'yang-benar', title: 'Bagian yang benar', body: p(
        `Di RAND Corporation, ${b('Paul Baran')} memang meneliti jaringan komunikasi yang bisa bertahan dari serangan. Usulannya: jaringan terdistribusi, pesan dipotong menjadi blok kecil, dan setiap blok mencari jalannya sendiri.`,
        `Di Inggris, ${b('Donald Davies')} sampai pada ide serupa secara terpisah, dengan motivasi yang berbeda: memakai jalur komunikasi secara lebih efisien. Davies yang memberi nama ${c('packet')}.`
      ) },
      { id: 'tujuan-arpanet', title: 'Kenapa ARPANET sebenarnya dibangun', body: p(
        'ARPA mendanai riset komputer di banyak kampus, dan komputer saat itu sangat mahal. Setiap lembaga ingin punya mesinnya sendiri. Orang-orang yang memimpin proyek ini menjelaskan tujuannya sebagai berbagi sumber daya: peneliti di satu tempat bisa memakai komputer di tempat lain.',
        'ARPANET meminjam ide packet switching, tapi kebutuhannya adalah kolaborasi riset, bukan bertahan dari perang. Pesan pertamanya pun bukan perintah militer, melainkan percobaan login dari UCLA ke SRI yang crash setelah dua huruf.'
      ) },
      { id: 'pelajaran-desain', title: 'Pelajaran yang lebih berguna', body: p(
        'Yang membuat internet tangguh bukan tujuan militernya, tapi keputusan desainnya. Ketika Vint Cerf dan Bob Kahn merancang TCP, jaringan dibuat sesederhana mungkin: cukup antar paket, tanpa janji. Kecerdasan seperti pengiriman ulang dan urutan diletakkan di ujung, di komputer pengirim dan penerima.'
      ) + ul(
        'Jaringan baru bisa bergabung tanpa mengubah jaringan lama.',
        'Aplikasi baru bisa dibuat tanpa izin pemilik jaringan.',
        'Satu jalur rusak, paket mencari jalur lain.'
      ) + p('Prinsip yang sama berlaku untuk sistem yang kamu bangun. Komponen di tengah yang sederhana dan bodoh sering lebih tahan lama daripada komponen yang mencoba pintar untuk semua orang.') }
    ]
  },

  'web-yang-tidak-dipatenkan': {
    lead: 'Teknologi terbaik tidak selalu menang. Kadang yang menang adalah yang paling mudah dipakai siapa saja.',
    sections: [
      { id: 'dua-pesaing', title: 'Web bukan satu-satunya kandidat', body: p(
        `Di awal 1990-an, ada beberapa cara menjelajah informasi di internet. Salah satu yang populer adalah ${b('Gopher')}, dari University of Minnesota. Gopher menyusun informasi sebagai menu bertingkat. Sederhana, cepat, dan mudah dipahami.`,
        'Web milik Tim Berners-Lee punya pendekatan lain: dokumen bebas yang saling terhubung lewat link. Lebih fleksibel, tapi juga lebih berantakan.'
      ) },
      { id: 'soal-lisensi', title: 'Satu keputusan soal lisensi', body: p(
        'Pada 1993, University of Minnesota mengumumkan bahwa pemakaian server Gopher dalam kondisi tertentu akan dikenakan biaya lisensi. Jumlahnya tidak besar, tapi dampaknya pada kepercayaan sangat besar. Perusahaan dan kampus mulai bertanya: kalau hari ini bayar sedikit, besok bayar berapa?',
        `Di tahun yang sama, CERN mengambil arah sebaliknya. Pada ${b('30 April 1993')}, software web CERN dilepas ke domain publik. Siapa pun boleh membuat browser, server, dan apa pun di atasnya tanpa izin dan tanpa bayar.`
      ) },
      { id: 'yang-terjadi', title: 'Yang terjadi sesudahnya', body: p(
        'Mosaic dari NCSA muncul dan membuat web terasa mudah bagi orang biasa. Netscape menyusul. Server web bermunculan. Gopher tidak hilang dalam semalam, tapi momentumnya pindah ke web dan tidak pernah kembali.',
        'Berners-Lee kemudian mendirikan W3C untuk menjaga standar web tetap terbuka. Ia sendiri tidak pernah memungut royalti dari URL, HTTP, atau HTML.'
      ) },
      { id: 'untuk-kamu', title: 'Kenapa ini relevan untuk kamu', body: p(
        'Cerita ini bukan hanya soal kebaikan hati. Ini soal strategi adopsi. Developer memilih teknologi yang tidak membuat mereka khawatir tentang masa depan.'
      ) + ul(
        'Saat memilih library, perhatikan lisensinya, bukan hanya fiturnya.',
        'Saat membangun API untuk orang lain, ketidakpastian adalah biaya bagi mereka.',
        'Spesifikasi yang terbuka dan sederhana lebih mudah diimplementasi ulang, dan itu yang membuatnya bertahan.'
      ) + p('Proposal yang disebut samar itu menang bukan karena paling canggih, tapi karena tidak ada yang perlu minta izin untuk ikut membangunnya.') }
    ]
  },

  'javascript-tidak-boleh-rusak': {
    lead: 'Setiap programmer JavaScript tahu typeof null itu aneh. Alasan ia dibiarkan jauh lebih menarik dari bug-nya.',
    sections: [
      { id: 'bug-lama', title: 'Bug yang semua orang tahu', body: p(
        `Buka console browser, ketik ${c('typeof null')}. Jawabannya ${c('"object"')}. Null jelas bukan objek. Ini sisa dari implementasi awal JavaScript yang dibuat terburu-buru di Netscape tahun 1995.`,
        'Bug ini terkenal, terdokumentasi, dan mudah diperbaiki secara teknis. Perbaikan pernah diusulkan dalam proses standar ECMAScript, lalu ditolak.'
      ) },
      { id: 'kenapa-ditolak', title: 'Kenapa perbaikannya ditolak', body: p(
        'Karena di luar sana ada jutaan halaman yang sudah ditulis dengan asumsi perilaku lama. Kode seperti ini bisa saja ada di situs yang tidak pernah disentuh lagi sejak bertahun-tahun:'
      ) + pre(`if (typeof value === 'object') {
  // diam-diam mengandalkan null ikut masuk sini
}`) + p(
        `Kalau perilakunya diubah, situs-situs itu rusak, dan pemiliknya mungkin sudah tidak ada. Prinsip yang dipegang komunitas standar web sering diringkas menjadi ${b('"don\'t break the web"')}: jangan merusak halaman yang sudah ada.`
      ) },
      { id: 'smooshgate', title: 'Contoh yang lebih baru', body: p(
        `Pada 2018 ada usulan menambah method ${c('Array.prototype.flatten')}. Ternyata library lama bernama MooTools sudah menambahkan method dengan nama yang sama, dengan perilaku berbeda, dan situs lama yang memakainya akan rusak.`,
        `Komunitas sempat bercanda mengusulkan nama ${c('smoosh')}. Akhirnya nama yang dipakai adalah ${c('flat')}. Standar bahasa yang dipakai miliaran orang mengalah pada sebuah library lama, karena halaman yang sudah ada lebih penting daripada nama yang ideal.`
      ) },
      { id: 'harga-kompatibilitas', title: 'Harga sebuah janji', body: p(
        'Kompatibilitas mundur membuat JavaScript membawa beban sejarahnya selamanya. Tapi janji itu juga yang membuat bisnis berani membangun di atas web. Kode yang ditulis hari ini kemungkinan besar masih jalan sepuluh tahun lagi.',
        'Solusi komunitas bukan mengubah bahasa, tapi menambah lapisan di atasnya:'
      ) + ul(
        `${c('===')} untuk menghindari konversi tipe yang mengejutkan.`,
        'Mode strict untuk menutup sebagian jebakan lama.',
        'Linter dan TypeScript untuk menangkap kesalahan sebelum jalan.'
      ) + p('Saat kamu merancang API publik, ingat pelajaran ini. Keputusan yang kamu buat dalam sepuluh hari bisa harus kamu dukung selama puluhan tahun.') }
    ]
  },

  'sql-tidak-tergantikan': {
    lead: 'SQL sudah berkali-kali diramalkan mati. Yang tidak ikut mati adalah ide di baliknya.',
    sections: [
      { id: 'paper-1970', title: 'Satu paper, satu ide', body: p(
        `Pada 1970, ${b('Edgar F. Codd')} dari IBM menerbitkan "A Relational Model of Data for Large Shared Data Banks". Kalimat kuncinya bukan soal tabel, tapi soal perlindungan: pengguna database seharusnya tidak perlu tahu bagaimana data disusun di dalam mesin.`,
        'Saat itu, program database harus tahu persis jalur pointer dari satu record ke record lain. Ubah strukturnya, dan semua program yang bergantung padanya harus ditulis ulang.'
      ) },
      { id: 'deklaratif', title: 'Siapa yang memikirkan caranya', body: p(
        'Ide Codd memindahkan tanggung jawab. Kamu cukup menyatakan data apa yang kamu mau. Sistem database yang memilih urutan join, index yang dipakai, dan cara membaca disk.'
      ) + pre(`SELECT kota, COUNT(*) AS jumlah
FROM pelanggan
GROUP BY kota
HAVING COUNT(*) > 100;`) + p(
        'Query ini tidak berubah walau tabelnya membengkak dari seratus menjadi seratus juta baris, atau walau DBA menambah index baru. Yang berubah hanya rencana eksekusi di balik layar.'
      ) },
      { id: 'gelombang-pengganti', title: 'Gelombang calon pengganti', body: p(
        'Setiap beberapa tahun muncul klaim bahwa SQL sudah ketinggalan zaman. Database objek di era OOP. Lalu gelombang NoSQL ketika web butuh skala besar dan skema yang fleksibel.',
        'Sebagian kritiknya valid, dan banyak sistem NoSQL memang tepat untuk kasusnya. Tapi perhatikan apa yang terjadi kemudian: banyak di antaranya menambahkan bahasa query yang mirip SQL, dan database relasional menambahkan dukungan JSON. Kedua kubu bertemu di tengah.'
      ) },
      { id: 'kenapa-bertahan', title: 'Kenapa ia bertahan', body: ul(
        `${b('Deklaratif.')} Query yang sama ikut cepat saat optimizer membaik.`,
        `${b('Berbasis matematika.')} Aljabar relasional membuat hasil query bisa diprediksi.`,
        `${b('Dipahami banyak orang.')} Analis, backend engineer, dan data scientist berbagi satu bahasa.`
      ) + p(
        'Codd menerima Turing Award pada 1981. Lebih dari lima puluh tahun setelah paper-nya, kamu masih menulis SELECT setiap minggu. Kalau harus memilih satu skill backend yang paling jarang basi, SQL adalah kandidat kuat.'
      ) }
    ]
  },

  'git-lahir-dari-lisensi': {
    lead: 'Alat yang dipakai hampir semua tim software hari ini lahir dari sengketa lisensi dan tenggat beberapa minggu.',
    sections: [
      { id: 'bitkeeper', title: 'Kernel Linux dan BitKeeper', body: p(
        `Selama bertahun-tahun, Linus Torvalds mengelola kernel Linux dengan cara yang sangat manual: patch dikirim lewat email, lalu digabung dengan tangan. Pada 2002 ia mulai memakai ${b('BitKeeper')}, version control terdistribusi buatan perusahaan BitMover.`,
        'BitKeeper bukan open source. Komunitas Linux boleh memakainya gratis dengan syarat tertentu. Banyak developer tidak nyaman, tapi alatnya bekerja jauh lebih baik daripada alternatif yang ada.'
      ) },
      { id: 'dicabut', title: 'Izin yang dicabut', body: p(
        'Pada 2005, seorang developer di komunitas membuat alat yang berinteraksi dengan protokol BitKeeper lewat reverse engineering. BitMover menganggap itu pelanggaran kesepakatan dan menghentikan versi gratisnya untuk komunitas.',
        'Linux tiba-tiba kehilangan version control. Torvalds melihat alat yang ada, termasuk CVS dan Subversion, dan menilai semuanya tidak cocok untuk proyek sebesar kernel. Jadi ia menulis sendiri.'
      ) },
      { id: 'desain-git', title: 'Apa yang ia prioritaskan', body: p(
        'Git dibangun dalam hitungan minggu, dan cepat dipakai untuk mengelola kodenya sendiri. Prioritasnya jelas dari desainnya:'
      ) + ul(
        `${b('Kecepatan.')} Menggabungkan ribuan patch harus terasa instan.`,
        `${b('Integritas.')} Setiap objek diberi nama dari hash isinya, sehingga perubahan diam-diam ketahuan.`,
        `${b('Terdistribusi.')} Setiap clone adalah salinan lengkap, tidak ada server yang wajib hidup.`
      ) + p(`Beberapa bulan kemudian, pemeliharaan Git diserahkan ke ${b('Junio Hamano')}, yang memegangnya sampai bertahun-tahun sesudahnya. Di periode yang sama lahir Mercurial, jawaban lain untuk masalah yang sama.`) },
      { id: 'pelajaran', title: 'Pelajaran untuk timmu', body: p(
        'Cerita ini sering diceritakan sebagai kisah jenius yang menulis alat dalam dua minggu. Bagian yang lebih berguna adalah ini: ketergantungan pada alat yang dikendalikan pihak lain adalah risiko, bahkan ketika alatnya bagus dan gratis.',
        `Git juga terasa rumit karena dirancang untuk alur kerja kernel Linux, bukan untuk pemula. Perintah seperti ${c('rebase')} dan ${c('cherry-pick')} masuk akal begitu kamu membayangkan ribuan patch dari ribuan orang. Kalau kamu memahami asalnya, kamu tidak lagi menghafal perintah, kamu memahami alasannya.`
      ) }
    ]
  },

  'hamilton-software-engineering': {
    lead: 'Hari ini "software engineer" adalah jabatan biasa. Di awal program Apollo, gagasannya belum diterima begitu saja.',
    sections: [
      { id: 'urusan-belakangan', title: 'Software sebagai urusan belakangan', body: p(
        'Program Apollo penuh insinyur dengan disiplin yang matang: struktur, propulsi, navigasi. Software adalah hal baru. Kode untuk komputer pemandu ditulis di MIT Instrumentation Laboratory, dan bagi banyak orang ia dianggap pelengkap hardware.',
        `${b('Margaret Hamilton')} memimpin divisi yang menulis software penerbangan itu. Menurut penuturannya sendiri, ia mulai memakai istilah "software engineering" supaya pekerjaan timnya dianggap setara dengan disiplin rekayasa lain. Istilah itu juga dipopulerkan konferensi NATO tahun 1968.`
      ) },
      { id: 'merancang-untuk-error', title: 'Merancang untuk kesalahan', body: p(
        'Komputer pemandu Apollo punya memori yang sangat kecil dan tidak bisa sekadar di-reboot lalu dicoba lagi saat pesawat sedang turun ke Bulan. Karena itu software-nya dirancang dengan asumsi bahwa sesuatu akan salah.',
        'Tugas-tugas punya prioritas. Saat beban melebihi kapasitas, sistem bisa restart dengan cepat, membuang pekerjaan yang kurang penting, dan melanjutkan yang paling penting. Alarm memberi tahu manusia apa yang sedang terjadi.'
      ) },
      { id: 'juli-1969', title: '20 Juli 1969', body: p(
        'Saat modul pendarat turun, alarm 1202 dan 1201 menyala berulang kali. Penyebab yang biasa dijelaskan: sinyal dari radar rendezvous terus meminta waktu komputer, beban yang tidak ada dalam rencana pendaratan.',
        'Di Houston, Steve Bales dan Jack Garman tahu alarm ini aman selama tidak terus-menerus. Mereka memberi "go". Komputer terus membuang tugas yang tidak penting dan mempertahankan tugas pendaratan. Armstrong dan Aldrin mendarat.'
      ) },
      { id: 'untuk-kamu', title: 'Yang bisa kamu bawa ke proyekmu', body: p(
        'Aplikasimu tidak mendarat di Bulan, tapi pertanyaannya sama: apa yang terjadi saat sistem menerima lebih banyak pekerjaan daripada yang direncanakan?'
      ) + ul(
        'Tentukan fitur mana yang harus tetap hidup saat server kelebihan beban.',
        'Lebih baik turun kualitas daripada mati total: matikan rekomendasi, pertahankan checkout.',
        'Tulis pesan error untuk manusia yang harus memutuskan dalam hitungan detik.'
      ) + p('Hamilton menerima Presidential Medal of Freedom pada 2016. Warisan terbesarnya bukan medali itu, tapi gagasan bahwa reliability adalah keputusan desain yang dibuat jauh sebelum keadaan darurat datang.') }
    ]
  },

  'java-oracle-google': {
    lead: 'Kasus ini berjalan lebih dari satu dekade dan menyentuh pertanyaan yang jarang dipikirkan programmer: bolehkah API dimiliki?',
    sections: [
      { id: 'latar', title: 'Bagaimana semuanya dimulai', body: p(
        'Ketika Google membangun Android, mereka ingin jutaan programmer Java bisa langsung menulis aplikasi. Jadi Android memakai bahasa Java dan menyediakan banyak API yang sama, misalnya paket-paket inti seperti java.util.',
        `Tapi Google tidak memakai JVM dari Sun. Pustaka intinya ditulis ulang, dan bytecode diubah ke format ${c('.dex')} untuk dijalankan Dalvik. Yang ditiru adalah ${b('struktur API')}: nama paket, kelas, method, dan parameternya.`
      ) },
      { id: 'gugatan', title: 'Gugatan Oracle', body: p(
        'Oracle membeli Sun Microsystems pada 2010 dan pada tahun yang sama menggugat Google. Klaim utamanya: deklarasi API Java dilindungi hak cipta, dan Google menyalinnya tanpa lisensi.',
        'Kasusnya bolak-balik antara pengadilan tingkat pertama dan banding selama bertahun-tahun, dengan putusan yang saling bertentangan. Baru pada 2021 Mahkamah Agung Amerika Serikat memutuskan bahwa penggunaan Google atas API itu termasuk fair use.'
      ) },
      { id: 'kenapa-penting', title: 'Kenapa programmer perlu peduli', body: p(
        'Bayangkan kalau hasilnya sebaliknya. Banyak hal yang kamu anggap biasa bergantung pada kebebasan mengimplementasi ulang sebuah API:'
      ) + ul(
        'Linux mengimplementasikan antarmuka yang meniru Unix.',
        'Banyak layanan storage menerima API yang kompatibel dengan Amazon S3.',
        'Emulator dan library kompatibilitas meniru API platform lain.'
      ) + p('Banyak programmer dan akademisi mendukung posisi bahwa reimplementasi API harus tetap dimungkinkan, karena di situlah interoperabilitas lahir.') },
      { id: 'sesudahnya', title: 'Sesudahnya', body: p(
        `Saat kasus masih berjalan, Google mengumumkan dukungan resmi untuk ${b('Kotlin')} di Android pada 2017 dan menyebut Android "Kotlin-first" pada 2019. Kotlin tetap dikompilasi ke bytecode JVM, jadi warisan Java tidak hilang. Yang berubah adalah bahasa yang diutamakan.`,
        'Pelajarannya untuk kamu sebagai developer: bahasa, runtime, dan API adalah tiga hal berbeda, dan masing-masing bisa punya pemilik dan aturan yang berbeda. Saat memilih platform, perhatikan ketiganya.'
      ) }
    ]
  },

  'standar-web-ie6': {
    lead: 'Perang browser pertama punya pemenang yang jelas. Developer web membayar harganya selama bertahun-tahun.',
    sections: [
      { id: 'kemenangan', title: 'Kemenangan Internet Explorer', body: p(
        'Netscape Navigator menguasai web di pertengahan 1990-an. Microsoft masuk dengan Internet Explorer, lalu menyertakannya bersama Windows. Bagi kebanyakan pengguna, browser yang sudah terpasang adalah browser yang dipakai.',
        'Cara Microsoft memanfaatkan dominasi Windows menjadi bagian dari gugatan antimonopoli pemerintah Amerika Serikat yang diajukan tahun 1998. Tapi di pasar browser, kerusakannya sudah terjadi: pangsa Netscape runtuh.'
      ) },
      { id: 'ie6', title: 'IE6 dan tahun-tahun yang diam', body: p(
        `IE6 dirilis tahun 2001. Pembaruan besar berikutnya, IE7, baru datang tahun 2006. Selama itu, satu browser yang dominan hampir tidak berubah, lengkap dengan bug-bug CSS-nya.`,
        'Developer web menghabiskan waktu untuk menghafal trik, bukan mempelajari standar. Ada hack khusus untuk model box yang berbeda, untuk transparansi PNG, untuk margin yang berlipat ganda. Banyak aplikasi internal perusahaan ditulis khusus untuk IE dan sulit dipindahkan bertahun-tahun kemudian.'
      ) },
      { id: 'jalan-keluar', title: 'Jalan keluarnya', body: p(
        'Netscape membuka kode browsernya pada 1998, dan dari situ lahir proyek Mozilla. Firefox 1.0 dirilis tahun 2004. Di tahun yang sama, Apple, Mozilla, dan Opera membentuk WHATWG untuk melanjutkan pengembangan HTML, yang kemudian dikenal sebagai HTML5.',
        'Lalu tahun 2008 Google merilis Chrome dengan engine JavaScript V8. Persaingan kembali, dan kali ini para pembuat browser bersaing untuk mematuhi standar, bukan untuk mengunci developer.'
      ) },
      { id: 'pelajaran', title: 'Pelajaran untuk hari ini', body: p(
        'Perang browser memberi pelajaran yang berlaku jauh di luar browser: ketika satu pemain menang total, insentif untuk berinovasi melemah, dan yang paling dirugikan adalah orang yang membangun di atasnya.'
      ) + ul(
        `Pakai feature detection seperti ${c("'fetch' in window")}, bukan menebak dari user agent.`,
        'Uji aplikasimu di lebih dari satu engine browser.',
        'Hati-hati dengan fitur yang hanya ada di satu platform, sekalipun platform itu sedang dominan.'
      ) + p('Standar web terasa membosankan sampai kamu ingat seperti apa web tanpa standar. Ia adalah alasan satu halaman yang kamu tulis hari ini bisa dibuka di HP siapa pun.') }
    ]
  }
};
