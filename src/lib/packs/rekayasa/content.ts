import type { DeckSlide, PostSlide } from '../../data';
import { p, ul, pre, c, b, type Full } from '../../blog-html';

const card = (label: string, title: string, body: string, extra: Partial<PostSlide> = {}): PostSlide =>
  ({ num: '', label, title, body, theme: 'white', ...extra });

export const deckSlides: Record<string, DeckSlide[]> = {
  'code-review-yang-membantu': [
    { layout: 'cover', subtitle: 'Rekayasa perangkat lunak', title: 'Code Review yang Benar-Benar Membantu', message: 'Review bukan ritual untuk mendapat centang hijau. Ini satu-satunya momen sebelum merge di mana orang kedua melihat kodemu dengan mata segar.', points: ['Apa yang dicari, dengan urutan yang benar.', 'Cara berkomentar dan ukuran PR yang masuk akal.'] },
    { layout: 'bullets', subtitle: 'Tujuannya', title: 'Untuk Apa Review Ada', message: 'Mencari typo adalah tujuan paling kecil dari sebuah review.', points: ['Menangkap bug dan kasus tepi sebelum sampai ke pengguna.', 'Menyebarkan pengetahuan: minimal dua orang paham setiap perubahan.', 'Menjaga desain tetap konsisten dengan arah sistem.', 'Memastikan kode bisa dirawat orang yang bukan penulisnya.'] },
    { layout: 'cards', subtitle: 'Urutan prioritas', title: 'Apa yang Dicari Duluan', message: 'Periksa dari yang paling mahal untuk diperbaiki nanti ke yang paling murah.', cards: [{ title: 'Desain dan arah', desc: 'Apakah ini pendekatan yang tepat? Apakah ada di tempat yang benar?', icon: '1' }, { title: 'Kebenaran', desc: 'Kasus kosong, null, gagal jaringan, input aneh, race condition.', icon: '2' }, { title: 'Keterbacaan', desc: 'Nama, ukuran fungsi, komentar yang menjelaskan alasan.', icon: '3' }, { title: 'Tes', desc: 'Apakah tesnya akan gagal kalau logikanya salah?', icon: '4' }] },
    { layout: 'split', subtitle: 'Ukuran PR', title: 'PR kecil', leftTitle: 'PR Raksasa', leftPoints: ['Reviewer menunda karena butuh waktu panjang.', 'Komentar dangkal, lalu "LGTM" karena lelah.', 'Kalau ada bug, sulit tahu dari bagian mana.'], rightTitle: 'Satu Tujuan per PR', rightPoints: ['Bisa di-review dalam satu duduk.', 'Refactor dan fitur dipisah.', 'Mudah di-revert kalau bermasalah.'] },
    { layout: 'code', subtitle: 'Cara berkomentar', title: 'Komentar yang Bisa Ditindaklanjuti', message: 'Beri label niatmu supaya penulis tahu mana yang wajib dan mana yang saran. Format ini dikenal sebagai Conventional Comments.', code: 'Kurang membantu:\n  "Ini salah."\n\nMembantu:\n  issue: fetchUser dipanggil di dalam loop,\n  jadi 100 item berarti 100 request.\n  Bisa diganti fetchUsers(ids) sekali?\n\n  nit: "tmp" mungkin lebih jelas "pending".\n\n  question: kenapa timeout-nya 30 detik?', points: ['Jelaskan alasan, bukan hanya putusan.', 'Komentari kodenya, bukan orangnya.'] },
    { layout: 'bullets', subtitle: 'Tugas penulis PR', title: 'Review Dimulai dari Deskripsi', message: 'Reviewer tidak bisa membaca pikiranmu. Deskripsi PR yang baik memangkas setengah pertanyaan.', points: ['Apa yang berubah dan kenapa, dalam dua atau tiga kalimat.', 'Cara mengetesnya, termasuk screenshot untuk perubahan UI.', 'Bagian yang kamu ragukan dan ingin dilihat lebih teliti.', 'Review dirimu sendiri dulu sebelum menekan tombol request.'] },
    { layout: 'bullets', subtitle: 'Bagi kerja dengan mesin', title: 'Jangan Review yang Bisa Diotomasi', message: 'Waktu manusia terlalu mahal untuk memperdebatkan spasi.', points: ['Format: serahkan ke formatter (Prettier, dart format, ktlint).', 'Aturan gaya: serahkan ke linter di CI.', 'Tes dan build: harus hijau sebelum review dimulai.', 'Manusia fokus ke hal yang tidak bisa dicek mesin: maksud dan desain.'] },
    { layout: 'bullets', subtitle: 'Kebiasaan tim', title: 'Membuat Review Tidak Jadi Antrean', message: 'PR yang menunggu dua hari menghambat lebih banyak daripada bug kecil.', points: ['Sepakati target waktu respons, misalnya di hari kerja yang sama.', 'Setujui dengan catatan kecil, jangan tahan PR demi nit.', 'Diskusi panjang pindah ke obrolan langsung, lalu catat hasilnya.', 'Pujian juga komentar: tandai solusi yang bagus.'] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'Review yang baik membuat kode lebih baik dan orangnya ikut berkembang.', points: ['Desain dan kebenaran dulu, gaya paling akhir.', 'PR kecil dengan satu tujuan mendapat review yang lebih jujur.', 'Label niat komentarmu: issue, suggestion, question, nit.'] }
  ],

  'refactoring-langkah-kecil': [
    { layout: 'cover', subtitle: 'Tutorial praktik', title: 'Refactoring Aman dalam Langkah Kecil', message: 'Martin Fowler: refactoring adalah perubahan struktur internal kode tanpa mengubah perilakunya yang terlihat. Kata kuncinya: tanpa mengubah perilaku.', points: ['Contoh: fungsi total belanja dengan diskon member.', 'Alat: TypeScript dan bun test.'] },
    { layout: 'bullets', subtitle: 'Sebelum mulai', title: 'Refactoring Bukan Menulis Ulang', message: 'Kalau aplikasinya rusak selama berhari-hari, itu bukan refactoring.', points: ['Setiap langkah kecil, dan tes tetap hijau setelahnya.', 'Kamu bisa berhenti kapan saja dan kodenya tetap bisa dirilis.', 'Tidak ada fitur baru di commit yang sama.', 'Butuh jaring pengaman: tes yang menangkap perilaku sekarang.'] },
    { layout: 'code', subtitle: 'Titik awal', title: 'Kode yang Ingin Dirapikan', message: 'Berjalan benar, tapi sulit dibaca dan angkanya tanpa nama.', code: 'type Item = { price: number; qty: number }\n\nexport function total(cart: Item[], member: boolean) {\n  let t = 0\n  for (const i of cart) t += i.price * i.qty\n  if (member && t > 100000) t = t * 0.9\n  return t\n}', points: ['Jangan sentuh dulu. Pasang tes lebih dulu.'] },
    { layout: 'code', subtitle: 'Langkah 0', title: 'Kunci Perilakunya dengan Tes', message: 'Characterization test mencatat apa yang kode lakukan sekarang, bukan apa yang seharusnya.', code: 'import { expect, test } from "bun:test"\nimport { total } from "./total"\n\nconst items = [{ price: 60000, qty: 2 }]\n\ntest("member dapat diskon di atas 100rb", () => {\n  expect(total(items, true)).toBe(108000)\n})\ntest("non-member bayar penuh", () => {\n  expect(total(items, false)).toBe(120000)\n})', points: ['Jalankan bun test. Harus hijau sebelum lanjut.'] },
    { layout: 'code', subtitle: 'Langkah 1', title: 'Extract Function', message: 'Pisahkan perhitungan subtotal ke fungsinya sendiri. Jalankan tes. Commit.', code: 'const subtotal = (items: Item[]) =>\n  items.reduce((s, i) => s + i.price * i.qty, 0)\n\nexport function total(cart: Item[], member: boolean) {\n  const t = subtotal(cart)\n  return member && t > 100000 ? t * 0.9 : t\n}', points: ['Satu perubahan, satu kali jalankan tes.'] },
    { layout: 'code', subtitle: 'Langkah 2', title: 'Beri Nama pada Angka', message: 'Angka ajaib menjadi konstanta. Perilaku tetap sama, maksudnya jadi terbaca.', code: 'const BATAS_DISKON = 100_000\nconst DISKON_MEMBER = 0.1\n\nexport function total(cart: Item[], member: boolean) {\n  const t = subtotal(cart)\n  const dapatDiskon = member && t > BATAS_DISKON\n  return dapatDiskon ? t * (1 - DISKON_MEMBER) : t\n}', points: ['Tes masih hijau? Commit lagi.'] },
    { layout: 'cards', subtitle: 'Ritme kerjanya', title: 'Siklus Empat Langkah', message: 'Ulangi siklus ini puluhan kali. Setiap putaran hanya beberapa menit.', cards: [{ title: 'Tes hijau', desc: 'Jangan mulai refactor di atas tes yang merah.', icon: '1' }, { title: 'Satu perubahan kecil', desc: 'Rename, extract, inline, atau pindahkan. Satu saja.', icon: '2' }, { title: 'Jalankan tes', desc: 'Merah? Undo, jangan debug. Ambil langkah lebih kecil.', icon: '3' }, { title: 'Commit', desc: 'Setiap commit adalah titik aman untuk kembali.', icon: '4' }] },
    { layout: 'bullets', subtitle: 'Kapan melakukannya', title: 'Rapikan Dulu, Baru Tambah Fitur', message: 'Kent Beck: jadikan perubahannya mudah, lalu lakukan perubahan yang mudah itu.', points: ['Refactor tepat sebelum menambah fitur di area yang sama.', 'Pisahkan commit refactor dan commit fitur.', 'Reviewer bisa membaca commit refactor dengan cepat karena perilakunya tetap.', 'Area yang tidak pernah disentuh tidak perlu dirapikan.'] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'Refactoring yang baik hampir membosankan untuk ditonton.', points: ['Tanpa tes, kamu tidak sedang refactor. Kamu sedang berharap.', 'Langkah kecil, tes setiap langkah, commit sering.', 'Kalau tes merah, kembalikan, jangan dikejar.'] }
  ],

  'utang-teknis-cunningham': [
    { layout: 'cover', subtitle: 'Teori rekayasa', title: 'Utang Teknis: Metafora yang Disalahpahami', message: 'Ward Cunningham memperkenalkan metafora ini di konferensi OOPSLA 1992, saat menjelaskan proyek WyCash kepada orang yang bukan programmer.', points: ['Apa maksud aslinya.', 'Cara membayarnya dengan sengaja.'] },
    { layout: 'bullets', subtitle: 'Asal mula', title: 'Kenapa Disebut Utang', message: 'Cunningham butuh bahasa yang dipahami orang keuangan.', points: ['Merilis kode lebih awal itu seperti berutang: kamu dapat kecepatan sekarang.', 'Utang kecil mempercepat, asal segera dibayar dengan memperbaiki kodenya.', 'Bahayanya muncul saat utang tidak pernah dibayar.', 'Belakangan ia menegaskan: maksudnya bukan menulis kode asal-asalan.'] },
    { layout: 'split', subtitle: 'Anatomi utang', title: 'Bunga', leftTitle: 'Pokok', leftPoints: ['Biaya untuk memperbaiki kodenya.', 'Dibayar sekali.', 'Sering bisa diperkirakan.'], rightTitle: 'Dibayar Tiap Hari', rightPoints: ['Fitur di area itu jadi lebih lambat dibuat.', 'Bug lebih sering muncul di sana.', 'Orang baru butuh lama untuk paham.'] },
    { layout: 'cards', subtitle: 'Martin Fowler, 2009', title: 'Kuadran Utang Teknis', message: 'Tidak semua utang sama. Fowler membaginya dengan dua pertanyaan: sengaja atau tidak, hati-hati atau ceroboh.', cards: [{ title: 'Ceroboh, sengaja', desc: '"Tidak ada waktu untuk desain." Utang yang paling mahal.', icon: '1' }, { title: 'Hati-hati, sengaja', desc: '"Kita rilis dulu dan tahu harus membereskannya." Bisa wajar.', icon: '2' }, { title: 'Ceroboh, tak sadar', desc: '"Layering itu apa?" Lahir dari kurang pengetahuan.', icon: '3' }, { title: 'Hati-hati, tak sadar', desc: '"Sekarang baru kami tahu desain yang tepat." Tak terhindarkan.', icon: '4' }] },
    { layout: 'bullets', subtitle: 'Gejala', title: 'Tanda Bunganya Sudah Tinggi', message: 'Utang jarang terlihat di kode. Ia terlihat di cara tim bekerja.', points: ['Estimasi untuk area tertentu selalu dikali dua "karena modul itu".', 'Hanya satu orang yang berani menyentuh file tertentu.', 'Bug yang sama muncul lagi setelah diperbaiki.', 'Onboarding butuh berminggu-minggu sebelum orang baru bisa kontribusi.'] },
    { layout: 'bullets', subtitle: 'Langkah pertama', title: 'Catat Utangnya', message: 'Utang yang tidak tercatat tidak bisa diprioritaskan.', points: ['Buat daftar utang: lokasi, gejala, dan perkiraan bunganya.', 'Tulis dampaknya dalam bahasa bisnis, bukan "kodenya jelek".', 'Tandai utang yang diambil dengan sengaja saat mengambilnya.', 'Tinjau daftarnya rutin, misalnya setiap perencanaan sprint.'] },
    { layout: 'cards', subtitle: 'Cara membayar', title: 'Empat Strategi Pelunasan', message: 'Tidak ada satu cara yang cocok untuk semua utang.', cards: [{ title: 'Bayar saat lewat', desc: 'Rapikan area yang sedang kamu sentuh untuk fitur.', icon: '1' }, { title: 'Kapasitas tetap', desc: 'Sisihkan porsi tetap tiap sprint, disepakati bersama.', icon: '2' }, { title: 'Bunga tertinggi dulu', desc: 'Utamakan area yang paling sering diubah.', icon: '3' }, { title: 'Biarkan saja', desc: 'Kode yang tidak pernah disentuh hampir tidak berbunga.', icon: '4' }] },
    { layout: 'bullets', subtitle: 'Bicara dengan manajer', title: 'Terjemahkan ke Bahasa Mereka', message: 'Manajer tidak menolak perbaikan. Mereka menolak permintaan yang tidak jelas manfaatnya.', points: ['Bukan "kita perlu refactor", tapi "fitur checkout makan waktu dua kali lipat".', 'Tawarkan pilihan dengan biaya dan manfaat masing-masing.', 'Kaitkan pelunasan dengan fitur yang memang akan dikerjakan.'] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'Utang bukan dosa. Utang yang tidak dikelola yang jadi masalah.', points: ['Utang teknis adalah keputusan, bukan alasan untuk kode jelek.', 'Yang menyakitkan adalah bunganya, bukan pokoknya.', 'Bayar di tempat yang paling sering kamu lewati.'] }
  ],

  'semantic-versioning': [
    { layout: 'cover', subtitle: 'Teori rilis', title: 'Semantic Versioning: Janji di Balik 3 Angka', message: 'Spesifikasi SemVer, ditulis Tom Preston-Werner, memberi arti pada setiap angka versi. Angka itu adalah pesan untuk orang yang memakai kodemu.', points: ['Format: MAJOR.MINOR.PATCH.', 'Contoh: 2.14.3.'] },
    { layout: 'cards', subtitle: 'Arti tiap angka', title: 'Apa yang Dijanjikan', message: 'Setiap kenaikan angka menjawab satu pertanyaan: apakah aman untuk upgrade?', cards: [{ title: 'MAJOR: 3.0.0', desc: 'Ada perubahan yang tidak kompatibel. Baca catatan rilis dulu.', icon: 'M' }, { title: 'MINOR: 2.5.0', desc: 'Fitur baru, kode lama tetap jalan.', icon: 'm' }, { title: 'PATCH: 2.4.1', desc: 'Perbaikan bug, tanpa fitur atau API baru.', icon: 'p' }, { title: 'Pre-release', desc: '3.0.0-beta.1: belum stabil, tidak ada janji.', icon: '?' }] },
    { layout: 'bullets', subtitle: 'Yang sering dilupakan', title: 'Apa Itu Breaking Change', message: 'Tidak hanya menghapus fungsi. Banyak perubahan kecil ternyata merusak.', points: ['Mengganti nama atau tipe parameter.', 'Menambah parameter wajib.', 'Mengubah bentuk data yang dikembalikan atau pesan error yang diparsing orang.', 'Menaikkan versi minimum runtime, misalnya Node atau Dart.'] },
    { layout: 'split', subtitle: 'Sebelum 1.0', title: 'Setelah 1.0', leftTitle: 'Versi 0.y.z', leftPoints: ['Pengembangan awal.', 'Apa pun boleh berubah kapan saja.', 'API publik belum dianggap stabil.'], rightTitle: 'Versi 1.0.0', rightPoints: ['API publik resmi ditetapkan.', 'Mulai sekarang, aturan semver berlaku penuh.', 'Rilis 1.0 adalah komitmen, bukan perayaan.'] },
    { layout: 'code', subtitle: 'Di sisi pemakai', title: 'Rentang Versi di npm', message: 'Caret dan tilde mengandalkan janji semver. Kalau janji dilanggar, update otomatis bisa merusak build.', code: '# notasi     artinya\n^1.4.2       >=1.4.2 <2.0.0\n~1.4.2       >=1.4.2 <1.5.0\n^0.4.2       >=0.4.2 <0.5.0\n1.4.2        persis 1.4.2\n\n# lockfile mengunci versi yang terpasang\nnpm ci', points: ['Di 0.x, caret lebih ketat karena minor dianggap breaking.', 'Commit lockfile supaya build bisa diulang.'] },
    { layout: 'bullets', subtitle: 'Hukum Hyrum', title: 'Semua Perilaku Akan Diandalkan', message: 'Hyrum Wright: dengan cukup banyak pengguna, semua perilaku yang bisa diamati akan diandalkan seseorang.', points: ['Urutan hasil yang "kebetulan" selalu sama.', 'Teks pesan error yang dicocokkan dengan string.', 'Waktu respons yang dijadikan asumsi timeout.', 'Artinya: patch pun bisa merusak. Tulis apa yang kamu janjikan.'] },
    { layout: 'bullets', subtitle: 'Praktik rilis', title: 'Cara Merilis dengan Sopan', message: 'Pemakai library-mu menghargai kejutan yang sedikit.', points: ['Tandai deprecated di versi minor, hapus di versi major berikutnya.', 'Tulis CHANGELOG dengan bagian Added, Changed, Fixed, Removed.', 'Sertakan panduan migrasi untuk setiap major.', 'Otomasi dengan Conventional Commits bila timmu sudah disiplin.'] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'Nomor versi adalah API juga.', points: ['MAJOR untuk breaking, MINOR untuk fitur, PATCH untuk perbaikan.', 'Breaking change lebih luas dari sekadar menghapus fungsi.', 'Rilis 1.0 berarti kamu siap menepati janji.'] }
  ],

  'desain-http-api': [
    { layout: 'cover', subtitle: 'Tutorial praktik', title: 'Mendesain HTTP API yang Enak Dipakai', message: 'API adalah antarmuka untuk developer lain. Yang menilai desainnya adalah orang yang memanggilnya, bukan yang menulisnya.', points: ['Naming, status code, error, pagination, versioning.', 'Contoh: API toko online.'] },
    { layout: 'bullets', subtitle: 'Naming', title: 'Resource Pakai Kata Benda', message: 'Method HTTP sudah menjadi kata kerjanya. Path cukup menyebut bendanya.', points: ['Pakai bentuk jamak: /orders, bukan /order atau /getOrders.', 'Hubungan ditulis bertingkat: /orders/42/items.', 'Pilih satu gaya penulisan, misalnya kebab-case di path.', 'Aksi yang bukan CRUD boleh jadi sub-resource: /orders/42/cancel.'] },
    { layout: 'code', subtitle: 'Contoh', title: 'Satu Resource, Lima Operasi', message: 'Pola yang langsung bisa ditebak oleh developer yang belum pernah membaca dokumentasimu.', code: 'GET    /orders            daftar pesanan\nPOST   /orders            buat pesanan baru\nGET    /orders/42         detail pesanan 42\nPATCH  /orders/42         ubah sebagian field\nDELETE /orders/42         hapus pesanan 42\n\nGET    /orders/42/items   item di pesanan 42\nPOST   /orders/42/cancel  aksi khusus', points: ['GET tidak boleh mengubah data.', 'PUT dan DELETE seharusnya idempoten.'] },
    { layout: 'cards', subtitle: 'Status code', title: 'Status yang Jujur', message: 'Klien mengambil keputusan dari status code. Jangan bungkus kegagalan dalam 200 OK.', cards: [{ title: '200, 201, 204', desc: 'Berhasil, berhasil dibuat, berhasil tanpa isi.', icon: '2' }, { title: '400 dan 422', desc: 'Request salah bentuk atau datanya tidak valid.', icon: '4' }, { title: '401, 403, 404, 409', desc: 'Belum login, tidak berhak, tidak ada, konflik.', icon: '4' }, { title: '500 dan 503', desc: 'Salah server. Klien boleh mencoba lagi nanti.', icon: '5' }] },
    { layout: 'code', subtitle: 'Error', title: 'Bentuk Error yang Konsisten', message: 'RFC 9457 (Problem Details) memberi format standar. Content-Type: application/problem+json.', code: '{\n  "type": "https://api.toko.id/errors/stok-habis",\n  "title": "Stok tidak cukup",\n  "status": 409,\n  "detail": "Sisa stok SKU-881 tinggal 2, diminta 5.",\n  "instance": "/orders/42",\n  "sku": "SKU-881",\n  "available": 2\n}', points: ['title untuk manusia, type untuk kode.', 'Field tambahan boleh untuk konteks.'] },
    { layout: 'split', subtitle: 'Pagination', title: 'Cursor', leftTitle: 'Offset', leftPoints: ['?page=3&limit=20, mudah dipahami.', 'Bisa lompat ke halaman tertentu.', 'Data bisa terlewat atau dobel saat ada insert.'], rightTitle: 'Lanjut dari Penanda', rightPoints: ['?after=abc123&limit=20.', 'Stabil walau data terus bertambah.', 'Cocok untuk infinite scroll di mobile.'] },
    { layout: 'code', subtitle: 'Pagination', title: 'Respons dengan Cursor', message: 'Klien tidak perlu menghitung apa pun. Cukup kirim balik nextCursor sampai nilainya null.', code: 'GET /orders?limit=2&after=b3JkLTQx\n\n{\n  "data": [\n    { "id": "ord-42", "total": 150000 },\n    { "id": "ord-43", "total": 89000 }\n  ],\n  "nextCursor": "b3JkLTQz"\n}', points: ['Cursor sebaiknya opaque, jangan diparsing klien.'] },
    { layout: 'bullets', subtitle: 'Versioning', title: 'Rencanakan Versi Sejak Awal', message: 'Aplikasi mobile versi lama tetap dipakai berbulan-bulan setelah kamu merilis yang baru.', points: ['Versi di path (/v1/orders) paling mudah dilihat dan di-debug.', 'Menambah field opsional bukan breaking change. Menghapus field adalah.', 'Naikkan versi hanya untuk breaking change.', 'Umumkan tanggal pensiun versi lama jauh hari.'] },
    { layout: 'bullets', subtitle: 'Detail kecil', title: 'Yang Membuat API Terasa Rapi', message: 'Hal kecil yang menghemat jam debugging di sisi klien.', points: ['Tanggal dalam ISO 8601 dengan zona waktu: 2026-11-28T09:00:00Z.', 'Uang dalam satuan terkecil sebagai integer, bukan float.', 'Header Idempotency-Key untuk POST pembayaran yang mungkin di-retry.', 'Gaya penamaan field konsisten: camelCase atau snake_case, jangan campur.'] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'API yang baik bisa ditebak. Developer lain jarang perlu bertanya.', points: ['Kata benda di path, kata kerja di method.', 'Status code jujur, error punya bentuk tetap.', 'Pagination dan versioning dipikirkan sebelum ada pengguna.'] }
  ],

  'monolith-vs-microservices': [
    { layout: 'cover', subtitle: 'Teori arsitektur', title: 'Monolith vs Microservices', message: 'Pertanyaannya bukan mana yang modern. Pertanyaannya: masalah apa yang sedang kamu selesaikan, dan berapa orang yang menyelesaikannya.', points: ['Kekuatan dan biaya masing-masing.', 'Jalan tengah: modular monolith.'] },
    { layout: 'bullets', subtitle: 'Definisi', title: 'Dua Cara Membagi Sistem', message: 'Perbedaannya ada di batas deploy, bukan di jumlah folder.', points: ['Monolith: satu aplikasi, satu deploy, biasanya satu database.', 'Microservices: banyak service kecil, deploy terpisah, data masing-masing.', 'Service berkomunikasi lewat jaringan: HTTP, gRPC, atau pesan.', 'Keduanya bisa rapi, keduanya bisa berantakan.'] },
    { layout: 'split', subtitle: 'Monolith', title: 'Kelemahannya', leftTitle: 'Kekuatannya', leftPoints: ['Satu repo, satu build, satu deploy.', 'Pemanggilan fungsi, bukan panggilan jaringan.', 'Transaksi database sederhana.'], rightTitle: 'Saat Membesar', rightPoints: ['Batas modul mudah dilanggar.', 'Banyak tim antre di satu jalur rilis.', 'Seluruh aplikasi di-scale bersama.'] },
    { layout: 'split', subtitle: 'Microservices', title: 'Kelemahannya', leftTitle: 'Kekuatannya', leftPoints: ['Tim bisa rilis tanpa menunggu tim lain.', 'Bagian sibuk di-scale sendiri.', 'Kegagalan satu service bisa diisolasi.'], rightTitle: 'Biaya Tersembunyi', rightPoints: ['Jaringan bisa lambat dan gagal.', 'Transaksi lintas service jadi rumit.', 'Butuh tracing, logging terpusat, dan CI matang.'] },
    { layout: 'bullets', subtitle: 'Fallacies of distributed computing', title: 'Jaringan Tidak Bisa Dipercaya', message: 'Daftar asumsi keliru yang dirumuskan para engineer Sun Microsystems di tahun 1990-an masih relevan.', points: ['Jaringan dianggap selalu andal. Kenyataannya tidak.', 'Latensi dianggap nol. Kenyataannya tidak.', 'Bandwidth dianggap tak terbatas. Kenyataannya tidak.', 'Setiap panggilan antarservice mewarisi semua masalah ini.'] },
    { layout: 'cards', subtitle: 'Kapan masuk akal', title: 'Sinyal Butuh Microservices', message: 'Alasannya hampir selalu soal organisasi dan beban, jarang soal kode.', cards: [{ title: 'Banyak tim', desc: 'Tim saling menunggu untuk rilis. Ingat Hukum Conway.', icon: '1' }, { title: 'Beban berbeda', desc: 'Satu bagian butuh 50 instance, sisanya cukup dua.', icon: '2' }, { title: 'Siklus rilis berbeda', desc: 'Pembayaran rilis bulanan, katalog rilis harian.', icon: '3' }, { title: 'Isolasi kegagalan', desc: 'Rekomendasi boleh mati, checkout tidak.', icon: '4' }] },
    { layout: 'code', subtitle: 'Jalan tengah', title: 'Modular Monolith', message: 'Satu deploy, tapi batas modul dijaga ketat. Kalau suatu saat perlu dipecah, garisnya sudah ada.', code: 'src/\n  orders/\n    index.ts     # satu-satunya pintu masuk\n    internal/    # tidak boleh diimpor modul lain\n  payments/\n    index.ts\n    internal/\n  catalog/\n    index.ts\n    internal/', points: ['Tegakkan aturannya dengan linter, bukan janji.', 'Tiap modul memiliki tabelnya sendiri.'] },
    { layout: 'bullets', subtitle: 'Strategi', title: 'Monolith Dulu, Pecah Belakangan', message: 'Martin Fowler menyebutnya MonolithFirst: batas service yang tepat baru terlihat setelah sistem dipakai.', points: ['Mulai dengan monolith yang modular.', 'Ukur bagian mana yang benar-benar butuh dipisah.', 'Pecah sedikit demi sedikit dengan pola Strangler Fig.', 'Satu service baru per kebutuhan nyata, bukan per tabel.'] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'Arsitektur adalah alat untuk timmu, bukan pajangan untuk CV.', points: ['Tim kecil hampir selalu lebih cepat dengan monolith.', 'Microservices menukar kerumitan kode dengan kerumitan operasional.', 'Jaga batas modul sejak awal supaya pilihanmu tetap terbuka.'] }
  ],

  'message-queue-alur-pesanan': [
    { layout: 'cover', subtitle: 'Teori arsitektur', title: 'Message Queue lewat Satu Pesanan', message: 'Satu klik "Bayar" memicu pembayaran, stok, email, poin, dan notifikasi. Pertanyaannya: mana yang harus ditunggu pengguna?', points: ['Dari alur sinkron ke alur berbasis event.', 'Plus masalah baru yang ikut datang.'] },
    { layout: 'code', subtitle: 'Versi pertama', title: 'Semuanya Ditunggu', message: 'Enam panggilan berurutan. Kalau server email lambat, pengguna ikut menunggu.', code: 'async function checkout(order: Order) {\n  await payments.charge(order)\n  await db.orders.insert(order)\n  await stock.reserve(order.items)\n  await email.sendReceipt(order)\n  await points.add(order.userId, order.total)\n  await push.notify(order.userId, "Pesanan diterima")\n  return order.id\n}', points: ['Email gagal, apakah pesanannya ikut gagal?'] },
    { layout: 'bullets', subtitle: 'Masalahnya', title: 'Kenapa Ini Rapuh', message: 'Alur sinkron mengikat nasib semua langkah menjadi satu.', points: ['Waktu respons adalah jumlah waktu semua langkah.', 'Satu layanan mati membuat checkout gagal.', 'Menambah langkah baru berarti mengubah fungsi checkout lagi.', 'Lonjakan pesanan langsung menghantam semua layanan sekaligus.'] },
    { layout: 'cards', subtitle: 'Anatomi', title: 'Empat Komponen', message: 'Pengirim dan penerima tidak perlu saling kenal, cukup sepakat soal bentuk pesannya.', cards: [{ title: 'Producer', desc: 'Mengirim pesan: "pesanan 42 sudah dibuat".', icon: '1' }, { title: 'Broker', desc: 'Menyimpan dan mengantar pesan. Contoh: RabbitMQ, Kafka.', icon: '2' }, { title: 'Consumer', desc: 'Mengambil pesan dan mengerjakan tugasnya sendiri.', icon: '3' }, { title: 'Event', desc: 'Fakta yang sudah terjadi, ditulis dalam bentuk lampau.', icon: '4' }] },
    { layout: 'code', subtitle: 'Versi kedua', title: 'Simpan, Umumkan, Selesai', message: 'Checkout hanya mengerjakan yang wajib ditunggu. Sisanya bereaksi terhadap event.', code: 'async function checkout(order: Order) {\n  await payments.charge(order)\n  await db.orders.insert(order)\n  await bus.publish("order.placed", {\n    eventId: crypto.randomUUID(),\n    orderId: order.id,\n    userId: order.userId,\n    total: order.total,\n  })\n  return order.id\n}', points: ['Email, poin, dan notifikasi masing-masing jadi consumer.', 'Fitur baru cukup menambah consumer baru.'] },
    { layout: 'split', subtitle: 'Dua pola', title: 'Publish/subscribe', leftTitle: 'Queue', leftPoints: ['Satu pesan diambil satu worker.', 'Cocok untuk membagi pekerjaan.', 'Contoh: antrean kirim email.'], rightTitle: 'Banyak Pendengar', rightPoints: ['Satu event diterima semua subscriber.', 'Cocok untuk memberi kabar.', 'Contoh: order.placed ke stok dan poin.'] },
    { layout: 'cards', subtitle: 'Harga yang dibayar', title: 'Masalah Baru yang Datang', message: 'Event-driven memindahkan kerumitan. Ia tidak menghapusnya.', cards: [{ title: 'Pesan dobel', desc: 'Kebanyakan broker menjamin at-least-once. Consumer harus idempoten.', icon: '1' }, { title: 'Urutan', desc: 'Event bisa diproses tidak berurutan. Jangan berasumsi.', icon: '2' }, { title: 'Pesan beracun', desc: 'Pesan yang selalu gagal dipindah ke dead letter queue.', icon: '3' }, { title: 'Eventual consistency', desc: 'Poin muncul beberapa detik setelah pesanan. Desain UI-nya.', icon: '4' }] },
    { layout: 'bullets', subtitle: 'Jebakan klasik', title: 'Simpan Berhasil, Publish Gagal', message: 'Kalau database sudah commit tapi publish gagal, event hilang tanpa jejak.', points: ['Solusi umum: transactional outbox.', 'Tulis event ke tabel outbox dalam transaksi yang sama dengan pesanan.', 'Proses terpisah membaca outbox lalu mengirimnya ke broker.', 'Akibatnya pesan bisa terkirim dua kali, jadi idempotensi tetap wajib.'] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'Queue membuat sistem lebih longgar, bukan lebih sederhana.', points: ['Tunggu hanya yang benar-benar harus ditunggu pengguna.', 'Event adalah fakta lampau, diproses oleh siapa pun yang peduli.', 'Anggap setiap pesan bisa datang dua kali dan terlambat.'] }
  ],

  'piramida-testing': [
    { layout: 'cover', subtitle: 'Teori testing', title: 'Piramida Testing', message: 'Mike Cohn mempopulerkan gambar ini di buku Succeeding with Agile (2009). Idenya: banyak tes kecil yang cepat, sedikit tes besar yang lambat.', points: ['Unit, integration, end-to-end.', 'Trade-off di setiap lapisan.'] },
    { layout: 'cards', subtitle: 'Lapisannya', title: 'Dari Bawah ke Atas', message: 'Makin ke atas, makin mirip pengguna sungguhan, tapi makin mahal dan lambat.', cards: [{ title: 'Unit', desc: 'Satu fungsi atau class, tanpa jaringan dan database. Milidetik.', icon: '1' }, { title: 'Integration', desc: 'Beberapa bagian bersama: kode plus database sungguhan.', icon: '2' }, { title: 'End-to-end', desc: 'Aplikasi utuh dijalankan seperti pengguna: klik dan ketik.', icon: '3' }, { title: 'Eksplorasi manual', desc: 'Manusia mencari hal aneh yang tidak terpikir saat menulis tes.', icon: '4' }] },
    { layout: 'code', subtitle: 'Lapisan bawah', title: 'Tes Unit', message: 'Cepat, stabil, dan kalau gagal, langsung menunjuk ke satu fungsi.', code: 'import { expect, test } from "bun:test"\nimport { ongkir } from "./ongkir"\n\ntest("gratis ongkir di atas 200rb", () => {\n  expect(ongkir({ subtotal: 250_000 })).toBe(0)\n})\n\ntest("ongkir flat di bawah 200rb", () => {\n  expect(ongkir({ subtotal: 50_000 })).toBe(15_000)\n})', points: ['Ribuan tes seperti ini bisa jalan dalam hitungan detik.'] },
    { layout: 'code', subtitle: 'Lapisan tengah', title: 'Tes Integration', message: 'Menguji sambungan: apakah query-mu benar-benar jalan di database sungguhan?', code: 'import { Database } from "bun:sqlite"\nimport { expect, test } from "bun:test"\nimport { UserRepo } from "./user-repo"\n\ntest("simpan lalu baca user", () => {\n  const repo = new UserRepo(new Database(":memory:"))\n  repo.migrate()\n  repo.save({ id: 1, name: "Rina" })\n  expect(repo.find(1)?.name).toBe("Rina")\n})', points: ['Menangkap salah ketik di SQL yang lolos dari tes unit.'] },
    { layout: 'split', subtitle: 'Tes unit', title: 'Tes end-to-end', leftTitle: 'Cepat dan Sempit', leftPoints: ['Jalan dalam milidetik.', 'Gagal di tempat yang jelas.', 'Tidak membuktikan bagian-bagiannya tersambung.'], rightTitle: 'Lambat dan Luas', rightPoints: ['Membuktikan alur pengguna benar-benar jalan.', 'Butuh menit, bukan detik.', 'Mudah flaky karena jaringan dan waktu.'] },
    { layout: 'bullets', subtitle: 'Anti-pola', title: 'Kerucut Es Krim', message: 'Piramida yang terbalik: sedikit tes unit, banyak tes end-to-end, dan tumpukan tes manual di atasnya.', points: ['CI butuh puluhan menit, developer berhenti menjalankannya.', 'Tes gagal acak, tim terbiasa menekan "re-run".', 'Saat gagal, butuh lama untuk tahu bagian mana yang salah.', 'Biasanya lahir dari menambah tes UI karena kode sulit dites per bagian.'] },
    { layout: 'bullets', subtitle: 'Bukan hukum fisika', title: 'Bentuknya Mengikuti Konteks', message: 'Piramida adalah heuristik. Ada variasi yang masuk akal.', points: ['Testing Trophy dari Kent C. Dodds menekankan tes integration untuk frontend.', 'Aplikasi yang isinya kebanyakan CRUD mendapat lebih banyak dari tes integration.', 'Logika bisnis yang rumit paling murah diuji di tes unit.', 'Prinsip tetapnya: banyak tes cepat, sedikit tes lambat.'] },
    { layout: 'bullets', subtitle: 'Praktik harian', title: 'Tes di Lapisan Serendah Mungkin', message: 'Saat menemukan bug, tulis tes yang bisa menangkapnya di lapisan paling bawah yang masih mungkin.', points: ['Bug perhitungan diskon: cukup tes unit.', 'Bug query yang salah join: tes integration.', 'Bug tombol checkout tidak muncul: baru tes end-to-end.', 'Simpan tes end-to-end untuk beberapa alur paling berharga saja.'] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'Tes yang baik memberi umpan balik cepat dan bisa dipercaya.', points: ['Makin tinggi lapisannya, makin sedikit jumlahnya.', 'Tes yang flaky lebih berbahaya daripada tes yang tidak ada.', 'Kalau kode sulit dites per bagian, itu sinyal desain, bukan masalah tes.'] }
  ],

  'architecture-decision-records': [
    { layout: 'cover', subtitle: 'Tutorial praktik', title: 'Architecture Decision Records', message: 'Michael Nygard mengusulkan format ini pada 2011: satu file pendek untuk setiap keputusan arsitektur penting, disimpan bersama kode.', points: ['Formatnya, contohnya, dan alurnya.', 'Plus kenapa dokumen pendek lebih sering dibaca.'] },
    { layout: 'bullets', subtitle: 'Masalahnya', title: 'Keputusan yang Hilang', message: 'Kode menunjukkan apa yang dipilih. Kode tidak pernah menunjukkan kenapa.', points: ['Orang baru bertanya kenapa memakai library X, tidak ada yang ingat.', 'Keputusan lama dibalik tanpa tahu alasan awalnya, lalu masalah lama kembali.', 'Diskusi penting terkubur di chat dan rapat yang tidak dicatat.', 'Dokumen desain besar sudah basi sebelum selesai ditulis.'] },
    { layout: 'cards', subtitle: 'Format Nygard', title: 'Isi Satu ADR', message: 'Judul bernomor, lalu empat bagian. Biasanya cukup satu sampai dua halaman.', cards: [{ title: 'Status', desc: 'Diusulkan, Diterima, Ditinggalkan, atau Digantikan.', icon: '1' }, { title: 'Konteks', desc: 'Situasi dan batasan saat itu. Fakta, bukan opini.', icon: '2' }, { title: 'Keputusan', desc: 'Kalimat aktif: "Kita akan memakai..."', icon: '3' }, { title: 'Konsekuensi', desc: 'Yang jadi mudah, yang jadi sulit. Termasuk yang negatif.', icon: '4' }] },
    { layout: 'code', subtitle: 'Contoh', title: 'Sebuah ADR Sungguhan', message: 'Ditulis dalam Markdown, disimpan di repo, di-review lewat pull request seperti kode.', code: '# 7. PostgreSQL untuk data pesanan\nStatus: Diterima (2026-11-20)\n\n## Konteks\nPesanan butuh transaksi dan laporan ad-hoc.\nTim sudah terbiasa dengan SQL.\n\n## Keputusan\nKita memakai PostgreSQL, bukan MongoDB.\n\n## Konsekuensi\nSetiap perubahan skema butuh migrasi.', points: ['Konteks yang jujur lebih berharga dari keputusannya.'] },
    { layout: 'bullets', subtitle: 'Aturan main', title: 'ADR Tidak Diedit, Tapi Diganti', message: 'ADR adalah catatan sejarah. Nilainya justru dari tidak diubah.', points: ['Berubah pikiran? Tulis ADR baru yang menggantikan yang lama.', 'Ubah status lama menjadi "Digantikan oleh ADR 12".', 'Nomor urut tidak pernah dipakai ulang.', 'Keputusan yang ditolak juga dicatat supaya tidak diusulkan ulang tanpa alasan baru.'] },
    { layout: 'code', subtitle: 'Di repo', title: 'Struktur Folder', message: 'Letakkan di dekat kode supaya ikut ter-review dan ikut ter-versi.', code: 'docs/adr/\n  0001-catat-keputusan-dengan-adr.md\n  0004-redis-untuk-antrean.md\n  0007-postgresql-untuk-pesanan.md\n  0012-rabbitmq-untuk-antrean.md\n\n# isi 0004 setelah diganti:\n# Status: Digantikan oleh 0012', points: ['ADR pertama biasanya: "Kita mencatat keputusan dengan ADR".'] },
    { layout: 'split', subtitle: 'Kapan menulis', title: 'Tidak perlu', leftTitle: 'Tulis ADR', leftPoints: ['Pilihan database, framework, atau pola komunikasi.', 'Keputusan yang mahal untuk dibalik.', 'Saat ada perdebatan yang perlu ditutup.'], rightTitle: 'Lewati Saja', rightPoints: ['Nama variabel dan gaya kode.', 'Pilihan yang bisa diubah dalam satu PR.', 'Hal yang sudah diatur linter.'] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'Dokumen yang dibaca orang itu pendek, spesifik, dan punya tanggal.', points: ['Satu keputusan, satu file, empat bagian.', 'Simpan di repo dan review lewat PR.', 'Jangan edit keputusan lama, gantikan dengan yang baru.'] }
  ],

  'estimasi-hofstadter': [
    { layout: 'cover', subtitle: 'Teori perencanaan', title: 'Kenapa Estimasi Selalu Meleset', message: 'Douglas Hofstadter menulis di Gödel, Escher, Bach (1979): semuanya selalu lebih lama dari perkiraanmu, bahkan setelah memperhitungkan hukum ini.', points: ['Kenapa kita konsisten terlalu optimis.', 'Cara merencanakan dengan jujur.'] },
    { layout: 'bullets', subtitle: 'Akar masalahnya', title: 'Otak Kita Memang Optimis', message: 'Kahneman dan Tversky menamai kecenderungan ini planning fallacy pada 1979.', points: ['Kita membayangkan skenario lancar, bukan skenario biasanya.', 'Kita menilai dari rencana, bukan dari pengalaman proyek serupa.', 'Kita mengestimasi waktu mengetik kode, bukan waktu sampai rilis.', 'Pekerjaan baru selalu punya bagian yang belum pernah dikerjakan.'] },
    { layout: 'cards', subtitle: 'Ke mana waktunya pergi', title: 'Yang Lupa Dihitung', message: 'Jarang ada yang salah menghitung waktu menulis fungsinya. Yang terlupa adalah sisanya.', cards: [{ title: 'Integrasi', desc: 'Menyambungkan ke API, auth, dan data sungguhan.', icon: '1' }, { title: 'Review dan QA', desc: 'Menunggu review, revisi, bug dari QA, revisi lagi.', icon: '2' }, { title: 'Kerja tak terlihat', desc: 'Rapat, bantu rekan, bug production, ganti konteks.', icon: '3' }, { title: 'Menunggu orang lain', desc: 'Desain belum final, akses belum diberi, tim lain sibuk.', icon: '4' }] },
    { layout: 'bullets', subtitle: 'Aturan 90-90', title: 'Sembilan Puluh Persen Kedua', message: 'Tom Cargill dari Bell Labs: 90 persen pertama kode makan 90 persen waktu. Sepuluh persen sisanya makan 90 persen waktu lagi.', points: ['"Hampir selesai" bisa bertahan berminggu-minggu.', 'Kasus tepi, error handling, dan polesan baru muncul di akhir.', 'Ukur kemajuan dari yang sudah rilis, bukan dari persentase.'] },
    { layout: 'split', subtitle: 'Tiga hal berbeda', title: 'Komitmen dan target', leftTitle: 'Estimasi', leftPoints: ['Perkiraan berdasarkan informasi sekarang.', 'Punya ketidakpastian.', 'Boleh berubah saat informasi berubah.'], rightTitle: 'Jangan Dicampur', rightPoints: ['Target: tanggal yang diinginkan bisnis.', 'Komitmen: janji yang disepakati bersama.', 'Estimasi tidak boleh ditawar jadi target.'] },
    { layout: 'bullets', subtitle: 'Cara menyampaikan', title: 'Rentang, Bukan Satu Angka', message: 'Satu angka terdengar pasti dan hampir selalu salah. Rentang jujur soal ketidakpastian.', points: ['"Tiga sampai delapan hari, paling mungkin lima."', 'Sebutkan asumsinya: "kalau API pembayaran sudah siap".', 'Rentang lebar di awal itu wajar, menyempit seiring kerja berjalan.', 'Steve McConnell mempopulerkan pola ini sebagai cone of uncertainty.'] },
    { layout: 'cards', subtitle: 'Teknik yang membantu', title: 'Merencanakan Tetap Bisa', message: 'Estimasi tidak harus akurat untuk tetap berguna.', cards: [{ title: 'Pecah kecil', desc: 'Tugas di atas tiga hari biasanya menyembunyikan tugas lain.', icon: '1' }, { title: 'Lihat data lama', desc: 'Bandingkan dengan pekerjaan mirip yang sudah selesai.', icon: '2' }, { title: 'Hitung throughput', desc: 'Berapa tiket selesai per minggu, bukan berapa poin.', icon: '3' }, { title: 'Buffer terbuka', desc: 'Tulis cadangan waktunya, jangan disembunyikan.', icon: '4' }] },
    { layout: 'bullets', subtitle: 'Saat tetap meleset', title: 'Kabar Buruk Lebih Awal', message: 'Stakeholder bisa menerima keterlambatan. Yang sulit diterima adalah kejutan di hari terakhir.', points: ['Perbarui perkiraan setiap minggu, bukan hanya di akhir.', 'Tawarkan pilihan: kurangi scope, geser tanggal, atau tambah waktu.', 'Potong fitur, jangan potong tes dan review.'] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'Estimasi yang meleset itu normal. Yang bisa diperbaiki adalah cara menyampaikannya.', points: ['Kita optimis secara alami, jadi lawan dengan data lama.', 'Pisahkan estimasi, target, dan komitmen.', 'Beri rentang, sebut asumsi, kabari lebih awal.'] }
  ]
};

