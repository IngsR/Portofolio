import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

async function generateOpenGraph() {
  const width = 1200;
  const height = 630;

  // 1. Foto profil dari public/profile.png berukuran besar (360x360) dengan aspect ratio terkunci & rounded corner
  const profileInputPath = path.resolve("public/profile.png");
  const profileSize = 360;
  const cornerRadius = 32;

  // Mask SVG untuk rounded squircle foto profil
  const roundedMask = Buffer.from(`
    <svg width="${profileSize}" height="${profileSize}">
      <rect x="0" y="0" width="${profileSize}" height="${profileSize}" rx="${cornerRadius}" ry="${cornerRadius}" fill="#ffffff" />
    </svg>
  `);

  const roundedProfile = await sharp(profileInputPath)
    .resize(profileSize, profileSize, { fit: "cover" })
    .composite([{ input: roundedMask, blend: "dest-in" }])
    .png()
    .toBuffer();

  // 2. Background SVG dan Typography dengan padding ketat, tulisan & gambar jauh lebih besar dan jelas
  const svgBackground = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ffffff" />
        <stop offset="60%" stop-color="#fafbfd" />
        <stop offset="100%" stop-color="#f1f5f9" />
      </linearGradient>
      <filter id="cardShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#0f172a" flood-opacity="0.10" />
        <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#0f172a" flood-opacity="0.05" />
      </filter>
    </defs>

    <!-- Background Utama -->
    <rect width="${width}" height="${height}" fill="url(#bgGrad)" />

    <!-- Border Luar Halus -->
    <rect x="1" y="1" width="${width - 2}" height="${height - 2}" fill="none" stroke="#e2e8f0" stroke-width="2" />

    <!-- Ornamen Dot Pattern Kanan Bawah (Kompak & Elegan) -->
    <g opacity="0.14" fill="#0f172a">
      <circle cx="1100" cy="510" r="4.5" />
      <circle cx="1130" cy="510" r="4.5" />
      <circle cx="1160" cy="510" r="4.5" />
      <circle cx="1100" cy="540" r="4.5" />
      <circle cx="1130" cy="540" r="4.5" />
      <circle cx="1160" cy="540" r="4.5" />
      <circle cx="1100" cy="570" r="4.5" />
      <circle cx="1130" cy="570" r="4.5" />
      <circle cx="1160" cy="570" r="4.5" />
    </g>

    <!-- Card Kiri: Wadah Foto Profil Besar (400x400 px, Aspect Ratio Terkunci) -->
    <rect x="55" y="115" width="400" height="400" rx="42" fill="#ffffff" stroke="#e2e8f0" stroke-width="2.5" filter="url(#cardShadow)" />
    <!-- Inner Frame Ring -->
    <rect x="73" y="133" width="364" height="364" rx="34" fill="#f8fafc" stroke="#f1f5f9" stroke-width="2" />

    <!-- Sisi Kanan: Teks & Informasi Padat & Jelas -->
    <!-- Badge -->
    <g transform="translate(485, 115)">
      <rect width="210" height="42" rx="21" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1.5" />
      <text x="105" y="27" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="15" font-weight="800" fill="#0f172a" letter-spacing="1.5" text-anchor="middle">
        PORTOFOLIO RESMI
      </text>
    </g>

    <!-- Nama Utama (Ikhwan Ramadhan) - 68px Extra Bold -->
    <text x="485" y="240" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="68" font-weight="900" fill="#090a0f" letter-spacing="-1.2">
      Ikhwan Ramadhan
    </text>

    <!-- Subtitle / Role (Frontend Engineer, SEO specialist) - 32px -->
    <text x="485" y="305" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="32" font-weight="700" fill="#334155" letter-spacing="-0.3">
      Frontend Engineer, SEO specialist
    </text>

    <!-- Divider Line -->
    <line x1="485" y1="365" x2="1145" y2="365" stroke="#cbd5e1" stroke-width="2.5" stroke-linecap="round" />

    <!-- Footer Info / Meta - 24px -->
    <g transform="translate(485, 425)">
      <!-- Website -->
      <text x="0" y="0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="24" font-weight="600" fill="#64748b">
        🌐 ikhwann.my.id
      </text>
      <!-- Tech Stack -->
      <text x="240" y="0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="24" font-weight="800" fill="#0f172a">
        • Next.js · Angular · React · TypeScript
      </text>
    </g>
  </svg>
  `;

  // 3. Gabungkan background SVG dengan foto profil di koordinat x: 75, y: 135
  const outputBuffer = await sharp(Buffer.from(svgBackground))
    .composite([
      {
        input: roundedProfile,
        top: 135,
        left: 75,
      },
    ])
    .png({ quality: 100 })
    .toBuffer();

  // Simpan ke public/og.png dan public/opengraph-image.png untuk mengunci tampilan
  const targetOgPng = path.resolve("public/og.png");
  const targetOpengraphPng = path.resolve("public/opengraph-image.png");
  fs.writeFileSync(targetOgPng, outputBuffer);
  fs.writeFileSync(targetOpengraphPng, outputBuffer);

  console.log(
    `✅ Berhasil mengunci tampilan OpenGraph baru (lebih besar & minim ruang kosong)!`,
  );
  console.log(`📁 File tersimpan di:`);
  console.log(`   - ${targetOgPng}`);
  console.log(`   - ${targetOpengraphPng}`);
}

generateOpenGraph().catch((err) => {
  console.error("Error generating OpenGraph:", err);
  process.exit(1);
});
