// Pack "fondasi": slides, cards and article bodies. Loaded on demand.
import type { DeckSlide, PostSlide } from '../../data';
import { p, ul, pre, c, b, type Full } from '../../blog-html';

const card = (label: string, title: string, body: string, extra: Partial<PostSlide> = {}): PostSlide =>
  ({ num: '', label, title, body, theme: 'white', ...extra });

/* ───────────────────────── decks ───────────────────────── */

export const deckSlides: Record<string, DeckSlide[]> = {
  'array-vs-linked-list': [
    { layout: 'cover', subtitle: 'Struktur data dari sudut pandang memori', title: 'Array vs Linked List', message: 'Dua cara menyimpan daftar. Bedanya bukan cuma di Big-O, tapi di mana datanya duduk di RAM.', points: ['Array: berjejer rapat.', 'Linked list: tersebar, disambung pointer.'] },
    { layout: 'bullets', subtitle: 'Bentuk 1', title: 'Array: Satu Blok Bersebelahan', message: 'Semua elemen disimpan berurutan dalam satu potongan memori.', points: ['Alamat elemen ke-i = alamat awal + i × ukuran elemen.', 'Karena itu akses lewat indeks O(1): cukup satu perhitungan.', 'Sisip di tengah O(n): elemen di belakangnya harus digeser.', 'Array dinamis (ArrayList, array JS) menyalin ke blok lebih besar saat penuh.'] },
    { layout: 'bullets', subtitle: 'Bentuk 2', title: 'Linked List: Node dan Pointer', message: 'Setiap elemen adalah node terpisah yang menyimpan nilai dan alamat node berikutnya.', points: ['Node bisa berada di mana saja di memori.', 'Akses elemen ke-i O(n): harus berjalan dari kepala.', 'Sisip atau hapus O(1), asalkan kamu sudah memegang node-nya.', 'Setiap node membawa pointer tambahan, jadi makan memori lebih banyak.'] },
    { layout: 'split', subtitle: 'Di atas kertas', title: 'Kelemahannya', leftTitle: 'Linked list unggul', leftPoints: ['Sisip dan hapus di tengah tanpa menggeser.', 'Tidak perlu menyalin saat tumbuh.', 'Cocok untuk antrean dengan dua ujung.'], rightTitle: 'Tapi sering kalah', rightPoints: ['Mencari posisi sisip tetap O(n).', 'Setiap lompatan pointer bisa cache miss.', 'Overhead pointer per elemen.'] },
    { layout: 'cards', subtitle: 'Yang dilupakan Big-O', title: 'CPU Membaca per Potongan', message: 'CPU tidak mengambil satu angka dari RAM. Ia mengambil satu cache line sekaligus, umumnya 64 byte.', cards: [{ title: 'Cache line', desc: 'Membaca elemen ke-0 ikut membawa beberapa elemen sesudahnya.', icon: '1' }, { title: 'Prefetch', desc: 'CPU menebak pola akses berurutan dan mengambil data lebih dulu.', icon: '2' }, { title: 'Cache miss', desc: 'Lompat ke alamat acak berarti menunggu RAM yang jauh lebih lambat.', icon: '!' }, { title: 'Akibatnya', desc: 'Loop di array mulus. Loop di linked list tersendat di tiap node.', icon: '→' }] },
    { layout: 'code', subtitle: 'Contoh di Kotlin', title: 'get(i) yang Terlihat Sama', message: 'Interfacenya identik, biayanya tidak. Di LinkedList, get(i) berjalan dari ujung list.', code: `val a = ArrayList<Int>()
val l = java.util.LinkedList<Int>()
repeat(100_000) { a.add(it); l.add(it) }

// O(n) total: tiap get langsung ke alamatnya
for (i in a.indices) a[i]

// O(n²) total: tiap get berjalan dari ujung
for (i in l.indices) l[i]`, points: ['Loop for-each di LinkedList tetap O(n).', 'Masalahnya muncul saat kode memperlakukannya seperti array.'] },
    { layout: 'bullets', subtitle: 'Bukan berarti tidak berguna', title: 'Kapan Linked List Masuk Akal', message: 'Ia tetap punya tempat, hanya lebih sempit dari yang diajarkan.', points: ['Kamu sudah memegang node-nya, misalnya LRU cache yang memindah node ke depan.', 'Sisip dan hapus di kedua ujung sangat sering.', 'Elemennya besar dan mahal disalin.', 'Struktur data persisten di bahasa fungsional.'] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'Big-O menghitung langkah. Mesin menghitung juga di mana langkah itu terjadi.', points: ['Default-kan ke array atau ArrayList.', 'Data yang berdekatan di memori diproses jauh lebih cepat.', 'Ragu? Ukur dengan data seukuran production, jangan menebak.'] }
  ],

  'cara-kerja-hash-map': [
    { layout: 'cover', subtitle: 'Struktur data yang kamu pakai setiap hari', title: 'Hash Map: Di Balik Lookup O(1)', message: 'Map di TypeScript, HashMap di Kotlin, dictionary di Python. Mekanismenya sama, dan sederhana.', points: ['Key diubah menjadi angka.', 'Angka itu menunjuk ke laci.'] },
    { layout: 'bullets', subtitle: 'Ide dasarnya', title: 'Key, Hash, Bucket', message: 'Hash map adalah array biasa dengan cara cerdas memilih indeks.', points: ['Fungsi hash mengubah key menjadi bilangan bulat.', 'Bilangan itu dimodulo panjang array: hasilnya indeks bucket.', 'Simpan dan cari sama-sama langsung ke bucket itu.', 'Tidak ada pencarian satu per satu, selama bucket-nya pendek.'] },
    { layout: 'code', subtitle: 'Versi mainan', title: 'Fungsi Hash Sederhana', message: 'Bukan untuk production, tapi cukup untuk melihat idenya.', code: `function hash(key: string, size: number) {
  let h = 0
  for (const ch of key) {
    h = (h * 31 + ch.charCodeAt(0)) >>> 0
  }
  return h % size
}

hash("budi", 16) // selalu indeks yang sama
hash("andi", 16) // kemungkinan indeks lain`, points: ['Key sama harus selalu menghasilkan hash sama.', 'Key berbeda sebaiknya tersebar merata.'] },
    { layout: 'cards', subtitle: 'Tak terhindarkan', title: 'Saat Dua Key Bertabrakan', message: 'Key tidak terbatas, bucket terbatas. Tabrakan pasti terjadi, jadi harus ada strategi.', cards: [{ title: 'Chaining', desc: 'Setiap bucket menyimpan daftar kecil. Tabrakan masuk ke daftar itu.', icon: '1' }, { title: 'Open addressing', desc: 'Bucket penuh? Coba bucket berikutnya sampai menemukan yang kosong.', icon: '2' }, { title: 'Bandingkan key', desc: 'Di bucket yang sama, key tetap dicek satu per satu dengan equals.', icon: '=' }, { title: 'Tree bucket', desc: 'Sejak Java 8, bucket HashMap yang terlalu panjang diubah jadi tree.', icon: 'T' }] },
    { layout: 'bullets', subtitle: 'Supaya bucket tetap pendek', title: 'Load Factor dan Resize', message: 'Semakin penuh tabelnya, semakin sering tabrakan.', points: ['Load factor = jumlah entri dibagi jumlah bucket.', 'HashMap Java memakai batas default 0,75.', 'Lewat batas itu, tabel diperbesar dan semua entri di-hash ulang.', 'Resize itu O(n), tapi jarang. Rata-ratanya tetap O(1).'] },
    { layout: 'split', subtitle: 'Kontrak yang wajib dijaga', title: 'Kalau dilanggar', leftTitle: 'equals dan hashCode', leftPoints: ['Objek yang equals harus punya hashCode sama.', 'hashCode boleh sama untuk objek berbeda.', 'data class Kotlin membuatkan keduanya.'], rightTitle: 'Key hilang di map', rightPoints: ['Data ada, tapi get() mengembalikan null.', 'contains() bilang false untuk objek yang sama.', 'Bug ini nyaris tidak terlihat di review.'] },
    { layout: 'code', subtitle: 'Jebakan klasik', title: 'Key yang Berubah Setelah Disimpan', message: 'Hash dihitung saat insert. Kalau isi key berubah, map mencarinya di bucket yang salah.', code: `data class Titik(var x: Int, var y: Int)

val set = hashSetOf(Titik(1, 2))
val t = set.first()
t.x = 9

println(set.contains(t)) // false
println(set.size)        // 1`, points: ['Pakai val dan objek immutable sebagai key.', 'String dan angka aman karena immutable.'] },
    { layout: 'bullets', subtitle: 'Kasus terburuk', title: 'Ketika O(1) Menjadi O(n)', message: 'Kalau semua key jatuh ke bucket yang sama, hash map berubah jadi daftar panjang.', points: ['Fungsi hash buruk: misalnya hanya memakai panjang string.', 'Hash flooding: penyerang mengirim key yang sengaja bertabrakan.', 'Karena itu banyak bahasa mengacak seed fungsi hash per proses.'] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'O(1) adalah janji rata-rata, bukan jaminan setiap operasi.', points: ['Hash map = array + fungsi hash + strategi tabrakan.', 'Key harus immutable dengan equals dan hashCode yang konsisten.', 'Urutan iterasi HashMap tidak pasti. Butuh urutan? Pakai LinkedHashMap.'] }
  ],

  'rekursi-tanpa-pusing': [
    { layout: 'cover', subtitle: 'Fungsi yang memanggil dirinya sendiri', title: 'Rekursi Tanpa Pusing', message: 'Rekursi bukan sulap. Ia hanya tumpukan pemanggilan fungsi yang menunggu giliran selesai.', points: ['Dua bagian wajib.', 'Satu batas yang sering dilupakan: ukuran stack.'] },
    { layout: 'bullets', subtitle: 'Anatomi', title: 'Dua Bagian Wajib', message: 'Setiap fungsi rekursif yang benar punya keduanya.', points: ['Base case: kondisi berhenti yang langsung mengembalikan jawaban.', 'Langkah rekursif: memanggil diri sendiri dengan masalah yang lebih kecil.', '"Lebih kecil" harus benar-benar menuju base case.', 'Tanpa salah satunya, fungsi tidak pernah selesai.'] },
    { layout: 'code', subtitle: 'Contoh paling klasik', title: 'Faktorial', message: '5! = 5 × 4 × 3 × 2 × 1. Atau: 5 × 4!. Definisi itu sendiri sudah rekursif.', code: `function faktorial(n: number): number {
  if (n <= 1) return 1        // base case
  return n * faktorial(n - 1) // lebih kecil
}

faktorial(5) // 120`, points: ['n turun satu setiap panggilan.', 'Di n = 1, rantainya berhenti.'] },
    { layout: 'bullets', subtitle: 'Yang sebenarnya terjadi', title: 'Call Stack faktorial(3)', message: 'Setiap panggilan mendapat frame sendiri di stack: parameter, variabel lokal, dan alamat kembali.', points: ['Turun: faktorial(3) menunggu faktorial(2), yang menunggu faktorial(1).', 'faktorial(1) mengembalikan 1. Frame-nya dibuang.', 'Naik: faktorial(2) = 2 × 1 = 2, lalu faktorial(3) = 3 × 2 = 6.', 'Kedalaman stack = jumlah panggilan yang belum selesai.'] },
    { layout: 'split', subtitle: 'Saat stack habis', title: 'Pencegahannya', leftTitle: 'Stack overflow', leftPoints: ['Ukuran stack terbatas, jauh lebih kecil dari heap.', 'JS: RangeError, Maximum call stack size exceeded.', 'Kotlin/JVM: StackOverflowError.'], rightTitle: 'Cara menghindari', rightPoints: ['Pastikan base case pasti tercapai.', 'Data sangat dalam? Ubah jadi loop.', 'Pakai stack buatan sendiri di heap.'] },
    { layout: 'code', subtitle: 'Kotlin punya jalan pintas', title: 'tailrec: Rekursi Jadi Loop', message: 'Jika panggilan rekursif adalah langkah terakhir, compiler Kotlin bisa mengubahnya menjadi loop.', code: `tailrec fun faktorial(n: Long, acc: Long = 1): Long =
  if (n <= 1) acc
  else faktorial(n - 1, acc * n)

faktorial(20) // 2432902008176640000`, points: ['Tidak menambah frame, jadi aman dari overflow.', 'Kebanyakan engine JavaScript tidak melakukan optimasi ini.'] },
    { layout: 'cards', subtitle: 'Tempat rekursi bersinar', title: 'Data yang Bentuknya Bersarang', message: 'Kalau datanya berisi versi kecil dirinya sendiri, rekursi biasanya kode paling jujur.', cards: [{ title: 'Tree', desc: 'Komentar berbalas, menu bertingkat, kategori produk.', icon: '1' }, { title: 'File system', desc: 'Folder berisi file dan folder lain.', icon: '2' }, { title: 'JSON', desc: 'Objek berisi objek dan array bersarang.', icon: '3' }, { title: 'Divide & conquer', desc: 'Merge sort, quicksort, binary search.', icon: '4' }] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'Percayai panggilan rekursifnya, fokus pada satu langkah dan base case.', points: ['Tulis base case lebih dulu.', 'Pastikan setiap panggilan mendekati base case.', 'Ingat batas stack untuk input yang bisa sangat dalam.'] }
  ],

  'ketik-url-tekan-enter': [
    { layout: 'cover', subtitle: 'Pertanyaan interview paling klasik', title: 'Apa yang Terjadi Saat Kamu Menekan Enter', message: 'Dari nama domain sampai piksel di layar. Empat protokol bekerja berurutan, dan masing-masing butuh waktu.', points: ['DNS → TCP → TLS → HTTP.', 'Lalu browser mulai merender.'] },
    { layout: 'bullets', subtitle: 'Langkah 0', title: 'Browser Membaca URL', message: 'https://contoh.id/produk?id=7 dipecah menjadi bagian-bagiannya.', points: ['Skema https: pakai port 443 dan TLS.', 'Host contoh.id: harus diterjemahkan ke alamat IP.', 'Path dan query: dikirim nanti di request HTTP.', 'Ada di cache browser dan masih segar? Bisa selesai di sini.'] },
    { layout: 'bullets', subtitle: 'Langkah 1', title: 'DNS: Nama Menjadi Alamat IP', message: 'Komputer tidak mengenal nama domain. Ia butuh IP.', points: ['Cek cache: browser, lalu sistem operasi.', 'Tidak ada? Tanya resolver, biasanya milik ISP atau layanan DNS publik.', 'Resolver bertanya berjenjang: root, lalu server .id, lalu server otoritatif contoh.id.', 'Jawaban disimpan sesuai TTL supaya lain kali tidak perlu bertanya.'] },
    { layout: 'bullets', subtitle: 'Langkah 2', title: 'TCP: Jabat Tangan Tiga Arah', message: 'Sebelum mengirim data, kedua pihak menyepakati koneksi.', points: ['Klien: SYN. Server: SYN-ACK. Klien: ACK.', 'Butuh satu round trip sebelum data pertama bisa dikirim.', 'Round trip ke server di benua lain bisa ratusan milidetik.'] },
    { layout: 'bullets', subtitle: 'Langkah 3', title: 'TLS: Membangun Jalur Rahasia', message: 'Huruf s pada https. Di sini kunci enkripsi disepakati.', points: ['Klien mengirim ClientHello, termasuk nama domain (SNI).', 'Server mengirim sertifikat. Browser memeriksa rantai tanda tangannya ke CA tepercaya.', 'Kedua pihak menurunkan kunci sesi bersama.', 'TLS 1.3 butuh satu round trip, TLS 1.2 dua.'] },
    { layout: 'code', subtitle: 'Langkah 4', title: 'HTTP: Akhirnya Meminta Halaman', message: 'Request HTTP pada dasarnya teks terstruktur. Di HTTP/2 ke atas ia dikirim dalam bentuk biner, tapi isinya sama.', code: `GET /produk?id=7 HTTP/1.1
Host: contoh.id
Accept: text/html
Cookie: sesi=abc123

HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
Cache-Control: max-age=60

<!doctype html>...`, points: ['Baris kosong memisahkan header dan body.', 'Header Cache-Control menentukan apakah request berikutnya perlu ke server.'] },
    { layout: 'bullets', subtitle: 'Langkah 5', title: 'Browser Merender', message: 'HTML yang datang baru permulaan.', points: ['HTML di-parse menjadi DOM, CSS menjadi CSSOM.', 'Setiap CSS, JS, gambar, dan font memicu request baru.', 'Domain lain berarti DNS, TCP, dan TLS baru lagi.', 'Layout dihitung, lalu dilukis ke layar.'] },
    { layout: 'cards', subtitle: 'Di mana waktunya habis', title: 'Cara Memangkas Round Trip', message: 'Jarang ada request yang lambat karena satu hal. Biasanya karena terlalu banyak bolak-balik.', cards: [{ title: 'Koneksi dipakai ulang', desc: 'Keep-alive dan HTTP/2 mengirim banyak request lewat satu koneksi.', icon: '1' }, { title: 'CDN', desc: 'Server lebih dekat ke pengguna, round trip lebih pendek.', icon: '2' }, { title: 'Cache', desc: 'Request terbaik adalah yang tidak perlu dikirim.', icon: '3' }, { title: 'HTTP/3', desc: 'QUIC menggabungkan jabat tangan transport dan TLS.', icon: '4' }] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'Halaman lambat belum tentu server lambat.', points: ['Setiap lapisan menambah round trip sebelum byte pertama.', 'Buka tab Network di DevTools: kolom Timing memperlihatkan semuanya.', 'Kurangi domain, request, dan jarak sebelum mengoptimasi kode.'] }
  ],

  'tcp-vs-udp': [
    { layout: 'cover', subtitle: 'Dua cara mengirim data lewat internet', title: 'TCP vs UDP', message: 'Satu menjamin semua data sampai berurutan. Satu lagi hanya melempar paket dan berharap. Keduanya benar, untuk masalah berbeda.', points: ['TCP: andal.', 'UDP: tepat waktu.'] },
    { layout: 'bullets', subtitle: 'TCP', title: 'Seperti Kurir yang Teliti', message: 'TCP memberikan aliran byte yang andal di atas jaringan yang tidak andal.', points: ['Koneksi dibuka dengan jabat tangan tiga arah.', 'Setiap data diberi nomor urut dan harus dikonfirmasi penerima.', 'Paket hilang dikirim ulang. Paket datang acak disusun ulang.', 'Mengatur kecepatan agar tidak membanjiri jaringan (congestion control).'] },
    { layout: 'bullets', subtitle: 'UDP', title: 'Seperti Melempar Kartu Pos', message: 'UDP hampir tidak melakukan apa-apa, dan itulah kelebihannya.', points: ['Tanpa koneksi: langsung kirim datagram.', 'Tanpa konfirmasi, tanpa kirim ulang, tanpa jaminan urutan.', 'Header hanya 8 byte, TCP minimal 20 byte.', 'Keandalan, kalau perlu, diurus sendiri oleh aplikasi.'] },
    { layout: 'split', subtitle: 'Perbandingan', title: 'Lawannya', leftTitle: 'TCP', leftPoints: ['Semua data sampai, berurutan.', 'Ada jeda saat menunggu paket yang hilang.', 'Web, API, email, transfer file.'], rightTitle: 'UDP', rightPoints: ['Data bisa hilang atau datang acak.', 'Tidak pernah menunggu paket lama.', 'Video call, game, DNS, streaming live.'] },
    { layout: 'bullets', subtitle: 'Masalah utama TCP untuk realtime', title: 'Head-of-Line Blocking', message: 'Satu paket hilang menahan semua paket sesudahnya, walau mereka sudah tiba.', points: ['Paket 5 hilang, paket 6 sampai 10 sudah di tangan penerima.', 'Aplikasi tetap tidak menerima apa-apa sampai paket 5 dikirim ulang.', 'Untuk file, ini wajar. Untuk suara dalam percakapan, ini terdengar sebagai patah-patah.'] },
    { layout: 'cards', subtitle: 'Kenapa realtime memilih UDP', title: 'Data Lama Tidak Ada Gunanya', message: 'Dalam video call atau game, yang penting adalah keadaan sekarang, bukan setengah detik lalu.', cards: [{ title: 'Video call', desc: 'Frame yang hilang dilewati. Codec menutupi celahnya.', icon: 'V' }, { title: 'Game online', desc: 'Posisi pemain dikirim ulang tiap tick. Yang lama langsung usang.', icon: 'G' }, { title: 'DNS', desc: 'Satu tanya, satu jawab. Membuka koneksi TCP justru lebih mahal.', icon: 'D' }, { title: 'Live streaming', desc: 'Lebih baik sedikit buram daripada berhenti untuk buffering.', icon: 'L' }] },
    { layout: 'bullets', subtitle: 'Yang terbaik dari keduanya', title: 'QUIC: Andal, tapi di Atas UDP', message: 'HTTP/3 berjalan di atas QUIC, dan QUIC berjalan di atas UDP.', points: ['Keandalan dibangun ulang di level aplikasi, per stream.', 'Paket hilang di satu stream tidak menahan stream lain.', 'Jabat tangan transport dan TLS digabung.', 'Bukti bahwa UDP adalah fondasi, bukan sekadar versi "murah" dari TCP.'] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'Pertanyaannya bukan mana yang lebih baik, tapi data mana yang masih berharga jika terlambat.', points: ['Semua byte wajib sampai: TCP.', 'Kebaruan lebih penting dari kelengkapan: UDP.', 'Butuh keduanya: protokol di atas UDP seperti QUIC atau WebRTC.'] }
  ],

  'race-condition-deadlock': [
    { layout: 'cover', subtitle: 'Concurrency dengan contoh kecil', title: 'Race Condition dan Deadlock', message: 'Dua bug yang lolos dari tes, lalu muncul di production saat traffic naik.', points: ['Race: hasil bergantung pada urutan.', 'Deadlock: semua saling menunggu.'] },
    { layout: 'bullets', subtitle: 'Akar masalahnya', title: 'State Bersama yang Bisa Diubah', message: 'Concurrency sendiri tidak berbahaya. Yang berbahaya adalah data yang dibagi dan diubah bersamaan.', points: ['Dua alur kerja membaca dan menulis variabel yang sama.', 'Urutan eksekusinya tidak bisa kamu tebak.', 'Tidak ada yang dibagi, atau tidak ada yang diubah: aman.'] },
    { layout: 'code', subtitle: 'Race di TypeScript', title: 'Single Thread pun Bisa Kena', message: 'JavaScript hanya punya satu thread, tapi await membuka celah untuk request lain masuk.', code: `let saldo = 100
const jeda = () => new Promise(r => setTimeout(r, 10))

async function tarik(n: number) {
  const s = saldo  // baca
  await jeda()     // giliran pindah
  saldo = s - n    // tulis nilai basi
}

await Promise.all([tarik(30), tarik(50)])
console.log(saldo) // 50, seharusnya 20`, points: ['Pola baca, tunggu, tulis adalah resep race condition.', 'Di backend, versi ini terjadi antar request ke database.'] },
    { layout: 'code', subtitle: 'Race di Kotlin', title: 'Update yang Hilang', message: 'hitung++ terlihat satu langkah, padahal tiga: baca, tambah, tulis.', code: `var hitung = 0

fun main() {
  runBlocking {
    repeat(10_000) {
      launch(Dispatchers.Default) { hitung++ }
    }
  }
  println(hitung) // sering kurang dari 10000
}`, points: ['Dua thread membaca angka yang sama, lalu menulis hasil yang sama.', 'Satu penambahan lenyap tanpa error.'] },
    { layout: 'code', subtitle: 'Perbaikan', title: 'Satu Pintu, Satu Giliran', message: 'Mutex memastikan bagian kritis dijalankan satu coroutine dalam satu waktu.', code: `val mutex = Mutex()
var hitung = 0
fun main() {
  runBlocking {
    repeat(10_000) {
      launch(Dispatchers.Default) {
        mutex.withLock { hitung++ }
      }
    }
  }
  println(hitung) // selalu 10000
}`, points: ['Untuk sekadar menghitung, AtomicInteger lebih ringan.', 'Di database: UPDATE saldo = saldo - 30, bukan baca lalu tulis.'] },
    { layout: 'bullets', subtitle: 'Musuh kedua', title: 'Deadlock', message: 'Kunci menyelesaikan race, tapi dua kunci bisa saling mengunci.', points: ['Thread 1 memegang kunci A, menunggu kunci B.', 'Thread 2 memegang kunci B, menunggu kunci A.', 'Tidak ada yang mau melepas. Program diam tanpa error dan tanpa CPU.'] },
    { layout: 'code', subtitle: 'Deadlock di Kotlin', title: 'Urutan Kunci yang Terbalik', message: 'Sleep hanya membuat deadlock-nya hampir pasti terjadi. Tanpa sleep, ia tetap bisa terjadi, hanya lebih jarang.', code: `val a = Any()
val b = Any()

thread { synchronized(a) {
  Thread.sleep(10)
  synchronized(b) { println("T1") }
} }
thread { synchronized(b) {
  Thread.sleep(10)
  synchronized(a) { println("T2") }
} }`, points: ['Perbaikan paling sederhana: selalu ambil A dulu, baru B.'] },
    { layout: 'cards', subtitle: 'Coffman dkk., 1971', title: 'Empat Syarat Deadlock', message: 'Deadlock hanya terjadi jika keempatnya terpenuhi. Patahkan satu, deadlock tidak mungkin terjadi.', cards: [{ title: 'Mutual exclusion', desc: 'Sumber daya hanya bisa dipakai satu pihak.', icon: '1' }, { title: 'Hold and wait', desc: 'Memegang satu kunci sambil menunggu kunci lain.', icon: '2' }, { title: 'No preemption', desc: 'Kunci tidak bisa direbut paksa.', icon: '3' }, { title: 'Circular wait', desc: 'Rantai tunggu membentuk lingkaran. Urutan kunci tetap mematahkannya.', icon: '4' }] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'Bug concurrency jarang terlihat di laptop. Desain yang mencegahnya.', points: ['Kurangi state bersama. Lebih baik kirim pesan atau pakai data immutable.', 'Jadikan baca-ubah-tulis satu operasi atomik.', 'Ambil kunci dalam urutan yang sama di seluruh kode, dan pakai timeout.'] }
  ],

  'caching-dan-invalidasi': [
    { layout: 'cover', subtitle: 'Menyimpan jawaban supaya tidak dihitung ulang', title: 'Caching dan Masalah Invalidasi', message: '"There are only two hard things in Computer Science: cache invalidation and naming things." Phil Karlton', points: ['Mengisi cache itu mudah.', 'Tahu kapan membuangnya, itu yang sulit.'] },
    { layout: 'bullets', subtitle: 'Kenapa cache ada', title: 'Jarak Itu Mahal', message: 'Setiap lapisan lebih jauh dari CPU berarti lebih lambat beberapa kali lipat.', points: ['Register dan cache CPU: nanodetik.', 'RAM: puluhan sampai ratusan nanodetik.', 'Disk dan database: mikro sampai milidetik.', 'Server di benua lain: puluhan sampai ratusan milidetik.'] },
    { layout: 'cards', subtitle: 'Di mana cache tinggal', title: 'Empat Lapisan yang Umum', message: 'Satu request bisa melewati beberapa cache sekaligus. Masing-masing bisa basi.', cards: [{ title: 'Browser / app', desc: 'Header HTTP, cache gambar, data lokal di perangkat.', icon: '1' }, { title: 'CDN', desc: 'Salinan aset statis dan halaman di server dekat pengguna.', icon: '2' }, { title: 'Memori aplikasi', desc: 'Map di dalam proses. Tercepat, tapi tidak dibagi antar server.', icon: '3' }, { title: 'Cache terpusat', desc: 'Redis atau Memcached, dibagi semua instance aplikasi.', icon: '4' }] },
    { layout: 'code', subtitle: 'Pola paling umum', title: 'Cache-Aside dengan TTL', message: 'Cek cache dulu. Tidak ada atau kedaluwarsa? Ambil dari database, simpan, lalu kembalikan.', code: `type Entri = { v: Produk; exp: number }
const cache = new Map<string, Entri>()

async function getProduk(id: string) {
  const hit = cache.get(id)
  if (hit && hit.exp > Date.now()) return hit.v
  const v = await db.produk(id)
  cache.set(id, { v, exp: Date.now() + 60_000 })
  return v
}`, points: ['TTL 60 detik: data paling basi berumur satu menit.', 'Map ini tidak pernah mengecil. Di production, batasi ukurannya.'] },
    { layout: 'split', subtitle: 'Dua strategi invalidasi', title: 'Alternatifnya', leftTitle: 'TTL', leftPoints: ['Data kedaluwarsa otomatis.', 'Sederhana, tidak perlu tahu siapa yang mengubah.', 'Harga: data basi selama TTL.'], rightTitle: 'Hapus saat ditulis', rightPoints: ['Setiap update ikut menghapus cache.', 'Data lebih segar.', 'Harga: semua jalur tulis harus ingat.'] },
    { layout: 'code', subtitle: 'Invalidasi saat menulis', title: 'Hapus, Jangan Timpa', message: 'Menghapus lebih aman daripada mengisi ulang: request berikutnya membaca nilai terbaru dari database.', code: `async function ubahHarga(id: string, h: number) {
  await db.ubahHarga(id, h)
  cache.delete(id)
}`, points: ['Urutannya penting: tulis database dulu, baru hapus cache.', 'Tetap pasang TTL sebagai jaring pengaman jika delete gagal.'] },
    { layout: 'bullets', subtitle: 'Yang sering salah', title: 'Tiga Masalah Klasik', message: 'Cache yang salah desain bisa lebih berbahaya daripada tanpa cache.', points: ['Data basi: pengguna melihat harga atau stok lama.', 'Cache stampede: cache kedaluwarsa, ribuan request menghantam database bersamaan.', 'Key yang salah: data pengguna A tersaji ke pengguna B karena key tidak menyertakan user ID.'] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'Cache adalah salinan. Setiap salinan butuh aturan kapan ia tidak lagi benar.', points: ['Tentukan dulu seberapa basi yang boleh, per jenis data.', 'Jangan cache data per pengguna dengan key yang umum.', 'Ukur hit rate. Cache yang jarang kena hanya menambah kompleksitas.'] }
  ],

  'index-database-b-tree': [
    { layout: 'cover', subtitle: 'Kenapa query cepat, dan kenapa tiba-tiba tidak', title: 'Index Database: Intuisi B-Tree', message: 'Index adalah struktur kedua yang menyimpan kolom tertentu dalam keadaan terurut, plus penunjuk ke barisnya.', points: ['Tanpa index: baca semua baris.', 'Dengan index: lompat ke tempatnya.'] },
    { layout: 'bullets', subtitle: 'Tanpa index', title: 'Full Table Scan', message: 'Database membaca baris satu per satu sampai habis, karena tidak tahu di mana data berada.', points: ['1.000 baris: tidak terasa.', '10 juta baris: setiap query membaca seluruh tabel.', 'Waktunya tumbuh linear dengan jumlah data: O(n).'] },
    { layout: 'bullets', subtitle: 'Intuisinya', title: 'Seperti Daftar Isi Bertingkat', message: 'B-tree diperkenalkan Rudolf Bayer dan Edward McCreight pada awal 1970-an, dan masih jadi index default kebanyakan database relasional.', points: ['Node akar berisi batas-batas: A–F ke kiri, G–M ke tengah, dan seterusnya.', 'Setiap node berisi ratusan key, jadi pohonnya pendek dan lebar.', 'Jutaan baris biasanya cukup 3–4 level, yaitu 3–4 kali baca halaman disk.', 'Daun terurut dan saling tersambung: bagus untuk range dan ORDER BY.'] },
    { layout: 'code', subtitle: 'Praktik', title: 'Buat Index, Lalu Buktikan', message: 'Jangan menebak. Minta database menunjukkan rencana eksekusinya.', code: `CREATE INDEX idx_pesanan_user
  ON pesanan (user_id);

EXPLAIN ANALYZE
SELECT * FROM pesanan
WHERE user_id = 42;

-- Sebelum: Seq Scan on pesanan
-- Sesudah: Index Scan using idx_pesanan_user`, points: ['Contoh output di atas bergaya PostgreSQL.', 'MySQL memakai EXPLAIN dengan format berbeda, idenya sama.'] },
    { layout: 'cards', subtitle: 'Sudah ada index, tetap lambat', title: 'Kenapa Index Diabaikan', message: 'Index B-tree hanya berguna jika query bisa memanfaatkan urutannya.', cards: [{ title: 'Fungsi di kolom', desc: 'WHERE LOWER(email) = ... tidak memakai index biasa di email.', icon: 'f' }, { title: 'Wildcard di depan', desc: "LIKE '%budi' tidak tahu harus mulai dari huruf apa.", icon: '%' }, { title: 'Urutan komposit', desc: 'Index (a, b) tidak membantu query yang hanya memfilter b.', icon: 'ab' }, { title: 'Hasil terlalu banyak', desc: 'Jika query mengambil sebagian besar tabel, scan bisa lebih murah.', icon: '!' }] },
    { layout: 'code', subtitle: 'Index komposit', title: 'Aturan Paling Kiri', message: 'Index dua kolom terurut seperti buku telepon: berdasarkan kolom pertama, lalu kolom kedua.', code: `CREATE INDEX idx_user_tgl
  ON pesanan (user_id, dibuat_pada);

-- Memakai index
WHERE user_id = 42
WHERE user_id = 42 AND dibuat_pada > '2026-01-01'

-- Tidak bisa memakai index ini dengan efisien
WHERE dibuat_pada > '2026-01-01'`, points: ['Letakkan kolom yang difilter dengan = di depan.'] },
    { layout: 'split', subtitle: 'Index tidak gratis', title: 'Harganya', leftTitle: 'Yang kamu dapat', leftPoints: ['SELECT, JOIN, ORDER BY lebih cepat.', 'Unique index menjaga data tetap unik.'], rightTitle: 'Yang kamu bayar', rightPoints: ['Setiap INSERT dan UPDATE ikut menulis index.', 'Ruang disk dan memori bertambah.', 'Index tak terpakai tetap memperlambat tulis.'] },
    { layout: 'bullets', subtitle: 'Kenapa "tiba-tiba"', title: 'Query Sama, Hasil Berbeda', message: 'Kodenya tidak berubah. Yang berubah adalah datanya.', points: ['Tabel tumbuh melewati titik di mana full scan masih terasa cepat.', 'Statistik tabel usang, sehingga planner memilih rencana yang salah.', 'Fitur baru menambah filter atau ORDER BY yang tidak tertutup index.', 'Migrasi tanpa sengaja menghapus atau mengubah index.'] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'Index adalah keputusan desain, bukan tombol percepat.', points: ['Buat index berdasarkan query yang benar-benar berjalan.', 'Biasakan EXPLAIN sebelum dan sesudah perubahan.', 'Tes dengan jumlah data yang mendekati production.'] }
  ],

  'transaksi-acid': [
    { layout: 'cover', subtitle: 'Satu transfer, empat jaminan', title: 'Transaksi dan ACID', message: 'Andi mentransfer Rp100.000 ke Budi. Kedengarannya dua baris kode. Kenyataannya, banyak hal bisa salah di antaranya.', points: ['Istilah ACID dipopulerkan Härder dan Reuter (1983).', 'Contoh SQL bergaya PostgreSQL.'] },
    { layout: 'code', subtitle: 'Versi naif', title: 'Dua UPDATE Tanpa Transaksi', message: 'Kalau server mati, koneksi putus, atau query kedua gagal di antara dua baris ini, uang Andi hilang.', code: `UPDATE akun SET saldo = saldo - 100000
WHERE id = 'andi';

-- server crash di sini

UPDATE akun SET saldo = saldo + 100000
WHERE id = 'budi';`, points: ['Saldo Andi berkurang, saldo Budi tetap.', 'Rp100.000 lenyap dari sistem.'] },
    { layout: 'code', subtitle: 'Versi benar', title: 'Bungkus dalam Transaksi', message: 'Semua perintah di antara BEGIN dan COMMIT dianggap satu unit: berhasil semua, atau tidak sama sekali.', code: `BEGIN;

UPDATE akun SET saldo = saldo - 100000
WHERE id = 'andi';

UPDATE akun SET saldo = saldo + 100000
WHERE id = 'budi';

COMMIT;
-- ada error sebelum COMMIT? ROLLBACK`, points: ['Crash sebelum COMMIT: database membatalkan semuanya saat menyala lagi.'] },
    { layout: 'cards', subtitle: 'Empat huruf', title: 'ACID dalam Bahasa Transfer', message: 'Setiap huruf menjawab satu cara uang bisa hilang atau tercipta.', cards: [{ title: 'Atomicity', desc: 'Debit dan kredit terjadi bersama, atau tidak sama sekali.', icon: 'A' }, { title: 'Consistency', desc: 'Aturan tetap terjaga, misalnya CHECK (saldo >= 0).', icon: 'C' }, { title: 'Isolation', desc: 'Transfer lain yang berjalan bersamaan tidak saling mengacaukan.', icon: 'I' }, { title: 'Durability', desc: 'Setelah COMMIT berhasil, data tetap ada walau listrik mati.', icon: 'D' }] },
    { layout: 'bullets', subtitle: 'Bagaimana database menepatinya', title: 'Log Lebih Dulu, Data Belakangan', message: 'Kebanyakan database relasional memakai write-ahead log (WAL).', points: ['Setiap perubahan ditulis dulu ke log di disk.', 'COMMIT dianggap berhasil setelah catatan log-nya aman tersimpan.', 'Setelah crash, log dibaca ulang: yang sudah COMMIT diterapkan, sisanya dibatalkan.'] },
    { layout: 'split', subtitle: 'Isolation level', title: 'Lebih ketat', leftTitle: 'Read Committed', leftPoints: ['Default PostgreSQL.', 'Hanya membaca data yang sudah di-commit.', 'Baca dua kali bisa dapat hasil berbeda.'], rightTitle: 'Serializable', rightPoints: ['Hasil seolah transaksi berjalan bergiliran.', 'Paling aman dari anomali.', 'Bisa gagal dan harus diulang aplikasi.'] },
    { layout: 'code', subtitle: 'Jebakan isolasi', title: 'Cek Saldo dan Potong Sekaligus', message: 'Membaca saldo di aplikasi lalu menulis hasilnya membuka celah race. Biarkan database memeriksa dan mengubah dalam satu perintah.', code: `UPDATE akun
SET saldo = saldo - 100000
WHERE id = 'andi'
  AND saldo >= 100000;

-- 0 baris terpengaruh = saldo tidak cukup
-- aplikasi lalu ROLLBACK`, points: ['Alternatif: SELECT ... FOR UPDATE untuk mengunci baris dulu.'] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'Kalau beberapa perubahan harus terjadi bersama, mereka harus berada dalam satu transaksi.', points: ['Simpan aturan penting sebagai constraint, bukan hanya di kode.', 'Ketahui isolation level default database-mu.', 'Transaksi pendek saja: jangan memanggil API luar di dalamnya.'] }
  ],

  'unicode-utf8': [
    { layout: 'cover', subtitle: 'Cara kerja teks di komputer', title: 'Unicode dan UTF-8', message: 'Komputer tidak menyimpan huruf. Ia menyimpan byte, plus kesepakatan cara membacanya.', points: ['Unicode: daftar karakter.', 'UTF-8: cara menyimpannya sebagai byte.'] },
    { layout: 'bullets', subtitle: 'Dari mana masalahnya', title: 'Dulu Ada Terlalu Banyak Peta', message: 'ASCII hanya punya 128 karakter, cukup untuk bahasa Inggris saja.', points: ['Setiap wilayah membuat encoding sendiri untuk sisa 128 slot di byte.', 'Windows-1252 dan ISO-8859-1 untuk Eropa Barat, lainnya untuk Cyrillic, Arab, dan seterusnya.', 'Byte yang sama berarti huruf berbeda di peta berbeda.'] },
    { layout: 'bullets', subtitle: 'Dua konsep yang sering tertukar', title: 'Unicode Bukan Encoding', message: 'Unicode memberi setiap karakter satu nomor. Encoding menentukan cara nomor itu disimpan.', points: ['A adalah U+0041. é adalah U+00E9.', 'Nomor itu disebut code point.', 'UTF-8, UTF-16, dan UTF-32 adalah tiga cara menyimpan code point yang sama.', 'UTF-8 dirancang Ken Thompson dan Rob Pike pada 1992.'] },
    { layout: 'cards', subtitle: 'UTF-8', title: 'Panjangnya 1 sampai 4 Byte', message: 'Karakter umum hemat tempat, karakter lain tetap muat.', cards: [{ title: '1 byte', desc: 'ASCII: A, z, 0–9. File ASCII lama otomatis valid UTF-8.', icon: '1' }, { title: '2 byte', desc: 'Huruf Latin beraksen, Yunani, Cyrillic, Arab. Contoh: é.', icon: '2' }, { title: '3 byte', desc: 'Sebagian besar aksara lain, termasuk CJK. Contoh: 世.', icon: '3' }, { title: '4 byte', desc: 'Emoji dan karakter di luar Basic Multilingual Plane.', icon: '4' }] },
    { layout: 'code', subtitle: 'Mojibake, langkah demi langkah', title: 'Bagaimana é Menjadi Ã©', message: 'Ditulis sebagai UTF-8, dibaca sebagai Windows-1252. Byte-nya tidak berubah, tafsirannya yang salah.', code: `const bytes = new TextEncoder().encode("José")
// [74, 111, 115, 195, 169]

const salah = new TextDecoder("windows-1252")
  .decode(bytes)
console.log(salah) // "JosÃ©"

const benar = new TextDecoder("utf-8").decode(bytes)
console.log(benar) // "José"`, points: ['é di UTF-8 = 2 byte: C3 A9.', 'Di Windows-1252, C3 = Ã dan A9 = ©.'] },
    { layout: 'split', subtitle: 'Tempat kejadian', title: 'Cara mencegah', leftTitle: 'Di mana teks rusak', leftPoints: ['Koneksi atau kolom database dengan charset lain.', 'Membaca file tanpa menyebut encoding.', 'Response HTTP tanpa charset di Content-Type.'], rightTitle: 'Satu aturan', rightPoints: ['UTF-8 di semua lapisan, ditulis eksplisit.', 'MySQL: pakai utf8mb4, bukan utf8.', 'Decode di batas masuk, encode di batas keluar.'] },
    { layout: 'code', subtitle: 'Di Kotlin', title: 'Sebutkan Charset-nya', message: 'Byte dan String adalah dua hal berbeda. Konversi antar keduanya selalu butuh encoding.', code: `val bytes = "José".toByteArray(Charsets.UTF_8)
println(bytes.size) // 5, bukan 4

val teks = File("data.csv")
  .readText(Charsets.UTF_8)

val lama = File("ekspor-lama.csv")
  .readText(Charsets.ISO_8859_1)`, points: ['Jumlah karakter dan jumlah byte jarang sama.', 'File dari sistem lama? Tanyakan encoding-nya, jangan menebak.'] },
    { layout: 'bullets', subtitle: 'Jebakan lanjutan', title: 'Panjang String Itu Relatif', message: 'Satu karakter di layar bisa beberapa unit di memori.', points: ['String JS dan Kotlin memakai UTF-16: emoji bisa terhitung length 2.', 'é bisa satu code point, atau e plus tanda aksen gabungan.', 'Dua bentuk itu terlihat sama tapi tidak equals. Normalisasi dengan NFC.', 'Memotong string per indeks bisa membelah karakter.'] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'Tidak ada teks tanpa encoding. Yang ada hanya encoding yang tidak disebutkan.', points: ['Pakai UTF-8 di mana-mana, dan nyatakan secara eksplisit.', 'Mojibake berpola: Ã diikuti simbol hampir selalu UTF-8 yang dibaca sebagai Latin-1.', 'Hitung byte untuk penyimpanan, hitung karakter untuk tampilan.'] }
  ]
};

