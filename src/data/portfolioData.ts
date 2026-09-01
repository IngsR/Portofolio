import {
  CertificationItem,
  EducationItem,
  EngineeringMindsetSkill,
  ExperienceItem,
  ProjectItem,
  SkillCategory,
  UserProfile,
} from "../types";

export const userProfile: UserProfile = {
  name: "Ikhwan Ramadhan",
  title: "Frontend Engineer",
  tagline:
    'Lulusan S1 Teknik Informatika UPI "YPTK" Padang, dengan spesialisasi pada Frontend Engineering. Menguasai React.js dan TypeScript dengan fokus utama pada Next.js dan Angular, serta memahami strategi rendering (SSR, SSG, CDN), Technical SEO, Open Graph, dan Reactive Programming (RxJS & Signals).',
  shortBio:
    "Lulusan S1 Teknik Informatika UPI “YPTK” Padang, dengan fokus pada Frontend Engineering. Menguasai React.js dan TypeScript dengan dua framework utama Next.js dan Angular, serta memahami strategi rendering (SSR, SSG, CDN), Technical SEO, Open Graph, dan Reactive Programming (RxJS & Signals).",
  fullBio: [
    "Saya Ikhwan Ramadhan, lulusan S1 Teknik Informatika Universitas Putra Indonesia “YPTK” Padang, dengan fokus keahlian pada Frontend Engineering.",
    "Spesialisasi utama saya berakar pada ekosistem React.js & TypeScript dengan 2 framework utama: Next.js (App Router, Server Components, SSR/SSG/ISR, Dynamic Metadata & Technical SEO) dan Angular (Enterprise Component Architecture, Reactive Programming dengan RxJS & Signals, Type-Safe Service Injection). Untuk kebutuhan aplikasi berskala spesifik dan ultra-ringan, saya juga memanfaatkan arsitektur Astro dan Vite.",
    "Saya memandang rekayasa frontend bukan sekadar estetika tampilan, melainkan ketepatan arsitektur rendering, efisiensi bundle, pemanfaatan CDN caching, keterbacaan bot pencari (Open Graph & Structured Data), hingga pengalaman interaksi reaktif yang mulus bagi pengguna akhir.",
    "Saya siap berkontribusi secara profesional untuk merancang antarmuka web mutakhir, memecahkan tantangan performa Core Web Vitals, dan membangun produk digital yang bernilai tinggi bagi bisnis.",
  ],
  location: "Indonesia",
  workPreference:
    "On-Site / WFO di Seluruh Indonesia (Siap Relokasi) & Hybrid / Remote",
  email: "ikhwn.rdn@gmail.com",
  phone: "+6282386473410",
  whatsappUrl:
    "https://wa.me/6282386473410?text=Halo%20Ikhwan%2C%20saya%20melihat%20portofolio%20Anda%20dan%20tertarik%20untuk%20berdiskusi%20terkait%20peluang%20kerja%20Frontend%20Engineer%20%2F%20proyek.",
  avatarUrl: "/profile.png",
  statusText:
    "Siap Bekerja On-Site (WFO) di Seluruh Indonesia / Relokasi & Remote",
  isAvailableForHire: true,
  stats: {
    projectsCompleted: 8,
    yearsExperience: 2,
    happyClients: 8,
    codeCommits: "500+",
  },
  socials: [
    {
      name: "GitHub",
      url: "https://github.com/IngsR",
      icon: "Github",
      username: "IngsR",
      colorClass: "hover:text-gray-900 dark:hover:text-white",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/ikhwn-rdn",
      icon: "Linkedin",
      username: "in/ikhwan-ramadhan",
      colorClass: "hover:text-blue-600 dark:hover:text-blue-400",
    },
    {
      name: "WhatsApp",
      url: "https://wa.me/6282386473410?text=Halo%20Ikhwan%2C%20saya%20melihat%20portofolio%20Anda%20dan%20tertarik%20untuk%20berdiskusi%20terkait%20peluang%20kerja%20Frontend%20Engineer%20%2F%20proyek.",
      icon: "Phone",
      username: "+62 823-8647-3410",
      colorClass: "hover:text-emerald-600 dark:hover:text-emerald-400",
    },
    {
      name: "Email",
      url: "mailto:ikhwn.rdn@gmail.com",
      icon: "Mail",
      username: "ikhwn.rdn@gmail.com",
      colorClass: "hover:text-rose-600 dark:hover:text-rose-400",
    },
  ],
};

