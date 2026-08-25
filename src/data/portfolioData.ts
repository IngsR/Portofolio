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
  title: "Full-Stack Developer",
  tagline:
    'Lulusan S1 Teknik Informatika UPI "YPTK" Padang dengan fokus mendalam pada Full-Stack Web Development (Next.js, React, TypeScript, PostgreSQL), REST API, Docker, Linux Debian, DSA, dan Time Series Forecasting.',
  shortBio:
    "Saya Ikhwan Ramadhan, lahir di Padang pada 18 November 2003 dan merupakan lulusan S1 Teknik Informatika Universitas Putra Indonesia “YPTK” Padang.",
  fullBio: [
    "Saya Ikhwan Ramadhan, lulusan S1 Teknik Informatika Universitas Putra Indonesia “YPTK” Padang. Saya memfokuskan perjalanan karier saya di bidang Full-Stack Web Development dengan penguasaan mendalam pada ekosistem Next.js, React, TypeScript, Node.js/NestJS, dan basis data PostgreSQL.",
    "Sejak mengenal dunia komputer dan rekayasa perangkat lunak, rasa ingin tahu saya selalu mendorong untuk membedah bagaimana sebuah sistem bekerja dari lapisan terdalam mulai dari struktur data dan algoritma (DSA), komunikasi REST API yang efisien, perancangan skema relasional SQL, hingga deployment berbasis Docker di lingkungan server Linux (Debian).",
    "Kuliah memberikan fondasi akademis yang kuat, namun sebagian besar keahlian praktis saya kembangkan secara konsisten melalui eksplorasi mandiri, pembangunan proyek nyata berskala monorepo, e-commerce, sistem informasi sekolah, serta riset pemodelan data Time Series Forecasting menggunakan Python.",
    "Saya sangat menikmati proses memecahkan masalah kompleks, mengoptimalkan query basis data, menyusun arsitektur kode yang bersih dan terstruktur (clean code & type-safety), serta siap berkontribusi penuh sebagai Full-Stack Developer di lingkungan kerja yang dinamis.",
  ],
  location: "Indonesia",
  workPreference:
    "On-Site / WFO di Seluruh Indonesia (Siap Relokasi) & Hybrid / Remote",
  email: "ikhwn.rdn@gmail.com",
  phone: "+6282386473410",
  whatsappUrl:
    "https://wa.me/6282386473410?text=Halo%20Ikhwan%2C%20saya%20melihat%20portofolio%20Anda%20dan%20tertarik%20untuk%20berdiskusi%20terkait%20peluang%20kerja%20Full-Stack%20Developer%20%2F%20proyek.",
  avatarUrl: "/profile.jpg",
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
      url: "https://wa.me/6282386473410?text=Halo%20Ikhwan%2C%20saya%20melihat%20portofolio%20Anda%20dan%20tertarik%20untuk%20berdiskusi%20terkait%20peluang%20kerja%20Full-Stack%20Developer%20%2F%20proyek.",
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
      "Sistem informasi sekolah dan portal profil terpadu untuk publikasi berita, pengumuman, agenda kegiatan, dan layanan akademik dengan panel admin terintegrasi.",
    category: "Full Stack",
    tags: [
      "Next.js",
      "TypeScript",
      "Drizzle ORM",
      "PostgreSQL",
      "Auth.js",
      "Tailwind CSS",
      "shadcn/ui",
    ],
    image: "/projects/smpn24.png",
    featured: true,
    publishedDate: "2025-12-01",
    period: "2025 (Proyek Produksi)",
    role: "Team Lead & Full-Stack Developer",
    demoUrl: "https://smpn24padang.sch.id",
    githubUrl: "https://github.com/Informatics-2025/Website-SMPN24padang",
    metrics: [
      { label: "Role", value: "Team Lead & Fullstack" },
      { label: "Database", value: "PostgreSQL + Drizzle" },
      { label: "Authentication", value: "Auth.js (NextAuth)" },
    ],
    markdownContent: `---
title: "Website SMP Negeri 24 Padang"
description: "Full-stack school website for publishing school information, news, announcements, activities, and academic services with an integrated admin system."
date: "2025-12-01"
category: "Full Stack"
tags:
  - Next.js
  - TypeScript
  - Drizzle ORM
  - PostgreSQL
  - Auth.js
  - Tailwind CSS
  - shadcn/ui
github: "https://github.com/Informatics-2025/Website-SMPN24padang"
demo: "https://smpn24padang.sch.id"
featured: true
---

# Website SMP Negeri 24 Padang

## 📌 Ringkasan Proyek
Website profil dan sistem informasi sekolah resmi untuk **SMP Negeri 24 Padang**. Proyek ini dirancang sebagai platform terpadu untuk publikasi berita, pengumuman akademik, galeri kegiatan, serta portal administrasi terintegrasi bagi guru dan staf.

> **Catatan Tim & Peran**: Proyek kolaborasi ini dikembangkan bersama tim dengan peran **Team Lead & Fullstack Developer**, bertanggung jawab atas arsitektur basis data, integrasi API, sistem otentikasi admin, dan standarisasi antarmuka.

---

## 🛠️ Tech Stack & Arsitektur
- **Frontend**: Next.js App Router, React, TypeScript, Tailwind CSS, shadcn/ui
- **Backend & API**: Next.js Server Actions & Route Handlers
- **Database & ORM**: PostgreSQL, Drizzle ORM
- **Auth & Keamanan**: Auth.js (NextAuth), RBAC (Role-Based Access Control)
- **Deployment**: Custom Domain VPS & CDN

---

## ✨ Fitur Utama
1. **Portal Publik & Informasi Sekolah**: Profil institusi, visi misi, data pendidik & tenaga kependidikan, serta agenda kegiatan.
2. **Sistem Berita & Pengumuman**: Manajemen artikel dan pengumuman dinamis dengan rich text editor dan pengkategorian.
3. **Layanan Akademik & Unduhan**: Akses berkas formulir, jadwal pembelajaran, dan pengumuman kelulusan.
4. **Admin Dashboard Terpadu**: Panel kontrol untuk kurasi konten, manajemen pengguna, dan unggah media.`,
  },
  {
    id: "proj-2",
    slug: "ing-store-automotive-ecommerce",
    title: "Ing Store — Automotive E-Commerce",
    shortDescription:
      "Platform e-commerce otomotif full-stack dengan katalog interaktif, spesifikasi detail kendaraan, perhitungan estimasi cicilan, serta panel manajemen admin.",
    category: "Web Development",
    tags: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Tailwind CSS",
      "E-Commerce",
      "CMS",
    ],
    image: "/projects/ingstore.png",
    featured: true,
    publishedDate: "2025-07-23",
    period: "2025",
    role: "Full-Stack Developer",
    demoUrl: "https://ing-store.vercel.app",
    githubUrl: "https://github.com/IngsR/web_store",
    metrics: [
      { label: "Architecture", value: "Full-Stack Next.js" },
      { label: "ORM", value: "Prisma" },
      { label: "Hosting", value: "Vercel + PostgreSQL" },
    ],
    markdownContent: `---
title: "Ing Store — Automotive E-Commerce"
description: "Full-stack automotive e-commerce platform with a customer storefront and admin dashboard for managing vehicles, pricing, promotions, and website content."
date: "2025-07-23"
category: "Web Development"
tags:
  - Next.js
  - TypeScript
  - Prisma
  - PostgreSQL
  - Tailwind CSS
  - E-Commerce
  - CMS
github: "https://github.com/IngsR/web_store"
demo: "https://ing-store.vercel.app"
featured: true
---

# Ing Store — Automotive E-Commerce

## 🚗 Latar Belakang & Deskripsi
**Ing Store** adalah platform e-commerce otomotif full-stack modern yang menghubungkan calon pembeli kendaraan dengan katalog kendaraan lengkap, spesifikasi teknis mendalam, perbandingan harga, dan promo terkini.

---

## ⚙️ Fitur Kunci
- **Customer Storefront**: Jelajahi katalog unit kendaraan, filter berdasarkan merek/tipe/rentang harga, dan pencarian cepat.
- **Vehicle Detail Specs**: Tampilan visual detail kendaraan, galeri foto, efisiensi bahan bakar, transmisi, dan opsi pembiayaan.
- **Admin Management Dashboard**: Panel khusus administrator untuk menambah/mengedit listing kendaraan, mengatur diskon promosi, dan mengelola konten banner.
- **Database Schema**: Relasi terstruktur antara entitas kendaraan, kategori merek, spesifikasi, dan transaksi.`,
  },
  {
    id: "proj-3",
    slug: "tropical-cyclone-track-prediction",
    title: "Tropical Cyclone Track Prediction (Time Series Forecasting)",
    shortDescription:
      "Aplikasi riset berbasis web untuk prediksi dan visualisasi lintasan pergerakan siklon tropis menggunakan model Time Series Forecasting LSTM dan dataset historis IBTrACS.",
    category: "Machine Learning",
    tags: [
      "Python",
      "Time Series Forecasting",
      "LSTM",
      "TensorFlow",
      "Keras",
      "Streamlit",
      "Pandas",
      "NumPy",
      "Folium",
      "Docker",
    ],
    image: "/projects/siklon.png",
    featured: true,
    publishedDate: "2026-08-10",
    period: "2026 (Riset Skripsi S1)",
    role: "ML & Research Engineer",
    demoUrl: "https://siklon.streamlit.app",
    githubUrl: "https://github.com/IngsR/PrediksiSIklon-LSTM",
    metrics: [
      { label: "Forecasting Model", value: "LSTM Neural Network" },
      { label: "Dataset", value: "IBTrACS Cyclone Data" },
      { label: "Live Demo", value: "siklon.streamlit.app" },
    ],
    markdownContent: `---
title: "Tropical Cyclone Track Prediction"
description: "LSTM-based web application for predicting and visualizing tropical cyclone tracks using historical IBTrACS data across North Indian Ocean, South Indian Ocean, and combined scenarios."
date: "2026-08-10"
category: "Machine Learning"
tags:
  - Python
  - Time Series Forecasting
  - LSTM
  - TensorFlow
  - Keras
  - Streamlit
  - Pandas
  - NumPy
  - Scikit-learn
  - Folium
  - Docker
github: "https://github.com/IngsR/PrediksiSIklon-LSTM"
demo: "https://siklon.streamlit.app"
featured: true
---

# Tropical Cyclone Track Prediction (Time Series Forecasting)

## 🌪️ Latar Belakang & Domain Masalah
Prediksi pergerakan jalur siklon tropis merupakan tantangan krusial dalam mitigasi bencana maritim dan meteorologi. Aplikasi ini memanfaatkan arsitektur jaringan saraf berulang **Long Short-Term Memory (LSTM)** untuk mempelajari pola spasial dan temporal dari data historis **IBTrACS** (International Best Track Archive for Climate Stewardship).

---

## 🔬 Metodologi & Fitur Implementasi
1. **Data Preprocessing & Multi-Region Skenario**:
   - North Indian Ocean (NIO)
   - South Indian Ocean (SIO)
   - Skenario Kombinasi Data Gabungan
2. **Model Training & Deep Learning**:
   - Pembangunan model sekuensial LSTM menggunakan TensorFlow & Keras.
   - Evaluasi metrik kesalahan jarak lintasan (RMSE, MAE).
3. **Inference Pipeline & Visualisasi Interaktif**:
   - Pemetaan lintasan siklon secara interaktif menggunakan Folium Maps.
   - Perbandingan lintasan riil (ground truth) vs prediksi model.
4. **Kontainerisasi**: Disiapkan dengan Dockerfile untuk deployment mandiri dan reprodusibilitas eksperimen.`,
  },
  {
    id: "proj-4",
    slug: "fullstack-crm-erp-monorepo",
    title: "Fullstack CRM/ERP Monorepo",
    shortDescription:
      "Arsitektur monorepo enterprise berskala besar menggabungkan frontend Next.js 15 dengan backend modular NestJS, TypeORM, PostgreSQL, dan Turborepo.",
    category: "Software Engineering",
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "NestJS",
      "PostgreSQL",
      "TypeORM",
      "Turborepo",
      "REST API",
      "JWT",
      "Swagger",
    ],
    image: "/projects/monorepo.jpg",
    featured: true,
    publishedDate: "2025-11-30",
    period: "2025",
    role: "Full-Stack Software Engineer",
    demoUrl: "",
    githubUrl: "https://github.com/IngsR/Monorepo-CRM",
    metrics: [
      { label: "Monorepo", value: "Turborepo" },
      { label: "Backend", value: "NestJS + TypeORM" },
      { label: "Frontend", value: "Next.js 15" },
    ],
    markdownContent: `---
title: "Fullstack CRM/ERP Monorepo"
description: "Full-stack CRM/ERP application built with a monorepo architecture, combining a Next.js frontend with a modular NestJS backend and PostgreSQL."
date: "2025-11-30"
category: "Software Engineering"
tags:
  - Next.js
  - React
  - TypeScript
  - NestJS
  - PostgreSQL
  - TypeORM
  - Turborepo
  - REST API
  - JWT
  - Swagger
github: "https://github.com/IngsR/Monorepo-CRM"
demo: ""
featured: true
---

# Fullstack CRM/ERP Monorepo

## 🏢 Arsitektur Sistem Enterprise
Aplikasi manajemen operasional bisnis (CRM & ERP) berskala besar yang dibangun dengan pendekatan **Monorepo (Turborepo)** untuk memaksimalkan *code sharing*, pemeliharaan tipe data terpadu, dan isolasi modul yang bersih.

---

## 🛠️ Stack & Komponen Arsitektur
- **Frontend App**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend API Service**: NestJS (Modular Architecture, Dependency Injection), Passport.js, JWT Authentication
- **Database & Layer**: PostgreSQL, TypeORM
- **Monorepo Build Tooling**: Turborepo & pnpm workspaces
- **API Documentation**: Swagger / OpenAPI Auto-Generated Specs`,
  },
  {
    id: "proj-5",
    slug: "inventory-management-system",
    title: "Inventory Management System",
    shortDescription:
      "Aplikasi manajemen logistik dan inventaris stok gudang dengan pencatatan barang masuk, barang keluar, pelacakan barang rusak, otentikasi JWT, dan filter data komprehensif.",
    category: "Web Development",
    tags: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "JWT",
      "REST API",
      "CRUD",
      "Docker",
    ],
    image: "/projects/inventory.png",
    featured: false,
    publishedDate: "2025-07-15",
    period: "2025",
    role: "Full-Stack Developer",
    demoUrl: "https://kelola-barang.vercel.app",
    githubUrl: "https://github.com/IngsR/manajemen-iventory",
    metrics: [
      { label: "Roles", value: "Admin & Karyawan" },
      { label: "Security", value: "JWT Authentication" },
      { label: "Database", value: "PostgreSQL" },
    ],
    markdownContent: `---
title: "Inventory Management System"
description: "Full-stack inventory management application for tracking stock, damaged items, and inventory records with authentication, search, filtering, and role-based access."
date: "2025-07-15"
category: "Web Development"
tags:
  - Next.js
  - TypeScript
  - PostgreSQL
  - JWT
  - REST API
  - CRUD
  - Docker
github: "https://github.com/IngsR/manajemen-iventory"
demo: "https://kelola-barang.vercel.app"
featured: false
---

# Inventory Management System

## 📦 Deskripsi Solusi
Aplikasi manajemen persediaan barang dan inventaris gudang yang efisien. Membantu pencatatan stok masuk, stok keluar, barang rusak/retur, serta riwayat mutasi barang secara real-time.

---

## ⚡ Fitur Utama
- **Role-Based Access Control**: Pemisahan hak akses antara Administrator dan Karyawan operasional.
- **Pelacakan Barang Rusak & Mutasi**: Pencatatan terperinci kondisi fisik barang dan riwayat log perubahan stok.
- **Pencarian & Multi-Filter**: Kemudahan pencarian item berdasarkan SKU, nama barang, dan kategori.`,
  },
  {
    id: "proj-6",
    slug: "dockrank-tf-idf-document-search",
    title: "DockRank — TF-IDF Document Search",
    shortDescription:
      "Sistem temu balik informasi (Information Retrieval) berbasis web yang menghitung skor relevansi dokumen teks menggunakan algoritma TF-IDF secara akurat dan transparan.",
    category: "AI & Information Retrieval",
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "TF-IDF",
      "Information Retrieval",
      "Tailwind CSS",
      "Node.js",
    ],
    image: "/projects/dockrank.png",
    featured: false,
    publishedDate: "2025-07-07",
    period: "2025",
    role: "Software Engineer",
    demoUrl: "https://tfidf.vercel.app",
    githubUrl: "https://github.com/IngsR/DockRank_TF-IDF",
    metrics: [
      { label: "Algorithm", value: "TF-IDF Scoring" },
      { label: "Function", value: "Document Ranking" },
      { label: "Frontend", value: "Next.js & React" },
    ],
    markdownContent: `---
title: "DockRank — TF-IDF Document Search"
description: "Web-based document retrieval system that ranks search results using TF-IDF relevance scoring."
date: "2025-07-07"
category: "AI & Information Retrieval"
tags:
  - Next.js
  - React
  - TypeScript
  - TF-IDF
  - Information Retrieval
  - Tailwind CSS
  - Node.js
github: "https://github.com/IngsR/DockRank_TF-IDF"
demo: "https://tfidf.vercel.app"
featured: false
---

# DockRank — TF-IDF Document Search Engine

## 📄 Ringkasan Proyek
**DockRank** adalah implementasi sistem temu balik informasi (*Information Retrieval System*) berbasis web yang memanfaatkan algoritma **Term Frequency - Inverse Document Frequency (TF-IDF)** untuk memeringkat dokumen berdasarkan relevansi kata kunci pencarian.

---

## 🔍 Kemampuan Sistem
- **Upload & Parsing Dokumen**: Mendukung pemuatan koleksi dokumen teks untuk diindeks secara dinamis.
- **Text Preprocessing Pipeline**: Case folding, tokenizing, stopword removal, dan stemming.
- **Relevance Scoring & Ranking**: Kalkulasi bobot bobot term pada setiap dokumen dan pengurutan hasil pencarian berdasarkan skor tertinggi.`,
  },
  {
    id: "proj-7",
    slug: "admin-blog-platform",
    title: "Admin Blog Platform",
    shortDescription:
      "Platform manajemen konten blog (CMS) terstruktur berbasis Next.js App Router, TypeScript, Drizzle ORM, dan PostgreSQL dengan dashboard penulisan markdown.",
    category: "Web Development",
    tags: [
      "Next.js",
      "TypeScript",
      "React",
      "Drizzle ORM",
      "PostgreSQL",
      "CMS",
    ],
    image: "/projects/adminblog.png",
    featured: false,
    publishedDate: "2026-04-13",
    period: "2026",
    role: "Full-Stack Developer",
    demoUrl: "https://blogsing.vercel.app",
    githubUrl: "https://github.com/IngsR/AdminBlog_nextjs",
    metrics: [
      { label: "Framework", value: "Next.js App Router" },
      { label: "Database ORM", value: "Drizzle ORM" },
      { label: "Live Demo", value: "Vercel Hosted" },
    ],
    markdownContent: `---
title: "Admin Blog Platform"
description: "Next.js-based content management platform for managing blog content through an administrative interface backed by a relational database."
date: "2026-04-13"
category: "Web Development"
tags:
  - Next.js
  - TypeScript
  - React
  - Drizzle ORM
  - PostgreSQL
  - CMS
github: "https://github.com/IngsR/AdminBlog_nextjs"
demo: "https://blogsing.vercel.app"
featured: false
---

# Admin Blog Platform

## ✍️ Konsep & Fitur
Platform Content Management System (CMS) modern berbasis Next.js untuk penulisan, pengelolaan, publikasi, dan kategorisasi artikel blog secara fleksibel yang terhubung ke database relasional PostgreSQL melalui Drizzle ORM.`,
  },
  {
    id: "proj-8",
    slug: "react-native-ecommerce",
    title: "React Native E-Commerce Mobile App",
    shortDescription:
      "Aplikasi belanja daring cross-platform Android & iOS dengan navigasi katalog produk, detail barang, sistem ulasan, dan integrasi REST API menggunakan Axios.",
    category: "Mobile Development",
    tags: ["React Native", "JavaScript", "Expo", "Axios", "REST API", "Mobile"],
    image: "/projects/reactnative.jpg",
    featured: false,
    publishedDate: "2025-06-06",
    period: "2025",
    role: "Mobile Frontend Developer",
    demoUrl: "",
    githubUrl: "https://github.com/IngsR/ReactExpo-Mobile-Ecomerce",
    metrics: [
      { label: "Platform", value: "Android & iOS" },
      { label: "Framework", value: "Expo / React Native" },
      { label: "API Client", value: "Axios REST" },
    ],
    markdownContent: `---
title: "React Native E-Commerce"
description: "Cross-platform mobile shopping application with product browsing, product details, ratings, navigation, and API integration."
date: "2025-06-06"
category: "Mobile Development"
tags:
  - React Native
  - JavaScript
  - Expo
  - Axios
  - REST API
  - Mobile
github: "https://github.com/IngsR/ReactExpo-Mobile-Ecomerce"
demo: ""
featured: false
---

# React Native E-Commerce Mobile App

## 📱 Ringkasan Aplikasi
Aplikasi e-commerce cross-platform mobile yang dibangun menggunakan **React Native** dan ekosistem **Expo**.

---

## 🚀 Fitur Utama
- **Product Catalog & Browsing**: Tampilan katalog produk dengan navigasi kategori dan kartu produk interaktif.
- **Product Details & Ratings**: Informasi spesifikasi barang, ulasan pembeli, dan harga.
- **REST API Integration**: Komunikasi data asinkron menggunakan Axios.`,
  },
];

