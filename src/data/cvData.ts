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
      title: "Full-Stack Developer",
      email: "ikhwn.rdn@gmail.com",
      phone: "+6282386473410",
      github: "github.com/IngsR",
      linkedin: "linkedin.com/in/ikhwn-rdn",
      website: "ikhwann.my.id",
      location: "Indonesia",
      birthInfo: "Padang, 18 November 2003",
    },
    summary:
      "Full-Stack Developer, lulusan S1 Teknik Informatika Universitas Putra Indonesia “YPTK” Padang, dengan pengalaman membangun aplikasi web menggunakan React, TypeScript, Next.js, NestJS, dan PostgreSQL. Pernah mengembangkan sistem informasi sekolah yang digunakan secara nyata serta membangun berbagai proyek personal berskala monorepo dan e-commerce untuk memperdalam kemampuan software engineering.",
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
        role: "Ketua Tim Magang & Full-Stack Developer",
        company: "Proyek Sistem Informasi SMP Negeri 24 Padang",
        location: "Padang, Indonesia",
        period: "Agu - Sept 2025",
        type: "Kontrak",
        achievements: [
          "Memimpin tim pengembang dalam merancang dan mengimplementasikan arsitektur web full-stack berbasis Next.js App Router, Drizzle ORM, dan database PostgreSQL.",
          "Mengimplementasikan sistem otentikasi aman Auth.js serta Role-Based Access Control (RBAC) untuk panel administrasi guru dan staf.",
          "Menyediakan portal publik profil sekolah, sistem berita, pengumuman dinamis, serta layanan akademik terpadu yang responsif diakses publik.",
        ],
        techStack: [
          "Next.js",
          "TypeScript",
          "Drizzle ORM",
          "PostgreSQL",
          "Auth.js",
          "Tailwind CSS",
          "shadcn/ui",
          "Zod",
        ],
      },
      {
        id: "exp-2",
        role: "Full-Stack Developer (Open Source Project)",
        company: "IngsR Portfolio & Engineering Repositories",
        location: "Indonesia / Remote",
        period: "2023 - Sekarang",
        type: "Freelance",
        achievements: [
          "Merancang dan membangun Fullstack CRM/ERP Monorepo skala enterprise memanfaatkan Turborepo, Next.js 15, NestJS modular, dan TypeORM.",
          "Mengembangkan platform Ing Store (E-Commerce Otomotif) full-stack dengan Next.js, Prisma, PostgreSQL, dilengkapi katalog interaktif dan simulasi kredit.",
          "Melakukan riset dan implementasi model LSTM Time Series Forecasting untuk prediksi lintasan siklon tropis menggunakan dataset historis IBTrACS dan visualisasi peta Folium.",
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
        category: "Frontend",
        items: "React, TypeScript, JavaScript, Next.js, Tailwind CSS, shadcn/ui, Zod",
      },
      {
        category: "Backend",
        items: "Node.js, NestJS, Express, REST API, OpenAPI/Swagger, Auth.js, JWT",
      },
      {
        category: "Database",
        items: "PostgreSQL, SQL, Drizzle ORM, Prisma, TypeORM",
      },
      {
        category: "DevOps & Tools",
        items: "Docker, Linux (Debian), Git, GitHub, Vercel",
      },
      {
        category: "Data & ML",
        items: "Python, NumPy, Pandas, Scikit-learn, TensorFlow, LSTM, Streamlit, Folium",
      },
    ],
  },
  en: {
    header: {
      name: "Ikhwan Ramadhan",
      title: "Full-Stack Developer",
      email: "ikhwn.rdn@gmail.com",
      phone: "+6282386473410",
      github: "github.com/IngsR",
      linkedin: "linkedin.com/in/ikhwn-rdn",
      website: "ikhwann.my.id",
      location: "Indonesia",
      birthInfo: "Padang, November 18, 2003",
    },
    summary:
      "Full-Stack Developer with a Bachelor's Degree in Informatics from Universitas Putra Indonesia “YPTK” Padang. Experienced in building responsive, scalable web applications using React, TypeScript, Next.js, NestJS, and PostgreSQL. Successfully built production-grade school management systems, enterprise monorepo architectures, and applied machine learning models for Time Series Forecasting.",
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
        role: "Internship Team Lead & Full-Stack Developer",
        company: "SMP Negeri 24 Padang Information System Project",
        location: "Padang, Indonesia",
        period: "Aug - Sept 2025",
        type: "Contract",
        achievements: [
          "Led the development team in designing and implementing a full-stack school portal using Next.js App Router, Drizzle ORM, and PostgreSQL.",
          "Implemented secure authentication and Role-Based Access Control (RBAC) using Auth.js for teacher and administrator workflows.",
          "Delivered public institutional profile, dynamic announcements, media management, and academic service download features with responsive UI.",
        ],
        techStack: [
          "Next.js",
          "TypeScript",
          "Drizzle ORM",
          "PostgreSQL",
          "Auth.js",
          "Tailwind CSS",
          "shadcn/ui",
          "Zod",
        ],
      },
      {
        id: "exp-2",
        role: "Full-Stack Developer (Open Source Projects)",
        company: "IngsR Portfolio & Engineering Repositories",
        location: "Indonesia / Remote",
        period: "2023 - Present",
        type: "Freelance",
        achievements: [
          "Architected and built an enterprise-grade Fullstack CRM/ERP Monorepo leveraging Turborepo, Next.js 15, NestJS, and TypeORM.",
          "Engineered Ing Store, an automotive e-commerce web platform with Next.js, Prisma, and PostgreSQL featuring vehicle catalog and loan calculator.",
          "Researched and implemented an LSTM Time Series Forecasting model for tropical cyclone track prediction utilizing historical IBTrACS dataset and Folium maps.",
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
        category: "Frontend",
        items: "React, TypeScript, JavaScript, Next.js, Tailwind CSS, shadcn/ui, Zod",
      },
      {
        category: "Backend",
        items: "Node.js, NestJS, Express, REST API, OpenAPI/Swagger, Auth.js, JWT",
      },
      {
        category: "Database",
        items: "PostgreSQL, SQL, Drizzle ORM, Prisma, TypeORM",
      },
      {
        category: "DevOps & Tools",
        items: "Docker, Linux (Debian), Git, GitHub, Vercel",
      },
      {
        category: "Data & ML",
        items: "Python, NumPy, Pandas, Scikit-learn, TensorFlow, LSTM, Streamlit, Folium",
      },
    ],
  },
};