export const initialProjects: ProjectItem[] = [
  {
    id: "proj-1",
    slug: "website-smp-negeri-24-padang",
    title: "Website SMP Negeri 24 Padang",
    shortDescription:
      "Portal resmi dan sistem informasi sekolah berkinerja tinggi berbasis Next.js App Router, dioptimalkan dengan Technical SEO, SSR/SSG caching, Open Graph dinamis, dan UI modular shadcn/ui.",
    category: "Next.js & Performance",
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Technical SEO",
      "SSR / SSG",
      "Open Graph",
      "Tailwind CSS",
      "shadcn/ui",
      "Zod",
    ],
    image: "/projects/smpn24.png",
    featured: true,
    publishedDate: "2025-12-01",
    period: "2025 (Proyek Produksi)",
    role: "Lead Frontend Engineer",
    demoUrl: "https://smpn24padang.sch.id",
    githubUrl: "https://github.com/Informatics-2025/Website-SMPN24padang",
    problem:
      "Portal sekolah sebelumnya lambat dimuat di perangkat mobile, belum terindeks secara optimal di mesin pencari (SEO rendah), tidak memiliki pratinjau media sosial (Open Graph), serta membutuhkan antarmuka pengelolaan informasi akademik yang terstruktur.",
    solution:
      "Merancang arsitektur antarmuka modern dengan Next.js App Router yang mengombinasikan Server-Side Rendering (SSR) & Static Site Generation (SSG) caching, optimasi Technical SEO (Dynamic Metadata, Open Graph, Sitemap & Robots.txt), tata letak semantik HTML5, serta panel administrasi modular berbasis shadcn/ui dan validasi skema form Zod.",
    metrics: [
      { label: "Rendering & SEO", value: "Next.js SSR + Dynamic OG" },
      { label: "Design System", value: "shadcn/ui + Tailwind CSS" },
      { label: "Web Vitals", value: "Mobile Optimized & Fast Indexing" },
    ],
    markdownContent: `---
title: "Website SMP Negeri 24 Padang"
description: "High-performance school portal and academic information platform powered by Next.js App Router, featuring Technical SEO, SSR/SSG caching, dynamic Open Graph, and modular UI."
date: "2025-12-01"
category: "Next.js & Performance"
tags:
  - Next.js
  - React
  - TypeScript
  - Technical SEO
  - SSR / SSG
  - Open Graph
  - Tailwind CSS
  - shadcn/ui
  - Zod
github: "https://github.com/Informatics-2025/Website-SMPN24padang"
demo: "https://smpn24padang.sch.id"
featured: true
---

# Website SMP Negeri 24 Padang

## 📌 Ringkasan Proyek
Website profil dan sistem informasi sekolah resmi untuk **SMP Negeri 24 Padang**. Proyek ini dirancang sebagai platform terpadu untuk publikasi berita, pengumuman akademik, galeri kegiatan, serta portal administrasi terintegrasi bagi guru dan staf.

> **Catatan Tim & Peran**: Bertindak sebagai **Lead Frontend Engineer**, memimpin perancangan arsitektur antarmuka, optimasi performa Core Web Vitals, implementasi SEO teknis menyeluruh (Dynamic Open Graph, Metadata, Sitemap), standarisasi komponen shadcn/ui, serta integrasi form validation type-safe Zod.

---

## 🛠️ Tech Stack & Arsitektur Frontend
- **Framework & Runtime**: Next.js App Router (SSR, SSG, Static Assets Optimization), React, TypeScript
- **Styling & Design System**: Tailwind CSS, shadcn/ui, Lucide Icons
- **Technical SEO & Metadata**: Dynamic Metadata API, Open Graph Image Generation, Automated XML Sitemap, Robots.txt, Semantic HTML5
- **Form & Validation**: React Hook Form, Zod Schema Validation
- **Performance Strategy**: Server-side rendering dengan edge caching, lazy loading gambar teroptimasi, dan isolasi Client Components

---

## ✨ Fitur Teknis Utama
1. **Technical SEO & Social Sharing (Open Graph)**: Pengaturan metadata otomatis pada setiap halaman artikel dan pengumuman untuk pratinjau kaya di media sosial dan indeks pencarian Google.
2. **Hybrid Rendering (SSR / SSG)**: Halaman profil statis di-generate secara SSG untuk kecepatan instan, sementara data berita dan pengumuman di-render secara SSR dengan caching revalidasi.
3. **Admin Panel Modular & Type-Safe**: Dashboard pengelolaan berita dan galeri dengan komponen modular shadcn/ui dan validasi form Zod.
4. **Mobile First & Responsive Layout**: Aksesibilitas tinggi pada berbagai ukuran layar dengan Core Web Vitals yang teroptimasi.`,
  },
  {
    id: "proj-2",
    slug: "angular-property-platform",
    title: "Angular Property — HouseING Property",
    shortDescription:
      "Aplikasi pencarian dan pengambilan keputusan properti modern berbasis Angular Standalone Components (Full TypeScript), Angular Signals, visual blueprint 2D, matriks komparasi side-by-side, dan simulator KPR standar BI.",
    category: "Angular & Reactive Architecture",
    tags: [
      "Angular",
      "TypeScript",
      "Angular Signals",
      "Tailwind CSS v4",
      "Standalone Components",
      "Reactive State",
      "KPR Simulator",
    ],
    image: "/projects/property.png",
    featured: true,
    publishedDate: "2026-03-01",
    period: "2026 (Proyek Unggulan)",
    role: "Frontend Engineer",
    demoUrl: "https://github.com/IngsR/Angular-Property",
    githubUrl: "https://github.com/IngsR/Angular-Property",
    problem:
      "Calon pembeli rumah sering kesulitan membandingkan spesifikasi properti secara objektif, menghitung estimasi cicilan KPR dengan rumus anuitas perbankan yang akurat, serta memvisualisasikan denah arsitektur bertingkat dalam satu antarmuka yang cepat dan responsif.",
    solution:
      "Membangun aplikasi web modern menggunakan Angular Standalone Components dan TypeScript murni dengan arsitektur reaktif Angular Signals (signal, computed, effect), fitur komparasi matriks berdampingan, visual denah arsitektur 2D interaktif dengan zoom/kompas, serta simulator KPR formula anuitas perbankan real-time.",
    metrics: [
      { label: "Reactivity", value: "Angular Signals Core" },
      { label: "Architecture", value: "Clean Domain-Driven" },
      { label: "Tooling", value: "Bun & Tailwind v4" },
    ],
    markdownContent: `---
title: "HouseING Property — Platform Pencarian & Keputusan Properti"
description: "Aplikasi web modern berbasis Angular Standalone Components (Full TypeScript) yang dirancang untuk membantu calon pembeli rumah mengambil keputusan pembelian dan finansial properti secara objektif, transparan, dan terverifikasi."
date: "2026-03-01"
category: "Angular & Reactive Architecture"
tags:
  - Angular
  - TypeScript
  - Angular Signals
  - Tailwind CSS v4
  - Standalone Components
  - Reactive State
  - KPR Simulator
github: "https://github.com/IngsR/Angular-Property"
demo: "https://github.com/IngsR/Angular-Property"
featured: true
---

# 🏡 HouseING Property — Platform Pencarian & Keputusan Properti

**HouseING Property** adalah aplikasi web modern berbasis **Angular Standalone Components (Full TypeScript)** yang dirancang untuk membantu calon pembeli rumah mengambil keputusan pembelian dan finansial properti secara objektif, transparan, dan terverifikasi.

---

## 📌 Ringkasan Eksekutif (Untuk HR & Recruiter)
Aplikasi ini mendemonstrasikan implementasi arsitektur frontend tingkat enterprise dengan fokus pada:
- **Modern State Reactivity**: Menggunakan Angular Signals (\`signal()\`, \`computed()\`, \`effect()\`) untuk reaktivitas state berkecepatan tinggi tanpa overhead kompleksitas store pihak ketiga.
- **Clean Domain-Driven Architecture**: Pemisahan lapisan kode yang jelas antara core (*models, types, services, repository*), shared (*UI primitives, pipes, layout components*), dan features (*halaman mandiri & business logic*).
- **100% Full TypeScript & Standalone Components**: Seluruh kode ditulis murni dalam TypeScript dengan deklarasi tipe data yang ketat (*strict*), tanpa JSX/React, dan tanpa file NgModule legacy.
- **Performance & Modern Tooling**: Dibangun menggunakan Bun sebagai runtime/package manager dan Tailwind CSS v4 dengan sistem lazy-loaded routes untuk waktu inisialisasi awal yang sangat cepat.

---

## 🚀 Fitur Utama & Value Proposition

### 1. 🏠 Smart Discovery & Filter Multidimensi
- Pencarian cerdas berbasis tokenisasi teks (mencakup judul, deskripsi, developer, legalitas, kecamatan, dan kota).
- Filter lanjutan: Pilihan kota (Padang, Jakarta, Bandung, Bali, dll), kategori tipe properti, rentang harga fleksibel, dan jumlah kamar tidur.
- Sorting engine multi-parameter: Relevansi, harga terendah/tertinggi, properti terbaru, serta luas tanah dan bangunan terbesar.

### 2. 📐 Visual Blueprint & Denah Arsitektur 2D Terukur
- Eksplorasi denah arsitektur bertingkat (*multi-floor level switcher*) dengan kontrol Zoom In/Out/Reset dan tampilan layar penuh.
- Visual kompas penunjuk arah mata angin arsitektural (Utara).
- Tabel rincian dimensi presisi per ruangan lengkap dengan proporsi luas terhadap total luas lantai dan highlight arsitektur (sirkulasi silang, tinggi plafon 3.8m, fondasi rumah tumbuh).

### 3. ⚖️ Matriks Komparasi 2 Properti Objektif
- Membandingkan 2 properti pilihan secara berdampingan (*side-by-side matrix*).
- Sinkronisasi metrik kunci: Harga penawaran, estimasi cicilan KPR, legalitas sertifikat (SHM/PPJB), spesifikasi fisik (LB/LT, kamar, lantai, parkir), dan developer terverifikasi.
- Dialog modal interaktif untuk memilih unit pembanding dari katalog secara instan.

### 4. 🧮 Simulator KPR Finansial Standar Bank Indonesia
- Perhitungan angsuran KPR bulanan formula anuitas perbankan secara real-time.
- Parameter interaktif: Slider uang muka (% & nominal Rupiah), pilihan suku bunga acuan, dan tenor pinjaman (hingga 25 tahun).
- Rekomendasi penghasilan minimum keluarga berbasis batas aman Debt Service Ratio (DSR) maksimal 33%.
- Tabel rincian jadwal amortisasi tahunan (pembagian porsi pembayaran pokok vs bunga hingga akhir masa tenor).

### 5. ❤️ Sistem Favorit & Notifikasi Toast Reaktif
- Penyimpanan listing hunian favorit pengguna dengan persistensi localStorage.
- Notifikasi toast reaktif untuk setiap interaksi aksi pengguna (simpan favorit, tambah komparasi, reset).

---

## 🏗️ Struktur Arsitektur Proyek
\`\`\`
src/
├── app/
│   ├── app.config.ts        # ApplicationConfig & Provider setup (Router, ChangeDetection)
│   ├── app.routes.ts        # Lazy-loaded route definitions
│   └── app.ts               # Root App Shell (Header, Router Outlet, Footer, Toast)
├── core/
│   ├── models/              # Domain models & navigation interfaces
│   ├── repositories/        # Type-safe Repository Pattern (Mock API dengan simulasi latency)
│   ├── services/            # Angular @Injectable Signals Services (Favorite, Comparison, Notification, KPR)
│   └── types/               # Pure TypeScript type declarations (Property, KPR, Notification)
├── features/
│   ├── home/pages/          # Beranda: Hero Search, Panduan Pembeli Cerdas, Featured Listing
│   ├── discovery/           # Katalog: Filter Sidebar, Search Console, Property Card Component
│   ├── property/pages/      # Detail: Galeri Foto, Denah 2D, Spesifikasi, Peta, Decision Panel
│   ├── comparison/pages/    # Matriks Komparasi 2 Properti Side-by-Side
│   ├── favorites/pages/     # Halaman Koleksi Properti Tersimpan
│   └── simulator/kpr/pages/ # Simulator KPR & Analisis Kelayakan Finansial
├── shared/
│   ├── components/          # Reusable Header, Footer, dan Breadcrumbs
│   ├── pipes/               # Custom Pipes (RupiahPipe untuk format mata uang)
│   ├── ui/                  # Atom UI components (Button, Modal, EmptyState, Skeleton)
│   └── utils/               # Utility helper functions & formatters
├── assets/mock/             # Dataset properti, developer, lokasi, dan fasilitas
├── index.html               # Single Page Application HTML Entry Point
├── main.ts                  # Bootstrap entry point
└── styles.css               # Tailwind CSS v4 root stylesheet
\`\`\`

---

## 🛠️ Ringkasan Teknologi (Tech Stack)
- **Framework**: Angular (Standalone Components Architecture)
- **Bahasa Pemrograman**: TypeScript (Strict Type-Checking)
- **State Management**: Angular Signals (\`signal\`, \`computed\`, \`effect\`)
- **Styling**: Tailwind CSS v4 + PostCSS
- **Runtime / Package Manager**: Bun
- **Routing**: Angular Router (Lazy-loading per feature page)
- **Design Pattern**: Repository Pattern & Dependency Injection`,
  },
  {
    id: "proj-3",
    slug: "tropical-cyclone-track-prediction",
    title: "Tropical Cyclone Prediction (Astro Geospatial UI)",
    shortDescription:
      "Aplikasi pemantauan dan visualisasi lintasan siklon tropis berkecepatan tinggi yang dimigrasikan ke Astro (Island Architecture) dengan rendering geospatial interaktif dan optimasi Edge CDN.",
    category: "Astro & Geospatial UI",
    tags: [
      "Astro",
      "TypeScript",
      "Island Architecture",
      "Geospatial UI",
      "SSG / Edge CDN",
      "Data Visualization",
      "Tailwind CSS",
    ],
    image: "/projects/siklon.png",
    featured: true,
    publishedDate: "2026-08-10",
    period: "2026 (Riset & Migrasi Astro)",
    role: "Frontend & Research Engineer",
    demoUrl: "https://prediksi.ikhwann.my.id",
    githubUrl: "https://github.com/IngsR/PrediksiSIklon-LSTM",
    problem:
      "Aplikasi visualisasi data lintasan sebelumnya memiliki payload JavaScript monolitik yang berat dan lambat dimuat pada koneksi mobile, serta interaktivitas peta yang membebani kinerja render peramban.",
    solution:
      "Memigrasikan arsitektur antarmuka ke Astro memanfaatkan Island Architecture untuk mencapai Zero-JS by default pada elemen statis, mengisolasi komponen peta geospatial dan visualisasi interaktif hanya di area hidrasi yang diperlukan, serta mendeploy ke Edge CDN dengan domain live prediksi.ikhwann.my.id.",
    metrics: [
      { label: "Framework", value: "Astro Island Architecture" },
      { label: "Live Domain", value: "prediksi.ikhwann.my.id" },
      { label: "Delivery", value: "Edge CDN & Zero-JS Core" },
    ],
    markdownContent: `---
title: "Tropical Cyclone Track Prediction"
description: "High-performance geospatial visualization application migrated to Astro Island Architecture, delivering instant load times and interactive mapping for tropical cyclone tracks."
date: "2026-08-10"
category: "Astro & Geospatial UI"
tags:
  - Astro
  - TypeScript
  - Island Architecture
  - Geospatial UI
  - SSG / Edge CDN
  - Data Visualization
  - Tailwind CSS
github: "https://github.com/IngsR/PrediksiSIklon-LSTM"
demo: "https://prediksi.ikhwann.my.id"
featured: true
---

# Tropical Cyclone Prediction (Astro Geospatial UI)

## 🌪️ Latar Belakang & Domain Masalah
Visualisasi prediksi pergerakan siklon tropis membutuhkan antarmuka yang cepat dimuat dalam situasi darurat dan mampu menampilkan data spasial berukuran besar secara interaktif tanpa menurunkan performa peramban.

---

## ⚡ Rekayasa Antarmuka & Migrasi Astro
1. **Astro Island Architecture**: Menggantikan rendering monolitik dengan arsitektur pulau (islands), sehingga halaman utama bersifat pure HTML statis (Zero-JS) dan JavaScript hanya dimuat saat peta/grafik dihidrasi.
2. **Optimasi Geospatial & Charts**: Peta lintasan interaktif dan grafik time-series dirender dengan lazy loading terisolasi.
3. **Edge CDN Distribution**: Seluruh asset statis dan HTML pra-render didistribusikan melalui Edge CDN pada subdomain produksi **prediksi.ikhwann.my.id**.
4. **Data Contract Type-Safety**: Pemetaan data hasil prediksi model ke format geospatial GeoJSON menggunakan TypeScript secara type-safe.`,
  },
  {
    id: "proj-4",
    slug: "ing-store-automotive-ecommerce",
    title: "Ing Store — Automotive Interactive Storefront",
    shortDescription:
      "Storefront e-commerce otomotif interaktif dengan simulasi kalkulator kredit real-time, filter multi-parameter instan, galeri kendaraan teroptimasi, dan antarmuka responsif.",
    category: "React & Next.js UI",
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Interactive UI",
      "State Management",
      "Client UX",
    ],
    image: "/projects/ingstore.png",
    featured: false,
    publishedDate: "2025-07-23",
    period: "2025",
    role: "Frontend Engineer",
    demoUrl: "https://ing-store.vercel.app",
    githubUrl: "https://github.com/IngsR/web_store",
    problem:
      "Calon pembeli kendaraan membutuhkan pengalaman eksplorasi unit yang mulus dengan kalkulasi simulasi pembiayaan langsung tanpa reload halaman atau latensi komputasi.",
    solution:
      "Membangun antarmuka storefront modern berbasis Next.js dan React yang mengintegrasikan kalkulator kredit reaktif berbasis state client-side, sistem filter multi-dimensi instan, dan optimasi aset gambar kendaraan.",
    metrics: [
      { label: "Frontend Engine", value: "Next.js + TypeScript" },
      { label: "Interactive UX", value: "Instant Dynamic Loan Calc" },
      { label: "UI System", value: "Tailwind CSS Modular" },
    ],
    markdownContent: `---
title: "Ing Store — Automotive E-Commerce"
description: "Interactive automotive storefront with dynamic loan calculator, multi-parameter vehicle filter, and responsive visual catalog."
date: "2025-07-23"
category: "React & Next.js UI"
tags:
  - Next.js
  - React
  - TypeScript
  - Tailwind CSS
  - Interactive UI
  - State Management
github: "https://github.com/IngsR/web_store"
demo: "https://ing-store.vercel.app"
featured: false
---

# Ing Store — Automotive E-Commerce Storefront

## 🚗 Solusi Antarmuka & UX
**Ing Store** menghadirkan pengalaman belanja daring otomotif yang modern dengan fokus pada responsivitas interaksi pengguna dan visualisasi data kendaraan yang jelas.

---

## ⚙️ Fitur Frontend Utama
- **Dynamic Loan Calculator**: Menghitung estimasi DP dan angsuran bulanan secara reaktif menggunakan state management React.
- **Multi-Filter & Instant Search**: Filter transmisi, tipe bodi, dan rentang harga yang langsung memperbarui tampilan katalog secara instan.
- **Optimized Media Assets**: Pemuatan galeri kendaraan dengan placeholder blur dan responsive image scaling.`,
  },
  {
    id: "proj-5",
    slug: "fullstack-crm-erp-monorepo",
    title: "Enterprise Monorepo UI — CRM/ERP Design System",
    shortDescription:
      "Arsitektur monorepo antarmuka enterprise Next.js 15 & React 19 dalam Turborepo dengan standardisasi komponen UI bersama, modularitas tinggi, dan type contract sharing.",
    category: "Design System & Monorepo",
    tags: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Turborepo",
      "Design System",
      "Type Safety",
    ],
    image: "/projects/monorepo.svg",
    featured: false,
    publishedDate: "2025-11-30",
    period: "2025",
    role: "Frontend Engineer (Monorepo & Design System)",
    demoUrl: "",
    githubUrl: "https://github.com/IngsR/Monorepo-CRM",
    metrics: [
      { label: "Frontend Core", value: "Next.js 15 + React 19" },
      { label: "Monorepo Build", value: "Turborepo Shared Packages" },
      { label: "Architecture", value: "Strict Type Contracts" },
    ],
    markdownContent: `---
title: "Enterprise Monorepo UI — CRM/ERP"
description: "Scalable enterprise UI architecture built with Turborepo, Next.js 15, and React 19, sharing reusable design system packages and strict TypeScript contracts."
date: "2025-11-30"
category: "Design System & Monorepo"
tags:
  - Next.js 15
  - React 19
  - TypeScript
  - Tailwind CSS
  - Turborepo
  - Design System
github: "https://github.com/IngsR/Monorepo-CRM"
demo: ""
featured: false
---

# Enterprise Monorepo UI — CRM/ERP Platform

## 🏢 Desain Sistem & Arsitektur Monorepo
Aplikasi manajemen operasional bisnis (CRM & ERP) berskala besar dengan pendekatan **Monorepo (Turborepo)** untuk memaksimalkan *code sharing*, pemeliharaan tipe data terpadu antarmuka-ke-layanan, dan isolasi modul UI yang bersih.

---

## 🛠️ Poin Rekayasa Frontend
- **Shared UI Library**: Paket komponen antarmuka bersama yang dapat digunakan kembali lintas aplikasi internal.
- **Next.js 15 & React 19**: Pemanfaatan Server Components dan Actions untuk optimalisasi aliran data ke antarmuka.
- **Type-Safe Contract Sharing**: Sinkronisasi tipe data skema API dan komponen antarmuka dalam satu workspace.`,
  },
  {
    id: "proj-6",
    slug: "inventory-management-system",
    title: "Inventory Logistics Dashboard UI",
    shortDescription:
      "Dashboard antarmuka logistik persediaan gudang dengan data grid responsif, filter status stok instan, visualisasi mutasi barang, dan proteksi sesi pengguna.",
    category: "Dashboard & Data Grid",
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Dashboard UI",
      "Data Grid",
      "State Management",
    ],
    image: "/projects/inventory.png",
    featured: false,
    publishedDate: "2025-07-15",
    period: "2025",
    role: "Frontend Engineer",
    demoUrl: "https://kelola-barang.vercel.app",
    githubUrl: "https://github.com/IngsR/manajemen-iventory",
    metrics: [
      { label: "Dashboard UX", value: "Realtime Filtering State" },
      { label: "Data Grid", value: "Dense Responsive Grid" },
      { label: "Validation", value: "Type-Safe Stock Forms" },
    ],
    markdownContent: `---
title: "Inventory Logistics Dashboard UI"
description: "Responsive warehouse inventory dashboard featuring dense data grids, stock mutation tracking, and client-side filtering."
date: "2025-07-15"
category: "Dashboard & Data Grid"
tags:
  - Next.js
  - React
  - TypeScript
  - Tailwind CSS
  - Dashboard UI
github: "https://github.com/IngsR/manajemen-iventory"
demo: "https://kelola-barang.vercel.app"
featured: false
---

# Inventory Logistics Dashboard UI

## 📦 Desain Antarmuka Logistik
Dashboard kontrol persediaan barang gudang yang ergonomis untuk staf operasional, menyajikan visualisasi status stok, pencatatan barang retur/rusak, dan riwayat mutasi secara terstruktur.`,
  },
  {
    id: "proj-7",
    slug: "dockrank-tf-idf-document-search",
    title: "DockRank — Information Retrieval Search UI",
    shortDescription:
      "Antarmuka pencarian dokumen instan dengan visualisasi perankingan relevansi kata kunci algoritma TF-IDF dan highlight skor transparansi teks.",
    category: "Search UI & Web App",
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Search UI",
      "Data Visualization",
    ],
    image: "/projects/dockrank.png",
    featured: false,
    publishedDate: "2025-07-07",
    period: "2025",
    role: "Frontend Engineer",
    demoUrl: "https://tfidf.vercel.app",
    githubUrl: "https://github.com/IngsR/DockRank_TF-IDF",
    metrics: [
      { label: "Search UI", value: "Instant Ranking View" },
      { label: "Visualization", value: "Term Weight Breakdown" },
      { label: "Frontend", value: "Next.js & React" },
    ],
    markdownContent: `---
title: "DockRank — Information Retrieval Search UI"
description: "Web-based document retrieval interface visualizing TF-IDF ranking scores and term weights in real-time."
date: "2025-07-07"
category: "Search UI & Web App"
tags:
  - Next.js
  - React
  - TypeScript
  - Search UI
github: "https://github.com/IngsR/DockRank_TF-IDF"
demo: "https://tfidf.vercel.app"
featured: false
---

# DockRank — Information Retrieval Search UI

## 🔍 Visualisasi Temu Balik Informasi
Aplikasi web yang mengedepankan transparansi hasil pencarian dokumen dengan menampilkan kalkulasi bobot skor TF-IDF dan visual perankingan yang mudah dipahami pengguna.`,
  },
  {
    id: "proj-8",
    slug: "admin-blog-platform",
    title: "Content Publishing Platform & Live Editor",
    shortDescription:
      "Platform CMS publikasi artikel berbasis Next.js App Router dengan live markdown preview ganda, rendering SEO terstruktur, dan dynamic routing.",
    category: "Content & Publishing UI",
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Markdown UI",
      "Technical SEO",
    ],
    image: "/projects/adminblog.png",
    featured: false,
    publishedDate: "2026-04-13",
    period: "2026",
    role: "Frontend Engineer",
    demoUrl: "https://blogsing.vercel.app",
    githubUrl: "https://github.com/IngsR/AdminBlog_nextjs",
    metrics: [
      { label: "Editor UX", value: "Dual-Pane Live Markdown" },
      { label: "SEO Strategy", value: "Dynamic Structured Metadata" },
      { label: "Rendering", value: "Next.js Hybrid SSG/SSR" },
    ],
    markdownContent: `---
title: "Content Publishing Platform & Live Editor"
description: "Next.js content management system with dual-pane live markdown editor, dynamic routing, and structured SEO metadata."
date: "2026-04-13"
category: "Content & Publishing UI"
tags:
  - Next.js
  - React
  - TypeScript
  - Tailwind CSS
  - Markdown UI
github: "https://github.com/IngsR/AdminBlog_nextjs"
demo: "https://blogsing.vercel.app"
featured: false
---

# Content Publishing Platform & Live Editor

## ✍️ Konsep & Arsitektur Frontend
Platform manajemen artikel berbasis Next.js yang menghadirkan editor Markdown dengan pratinjau instan sisi klien dan halaman publikasi artikel yang dioptimalkan secara SEO dan SSR.`,
  },
  {
    id: "proj-9",
    slug: "react-native-ecommerce",
    title: "React Native E-Commerce Mobile UI",
    shortDescription:
      "Antarmuka belanja daring cross-platform Android & iOS dengan navigasi layar mulus, katalog visual interaktif, dan penanganan status asinkron.",
    category: "Mobile Frontend",
    tags: [
      "React Native",
      "Expo",
      "TypeScript",
      "Mobile UI",
      "Async State",
      "Cross-Platform",
    ],
    image: "/projects/reactnative.svg",
    featured: false,
    publishedDate: "2025-06-06",
    period: "2025",
    role: "Mobile Frontend Developer",
    demoUrl: "",
    githubUrl: "https://github.com/IngsR/ReactExpo-Mobile-Ecomerce",
    metrics: [
      { label: "Mobile UI", value: "Expo & React Native" },
      { label: "Platform", value: "iOS & Android Support" },
      { label: "UX Flow", value: "Smooth Screen Transitions" },
    ],
    markdownContent: `---
title: "React Native E-Commerce"
description: "Cross-platform mobile shopping interface built with React Native and Expo, emphasizing fluid transitions and interactive components."
date: "2025-06-06"
category: "Mobile Frontend"
tags:
  - React Native
  - Expo
  - TypeScript
  - Mobile UI
github: "https://github.com/IngsR/ReactExpo-Mobile-Ecomerce"
demo: ""
featured: false
---

# React Native E-Commerce Mobile UI

## 📱 Ringkasan Aplikasi Mobile
Aplikasi e-commerce cross-platform mobile dengan arsitektur komponen React Native dan Expo yang mengutamakan kelancaran interaksi gestur dan katalog visual responsif.`,
  },
];

