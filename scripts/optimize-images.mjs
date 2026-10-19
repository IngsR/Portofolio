import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

// One-off script: konversi PNG/JPG besar ke WebP.
// thumb = 640w untuk kartu, full = 1280w untuk modal/detail.
const jobs = [
  { in: "public/projects/smpn24.png", out: "public/projects/smpn24" },
  { in: "public/projects/siklon.png", out: "public/projects/siklon" },
  { in: "public/projects/ingstore.png", out: "public/projects/ingstore" },
  { in: "public/projects/property.png", out: "public/projects/property" },
  { in: "public/projects/inventory.png", out: "public/projects/inventory" },
  { in: "public/projects/dockrank.png", out: "public/projects/dockrank" },
  { in: "public/projects/adminblog.png", out: "public/projects/adminblog" },
  { in: "public/Ikhwan.jpg", out: "public/Ikhwan" },
  { in: "public/logo.jpg", out: "public/logo" },
  // Sertifikat
  {
    in: "public/certificates/Artificial Intelligence Fundamentals.png",
    out: "public/certificates/Artificial Intelligence Fundamentals",
  },
  {
    in: "public/certificates/Artificial Intelligence_ Principles and Applications.png",
    out: "public/certificates/Artificial Intelligence_ Principles and Applications",
  },
  {
    in: "public/certificates/HCIP-Datacom Core Technology V1.0 Course.png",
    out: "public/certificates/HCIP-Datacom Core Technology V1.0 Course",
  },
  {
    in: "public/certificates/Problem Solving (Basic).png",
    out: "public/certificates/Problem Solving (Basic)",
  },
  {
    in: "public/certificates/Problem Solving (Intermediate).png",
    out: "public/certificates/Problem Solving (Intermediate)",
  },
];

await mkdir("public/projects", { recursive: true });
await mkdir("public/certificates", { recursive: true });

for (const { in: input, out } of jobs) {
  const meta = await sharp(input).metadata();
  for (const variant of [
    { name: `${out}.webp`, width: 640, quality: 72 },
    { name: `${out}@full.webp`, width: 1280, quality: 78 },
  ]) {
    await sharp(input)
      .resize({ width: variant.width, withoutEnlargement: true })
      .webp({ quality: variant.quality })
      .toFile(variant.name);
    console.log("OK", variant.name);
  }
  console.log(
    `${path.basename(input)}: ${meta.width}x${meta.height} -> 2 varian WebP`,
  );
}
