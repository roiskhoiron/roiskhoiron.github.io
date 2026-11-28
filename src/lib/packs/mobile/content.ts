import type { DeckSlide, PostSlide } from '../../data';
import { p, ul, pre, c, b, type Full } from '../../blog-html';

const card = (label: string, title: string, body: string, extra: Partial<PostSlide> = {}): PostSlide =>
  ({ num: '', label, title, body, theme: 'white', ...extra });

export const deckSlides: Record<string, DeckSlide[]> = {
  'lifecycle-android-ios': [
    { layout: 'cover', subtitle: 'Teori mobile', title: 'Lifecycle Aplikasi: Saat Pengguna Pergi', message: 'Aplikasimu tidak memutuskan kapan ia hidup. Sistem operasi yang memutuskan, dan ia tidak selalu memberi kabar.', points: ['Android: Activity dan proses.', 'iOS: state aplikasi dan scene.'] },
    { layout: 'bullets', subtitle: 'Kenapa ada lifecycle', title: 'RAM Itu Terbatas, Baterai Juga', message: 'HP menjalankan puluhan aplikasi, tapi hanya satu yang benar-benar dilihat pengguna.', points: ['Aplikasi di latar belakang menahan memori yang dibutuhkan aplikasi di depan.', 'Sistem membekukan atau mematikan aplikasi yang tidak terlihat.', 'Pengguna tidak tahu, dan tidak peduli, bahwa itu terjadi.', 'Tugasmu: saat dibuka lagi, semuanya terasa seperti tidak pernah pergi.'] },
    { layout: 'cards', subtitle: 'Android', title: 'Callback Activity', message: 'Setiap callback adalah kesempatan untuk menyimpan atau melepas sesuatu.', cards: [
      { title: 'onCreate', desc: 'Activity dibuat. Siapkan UI dan pulihkan state yang tersimpan.', icon: '1' },
      { title: 'onStart / onResume', desc: 'Terlihat, lalu bisa disentuh. Nyalakan kamera atau sensor di sini.', icon: '2' },
      { title: 'onPause / onStop', desc: 'Kehilangan fokus, lalu tidak terlihat. Simpan draf dan lepas sumber daya.', icon: '3' },
      { title: 'onDestroy', desc: 'Bisa tidak dipanggil sama sekali saat proses dimatikan. Jangan simpan data di sini.', icon: '!' }] },
    { layout: 'split', subtitle: 'iOS', leftTitle: 'State Aplikasi', leftPoints: ['Active: di depan dan menerima sentuhan.', 'Inactive: terlihat tapi terganggu, misal ada telepon.', 'Background: masih jalan sebentar, lalu disuspend.'], title: 'Yang sering dilupa', rightTitle: 'Suspended', rightPoints: ['Ada di memori, tapi kodenya tidak berjalan.', 'Bisa diterminasi sistem tanpa callback apa pun.', 'Saat dibuka lagi, aplikasi mulai dari nol.'] },
    { layout: 'bullets', subtitle: 'Jebakan terbesar', title: 'Process Death', message: 'Proses dimatikan saat di latar belakang, lalu pengguna kembali lewat recent apps.', points: ['Android membuat ulang Activity terakhir, tapi semua variabel di memori sudah hilang.', 'ViewModel bertahan saat layar diputar, tapi tidak bertahan dari process death.', 'Data kecil disimpan lewat SavedStateHandle atau onSaveInstanceState.', 'Data besar atau penting disimpan ke disk.'] },
    { layout: 'code', subtitle: 'Contoh Android', title: 'Bertahan dari Process Death', message: 'SavedStateHandle menyimpan nilai kecil yang dipulihkan setelah proses dibuat ulang.', code: `class FormViewModel(
  private val state: SavedStateHandle
) : ViewModel() {

  var draft: String
    get() = state.get<String>("draft") ?: ""
    set(value) { state["draft"] = value }
}`, points: ['Simpan ID dan input pengguna, bukan list besar.'] },
    { layout: 'code', subtitle: 'Contoh Flutter', title: 'Mendengarkan Lifecycle di Flutter', message: 'Sejak Flutter 3.13, AppLifecycleListener memberi callback untuk setiap perubahan state aplikasi.', code: `late final AppLifecycleListener _listener;

@override
void initState() {
  super.initState();
  _listener = AppLifecycleListener(
    onPause: _saveDraft,
    onResume: _refreshData,
  );
}`, points: ['Panggil _listener.dispose() di dispose().', 'Di SwiftUI, padanannya adalah scenePhase.'] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'Aplikasi yang baik terasa tidak pernah pergi, walau sebenarnya sudah dimatikan.', points: ['Anggap aplikasi bisa mati kapan saja setelah tidak terlihat.', 'Simpan pekerjaan pengguna saat onStop atau paused, bukan saat destroy.', 'Uji process death dengan sengaja, jangan menunggu laporan pengguna.'] }
  ],

  'state-management-dari-nol': [
    { layout: 'cover', subtitle: 'Teori mobile', title: 'State Management dari Nol', message: 'Semua framework UI modern sepakat pada satu rumus: UI = f(state). Kalau state-nya rapi, tampilannya ikut rapi.', points: ['Berlaku di framework apa pun.', 'Contoh kodenya dengan Flutter.'] },
    { layout: 'bullets', subtitle: 'Definisi', title: 'Apa Itu State?', message: 'State adalah data yang bisa berubah selama aplikasi berjalan dan memengaruhi tampilan.', points: ['Teks yang sedang diketik di kolom pencarian.', 'Isi keranjang belanja.', 'Status login pengguna.', 'Apakah sebuah panel sedang terbuka atau tertutup.'] },
    { layout: 'split', subtitle: 'Dua jenis', leftTitle: 'State Lokal', leftPoints: ['Hanya dipakai satu widget atau layar.', 'Contoh: tab aktif, animasi, input form.', 'Hilang saat layar ditutup tidak masalah.'], title: 'Dipakai banyak layar', rightTitle: 'State Bersama', rightPoints: ['Dibaca atau diubah dari beberapa tempat.', 'Contoh: user login, keranjang, tema.', 'Butuh satu pemilik yang jelas.'] },
    { layout: 'cards', subtitle: 'Aturan dasar', title: 'Empat Prinsip', message: 'Berlaku di Flutter, SwiftUI, Compose, maupun React.', cards: [
      { title: 'Satu sumber kebenaran', desc: 'Setiap data punya satu pemilik. Yang lain membaca atau meminta perubahan.', icon: '1' },
      { title: 'Jangan simpan turunan', desc: 'Total harga dihitung dari isi keranjang, bukan disimpan terpisah.', icon: '2' },
      { title: 'Angkat seperlunya', desc: 'Naikkan state ke induk terdekat yang membutuhkannya, tidak lebih tinggi.', icon: '3' },
      { title: 'Aliran satu arah', desc: 'Event naik ke pemilik, data turun ke tampilan.', icon: '4' }] },
    { layout: 'code', subtitle: 'Flutter: state lokal', title: 'setState Sudah Cukup', message: 'Untuk state yang hanya milik satu widget, tidak perlu library apa pun.', code: `class _CounterState extends State<Counter> {
  int count = 0; // state lokal

  @override
  Widget build(BuildContext context) {
    return TextButton(
      onPressed: () => setState(() => count++),
      child: Text('Klik: $count'),
    );
  }
}`, points: ['setState memberi tahu Flutter bahwa widget ini perlu dibangun ulang.'] },
    { layout: 'code', subtitle: 'Flutter: state bersama', title: 'ValueNotifier: Berbagi Tanpa Library', message: 'Contoh paling sederhana. Di aplikasi nyata, notifier seperti ini biasanya disediakan lewat Provider atau InheritedWidget.', code: "final cart = ValueNotifier<List<String>>([]);\n\nvoid addItem(String item) {\n  cart.value = [...cart.value, item];\n}\n\n// di widget mana pun:\nValueListenableBuilder<List<String>>(\n  valueListenable: cart,\n  builder: (_, items, __) => Text('${items.length}'),\n)", points: ['List baru dibuat supaya ValueNotifier mendeteksi perubahan.'] },
    { layout: 'bullets', subtitle: 'Lalu kapan butuh library?', title: 'Saat Rasa Sakitnya Nyata', message: 'Provider, Riverpod, atau Bloc menyelesaikan masalah yang spesifik, bukan masalah desain.', points: ['Banyak layar butuh state yang sama dan oper lewat constructor jadi melelahkan.', 'Logic bisnis perlu dites tanpa widget.', 'Pola loading, data, error berulang di mana-mana.', 'Tim butuh pola yang seragam.'] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'Library mengubah cara state dipindahkan, bukan cara state didesain.', points: ['Tanyakan dulu: siapa pemilik data ini?', 'Mulai dari state lokal, angkat saat dibutuhkan.', 'Hitung data turunan, jangan disimpan dua kali.'] }
  ],

  'offline-first-sinkronisasi': [
    { layout: 'cover', subtitle: 'Teori mobile', title: 'Offline-First: Simpan Dulu, Sinkronkan Kemudian', message: 'Aplikasi biasa menganggap jaringan selalu ada. Aplikasi offline-first menganggap jaringan adalah bonus.', points: ['Database lokal sebagai sumber kebenaran.', 'Antrean, konflik, dan optimistic UI.'] },
    { layout: 'bullets', subtitle: 'Masalahnya', title: 'Pola Online-Only', message: 'Setiap aksi menunggu server. Saat sinyal lemah, semuanya ikut macet.', points: ['Spinner berputar tanpa akhir di dalam lift.', 'Input pengguna hilang saat request gagal.', 'Layar kosong, padahal data kemarin masih relevan.'] },
    { layout: 'cards', subtitle: 'Arsitektur', title: 'Empat Komponen Offline-First', message: 'UI membaca dari lokal, menulis ke lokal, dan sinkronisasi berjalan di belakang.', cards: [
      { title: 'Database lokal', desc: 'SQLite, Room, Core Data, atau Drift. UI selalu membaca dari sini.', icon: 'DB' },
      { title: 'Outbox', desc: 'Antrean perubahan yang belum terkirim ke server.', icon: '→' },
      { title: 'Sync worker', desc: 'Mengirim antrean saat ada jaringan dan menarik data baru.', icon: '↻' },
      { title: 'Resolusi konflik', desc: 'Aturan saat data lokal dan data server berbeda.', icon: '!' }] },
    { layout: 'code', subtitle: 'Antrean perubahan', title: 'Setiap Perubahan Masuk Outbox', message: 'Simpan niat pengguna sebagai operasi, bukan hanya hasil akhirnya.', code: `class PendingOp {
  PendingOp({
    required this.id,
    required this.type,
    required this.payload,
  });

  final String id; // juga idempotency key
  final String type; // misal 'note.update'
  final Map<String, Object?> payload;
}`, points: ['ID unik membuat retry tidak menghasilkan data ganda.'] },
    { layout: 'code', subtitle: 'Android', title: 'Kirim Saat Ada Jaringan', message: 'WorkManager menjalankan sync saat syaratnya terpenuhi, bahkan setelah aplikasi ditutup.', code: `val request = OneTimeWorkRequestBuilder<SyncWorker>()
  .setConstraints(
    Constraints.Builder()
      .setRequiredNetworkType(NetworkType.CONNECTED)
      .build()
  )
  .build()

WorkManager.getInstance(context).enqueueUniqueWork(
  "sync", ExistingWorkPolicy.KEEP, request
)`, points: ['Di iOS, BGTaskScheduler bisa menjadwalkan, tapi sistem yang menentukan waktunya.'] },
    { layout: 'bullets', subtitle: 'Optimistic UI', title: 'Tampilkan Dulu, Konfirmasi Kemudian', message: 'Pengguna melihat perubahannya seketika. Server menyusul.', points: ['Tulis ke database lokal dan perbarui UI langsung.', 'Tandai item sebagai "menunggu sinkron".', 'Jika server menolak, kembalikan perubahannya dan beri tahu pengguna dengan jelas.'] },
    { layout: 'cards', subtitle: 'Konflik', title: 'Saat Dua Perangkat Tidak Sepakat', message: 'Tidak ada satu strategi yang benar untuk semua jenis data.', cards: [
      { title: 'Last write wins', desc: 'Sederhana, tapi bergantung pada jam perangkat dan bisa membuang perubahan.', icon: 'LW' },
      { title: 'Nomor versi', desc: 'Server menolak update dari versi lama. Klien mengambil ulang lalu mencoba lagi.', icon: 'v' },
      { title: 'Merge per field', desc: 'Judul dari A, isi dari B. Cocok untuk form dan catatan.', icon: '+' },
      { title: 'Tanya pengguna', desc: 'Tampilkan kedua versi. Untuk data yang mahal jika salah.', icon: '?' }] },
    { layout: 'split', subtitle: 'Jujur saja', leftTitle: 'Manfaatnya', leftPoints: ['Aplikasi terasa instan.', 'Tetap berguna di sinyal buruk.', 'Input pengguna tidak hilang.'], title: 'Biayanya', rightTitle: 'Harganya', rightPoints: ['Skema data ada di dua tempat.', 'Konflik harus didesain, bukan diabaikan.', 'Lebih banyak kasus untuk dites.'] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'Di mobile, offline bukan kasus pinggiran. Itu kondisi sehari-hari.', points: ['UI membaca dari database lokal.', 'Perubahan masuk antrean dengan ID unik.', 'Pilih strategi konflik per jenis data, sebelum konfliknya terjadi.'] }
  ],

  'perjalanan-push-notification': [
    { layout: 'cover', subtitle: 'Teori mobile', title: 'Perjalanan Sebuah Push Notification', message: 'HP pengguna tidak punya alamat publik yang bisa dipanggil server-mu. Notifikasi selalu lewat perantara milik Google atau Apple.', points: ['Android: Firebase Cloud Messaging (FCM).', 'iOS: Apple Push Notification service (APNs).'] },
    { layout: 'bullets', subtitle: 'Masalahnya', title: 'Kenapa Tidak Langsung Saja?', message: 'Kalau setiap aplikasi membuka koneksinya sendiri, baterai akan habis.', points: ['HP berpindah jaringan dan alamat IP-nya terus berganti.', 'HP berada di balik NAT operator, tidak bisa dihubungi dari luar.', 'Solusinya: satu koneksi permanen milik sistem, dipakai bersama semua aplikasi.'] },
    { layout: 'cards', subtitle: 'Alurnya', title: 'Empat Langkah', message: 'Dari pendaftaran perangkat sampai notifikasi muncul di layar.', cards: [
      { title: 'Minta token', desc: 'Aplikasi mendaftar ke FCM atau APNs dan menerima token perangkat.', icon: '1' },
      { title: 'Simpan di server', desc: 'Aplikasi mengirim token itu ke backend-mu, dikaitkan dengan user.', icon: '2' },
      { title: 'Server mengirim', desc: 'Backend memanggil API FCM atau APNs dengan token tujuan.', icon: '3' },
      { title: 'OS menampilkan', desc: 'Pesan tiba lewat koneksi sistem, lalu OS atau aplikasimu menampilkannya.', icon: '4' }] },
    { layout: 'code', subtitle: 'Dari backend', title: 'Mengirim lewat FCM HTTP v1', message: 'Body JSON dikirim ke endpoint messages:send milik project Firebase-mu, dengan access token OAuth 2.0.', code: `{
  "message": {
    "token": "TOKEN_PERANGKAT",
    "notification": {
      "title": "Pesanan dikirim",
      "body": "Kurir sedang menuju alamatmu"
    },
    "data": { "orderId": "4821" }
  }
}`, points: ['API legacy FCM sudah dihentikan. Gunakan HTTP v1.', 'Untuk perangkat iOS, FCM meneruskan pesan ke APNs.'] },
    { layout: 'split', subtitle: 'Dua jenis pesan', leftTitle: 'Notification', leftPoints: ['Punya title dan body.', 'Ditampilkan sistem saat app di latar belakang.', 'Kode aplikasimu tidak perlu berjalan.'], title: 'Untuk logic', rightTitle: 'Data', rightPoints: ['Hanya key-value untuk aplikasimu.', 'Aplikasi yang memutuskan apa yang dilakukan.', 'Pemrosesan di latar belakang dibatasi OS.'] },
    { layout: 'bullets', subtitle: 'Di sisi iOS', title: 'Yang Khas dari APNs', message: 'FCM di iOS tetap mengirim lewat APNs, jadi aturan Apple berlaku.', points: ['Kamu perlu mengunggah APNs authentication key (.p8) ke Firebase.', 'Izin notifikasi wajib diminta lewat requestAuthorization.', 'Silent push (content-available) dibatasi sistem dan bisa tidak sampai.', 'Setelah pengguna force quit, aplikasi tidak dibangunkan oleh silent push.'] },
    { layout: 'cards', subtitle: 'Kenapa tidak sampai', title: 'Empat Tersangka Umum', message: 'Notifikasi yang hilang hampir selalu punya penjelasan.', cards: [
      { title: 'Token basi', desc: 'Token bisa berganti setelah reinstall atau restore. Perbarui di server.', icon: '1' },
      { title: 'Izin ditolak', desc: 'Android 13+ dan iOS meminta izin. Tanpa izin, tidak ada yang tampil.', icon: '2' },
      { title: 'Hemat daya', desc: 'Doze di Android dan pembatasan background bisa menunda pesan.', icon: '3' },
      { title: 'Dihentikan paksa', desc: 'Di Android, app yang di-force stop tidak menerima pesan sampai dibuka lagi.', icon: '4' }] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'Push adalah pengingat, bukan jalur data utama.', points: ['Server selalu bicara lewat FCM atau APNs, tidak pernah ke HP langsung.', 'Perbarui token setiap kali berubah, hapus token yang ditolak.', 'Saat aplikasi dibuka, ambil data terbaru dari server.'] }
  ],

  'jank-anggaran-16-ms': [
    { layout: 'cover', subtitle: 'Teori mobile', title: 'Jank dan Anggaran 16 Milidetik', message: 'Satu detik dibagi 60 frame, sisanya sekitar 16,7 ms per frame. Semua kerja untuk satu frame harus muat di situ.', points: ['Kenapa scroll tersendat.', 'Cara mengukur dan memperbaikinya.'] },
    { layout: 'bullets', subtitle: 'Angkanya', title: 'Anggaran Makin Kecil', message: 'Layar dengan refresh rate tinggi memotong jatahmu.', points: ['60 Hz: sekitar 16,7 ms per frame.', '90 Hz: sekitar 11,1 ms.', '120 Hz: sekitar 8,3 ms.', 'Lewat anggaran, frame terlewat dan mata menangkapnya sebagai patah.'] },
    { layout: 'split', subtitle: 'Di Flutter', leftTitle: 'UI Thread', leftPoints: ['Menjalankan kode Dart-mu.', 'Build, layout, dan menyusun layer.', 'Kerja berat di sini menahan frame.'], title: 'Keduanya harus muat', rightTitle: 'Raster Thread', rightPoints: ['Mengubah layer menjadi piksel lewat GPU.', 'Mahal untuk efek seperti blur dan clip.', 'Bisa jadi penyebab meski kode Dart-mu ringan.'] },
    { layout: 'cards', subtitle: 'Penyebab umum', title: 'Empat Pencuri Waktu Frame', message: 'Hampir semua jank berasal dari salah satu ini.', cards: [
      { title: 'Kerja berat di thread UI', desc: 'Parse JSON besar, baca file, atau hitungan berat di thread UI.', icon: '1' },
      { title: 'Gambar kebesaran', desc: 'Foto 4000 px di-decode penuh untuk thumbnail 80 px.', icon: '2' },
      { title: 'List tidak lazy', desc: 'Membangun ribuan item sekaligus, bukan yang terlihat saja.', icon: '3' },
      { title: 'Rebuild terlalu luas', desc: 'Satu setState di root membangun ulang seluruh layar.', icon: '4' }] },
    { layout: 'code', subtitle: 'Perbaikan 1', title: 'Pindahkan Kerja Berat ke Isolate', message: 'Isolate.run menjalankan fungsi di isolate lain, lalu mengembalikan hasilnya.', code: `import 'dart:convert';
import 'dart:isolate';

Future<List<Product>> parseProducts(String body) {
  return Isolate.run(() {
    final list = jsonDecode(body) as List<dynamic>;
    return [
      for (final e in list)
        Product.fromJson(e as Map<String, dynamic>),
    ];
  });
}`, points: ['Di Kotlin, padanannya withContext(Dispatchers.Default).'] },
    { layout: 'code', subtitle: 'Perbaikan 2', title: 'Bangun yang Terlihat Saja', message: 'ListView.builder membuat item sesuai kebutuhan saat di-scroll.', code: `ListView.builder(
  itemCount: products.length,
  itemBuilder: (context, i) => ListTile(
    leading: Image.network(
      products[i].thumbUrl,
      cacheWidth: 160, // decode kecil saja
    ),
    title: Text(products[i].name),
  ),
)`, points: ['cacheWidth membuat gambar di-decode seukuran tampilannya.'] },
    { layout: 'bullets', subtitle: 'Mengukur', title: 'Ukur Dulu, Tebak Belakangan', message: 'Perbaikan tanpa data sering mengenai bagian yang salah.', points: ['Flutter: jalankan flutter run --profile dan buka DevTools Performance.', 'Android: Android Studio Profiler atau Perfetto.', 'iOS: Instruments, misalnya template Time Profiler.', 'Selalu uji di HP kelas bawah, bukan HP developer.'] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'Jank adalah masalah anggaran waktu, bukan sekadar kode yang lambat.', points: ['Ketahui anggaranmu: 16,7 ms di 60 Hz, lebih kecil di 120 Hz.', 'Thread UI hanya untuk UI. Kerja berat dipindahkan.', 'Ukur di profile mode pada perangkat nyata.'] }
  ],

  'cold-start-ukuran-app': [
    { layout: 'cover', subtitle: 'Teori mobile', title: 'Kenapa Aplikasimu Lambat Dibuka', message: 'Pengguna menilai aplikasimu bahkan sebelum layar pertama muncul. Cold start adalah kesan pertama yang terulang setiap hari.', points: ['Cold, warm, dan hot start.', 'Ukuran app dan apa yang terjadi saat startup.'] },
    { layout: 'cards', subtitle: 'Istilah', title: 'Tiga Jenis Start', message: 'Tidak semua pembukaan aplikasi sama beratnya.', cards: [
      { title: 'Cold start', desc: 'Proses belum ada. Semua dibuat dari nol. Paling lambat.', icon: 'C' },
      { title: 'Warm start', desc: 'Proses masih ada, tapi Activity atau layar perlu dibuat ulang.', icon: 'W' },
      { title: 'Hot start', desc: 'Aplikasi hanya dibawa kembali ke depan. Paling cepat.', icon: 'H' },
      { title: 'Yang dioptimalkan', desc: 'Fokus ke cold start. Dua lainnya biasanya ikut membaik.', icon: '!' }] },
    { layout: 'bullets', subtitle: 'Di balik layar', title: 'Apa yang Terjadi Saat Cold Start', message: 'Urutan kasarnya mirip di Android dan iOS.', points: ['Sistem membuat proses dan memuat kode aplikasi.', 'Library dan framework dimuat ke memori.', 'Kode inisialisasimu berjalan: Application.onCreate atau AppDelegate.', 'Layar pertama dibangun dan frame pertama digambar.'] },
    { layout: 'cards', subtitle: 'Penyebab umum', title: 'Yang Membuat Startup Berat', message: 'Sebagian besar ada di kendalimu, bukan di framework.', cards: [
      { title: 'SDK init berantai', desc: 'Analytics, crash, iklan, chat. Semua diinisialisasi sebelum layar pertama.', icon: '1' },
      { title: 'I/O sinkron', desc: 'Membaca file besar atau database di main thread saat startup.', icon: '2' },
      { title: 'Menunggu jaringan', desc: 'Menunggu respons API sebelum menampilkan apa pun.', icon: '3' },
      { title: 'Binary gemuk', desc: 'Lebih banyak kode dan library berarti lebih banyak yang dimuat.', icon: '4' }] },
    { layout: 'code', subtitle: 'Perbaikan', title: 'Tunda yang Tidak Dibutuhkan Sekarang', message: 'Hanya yang dibutuhkan layar pertama yang boleh berjalan saat startup.', code: `class App : Application() {
  override fun onCreate() {
    super.onCreate()
    CrashReporter.init(this) // perlu sejak awal
  }
}

object Services {
  // dibuat saat pertama kali dipakai
  val analytics by lazy { Analytics.create() }
  val chat by lazy { ChatSdk.connect() }
}`, points: ['CrashReporter, Analytics, dan ChatSdk di sini hanya contoh nama.'] },
    { layout: 'bullets', subtitle: 'Ukuran aplikasi', title: 'Lebih Kecil, Lebih Cepat Diunduh', message: 'Ukuran memengaruhi apakah orang jadi menginstal, terutama yang kuotanya terbatas.', points: ['Android App Bundle: Play membuat APK khusus per perangkat.', 'R8 membuang kode dan resource yang tidak dipakai.', 'Flutter: flutter build apk --analyze-size --target-platform=android-arm64.', 'Kompres aset, dan pertimbangkan mengunduh aset besar belakangan.'] },
    { layout: 'code', subtitle: 'Mengukur', title: 'Ukur Cold Start di Android', message: 'Hentikan aplikasi dulu, lalu jalankan dengan flag -W untuk melihat waktunya.', code: `adb shell am force-stop com.contoh.app
adb shell am start -W -n com.contoh.app/.MainActivity

# output-nya memuat baris seperti:
# TotalTime: ...`, points: ['iOS: template App Launch di Instruments dan metrik launch di Xcode Organizer.'] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'Startup cepat lahir dari menolak pekerjaan, bukan dari menambah splash screen.', points: ['Ukur cold start di HP kelas bawah, dengan build release.', 'Tunda inisialisasi SDK yang tidak dibutuhkan layar pertama.', 'Di Android, pertimbangkan Baseline Profiles untuk jalur startup.'] }
  ],

  'kotlin-coroutines-dasar': [
    { layout: 'cover', subtitle: 'Tutorial Kotlin', title: 'Kotlin Coroutines: Suspend, Scope, dan Struktur', message: 'Coroutine adalah komputasi yang bisa dijeda tanpa memblokir thread. Hasilnya: kode async yang terbaca dari atas ke bawah.', points: ['Butuh: kotlinx-coroutines.', 'Contoh dari ViewModel Android.'] },
    { layout: 'bullets', subtitle: 'Masalahnya', title: 'Sebelum Ada Coroutine', message: 'Kode async dulu identik dengan callback bertingkat.', points: ['Main thread tidak boleh menunggu jaringan.', 'Callback di dalam callback sulit dibaca dan sulit diberi error handling.', 'Membatalkan pekerjaan saat layar ditutup sering terlupa.'] },
    { layout: 'code', subtitle: 'Konsep 1', title: 'suspend: Bisa Dijeda', message: 'Fungsi suspend bisa menunggu tanpa menahan thread. Ia hanya bisa dipanggil dari coroutine atau fungsi suspend lain.', code: `suspend fun loadProfile(id: String): Profile {
  // thread dilepas selama menunggu
  return withContext(Dispatchers.IO) {
    api.getProfile(id)
  }
}`, points: ['withContext memindahkan kerja ke dispatcher lain, lalu kembali.'] },
    { layout: 'cards', subtitle: 'Konsep 2', title: 'Dispatcher: Di Mana Kode Jalan', message: 'Dispatcher menentukan thread atau pool yang menjalankan coroutine.', cards: [
      { title: 'Dispatchers.Main', desc: 'Thread UI. Untuk memperbarui tampilan.', icon: 'M' },
      { title: 'Dispatchers.IO', desc: 'Untuk menunggu: jaringan, disk, database.', icon: 'IO' },
      { title: 'Dispatchers.Default', desc: 'Untuk menghitung: parsing, sorting, kompresi.', icon: 'D' },
      { title: 'Library modern', desc: 'Fungsi suspend di Room dan Retrofit aman dipanggil dari Main.', icon: '!' }] },
    { layout: 'code', subtitle: 'Konsep 3', title: 'Scope: Siapa Pemiliknya', message: 'Setiap coroutine diluncurkan di dalam scope. Saat scope dibatalkan, semua anaknya ikut berhenti.', code: `class ProfileViewModel(
  private val repo: ProfileRepository
) : ViewModel() {

  fun load(id: String) {
    viewModelScope.launch {
      val profile = repo.loadProfile(id)
      _ui.value = UiState.Ready(profile)
    }
  }
}`, points: ['viewModelScope dibatalkan otomatis saat ViewModel dibersihkan.'] },
    { layout: 'code', subtitle: 'Konsep 4', title: 'launch vs async', message: 'launch untuk "kerjakan saja", async untuk "kerjakan dan kembalikan hasilnya".', code: `suspend fun loadHome(): Home = coroutineScope {
  val user = async { api.user() }
  val feed = async { api.feed() }
  Home(user.await(), feed.await())
}`, points: ['Dua request berjalan paralel.', 'Jika feed gagal, request user ikut dibatalkan.'] },
    { layout: 'bullets', subtitle: 'Konsep 5', title: 'Structured Concurrency', message: 'Coroutine membentuk pohon induk dan anak, mirip blok kode biasa.', points: ['Induk menunggu semua anaknya selesai.', 'Pembatalan induk menjalar ke semua anak.', 'Error di anak membatalkan induk dan saudaranya, kecuali memakai SupervisorJob.', 'Tidak ada coroutine yang tertinggal tanpa pemilik.'] },
    { layout: 'split', subtitle: 'Pembatalan', leftTitle: 'Kooperatif', leftPoints: ['Pembatalan dicek di titik suspend.', 'Loop berat perlu memanggil ensureActive().', 'delay, withContext, dan await sudah mengecek.'], title: 'Hati-hati', rightTitle: 'Jangan Telan Sinyalnya', rightPoints: ['CancellationException adalah sinyal, bukan error.', 'catch (e: Exception) bisa ikut menangkapnya.', 'Lempar ulang jika tertangkap.'] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'Coroutine membuat kode async terbaca seperti kode biasa, asal strukturnya dijaga.', points: ['suspend menunggu tanpa memblokir thread.', 'Pilih dispatcher sesuai jenis kerjanya.', 'Luncurkan dari scope yang umurnya jelas, bukan GlobalScope.'] }
  ],

  'swiftui-state-binding': [
    { layout: 'cover', subtitle: 'Tutorial SwiftUI', title: 'SwiftUI: @State dan @Binding dengan Benar', message: 'Di SwiftUI kamu tidak mengubah tampilan. Kamu mengubah data, lalu SwiftUI menghitung ulang body.', points: ['@State: memiliki data.', '@Binding: meminjam akses tulis.'] },
    { layout: 'bullets', subtitle: 'Dasarnya', title: 'View Adalah Struct Sementara', message: 'SwiftUI membuat ulang struct view setiap kali perlu. Variabel biasa tidak akan bertahan.', points: ['Struct view itu ringan dan sering dibuat ulang.', 'Properti biasa di struct tidak bisa diubah dari dalam body.', 'Butuh penyimpanan yang dikelola SwiftUI: itulah @State.'] },
    { layout: 'code', subtitle: '@State', title: 'Data Milik View Itu Sendiri', message: 'SwiftUI menyimpan nilai @State di luar struct dan menggambar ulang saat nilainya berubah.', code: `struct CounterView: View {
  @State private var count = 0

  var body: some View {
    VStack {
      Text("Hitungan: \\(count)")
      Stepper("Tambah", value: $count)
    }
  }
}`, points: ['Tandai @State sebagai private: ia milik view ini saja.'] },
    { layout: 'split', subtitle: 'Tanda dolar', leftTitle: 'count', leftPoints: ['Nilainya: Int.', 'Untuk dibaca dan ditampilkan.', 'Bisa diubah di dalam view pemiliknya.'], title: 'Dua cara akses', rightTitle: '$count', rightPoints: ['Tipenya: Binding<Int>.', 'Akses baca-tulis ke sumber yang sama.', 'Dioper ke view lain yang perlu mengubahnya.'] },
    { layout: 'code', subtitle: '@Binding', title: 'Meminjam Data dari Parent', message: 'Child tidak memiliki data. Ia memegang jalur baca-tulis ke data milik parent.', code: `struct SettingRow: View {
  let title: String
  @Binding var isOn: Bool

  var body: some View {
    Toggle(title, isOn: $isOn)
  }
}

// di parent yang punya @State darkMode:
SettingRow(title: "Mode gelap", isOn: $darkMode)`, points: ['Saat child mengubah isOn, yang berubah adalah @State di parent.'] },
    { layout: 'cards', subtitle: 'Memilih', title: 'Kapan Pakai Apa', message: 'Tanyakan satu hal: siapa pemilik data ini?', cards: [
      { title: '@State', desc: 'View ini pemiliknya, dan nilainya sederhana: angka, teks, bool.', icon: 'S' },
      { title: '@Binding', desc: 'Data milik parent, dan child perlu mengubahnya.', icon: 'B' },
      { title: 'let biasa', desc: 'Child hanya menampilkan, tidak mengubah.', icon: 'L' },
      { title: '@Observable', desc: 'Model dengan banyak data yang dipakai banyak view (iOS 17+).', icon: 'O' }] },
    { layout: 'bullets', subtitle: 'Jebakan', title: 'Tiga Kesalahan Umum', message: 'Semuanya berasal dari pemilik data yang tidak jelas.', points: ['Menyalin data parent ke @State child: nilai awalnya hanya dibaca sekali.', 'Membuat @State tidak private lalu mencoba mengisinya dari luar.', 'Menyimpan data yang sama di dua @State lalu berusaha menyamakannya.'] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'Setiap data punya satu pemilik. Sisanya membaca atau meminjam.', points: ['@State untuk data lokal milik view.', '$ menghasilkan Binding ke data yang sama.', '@Binding untuk child yang perlu mengubah data parent.'] }
  ],

  'flutter-tiga-pohon': [
    { layout: 'cover', subtitle: 'Teori Flutter', title: 'Flutter di Balik Layar: Tiga Pohon', message: 'Widget hanyalah konfigurasi yang dibuang dan dibuat ulang. Element dan RenderObject yang bertahan dan bekerja.', points: ['Widget, Element, RenderObject.', 'Dan kenapa key itu penting.'] },
    { layout: 'cards', subtitle: 'Pembagian kerja', title: 'Tiga Pohon, Tiga Tugas', message: 'Masing-masing punya peran yang berbeda.', cards: [
      { title: 'Widget', desc: 'Deskripsi immutable: "teks ini, warna ini". Murah dibuat.', icon: 'W' },
      { title: 'Element', desc: 'Instans widget di posisi tertentu. Menyimpan State dan menghubungkan pohon.', icon: 'E' },
      { title: 'RenderObject', desc: 'Mengurus layout, paint, dan hit test. Mahal, jadi dipakai ulang.', icon: 'R' },
      { title: 'BuildContext', desc: 'Sebenarnya adalah Element: posisi widget di dalam pohon.', icon: 'C' }] },
    { layout: 'bullets', subtitle: 'Siklusnya', title: 'Apa yang Terjadi Saat setState', message: 'setState tidak menggambar apa pun secara langsung.', points: ['Element milik widget itu ditandai dirty.', 'Di frame berikutnya, build dipanggil dan menghasilkan widget baru.', 'Element membandingkan widget baru dengan yang lama.', 'Hanya RenderObject yang berubah yang diperbarui.'] },
    { layout: 'code', subtitle: 'Inti perbandingan', title: 'Widget.canUpdate', message: 'Versi ringkas dari logika di source Flutter: Element dipakai ulang jika tipe dan key-nya sama.', code: `static bool canUpdate(Widget a, Widget b) {
  return a.runtimeType == b.runtimeType &&
      a.key == b.key;
}`, points: ['Tipe dan key sama: update. Selain itu: buang, lalu buat baru.'] },
    { layout: 'split', subtitle: 'Akibatnya', leftTitle: 'Element Dipakai Ulang', leftPoints: ['State tetap ada.', 'RenderObject cukup di-update.', 'Murah.'], title: 'Dua kemungkinan', rightTitle: 'Element Dibuang', rightPoints: ['State hilang.', 'RenderObject dibuat ulang.', 'Lebih mahal, dan bisa memicu bug.'] },
    { layout: 'code', subtitle: 'Key', title: 'Kenapa List Butuh Key', message: 'Tanpa key, Element dicocokkan berdasarkan urutan. Hapus item pertama, dan state bisa menempel ke item yang salah.', code: `ListView(
  children: [
    for (final t in todos)
      TodoTile(
        key: ValueKey(t.id),
        todo: t,
      ),
  ],
)`, points: ['Gunakan ID yang stabil, bukan index.'] },
    { layout: 'bullets', subtitle: 'Praktik', title: 'Bantu Flutter Bekerja Lebih Sedikit', message: 'Tiga kebiasaan yang memanfaatkan cara kerja pohon.', points: ['Pakai const constructor: widget const yang identik bisa dilewati saat rebuild.', 'Pecah widget besar supaya setState hanya membangun ulang bagian kecil.', 'Beri key pada item list yang punya state atau bisa berpindah urutan.'] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'Rebuild itu murah karena yang dibuat ulang hanya deskripsi.', points: ['Widget adalah konfigurasi, Element adalah identitas, RenderObject adalah pekerja.', 'Tipe dan key menentukan apakah Element dipakai ulang.', 'Key yang stabil mencegah state tertukar.'] }
  ],

  'rilis-aplikasi-mobile': [
    { layout: 'cover', subtitle: 'Tutorial rilis', title: 'Merilis Aplikasi Mobile Tanpa Deg-degan', message: 'Website bisa diganti dalam menit. Aplikasi yang sudah terpasang tetap di HP pengguna sampai mereka update. Rilis harus dirancang untuk itu.', points: ['Versi, rollout bertahap, review.', 'Contoh perintah dengan Flutter.'] },
    { layout: 'split', subtitle: 'Dua nomor', leftTitle: 'Version Name', leftPoints: ['Untuk manusia: 1.4.2.', 'Android: versionName.', 'iOS: CFBundleShortVersionString.'], title: 'Untuk mesin', rightTitle: 'Build Number', rightPoints: ['Bilangan bulat yang terus naik.', 'Android: versionCode.', 'iOS: CFBundleVersion.'] },
    { layout: 'code', subtitle: 'Flutter', title: 'Satu Baris untuk Keduanya', message: 'Di pubspec.yaml, angka setelah tanda + adalah build number.', code: `# pubspec.yaml
version: 1.4.2+37

# atau timpa saat build:
flutter build appbundle \\
  --build-name=1.4.2 --build-number=37
flutter build ipa \\
  --build-name=1.4.2 --build-number=37`, points: ['Naikkan build number setiap kali mengunggah build baru.'] },
    { layout: 'bullets', subtitle: 'Semantic Versioning', title: 'Arti Tiga Angka', message: 'Format MAJOR.MINOR.PATCH membuat tim dan pengguna paham besarnya perubahan.', points: ['PATCH: perbaikan bug, misalnya 1.4.2 ke 1.4.3.', 'MINOR: fitur baru yang tidak merusak, misalnya 1.4 ke 1.5.', 'MAJOR: perubahan besar, misalnya desain ulang total.', 'Untuk aplikasi, ini konvensi tim, bukan aturan store.'] },
    { layout: 'cards', subtitle: 'Sebelum ke publik', title: 'Jalur Uji Coba', message: 'Biarkan orang lain menemukan masalah sebelum semua pengguna menemukannya.', cards: [
      { title: 'Internal testing', desc: 'Play Console: build sampai ke tim dengan cepat.', icon: 'A' },
      { title: 'Closed / open testing', desc: 'Play Console: kelompok tester yang lebih luas.', icon: 'B' },
      { title: 'TestFlight', desc: 'iOS: tester internal dan eksternal sebelum rilis.', icon: 'T' },
      { title: 'Dashboard crash', desc: 'Pantau crash dan ANR dari build uji, bukan hanya dari rilis.', icon: '!' }] },
    { layout: 'split', subtitle: 'Rollout bertahap', leftTitle: 'Google Play', leftPoints: ['Staged rollout ke persentase pengguna.', 'Persentase dinaikkan bertahap.', 'Rollout bisa dihentikan jika ada masalah.'], title: 'Prinsipnya sama', rightTitle: 'App Store', rightPoints: ['Phased release selama 7 hari.', 'Berlaku untuk update otomatis.', 'Bisa dijeda; update manual tetap bisa.'] },
    { layout: 'bullets', subtitle: 'Review', title: 'Lolos Review di Percobaan Pertama', message: 'Kebanyakan penolakan berasal dari hal yang bisa dicek sebelum submit.', points: ['Sediakan akun demo jika ada fitur di balik login.', 'Isi data privasi dan Data safety sesuai yang benar-benar dikumpulkan.', 'Pastikan tidak ada konten placeholder, link rusak, atau crash di alur utama.', 'Tulis catatan untuk reviewer jika cara menguji sebuah fitur tidak jelas.'] },
    { layout: 'cards', subtitle: 'Jaring pengaman', title: 'Siapkan Sebelum Butuh', message: 'Karena versi lama tidak bisa ditarik dari HP pengguna.', cards: [
      { title: 'Feature flag', desc: 'Matikan fitur bermasalah dari server tanpa rilis baru.', icon: 'F' },
      { title: 'Force update', desc: 'Minta pengguna memperbarui dari versi yang rusak parah.', icon: 'U' },
      { title: 'API kompatibel', desc: 'Backend tetap melayani versi aplikasi lama.', icon: 'A' },
      { title: 'Jalur hotfix', desc: 'Branch dan pipeline siap untuk rilis patch.', icon: 'H' }] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'Rilis mobile bukan satu klik, tapi proses yang punya rem darurat.', points: ['Version name untuk manusia, build number untuk store.', 'Rilis bertahap dan pantau crash sebelum menaikkan persentase.', 'Anggap setiap versi akan hidup lama di HP pengguna.'] }
  ]
};