export const skillCategories: SkillCategory[] = [
  {
    title: "CORE FRONTEND & FRAMEWORKS",
    iconName: "Layout",
    description: "Fondasi utama rekayasa antarmuka web modern dan scalable.",
    coreStack: ["Next.js", "Angular", "React.js", "TypeScript"],
    alsoUsed: ["JavaScript (ES6+)", "HTML5 Semantic", "CSS3 / Modern Layouts"],
  },
  {
    title: "RENDERING, SEO & WEB PERFORMANCE",
    iconName: "Server",
    description:
      "Arsitektur rendering, optimasi mesin pencari, dan kecepatan web.",
    coreStack: ["SSR / SSG / ISR", "Technical SEO", "Dynamic Open Graph"],
    alsoUsed: [
      "Edge CDN Caching",
      "Core Web Vitals",
      "Automated Sitemap / Schema",
    ],
  },
  {
    title: "REACTIVE PROGRAMMING & STATE",
    iconName: "Cpu",
    description:
      "Manajemen aliran data asinkron, reaktivitas, dan validasi type-safe.",
    coreStack: ["RxJS", "Angular Signals", "React State & Context"],
    alsoUsed: ["TanStack Query", "Zod Schema Validation", "Event-Driven UI"],
  },
  {
    title: "MODERN STYLING & TOOLING",
    iconName: "Terminal",
    description:
      "Desain sistem modular, build tooling, dan arsitektur pengiriman.",
    coreStack: ["Tailwind CSS", "shadcn/ui", "Astro", "Vite"],
    alsoUsedLabel: "TOOLING & DEPLOY",
    alsoUsed: ["Turborepo", "Git & GitHub", "Vercel", "Docker"],
  },
];

