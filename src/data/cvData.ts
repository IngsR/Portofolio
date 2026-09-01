export type CVLanguage = "id" | "en";

export interface CVContent {
  header: {
    name: string;
    title: string;
    email: string;
    phone: string;
    github: string;
    linkedin: string;
    website: string;
    location: string;
    birthInfo: string;
  };
  summary: string;
  labels: {
    modalTitle: string;
    modalSubtitle: string;
    printButton: string;
    downloadPdf: string;
    downloadDocx: string;
    downloading: string;
    experience: string;
    education: string;
    certifications: string;
    technicalSkills: string;
    techStackLabel: string;
    langId: string;
    langEn: string;
  };
  experience: {
    id: string;
    role: string;
    company: string;
    location: string;
    period: string;
    type: string;
    achievements: string[];
    techStack: string[];
  }[];
  education: {
    id: string;
    degree: string;
    institution: string;
    period: string;
    details?: string;
  }[];
  certificationsByIssuer: Record<
    string,
    {
      id: string;
      title: string;
      issueDate: string;
    }[]
  >;
  skills: {
    category: string;
    items: string;
  }[];
}

export const cvData: Record<CVLanguage, CVContent> = {
  id: {
    header: {
      name: "Ikhwan Ramadhan",
      title: "Frontend Engineer",
      email: "ikhwn.rdn@gmail.com",
      phone: "+6282386473410",
      github: "github.com/IngsR",
      linkedin: "linkedin.com/in/ikhwn-rdn",
      website: "ikhwann.my.id",
      location: "Padang, Sumatera Barat (Siap Onsite / Relokasi)",
      birthInfo: "Padang, 18 November 2003",
    },
    summary:
      "Lulusan S1 Teknik Informatika UPI “YPTK” Padang, dengan spesialisasi pada Frontend Engineering. Menguasai React.js dan TypeScript dengan fokus utama pada Next.js dan Angular, didukung pemahaman strategi rendering (SSR, SSG, CDN), Technical SEO, Open Graph, serta Reactive Programming (RxJS & Signals).",
    labels: {
      modalTitle: "Curriculum Vitae — Ikhwan Ramadhan",
      modalSubtitle: "Pratinjau Dokumen & Siap Unduh (PDF / DOCX)",
      printButton: "Cetak",
      downloadPdf: "Unduh PDF",
      downloadDocx: "Unduh Word (.docx)",
      downloading: "Memproses...",
      experience: "PENGALAMAN",
      education: "PENDIDIKAN",
      certifications: "SERTIFIKASI & KREDENSIAL",
      technicalSkills: "KETERAMPILAN TEKNIS",
      techStackLabel: "Tech Stack",
      langId: "Indonesia",
      langEn: "English",
    },
    experience: [
      {
        id: "exp-1",
        role: "Lead Frontend Engineer",
        company: "Proyek Sistem Informasi SMP Negeri 24 Padang",
        location: "Padang, Indonesia",
        period: "Agu - Sept 2025",
        type: "Kontrak",
        achievements: [
          "Merancang dan memimpin arsitektur antarmuka portal resmi sekolah berbasis Next.js App Router, TypeScript, dan Tailwind CSS.",
          "Mengimplementasikan Technical SEO menyeluruh (Dynamic Metadata, Open Graph, Sitemap & Robots.txt) serta strategi hybrid SSR/SSG caching untuk performa render maksimal dan indeks Google instan.",
          "Membangun dashboard admin modular berbasis shadcn/ui dengan form validation Zod yang type-safe.",
        ],
        techStack: [
          "Next.js (App Router)",
          "React",
          "TypeScript",
          "Technical SEO",
          "Dynamic Open Graph",
          "SSR / SSG",
          "Tailwind CSS",
          "shadcn/ui",
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
        achievements: [
          "Membangun Angular Property (HouseING Property) berbasis Angular Standalone Components, TypeScript, dan Reactive Programming (Angular Signals & RxJS).",
          "Memigrasikan platform visualisasi prediksi siklon tropis ke Astro (Island Architecture) pada domain live prediksi.ikhwann.my.id untuk performa Zero-JS default di Edge CDN.",
          "Mengembangkan arsitektur UI enterprise monorepo menggunakan Turborepo, Next.js 15, dan React 19 dengan shared component packages.",
        ],
        techStack: [
          "Next.js 15",
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
    ],
    education: [
      {
        id: "edu-1",
        degree: "S1 Teknik Informatika",
        institution: "Universitas Putra Indonesia “YPTK” Padang",
        period: "Teknik Informatika • Sep 2022 – Okt 2026",
      },
    ],
    certificationsByIssuer: {
      "Huawei ICT Academy": [
        {
          id: "cert-1",
          title: "Artificial Intelligence Fundamentals",
          issueDate: "2026",
        },
        {
          id: "cert-2",
          title: "Artificial Intelligence: Principles and Applications",
          issueDate: "2026",
        },
        {
          id: "cert-3",
          title: "HCIP-Datacom Core Technology V1.0 Course",
          issueDate: "2026",
        },
      ],
      HackerRank: [
        {
          id: "cert-4",
          title: "Problem Solving (Basic)",
          issueDate: "Mei 2025",
        },
        {
          id: "cert-5",
          title: "Problem Solving (Intermediate)",
          issueDate: "Jun 2025",
        },
      ],
    },
    skills: [
      {
        category: "Core Frameworks & Language",
        items:
          "Next.js (App Router), Angular, React.js, TypeScript, JavaScript (ES6+), HTML5 Semantic",
      },
      {
        category: "Rendering & SEO Architecture",
        items:
          "Server-Side Rendering (SSR), Static Site Generation (SSG), ISR, Edge CDN Caching, Technical SEO, Dynamic Open Graph, Core Web Vitals",
      },
      {
        category: "Reactive & State Management",
        items:
          "RxJS Observables, Angular Signals, React Context & State, TanStack Query, Zod Schema Validation",
      },
      {
        category: "Styling & Build Tooling",
        items:
          "Tailwind CSS, shadcn/ui, Astro (Islands Architecture), Vite, Turborepo, Git, Vercel, Docker",
      },
    ],
  },
  en: {
    header: {
      name: "Ikhwan Ramadhan",
      title: "Frontend Engineer",
      email: "ikhwn.rdn@gmail.com",
      phone: "+6282386473410",
      github: "github.com/IngsR",
      linkedin: "linkedin.com/in/ikhwn-rdn",
      website: "ikhwann.my.id",
      location: "Padang, West Sumatra (Ready for Onsite / Relocation)",
      birthInfo: "Padang, November 18, 2003",
    },
    summary:
      "Informatics Engineering Graduate from UPI \"YPTK\" Padang specializing in Frontend Engineering. Proficient in React.js and TypeScript with primary focus on Next.js and Angular, supported by strong knowledge of rendering strategies (SSR, SSG, CDN), Technical SEO, Open Graph, and Reactive Programming (RxJS & Signals).",
    labels: {
      modalTitle: "Curriculum Vitae — Ikhwan Ramadhan",
      modalSubtitle: "Document Preview & Ready to Download (PDF / DOCX)",
      printButton: "Print",
      downloadPdf: "Download PDF",
      downloadDocx: "Download Word (.docx)",
      downloading: "Processing...",
      experience: "WORK EXPERIENCE",
      education: "EDUCATION",
      certifications: "CERTIFICATIONS & CREDENTIALS",
      technicalSkills: "TECHNICAL SKILLS",
      techStackLabel: "Tech Stack",
      langId: "Indonesian",
      langEn: "English",
    },
    experience: [
      {
        id: "exp-1",
        role: "Lead Frontend Engineer",
        company: "SMP Negeri 24 Padang Information System Project",
        location: "Padang, Indonesia",
        period: "Aug - Sept 2025",
        type: "Contract",
        achievements: [
          "Architected and delivered the official school web portal using Next.js App Router, TypeScript, and Tailwind CSS.",
          "Implemented comprehensive Technical SEO (Dynamic Metadata, Open Graph, Sitemap & Robots) and hybrid SSR/SSG caching for instant load times and peak search indexing.",
          "Built a modular admin dashboard using shadcn/ui with type-safe Zod form validations.",
        ],
        techStack: [
          "Next.js (App Router)",
          "React",
          "TypeScript",
          "Technical SEO",
          "Dynamic Open Graph",
          "SSR / SSG",
          "Tailwind CSS",
          "shadcn/ui",
          "Zod",
        ],
      },
      {
        id: "exp-2",
        role: "Frontend Engineer (Open Source & Enterprise Projects)",
        company: "IngsR Engineering Repositories",
        location: "Indonesia / Remote",
        period: "2023 - Present",
        type: "Freelance",
        achievements: [
          "Developed Angular Property (HouseING Property) utilizing Angular Standalone Components, TypeScript, and Reactive Programming (Angular Signals & RxJS).",
          "Migrated tropical cyclone prediction platform to Astro (Island Architecture) at live domain prediksi.ikhwann.my.id for Zero-JS default delivery over Edge CDN.",
          "Engineered enterprise UI monorepo architecture leveraging Turborepo, Next.js 15, and React 19 with shared component libraries.",
        ],
        techStack: [
          "Next.js 15",
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
    ],
    education: [
      {
        id: "edu-1",
        degree: "Bachelor of Informatics (B.S. in Computer Science)",
        institution: "Universitas Putra Indonesia “YPTK” Padang",
        period: "Informatics Engineering • Sep 2022 – Oct 2026",
      },
    ],
    certificationsByIssuer: {
      "Huawei ICT Academy": [
        {
          id: "cert-1",
          title: "Artificial Intelligence Fundamentals",
          issueDate: "2026",
        },
        {
          id: "cert-2",
          title: "Artificial Intelligence: Principles and Applications",
          issueDate: "2026",
        },
        {
          id: "cert-3",
          title: "HCIP-Datacom Core Technology V1.0 Course",
          issueDate: "2026",
        },
      ],
      HackerRank: [
        {
          id: "cert-4",
          title: "Problem Solving (Basic)",
          issueDate: "May 2025",
        },
        {
          id: "cert-5",
          title: "Problem Solving (Intermediate)",
          issueDate: "Jun 2025",
        },
      ],
    },
    skills: [
      {
        category: "Core Frameworks & Language",
        items:
          "Next.js (App Router), Angular, React.js, TypeScript, JavaScript (ES6+), HTML5 Semantic",
      },
      {
        category: "Rendering & SEO Architecture",
        items:
          "Server-Side Rendering (SSR), Static Site Generation (SSG), ISR, Edge CDN Caching, Technical SEO, Dynamic Open Graph, Core Web Vitals",
      },
      {
        category: "Reactive & State Management",
        items:
          "RxJS Observables, Angular Signals, React Context & State, TanStack Query, Zod Schema Validation",
      },
      {
        category: "Styling & Build Tooling",
        items:
          "Tailwind CSS, shadcn/ui, Astro (Islands Architecture), Vite, Turborepo, Git, Vercel, Docker",
      },
    ],
  },
};
