<div align="center">

<img src="./public/assets/banner.svg" alt="Ikhwan Ramadhan - Modern Developer Portfolio & Showcase Banner" width="100%" />

<br/>
<br/>

# ✨ Modern Developer Portfolio & Showcase

**Aplikasi web portofolio developer yang super cepat, estetik, dan production-ready.**  
Dibangun menggunakan **Astro 7**, **React 19**, **TypeScript**, dan **Tailwind CSS v4**.

<br/>

[![Live Production](https://img.shields.io/badge/Live_Site-ikhwann.my.id-0284c7?style=for-the-badge&logo=google-chrome&logoColor=white)](https://ikhwann.my.id)
[![Astro Version](https://img.shields.io/badge/Astro-v7.2-bc52ee?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build)
[![React 19](https://img.shields.io/badge/React-v19.0-20232a?style=for-the-badge&logo=react&logoColor=61dafb)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.1-38b2ac?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Vercel Edge](https://img.shields.io/badge/Deployed_on-Vercel_Edge-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg?style=for-the-badge)](LICENSE)

<br/>

**[ 🇺🇸 English ](README.md)** • **[ 🇮🇩 Bahasa Indonesia ](README.id.md)**

<br/>

[🚀 Live Demo](https://ikhwann.my.id) • [✨ Fitur Utama](#-fitur-utama) • [🏗️ Arsitektur Sistem](#️-arsitektur-sistem) • [🛠️ Tech Stack](#️-tech-stack) • [⚡ Cara Menjalankan](#-cara-menjalankan-quick-start) • [🎨 Panduan Kustomisasi](#-panduan-kustomisasi)

</div>

---

## 🌟 Sekilas Proyek

Selamat datang di repositori resmi **Website Portofolio Ikhwan Ramadhan** ([ikhwann.my.id](https://ikhwann.my.id)).

Berbeda dari portofolio statis biasa atau Single Page Application (SPA) yang berat, proyek ini dirancang menggunakan **Astro Island Architecture** yang dipadukan dengan **React 19**. Pendekatan ini menyajikan kecepatan halaman HTML statis tanpa JavaScript berlebih, namun tetap menghadirkan interaktivitas modern seperti **generator resume ATS langsung di browser (PDF & DOCX)**, **modal studi kasus interaktif**, **dukungan multibahasa (i18n)**, dan **smooth scrolling berbasis fisika**.

### ⚡ Sorotan Utama
- 🚀 **First Contentful Paint (FCP) < 300ms** berkat core HTML statis zero-JS.
- ⚛️ **Partial Hydration**: JavaScript React 19 hanya dimuat pada komponen interaktif yang membutuhkan.
- 📄 **In-Browser ATS Document Engine**: Ekspor CV ke format **PDF** dan **DOCX** langsung dari browser tanpa backend.
- 🎨 **Sistem Desain Modern**: Tailwind CSS v4 dengan dark mode dan micro-animasi yang halus.
- 🌐 **Native i18n**: Routing multibahasa bawaan untuk Bahasa Indonesia (`/`) dan Bahasa Inggris (`/en/`).
- 🎛️ **100% Data-Driven**: Sangat mudah dikustomisasi melalui file JSON (`portfolio.json` & `cv.json`).

---

## ✨ Fitur Utama

### ⚡ Zero-JS Core & Astro Island Architecture
Halaman di-render secara statis saat build time. Teks konten, tata letak, dan tag SEO disajikan dalam format HTML murni. JavaScript hanya diunduh saat pengunjung berinteraksi dengan komponen island.

### 📄 Dual-Engine In-Browser ATS CV Generator
Pengunjung dan recruiter dapat melihat preview serta mengunduh resume profesional langsung di browser:
- **Ekspor PDF**: Hasil cetak dokumen berpresisi tinggi menggunakan kombinasi `jspdf` dan `html2canvas`.
- **Ekspor DOCX Asli**: Berkas Microsoft Word biner yang terstruktur secara semantik menggunakan pustaka `docx` agar ramah parser ATS.

<div align="center">
  <img src="./public/assets/ats-engine-architecture.svg" alt="Diagram Arsitektur In-Browser ATS Document Generation" width="100%" />
</div>

### 💼 Showcase Proyek Interaktif & Modal Detail
- Pencarian kata kunci real-time dan filter kategori berbasis tag.
- Modal studi kasus lengkap dengan ringkasan solusi teknis, badge teknologi, demo live, dan tautan GitHub.
- Ditenagai oleh **Zustand store** yang ringan untuk transisi state yang instan.

### 📝 Markdown Case-Study Viewer
Viewer Markdown terintegrasi dengan dukungan **GitHub Flavored Markdown (GFM)** (`react-markdown` + `remark-gfm`), syntax code highlighting, dan styling tabel yang rapi.

### 🎨 Tailwind CSS v4 & Micro-Interactions
- Menggunakan engine terbaru **Tailwind CSS v4** dengan konfigurasi berbasis CSS.
- Animasi interaktif yang halus ditenagai oleh **Motion (Framer Motion v12)**.
- Pengalaman scrolling mulus dengan **Lenis**.
- Efek perayaan interaktif dengan **Canvas Confetti**.

### 🌓 Dark / Light Mode Bebas Kedip
Pilihan tema tersinkronisasi otomatis dengan preferensi sistem operasi (`prefers-color-scheme`) dan tersimpan di `localStorage` tanpa efek kedip (FOUC).

### 🌐 Dukungan Multibahasa (i18n) Bawaan
- Struktur routing dua bahasa yang ramah SEO:
  - Bahasa Indonesia: `/`, `/portfolio`, `/about`, `/contact`
  - Bahasa Inggris: `/en/`, `/en/portfolio`, `/en/about`, `/en/contact`
- Kamus translasi berbasis TypeScript dengan fallback otomatis jika terjemahan belum lengkap.

### 🔍 Otomasi SEO & Open Graph
- Data Terstruktur **JSON-LD** lengkap (`Person`, `WebSite`, `WebPage`, `BreadcrumbList`).
- Generator banner Open Graph otomatis (`scripts/generate-og.mjs`).
- Peta situs `sitemap-index.xml` ter-generate otomatis via `@astrojs/sitemap`.

---

## 🏗️ Arsitektur Sistem

Proyek ini menerapkan arsitektur frontend 3 lapis untuk performa dan skalabilitas maksimal:

<div align="center">
  <img src="./public/assets/system-architecture.svg" alt="Diagram Arsitektur Astro Islands" width="100%" />
</div>

### 1. Edge & Routing Tier (Vercel Edge Network)
- File statis didistribusikan secara global via Edge CDN Vercel untuk latensi ultra rendah.
- Routing bahasa tingkat URL (`/` vs `/en/`) dengan tag canonical dan hreflang otomatis.

### 2. Static Shell Tier (Astro SSG Engine)
- Menghasilkan markup HTML statis, navigasi, artikel, dan metadata SEO.
- Memberikan performa instan tanpa overhead runtime JavaScript di halaman utama.

### 3. Interactive Island Tier (React 19)
- Komponen island dihidrasi secara independen (`client:load` atau `client:visible`):
  - `ProjectShowcase`: Katalog proyek dengan filter dan pencarian reaktif.
  - `CvModal`: Generator dokumen CV ke PDF & DOCX di browser.
  - `MarkdownModal`: Viewer dokumentasi teknis markdown.
  - `Navbar & ThemeToggle`: Pengatur tema dan drawer navigasi mobile.

---

## 🛠️ Tech Stack

<table>
  <thead>
    <tr>
      <th width="24%">Kategori</th>
      <th>Teknologi &amp; Pustaka</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Core Framework</strong></td>
      <td>
        <a href="https://astro.build"><img src="https://img.shields.io/badge/Astro_v7.2-bc52ee?style=flat-square&logo=astro&logoColor=white" alt="Astro" /></a>
        <a href="https://react.dev"><img src="https://img.shields.io/badge/React_v19-20232a?style=flat-square&logo=react&logoColor=61dafb" alt="React" /></a>
        <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript_5.8-3178c6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" /></a>
      </td>
    </tr>
    <tr>
      <td><strong>Styling &amp; UI</strong></td>
      <td>
        <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind_CSS_v4.1-38b2ac?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" /></a>
        <a href="https://lucide.dev"><img src="https://img.shields.io/badge/Lucide_Icons-f97316?style=flat-square" alt="Lucide Icons" /></a>
      </td>
    </tr>
    <tr>
      <td><strong>Animasi &amp; Scroll</strong></td>
      <td>
        <img src="https://img.shields.io/badge/Motion_(Framer)-black?style=flat-square&logo=framer&logoColor=white" alt="Motion" />
        <img src="https://img.shields.io/badge/Lenis_Scroll-gray?style=flat-square" alt="Lenis" />
        <img src="https://img.shields.io/badge/Canvas_Confetti-ff69b4?style=flat-square" alt="Confetti" />
      </td>
    </tr>
    <tr>
      <td><strong>Document Engines</strong></td>
      <td>
        <img src="https://img.shields.io/badge/jsPDF-e11d48?style=flat-square" alt="jsPDF" />
        <img src="https://img.shields.io/badge/html2canvas-4f46e5?style=flat-square" alt="html2canvas" />
        <img src="https://img.shields.io/badge/docx_(Word_Binary)-2563eb?style=flat-square" alt="docx" />
      </td>
    </tr>
    <tr>
      <td><strong>State &amp; Content</strong></td>
      <td>
        <img src="https://img.shields.io/badge/Zustand_v5-443e38?style=flat-square" alt="Zustand" />
        <img src="https://img.shields.io/badge/React_Markdown_v10-0284c7?style=flat-square&logo=markdown&logoColor=white" alt="Markdown" />
        <img src="https://img.shields.io/badge/Remark_GFM-10b981?style=flat-square" alt="Remark" />
      </td>
    </tr>
    <tr>
      <td><strong>Build &amp; Bundling</strong></td>
      <td>
        <a href="https://vitejs.dev"><img src="https://img.shields.io/badge/Vite_6-646cff?style=flat-square&logo=vite&logoColor=white" alt="Vite" /></a>
        <img src="https://img.shields.io/badge/@astrojs/sitemap-bc52ee?style=flat-square" alt="Astro Sitemap" />
        <img src="https://img.shields.io/badge/Prettier-f8b500?style=flat-square&logo=prettier&logoColor=white" alt="Prettier" />
      </td>
    </tr>
    <tr>
      <td><strong>Deployment &amp; Edge</strong></td>
      <td>
        <a href="https://vercel.com"><img src="https://img.shields.io/badge/Vercel_Edge_Network-000000?style=flat-square&logo=vercel&logoColor=white" alt="Vercel" /></a>
        <img src="https://img.shields.io/badge/Vercel_Analytics-000000?style=flat-square" alt="Analytics" />
      </td>
    </tr>
  </tbody>
</table>

---

## 📂 Struktur Folder Repositori

Proyek ini menggunakan struktur direktori berbasis domain (*feature-first*) yang terorganisir rapi dan konsisten dengan konvensi `kebab-case`:

```text
.
├── public/
│   ├── assets/                # Banner SVG & diagram arsitektur sistem
│   ├── certificates/          # Salinan berkas kredensial sertifikasi
│   ├── CV/                    # Dokumen CV statis
│   ├── projects/              # Thumbnail proyek dalam format WebP teroptimasi
│   └── og.png                 # Gambar default Open Graph social share
├── scripts/
│   └── generate-og.mjs        # Skrip otomasi pembuatan banner Open Graph
├── src/
│   ├── components/            # Komponen UI pendukung & modal islands
│   │   ├── layout/            # Navbar, Footer, dan Canvas background
│   │   └── modal/             # CV Modal, Markdown Editor, dan Card Detail
│   ├── data/
│   │   ├── locales/           # Kamus translasi i18n (id/ dan en/)
│   │   ├── cv.json            # Basis data terpusat pengalaman kerja, pendidikan, & skill
│   │   └── portfolio.json     # Basis data proyek studi kasus portofolio
│   ├── design/                # Desain token dan konstanta styling
│   ├── features/              # Modul fungsional per domain
│   │   ├── hero/              # Hero banner, status availability, dan tombol CTA
│   │   ├── portfolio/         # Grid katalog proyek, filter kategori, kartu detail
│   │   ├── about/             # Biografi, riwayat perjalanan karir, dan keahlian
│   │   └── contact/           # Formulir kontak dan kanal media sosial
│   ├── hooks/                 # Custom React hooks (useProjects, useModal, useTheme)
│   ├── layouts/
│   │   └── site.astro         # Shell HTML utama, SEO meta, dan skema JSON-LD
│   ├── pages/
│   │   ├── index.astro        # Beranda utama (Bahasa Indonesia, SSG)
│   │   ├── about.astro        # Halaman Tentang Saya
│   │   ├── portfolio.astro    # Halaman Katalog Portofolio
│   │   ├── contact.astro      # Halaman Kontak
│   │   ├── project/[slug].astro      # Halaman dinamis SSG studi kasus proyek
│   │   ├── certificate/[id].astro    # Halaman detail sertifikat
│   │   └── en/                # Rute multibahasa Inggris (/en/...)
│   ├── store/                 # Global state management dengan Zustand
│   ├── styles/
│   │   └── global.css         # Direktif Tailwind CSS v4 & custom keyframes
│   ├── utils/                 # Helper fungsi pemformatan teks, tanggal, & i18n
│   ├── app.tsx                # Client application root & island orchestrator
│   └── types.ts               # Definisi antarmuka TypeScript terpusat
├── astro.config.mjs           # Konfigurasi Astro & integrasi React
├── package.json               # Daftar dependensi & script NPM
├── tsconfig.json              # Konfigurasi kompilasi TypeScript
└── README.md                  # Dokumentasi proyek
```

---

## ⚡ Cara Menjalankan (Quick Start)

### Prasyarat Sistem
- **Node.js**: Versi `v20.0.0` atau lebih baru
- **Package Manager**: `npm`, `pnpm`, atau `bun`

### Langkah Instalasi

1. **Clone Repositori**:
   ```bash
   git clone https://github.com/IngsR/Portofolio.git
   cd Portofolio
   ```

2. **Pasang Dependensi**:
   ```bash
   npm install
   ```

3. **Salin Environment Variables (Opsional)**:
   ```bash
   cp .env.example .env
   ```

4. **Jalankan Development Server**:
   ```bash
   npm run dev
   ```
   Buka peramban pada alamat [http://localhost:3000](http://localhost:3000).

5. **Build untuk Produksi**:
   ```bash
   npm run build
   ```
   Bundel produksi siap deploy akan disimpan di direktori `dist/`.

---

## 🎨 Panduan Kustomisasi

Anda dapat menggunakan repositori ini sebagai basis (*template*) untuk portofolio pribadi Anda:

### 1. Ubah Data Profil & CV (`src/data/cv.json`)
Sesuaikan nama, biografi, pengalaman kerja, riwayat pendidikan, skill, dan kontak dengan data Anda sendiri. Generator CV bawaan akan otomatis membaca file ini untuk merakit dokumen PDF & DOCX.

### 2. Tambahkan Proyek Anda (`src/data/portfolio.json`)
Tambahkan karya Anda di array `projects`. Setiap entri mendukung:
- `title`, `slug`, `category`, `description`
- `tags` (daftar teknologi yang digunakan)
- `links` (`demo`, `github`, `docs`)
- `markdown` (studi kasus detail yang tampil di dalam modal dialog)
- `translations.en` (terjemahan bahasa Inggris untuk bilingual)

### 3. Sesuaikan Domain & Metadata SEO
- Di [`astro.config.mjs`](file:///d:/Project/Portofolio/astro.config.mjs): ubah `site: "https://domainanda.com"`
- Di [`src/layouts/site.astro`](file:///d:/Project/Portofolio/src/layouts/site.astro): ubah judul default, deskripsi meta, dan skema JSON-LD.

### 4. Ganti Gambar & Aset
Letakkan screenshot proyek Anda di folder `public/projects/` dan sertifikat di `public/certificates/`.

---

## 📜 Daftar Script NPM

| Perintah | Fungsi |
| :--- | :--- |
| `npm run dev` | Menjalankan Astro development server lokal (`port 3000` dengan hot-reload) |
| `npm run build` | Mengompilasi bundel statis produksi yang teroptimasi ke folder `dist/` |
| `npm run preview` | Menjalankan server lokal untuk menguji hasil build produksi |
| `npm run lint` | Menjalankan pengecekan tipe data TypeScript di seluruh file (`tsc --noEmit`) |
| `npm run format` | Memformat seluruh baris kode secara rapi menggunakan Prettier |
| `npm run format:check` | Memeriksa kepatuhan format Prettier tanpa memodifikasi file |
| `npm run og:generate` | Menjalankan generator banner Open Graph sosial |
| `npm run clean` | Membersihkan folder build `dist/` dan cache terkait |

---

## 🚀 Panduan Deployment

Proyek ini telah dikonfigurasi untuk deployment instan di **Vercel**:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FIngsR%2FPortofolio)

### Deployment Manual di Vercel
1. Hubungkan repositori GitHub Anda ke dashboard [Vercel](https://vercel.com).
2. Framework Preset: **Astro** (terdeteksi secara otomatis).
3. Build Command: `astro build`.
4. Output Directory: `dist`.
5. Klik **Deploy**! Halaman Anda akan langsung live di seluruh jaringan Edge CDN global.

---

## 🤝 Kontribusi

Kontribusi, pelaporan isu (*issues*), dan usulan fitur baru sangat terbuka!  
Silakan kunjungi [halaman issues](https://github.com/IngsR/Portofolio/issues).

Jika repositori ini bermanfaat atau menginspirasi Anda, dukung dengan memberikan **⭐️ Star**!

---

## 👨‍💻 Pengembang

**Ikhwan Ramadhan**

- 🌐 Website: [https://ikhwann.my.id](https://ikhwann.my.id)
- 🐙 GitHub: [@IngsR](https://github.com/IngsR)
- 💼 LinkedIn: [Ikhwan Ramadhan](https://www.linkedin.com/in/ikhwn-rdn)
- ✉️ Email: [ikhwn.rdn@gmail.com](mailto:ikhwn.rdn@gmail.com)

---

## 📄 Lisensi

Proyek ini dirilis di bawah lisensi [MIT](LICENSE).  
Silakan digunakan, dimodifikasi, dan dikembangkan untuk membangun portofolio Anda sendiri!

<div align="center">
  <br/>
  <sub>Dibuat dengan dedikasi & teknologi web modern oleh <strong>Ikhwan Ramadhan</strong> • © 2026</sub>
</div>