export const experienceData: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Lead Frontend Engineer",
    company: "Proyek Sistem Informasi SMP Negeri 24 Padang",
    location: "Padang, Indonesia",
    period: "Agu - Sept 2025",
    type: "Contract",
    description:
      "Memimpin perancangan dan implementasi arsitektur frontend portal resmi dan sistem informasi sekolah berkinerja tinggi berbasis Next.js App Router dan Technical SEO.",
    achievements: [
      "Merancang dan memimpin arsitektur antarmuka portal resmi sekolah menggunakan Next.js App Router, TypeScript, dan Tailwind CSS.",
      "Mengimplementasikan Technical SEO menyeluruh (Dynamic Metadata API, Open Graph Image Generator, automated sitemap/robots, semantic HTML5) serta strategi SSR/SSG caching sehingga portal cepat terindeks mesin pencari.",
      "Membangun admin dashboard modular berbasis shadcn/ui dengan form validation Zod yang type-safe untuk kemudahan staf sekolah.",
    ],
    techStack: [
      "Next.js (App Router)",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Technical SEO",
      "Dynamic Open Graph",
      "SSR / SSG",
      "Zod",
    ],
  },
  {
    id: "exp-2",
    role: "Frontend Engineer (Open Source & Enterprise Projects)",
    company: "IngsR Engineering Repositories",
    location: "Indonesia / Remote",
    period: "2023 - Sekarang",
    type: "Freelance",
    description:
      "Merancang dan mengembangkan berbagai antarmuka web modern dengan fokus pada Next.js, Angular, Reactive Programming (RxJS & Signals), migrasi Astro Island Architecture, dan sistem monorepo.",
    achievements: [
      "Mengembangkan Angular Property (Real Estate Platform) memanfaatkan Angular, TypeScript, dan Reactive Programming (RxJS Streams & Angular Signals).",
      "Memigrasikan antarmuka visualisasi prediksi siklon tropis ke Astro (Island Architecture) dengan domain live prediksi.ikhwann.my.id untuk performa Zero-JS default di Edge CDN.",
      "Membangun sistem desain antarmuka enterprise pada Fullstack CRM/ERP Monorepo dengan Turborepo, Next.js 15, dan React 19.",
    ],
    techStack: [
      "Next.js",
      "Angular",
      "React.js",
      "TypeScript",
      "RxJS",
      "Signals",
      "Astro",
      "Tailwind CSS",
      "Turborepo",
    ],
  },
];