export const postSlides: Record<string, PostSlide[]> = {
  'aplikasi-bisa-dibunuh': [
    card('teori', 'Aplikasimu Tidak Tidur. Ia Bisa Dibunuh.', 'Pengguna mengisi form, pindah ke chat sebentar, lalu kembali. Form-nya kosong. Ini yang sebenarnya terjadi.'),
    card('ditinggal', 'Tidak Terlihat Berarti Rentan', 'Begitu aplikasimu tidak terlihat, sistem boleh membekukannya, lalu mematikannya saat butuh memori. Tanpa peringatan.'),
    card('android', 'Dibuat Ulang, Tapi Kosong', 'Saat pengguna kembali, Android membuat ulang layar terakhir. Layarnya sama, isi memorinya sudah hilang.', { bullets: ['Variabel biasa: hilang.', 'ViewModel: hilang setelah process death.', 'SavedStateHandle dan disk: selamat.'] }),
    card('ios', 'iOS Sama Kerasnya', 'Aplikasi di background segera disuspend. Aplikasi yang disuspend bisa diterminasi kapan saja, tanpa callback apa pun.'),
    card('solusinya', 'Simpan Saat Pergi, Bukan Saat Mati', 'Callback saat dimatikan tidak bisa diandalkan. Simpan saat layar berhenti terlihat.', { code: `override fun onStop() {
  super.onStop()
  viewModel.saveDraft()
}` }),
    card('uji', 'Uji dengan Sengaja', "Kirim app ke background, lalu matikan prosesnya dengan adb shell am kill. Opsi \"Don't keep activities\" di Developer options juga membantu.")
  ],

  'state-lokal-atau-bersama': [
    card('teori', 'Lokal atau Bersama? Tanyakan Satu Hal Ini', 'Sebelum memilih library state management, tanyakan: siapa saja yang perlu tahu data ini?'),
    card('definisi', 'State Itu Apa?', 'Data yang bisa berubah dan memengaruhi tampilan. Kalau ia berubah, layar harus ikut berubah.', { bullets: ['Teks di kolom pencarian.', 'Isi keranjang.', 'Status login.'] }),
    card('lokal', 'Hanya Satu Widget yang Peduli?', 'Simpan di widget itu. setState sudah cukup, tidak perlu library.', { code: `int tab = 0;

onTap: (i) => setState(() => tab = i),` }),
    card('bersama', 'Banyak Layar yang Peduli?', 'Angkat state ke satu pemilik di atas mereka. Layar lain membaca dan mengirim event, bukan menyimpan salinan sendiri.'),
    card('jebakan', 'Jangan Simpan Dua Salinan', 'Dua salinan data yang sama pasti suatu saat berbeda. Total harga dihitung dari isi keranjang, bukan disimpan sendiri.'),
    card('aturan', 'Aturan Praktisnya', 'Mulai dari lokal. Angkat saat ada layar kedua yang butuh. Pakai library saat oper data lewat constructor mulai menyakitkan.')
  ],

  'sinyal-hilang-kondisi-normal': [
    card('teori', 'Sinyal Hilang Bukan Error', 'Lift, basement, kereta bawah tanah. Bagi pengguna mobile, offline adalah bagian dari hari biasa.'),
    card('masalahnya', 'Spinner yang Tidak Pernah Berhenti', 'Aplikasi online-only menunggu server untuk setiap aksi. Sinyal melemah, aplikasinya ikut lumpuh.'),
    card('polanya', 'Baca dari Lokal, Selalu', 'Database di HP menjadi sumber kebenaran untuk UI. Jaringan hanya menyegarkan isinya di belakang layar.'),
    card('menulis', 'Tulis ke Antrean', 'Setiap perubahan disimpan lokal dan masuk outbox. Worker mengirimnya saat jaringan kembali.', { bullets: ['Beri setiap operasi ID unik.', 'Server mengabaikan ID yang sudah diproses.', 'Retry jadi aman.'] }),
    card('optimistic', 'Tampilkan Dulu, Konfirmasi Belakangan', 'Pengguna melihat perubahannya seketika, dengan tanda kecil "belum tersinkron". Kalau server menolak, kembalikan dan jelaskan.'),
    card('konflik', 'Siapkan Aturan Konflik', 'Dua perangkat mengubah data yang sama saat offline. Last write wins, nomor versi, atau tanya pengguna: pilih sebelum terjadi.')
  ],

  'server-tidak-bisa-telepon-hp': [
    card('teori', 'Server-mu Tidak Bisa Menghubungi HP Langsung', 'HP pengguna berpindah jaringan dan bersembunyi di balik NAT operator. Lalu bagaimana notifikasi bisa sampai?'),
    card('perantara', 'Ada Perantara Resmi', 'Android memakai Firebase Cloud Messaging. iOS memakai Apple Push Notification service. Sistem menjaga satu koneksi untuk semua aplikasi.'),
    card('token', 'Semuanya Berawal dari Token', 'Aplikasi meminta token ke FCM atau APNs, lalu mengirimkannya ke backend-mu.', { bullets: ['Token mewakili satu instalasi aplikasi.', 'Token bisa berganti. Perbarui di server.'] }),
    card('mengirim', 'Backend Bicara ke Perantara', 'Server memanggil API FCM dengan token tujuan. Untuk iOS, FCM meneruskannya ke APNs.', { code: `{
  "message": {
    "token": "TOKEN",
    "notification": { "title": "Halo" }
  }
}` }),
    card('kenyataannya', 'Tidak Ada Jaminan Sampai', 'Izin ditolak, mode hemat daya, token basi, atau app di-force stop. Semuanya bisa membuat pesan tertunda atau hilang.'),
    card('praktiknya', 'Jadikan Pengingat, Bukan Data', 'Notifikasi memberi tahu bahwa ada yang baru. Saat aplikasi dibuka, ambil data sebenarnya dari server.')
  ],

  'kenapa-scroll-patah': [
    card('teori', 'Kenapa Scroll-mu Patah-Patah', 'Jank terjadi saat satu frame tidak selesai tepat waktu. Dan waktunya jauh lebih sedikit dari yang kamu kira.'),
    card('angkanya', '16,7 Milidetik', 'Di layar 60 Hz, itu jatah satu frame. Di 120 Hz, tinggal sekitar 8,3 ms.', { bullets: ['Build, layout, paint, raster.', 'Semuanya harus muat di jatah itu.'] }),
    card('pencurinya', 'Siapa yang Menghabiskan Waktu?', 'Hampir selalu kerja yang tidak seharusnya ada di thread UI.', { bullets: ['Parse JSON besar.', 'Decode gambar resolusi penuh untuk thumbnail.', 'Membangun ribuan item list sekaligus.'] }),
    card('perbaikan', 'Pindahkan Kerja Berat', 'Di Flutter, Isolate.run menjalankan fungsi di isolate lain.', { code: `final items = await Isolate.run(
  () => parseProducts(body),
);` }),
    card('ukur', 'Ukur di Profile Mode', 'Mode debug jauh lebih lambat dan menyesatkan. Pakai flutter run --profile dan DevTools, di HP kelas bawah.'),
    card('ingat', 'Jank Adalah Soal Anggaran', 'Yang penting bukan seberapa cepat kodemu rata-rata, tapi apakah setiap frame selesai tepat waktu.')
  ],

  'splash-screen-bukan-solusi': [
    card('teori', 'Splash Screen Bukan Solusi Cold Start', 'Logo animasi tidak mempercepat apa pun. Ia hanya memberi pengguna sesuatu untuk ditatap sambil menunggu.'),
    card('cold start', 'Apa Itu Cold Start?', 'Aplikasi dibuka saat prosesnya belum ada. Sistem harus membuat proses, memuat kode, dan menjalankan inisialisasimu dari nol.'),
    card('pelakunya', 'Pelaku yang Paling Sering', 'Biasanya bukan framework-mu, tapi kode startup-mu sendiri.', { bullets: ['SDK yang semuanya diinisialisasi di awal.', 'Membaca file atau database di main thread.', 'Menunggu API sebelum menampilkan layar.'] }),
    card('tunda', 'Tunda Sampai Dibutuhkan', 'Inisialisasi hanya yang dibutuhkan layar pertama. Sisanya dibuat saat pertama dipakai.', { code: `val analytics by lazy {
  Analytics.create()
}` }),
    card('ukur', 'Ukur Sebelum dan Sesudah', 'Android: adb shell am start -W. iOS: template App Launch di Instruments. Bandingkan selalu di build release.'),
    card('ukuran', 'Jangan Lupakan Ukuran', 'App Bundle, R8, dan aset yang dikompres membuat unduhan lebih kecil. Pengguna dengan kuota terbatas memperhatikannya.')
  ],

  'coroutines-enam-kartu': [
    card('tutorial', 'Kotlin Coroutines dalam 6 Kartu', 'Kode async yang dibaca dari atas ke bawah, tanpa callback bertingkat.'),
    card('1. suspend', 'Fungsi yang Bisa Dijeda', 'suspend menunggu tanpa memblokir thread.', { code: `suspend fun getUser(): User =
  withContext(Dispatchers.IO) {
    api.fetchUser()
  }` }),
    card('2. launch', 'Mulai dari Scope', 'Coroutine diluncurkan dari scope yang punya umur jelas.', { code: `viewModelScope.launch {
  val user = getUser()
  _ui.value = user
}` }),
    card('3. async', 'Paralel dengan async', 'Jalankan dua request sekaligus, lalu tunggu keduanya.', { code: `coroutineScope {
  val a = async { api.user() }
  val b = async { api.feed() }
  Home(a.await(), b.await())
}` }),
    card('4. dispatcher', 'Pilih Tempat Jalannya', 'Dispatcher menentukan thread yang dipakai.', { bullets: ['Main: memperbarui UI.', 'IO: jaringan dan disk.', 'Default: komputasi berat.'] }),
    card('5. struktur', 'Induk Menunggu Anaknya', 'Batalkan induk, semua anak berhenti. Anak gagal, induk ikut tahu. Tidak ada pekerjaan yang tertinggal tanpa pemilik.'),
    card('6. pembatalan', 'Pembatalan Itu Kooperatif', 'Coroutine berhenti di titik suspend. Loop panjang perlu ensureActive(), dan jangan menelan CancellationException.')
  ],

  'state-memiliki-binding-meminjam': [
    card('tutorial', '@State Memiliki, @Binding Meminjam', 'Dua property wrapper paling dasar di SwiftUI, dengan satu pertanyaan pemandu: siapa pemilik data ini?'),
    card('@State', 'View Ini Pemiliknya', 'SwiftUI menyimpan nilainya dan menggambar ulang saat nilainya berubah.', { code: `@State private var count = 0

Button("Tambah") { count += 1 }` }),
    card('tanda $', 'Dolar Berarti Akses Tulis', '$count adalah Binding: jalur baca-tulis ke data yang sama, bukan salinannya.'),
    card('@Binding', 'Child Meminjam Akses', 'Child bisa mengubah data, tapi parent tetap pemiliknya.', { code: `struct Row: View {
  @Binding var isOn: Bool
  var body: some View {
    Toggle("Aktif", isOn: $isOn)
  }
}` }),
    card('jebakan', 'Jangan Salin ke @State', '@State hanya membaca nilai awalnya sekali. Kalau parent mengirim nilai baru, child tidak ikut berubah. Pakai @Binding atau let.'),
    card('ringkasnya', 'Aturan Praktis', 'Tanyakan siapa pemiliknya sebelum menulis property wrapper.', { bullets: ['Milik view ini dan sederhana: @State.', 'Perlu mengubah data parent: @Binding.', 'Hanya menampilkan: let biasa.'] })
  ],

  'widget-bukan-yang-digambar': [
    card('teori', 'Widget Bukan yang Digambar di Layar', 'Di Flutter, widget dibuang dan dibuat ulang terus-menerus. Yang menggambar adalah pohon lain.'),
    card('widget', 'Widget: Deskripsi', 'Objek immutable dan ringan. Isinya hanya "seperti apa tampilannya". Membuatnya berulang kali bukan masalah.'),
    card('element', 'Element: Identitas', 'Element mewakili posisi widget di pohon. Ia menyimpan State dan bertahan antar rebuild. BuildContext sebenarnya adalah Element.'),
    card('renderobject', 'RenderObject: Pekerja', 'Mengurus ukuran, posisi, dan menggambar. Mahal dibuat, jadi Flutter berusaha memakainya ulang.'),
    card('aturannya', 'Kapan Dipakai Ulang?', 'Jika tipe widget dan key-nya sama, Element dipakai ulang. Kalau beda, dibuang dan dibuat baru.', { bullets: ['Itu sebabnya list dengan state butuh key.', 'Gunakan ID yang stabil, bukan index.'] }),
    card('akibatnya', 'setState Tidak Seseram Itu', 'Rebuild hanya membuat deskripsi baru. Yang mahal adalah rebuild yang terlalu luas dan Element yang terbuang sia-sia.')
  ],

  'checklist-rilis-mobile': [
    card('tutorial', 'Checklist Rilis: Versi, Rollout, Review', 'Aplikasi yang sudah terpasang tidak bisa ditarik kembali. Cek enam hal ini sebelum menekan publish.'),
    card('1. versi', 'Naikkan Build Number', 'Version name untuk manusia, build number untuk store.', { code: `# pubspec.yaml
version: 1.4.3+38` }),
    card('2. uji', 'Lewat Jalur Testing Dulu', 'Internal testing di Play Console, TestFlight di iOS. Biarkan tim menemukan crash sebelum pengguna.'),
    card('3. review', 'Siapkan untuk Reviewer', 'Penolakan sering berasal dari hal sepele.', { bullets: ['Akun demo untuk fitur di balik login.', 'Data privasi sesuai kenyataan.', 'Tidak ada placeholder atau link mati.'] }),
    card('4. rollout', 'Rilis Bertahap', 'Play: staged rollout per persentase. App Store: phased release selama 7 hari. Naikkan hanya kalau angka crash aman.'),
    card('5. rem', 'Siapkan Rem Darurat', 'Feature flag untuk mematikan fitur dari server, dan mekanisme force update untuk versi yang rusak parah.'),
    card('6. pantau', 'Pantau Hari-Hari Pertama', 'Crash rate, ANR, ulasan baru, dan error backend dari versi baru. Masalah paling banyak muncul di awal rollout.')
  ]
};

