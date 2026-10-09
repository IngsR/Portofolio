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
│   ├── components/        # UI React dan modal interaktif (kebab-case)
│   ├── data/              # Data portfolio dan case study
│   ├── layouts/           # Document shell dan metadata SEO (site.astro)
│   ├── pages/             # Route Astro SSG, SSR, dan ISR
│   ├── styles/            # Style global (global.css)
│   ├── utils/             # Helper format, CV, dan validation
│   ├── app.tsx            # Root layout dan client state React
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

Data portfolio dikelola pada `src/data/portfolio.json`. Asset personal dan screenshot project tersedia di folder `public/`.

## Internationalization (i18n)

Astro menjadi sumber locale dan routing: URL Indonesia tetap tanpa prefix (`/`),
sedangkan halaman Inggris memakai `/en/...`. Konfigurasi `i18n` sudah tersedia
di `astro.config.mjs`; setiap route berbahasa Inggris dibuat di `src/pages/en/`.
Astro tidak otomatis menggandakan halaman, jadi route padanan perlu ditambahkan
ketika route baru dibuat.

Tidak ada package i18n tambahan yang diperlukan untuk dua bahasa statis.
`@astrojs/i18n` bukan integration resmi yang dibutuhkan di sini, dan
`i18next/react-i18next` baru layak ditambahkan jika diperlukan pluralization,
interpolation kompleks, lazy-load katalog, atau locale yang dikelola runtime.
Untuk saat ini, React context pada `src/i18n.tsx` hanya meneruskan locale Astro
ke interactive islands; jangan menyimpan locale kedua kalinya di Zustand.

Kamus dipecah per fitur dalam `src/data/locales/{id,en}/`. Tambahkan key dengan
bentuk dan nama yang sama di kedua bahasa, lalu daftarkan import modulnya di
`src/data/locales/index.ts`. Komponen mengambil locale dari `useTranslations()`
dan teks melalui dictionary fitur terkait. Contoh implementasi tersedia pada
`quick-actions.tsx` dan `navbar.tsx`.

Untuk data portofolio, gunakan `translations` per locale dan pertahankan nilai
lama sebagai fallback:

```json
{
  "id": "proj-1",
  "title": "Website SMP Negeri 24 Padang",
  "shortDescription": "Deskripsi Bahasa Indonesia",
  "translations": {
    "en": {
      "title": "SMP Negeri 24 Padang School Website",
      "shortDescription": "English project description"
    }
  }
}
```

Untuk sertifikat, gunakan skema sepadan:

```json
{
  "id": "cert-1",
  "title": "Artificial Intelligence Fundamentals",
  "issuer": "IBM SkillsBuild",
  "translations": {
    "en": {
      "title": "Artificial Intelligence Fundamentals",
      "issuer": "IBM SkillsBuild",
      "description": "An introduction to core artificial intelligence concepts."
    }
  }
}
```

Field sertifikat yang dapat diterjemahkan meliputi `title`, `issuer`, `period`,
`category`, dan `description`. Gunakan `getLocalizedProject()` atau
`getLocalizedCertification()` dari `src/utils/format.ts`; field yang belum
diterjemahkan otomatis mempertahankan nilai dasar. Tambahkan seluruh copy UI
lain ke kamus per fitur agar cakupan halaman Inggris bertambah tanpa mengubah
skema data atau state navigasi.

## License

Konten portfolio, data pribadi, gambar project, sertifikat, logo, dan CV merupakan aset pemilik portfolio. Penggunaan atau redistribusi aset memerlukan izin pemilik.