export const educationData: EducationItem[] = [
  {
    id: "edu-1",
    degree: "S1 Teknik Informatika",
    institution: "Universitas Putra Indonesia “YPTK” Padang",
    period: "Teknik Informatika • Sep 2022 – Okt 2026",
    details: "",
  },
];

export const certificationsData: CertificationItem[] = [
  {
    id: "cert-1",
    title: "Artificial Intelligence Fundamentals",
    issuer: "Huawei ICT Academy",
    issueDate: "2026",
    period: "",
    badgeCode: "HUAWEI-AI-FUNDAMENTALS",
    category: "Artificial Intelligence",
    credentialUrl: "https://e.huawei.com/en/talent/#/",
    image: "/certificates/Artificial Intelligence Fundamentals.png",
    skills: [
      "Artificial Intelligence",
      "Machine Learning Basics",
      "Deep Learning Concepts",
      "Neural Networks",
      "Python for AI",
    ],
    description:
      "Sertifikasi kompetensi fundamental kecerdasan buatan dari Huawei ICT Academy yang mencakup pengenalan komprehensif konsep AI, dasar-dasar machine learning, pemodelan deep learning, arsitektur neural networks, serta implementasi dasar komputasi cerdas dalam penyelesaian masalah.",
  },
  {
    id: "cert-2",
    title: "Artificial Intelligence: Principles and Applications",
    issuer: "Huawei ICT Academy",
    issueDate: "2026",
    period: "",
    badgeCode: "HUAWEI-AI-PRINCIPLES-APP",
    category: "Artificial Intelligence & Deep Learning",
    credentialUrl: "https://e.huawei.com/en/talent/#/",
    image:
      "/certificates/Artificial Intelligence_ Principles and Applications.png",
    skills: [
      "AI Principles",
      "Deep Learning Architecture",
      "Computer Vision",
      "Natural Language Processing",
      "AI Industry Applications",
    ],
    description:
      "Sertifikasi penguasaan prinsip dan aplikasi kecerdasan buatan dari Huawei ICT Academy, mencakup arsitektur deep learning tingkat lanjut, Computer Vision (CV), pemrosesan bahasa alami (NLP), pipeline data, dan integrasi solusi AI pada skenario industri nyata.",
  },
  {
    id: "cert-3",
    title: "HCIP-Datacom Core Technology V1.0 Course",
    issuer: "Huawei ICT Academy",
    issueDate: "2026",
    period: "",
    badgeCode: "HUAWEI-HCIP-DATACOM-V1.0",
    category: "Network & Infrastructure Engineering",
    credentialUrl: "https://e.huawei.com/en/talent/#/",
    image: "/certificates/HCIP-Datacom Core Technology V1.0 Course.png",
    skills: [
      "Datacom Routing & Switching",
      "Advanced IP Networking",
      "OSPF / BGP Protocols",
      "VLAN & STP",
      "Enterprise Network Security",
    ],
    description:
      "Validasi kompetensi profesional teknologi komunikasi data (Datacom) Huawei tingkat HCIP, mencakup perancangan dan konfigurasi arsitektur jaringan skala enterprise, routing dinamis (OSPF/BGP), teknologi switching, keandalan jaringan, dan keamanan infrastruktur.",
  },
  {
    id: "cert-4",
    title: "Problem Solving (Basic)",
    issuer: "HackerRank",
    issueDate: "Mei 2025",
    period: "",
    badgeCode: "HACKERRANK-PS-BASIC",
    category: "Problem Solving & DSA",
    credentialUrl:
      "https://www.hackerrank.com/certificates/iframe/18c088033553",
    image: "/certificates/Problem Solving (Basic).png",
    skills: [
      "Problem Solving",
      "Data Structures",
      "Algorithms",
      "Logic",
      "Competitive Programming",
    ],
    description:
      "Sertifikasi kompetensi Problem Solving (Basic) dari HackerRank yang memvalidasi kemampuan dalam pemecahan masalah algoritma dasar, pemahaman struktur data, serta implementasi logika pemrograman yang efisien.",
  },
  {
    id: "cert-5",
    title: "Problem Solving (Intermediate)",
    issuer: "HackerRank",
    issueDate: "Jun 2025",
    period: "",
    badgeCode: "HACKERRANK-PS-INTERMEDIATE",
    category: "Problem Solving & DSA",
    credentialUrl:
      "https://www.hackerrank.com/certificates/iframe/f839f365795c",
    image: "/certificates/Problem Solving (Intermediate).png",
    skills: [
      "Advanced Problem Solving",
      "Complex Data Structures",
      "Algorithmic Optimization",
      "Performance Tuning",
    ],
    description:
      "Sertifikasi kompetensi Problem Solving (Intermediate) dari HackerRank yang memvalidasi kemampuan menengah dalam menangani algoritma yang lebih kompleks, optimasi performa kode, dan penggunaan struktur data tingkat lanjut untuk menyelesaikan tantangan teknis.",
  },
];

