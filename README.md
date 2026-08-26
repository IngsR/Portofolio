# Portofolio Ikhwan Ramadhan

Portfolio personal Ikhwan Ramadhan sebagai Full-Stack Developer, dengan project, pengalaman, teknologi, pendidikan, sertifikasi, dan kanal komunikasi profesional.

Aplikasi menggunakan Astro sebagai shell SSR/SSG dan React sebagai interactive island. Navigasi, filter, tema, modal, case study Markdown, dan persistence browser tetap berjalan tanpa reload penuh.

## Technology Stack

- Astro
- React 19
- TypeScript
- Tailwind CSS 4
- Motion dan Lucide React
- React Markdown dan Remark GFM

## Architecture

```text
.
├── public/                # Foto, logo, CV, sertifikat, dan screenshot project
├── src/
│   ├── components/        # UI React dan modal interaktif
│   ├── data/              # Data portfolio dan case study
│   ├── layouts/           # Document shell dan metadata SEO
│   ├── pages/             # Route Astro SSG, SSR, dan ISR
│   ├── App.tsx            # Root layout dan state React
│   ├── index.css          # Style global dan Tailwind
│   └── types.ts           # Type definitions
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## Local Development

```bash
npm install
npm run dev
```

Development server berjalan pada `http://localhost:3000`.

## Available Scripts

```bash
npm run dev       # Menjalankan Astro development server
npm run lint      # Memeriksa tipe TypeScript
npm run build     # Membuat production build Astro
npm run preview   # Menjalankan preview production build
```

## Rendering Model

Astro menggunakan tiga mode rendering yang dipilih per route:

- `/`: SSG melalui `prerender = true`, sehingga HTML portfolio utama dibuat saat build.
- `/portfolio`: SSR on-demand melalui `prerender = false` dan cache ISR adapter Vercel selama 1 jam. Request pertama dirender server, lalu hasilnya digunakan kembali sampai kadaluarsa.

React tetap digunakan untuk interaksi client melalui `client:load`. Deploy SSR/ISR memerlukan Vercel adapter; halaman SSG tetap dapat dilayani sebagai static output.

## Production Deployment

Deploy ke Vercel dengan pengaturan berikut:

```text
Framework Preset: Astro
Install Command: npm install
Build Command: npm run build
Output Directory: dist
```

Data portfolio dikelola pada `src/data/portfolioData.ts`. Asset personal dan screenshot project tersedia di folder `public/`.

## License

Konten portfolio, data pribadi, gambar project, sertifikat, logo, dan CV merupakan aset pemilik portfolio. Penggunaan atau redistribusi aset memerlukan izin pemilik.
