# Portofolio Ikhwan Ramadhan

Portfolio personal untuk memperkenalkan Ikhwan Ramadhan sebagai Full-Stack Developer melalui project, pengalaman, technology stack, pendidikan, sertifikasi, dan kanal komunikasi profesional.

Aplikasi ini dibangun sebagai React single-page application yang responsif, ringan, dan berorientasi pada presentasi project. Pengunjung dapat menjelajahi portfolio tanpa reload halaman, membaca case study berbasis Markdown, memfilter project berdasarkan beberapa teknologi, serta menghubungi pemilik portfolio secara langsung.

## Overview

- **Beranda**: profil singkat, project unggulan, dan akses cepat ke CV atau kontak.
- **Portofolio**: katalog project dengan pencarian, filter multi-pilih, pengurutan, detail, dan case study Markdown.
- **Tentang**: pengalaman kerja, technology overview berbasis `Core Stack` dan `Also Used`, pendidikan, serta sertifikasi.
- **Kontak**: WhatsApp, email, tautan profesional, form pesan, dan FAQ.
- **Content persistence**: project tambahan dan pesan form disimpan pada `localStorage` browser.
- **Responsive UI**: layout desktop, tablet, dan mobile dengan tema terang sebagai default serta dukungan tema gelap.

## Technology Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- Motion
- Lucide React
- React Markdown dan Remark GFM
- Canvas Confetti

## Architecture

```text
.
├── public/
│   ├── certificates/       # Aset gambar sertifikasi
│   ├── projects/           # Screenshot project
│   ├── cv.pdf              # Dokumen CV
│   ├── logo.ico            # Favicon
│   ├── logo.jpg            # Logo header dan About
│   └── profile.jpg         # Foto profil Beranda
├── src/
│   ├── components/         # UI halaman, kartu, modal, dan navigasi
│   ├── data/               # Data portfolio dan konten case study
│   ├── App.tsx             # Root layout dan state aplikasi
│   ├── index.css           # Style global dan Tailwind
│   ├── main.tsx            # React entry point
│   └── types.ts            # Type definitions
├── index.html              # HTML entry point dan metadata SEO
├── package.json
└── vite.config.ts
```

## Requirements

- Node.js 18 atau versi lebih baru
- npm

## Local Development

```bash
npm install
npm run dev
```

Development server berjalan pada `http://localhost:3000`.

## Available Scripts

```bash
npm run dev       # Menjalankan development server
npm run lint      # Memeriksa tipe TypeScript
npm run build     # Membuat production build
npm run preview   # Menjalankan preview production build
npm run clean     # Membersihkan output build tertentu
```

## Production Deployment

Project ini menggunakan Vite React SPA dan dapat dideploy langsung ke Vercel dengan konfigurasi berikut:

```text
Framework Preset: Vite
Install Command: npm install
Build Command: npm run build
Output Directory: dist
```

Saat repository di-import, Vercel umumnya mendeteksi konfigurasi Vite secara otomatis. Hasil build berupa aset statis yang dapat disajikan melalui CDN Vercel. Aset pada folder `public/` tersedia dari root URL, misalnya `/logo.jpg` atau `/projects/smpn24.png`.

## Portfolio Content

Data portfolio dikelola secara terpusat pada `src/data/portfolioData.ts`. Project baru harus memiliki:

- `id` dan `slug` yang unik;
- judul, deskripsi singkat, dan kategori;
- `tags` untuk pencarian dan filter;
- file `image` pada `public/projects/`;
- `markdownContent` untuk case study.

Asset personal dapat diperbarui melalui file berikut:

- `public/profile.jpg`: foto wajah pada Beranda;
- `public/logo.jpg`: logo pada header dan halaman About;
- `public/logo.ico`: favicon;
- `public/cv.pdf`: dokumen CV.

## Rendering Model

Aplikasi menggunakan client-side rendering melalui Vite React. `vite build` menghasilkan bundle statis yang sesuai untuk hosting CDN. SSR dan ISR Next.js tidak digunakan pada repository ini karena keduanya memerlukan runtime Next.js App Router.

## License

Konten portfolio, data pribadi, gambar project, sertifikat, logo, dan CV merupakan aset pemilik portfolio. Penggunaan atau redistribusi aset memerlukan izin pemilik.