export const noteBodies: Record<string, Full> = {
  'process-death-tidak-muncul-di-emulator': {
    lead: 'Bug paling licin di mobile bukan crash, tapi data yang hilang diam-diam.',
    sections: [
      { id: 'skenario', title: 'Skenario yang terjadi setiap hari', body: p(
        'Misalnya, pengguna sedang mengisi form pendaftaran yang panjang. Di tengah jalan, ada pesan masuk. Ia membuka aplikasi chat, membalas, lalu membuka kamera untuk memotret dokumen. Beberapa menit kemudian ia kembali. Form-nya kosong, atau lebih buruk lagi, layar tampil setengah rusak karena data yang diharapkan sudah tidak ada.',
        'Laporan bug-nya biasanya berbunyi "kadang-kadang datanya hilang". Developer mencoba mengulang di HP-nya sendiri dan tidak pernah berhasil. Tiketnya ditutup dengan label "tidak bisa direproduksi".'
      ) },
      { id: 'kenapa-tidak-muncul', title: 'Kenapa tidak muncul di HP developer', body: p(
        'HP developer biasanya punya RAM besar dan jarang menjalankan banyak aplikasi berat sekaligus. Sistem jarang perlu membebaskan memori, jadi aplikasimu yang ada di background dibiarkan hidup.',
        'HP pengguna berbeda. RAM lebih kecil, aplikasi media sosial dan kamera berebut memori, dan sebagian produsen menambahkan manajemen baterai yang agresif. Di Android, proses di background bisa dimatikan; saat pengguna kembali, sistem membuat ulang Activity terakhir di proses yang baru. Di iOS, aplikasi yang disuspend bisa diterminasi tanpa callback apa pun.',
        `Yang bertahan hanyalah apa yang kamu simpan dengan sengaja: ${c('SavedStateHandle')} atau ${c('onSaveInstanceState')} untuk data kecil, dan disk untuk sisanya. ${b('ViewModel tidak termasuk.')} Ia selamat dari rotasi layar, tapi tidak dari process death.`
      ) },
      { id: 'cara-menguji', title: 'Cara memaksa bug ini muncul', body: p('Kabar baiknya, process death bisa dipicu dengan sengaja.') + ul(
        `Android: buka aplikasi, tekan home, lalu jalankan ${c('adb shell am kill com.contoh.app')}. Buka lagi dari recent apps.`,
        `Android: opsi ${c("Don't keep activities")} di Developer options menghancurkan Activity begitu ditinggalkan. Ini bukan process death penuh, tapi menangkap banyak bug serupa.`,
        'iOS: jalankan dari Xcode, kirim aplikasi ke background, lalu hentikan dari Xcode. Buka lagi dari home screen dan lihat apa yang tersisa.'
      ) + p('Jadikan langkah ini bagian dari checklist QA untuk setiap layar yang punya input pengguna.') },
      { id: 'desain-untuk-mati', title: 'Desain dari awal untuk mati', body: p('Cara berpikir yang paling membantu: anggap aplikasimu bisa mati kapan saja setelah tidak terlihat. Dengan asumsi itu, beberapa keputusan jadi jelas.') + ul(
        'Simpan draf saat layar berhenti terlihat, bukan saat dihancurkan.',
        'Simpan ID di saved state, lalu muat ulang datanya dari repository. Jangan simpan list besar.',
        'Setiap layar harus bisa dibangun hanya dari argumen navigasi dan saved state, tanpa mengandalkan variabel global yang diisi layar sebelumnya.'
      ) + p('Bug "kadang-kadang hilang" bukan nasib buruk. Itu lifecycle yang belum pernah diuji.') }
    ]
  },

  'masalah-state-bukan-library': {
    lead: 'Library state management hanya memindahkan data. Desain yang buruk tetap buruk di library mana pun.',
    sections: [
      { id: 'debat', title: 'Debat yang melompati pertanyaan', body: p(
        'Setiap beberapa bulan, komunitas Flutter kembali ke perdebatan yang sama: Provider, Riverpod, Bloc, GetX, atau yang lain. Hal serupa terjadi di React dengan Redux dan kawan-kawannya, juga di Android dengan berbagai pola arsitektur.',
        'Perdebatan itu jarang menyentuh pertanyaan yang lebih dasar. Data ini milik siapa? Siapa yang boleh mengubahnya? Apakah data ini memang perlu disimpan, atau bisa dihitung? Proyek yang tidak menjawab pertanyaan itu akan berantakan dengan library apa pun.'
      ) },
      { id: 'gejala', title: 'Gejala desain state yang bermasalah', body: ul(
        'Dua layar menampilkan jumlah item keranjang yang berbeda.',
        'Ada kode yang tugasnya hanya "menyamakan" dua variabel.',
        'Bug hilang setelah hot restart, lalu muncul lagi.',
        'Tidak ada yang bisa menjawab di mana sebuah nilai pertama kali diubah.'
      ) + p('Semua gejala ini punya akar yang sama: satu data punya lebih dari satu pemilik, atau tidak punya pemilik yang jelas sama sekali. Ganti library tidak menyelesaikannya, karena library baru akan dengan setia memindahkan dua salinan yang saling bertentangan.') },
      { id: 'tiga-pertanyaan', title: 'Tiga pertanyaan sebelum menulis kode', body: p(
        `${b('Siapa pemiliknya?')} Setiap data harus punya tepat satu pemilik. Yang lain membaca, atau mengirim permintaan perubahan.`,
        `${b('Seberapa jauh ia perlu dibagi?')} Kalau hanya satu widget yang peduli, simpan di widget itu. Dokumentasi Flutter menyebutnya ephemeral state, dan ${c('setState')} sudah cukup. Kalau beberapa layar butuh, angkat ke induk terdekat yang menaungi mereka.`,
        `${b('Apakah ini data turunan?')} Total harga, jumlah item yang dicentang, atau status "form valid" bisa dihitung dari data lain. Menyimpannya terpisah berarti membuka peluang keduanya tidak sinkron.`
      ) },
      { id: 'kapan-library', title: 'Lalu kapan library berguna?', body: p(
        'Library mulai membayar dirinya ketika rasa sakitnya nyata: state yang sama dioper melewati lima constructor, logic bisnis perlu dites tanpa widget, atau pola loading, data, dan error ditulis ulang di setiap layar. Di titik itu, Provider, Riverpod, atau Bloc memberi struktur yang seragam untuk seluruh tim.',
        'Tapi urutannya penting. Desain dulu siapa pemilik setiap data, baru pilih alat untuk mengalirkannya. Kalau desainnya sudah benar, berpindah dari satu library ke library lain biasanya jauh lebih ringan daripada yang ditakutkan.'
      ) }
    ]
  },

  'konflik-sinkronisasi-keputusan-produk': {
    lead: 'Library sinkronisasi bisa mendeteksi konflik. Memutuskan siapa yang menang tetap tugasmu.',
    sections: [
      { id: 'skenario', title: 'Dua perangkat, satu catatan', body: p(
        'Misalnya, sebuah aplikasi catatan mendukung mode offline. Seorang pengguna mengedit daftar belanja di HP saat berada di kereta bawah tanah. Pasangannya, yang memakai akun yang sama, mengedit daftar yang sama di tablet di rumah. Keduanya offline beberapa menit, lalu online hampir bersamaan.',
        'Server sekarang menerima dua versi dari satu catatan. Pertanyaannya sederhana, dan tidak ada jawaban teknis yang benar untuk semua kasus: versi mana yang disimpan?'
      ) },
      { id: 'last-write-wins', title: 'Last write wins dan masalahnya', body: p(
        'Strategi paling umum adalah last write wins: versi dengan waktu paling akhir yang menang. Mudah dibuat, dan untuk banyak data memang cukup. Pengaturan tema atau status "sudah dibaca" jarang membuat orang marah kalau tertimpa.',
        'Masalahnya ada dua. Pertama, waktu dari jam perangkat tidak bisa dipercaya penuh; jam HP bisa salah atau diubah pengguna. Kedua, dan lebih penting, satu perubahan dibuang tanpa jejak. Untuk daftar belanja, itu berarti satu orang kehilangan item yang ia tambahkan dan tidak pernah tahu kenapa.'
      ) },
      { id: 'pilihan-lain', title: 'Pilihan lain dan harganya', body: ul(
        `${b('Nomor versi.')} Setiap record punya versi. Server menolak update yang dibuat dari versi lama, dan klien harus mengambil data terbaru lalu mencoba lagi.`,
        `${b('Merge per field.')} Kalau A mengubah judul dan B mengubah isi, keduanya bisa disimpan. Konflik hanya terjadi bila field yang sama diubah.`,
        `${b('Operasi, bukan nilai.')} Simpan "tambah item susu" alih-alih "daftar sekarang berisi tiga item". Operasi seperti ini sering bisa digabung tanpa konflik.`,
        `${b('Tanya pengguna.')} Tampilkan kedua versi dan biarkan pengguna memilih. Paling aman, paling merepotkan.`
      ) + p('Untuk data kolaboratif yang kompleks, ada struktur data khusus seperti CRDT yang dirancang agar hasil penggabungan selalu konsisten. Harganya adalah kompleksitas tambahan yang jarang dibutuhkan aplikasi biasa.') },
      { id: 'keputusan-produk', title: 'Kenapa ini keputusan produk', body: p(
        'Pilihan strategi bergantung pada pertanyaan yang hanya bisa dijawab dengan memahami pengguna. Seberapa mahal kalau satu perubahan hilang? Seberapa sering dua orang mengubah data yang sama? Apakah pengguna paham kalau diminta memilih versi?',
        'Karena itu, diskusi konflik sebaiknya terjadi saat menyusun spesifikasi, bersama product owner, bukan saat developer menemukan bug di minggu rilis. Tulis aturannya per jenis data: profil memakai last write wins, catatan memakai merge per field, transaksi keuangan ditolak lalu diulang. Satu tabel kecil seperti itu mencegah banyak keputusan diam-diam di dalam kode.'
      ) }
    ]
  },

  'push-notification-bukan-janji': {
    lead: 'Kalau sebuah fitur rusak saat notifikasi tidak sampai, masalahnya ada di desain, bukan di FCM.',
    sections: [
      { id: 'asumsi', title: 'Asumsi yang berbahaya', body: p(
        'Misalnya, sebuah aplikasi chat mengirim isi pesan lewat push notification dan menyimpannya ke database lokal saat notifikasi diterima. Di pengujian semuanya lancar. Di production, sebagian pengguna melapor pesan "hilang" dan baru muncul setelah aplikasi dibuka ulang, atau tidak muncul sama sekali.',
        'Desain itu berdiri di atas asumsi bahwa setiap push pasti sampai, tepat waktu, dan aplikasi pasti dibangunkan untuk memprosesnya. Tidak satu pun dari ketiga hal itu dijanjikan oleh FCM maupun APNs.'
      ) },
      { id: 'jalur-panjang', title: 'Jalur yang panjang', body: p(
        'Server-mu tidak pernah bicara langsung dengan HP. Ia memanggil API FCM atau APNs dengan token perangkat. Untuk iOS, FCM meneruskan pesan ke APNs. Pesan lalu menunggu perangkat terhubung lewat koneksi milik sistem, dan sistem yang memutuskan apakah aplikasimu dibangunkan.',
        'Setiap titik di jalur itu bisa menunda atau menjatuhkan pesan:'
      ) + ul(
        'Token sudah basi karena aplikasi diinstal ulang atau data dipulihkan ke HP baru.',
        'Pengguna menolak izin notifikasi, yang sejak Android 13 juga diminta saat runtime.',
        'Doze dan pembatasan background menunda pesan berprioritas normal.',
        'Di iOS, silent push dibatasi sistem, dan aplikasi yang di-force quit tidak dibangunkan olehnya.',
        'Di Android, aplikasi yang di-force stop tidak menerima pesan sampai dibuka lagi.'
      ) },
      { id: 'desain-tahan', title: 'Desain yang tahan pesan hilang', body: p(`Prinsipnya: ${b('push adalah pengingat, bukan sumber data.')} Notifikasi memberi tahu bahwa ada sesuatu yang baru. Data sebenarnya diambil dari server saat aplikasi dibuka atau saat sinkronisasi berjalan.`) + ul(
        'Saat aplikasi masuk foreground, selalu tarik perubahan terbaru dari server.',
        'Buat payload kecil: ID dan jenis event saja. Batas ukurannya sekitar 4 KB.',
        'Simpan status "sudah dibaca" di server, bukan diturunkan dari notifikasi yang diterima.',
        'Untuk hal yang benar-benar kritis, sediakan jalur lain seperti email atau SMS.'
      ) },
      { id: 'rawat-token', title: 'Rawat token-mu', body: p(
        'Banyak notifikasi hilang karena kebersihan data yang buruk. Kirim ulang token ke server setiap kali SDK memberi tahu ada token baru, dan setiap kali pengguna login. Saat API FCM atau APNs menjawab bahwa sebuah token tidak lagi valid, hapus token itu dari database.',
        'Tanpa perawatan ini, daftar token menumpuk, dan sebagian pengiriman berakhir di instalasi yang sudah tidak ada. Angka "terkirim" di dashboard terlihat bagus, padahal pesannya tidak pernah dibaca siapa pun.'
      ) }
    ]
  },

  'jangan-ukur-performa-di-debug': {
    lead: 'Angka performa dari mode debug hampir selalu menyesatkan. Mulailah dari cara mengukur yang benar.',
    sections: [
      { id: 'debug-berbeda', title: 'Kenapa mode debug berbeda', body: p(
        'Mode debug di Flutter dirancang untuk kecepatan developer, bukan kecepatan aplikasi. Kode Dart dijalankan dengan JIT supaya hot reload bisa bekerja, dan ada banyak assertion serta pemeriksaan tambahan. Akibatnya, animasi yang tersendat di mode debug belum tentu tersendat di build release.',
        'Situasi sebaliknya lebih berbahaya. Developer mencoba di HP flagship, semuanya terasa mulus, lalu menyimpulkan tidak ada masalah performa. Padahal pengguna dengan HP kelas bawah melihat scroll yang patah-patah setiap hari.'
      ) },
      { id: 'profile-mode', title: 'Gunakan profile mode', body: p(
        `Flutter punya mode khusus untuk mengukur: ${c('flutter run --profile')}. Kodenya dikompilasi AOT seperti release, tapi masih menyediakan informasi untuk DevTools. Profile mode tidak tersedia di emulator maupun simulator, dan memang sebaiknya kamu mengukur di perangkat fisik.`,
        'Di DevTools, tampilan Performance menunjukkan waktu setiap frame, dipisah antara UI thread dan raster thread. Frame yang melewati anggaran ditandai, sehingga kamu bisa melihat langsung frame mana yang bermasalah dan apa yang terjadi di dalamnya.'
      ) },
      { id: 'baca-anggaran', title: 'Membaca anggaran frame', body: p(
        'Layar 60 Hz memberi sekitar 16,7 ms per frame, layar 120 Hz sekitar 8,3 ms. Anggaran itu berlaku untuk kedua thread. Kalau UI thread yang lambat, masalahnya biasanya di kode Dart: build yang terlalu luas, parsing di thread utama, atau list yang tidak lazy. Kalau raster thread yang lambat, curigai efek visual: blur, clip, opacity pada area besar, atau gambar yang terlalu besar.',
        `Membedakan keduanya menghemat banyak waktu. Mengoptimalkan method ${c('build')} tidak membantu kalau yang lambat adalah proses menggambar.`
      ) },
      { id: 'hp-uji', title: 'Pilih HP uji yang jujur', body: p(
        'Simpan satu HP Android kelas bawah di meja tim. Tidak perlu yang terbaru; yang penting mewakili sebagian besar penggunamu. Uji alur utama di sana sebelum setiap rilis: scroll daftar produk, buka detail, lalu kembali.',
        'Kebiasaan ini sederhana, tapi mengubah cara tim berbicara tentang performa. Pertanyaannya bergeser dari "di HP-ku lancar kok" menjadi "frame mana yang melewati 16 ms, dan kenapa".'
      ) }
    ]
  },

  'sdk-punya-tagihan-startup': {
    lead: 'Tidak ada SDK yang gratis. Sebagian tagihannya dibayar setiap kali pengguna membuka aplikasimu.',
    sections: [
      { id: 'satu-baris', title: 'Satu baris yang tidak pernah satu baris', body: p(
        'Hampir setiap SDK pihak ketiga datang dengan instruksi yang mirip: tambahkan dependency, lalu panggil satu baris inisialisasi di Application atau AppDelegate. Analytics, crash reporter, chat support, iklan, A/B testing, deep link. Masing-masing terlihat murah.',
        'Masalahnya, baris itu bisa membaca konfigurasi dari disk, membuat thread, menyiapkan database kecil, atau bahkan memulai request jaringan. Semuanya terjadi di jalur kritis cold start, sebelum layar pertama muncul. Sepuluh SDK yang masing-masing butuh sedikit waktu menjadi satu startup yang terasa berat.'
      ) },
      { id: 'ukuran', title: 'Tagihan kedua: ukuran', body: p(
        'SDK juga menambah ukuran aplikasi. Kode yang lebih banyak berarti unduhan lebih besar dan lebih banyak yang harus dimuat saat proses dibuat. Di iOS, setiap dynamic framework tambahan perlu dimuat dan ditautkan saat launch, sehingga jumlah framework ikut memengaruhi waktu startup.',
        'Bagi pengguna dengan kuota terbatas atau penyimpanan yang hampir penuh, ukuran aplikasi bisa menjadi alasan untuk tidak menginstal, atau alasan pertama untuk menghapus.'
      ) },
      { id: 'audit', title: 'Audit sebelum menambah', body: p('Sebelum menambah SDK, ajukan beberapa pertanyaan ini:') + ul(
        'Apakah fitur ini dibutuhkan di layar pertama? Kalau tidak, inisialisasinya bisa ditunda.',
        'Apakah SDK ini bisa diinisialisasi di background thread?',
        'Berapa ukuran yang ditambahkannya ke build release?',
        'Apakah ada SDK lain di aplikasimu yang sudah melakukan hal yang sama?'
      ) + p(`Di Android, ${c('by lazy')} dan library App Startup membantu mengatur urutan dan menunda inisialisasi. Di Flutter, hindari menunggu semua ${c('Future')} inisialisasi di ${c('main()')} sebelum ${c('runApp')} kalau layar pertama tidak membutuhkannya.`) },
      { id: 'ukur-dan-jaga', title: 'Ukur, lalu jaga', body: p(
        `Ambil angka dasar cold start dari build release di HP kelas bawah. Di Android, ${c('adb shell am start -W')} memberi waktu startup; di iOS, template App Launch di Instruments menunjukkan apa yang terjadi selama launch. Ulangi pengukuran setiap kali menambah SDK.`,
        'Lebih baik lagi, jadikan angka itu bagian dari review rilis. Startup jarang menjadi lambat dalam satu malam. Ia memburuk sedikit demi sedikit, satu "baris init" setiap kali.'
      ) }
    ]
  },

  'globalscope-jalan-pintas-bocor': {
    lead: 'Coroutine tanpa induk adalah pekerjaan yang tidak ditunggu siapa pun, dan tidak dihentikan siapa pun.',
    sections: [
      { id: 'godaan', title: 'Godaan GlobalScope', body: p(
        `Saat pertama belajar coroutine, ${c('GlobalScope.launch')} terasa seperti jawaban untuk segalanya. Tidak perlu memikirkan scope, cukup luncurkan dan selesai. Kotlin sendiri menandai GlobalScope dengan ${c('@DelicateCoroutinesApi')} sebagai peringatan bahwa API ini mudah disalahgunakan.`,
        'Masalahnya baru terlihat belakangan. Misalnya, sebuah layar meluncurkan pengunduhan data di GlobalScope. Pengguna menutup layar itu. Pengunduhan tetap berjalan, memakan kuota dan baterai, lalu mencoba memperbarui UI yang sudah tidak ada.'
      ) },
      { id: 'satu-kalimat', title: 'Structured concurrency dalam satu kalimat', body: p(
        'Setiap coroutine harus punya induk, dan induk tidak selesai sebelum semua anaknya selesai. Dari aturan itu lahir tiga jaminan: pembatalan induk menjalar ke semua anak, error di anak dilaporkan ke induk, dan tidak ada pekerjaan yang tertinggal tanpa pemilik.',
        'Idenya mirip blok kode biasa. Variabel lokal tidak hidup lebih lama dari fungsinya. Dengan structured concurrency, pekerjaan async juga tidak hidup lebih lama dari scope yang meluncurkannya.'
      ) },
      { id: 'contoh-android', title: 'Contohnya di Android', body: p(`Di ViewModel, gunakan ${c('viewModelScope')}. Scope ini dibatalkan otomatis saat ViewModel dibersihkan, sehingga request yang belum selesai ikut berhenti. Untuk menjalankan beberapa pekerjaan paralel di dalam fungsi suspend, gunakan ${c('coroutineScope')}:`) + pre(`suspend fun loadHome(): Home = coroutineScope {
  val user = async { api.user() }
  val feed = async { api.feed() }
  Home(user.await(), feed.await())
}`) + p(`Kalau ${c('api.feed()')} gagal, request user dibatalkan dan error dilempar ke pemanggil. Tidak ada request yatim yang tetap berjalan setelah fungsi selesai.`) },
      { id: 'umur-panjang', title: 'Kalau memang harus hidup lebih lama', body: p(
        'Ada pekerjaan yang memang harus melampaui umur layar, misalnya mengunggah foto yang sudah dipilih pengguna. Jawabannya bukan GlobalScope, tapi scope dengan pemilik yang jelas: scope di level aplikasi yang dibuat dengan sengaja, atau WorkManager untuk pekerjaan yang harus selesai meski aplikasi ditutup.',
        `Satu hal lagi: saat menangkap error di dalam coroutine, hati-hati dengan ${c('catch (e: Exception)')}. Pembatalan dikirim sebagai ${c('CancellationException')}, dan menelannya membuat coroutine terus berjalan padahal seharusnya berhenti. Tangkap tipe yang spesifik, atau lempar ulang CancellationException.`
      ) }
    ]
  },

  'jebakan-nilai-awal-state-swiftui': {
    lead: 'Child menerima nilai baru dari parent, tapi layarnya tidak berubah. Penyebabnya ada di cara @State menyimpan data.',
    sections: [
      { id: 'gejala', title: 'Gejalanya', body: p('Misalnya, sebuah layar daftar mengirim nama produk ke layar edit. Layar edit menyimpannya di @State supaya bisa diubah lewat TextField. Pertama kali dibuka, semuanya benar. Lalu daftar diperbarui dari server, parent mengirim nama yang baru, dan layar edit tetap menampilkan nama lama.') + pre(`struct EditName: View {
  @State private var name: String

  init(name: String) {
    _name = State(initialValue: name)
  }

  var body: some View {
    TextField("Nama", text: $name)
  }
}`) + p('Kode ini terkompilasi dan terlihat masuk akal. Itulah yang membuatnya licin.') },
      { id: 'penyebab', title: 'Penyebabnya: identitas, bukan nilai', body: p(
        'Struct view di SwiftUI dibuat ulang setiap kali parent dihitung ulang. Tapi penyimpanan @State tidak ikut dibuat ulang. SwiftUI mengikatnya ke identitas view di dalam hierarki. Selama view itu dianggap view yang sama, SwiftUI mempertahankan nilai yang sudah tersimpan dan mengabaikan nilai awal yang baru.',
        `Jadi ${c('State(initialValue:)')} benar-benar hanya nilai awal. Ia dipakai sekali saat view pertama kali muncul, lalu tidak dibaca lagi.`
      ) },
      { id: 'perbaikan', title: 'Tiga cara memperbaikinya', body: p('Jawabannya bergantung pada siapa yang seharusnya memiliki data.') + ul(
        `${b('Parent pemiliknya.')} Ganti @State di child dengan @Binding. Child mengedit data milik parent secara langsung, dan tidak ada salinan.`,
        `${b('Child hanya menampilkan.')} Pakai ${c('let')} biasa. Setiap kali parent mengirim nilai baru, view dibuat ulang dengan nilai itu.`,
        `${b('Child memang butuh draf sendiri.')} Misalnya form yang baru disimpan saat tombol ditekan. Simpan draf di @State, lalu reset dengan sengaja, misalnya dengan memberi view ${c('.id(product.id)')} supaya SwiftUI menganggapnya view baru saat produknya berganti.`
      ) },
      { id: 'prinsip', title: 'Prinsip di baliknya', body: p(
        'Semua varian bug ini berasal dari satu hal: data yang sama punya dua pemilik. Parent memiliki nama produk, child juga memilikinya di @State. Begitu keduanya berbeda, tidak ada aturan otomatis tentang siapa yang benar.',
        'SwiftUI mendorong satu sumber kebenaran untuk setiap data. @State untuk data yang benar-benar milik view itu, @Binding untuk meminjam, dan let untuk sekadar membaca. Kalau ragu, tanyakan: kalau nilai ini berubah, siapa yang seharusnya tahu lebih dulu? Itulah pemiliknya.'
      ) }
    ]
  },

  'rebuild-murah-key-mahal': {
    lead: 'Ketakutan pada setState sering salah sasaran. Bug yang lebih nyata bersembunyi di list tanpa key.',
    sections: [
      { id: 'salah-alamat', title: 'Ketakutan yang salah alamat', body: p(
        `Banyak developer Flutter memperlakukan ${c('setState')} seperti operasi mahal yang harus dihindari. Mereka memasang library tambahan atau menulis logika rumit supaya "tidak terjadi rebuild".`,
        'Padahal desain Flutter justru mengandalkan rebuild. Widget adalah objek immutable yang ringan, isinya hanya konfigurasi. Membuatnya ulang berkali-kali memang diharapkan. Yang mahal adalah layout dan menggambar, dan itu dikerjakan RenderObject yang dipakai ulang sebisa mungkin.'
      ) },
      { id: 'saat-rebuild', title: 'Apa yang terjadi saat rebuild', body: p(
        'Saat build menghasilkan widget baru, Element di posisi itu membandingkan widget lama dan baru. Jika tipe runtime dan key-nya sama, Element dipakai ulang: State-nya tetap, dan RenderObject cukup diperbarui propertinya. Jika berbeda, Element lama dibuang beserta State-nya, lalu dibuat yang baru.',
        'Jadi rebuild yang sering biasanya bukan masalah besar. Rebuild yang terlalu luas bisa jadi masalah, misalnya setState di root layar yang membangun ulang seluruh halaman setiap kali satu karakter diketik. Itu diperbaiki dengan memecah widget, bukan dengan menghindari setState.'
      ) },
      { id: 'state-tertukar', title: 'Bug yang sebenarnya: state yang tertukar', body: p(
        'Misalnya, sebuah daftar tugas di mana setiap item adalah StatefulWidget dengan status expand lokal. Pengguna membuka item kedua, lalu menghapus item pertama. Tiba-tiba yang terbuka adalah item yang salah.',
        'Tanpa key, Flutter mencocokkan Element berdasarkan urutan. Setelah item pertama dihapus, widget untuk item kedua kini berada di posisi pertama, dan dicocokkan dengan Element lama di posisi itu, lengkap dengan State-nya. Tipe sama, key sama-sama kosong, jadi Flutter menganggapnya widget yang sama.'
      ) + pre(`for (final t in todos)
  TodoTile(key: ValueKey(t.id), todo: t),`) + p('Dengan key yang berasal dari ID data, Element mengikuti datanya, bukan posisinya.') },
      { id: 'aturan-praktis', title: 'Aturan praktis', body: ul(
        'Jangan takut setState. Waspadai setState yang membangun ulang terlalu banyak.',
        'Pakai const constructor untuk widget yang tidak berubah.',
        'Beri key pada item list yang punya state, bisa dihapus, atau bisa berpindah urutan.',
        'Gunakan ID yang stabil dari data. Index tidak membantu, karena justru index yang berubah.'
      ) + p('Memahami tiga pohon mengubah pertanyaan dari "bagaimana mencegah rebuild" menjadi "apakah Flutter bisa mengenali widget ini sebagai yang sama". Pertanyaan kedua jauh lebih berguna.') }
    ]
  },

  'tidak-bisa-rollback-aplikasi-mobile': {
    lead: 'Strategi rilis backend tidak bisa disalin mentah-mentah ke mobile. Versi lama tetap hidup di HP pengguna.',
    sections: [
      { id: 'perbedaan', title: 'Perbedaan yang sering dilupakan', body: p(
        'Di backend, versi yang bermasalah bisa diganti dalam hitungan menit. Deploy ulang versi sebelumnya, dan semua pengguna langsung mendapat kode yang benar.',
        'Di mobile, tidak ada tombol seperti itu. Begitu sebuah versi terunduh, ia tinggal di HP pengguna sampai mereka memperbarui aplikasi. Sebagian pengguna mematikan update otomatis, sebagian lagi jarang terhubung ke Wi-Fi. Store juga mewajibkan build number yang terus naik, jadi "rollback" sebenarnya berarti merilis versi baru berisi kode lama, menunggu review, lalu menunggu pengguna update.'
      ) },
      { id: 'rollout-rem', title: 'Rollout bertahap sebagai rem', body: p(
        'Karena itu, rollout bertahap adalah alat utama. Di Google Play, staged rollout mengirim versi baru ke sebagian persentase pengguna, dan rollout bisa dihentikan kalau angka crash naik. Di App Store, phased release membagikan update otomatis secara bertahap selama tujuh hari dan bisa dijeda.',
        'Rem ini hanya berguna kalau ada yang mengawasi. Tentukan sebelum rilis angka apa yang dipantau, misalnya crash rate, ANR, dan error di backend dari versi baru, serta siapa yang berhak menghentikan rollout.'
      ) },
      { id: 'jaring-pengaman', title: 'Jaring pengaman di dalam aplikasi', body: p('Rem terbaik dipasang sebelum dibutuhkan, di dalam aplikasi itu sendiri.') + ul(
        `${b('Feature flag.')} Fitur baru bisa dimatikan dari server tanpa rilis baru.`,
        `${b('Force update.')} Aplikasi memeriksa versi minimum ke server dan meminta pengguna memperbarui jika versinya rusak parah.`,
        `${b('Backend yang kompatibel ke belakang.')} API harus tetap melayani versi aplikasi lama, karena versi itu dipakai jauh lebih lama dari yang kamu kira.`
      ) + p('Tanpa ketiganya, satu bug kritis berarti berhari-hari menunggu review dan update, sementara pengguna terus menemui masalah yang sama.') },
      { id: 'kebiasaan-tim', title: 'Kebiasaan tim yang membosankan', body: p(
        'Strategi rilis mobile yang sehat terlihat membosankan: build number naik setiap unggah, setiap versi melewati internal testing atau TestFlight, rollout dimulai dari persentase kecil, dan ada satu orang yang memantau dashboard di hari-hari pertama.',
        'Membosankan memang tujuannya. Rilis yang menegangkan biasanya tanda bahwa tim masih memperlakukan aplikasi mobile seperti website, dengan anggapan bahwa kesalahan bisa ditarik kembali kapan saja.'
      ) }
    ]
  }
};