export const postSlides: Record<string, PostSlide[]> = {
  'code-review-6-kebiasaan': [
    card('teori', '6 Kebiasaan Reviewer yang Disukai Tim', 'Reviewer terbaik bukan yang paling banyak komentarnya. Mereka yang membuat kode lebih baik tanpa membuat penulisnya kapok membuka PR.'),
    card('1', 'Baca Deskripsinya Dulu', 'Pahami maksud perubahan sebelum membaca baris pertama. Kode yang benar untuk tujuan yang salah tetap salah.'),
    card('2', 'Desain Sebelum Spasi', 'Pertanyaan "apakah ini di tempat yang benar?" jauh lebih berharga daripada debat tanda kutip.', { bullets: ['Format serahkan ke formatter.', 'Aturan gaya serahkan ke linter.'] }),
    card('3', 'Tandai Niat Komentarmu', 'Penulis perlu tahu mana yang wajib dan mana yang sekadar selera.', { code: 'issue: query ini jalan di dalam loop\nsuggestion: bisa pakai Map di sini\nquestion: kenapa retry-nya 5 kali?\nnit: typo di nama variabel' }),
    card('4', 'Jelaskan Kenapa', '"Ganti ini" memaksa penulis menebak. "Ganti ini karena bisa null saat user logout" mengajarinya sesuatu.'),
    card('5', 'Minta PR Lebih Kecil', 'Kalau PR terlalu besar untuk dibaca dengan teliti, katakan saja. Itu lebih jujur daripada "LGTM" setelah membaca sepertiganya.', { bullets: ['Satu PR, satu tujuan.', 'Refactor dan fitur dipisah.'] }),
    card('6', 'Balas di Hari yang Sama', 'PR yang menunggu dua hari menahan pekerjaan berikutnya. Review cepat dengan catatan kecil lebih berguna daripada review sempurna minggu depan.')
  ],

  'refactor-aman-5-aturan': [
    card('tutorial', 'Refactor Tanpa Drama: 5 Aturan', 'Refactoring artinya mengubah struktur kode tanpa mengubah perilakunya. Lima aturan ini menjaga kamu tetap di definisi itu.'),
    card('aturan 1', 'Tes Dulu, Sentuh Kemudian', 'Belum ada tes? Tulis tes yang mencatat perilaku sekarang, termasuk perilaku yang terasa aneh.', { code: 'test("perilaku sekarang", () => {\n  expect(total(items, true))\n    .toBe(108000)\n})' }),
    card('aturan 2', 'Satu Langkah, Satu Tes', 'Rename. Jalankan tes. Extract function. Jalankan tes. Langkahnya kecil sampai terasa konyol, dan itu memang sengaja.'),
    card('aturan 3', 'Merah? Undo.', 'Tes gagal setelah langkah kecil? Jangan debug. Kembalikan perubahannya, ambil langkah yang lebih kecil.', { code: 'git restore .\n# atau undo di editor, lalu ulangi\n# dengan langkah yang lebih kecil' }),
    card('aturan 4', 'Commit Sesering Mungkin', 'Setiap tes hijau adalah titik aman. Commit kecil membuat kamu berani mencoba, karena kembali ke belakang itu murah.'),
    card('aturan 5', 'Jangan Campur dengan Fitur', 'Commit refactor tidak boleh mengubah perilaku. Commit fitur boleh. Kalau dicampur, reviewer tidak bisa membedakan keduanya.', { bullets: ['Rapikan dulu, commit.', 'Tambah fitur, commit terpisah.'] })
  ],

  'utang-teknis-ada-bunganya': [
    card('teori', 'Utang Teknis Itu Ada Bunganya', 'Ward Cunningham memperkenalkan istilah ini pada 1992. Bagian yang paling sering dilupakan dari metaforanya bukan utangnya, tapi bunganya.'),
    card('pokok', 'Pokoknya: Biaya Memperbaiki', 'Kalau hari ini kamu hardcode tarif ongkir, pokok utangnya adalah waktu untuk memindahkannya ke konfigurasi nanti. Biasanya tidak besar.'),
    card('bunga', 'Bunganya: Dibayar Tiap Kali Lewat', 'Setiap fitur yang menyentuh area itu jadi sedikit lebih lambat dan sedikit lebih rawan bug.', { bullets: ['Tarif baru? Edit tiga file dan deploy ulang.', 'Promo ongkir? Tambah if-else lagi.', 'Bug? Cari di mana saja angka itu tersebar.'] }),
    card('kuncinya', 'Utang di Kode Mati Itu Gratis', 'Kode jelek yang tidak pernah diubah tidak berbunga. Kode jelek yang diubah setiap minggu menagih setiap minggu.'),
    card('strategi', 'Bayar yang Bunganya Tertinggi', 'Jangan melunasi berdasarkan seberapa jelek kodenya. Lunasi berdasarkan seberapa sering timmu harus melewatinya.', { bullets: ['Lihat file yang paling sering berubah di git.', 'Rapikan saat sedang mengerjakan fitur di sana.'] }),
    card('ingat', 'Utang Bukan Alasan', 'Cunningham bicara soal merilis cepat dengan pemahaman terbaik saat itu, lalu memperbaiki saat paham lebih banyak. Bukan izin menulis kode asal-asalan.')
  ],

  'semver-tiga-angka': [
    card('teori', 'MAJOR.MINOR.PATCH dalam 6 Kartu', 'Versi 2.0.0 tidak berarti "lebih bagus" dari 1.9.0. Artinya: ada sesuatu yang bisa merusak kodemu kalau kamu upgrade begitu saja.'),
    card('patch', '1.4.2 ke 1.4.3', 'Perbaikan bug. Tidak ada fitur baru, tidak ada yang berubah bentuk. Aman untuk upgrade otomatis.'),
    card('minor', '1.4.3 ke 1.5.0', 'Fitur baru ditambahkan, kode lama tetap berjalan seperti biasa. Fungsi lama boleh ditandai deprecated, tapi belum dihapus.'),
    card('major', '1.5.0 ke 2.0.0', 'Ada perubahan yang tidak kompatibel. Baca catatan rilisnya sebelum upgrade.', { bullets: ['Fungsi dihapus atau diganti nama.', 'Parameter wajib bertambah.', 'Bentuk data yang dikembalikan berubah.'] }),
    card('nol', 'Versi 0.x Tidak Berjanji', 'Di 0.y.z, apa pun boleh berubah kapan saja. Karena itu di npm, ^0.4.2 tidak akan naik ke 0.5.0.', { code: '^1.4.2  >=1.4.2 <2.0.0\n^0.4.2  >=0.4.2 <0.5.0\n~1.4.2  >=1.4.2 <1.5.0' }),
    card('ingat', 'Angka Versi Itu Kontrak', 'Setiap kali kamu merilis, orang lain memutuskan aman atau tidaknya upgrade dari angka itu saja. Naikkan angka yang jujur.')
  ],

  'http-api-6-aturan': [
    card('tutorial', '6 Aturan HTTP API untuk Developer Mobile', 'Developer yang memanggil API-mu tidak bisa membaca kode server. Yang mereka punya hanya URL, status code, dan JSON.'),
    card('1', 'Kata Benda di Path', 'Method sudah jadi kata kerjanya. Path cukup menyebut resource-nya.', { code: 'GET  /orders        # bukan /getOrders\nPOST /orders        # bukan /createOrder\nGET  /orders/42/items' }),
    card('2', 'Jangan Bungkus Error dalam 200', 'Status 200 dengan isi "success: false" memaksa klien memeriksa dua tempat. Pakai 400, 404, 409, dan 500 sesuai artinya.'),
    card('3', 'Error Punya Bentuk Tetap', 'Satu format untuk semua error. RFC 9457 memberi standarnya.', { code: '{\n  "title": "Stok tidak cukup",\n  "status": 409,\n  "detail": "Sisa stok tinggal 2."\n}' }),
    card('4', 'Pagination Pakai Cursor', 'Untuk feed dan infinite scroll, ?after=abc lebih stabil daripada ?page=3. Data baru tidak membuat item muncul dua kali.'),
    card('5', 'Versi Sejak Hari Pertama', 'Aplikasi versi lama masih terpasang di ponsel pengguna berbulan-bulan. Mulai dari /v1 dan jangan hapus field tanpa naik versi.'),
    card('6', 'Tanggal dan Uang', 'Dua sumber bug klasik yang bisa dicegah dari sisi server.', { bullets: ['Tanggal: ISO 8601 dengan zona, misalnya 2026-11-28T09:00:00Z.', 'Uang: integer dalam satuan terkecil, jangan float.'] })
  ],

  'microservices-bukan-default': [
    card('teori', 'Microservices Bukan Pilihan Default', 'Tim lima orang dengan dua belas service tidak sedang meniru Netflix. Mereka sedang mengurus dua belas pipeline deploy.'),
    card('kenyataan', 'Panggilan Fungsi Jadi Panggilan Jaringan', 'Di monolith, memanggil modul lain butuh nanodetik dan tidak pernah timeout. Di microservices, setiap panggilan bisa lambat, gagal, atau dobel.'),
    card('biaya', 'Yang Tidak Ada di Diagram', 'Arsitektur di slide terlihat rapi. Biayanya muncul di operasional.', { bullets: ['Tracing lintas service untuk mencari satu bug.', 'Transaksi yang tersebar di tiga database.', 'Versi API antarservice yang harus dijaga.'] }),
    card('kapan', 'Kapan Microservices Masuk Akal', 'Saat masalahnya organisasi atau beban, bukan kode.', { bullets: ['Banyak tim saling menunggu untuk rilis.', 'Satu bagian butuh scale jauh lebih besar dari lainnya.', 'Kegagalan satu bagian tidak boleh menjatuhkan semuanya.'] }),
    card('jalan tengah', 'Modular Monolith', 'Satu deploy, tapi setiap modul punya pintu masuk sendiri dan tidak mengintip isi modul lain. Kalau nanti perlu dipecah, garisnya sudah tergambar.'),
    card('ingat', 'Pecah Saat Ada Alasan', 'Martin Fowler menyarankan mulai dari monolith karena batas service yang tepat baru terlihat setelah sistemnya dipakai. Pilih arsitektur untuk timmu hari ini.')
  ],

  'event-driven-satu-pesanan': [
    card('teori', 'Satu Pesanan, Lima Service, Nol Menunggu', 'Saat pengguna menekan "Bayar", ia hanya perlu tahu satu hal: pesanannya tercatat. Email, poin, dan notifikasi bisa menyusul.'),
    card('masalah', 'Kalau Semua Ditunggu', 'Checkout memanggil pembayaran, stok, email, poin, dan push secara berurutan. Server email lambat lima detik, pengguna ikut menunggu lima detik.'),
    card('ide', 'Simpan, Lalu Umumkan', 'Checkout hanya mengerjakan yang wajib, lalu mengirim satu event.', { code: 'await payments.charge(order)\nawait db.orders.insert(order)\nawait bus.publish("order.placed", e)\nreturn order.id' }),
    card('reaksi', 'Siapa pun Boleh Mendengar', 'Setiap layanan berlangganan event yang ia pedulikan, lalu bekerja sendiri.', { bullets: ['Email: kirim struk.', 'Loyalty: tambah poin.', 'Gudang: siapkan barang.'] }),
    card('bonus', 'Fitur Baru Tanpa Mengubah Checkout', 'Butuh kirim data ke analitik? Tambah consumer baru untuk order.placed. Fungsi checkout tidak disentuh sama sekali.'),
    card('hati-hati', 'Pesan Bisa Datang Dua Kali', 'Banyak broker mengantar pesan setidaknya sekali. Consumer harus aman menerima event yang sama berulang kali.', { code: 'if (await seen(e.eventId)) return\nawait points.add(e.userId, e.total)\nawait markSeen(e.eventId)' }),
    card('ingat', 'Longgar, Bukan Sederhana', 'Event-driven membuat layanan tidak saling mengikat. Gantinya, kamu harus siap dengan pesan dobel, urutan acak, dan data yang konsisten beberapa detik kemudian.')
  ],

  'piramida-testing-kartu': [
    card('teori', 'Kenapa Tes Unit Harus Paling Banyak', 'Tes end-to-end paling mirip pengguna sungguhan. Justru karena itu ia paling lambat, paling mahal, dan paling sering gagal tanpa alasan.'),
    card('bawah', 'Unit: Ribuan, Milidetik', 'Menguji satu fungsi tanpa jaringan dan database. Gagal di satu tempat yang jelas.', { code: 'test("gratis ongkir >200rb", () => {\n  const o = ongkir({ subtotal: 250e3 })\n  expect(o).toBe(0)\n})' }),
    card('tengah', 'Integration: Ratusan, Detik', 'Menguji sambungan: kode dengan database sungguhan, atau dua modul bersama. Menangkap query yang salah dan konfigurasi yang keliru.'),
    card('atas', 'End-to-End: Puluhan, Menit', 'Membuka aplikasi utuh dan mengklik seperti pengguna. Simpan untuk alur paling berharga: login, checkout, pembayaran.'),
    card('anti-pola', 'Kerucut Es Krim', 'Piramida terbalik: sedikit tes unit, banyak tes UI, banyak tes manual.', { bullets: ['CI lambat, developer berhenti menjalankannya.', 'Tes gagal acak, tim terbiasa menekan re-run.'] }),
    card('ingat', 'Uji di Lapisan Terendah', 'Saat menemukan bug, tulis tes di lapisan paling bawah yang masih bisa menangkapnya. Tes yang cepat lebih sering dijalankan, dan tes yang sering dijalankan lebih berguna.')
  ],

  'adr-satu-halaman': [
    card('tutorial', 'ADR: Satu Halaman, Satu Keputusan', '"Kenapa dulu kita pakai Redis untuk antrean?" Kalau jawabannya hanya ada di kepala orang yang sudah resign, timmu butuh ADR.'),
    card('apa', 'Architecture Decision Record', 'Format yang diusulkan Michael Nygard pada 2011: satu file Markdown pendek untuk setiap keputusan arsitektur penting, disimpan di repo.'),
    card('isi', 'Empat Bagian Saja', 'Judul bernomor, lalu:', { bullets: ['Status dan Konteks: situasi dan batasan saat itu.', 'Keputusan: "Kita akan memakai..."', 'Konsekuensi: yang jadi mudah dan yang jadi sulit.'] }),
    card('contoh', 'Seperti Ini Bentuknya', 'Cukup untuk dibaca dalam dua menit.', { code: '# 7. PostgreSQL untuk pesanan\nStatus: Diterima\n## Konteks\nButuh transaksi dan laporan.\n## Keputusan\nPakai PostgreSQL.' }),
    card('aturan', 'Jangan Diedit, Gantikan', 'Berubah pikiran? Tulis ADR baru. Status yang lama diubah jadi "Digantikan oleh ADR 12". Sejarahnya tetap utuh dan alasannya tetap bisa dibaca.'),
    card('mulai', 'ADR Pertamamu', 'Buat folder docs/adr di repo. File pertama: "0001: Kita mencatat keputusan arsitektur dengan ADR". Selesai, kamu sudah mulai.')
  ],

  'estimasi-selalu-meleset': [
    card('teori', 'Estimasimu Meleset. Itu Normal.', 'Hukum Hofstadter: semuanya selalu lebih lama dari perkiraan, bahkan setelah kamu memperhitungkan hukum ini. Yang bisa diperbaiki adalah cara berjanjinya.'),
    card('kenapa', 'Kita Membayangkan Hari yang Lancar', 'Saat mengestimasi, otak membayangkan skenario tanpa hambatan. Kahneman dan Tversky menyebutnya planning fallacy.'),
    card('yang lupa', 'Yang Tidak Masuk Hitungan', 'Menulis fungsinya cepat. Sisanya yang lama.', { bullets: ['Menunggu review dan revisi.', 'Integrasi dengan API dan data sungguhan.', 'Rapat, bug production, dan ganti konteks.'] }),
    card('90-90', 'Sembilan Puluh Persen Kedua', '90 persen pertama pekerjaan makan 90 persen waktu. 10 persen terakhir makan 90 persen lagi. "Hampir selesai" bisa bertahan berminggu-minggu.'),
    card('lebih jujur', 'Beri Rentang dan Asumsi', 'Satu angka terdengar pasti dan hampir selalu salah.', { bullets: ['"Tiga sampai delapan hari, paling mungkin lima."', '"Dengan asumsi API pembayaran siap Senin."'] }),
    card('ingat', 'Kabar Buruk Lebih Awal', 'Keterlambatan bisa diterima. Kejutan di hari terakhir tidak. Perbarui estimasi setiap minggu dan tawarkan pilihan: kurangi scope atau geser tanggal.')
  ]
};