/* ───────────────────────── carousels ───────────────────────── */

export const postSlides: Record<string, PostSlide[]> = {
  'array-linked-list-cache': [
    card('teori', 'Linked List Menang di Buku, Kalah di CPU', 'Di kelas struktur data, linked list unggul untuk sisip di tengah. Di mesin sungguhan, array sering tetap lebih cepat. Geser untuk tahu kenapa.'),
    card('array', 'Berjejer Rapat', 'Semua elemen duduk bersebelahan di satu blok memori. Elemen ke-i bisa dihitung alamatnya langsung.', { bullets: ['Akses indeks: O(1).', 'Sisip di tengah: geser sisanya, O(n).'] }),
    card('linked list', 'Tersebar dan Disambung', 'Setiap node bisa di mana saja di RAM. Yang menyambungkannya hanya pointer ke node berikutnya.', { bullets: ['Akses indeks: jalan dari kepala, O(n).', 'Sisip: O(1), kalau node-nya sudah di tangan.'] }),
    card('cache CPU', 'CPU Mengambil 64 Byte Sekaligus', 'Membaca satu elemen array ikut membawa tetangganya ke cache. Elemen berikutnya sudah menunggu, tanpa ke RAM lagi.'),
    card('cache miss', 'Setiap Pointer Bisa Jadi Perjalanan Jauh', 'Node berikutnya di alamat acak. CPU harus menunggu RAM, yang jauh lebih lambat dari cache, berulang kali.'),
    card('jebakan', 'Interface Sama, Biaya Beda', 'Kode ini O(n²) di LinkedList, O(n) di ArrayList.', { code: `for (i in list.indices) {\n  total += list[i]\n}` }),
    card('praktik', 'Pilih Array Dulu', 'Mulai dari array atau ArrayList. Pindah ke linked list hanya kalau kamu memegang node-nya dan hasil ukur membuktikan perlunya.')
  ],

  'hash-map-o1': [
    card('teori', 'O(1) yang Tidak Selalu O(1)', 'Hash map disebut O(1). Itu rata-ratanya. Kartu-kartu ini menunjukkan kapan janji itu patah.'),
    card('langkah 1', 'Key Menjadi Angka', 'Fungsi hash mengubah "budi" menjadi bilangan. Bilangan itu dimodulo jumlah bucket, dan hasilnya adalah alamat laci.'),
    card('langkah 2', 'Langsung ke Lacinya', 'Tidak ada pencarian dari awal. Map menghitung laci, membuka, selesai. Itulah sumber O(1).'),
    card('tabrakan', 'Dua Key, Satu Laci', 'Key tidak terbatas, laci terbatas. Pasti ada yang berbagi tempat.', { bullets: ['Chaining: laci berisi daftar kecil.', 'Open addressing: cari laci kosong berikutnya.', 'Di dalam laci, key tetap dibandingkan satu per satu.'] }),
    card('resize', 'Terlalu Penuh, Pindah Rumah', 'Lewat load factor tertentu, misalnya 0,75 di HashMap Java, tabel diperbesar dan semua key di-hash ulang. Sesekali lambat, rata-ratanya tetap cepat.'),
    card('kasus terburuk', 'Semua Masuk Satu Laci', 'Hash buruk atau key yang sengaja dibuat bertabrakan mengubah map menjadi daftar panjang. Setiap lookup jadi O(n).'),
    card('praktik', 'Jaga Key Tetap Diam', 'Key yang berubah setelah disimpan akan dicari di laci yang salah.', { code: `val k = Titik(1, 2) // data class, var x\nset.add(k)\nk.x = 9\nset.contains(k) // false` })
  ],

  'rekursi-5-kartu': [
    card('teori', 'Rekursi Butuh Dua Hal. Lupa Satu, Crash.', 'Fungsi yang memanggil dirinya sendiri terdengar rumit. Sebenarnya hanya dua aturan dan satu batas.'),
    card('aturan 1', 'Base Case', 'Kondisi di mana fungsi berhenti dan langsung menjawab, tanpa memanggil dirinya lagi.', { code: `if (n <= 1) return 1` }),
    card('aturan 2', 'Masalah yang Mengecil', 'Setiap panggilan harus lebih dekat ke base case. Kalau tidak mengecil, ia tidak akan pernah sampai.', { code: `return n * faktorial(n - 1)` }),
    card('call stack', 'Setiap Panggilan Menunggu', 'faktorial(3) menunggu faktorial(2), yang menunggu faktorial(1). Semuanya menumpuk di call stack sampai yang terdalam menjawab.'),
    card('batas', 'Stack Itu Kecil', 'Tumpukan terlalu dalam, atau base case tidak tercapai, dan stack habis.', { bullets: ['JavaScript: RangeError, Maximum call stack size exceeded.', 'Kotlin/JVM: StackOverflowError.'] }),
    card('praktik', 'Kapan Memakainya', 'Rekursi paling cocok untuk data bersarang: folder, komentar berbalas, JSON, tree. Untuk hitungan sangat dalam, loop lebih aman.')
  ],

  'perjalanan-sebuah-url': [
    card('teori', 'Enter Memicu 4 Protokol Sekaligus', 'Sebelum satu piksel muncul, browser-mu sudah bertanya ke DNS, berjabat tangan, dan bertukar kunci. Ini urutannya.'),
    card('1 · DNS', 'Nama Jadi Alamat', 'contoh.id diterjemahkan menjadi alamat IP. Cache browser dan OS dicek dulu, baru resolver yang bertanya berjenjang.'),
    card('2 · TCP', 'Jabat Tangan Tiga Arah', 'SYN, SYN-ACK, ACK. Satu round trip habis hanya untuk menyepakati bahwa koneksi ada.'),
    card('3 · TLS', 'Gembok Dipasang', 'Server menunjukkan sertifikat, browser memeriksanya, lalu keduanya menyepakati kunci enkripsi. TLS 1.3 butuh satu round trip.'),
    card('4 · HTTP', 'Baru Meminta Halaman', 'Request akhirnya dikirim.', { code: `GET / HTTP/1.1\nHost: contoh.id` }),
    card('5 · render', 'HTML Hanya Permulaan', 'CSS, JS, gambar, dan font memicu request berikutnya. Domain lain berarti DNS, TCP, dan TLS dari awal lagi.'),
    card('praktik', 'Lihat Sendiri', 'Buka DevTools, tab Network, klik satu request, lalu buka Timing. Setiap tahap di atas tercatat di sana lengkap dengan durasinya.')
  ],

  'tcp-udp-video-call': [
    card('teori', 'Video Call Lebih Suka Data yang Hilang', 'Kedengarannya aneh. Tapi untuk percakapan langsung, frame yang terlambat sama tidak bergunanya dengan frame yang hilang.'),
    card('TCP', 'Tidak Pernah Menyerah', 'Setiap paket dinomori, dikonfirmasi, dan dikirim ulang jika hilang. Semua data sampai, berurutan.', { bullets: ['Cocok: web, API, file, email.'] }),
    card('masalahnya', 'Satu Paket Hilang, Semua Menunggu', 'Paket 5 hilang. Paket 6 sampai 10 sudah tiba, tapi aplikasi tidak boleh membacanya sampai paket 5 dikirim ulang.'),
    card('UDP', 'Kirim dan Lupakan', 'Tanpa koneksi, tanpa konfirmasi, tanpa kirim ulang. Paket yang hilang dibiarkan. Paket berikutnya langsung dipakai.', { bullets: ['Cocok: video call, game, DNS, live stream.'] }),
    card('game', 'Posisi Lama Tidak Berguna', 'Server game mengirim posisi pemain berkali-kali per detik. Kalau satu update hilang, update berikutnya sudah membawa posisi terbaru.'),
    card('praktik', 'Pertanyaan Penentunya', 'Kalau data ini terlambat satu detik, apakah masih berharga? Ya: TCP. Tidak: UDP, atau protokol di atasnya seperti QUIC dan WebRTC.')
  ],

  'concurrency-bug-tak-terlihat': [
    card('teori', 'Dua Bug yang Lolos dari Semua Tesmu', 'Race condition dan deadlock jarang muncul di laptop. Mereka menunggu traffic production.'),
    card('race condition', 'Baca, Tunggu, Tulis', 'Dua request membaca saldo yang sama, lalu menulis hasil masing-masing. Salah satu perubahan lenyap.', { code: `const s = saldo\nawait simpanLog()\nsaldo = s - n // nilai basi` }),
    card('bahkan di JS', 'Satu Thread Tidak Menyelamatkanmu', 'Setiap await adalah titik di mana kode lain boleh berjalan. Di antara baca dan tulis, dunia bisa berubah.'),
    card('perbaikan', 'Jadikan Satu Langkah', 'Gabungkan baca dan tulis menjadi operasi atomik.', { bullets: ['Database: UPDATE saldo = saldo - n.', 'Kotlin: AtomicInteger atau Mutex.', 'Atau: hindari state bersama sama sekali.'] }),
    card('deadlock', 'Saling Menunggu Selamanya', 'Thread 1 memegang A dan menunggu B. Thread 2 memegang B dan menunggu A. Tidak ada error, tidak ada CPU, tidak ada kemajuan.'),
    card('praktik', 'Satu Aturan Pencegah Deadlock', 'Ambil kunci selalu dalam urutan yang sama di seluruh kode. Lingkaran tunggu tidak bisa terbentuk, dan deadlock tidak mungkin terjadi.')
  ],

  'cache-dua-hal-sulit': [
    card('teori', 'Cache Membuat Aplikasimu Cepat dan Salah', 'Phil Karlton menyebut cache invalidation salah satu dari dua hal tersulit di computer science. Enam kartu ini menjelaskan alasannya.'),
    card('idenya', 'Simpan Jawaban, Pakai Ulang', 'Daripada ke database setiap kali, simpan hasilnya di tempat yang lebih dekat. Cepat, sampai datanya berubah.'),
    card('masalahnya', 'Setiap Cache Adalah Salinan', 'Salinan tidak tahu kalau aslinya berubah. Pengguna melihat harga kemarin, stok yang sudah habis, foto profil lama.'),
    card('strategi', 'Dua Cara Membuang', 'Pilih sesuai seberapa basi yang masih boleh.', { bullets: ['TTL: kedaluwarsa otomatis setelah N detik.', 'Invalidasi: hapus cache setiap kali data ditulis.', 'Paling aman: keduanya.'] }),
    card('jebakan', 'Hapus, Jangan Timpa', 'Setelah update, hapus key-nya. Request berikutnya akan membaca nilai segar.', { code: `await db.ubahHarga(id, h)\ncache.delete(id)` }),
    card('praktik', 'Pertanyaan Sebelum Menambah Cache', 'Berapa lama data ini boleh basi? Siapa saja yang bisa mengubahnya? Apakah key-nya unik per pengguna? Belum bisa menjawab, jangan cache dulu.')
  ],

  'index-query-lambat': [
    card('teori', 'Sudah Pakai Index, Query Tetap Lambat', 'Index ada, tapi database tidak memakainya. Lima penyebab ini paling sering muncul.'),
    card('1', 'Fungsi di Kolom', 'Index menyimpan nilai email apa adanya, bukan hasil LOWER(email).', { code: `-- index di email tidak terpakai\nWHERE LOWER(email) = 'a@b.id'` }),
    card('2', 'Wildcard di Depan', "LIKE 'budi%' bisa memakai index karena awalnya diketahui. LIKE '%budi' tidak, karena kata depannya bisa apa saja."),
    card('3', 'Urutan Index Komposit', 'Index (user_id, tanggal) terurut berdasarkan user_id dulu. Query yang hanya memfilter tanggal tidak bisa melompat ke tempatnya.'),
    card('4', 'Datanya Sudah Tumbuh', 'Di development ada 500 baris, full scan terasa instan. Di production ada 5 juta. Kode yang sama, nasib berbeda.'),
    card('5', 'Statistik Usang', 'Planner memilih rencana berdasarkan perkiraan jumlah baris. Perkiraan meleset, rencananya ikut salah. ANALYZE memperbaruinya.'),
    card('praktik', 'Jangan Menebak', 'Jalankan EXPLAIN ANALYZE. Cari Seq Scan di tabel besar dan perbandingan estimasi baris dengan jumlah sebenarnya.')
  ],

  'acid-transfer-bank': [
    card('teori', 'Rp100.000 Hilang di Antara Dua Baris', 'Potong saldo Andi, tambah saldo Budi. Kalau server mati di antara keduanya, uangnya lenyap. Transaksi mencegah itu.'),
    card('A · Atomicity', 'Semua atau Tidak Sama Sekali', 'Debit dan kredit berada dalam satu transaksi. Gagal di tengah, semuanya dibatalkan.', { code: `BEGIN;\nUPDATE ... 'andi';\nUPDATE ... 'budi';\nCOMMIT;` }),
    card('C · Consistency', 'Aturan Tidak Boleh Dilanggar', 'Constraint seperti CHECK (saldo >= 0) membuat database menolak transaksi yang membuat saldo minus, dari kode mana pun asalnya.'),
    card('I · Isolation', 'Transfer Bersamaan Tidak Bertabrakan', 'Dua transfer dari Andi di detik yang sama tidak boleh sama-sama melihat saldo lama dan sama-sama lolos.'),
    card('D · Durability', 'COMMIT Berarti Tersimpan', 'Begitu database bilang berhasil, data bertahan walau listrik mati sedetik kemudian. Log di disk yang menjaminnya.'),
    card('praktik', 'Satu Aturan untuk Kodemu', 'Beberapa perubahan yang harus terjadi bersama wajib berada dalam satu transaksi. Dan jaga transaksinya tetap pendek.')
  ],

  'mojibake-teks-rusak': [
    card('teori', 'Kenapa "José" Jadi "JosÃ©"', 'Teks rusak bukan acak. Polanya bisa dibaca, dan polanya memberitahu persis di mana kesalahannya.'),
    card('fakta 1', 'Komputer Tidak Menyimpan Huruf', 'Yang tersimpan hanya byte. Encoding adalah kesepakatan tentang byte mana berarti huruf apa.'),
    card('fakta 2', 'Unicode Itu Nomor, UTF-8 Itu Cara Simpan', 'é adalah code point U+00E9. Di UTF-8, ia disimpan sebagai dua byte: C3 A9.'),
    card('kejadiannya', 'Byte Benar, Tafsiran Salah', 'Program lain membaca C3 A9 dengan Windows-1252. C3 menjadi Ã, A9 menjadi ©.', { code: `"é" → UTF-8 → C3 A9\nC3 A9 → Windows-1252 → "Ã©"` }),
    card('tersangka', 'Biasanya di Salah Satu Ini', 'Cari lapisan yang tidak menyebut encoding.', { bullets: ['Charset koneksi atau kolom database.', 'Membaca file CSV tanpa encoding eksplisit.', 'Header Content-Type tanpa charset.'] }),
    card('praktik', 'UTF-8 di Semua Lapisan', 'Database, file, HTTP, dan kode. Tulis eksplisit di setiap batas. Di MySQL, pilih utf8mb4 karena utf8 lama tidak bisa menyimpan emoji.')
  ]
};

