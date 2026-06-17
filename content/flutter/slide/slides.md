---
# Slide deck: Flutter Null Safety
# Generate with: slidev build content/flutter/slide/slides.md
theme: default
title: Flutter Null Safety
author: CodingSkuy
---

# Flutter Null Safety 🛡️

Hindari NullPointerException mulai sekarang

CodingSkuy

---

## Kenapa Ini Penting? 🤔

Pernah ngalamin ini?

1. Aplikasi tiba-tiba crash
2. User liat layar putih
3. Error: `NullPointerException`

❌ **Gak enak banget, kan?**

Null Safety hadir buat **mencegah** ini semua SEBELUM aplikasi jalan.

---

## Masalah: NullPointerException 💥

```dart
// Dart sebelum Null Safety
String nama;
print(nama.length); // Crash!
```

**Masalahnya:**
- Variable bisa `null` tanpa ada peringatan
- Error baru ketahuan pas **runtime**
- Developer dan user sama-sama kena dampak

---

## Solusi: Type Safety 🔒

Dart sekarang bedain tipe yang bisa null dan yang **gak bisa**:

```dart
// ❌ Tidak nullable — AMAN
String nama = 'Budi';

// ✅ Nullable — DIBOLEHIN null
String? nama = null;
```

| Tipe | Bisa null? |
|---|---|
| `String` | ❌ |
| `String?` | ✅ |
| `int` | ❌ |
| `int?` | ✅ |

---

## 3 Operator Ajaib ✨

### 1. Null-aware `?.`

```dart
nama?.length // null kalau nama null — gak crash!
```

### 2. Null-coalescing `??`

```dart
nama ?? 'default' // pakai 'default' kalau nama null
```

### 3. Assertion `!` ⚠️

```dart
nama!.length // YAKININ nama gak null — HATI-HATI!
```

---

## Contoh Praktis 🧑‍💻

```dart
class User {
  final String nama;
  final String? email;

  User({required this.nama, this.email});

  String get displayInfo {
    final emailDisplay = email ?? '(tidak ada)';
    return '$nama — $emailDisplay';
  }
}

void main() {
  final user = User(nama: 'Budi');
  print(user.displayInfo); // Budi — (tidak ada)
}
```

---

## Late Initialization ⏰

Buat variable yang **pasti** diisi, tapi belum bisa pas deklarasi:

```dart
late String nama;

void main() {
  nama = 'Budi'; // diisi dulu
  print(nama.length); // ✅ aman
}
```

⚠️ **Peringatan:** `late` tapi dipake sebelum diisi → **tetap crash!**

---

## Common Mistakes ❌

| Salah | Bener |
|---|---|
| `nama!.length` (belum dicek) | `nama?.length ?? 0` |
| `String nama = null` | `String? nama = null` |
| `late String nama; print(nama)` | pastikan diisi dulu |
| `String? nama; String x = nama` | `String x = nama ?? 'fallback'` |

---

## Ringkasan 📝

- ✅ **Null Safety** mencegah crash dari null
- ✅ `String?` = boleh null, `String` = wajib ada
- ✅ `?.` dan `??` buat akses aman
- ✅ `late` buat inisialisasi nanti
- ✅ Error ketahuan pas **compile** — bukan runtime

---

## Next Steps 🚀

Yang bisa kamu lakuin sekarang:

| Aktivitas | Link |
|---|---|
| 📖 Baca artikel lengkap | [Artikel Null Safety →](/articles/flutter/null-safety/) |
| 🎓 Ikuti tutorial | [Tutorial Null Safety →](/articles/flutter/null-safety/tutorial) |
| 🧪 Main di playground | [Playground →](/articles/flutter/null-safety/playground) |
| ❓ Kerjain quiz | [Quiz →](/articles/flutter/null-safety/quiz) |