export const noteBodies: Record<string, Full> = {
  'pr-kecil-review-jujur': {
    lead: 'Kenapa ukuran pull request menentukan kualitas review lebih dari siapa reviewer-nya.',
    sections: [
      { id: 'paradoks', title: 'Paradoks yang semua orang kenal', body: p(
        'Kirim PR berisi 40 baris, dan kamu akan mendapat sepuluh komentar: nama variabel, kasus null, saran memakai fungsi lain. Kirim PR berisi 2.000 baris, dan sering kali yang datang hanya satu komentar: "LGTM".',
        'Ini bukan karena PR besar lebih bagus. Ini karena reviewer manusia punya batas perhatian. Setelah beberapa ratus baris, mata mulai melompati kode. Reviewer yang jujur akan menunda karena butuh waktu khusus. Reviewer yang lelah akan menyetujui karena tidak sanggup membaca semuanya.'
      ) },
      { id: 'biaya-tersembunyi', title: 'Biaya PR besar tidak terlihat di hari merge', body: p(
        'PR besar terasa efisien bagi penulisnya: satu kali buka, satu kali review, satu kali merge. Biayanya baru muncul belakangan.',
        'Saat ada bug, sulit tahu bagian mana penyebabnya karena puluhan file berubah bersamaan. Revert jadi menakutkan karena ikut membuang fitur lain. Konflik merge menumpuk karena branch hidup terlalu lama. Dan pengetahuan tentang perubahan itu tetap hanya ada di satu kepala, karena tidak ada yang benar-benar membacanya.'
      ) },
      { id: 'cara-memecah', title: 'Cara memecah pekerjaan', body: p('Memecah PR adalah keterampilan, bukan bakat. Beberapa pola yang sering berhasil:') + ul(
        `${b('Refactor dulu, fitur kemudian.')} PR pertama hanya merapikan struktur tanpa mengubah perilaku. PR kedua menambah fitur di atas struktur yang sudah rapi.`,
        `${b('Lapisan demi lapisan.')} Model dan migrasi, lalu repository, lalu endpoint, lalu UI.`,
        `${b('Di balik feature flag.')} Kode baru boleh masuk ke main walau belum aktif untuk pengguna.`,
        `${b('Satu PR, satu kalimat.')} Kalau deskripsimu butuh kata "dan" tiga kali, kemungkinan itu tiga PR.`
      ) },
      { id: 'komentar', title: 'Review yang jujur juga soal cara berkomentar', body: p(
        `PR kecil memberi reviewer ruang untuk berpikir. Ruang itu sebaiknya dipakai dengan baik. Pisahkan komentar yang menghalangi merge dari yang sekadar selera, misalnya dengan awalan ${c('issue:')}, ${c('suggestion:')}, ${c('question:')}, dan ${c('nit:')}. Tulis alasannya, bukan hanya perintahnya.`,
        'Dan reviewer juga boleh berkata, "PR ini terlalu besar untuk di-review dengan teliti, bisa dipecah?" Kalimat itu terdengar merepotkan. Kenyataannya, itu bentuk review paling jujur yang bisa diberikan untuk PR raksasa.'
      ) },
      { id: 'mulai', title: 'Mulai dari kebiasaan tim', body: p(
        'Perubahan ini tidak bisa dilakukan satu orang. Sepakati bersama: target waktu respons review, batas ukuran yang dianggap wajar, dan kebiasaan menyetujui PR dengan catatan kecil alih-alih menahannya demi hal sepele.',
        'Ukurannya tidak perlu angka mutlak. Patokan sederhananya: PR yang bisa dibaca utuh dalam satu duduk, tanpa harus membuka catatan untuk mengingat apa yang ada di file pertama.'
      ) }
    ]
  },

  'refactor-bukan-rewrite': {
    lead: 'Refactoring yang benar hampir tidak terlihat dari luar. Kalau terlihat, ada yang salah.',
    sections: [
      { id: 'sprint-refactor', title: '"Sprint ini kita refactor dulu"', body: p(
        'Kalimat ini sering terdengar di tim yang lelah dengan kode lamanya. Rencananya terdengar masuk akal: berhenti menambah fitur selama dua minggu, rapikan semuanya, lalu kembali bekerja dengan kode yang bersih.',
        'Yang sering terjadi berbeda. Dua minggu menjadi empat. Branch refactor hidup terpisah dari main dan konfliknya menumpuk. Saat akhirnya di-merge, beberapa fitur lama rusak dengan cara yang tidak tertangkap tes. Manajemen menyimpulkan refactoring itu berbahaya, dan tim tidak diberi kesempatan lagi.'
      ) },
      { id: 'definisi', title: 'Definisi yang terlupakan', body: p(
        `Martin Fowler, dalam buku ${b('Refactoring')}, mendefinisikannya sebagai perubahan pada struktur internal software supaya lebih mudah dipahami dan lebih murah diubah, ${b('tanpa mengubah perilakunya yang terlihat')}.`,
        'Bagian terakhir itulah intinya. Refactoring adalah rangkaian transformasi kecil yang masing-masing menjaga perilaku: rename, extract function, inline variable, move method. Setiap langkah cukup kecil sehingga kecil juga kemungkinan salahnya. Yang dikerjakan tim di atas tadi lebih tepat disebut menulis ulang, dan menulis ulang punya risiko yang sangat berbeda.'
      ) },
      { id: 'jaring', title: 'Jaring pengamannya adalah tes', body: p(
        'Bagaimana kamu tahu perilakunya tidak berubah? Kamu tidak bisa tahu dengan membaca kode. Kamu hanya bisa tahu dengan menjalankan tes sebelum dan sesudah setiap langkah.',
        `Kalau kode lama belum punya tes, mulailah dengan ${b('characterization test')}: tes yang mencatat apa yang kode lakukan sekarang, bahkan kalau perilakunya terasa aneh. Tujuannya bukan membuktikan kodenya benar, tapi mendeteksi kalau kamu tidak sengaja mengubahnya.`
      ) + pre('test("member di atas 100rb dapat diskon", () => {\n  expect(total([{ price: 60000, qty: 2 }], true)).toBe(108000)\n})') },
      { id: 'ritme', title: 'Ritmenya: kecil, hijau, commit', body: p(
        'Refactoring yang aman punya ritme yang hampir membosankan. Satu perubahan kecil. Jalankan tes. Hijau, commit. Merah, kembalikan, lalu coba langkah yang lebih kecil.',
        `Aturan "merah berarti undo" terasa boros, tapi justru itu yang membuatnya cepat. Debugging di tengah refactor bisa memakan berjam-jam. Mengulang langkah lima menit hanya memakan lima menit. Dengan ${c('git restore .')} dan commit yang sering, kembali ke titik aman selalu murah.`
      ) },
      { id: 'kapan', title: 'Kapan sebaiknya dilakukan', body: p(
        'Kent Beck punya saran yang terkenal: buat perubahannya jadi mudah (bagian ini mungkin sulit), lalu lakukan perubahan yang mudah itu. Refactoring paling bernilai tepat sebelum kamu menambah fitur di area yang sama, bukan sebagai proyek terpisah.',
        'Dengan cara ini, refactoring tidak butuh izin khusus dan tidak butuh sprint sendiri. Ia menjadi bagian dari cara kerja harian, dipisah dalam commit tersendiri supaya reviewer bisa membacanya dengan cepat. Kode yang sering diubah jadi makin rapi. Kode yang tidak pernah disentuh dibiarkan, dan itu tidak apa-apa.'
      ) }
    ]
  },

  'utang-teknis-bukan-kode-jelek': {
    lead: 'Metafora Ward Cunningham lebih tajam dari cara kita biasa memakainya.',
    sections: [
      { id: 'asal', title: 'Dari mana istilah ini datang', body: p(
        'Pada 1992, Ward Cunningham menulis laporan pengalaman untuk konferensi OOPSLA tentang WyCash, sistem manajemen portofolio yang ia kerjakan. Ia butuh cara menjelaskan kepada orang keuangan kenapa tim perlu waktu untuk memperbaiki kode yang sudah berjalan.',
        'Metafora utang cocok untuk pendengar itu. Merilis kode pertama kali itu seperti berutang. Sedikit utang mempercepat pengembangan, asal segera dibayar dengan menulis ulang bagian itu. Bahayanya muncul saat utang tidak pernah dibayar: setiap menit yang dihabiskan untuk kode yang "belum benar" dihitung sebagai bunga.'
      ) },
      { id: 'salah-kaprah', title: 'Salah kaprah yang populer', body: p(
        'Di banyak tim, "utang teknis" kini berarti segala kode yang tidak disukai: nama yang buruk, fungsi 500 baris, tes yang tidak ada. Lebih buruk lagi, istilah ini kadang dipakai untuk membenarkan pekerjaan terburu-buru: "Tidak apa-apa, ini utang teknis, nanti kita bayar."',
        'Cunningham belakangan meluruskan hal ini. Yang ia maksud bukan menulis kode yang jelek dengan rencana memperbaikinya. Maksudnya adalah menulis kode yang mencerminkan pemahaman terbaikmu saat itu, merilisnya, lalu memperbaikinya ketika pemahamanmu tentang masalah bertambah. Kodenya harus cukup bersih supaya bisa diperbaiki nanti.'
      ) },
      { id: 'kuadran', title: 'Tidak semua utang sama', body: p(
        `Martin Fowler kemudian membuat kuadran yang membantu membedakannya. Ia bertanya dua hal: apakah utangnya diambil dengan sengaja, dan apakah diambil dengan hati-hati?`
      ) + ul(
        `${b('Sengaja dan hati-hati:')} "Kita rilis sekarang untuk mengejar demo, dan sudah tahu bagian mana yang harus dibereskan."`,
        `${b('Sengaja dan ceroboh:')} "Tidak ada waktu untuk desain."`,
        `${b('Tak sadar dan ceroboh:')} lahir dari tidak tahu praktik yang lebih baik.`,
        `${b('Tak sadar dan hati-hati:')} "Sekarang baru kita tahu seharusnya dibuat seperti apa." Ini tak terhindarkan, dan ini yang paling dekat dengan maksud Cunningham.`
      ) },
      { id: 'bunga', title: 'Lihat bunganya, bukan pokoknya', body: p(
        'Bagian paling berguna dari metafora ini adalah bunga. Pokok utang adalah biaya memperbaiki kodenya. Bunga adalah biaya tambahan yang kamu bayar setiap kali harus bekerja di sekitar kode itu.',
        'Konsekuensinya menarik: kode jelek yang tidak pernah disentuh hampir tidak berbunga. Modul berantakan yang berjalan stabil selama tiga tahun tanpa perubahan bukan prioritas. Sebaliknya, file yang diubah setiap minggu dan selalu memperlambat fitur baru adalah utang yang menagih setiap minggu. Riwayat git bisa menunjukkan file mana yang paling sering berubah, dan itu titik awal yang jauh lebih baik daripada perasaan.'
      ) },
      { id: 'membayar', title: 'Membayar dengan sengaja', body: p(
        'Utang yang tidak tercatat tidak bisa diprioritaskan. Catat saat mengambilnya: di mana, kenapa, dan apa gejalanya. Tulis dampaknya dalam bahasa yang dipahami orang di luar tim engineering, misalnya "setiap perubahan tarif butuh deploy dan memakan setengah hari", bukan "kodenya jelek".',
        'Lalu bayar dengan cara yang membosankan tapi konsisten: rapikan area yang sedang kamu kerjakan, sisihkan porsi kapasitas yang disepakati bersama, dan dahulukan utang dengan bunga tertinggi. Utang bukan dosa. Utang yang tidak dikelola yang jadi masalah.'
      ) }
    ]
  },

  'semver-adalah-janji': {
    lead: 'Tiga angka di versi library bukan soal umur atau ukuran rilis. Itu pesan untuk orang yang memakai kodemu.',
    sections: [
      { id: 'kalender', title: 'Ketika versi dipakai seperti kalender', body: p(
        'Banyak proyek menaikkan versi berdasarkan rasa. Rilis besar dengan banyak fitur? Naikkan ke 3.0, biar terlihat serius. Ada perubahan kecil yang ternyata menghapus parameter? Cukup 2.4.1, toh perubahannya hanya beberapa baris.',
        'Masalahnya, orang yang memakai library-mu tidak membaca kodemu setiap kali kamu merilis. Mereka membaca angkanya. Dan alat seperti npm, pub, atau Cargo mengambil keputusan upgrade otomatis berdasarkan angka itu juga.'
      ) },
      { id: 'janjinya', title: 'Apa yang sebenarnya dijanjikan', body: p(
        `Spesifikasi Semantic Versioning, yang ditulis Tom Preston-Werner, memberi setiap angka satu arti yang jelas. ${b('PATCH')} naik untuk perbaikan bug yang kompatibel. ${b('MINOR')} naik untuk fitur baru yang kompatibel. ${b('MAJOR')} naik untuk perubahan apa pun yang tidak kompatibel dengan API publik sebelumnya.`,
        `Kalimat kuncinya adalah "API publik". Semver hanya bermakna kalau kamu jelas tentang apa yang termasuk API publik. Fungsi yang diekspor jelas termasuk. Tapi bagaimana dengan bentuk error, urutan hasil, atau versi minimum Node yang didukung? Library yang baik menuliskannya.`
      ) },
      { id: 'hyrum', title: 'Hukum Hyrum dan batas janji', body: p(
        'Hyrum Wright merumuskan pengamatan yang terkenal: dengan cukup banyak pengguna, apa pun yang kamu janjikan di kontrak tidak lagi penting, karena semua perilaku yang bisa diamati akan diandalkan oleh seseorang.',
        'Artinya, bahkan PATCH bisa merusak kode orang lain. Seseorang mungkin mencocokkan teks pesan error. Seseorang mungkin bergantung pada urutan hasil yang kebetulan selalu sama. Semver tidak menghapus risiko ini. Yang bisa dilakukan semver adalah membuat janji eksplisit, sehingga jelas siapa yang melanggar kontrak saat sesuatu rusak.'
      ) },
      { id: 'nol', title: 'Terjebak di 0.x', body: p(
        `Spesifikasinya menyebut versi ${c('0.y.z')} untuk pengembangan awal: apa pun bisa berubah kapan saja. Karena itu npm memperlakukan ${c('^0.4.2')} lebih ketat, hanya mengizinkan sampai di bawah 0.5.0.`,
        'Masalahnya, sebagian proyek betah di 0.x selama bertahun-tahun meski sudah dipakai di production oleh banyak orang. Itu cara halus untuk menghindari komitmen. Begitu orang bergantung pada library-mu, merilis 1.0.0 adalah bentuk tanggung jawab: kamu menyatakan apa yang stabil dan berjanji memberi tahu saat itu berubah.'
      ) },
      { id: 'sopan', title: 'Merilis dengan sopan', body: ul(
        `Tandai fungsi sebagai deprecated di versi MINOR, beri waktu, lalu hapus di MAJOR berikutnya.`,
        `Tulis CHANGELOG yang dibaca manusia, dikelompokkan per jenis perubahan.`,
        `Setiap MAJOR disertai panduan migrasi, idealnya dengan contoh sebelum dan sesudah.`,
        `Di sisi pemakai: commit lockfile dan gunakan ${c('npm ci')} di CI supaya build bisa diulang persis.`
      ) + p('Nomor versi adalah bagian dari API-mu. Perlakukan dengan kehati-hatian yang sama.') }
    ]
  },

  'error-api-untuk-manusia': {
    lead: 'API diuji bukan saat semuanya lancar, tapi saat ada yang gagal dan seseorang harus mencari tahu kenapa.',
    sections: [
      { id: 'jam-dua', title: 'Bayangkan pembacanya', body: p(
        'Misalnya, sebuah aplikasi mobile tiba-tiba gagal checkout di production. Developer yang sedang on-call membuka log dan menemukan respons dari API-mu: status 200, isi ' + c('{"success": false, "message": "Error"}') + '.',
        'Tidak ada informasi apa yang gagal, kenapa, atau apakah aman untuk dicoba lagi. Developer itu sekarang harus menghubungi tim backend, yang mungkin sedang tidur. Desain error yang buruk tidak terlihat saat development. Ia terlihat di saat-saat seperti ini.'
      ) },
      { id: 'status', title: 'Status code adalah bagian dari pesan', body: p(
        'Klien HTTP, library jaringan, proxy, dan alat monitoring semuanya membaca status code. Kalau kegagalan dibungkus dalam 200 OK, semua alat itu menganggap request berhasil. Retry otomatis tidak jalan, grafik error tetap datar, dan bug tersembunyi lebih lama.',
        `Pakai status sesuai artinya. ${c('400')} untuk request yang salah bentuk, ${c('422')} untuk data yang tidak lolos validasi, ${c('401')} kalau belum login, ${c('403')} kalau tidak berhak, ${c('404')} kalau tidak ada, ${c('409')} untuk konflik seperti stok yang sudah habis, dan ${c('5xx')} hanya untuk kesalahan di server. Perbedaan 4xx dan 5xx sendiri sudah menjawab satu pertanyaan penting: salah siapa?`
      ) },
      { id: 'bentuk', title: 'Satu bentuk untuk semua error', body: p(
        `RFC 9457, Problem Details for HTTP APIs, memberi format standar yang dikirim dengan ${c('Content-Type: application/problem+json')}. Kamu tidak harus memakainya, tapi kamu harus memakai satu format yang sama di semua endpoint.`
      ) + pre('{\n  "type": "https://api.toko.id/errors/stok-habis",\n  "title": "Stok tidak cukup",\n  "status": 409,\n  "detail": "Sisa stok SKU-881 tinggal 2, diminta 5.",\n  "sku": "SKU-881",\n  "available": 2\n}') + p(
        `${c('type')} dan field tambahan untuk dibaca kode, sehingga aplikasi bisa menampilkan "Sisa 2, ubah jumlah?" alih-alih pesan generik. ${c('title')} dan ${c('detail')} untuk dibaca manusia di log.`
      ) },
      { id: 'konteks', title: 'Detail yang menyelamatkan waktu', body: ul(
        `${b('Sertakan request ID')} di header respons, supaya keluhan pengguna bisa dicocokkan dengan log server dalam hitungan detik.`,
        `${b('Untuk validasi, sebut field-nya.')} "email tidak valid" lebih berguna daripada "input tidak valid".`,
        `${b('Jangan bocorkan stack trace')} ke klien. Simpan di log, kirim request ID-nya.`,
        `${b('Tandai yang boleh di-retry.')} Untuk 503 atau 429, header ${c('Retry-After')} memberi tahu kapan mencoba lagi.`
      ) },
      { id: 'diuji', title: 'Uji jalur gagalnya juga', body: p(
        'Kebanyakan tes API memeriksa jalur sukses. Tambahkan tes untuk setiap jenis error yang kamu janjikan: status code-nya benar, bentuk body-nya sesuai, dan field penting ada.',
        'Dan sesekali, baca log errormu seperti orang luar. Kalau kamu sendiri butuh membuka kode untuk memahami sebuah pesan error, developer lain yang memakai API-mu pasti juga butuh. Pesan error yang baik adalah dokumentasi yang muncul tepat saat dibutuhkan.'
      ) }
    ]
  },

  'mulai-dari-monolith': {
    lead: 'Memecah sistem itu mudah. Tahu di mana garis pemisahnya yang sulit.',
    sections: [
      { id: 'godaan', title: 'Godaan memulai dengan microservices', body: p(
        'Proyek baru, tim lima orang, dan diagram arsitektur pertama sudah berisi sepuluh kotak: user-service, order-service, payment-service, notification-service, dan seterusnya. Rasanya modern dan siap untuk skala besar.',
        'Enam bulan kemudian, setiap fitur menyentuh tiga service. Satu perubahan butuh tiga PR, tiga deploy, dan urutan rilis yang harus diatur hati-hati. Debugging berarti membuka log dari empat tempat. Tim kecil itu menghabiskan sebagian besar waktunya untuk mengurus infrastruktur, bukan produk.'
      ) },
      { id: 'garis', title: 'Masalahnya adalah garis yang salah', body: p(
        'Microservices yang baik membagi sistem di sepanjang batas yang jarang dilintasi: bagian yang bisa berubah tanpa mengganggu bagian lain. Batas seperti itu sulit ditebak di hari pertama, saat kamu belum tahu bagaimana produknya akan dipakai dan fitur apa yang akan diminta.',
        'Di monolith, garis yang salah itu murah diperbaiki: pindahkan beberapa file, ubah impor, selesai. Di microservices, garis yang salah berarti mengubah kontrak API, memindahkan data antar database, dan mengoordinasikan rilis beberapa service. Martin Fowler menyebut pendekatan sebaliknya MonolithFirst: bangun monolith dulu, pecah setelah batasnya terlihat.'
      ) },
      { id: 'jaringan', title: 'Jaringan bukan pemanggilan fungsi', body: p(
        'Ada daftar terkenal bernama Fallacies of Distributed Computing, dirumuskan para engineer Sun Microsystems pada tahun 1990-an. Di antaranya: menganggap jaringan selalu andal, latensi nol, dan bandwidth tak terbatas.',
        'Setiap kali sebuah pemanggilan fungsi diganti menjadi panggilan HTTP, kamu mewarisi semua masalah itu. Kamu butuh timeout, retry, penanganan respons yang terlambat, dan cara menjaga konsistensi data tanpa transaksi database tunggal. Semua itu bisa diselesaikan, tapi tidak gratis.'
      ) },
      { id: 'modular', title: 'Monolith yang rapi, bukan bola lumpur', body: p(
        'Membela monolith bukan berarti membela kode yang semua bagiannya saling mengimpor. Targetnya adalah modular monolith: satu aplikasi dan satu deploy, tapi dengan modul yang punya batas jelas.'
      ) + ul(
        'Setiap modul punya satu pintu masuk publik. Isinya yang lain dianggap privat.',
        'Modul tidak membaca tabel milik modul lain secara langsung.',
        'Aturan impor ditegakkan otomatis lewat linter atau alat pengecek dependensi.'
      ) + p('Kalau suatu hari satu modul memang perlu menjadi service sendiri, garisnya sudah tergambar dan pemisahannya jauh lebih murah.') },
      { id: 'sinyal', title: 'Kapan saatnya memecah', body: p(
        'Alasan yang kuat hampir selalu datang dari organisasi atau beban kerja. Banyak tim yang saling menunggu untuk rilis. Satu bagian butuh scale yang jauh berbeda dari sisanya. Kegagalan satu fitur tidak boleh menjatuhkan checkout. Hukum Conway juga berlaku di sini: struktur sistem cenderung mengikuti struktur komunikasi tim.',
        'Kalau sinyal itu belum ada, monolith yang rapi hampir selalu membuat tim kecil bergerak lebih cepat. Arsitektur yang tepat adalah yang cocok dengan timmu hari ini, dengan pintu yang tetap terbuka untuk timmu tahun depan.'
      ) }
    ]
  },

  'antrian-dan-idempotensi': {
    lead: 'Queue membuat sistem lebih tahan banting, dengan satu syarat yang sering dilupakan.',
    sections: [
      { id: 'kenapa-queue', title: 'Kenapa memakai queue', body: p(
        'Misalnya, sebuah toko online memproses checkout dengan enam panggilan berurutan: pembayaran, simpan pesanan, kurangi stok, kirim email, tambah poin, kirim push notification. Kalau layanan email lambat, pengguna menunggu. Kalau layanan poin mati, checkout gagal walau pembayaran sudah berhasil.',
        `Dengan message queue, checkout cukup menyimpan pesanan lalu menerbitkan event ${c('order.placed')}. Email, poin, dan notifikasi menjadi consumer yang bekerja sendiri-sendiri. Pengguna langsung melihat "Pesanan berhasil", dan layanan yang lambat tidak lagi menyandera yang lain.`
      ) },
      { id: 'dua-kali', title: 'Pesan akan datang dua kali', body: p(
        `Di sinilah kejutannya. Kebanyakan sistem pesan seperti RabbitMQ, Kafka, atau SQS standar memberi jaminan ${b('at-least-once')}: pesan pasti sampai, tapi bisa lebih dari sekali.`,
        'Penyebabnya wajar. Consumer memproses pesan, lalu mati sebelum sempat mengirim konfirmasi ke broker. Broker tidak tahu pesannya sudah diproses, jadi ia mengirim ulang. Dari sudut pandang broker, itu perilaku yang benar. Dari sudut pandang consumer poin, pengguna baru saja mendapat poin dua kali.'
      ) },
      { id: 'idempoten', title: 'Consumer harus idempoten', body: p(
        'Idempoten artinya menjalankan hal yang sama berkali-kali menghasilkan efek yang sama dengan menjalankannya sekali. Cara paling umum: setiap event membawa ID unik, dan consumer mencatat ID yang sudah diproses.'
      ) + pre('async function onOrderPlaced(e: OrderPlaced) {\n  await db.transaction(async (tx) => {\n    const inserted = await tx.processed.insertIfAbsent(e.eventId)\n    if (!inserted) return // sudah pernah diproses\n    await tx.points.add(e.userId, e.total)\n  })\n}') + p(
        'Perhatikan bahwa pencatatan ID dan penambahan poin terjadi dalam satu transaksi. Kalau dipisah, consumer bisa mati di antara keduanya dan masalahnya kembali. Untuk sebagian operasi, idempotensi bisa datang dari desainnya sendiri, misalnya "set status menjadi DIKIRIM" yang aman diulang, berbeda dengan "tambah 100 poin".'
      ) },
      { id: 'outbox', title: 'Masalah di sisi pengirim', body: p(
        'Ada jebakan lain di producer. Checkout menyimpan pesanan ke database, lalu mengirim event ke broker. Bagaimana kalau database berhasil tapi pengiriman ke broker gagal? Pesanan ada, tapi tidak ada yang tahu. Tidak ada email, tidak ada poin.',
        `Pola yang sering dipakai adalah ${b('transactional outbox')}: event ditulis ke tabel outbox di database yang sama, dalam transaksi yang sama dengan pesanan. Proses terpisah membaca tabel itu dan mengirimkannya ke broker. Event tidak lagi bisa hilang. Konsekuensinya, event bisa terkirim dua kali, yang berarti idempotensi di consumer tetap wajib.`
      ) },
      { id: 'lainnya', title: 'Yang juga perlu disiapkan', body: ul(
        `${b('Urutan tidak selalu terjaga')} di banyak konfigurasi. Event "pesanan dibatalkan" bisa diproses sebelum "pesanan dibuat".`,
        `${b('Dead letter queue')} untuk pesan yang selalu gagal, supaya satu pesan rusak tidak memblokir antrean selamanya.`,
        `${b('Eventual consistency')}: poin baru muncul beberapa detik setelah pesanan. Desain UI-nya supaya pengguna tidak bingung.`
      ) + p('Queue tidak membuat sistem lebih sederhana. Ia memindahkan kerumitan dari "semua harus berhasil bersamaan" menjadi "setiap bagian harus siap dengan kenyataan jaringan". Pertukaran itu sering sepadan, asal dilakukan dengan sadar.') }
    ]
  },

  'tes-e2e-yang-flaky': {
    lead: 'Begitu tim terbiasa menekan "re-run", tes itu berhenti memberi informasi.',
    sections: [
      { id: 'rerun', title: 'Kebiasaan menekan re-run', body: p(
        'Misalnya, sebuah tim punya tiga ratus tes end-to-end yang membuka aplikasi, login, dan mengklik setiap layar. Awalnya terasa aman. Lalu CI mulai butuh empat puluh menit. Beberapa tes gagal sesekali karena animasi belum selesai atau server staging lambat.',
        'Tim mulai menekan "re-run" setiap kali ada yang merah. Biasanya hijau di percobaan kedua. Beberapa bulan kemudian, saat sebuah tes gagal karena bug sungguhan, tidak ada yang curiga. Semua orang menekan re-run, kebetulan hijau, dan bugnya sampai ke production.'
      ) },
      { id: 'piramida', title: 'Gambar yang menjelaskan masalahnya', body: p(
        `Mike Cohn mempopulerkan ${b('piramida testing')} dalam buku Succeeding with Agile (2009). Lapisan bawah yang lebar berisi tes unit: banyak, cepat, dan stabil. Di tengah, tes integration yang menguji sambungan antarbagian. Di puncak yang sempit, sedikit tes end-to-end yang menguji aplikasi utuh.`,
        'Bentuk ini bukan soal mana yang lebih penting. Semua lapisan berguna. Bentuk ini soal biaya: makin tinggi lapisannya, makin lambat dijalankan, makin mahal dirawat, dan makin banyak bagian bergerak yang bisa gagal tanpa ada hubungannya dengan kodemu.'
      ) },
      { id: 'kenapa-flaky', title: 'Kenapa tes besar cenderung flaky', body: p('Tes end-to-end bergantung pada banyak hal sekaligus, dan setiap ketergantungan adalah sumber kegagalan acak:') + ul(
        'Waktu: animasi, loading, dan timeout yang berbeda di setiap mesin.',
        'Jaringan: server staging yang lambat atau sedang di-deploy.',
        'Data: tes lain yang mengubah data yang sama.',
        'Urutan: tes yang diam-diam bergantung pada tes sebelumnya.'
      ) + p('Tes unit hampir tidak punya ketergantungan semacam itu. Ia menguji satu fungsi dengan input tetap dan hasil yang bisa ditebak.') },
      { id: 'serendah', title: 'Uji di lapisan serendah mungkin', body: p(
        'Prinsip praktisnya sederhana: setiap perilaku diuji di lapisan paling bawah yang masih bisa menangkap kesalahannya. Perhitungan diskon cukup diuji dengan tes unit. Query yang salah join butuh tes integration dengan database sungguhan. Hanya alur yang memang melibatkan semuanya, seperti login sampai checkout, yang layak diuji end-to-end.'
      ) + pre('test("diskon member 10 persen di atas 100rb", () => {\n  expect(total([{ price: 60000, qty: 2 }], true)).toBe(108000)\n})') + p('Tes seperti ini jalan dalam milidetik dan tidak pernah gagal karena animasi.') },
      { id: 'konteks', title: 'Piramida, trofi, atau bentuk lain', body: p(
        'Piramida adalah heuristik, bukan hukum. Kent C. Dodds mengusulkan Testing Trophy yang memberi porsi besar pada tes integration, terutama untuk aplikasi frontend. Untuk aplikasi yang isinya kebanyakan CRUD, tes integration memang sering lebih bernilai daripada ratusan tes unit kecil.',
        'Yang tetap berlaku di semua bentuk: kamu ingin umpan balik yang cepat dan bisa dipercaya. Tes yang kadang gagal tanpa alasan merusak kepercayaan itu. Perbaiki atau hapus. Tes yang tidak dipercaya lebih buruk daripada tidak ada tes, karena ia memberi rasa aman yang palsu.'
      ) }
    ]
  },

  'dokumentasi-yang-dibaca': {
    lead: 'ADR berhasil karena ia tidak berusaha selalu benar. Ia hanya berusaha jujur tentang satu momen.',
    sections: [
      { id: 'wiki', title: 'Kuburan bernama wiki', body: p(
        'Hampir setiap tim punya wiki yang penuh halaman "Arsitektur Sistem", "Panduan Backend", dan "Desain Database". Sebagian besar terakhir diubah bertahun-tahun lalu. Diagramnya menunjukkan service yang sudah tidak ada. Orang baru membacanya, lalu diberi tahu, "Jangan percaya itu, sudah tidak relevan."',
        'Masalahnya bukan malas. Dokumen yang berusaha menggambarkan seluruh sistem saat ini akan basi begitu sistemnya berubah, dan sistem berubah setiap minggu. Tidak ada yang punya waktu untuk terus memperbaruinya.'
      ) },
      { id: 'adr', title: 'Dokumen yang tidak perlu diperbarui', body: p(
        `Pada 2011, Michael Nygard menulis tentang ${b('Architecture Decision Records')}. Idenya: alih-alih mendokumentasikan sistem, dokumentasikan keputusan. Satu file pendek per keputusan penting, berisi status, konteks, keputusan, dan konsekuensinya.`,
        'Perbedaannya halus tapi menentukan. Sebuah ADR tidak mengklaim "beginilah sistemnya". Ia mengklaim "inilah yang tim putuskan pada tanggal ini, dengan informasi ini". Klaim itu tetap benar selamanya, bahkan setelah keputusannya diganti. ADR tidak bisa basi, karena ia memang catatan sejarah.'
      ) },
      { id: 'konteks', title: 'Bagian paling berharga adalah konteks', body: p(
        'Keputusan "kita memakai PostgreSQL" bisa dibaca dari kode. Yang tidak bisa dibaca dari kode adalah alasannya: pesanan butuh transaksi, tim sudah terbiasa dengan SQL, dan opsi lain sudah dipertimbangkan lalu ditolak.',
        'Konteks inilah yang mencegah dua kesalahan klasik. Pertama, membalik keputusan lama tanpa tahu alasannya, lalu menemukan masalah yang dulu sudah dihindari. Kedua, mempertahankan keputusan lama setelah alasannya hilang. Kalau konteksnya tertulis, siapa pun bisa menilai apakah konteks itu masih berlaku.'
      ) },
      { id: 'cara', title: 'Cara memulainya', body: ul(
        `Buat folder ${c('docs/adr/')} di repo, dekat dengan kode.`,
        `Tulis dalam Markdown dengan nomor urut: ${c('0001-catat-keputusan-dengan-adr.md')}.`,
        'Review ADR lewat pull request, seperti kode.',
        'Jangan edit ADR yang sudah diterima. Tulis yang baru dan ubah status lama menjadi "Digantikan oleh".',
        'Catat juga keputusan yang ditolak, supaya ide yang sama tidak diusulkan ulang tanpa alasan baru.'
      ) },
      { id: 'prinsip', title: 'Pelajaran untuk dokumentasi lain', body: p(
        'ADR mengajarkan sesuatu yang berlaku untuk semua dokumentasi teknis. Dokumen yang dibaca orang itu pendek, punya satu tujuan, punya tanggal, dan tinggal di tempat orang memang bekerja.',
        'README yang menjelaskan cara menjalankan proyek dalam lima perintah lebih sering dibaca daripada panduan 30 halaman. Komentar yang menjelaskan kenapa sebuah angka dipilih lebih berguna daripada diagram yang menjelaskan semuanya. Tulis lebih sedikit, tulis lebih dekat dengan kode, dan beri tanggal supaya pembaca tahu seberapa jauh harus mempercayainya.'
      ) }
    ]
  },

  'estimasi-sebagai-rentang': {
    lead: '"Kira-kira berapa lama?" adalah pertanyaan yang adil. Masalahnya ada di bentuk jawabannya.',
    sections: [
      { id: 'tiga-hari', title: 'Tiga hari yang menjadi tiga minggu', body: p(
        'Seorang product manager bertanya, "Fitur ekspor PDF kira-kira berapa lama?" Developer berpikir sebentar: buat endpoint, pakai library PDF, tambah tombol. "Tiga hari."',
        'Tiga hari itu dicatat. Masuk ke rencana rilis. Disampaikan ke klien. Lalu ternyata library PDF tidak mendukung font yang dipakai, laporan besar membuat server kehabisan memori, dan desain tombolnya belum final. Tiga minggu kemudian fiturnya rilis, dan semua orang merasa kecewa, termasuk developer yang sebenarnya bekerja keras.'
      ) },
      { id: 'hofstadter', title: 'Hukum yang menertawakan dirinya sendiri', body: p(
        `Douglas Hofstadter, dalam ${b('Gödel, Escher, Bach')} (1979), merumuskan hukum yang terkenal: semuanya selalu lebih lama dari perkiraan, bahkan setelah kamu memperhitungkan Hukum Hofstadter.`,
        'Kalimat itu lucu karena benar. Di tahun yang sama, Daniel Kahneman dan Amos Tversky memberi nama pada kecenderungan ini: planning fallacy. Saat merencanakan, kita membayangkan skenario yang lancar dan menilai dari rencana itu sendiri, bukan dari pengalaman pekerjaan serupa yang dulu juga meleset. Mengetahui bias ini tidak otomatis menghilangkannya.'
      ) },
      { id: 'satu-angka', title: 'Masalahnya ada di satu angka', body: p(
        'Estimasi adalah perkiraan di tengah ketidakpastian. Satu angka menyembunyikan ketidakpastian itu. "Tiga hari" terdengar seperti fakta, dan dalam beberapa jam berubah menjadi janji yang dipegang orang lain.',
        `Jawaban yang lebih jujur berbentuk rentang dengan asumsi: ${b('"Tiga sampai sepuluh hari, paling mungkin lima, dengan asumsi library PDF-nya mendukung font kita. Besok sore ada kabar lagi setelah bagian itu dicoba."')}`,
        'Rentang lebar di awal itu wajar. Steve McConnell mempopulerkan gambarnya sebagai cone of uncertainty: ketidakpastian besar di awal proyek dan menyempit seiring keputusan diambil dan risiko diuji.'
      ) },
      { id: 'teknik', title: 'Cara merencanakan tanpa ramalan', body: ul(
        `${b('Kurangi ketidakpastian dulu.')} Spike setengah hari untuk mencoba bagian paling berisiko sering lebih berharga daripada rapat estimasi dua jam.`,
        `${b('Pecah sampai kecil.')} Tugas yang lebih dari beberapa hari biasanya menyembunyikan tugas lain.`,
        `${b('Pakai data masa lalu.')} Berapa lama pekerjaan mirip benar-benar berjalan? Berapa tiket yang biasanya selesai per minggu?`,
        `${b('Pisahkan estimasi dari target.')} Bisnis boleh punya tanggal yang diinginkan. Estimasi tidak boleh ditawar supaya cocok dengan tanggal itu.`
      ) },
      { id: 'komunikasi', title: 'Kabar buruk, disampaikan lebih awal', body: p(
        'Estimasi akan tetap meleset. Yang bisa dikendalikan adalah kapan orang lain mengetahuinya. Keterlambatan yang dikabarkan di minggu pertama memberi waktu untuk mengurangi scope, menggeser tanggal, atau menambah bantuan. Keterlambatan yang baru ketahuan di hari terakhir tidak memberi pilihan apa pun.',
        'Perbarui perkiraan secara rutin, sebut asumsi yang berubah, dan saat harus memotong, potong fitur, bukan tes dan review. Tim yang dipercaya bukan tim yang estimasinya selalu tepat. Tim yang dipercaya adalah tim yang tidak pernah membuat orang lain kaget.'
      ) }
    ]
  }
};