/* ───────────────────────── notes ───────────────────────── */

export const noteBodies: Record<string, Full> = {
  'linked-list-jarang-menang': {
    lead: 'Big-O benar. Hanya saja ia tidak menghitung hal yang paling mahal di komputer modern: menunggu memori.',
    sections: [
      { id: 'pelajaran-kelas', title: 'Yang diajarkan di kelas', body: p(
        'Hampir setiap mata kuliah struktur data punya tabel yang sama. Array: akses O(1), sisip di tengah O(n). Linked list: akses O(n), sisip O(1). Kesimpulan yang sering terbawa: kalau aplikasimu banyak menyisip, pakai linked list.',
        `Tabel itu tidak salah. Masalahnya ada di catatan kaki yang jarang dibaca. Sisip O(1) di linked list hanya berlaku ${b('jika kamu sudah memegang node tempat menyisip')}. Kalau kamu harus mencarinya dulu, misalnya "sisipkan setelah elemen ke-500", kamu tetap berjalan 500 langkah. Totalnya O(n), sama seperti array.`
      ) },
      { id: 'yang-tidak-dihitung', title: 'Yang tidak dihitung Big-O', body: p(
        'Big-O menghitung jumlah langkah dan menganggap setiap langkah sama mahalnya. Di CPU sungguhan, tidak. Membaca dari cache CPU bisa puluhan kali lebih cepat daripada membaca dari RAM.',
        'CPU juga tidak mengambil satu angka dari RAM. Ia mengambil satu cache line, umumnya 64 byte. Untuk array berisi angka 4 byte, satu kali ambil membawa 16 elemen. Ditambah prefetcher yang menebak kamu akan membaca berurutan, loop di atas array nyaris tidak pernah menunggu RAM.',
        'Linked list kebalikannya. Setiap node dialokasikan terpisah dan bisa berada di mana saja. Setiap kali kode mengikuti pointer ke node berikutnya, ada peluang cache miss, dan CPU berdiri diam menunggu.'
      ) },
      { id: 'menggeser-itu-murah', title: 'Menggeser ternyata murah', body: p(
        `Sisip di tengah array memang menggeser semua elemen sesudahnya. Tapi menggeser blok memori yang bersebelahan adalah salah satu operasi yang paling efisien dikerjakan mesin. Di JVM, ${c('ArrayList')} memakai ${c('System.arraycopy')} untuk ini.`,
        'Jadi perbandingan sebenarnya bukan O(n) melawan O(1). Perbandingannya adalah: menggeser blok rapat yang cepat, melawan berjalan dari node ke node yang tersebar. Untuk ukuran data yang umum di aplikasi, yang pertama sering menang.'
      ) },
      { id: 'kapan-linked-list', title: 'Lalu kapan linked list?', body: p(
        'Linked list masuk akal ketika kamu benar-benar memegang referensi ke node, dan sering memindah atau menghapusnya. Contoh klasiknya LRU cache: hash map menunjuk langsung ke node, dan node yang baru dipakai dipindah ke depan list dalam O(1).',
        'Di luar kasus seperti itu, default yang lebih aman adalah array, ArrayList, atau array biasa di TypeScript. Kalau kamu curiga struktur lain lebih cepat, ukur dengan data seukuran production. Intuisi dari tabel Big-O saja tidak cukup untuk keputusan performa.'
      ) }
    ]
  },

  'o1-yang-bisa-jadi-on': {
    lead: 'O(1) pada hash map adalah janji bersyarat. Syaratnya: key tersebar merata ke semua bucket.',
    sections: [
      { id: 'janji', title: 'Janji yang selalu dikutip', body: p(
        `Saat seseorang bertanya kenapa harus memakai ${c('Map')} daripada mencari di array, jawabannya hampir selalu sama: lookup hash map O(1). Jawaban itu benar untuk rata-rata kasus. Tapi "rata-rata" menyembunyikan satu asumsi besar.`,
        'Hash map menghitung bucket dari hash key, lalu langsung ke sana. Kalau bucket itu hanya berisi satu atau dua entri, pekerjaannya selesai. Kalau bucket itu berisi seribu entri, hash map harus membandingkan key satu per satu. Pada titik itu, ia bukan lagi hash map. Ia daftar panjang yang menyamar.'
      ) },
      { id: 'hash-buruk', title: 'Ketika hash-nya yang buruk', body: p(
        `Bayangkan sebuah class dengan ${c('hashCode')} yang ditulis tangan dan hanya mengembalikan panjang nama. "Andi" dan "Budi" sama-sama 4. Semua nama empat huruf jatuh ke bucket yang sama.`,
        `Kode seperti ini lolos review karena secara teknis benar: kontraknya hanya menuntut objek yang ${c('equals')} punya hash yang sama. Kontrak tidak melarang hash yang jelek. Hasilnya, map tetap bekerja, hanya makin lambat seiring datanya bertambah. Di Kotlin, ${c('data class')} membuatkan ${c('equals')} dan ${c('hashCode')} dari semua properti, dan itu hampir selalu lebih baik daripada versi buatan tangan.`
      ) },
      { id: 'penyerang', title: 'Ketika penyerang yang memilih key', body: p(
        'Versi yang lebih serius: key berasal dari input pengguna. Parameter query, field JSON, header HTTP. Kalau fungsi hash-nya bisa ditebak, penyerang bisa menyusun ribuan key yang sengaja jatuh ke bucket yang sama. Server lalu menghabiskan CPU untuk membangun dan mencari di daftar yang sangat panjang.',
        'Serangan ini dikenal sebagai hash flooding. Respons yang umum dari para pembuat bahasa: mengacak seed fungsi hash per proses, sehingga penyerang tidak bisa menghitung tabrakan dari luar. Java mengambil jalan lain sejak versi 8: bucket HashMap yang terlalu panjang diubah menjadi tree, sehingga kasus terburuknya menjadi O(log n), bukan O(n).'
      ) },
      { id: 'yang-bisa-kamu-lakukan', title: 'Yang bisa kamu lakukan', body: ul(
        'Pakai key yang immutable. Key yang berubah setelah disimpan dicari di bucket yang salah.',
        `Jangan tulis ${c('hashCode')} sendiri kalau bahasa sudah membuatkannya.`,
        'Batasi jumlah field dan parameter yang diterima dari input luar.',
        'Ingat bahwa resize juga O(n). Kalau ukurannya sudah diketahui, beri kapasitas awal.'
      ) + p('O(1) tetap janji yang bagus. Hanya saja, ia janji tentang distribusi data, bukan tentang setiap operasi.') }
    ]
  },

  'rekursi-dan-call-stack': {
    lead: 'Kebingungan soal rekursi hampir selalu berasal dari satu hal: tidak terlihatnya tumpukan panggilan yang menunggu.',
    sections: [
      { id: 'kenapa-terasa-sulit', title: 'Kenapa rekursi terasa sulit', body: p(
        'Loop mudah diikuti karena semua terjadi di satu tempat. Variabel berubah, baris yang sama dijalankan lagi, dan kamu bisa membayangkannya dari atas ke bawah.',
        'Rekursi tidak begitu. Fungsi memanggil dirinya sendiri, lalu memanggil lagi, dan di suatu titik semuanya "kembali". Kalau kamu mencoba melacak setiap panggilan di kepala sekaligus, wajar kalau pusing. Kepalamu sedang mencoba menjadi call stack.'
      ) },
      { id: 'tumpukan-catatan', title: 'Bayangkan tumpukan catatan', body: p(
        'Setiap kali sebuah fungsi dipanggil, runtime membuat satu frame: catatan berisi parameter, variabel lokal, dan di mana harus melanjutkan setelah selesai. Frame itu ditumpuk di atas frame pemanggilnya.',
        `Untuk ${c('faktorial(3)')}, tumpukannya tumbuh tiga lapis: 3, lalu 2, lalu 1. Frame teratas menjawab 1 dan dibuang. Frame di bawahnya kini bisa menghitung 2 × 1. Lalu frame paling bawah menghitung 3 × 2. Tidak ada sulap. Hanya catatan yang ditumpuk lalu diambil kembali dari atas.`
      ) + pre(`function faktorial(n: number): number {
  if (n <= 1) return 1
  return n * faktorial(n - 1)
}`) },
      { id: 'percaya-langkahnya', title: 'Berhenti melacak, mulai percaya', body: p(
        'Cara berpikir yang lebih produktif: jangan melacak semua lapisan. Anggap panggilan rekursif sudah benar untuk masalah yang lebih kecil, lalu fokus pada dua pertanyaan.',
        `Pertama, ${b('apa jawaban untuk kasus terkecil?')} Itu base case-mu. Kedua, ${b('kalau jawaban untuk versi lebih kecil sudah ada, bagaimana memakainya?')} Itu langkah rekursifmu. Untuk menghitung ukuran folder: ukuran sebuah file adalah base case, dan ukuran folder adalah jumlah ukuran isinya, masing-masing dihitung dengan fungsi yang sama.`
      ) },
      { id: 'batasnya-nyata', title: 'Batasnya nyata', body: p(
        `Tumpukan catatan itu disimpan di area memori yang namanya stack, dan ukurannya terbatas. Base case yang tidak pernah tercapai, atau data yang sangat dalam, membuat stack habis. Di JavaScript kamu melihat ${c('RangeError: Maximum call stack size exceeded')}. Di JVM, ${c('StackOverflowError')}.`,
        `Kotlin menyediakan ${c('tailrec')}: jika panggilan rekursif adalah hal terakhir yang dilakukan fungsi, compiler mengubahnya menjadi loop. Kebanyakan engine JavaScript tidak melakukan optimasi semacam itu, jadi untuk input yang bisa sangat dalam, ubah ke loop dengan stack buatan sendiri. Rekursi tetap pilihan terbaik untuk data bersarang yang wajar dalamnya, seperti tree komentar atau struktur JSON.`
      ) }
    ]
  },

  'satu-url-banyak-protokol': {
    lead: 'Waktu sampai byte pertama bukan hanya urusan backend. Sebagian besar bisa habis sebelum request menyentuh servermu.',
    sections: [
      { id: 'keluhan', title: 'Keluhan yang salah alamat', body: p(
        'Misalnya, sebuah tim menerima keluhan: "Aplikasinya lambat dibuka." Backend memeriksa log dan menemukan endpoint-nya merespons dalam 40 milidetik. Artinya, servernya baik-baik saja. Pengguna tetap mengeluh.',
        'Keduanya bisa sama-sama benar. Log server hanya mencatat waktu sejak request tiba. Semua yang terjadi sebelum itu tidak tercatat, dan di jaringan seluler dengan server di wilayah lain, bagian itu bisa jauh lebih lama daripada 40 milidetik.'
      ) },
      { id: 'hitung-round-trip', title: 'Menghitung round trip', body: p(
        'Round trip adalah waktu bolak-balik antara perangkat dan server. Untuk koneksi HTTPS baru ke domain yang belum pernah dikunjungi, urutannya kira-kira begini:'
      ) + ul(
        `${b('DNS')}: menerjemahkan nama domain ke IP. Bisa nol jika ada di cache, bisa beberapa round trip jika resolver harus bertanya berjenjang.`,
        `${b('TCP')}: jabat tangan SYN, SYN-ACK, ACK. Satu round trip.`,
        `${b('TLS')}: menyepakati kunci. Satu round trip di TLS 1.3, dua di TLS 1.2.`,
        `${b('HTTP')}: request dan response. Satu round trip lagi, ditambah waktu proses server.`
      ) + p('Dengan round trip 150 milidetik, empat sampai lima round trip sudah mendekati tiga perempat detik, sebelum servermu yang cepat itu sempat bekerja.') },
      { id: 'efek-domain', title: 'Setiap domain baru mengulang semuanya', body: p(
        'Halaman atau aplikasi jarang hanya memanggil satu domain. Ada API, CDN gambar, font, analytics, layanan pihak ketiga. Setiap domain baru membutuhkan DNS, TCP, dan TLS sendiri sebelum request pertamanya bisa dikirim.',
        'Inilah alasan teknik seperti menyatukan domain, memakai ulang koneksi, dan HTTP/2 berpengaruh besar. HTTP/2 mengirim banyak request lewat satu koneksi, sehingga jabat tangan cukup sekali. HTTP/3 di atas QUIC melangkah lebih jauh dengan menggabungkan jabat tangan transport dan TLS.'
      ) },
      { id: 'cara-melihat', title: 'Cara melihatnya sendiri', body: p(
        `Buka DevTools browser, tab Network, pilih satu request, lalu buka bagian Timing. Kamu akan melihat ${c('DNS Lookup')}, ${c('Initial connection')}, ${c('SSL')}, dan ${c('Waiting for server response')} sebagai bagian terpisah. Di aplikasi mobile, library HTTP seperti OkHttp menyediakan event listener yang mencatat fase yang sama.`,
        'Begitu angka-angka ini terlihat, diskusinya berubah. Bukan lagi "server lambat atau tidak", tapi "berapa round trip yang bisa dihilangkan". Seringkali jawabannya lebih murah daripada mengoptimasi query.'
      ) }
    ]
  },

  'kenapa-game-memilih-udp': {
    lead: 'TCP dirancang agar tidak ada byte yang hilang. Untuk aplikasi realtime, sifat itu justru menjadi sumber lag.',
    sections: [
      { id: 'kebaikan-tcp', title: 'Kebaikan yang terlalu teguh', body: p(
        'TCP adalah salah satu protokol paling sukses yang pernah dibuat. Ia mengambil jaringan yang tidak bisa diandalkan, di mana paket bisa hilang, tertukar urutan, atau terduplikasi, lalu memberikan aplikasi sebuah aliran byte yang rapi dan lengkap.',
        'Caranya: setiap byte diberi nomor urut, penerima mengonfirmasi yang sudah tiba, dan pengirim mengirim ulang yang belum dikonfirmasi. Penerima tidak akan menyerahkan data ke aplikasi sebelum urutannya lengkap. Untuk mengunduh file atau memuat API, ini persis yang kamu inginkan.'
      ) },
      { id: 'saat-menjadi-masalah', title: 'Saat kebaikan menjadi masalah', body: p(
        'Bayangkan game online yang mengirim posisi pemain berkali-kali per detik. Satu paket berisi posisi hilang. TCP menahan semua paket sesudahnya, padahal paket-paket itu sudah tiba dan berisi posisi yang lebih baru. Game menunggu, lalu menerima semuanya sekaligus. Di layar, karakter diam lalu melompat.',
        `Fenomena ini disebut ${b('head-of-line blocking')}. Yang ironis, data yang sedang ditunggu itu sudah usang saat akhirnya tiba. Posisi setengah detik lalu tidak berguna lagi.`
      ) },
      { id: 'udp-memberi-kendali', title: 'UDP memberi kendali, bukan keandalan', body: p(
        'UDP hampir tidak melakukan apa-apa. Tidak ada koneksi, tidak ada konfirmasi, tidak ada pengiriman ulang. Setiap datagram berdiri sendiri. Kedengarannya seperti kekurangan, tapi bagi aplikasi realtime ini justru kebebasan.',
        'Dengan UDP, aplikasi yang memutuskan apa yang perlu dikirim ulang. Game bisa membiarkan update posisi yang hilang, tapi mengirim ulang event penting seperti "pemain menembak". Video call bisa melewati frame yang hilang dan membiarkan codec menutupi celahnya. Keandalan menjadi keputusan per jenis data, bukan aturan untuk semuanya.'
      ) },
      { id: 'pertanyaan-desain', title: 'Pertanyaan desain yang tepat', body: p(
        'Perdebatan TCP melawan UDP sering dibingkai sebagai andal melawan cepat. Bingkai yang lebih berguna: apakah data ini masih berharga jika terlambat?',
        'Transaksi pembayaran, file, dan respons API: masih berharga, jadi semuanya harus sampai. Suara dalam percakapan, posisi pemain, frame siaran langsung: nilainya turun cepat seiring waktu. Itulah sebabnya teknologi seperti WebRTC dan QUIC dibangun di atas UDP. Mereka menambahkan keandalan secukupnya, di tempat yang dibutuhkan, tanpa membuat satu paket yang hilang menahan seluruh aliran.'
      ) }
    ]
  },

  'bug-yang-hilang-saat-di-debug': {
    lead: 'Bug yang muncul sesekali dan hilang saat diamati hampir selalu punya satu penyebab: urutan eksekusi yang tidak kamu kendalikan.',
    sections: [
      { id: 'gejala', title: 'Gejala yang khas', body: p(
        'Laporan masuk: saldo pengguna kadang tidak cocok. Tidak setiap hari, tidak bisa direproduksi. Kamu menambahkan log dan breakpoint, lalu bug-nya tidak pernah muncul lagi selama kamu mengamati. Setelah log dicabut, laporan datang lagi.',
        'Ini ciri khas bug concurrency. Breakpoint dan log mengubah waktu eksekusi, dan bug jenis ini bergantung pada waktu. Begitu urutannya bergeser sedikit, celahnya tertutup sementara.'
      ) },
      { id: 'pola-baca-tulis', title: 'Polanya hampir selalu sama', body: p(
        `Sebagian besar race condition di aplikasi mengikuti pola ${b('baca, putuskan, tulis')}. Membaca nilai, menghitung sesuatu dari nilai itu, lalu menulis hasilnya. Jika ada pihak lain yang menulis di antara baca dan tulis, perubahannya tertimpa.`,
        `Di TypeScript, banyak yang merasa aman karena JavaScript hanya punya satu thread. Tapi setiap ${c('await')} adalah titik di mana fungsi lain boleh berjalan. Kode berikut terlihat sekuensial, padahal ada celah tepat di tengahnya:`
      ) + pre(`async function tarik(id: string, n: number) {
  const akun = await db.ambil(id)
  await db.simpan(id, akun.saldo - n)
}`) + p(`Dua request bersamaan membaca saldo yang sama, lalu masing-masing menyimpan hasilnya. Satu penarikan lenyap. Perbaikannya adalah membuat database melakukan baca dan tulis dalam satu perintah, misalnya ${c('UPDATE akun SET saldo = saldo - $1 WHERE id = $2')}.`) },
      { id: 'deadlock', title: 'Deadlock: kebalikan yang sama menyebalkannya', body: p(
        'Solusi alami untuk race adalah kunci. Tapi begitu ada dua kunci, muncul masalah baru. Satu alur memegang kunci A lalu meminta B. Alur lain memegang B lalu meminta A. Keduanya menunggu selamanya.',
        'Edward Coffman dan rekan-rekannya pada 1971 merumuskan empat syarat yang harus terpenuhi bersamaan agar deadlock terjadi: mutual exclusion, hold and wait, no preemption, dan circular wait. Kabar baiknya, cukup mematahkan satu. Cara yang paling praktis adalah mematahkan circular wait: tetapkan urutan pengambilan kunci dan patuhi di seluruh kode.'
      ) },
      { id: 'cara-berpikir', title: 'Cara berpikir yang lebih berguna', body: ul(
        'Tanyakan: data apa yang dibagi dan bisa diubah oleh lebih dari satu alur?',
        'Cari celah di antara baca dan tulis, terutama di sekitar await atau pemanggilan I/O.',
        'Jadikan baca-ubah-tulis satu operasi atomik: SQL UPDATE, AtomicInteger, atau Mutex.',
        'Ambil kunci selalu dalam urutan yang sama, dan beri timeout.'
      ) + p('Bug concurrency jarang tertangkap dengan menatap debugger lebih lama. Ia tertangkap dengan membaca kode sambil membayangkan dua eksekusi berjalan berselang-seling di titik terburuk.') }
    ]
  },

  'cache-invalidation-sulit': {
    lead: 'Mengisi cache adalah keputusan teknis. Mengosongkannya adalah keputusan tentang kebenaran data.',
    sections: [
      { id: 'kutipan', title: 'Kutipan yang selalu muncul', body: p(
        '"There are only two hard things in Computer Science: cache invalidation and naming things." Kalimat yang diatribusikan ke Phil Karlton ini sering dikutip sebagai lelucon. Tapi bagian tentang cache bukan lelucon.',
        'Menambahkan cache biasanya hanya beberapa baris. Cek apakah jawabannya sudah tersimpan, kalau belum hitung dan simpan. Performanya langsung terasa. Masalahnya muncul belakangan, ketika data aslinya berubah dan cache tidak tahu.'
      ) },
      { id: 'salinan', title: 'Setiap cache adalah salinan', body: p(
        'Begitu kamu menyimpan hasil query di memori, kamu punya dua sumber kebenaran: database dan salinannya. Database diperbarui oleh banyak jalur, misalnya API, panel admin, job terjadwal, atau migrasi. Salinan hanya diperbarui jika setiap jalur itu ingat untuk melakukannya.',
        'Di situlah kesulitannya. Invalidasi bukan masalah satu fungsi. Ia masalah seluruh sistem: siapa saja yang bisa mengubah data ini, dan apakah semuanya tahu ada cache yang harus dibuang? Satu jalur yang lupa, dan pengguna melihat harga yang sudah tidak berlaku.'
      ) },
      { id: 'pertanyaan-sebenarnya', title: 'Pertanyaan yang sebenarnya', body: p(
        `Karena itu, pertanyaan pertama sebelum menambah cache bukan "pakai Redis atau memori?". Pertanyaannya: ${b('berapa lama data ini boleh salah?')}`
      ) + ul(
        'Daftar kategori produk: beberapa menit basi tidak masalah. TTL saja cukup.',
        'Stok dan harga saat checkout: harus segar. Mungkin jangan di-cache sama sekali di titik itu.',
        'Profil pengguna: boleh di-cache, tapi key wajib menyertakan user ID.'
      ) + p('Jawaban berbeda per jenis data. Satu strategi cache untuk semua hampir selalu salah di salah satu tempat.') },
      { id: 'pola-aman', title: 'Pola yang cenderung aman', body: p(
        'Beberapa kebiasaan mengurangi risiko secara nyata. Saat data ditulis, hapus key cache-nya, jangan menimpanya dengan nilai baru. Menimpa membuka peluang dua penulis saling mendahului dan menyisakan nilai lama di cache.',
        'Selalu pasang TTL, bahkan jika kamu sudah menghapus saat menulis. TTL adalah jaring pengaman untuk jalur yang lupa. Dan waspadai cache stampede: saat key populer kedaluwarsa, ribuan request bisa menghantam database bersamaan. Memberi variasi acak kecil pada TTL atau membiarkan satu request saja yang mengisi ulang membantu meredamnya.',
        'Cache adalah utang yang kamu ambil untuk kecepatan. Tidak masalah, asalkan kamu tahu bunganya.'
      ) }
    ]
  },

  'query-tiba-tiba-lambat': {
    lead: 'Kode yang tidak berubah bisa tetap menjadi lambat. Penyebabnya hampir selalu jumlah data yang berubah.',
    sections: [
      { id: 'skenario', title: 'Skenario yang sering terjadi', body: p(
        'Misalnya, sebuah fitur riwayat pesanan dirilis. Di development dan staging, halamannya terbuka seketika. Enam bulan kemudian, halaman yang sama butuh beberapa detik. Tidak ada yang mengubah query-nya. Tidak ada deploy yang terkait.',
        'Yang berubah adalah tabelnya. Dari ribuan baris menjadi jutaan. Query tanpa index yang tepat melakukan full table scan, dan biayanya naik linear bersama data. Di awal tidak terasa. Lalu suatu hari melewati batas sabar pengguna.'
      ) },
      { id: 'intuisi-b-tree', title: 'Intuisi B-tree dalam satu paragraf', body: p(
        'Index B-tree, yang diperkenalkan Rudolf Bayer dan Edward McCreight pada awal 1970-an, menyimpan nilai kolom dalam keadaan terurut di dalam pohon yang pendek dan lebar. Setiap node berisi banyak key yang membagi rentang nilai. Mencari satu nilai berarti turun dari akar ke daun, beberapa langkah saja walau datanya jutaan baris. Karena daunnya terurut dan bersambung, B-tree juga bagus untuk range seperti tanggal antara dua nilai dan untuk ORDER BY.'
      ) },
      { id: 'index-diabaikan', title: 'Ketika index ada tapi tidak dipakai', body: p(
        'Bagian yang paling membingungkan: index sudah dibuat, query tetap lambat. Biasanya karena bentuk query membuat urutan index tidak bisa dimanfaatkan.'
      ) + ul(
        `Fungsi di kolom: ${c('WHERE LOWER(email) = ...')} tidak memakai index biasa di email. Buat expression index, atau simpan email dalam bentuk yang sudah dinormalisasi.`,
        `Wildcard di depan: ${c("LIKE '%budi'")} tidak tahu harus mulai dari mana.`,
        `Index komposit dengan urutan salah: index ${c('(user_id, dibuat_pada)')} tidak membantu filter yang hanya memakai ${c('dibuat_pada')}.`,
        'Statistik usang: planner salah memperkirakan jumlah baris, lalu memilih rencana yang buruk.'
      ) },
      { id: 'cara-memeriksa', title: 'Cara memeriksa tanpa menebak', body: p(
        `Langkah pertama selalu sama: minta rencana eksekusi. Di PostgreSQL, ${c('EXPLAIN ANALYZE')} menjalankan query dan menunjukkan apa yang benar-benar terjadi.`
      ) + pre(`EXPLAIN ANALYZE
SELECT * FROM pesanan
WHERE user_id = 42
ORDER BY dibuat_pada DESC
LIMIT 20;`) + p(`Cari ${c('Seq Scan')} pada tabel besar, dan bandingkan estimasi jumlah baris dengan jumlah sebenarnya. Selisih yang jauh berarti statistik perlu diperbarui dengan ${c('ANALYZE')}. Untuk query di atas, index ${c('(user_id, dibuat_pada)')} bisa melayani filter dan urutan sekaligus.`) },
      { id: 'kebiasaan', title: 'Kebiasaan yang mencegahnya', body: p(
        'Tes performa dengan data yang mendekati ukuran production, bukan seed berisi sepuluh baris. Tinjau rencana eksekusi saat menambah query baru, bukan saat ada keluhan. Dan ingat bahwa index juga punya harga: setiap INSERT dan UPDATE ikut memperbarui semua index di tabel itu. Index yang tepat sasaran lebih baik daripada index di setiap kolom.'
      ) }
    ]
  },

  'saldo-yang-hilang': {
    lead: 'Kode yang benar di jalur normal bisa salah di dua keadaan yang jarang dites: crash di tengah jalan, dan request yang bersamaan.',
    sections: [
      { id: 'kode-yang-terlihat-benar', title: 'Kode yang terlihat benar', body: p(
        'Fungsi transfer paling sederhana hanya dua langkah: kurangi saldo pengirim, tambah saldo penerima. Dites dengan satu pengguna, hasilnya selalu benar. Review pun biasanya lolos, karena logikanya memang tidak salah.'
      ) + pre(`await db.query(
  "UPDATE akun SET saldo = saldo - $1 WHERE id = $2", [n, dari])
await db.query(
  "UPDATE akun SET saldo = saldo + $1 WHERE id = $2", [n, ke])`) + p('Masalahnya ada di ruang kosong di antara kedua baris itu.') },
      { id: 'crash-di-tengah', title: 'Keadaan pertama: crash di tengah', body: p(
        'Server bisa mati, deploy bisa memutus proses, koneksi database bisa putus, atau query kedua gagal karena constraint. Jika itu terjadi setelah baris pertama dan sebelum baris kedua, saldo pengirim sudah berkurang sementara saldo penerima tidak bertambah. Uang lenyap dari sistem, dan tidak ada error yang menjelaskan ke mana.',
        `Inilah yang dijawab ${b('atomicity')}. Dengan membungkus kedua perintah dalam transaksi, database menjamin keduanya berlaku bersama atau tidak sama sekali. Jika proses mati sebelum COMMIT, database membatalkan perubahan yang setengah jadi saat pulih, berkat log yang ditulis lebih dulu ke disk.`
      ) },
      { id: 'request-bersamaan', title: 'Keadaan kedua: dua request sekaligus', body: p(
        'Transaksi saja belum cukup jika kode membaca saldo ke aplikasi, memeriksanya, lalu menulis hasilnya. Dua penarikan bersamaan bisa sama-sama membaca saldo lama, sama-sama lolos pengecekan, dan sama-sama menulis. Pada isolation level default PostgreSQL, yaitu Read Committed, skenario seperti ini tetap mungkin terjadi.',
        `Ada dua jalan keluar yang umum. Pertama, biarkan database memeriksa dan mengubah dalam satu perintah: ${c('UPDATE akun SET saldo = saldo - $1 WHERE id = $2 AND saldo >= $1')}, lalu periksa jumlah baris yang terpengaruh. Kedua, kunci barisnya lebih dulu dengan ${c('SELECT ... FOR UPDATE')} di dalam transaksi, sehingga transaksi lain harus menunggu.`
      ) },
      { id: 'aturan-praktis', title: 'Aturan praktis', body: ul(
        'Beberapa perubahan yang harus terjadi bersama wajib berada dalam satu transaksi.',
        `Simpan aturan bisnis yang kritis sebagai constraint, misalnya ${c('CHECK (saldo >= 0)')}. Constraint menjaga data dari semua jalur, termasuk yang tidak lewat kodemu.`,
        'Ketahui isolation level database-mu, jangan mengandalkan asumsi.',
        'Jaga transaksi tetap pendek. Jangan memanggil API pihak ketiga atau menunggu input di dalamnya.'
      ) + p('ACID bukan teori untuk ujian. Ia adalah daftar cara data bisa rusak, beserta janji database untuk mencegahnya, asalkan kamu memakainya.') }
    ]
  },

  'teks-rusak-bukan-sihir': {
    lead: 'Teks di disk, di jaringan, dan di database hanyalah deretan byte. Maknanya bergantung pada encoding yang dipakai untuk membacanya.',
    sections: [
      { id: 'mitos-plain-text', title: 'Mitos plain text', body: p(
        'Kita sering menyebut file .txt atau CSV sebagai "plain text", seolah isinya huruf murni. Kenyataannya tidak ada huruf di dalam file. Yang ada hanya angka 0 sampai 255. Encoding adalah tabel yang dipakai program untuk mengubah angka-angka itu menjadi karakter.',
        'Selama penulis dan pembaca memakai tabel yang sama, semuanya terlihat normal. Mojibake, teks yang berubah menjadi simbol aneh, terjadi tepat ketika keduanya memakai tabel berbeda tanpa ada yang menyadarinya.'
      ) },
      { id: 'unicode-dan-utf8', title: 'Unicode dan UTF-8 bukan hal yang sama', body: p(
        `Unicode memberi setiap karakter satu nomor unik, disebut code point. Huruf A adalah ${c('U+0041')}, huruf é adalah ${c('U+00E9')}. Unicode tidak mengatur bagaimana nomor itu disimpan sebagai byte. Itu tugas encoding seperti UTF-8, UTF-16, dan UTF-32.`,
        'UTF-8, yang dirancang Ken Thompson dan Rob Pike pada 1992, memakai 1 sampai 4 byte per karakter. Karakter ASCII tetap 1 byte dengan nilai yang sama, sehingga file ASCII lama otomatis valid sebagai UTF-8. Kecocokan inilah salah satu alasan UTF-8 menjadi encoding dominan di web.'
      ) },
      { id: 'membaca-mojibake', title: 'Membaca pola mojibake', body: p(
        'Mojibake tidak acak, dan polanya bisa dipakai untuk mendiagnosis. Ambil nama "José". Dalam UTF-8, é disimpan sebagai dua byte: C3 dan A9. Jika program lain membacanya dengan Windows-1252 atau Latin-1, setiap byte dianggap satu karakter. C3 menjadi Ã, A9 menjadi ©. Hasilnya "JosÃ©".'
      ) + pre(`const bytes = new TextEncoder().encode("José")
new TextDecoder("windows-1252").decode(bytes) // "JosÃ©"`) + p(`Jadi kalau kamu melihat ${c('Ã')} diikuti simbol lain, hampir pasti itu UTF-8 yang dibaca sebagai Latin-1. Jika teks rusak itu kemudian disimpan ulang sebagai UTF-8, kerusakannya berlapis dan makin panjang. Karena itu, perbaiki di sumbernya, jangan menambal hasilnya.`) },
      { id: 'satu-aturan', title: 'Satu aturan yang mencegah hampir semuanya', body: p(
        `Pakai UTF-8 di semua lapisan, dan tulis secara eksplisit di setiap batas. Header HTTP menyertakan ${c('charset=utf-8')}. Kode yang membaca file menyebut encoding-nya, misalnya ${c('readText(Charsets.UTF_8)')} di Kotlin. Database dan koneksinya memakai charset yang sama.`,
        `Satu jebakan khusus di MySQL: charset ${c('utf8')} di sana secara historis hanya mendukung sampai 3 byte per karakter, sehingga emoji tidak bisa disimpan. Pakai ${c('utf8mb4')}.`,
        'Dan ingat bahwa panjang string bergantung pada apa yang dihitung. String di JavaScript dan Kotlin memakai UTF-16, sehingga satu emoji bisa terhitung dua unit. Hitung byte untuk penyimpanan dan batas kolom, hitung karakter untuk tampilan, dan normalisasi teks dengan NFC sebelum membandingkannya.'
      ) }
    ]
  }
};
