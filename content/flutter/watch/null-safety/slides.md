---
# Slide deck generated from meta.yaml
# Generate full Slidev slides from this topic
# Run: slidev build content/flutter/watch/null-safety/slides.md
theme: default
title: Flutter Null Safety
---

# Flutter Null Safety

Hindari NullPointerException 🚫

---

## Masalah: Null Pointer

```dart
String name = getName();
print(name.length); // CRASH kalau null!
```

❌ Aplikasi tiba-tiba tutup  
❌ User frustasi  
❌ Developer bingung  

---

## Solusi: Null Safety

Dart **memaksa** kamu mendeklarasikan nullability:

```dart
String name       = "CodingSkuy"; // WAJIB ada nilai
String? maybeNull = null;          // BOLEH null
```

✅ Kode lebih aman  
✅ Error ketahuan dari awal  
✅ Performa tetap sama  

---

## Cara Pakai

```dart
// Akses aman
String? name = getName();
print(name?.length); // null → gak crash

// Default value
print(name ?? "Teman CodingSkuy"); // "Teman CodingSkuy"

// Paksa (hati-hati!)
print(name!.length); // CRASH kalau null!
```

---

## Praktek Langsung 🎯

Buka [DartPad](https://dartpad.dev) dan coba:

```dart
void main() {
  String? name;
  String display = name ?? "Teman";
  print(display); // "Teman"
}
```

Slide selengkapnya: [Praktek Null Safety →](/articles/content/flutter-null-safety/practice/)