export const skillCategories: SkillCategory[] = [
  {
    title: "FULL-STACK WEB",
    iconName: "Layout",
    description: "Fondasi utama untuk membangun aplikasi web full-stack.",
    coreStack: ["Next.js", "React", "TypeScript", "Node.js"],
    alsoUsed: ["NestJS", "Express", "Axios", "Zod"],
  },
  {
    title: "DATABASE & BACKEND",
    iconName: "Server",
    description: "Data layer dan kontrak API untuk aplikasi yang terhubung.",
    coreStack: ["PostgreSQL", "SQL", "Drizzle ORM"],
    alsoUsed: ["Prisma", "TypeORM", "REST API", "OpenAPI / Swagger"],
  },
  {
    title: "INFRASTRUCTURE & DEPLOYMENT",
    iconName: "Terminal",
    description: "Tooling untuk version control, server, dan deployment.",
    coreStack: ["Git", "GitHub", "Docker", "Linux"],
    alsoUsedLabel: "DEPLOYMENT",
    alsoUsed: ["Vercel", "Cloudflare", "Supabase"],
  },
  {
    title: "DATA & RESEARCH",
    iconName: "Cpu",
    description: "Eksplorasi data dan riset pemodelan berbasis Python.",
    coreStack: ["Python", "Pandas", "NumPy", "LSTM"],
    alsoUsed: ["Scikit-learn", "TensorFlow", "Keras", "Streamlit", "Folium"],
  },
];

