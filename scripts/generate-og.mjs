import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

async function generateOpenGraph() {
  const width = 1200;
  const height = 630;

  // 1. Siapkan foto profil dari public/profile.png dengan aspect ratio terkunci (240x240) dan rounded squircle
  const profileInputPath = path.resolve('public/profile.png');
  const profileSize = 240;
  const cornerRadius = 28;

  // Mask SVG untuk rounded corner foto profil
  const roundedMask = Buffer.from(`
    <svg width="${profileSize}" height="${profileSize}">
      <rect x="0" y="0" width="${profileSize}" height="${profileSize}" rx="${cornerRadius}" ry="${cornerRadius}" fill="#ffffff" />
    </svg>
  `);

  const roundedProfile = await sharp(profileInputPath)
    .resize(profileSize, profileSize, { fit: 'cover' })
    .composite([{ input: roundedMask, blend: 'dest-in' }])
    .png()
    .toBuffer();

  // 2. Buat SVG background dan typography (warna background putih, teks hitam)
  const svgBackground = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ffffff" />
        <stop offset="60%" stop-color="#fcfdfd" />
        <stop offset="100%" stop-color="#f4f6f9" />
      </linearGradient>
      <linearGradient id="barGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#0f172a" />
        <stop offset="50%" stop-color="#334155" />
        <stop offset="100%" stop-color="#0f172a" />
      </linearGradient>
      <filter id="cardShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#0f172a" flood-opacity="0.08" />
        <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#0f172a" flood-opacity="0.04" />
      </filter>
    </defs>

    <!-- Background Utama -->
    <rect width="${width}" height="${height}" fill="url(#bgGrad)" />

    <!-- Aksen Bar Kiri -->
    <rect x="0" y="0" width="10" height="${height}" fill="url(#barGrad)" />

    <!-- Border Luar Halus -->
    <rect x="1" y="1" width="${width - 2}" height="${height - 2}" fill="none" stroke="#e2e8f0" stroke-width="2" />

    <!-- Ornamen Dot Pattern Kanan Bawah -->
    <g opacity="0.12" fill="#0f172a">
      <circle cx="1080" cy="500" r="4" />
      <circle cx="1110" cy="500" r="4" />
      <circle cx="1140" cy="500" r="4" />
      <circle cx="1080" cy="530" r="4" />
      <circle cx="1110" cy="530" r="4" />
      <circle cx="1140" cy="530" r="4" />
      <circle cx="1080" cy="560" r="4" />
      <circle cx="1110" cy="560" r="4" />
      <circle cx="1140" cy="560" r="4" />
    </g>

    <!-- Card Kiri: Wadah Foto Profil (Aspect Ratio Locked) -->
    <!-- Card Outer Shadow & Border -->
    <rect x="90" y="175" width="280" height="280" rx="36" fill="#ffffff" stroke="#e2e8f0" stroke-width="2" filter="url(#cardShadow)" />
    <!-- Inner subtle frame ring -->
    <rect x="108" y="193" width="244" height="244" rx="30" fill="#f8fafc" stroke="#f1f5f9" stroke-width="2" />

    <!-- Sisi Kanan: Teks & Informasi -->
    <!-- Badge -->
    <g transform="translate(420, 160)">
      <rect width="210" height="38" rx="19" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1.5" />
      <text x="105" y="24" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="14" font-weight="700" fill="#0f172a" letter-spacing="1.5" text-anchor="middle">
        PORTOFOLIO RESMI
      </text>
    </g>

    <!-- Nama Utama (Ikhwan Ramadhan) -->
    <text x="420" y="270" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="56" font-weight="900" fill="#0f172a" letter-spacing="-0.8">
      Ikhwan Ramadhan
    </text>

    <!-- Subtitle / Role (Frontend Engineer, SEO specialist) -->
    <text x="420" y="325" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="26" font-weight="600" fill="#475569" letter-spacing="-0.2">
      Frontend Engineer, SEO specialist
    </text>

    <!-- Divider Line -->
    <line x1="420" y1="375" x2="1110" y2="375" stroke="#e2e8f0" stroke-width="2" stroke-linecap="round" />

    <!-- Footer Info / Meta -->
    <g transform="translate(420, 422)">
      <!-- Website -->
      <text x="0" y="0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="20" font-weight="600" fill="#64748b">
        🌐 ikhwann.my.id
      </text>
      <!-- Tech Stack -->
      <text x="210" y="0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="20" font-weight="700" fill="#0f172a">
        • Next.js · Angular · React · TypeScript
      </text>
    </g>
  </svg>
  `;

  // 3. Gabungkan background SVG dengan foto profil di koordinat x: 110, y: 195
  const outputBuffer = await sharp(Buffer.from(svgBackground))
    .composite([
      {
        input: roundedProfile,
        top: 195,
        left: 110,
      },
    ])
    .png({ quality: 100 })
    .toBuffer();

  // Simpan ke public/og.png dan public/opengraph-image.png untuk mengunci tampilan
  const targetOgPng = path.resolve('public/og.png');
  const targetOpengraphPng = path.resolve('public/opengraph-image.png');
  fs.writeFileSync(targetOgPng, outputBuffer);
  fs.writeFileSync(targetOpengraphPng, outputBuffer);

  console.log(`✅ Berhasil mengunci tampilan OpenGraph!`);
  console.log(`📁 File tersimpan di:`);
  console.log(`   - ${targetOgPng}`);
  console.log(`   - ${targetOpengraphPng}`);
}

generateOpenGraph().catch((err) => {
  console.error('Error generating OpenGraph:', err);
  process.exit(1);
});