export const engineeringMindsetSkills: EngineeringMindsetSkill[] = [
  {
    id: "rendering-architecture",
    category: "01 — Rendering Strategies & Architecture",
    title: "SSR, SSG, ISR & CDN Edge Caching",
    narrative:
      "Saya memandang arsitektur rendering sebagai keputusan strategis. Setiap halaman memiliki kebutuhan berbeda: halaman publik sekolah membutuhkan SSG dengan caching revalidasi untuk waktu muat instan, sedangkan dashboard interaktif memerlukan client hydration yang terukur. Dengan memahami Server-Side Rendering (SSR), Static Site Generation (SSG), Incremental Static Regeneration (ISR), dan distribusi Edge CDN, saya memastikan aplikasi web memuat secara instan dengan efisiensi server maksimal.",
    technologies: [
      "SSR",
      "SSG",
      "ISR",
      "Edge CDN",
      "Next.js App Router",
      "Astro Islands",
      "Web Performance",
    ],
    iconName: "Server",
  },
  {
    id: "nextjs-react-core",
    category: "02 — Next.js & React Ecosystem",
    title: "Modern React & App Router Mastery",
    narrative:
      "React.js dan Next.js adalah salah satu pilar utama saya. Saya membangun antarmuka dengan memisahkan Server Components dan Client Components secara presisi, mengoptimalkan re-render, menyusun hierarki komponen yang modular, serta menerapkan optimasi aset media Next/Image dan font agar skor Core Web Vitals tetap prima.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Server Components",
      "Client Boundary",
      "Core Web Vitals",
    ],
    iconName: "Layout",
  },
  {
    id: "angular-reactive-patterns",
    category: "03 — Angular & Reactive Architecture",
    title: "Enterprise Frontend with Angular & RxJS",
    narrative:
      "Untuk aplikasi enterprise dengan kompleksitas tinggi, saya memanfaatkan Angular dengan arsitektur modular yang kuat. Saya menguasai Reactive Programming menggunakan RxJS Observables dan Angular Signals untuk mengalirkan data asinkron secara terprediksi, dependency injection untuk modularitas service, dan Angular Reactive Forms dengan validasi ketat.",
    technologies: [
      "Angular",
      "TypeScript",
      "RxJS",
      "Angular Signals",
      "Dependency Injection",
      "Reactive Forms",
    ],
    iconName: "Cpu",
  },
  {
    id: "technical-seo-opengraph",
    category: "04 — Technical SEO & Open Graph Strategy",
    title: "Search Engine Optimization & Social Previews",
    narrative:
      "Bagi saya, website yang hebat harus mudah ditemukan oleh pengguna dan mesin pencari. Saya menerapkan Technical SEO secara mendalam: Dynamic Metadata, Open Graph & Twitter Cards untuk pratinjau sosial yang kaya, semantic HTML5, validasi JSON-LD Schema (Person, WebSite, Breadcrumbs), serta XML sitemap dan robots.txt otomatis.",
    technologies: [
      "Technical SEO",
      "Open Graph",
      "JSON-LD Schema",
      "Semantic HTML5",
      "Sitemap & Robots",
      "Twitter Cards",
    ],
    iconName: "Layers",
  },
  {
    id: "performance-design-systems",
    category: "05 — Design Systems & Tooling",
    title: "Tailwind CSS, shadcn/ui, Astro & Tooling",
    narrative:
      "Saya membangun antarmuka yang konsisten menggunakan Tailwind CSS dan sistem komponen shadcn/ui. Untuk aplikasi spesifik berskala ringan dan presentasi konten, saya memanfaatkan Astro (Island Architecture) dan Vite untuk mencapai waktu render tercepat dengan payload JavaScript minimal.",
    technologies: [
      "Tailwind CSS",
      "shadcn/ui",
      "Astro",
      "Vite",
      "Turborepo",
      "Git",
      "Vercel",
    ],
    iconName: "Terminal",
  },
];

export const contactFaq = [
  {
    question:
      "Bagaimana cara menghubungi Ikhwan Ramadhan untuk peluang kerja Frontend Engineer?",
    answer:
      "Anda dapat menghubungi saya langsung melalui WhatsApp di +62 823-8647-3410, via email ke ikhwn.rdn@gmail.com, atau melalui formulir kontak di website ini. Saya merespons secara cepat dan profesional.",
  },
  {
    question: "Apakah Anda siap untuk posisi On-Site (WFO) atau relokasi?",
    answer:
      "Ya, saya siap dan terbuka penuh untuk posisi On-Site / WFO di seluruh wilayah Indonesia (siap relokasi), maupun sistem kerja Hybrid dan Remote.",
  },
  {
    question: "Teknologi dan spesialisasi apa yang menjadi fokus utama Anda?",
    answer:
      "Fokus utama saya adalah Frontend Engineering dengan React.js, TypeScript, Next.js, dan Angular. Saya berfokus mendalam pada Technical SEO, Rendering Strategies (SSR/SSG/ISR/CDN/OpenGraph), Reactive Programming (RxJS & Signals), serta sistem desain modular berbasis Tailwind CSS dan shadcn/ui.",
  },
];