export const experienceData: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Team Lead & Fullstack Developer",
    company: "Proyek Sistem Informasi SMP Negeri 24 Padang",
    location: "Padang, Indonesia",
    period: "2025",
    type: "Contract",
    description:
      "Memimpin perancangan dan implementasi website resmi dan sistem informasi akademik terpadu sekolah.",
    achievements: [
      "Memimpin tim pengembangan dalam merancang arsitektur fullstack dengan Next.js, Drizzle ORM, dan PostgreSQL.",
      "Mengimplementasikan sistem otentikasi Auth.js dan Role-Based Access Control untuk staf dan administrator.",
      "Menyediakan platform berita, pengumuman sekolah, dan layanan akademik yang responsif.",
    ],
    techStack: [
      "Next.js",
      "TypeScript",
      "Drizzle ORM",
      "PostgreSQL",
      "Auth.js",
      "Tailwind CSS",
      "shadcn/ui",
    ],
  },
  {
    id: "exp-2",
    role: "Full-Stack Software Engineer (Independent & Open Source)",
    company: "IngsR Portfolio & Engineering Repositories",
    location: "Indonesia / Remote",
    period: "2023 - Sekarang",
    type: "Freelance",
    description:
      "Mengembangkan berbagai aplikasi web berskala penuh, sistem monorepo enterprise, e-commerce otomotif, sistem inventaris gudang, serta sistem Time Series Forecasting berbasis riset.",
    achievements: [
      "Membangun Fullstack CRM/ERP Monorepo dengan Turborepo, Next.js 15, NestJS, dan TypeORM.",
      "Mengembangkan Ing Store (E-Commerce Otomotif) dengan Prisma dan PostgreSQL.",
      "Melakukan riset dan implementasi model LSTM Time Series Forecasting untuk prediksi lintasan siklon tropis menggunakan dataset historis IBTrACS.",
    ],
    techStack: [
      "Next.js",
      "NestJS",
      "TypeScript",
      "PostgreSQL",
      "Docker",
      "Linux (Debian)",
      "Python",
    ],
  },
];

