# Portofolio Ikhwan Ramadhan

Website portfolio personal untuk menampilkan pengalaman, project, technology stack, pendidikan, sertifikasi, dan kanal kontak Ikhwan Ramadhan sebagai Full-Stack Developer.

Project ini dibuat sebagai aplikasi React yang ringan dan responsif. Navigasi halaman berlangsung tanpa reload, sedangkan detail project dapat dibaca melalui markdown viewer. Tersedia juga editor sederhana untuk menambahkan project baru secara lokal melalui browser.

## Fitur Utama

- Halaman Beranda dengan profil, project unggulan, dan call-to-action.
- Halaman Portofolio dengan pencarian, filter kategori dan keyword multi-pilih, pengurutan, detail project, serta case study Markdown.
- Halaman Tentang dengan pengalaman, technology overview berbasis `Core Stack` dan `Also Used`, pendidikan, serta sertifikasi.
- Halaman Kontak dengan form pesan, WhatsApp, email, FAQ, dan tautan profesional berikon.
- Modal CV yang menggunakan file `public/cv.pdf`.
- Tema terang sebagai default dan tema gelap dengan preferensi yang disimpan di browser.
- Penyimpanan project tambahan dan pesan kontak menggunakan `localStorage`.
- Layout responsive untuk desktop, tablet, dan mobile.

## Teknologi

- React 19 dan TypeScript
- Vite
- Tailwind CSS 4
- Motion untuk transisi halaman dan interaksi
- Lucide React untuk ikon
- React Markdown dan Remark GFM untuk case study
- Canvas Confetti untuk feedback pengiriman form

## Struktur Project

```text
.
├── public/
│   ├── certificates/       # Gambar sertifikasi
│   ├── projects/           # Screenshot project
│   ├── cv.pdf              # CV dalam modal
│   ├── logo.ico            # Favicon
│   └── logo.jpg            # Logo header dan About
├── src/
│   ├── components/         # Halaman, kartu, modal, dan navigasi
│   ├── data/               # Data portfolio dan konten project
│   ├── App.tsx             # Root layout dan navigasi halaman
│   ├── index.css           # Tailwind dan style global
│   ├── main.tsx            # Entry point React
│   └── types.ts            # Kontrak data TypeScript
├── index.html
├── package.json
└── vite.config.ts
```

## Persyaratan

- Node.js 18 atau lebih baru
- npm

## Menjalankan Secara Lokal

```bash
npm install
npm run dev
```

Buka URL yang ditampilkan Vite, biasanya `http://localhost:3000`.

## Script yang Tersedia

```bash
npm run dev       # Development server
npm run lint      # Pemeriksaan tipe TypeScript
npm run build     # Production build
npm run preview   # Preview production build
npm run clean     # Membersihkan output build tertentu
```

## Deploy ke Vercel

Project ini adalah Vite React SPA. Gunakan pengaturan berikut di Vercel:

```text
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

Vercel juga dapat mendeteksi konfigurasi Vite secara otomatis saat repository di-import. Semua aset di `public/` tersedia dari root URL, contohnya `/logo.jpg` dan `/projects/smpn24.png`.

## Catatan Rendering

Karena menggunakan Vite React SPA, halaman dirender di browser setelah JavaScript dimuat. `vite build` menghasilkan aset statis yang cocok untuk CDN Vercel, tetapi project ini belum menggunakan SSR atau ISR Next.js.

Jika membutuhkan SSR, SSG, atau ISR secara runtime, project harus dimigrasikan ke Next.js App Router. Pada project Next.js, gunakan SSG untuk konten stabil, ISR untuk konten yang diperbarui berkala, dan SSR untuk halaman dinamis yang memerlukan data terbaru serta metadata SEO per request.

## Mengubah Data Portfolio

Data utama berada di `src/data/portfolioData.ts`. Saat menambah project, lengkapi minimal `id` dan `slug` unik, informasi judul dan deskripsi, `category`, `tags`, gambar di `public/projects/`, serta `markdownContent` untuk case study.

Untuk mengganti foto wajah pada Beranda, gunakan `public/profile.jpg`. Logo header menggunakan `public/logo.jpg`, sedangkan favicon menggunakan `public/logo.ico`.

## Lisensi

Konten portfolio, data pribadi, gambar project, sertifikat, dan CV adalah milik pemilik portfolio. Jangan menggunakan atau mendistribusikan ulang aset tersebut tanpa izin.