export const educationData: EducationItem[] = [
  {
    id: "edu-1",
    degree: "Sarjana Komputer (S1) - Teknik Informatika",
    institution: "Universitas Putra Indonesia “YPTK” Padang",
    period: "Lulusan S1",
    details:
      "Mendalami Rekayasa Perangkat Lunak, Struktur Data & Algoritma (DSA), Perancangan Basis Data Relasional, Arsitektur Sistem Web Terdistribusi, Jaringan Saraf Tiruan (Deep Learning/LSTM Time Series), dan Sistem Temu Balik Informasi.",
  },
  {
    id: "edu-2",
    degree: "Sekolah Menengah Atas (SMA) - Jurusan IPA",
    institution: "SMA 14 Padang",
    period: "Lulusan SMA",
    details:
      "Menyelesaikan pendidikan dengan peminatan Ilmu Pengetahuan Alam (IPA). Nilai rata-rata ijazah 88,31, dengan penguatan pada Matematika, Biologi, Fisika, Kimia, serta dasar analisis dan penalaran ilmiah.",
  },
];

export const certificationsData: CertificationItem[] = [
  {
    id: "cert-1",
    title: "Artificial Intelligence Fundamentals",
    issuer: "Huawei ICT Academy",
    issueDate: "2024",
    period: "Terverifikasi Resmi",
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
    issueDate: "2024",
    period: "Terverifikasi Resmi",
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
    issueDate: "2024",
    period: "Terverifikasi Resmi",
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
    issueDate: "2024",
    period: "Terverifikasi Resmi",
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
    issueDate: "2024",
    period: "Terverifikasi Resmi",
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
    id: "architecture-problem-solving",
    category: "01 — Architecture & Problem Solving",
    title: "Requirement-Driven & Modular Architecture",
    narrative:
      "Saya biasanya mulai dengan pertanyaan sebelum mulai menulis kode: sebenarnya apa yang ingin diselesaikan, apa yang mungkin berubah, dan bagaimana project ini akan tetap nyaman digunakan beberapa waktu ke depan. Karena itu saya lebih suka memecah bagian yang mulai terlalu besar menjadi modul dengan tanggung jawab yang jelas, sehingga ketika sesuatu berubah saya tidak harus membongkar semuanya.",
    technologies: ["Architecture", "DSA", "Problem Solving", "Optimization"],
    iconName: "Layers",
  },
  {
    id: "fullstack-web",
    category: "02 — Full-Stack Web",
    title: "Next.js, React & TypeScript",
    narrative:
      "Saya menikmati bagian ketika sebuah interface tidak lagi berdiri sendiri. Input dari pengguna, logic, API, sampai database mulai membentuk satu alur yang saling terhubung. Dari situ saya suka mencari cara agar setiap bagian tetap sederhana untuk dipahami, tetapi tidak menyulitkan ketika fitur baru mulai ditambahkan.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "App Router",
      "RSC",
      "Server Actions",
    ],
    iconName: "Layout",
  },
  {
    id: "backend-api",
    category: "03 — Backend & API",
    title: "REST API & Node.js",
    narrative:
      "Backend mulai menarik bagi saya ketika project tidak lagi cukup dengan beberapa endpoint sederhana. Ketika kebutuhan bertambah, saya mulai memikirkan bagaimana data masuk, divalidasi, diproses, dan dikembalikan tanpa membuat bagian lain ikut bergantung terlalu jauh. Dari sana saya belajar bahwa API yang rapi sangat terasa manfaatnya ketika project mulai berkembang.",
    technologies: ["Node.js", "NestJS", "Express", "REST API", "Axios", "Zod"],
    iconName: "Server",
  },
  {
    id: "database-layer",
    category: "04 — Database & Data Layer",
    title: "PostgreSQL, SQL & ORM",
    narrative:
      "Saya dulu melihat database terutama sebagai tempat menyimpan data. Setelah berhadapan dengan data yang saling berhubungan, saya mulai melihat bahwa keputusan kecil di struktur tabel dan relasi bisa terasa jauh di bagian lain aplikasi. Karena itu saya lebih suka memahami bagaimana data akan digunakan sebelum menentukan bagaimana data tersebut disimpan.",
    technologies: ["PostgreSQL", "SQL", "Drizzle ORM", "Prisma", "TypeORM"],
    iconName: "Database",
  },
  {
    id: "devops-cloud",
    category: "05 — DevOps, Deployment & Cloud",
    title: "Docker, Linux & Cloud Infrastructure",
    narrative:
      "Saya mulai melakukan deployment karena tidak ingin project hanya bergantung pada laptop sendiri. Saya ingin bisa membuka project dari HP ketika sedang jauh atau tidak ingin duduk lama di depan komputer, sekaligus punya salinan yang tetap bisa diakses ketika laptop bermasalah. Dari kebutuhan sederhana itu, saya mulai masuk ke Docker, Linux, deployment, domain, DNS, hingga layanan seperti Vercel dan Cloudflare.",
    technologies: [
      "Docker",
      "Linux",
      "Git",
      "GitHub",
      "Vercel",
      "Cloudflare",
      "Supabase",
    ],
    iconName: "Terminal",
  },
  {
    id: "data-ml",
    category: "06 — Data & Research",
    title: "Python & Time Series Forecasting",
    narrative:
      "Yang membuat saya tertarik pada data bukan hanya membuat model lalu melihat angkanya. Saya lebih menikmati ketika harus mencari tahu apakah asumsi awal memang benar. Dalam skripsi, saya membandingkan karakteristik basin NI dan SI secara statistik, merancang beberapa skenario dan ukuran timestep, lalu menguji satu per satu untuk melihat bagaimana perubahan data dan desain eksperimen memengaruhi model. Dari proses itu saya menggunakan Python dan LSTM untuk mempelajari prediksi lintasan siklon tropis.",
    technologies: [
      "Python",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "LSTM",
      "TensorFlow",
      "Folium",
    ],
    iconName: "Cpu",
  },
];

export const contactFaq = [
  {
    question:
      "Bagaimana cara menghubungi Ikhwan Ramadhan untuk penawaran kerja Full-Stack Developer?",
    answer:
      "Anda dapat menghubungi saya langsung melalui formulir kontak, WhatsApp di +62 823-8647-3410, atau via email ke ikhwn.rdn@gmail.com. Saya merespons secara cepat dan profesional.",
  },
  {
    question: "Apakah Anda siap untuk posisi On-Site (WFO) atau relokasi?",
    answer:
      "Ya, saya siap dan terbuka penuh untuk posisi On-Site / WFO di seluruh wilayah Indonesia (siap relokasi), maupun sistem kerja Hybrid dan Remote.",
  },
  {
    question: "Teknologi dan keahlian utama apa yang menjadi fokus Anda?",
    answer:
      "Fokus utama saya adalah Full-Stack Development menggunakan Next.js (App Router, Server Actions), React, TypeScript, basis data PostgreSQL, Drizzle/Prisma ORM, REST API (NestJS/Express), Docker, Linux Debian, serta Python untuk Time Series Forecasting & analisis data.",
  },
];
