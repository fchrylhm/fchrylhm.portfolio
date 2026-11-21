export const portfolioData = {
  // 1. IDENTITAS & HERO SECTION
  profile: {
    brandInitials: "fahri.",
    fullName: "Muhamad Fahri Ilham",
    greeting: "Hello, I'm",
    role: "Information Systems Student & Aspiring Engineer",
    tagline:
      "Turning unfamiliar challenges into working solutions through persistence and hands-on learning—driven by data science and backed by web development.",
    statusBadge: "Open for Internships",
    location: "Bekasi, West Java, Indonesia",
    email: "muhamadfahriilham06@gmail.com",
    cvUrl: "assets/docs/cv-muhamadfahriilham.pdf",
    avatarUrl: "assets/images/mypp.jpg",
    avatarAlt: "Portrait of Muhamad Fahri Ilham",

    // Paragraf di bagian About Me
    about: [
      "I'm an Information Systems undergraduate at Universitas Singaperbangsa Karawang with a strong interest in bridging software engineering and data-driven problem solving.",
      "Outside of coursework, I actively build full-stack web apps, experiment with machine learning pipelines, and coordinate educational initiatives within my student organization."
    ],

    // Tautan sosial media
    socials: [
      { label: "GitHub", url: "https://github.com/fchrylhm" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/muhamad-fahri-ilham/" },
      { label: "Instagram", url: "https://www.instagram.com/muhamadfahriilham_" }
    ]
  },

  // 2. KEAHLIAN
  skills: [
    {
      category: "Full Stack Web Development",
      items: ["HTML & CSS", "JavaScript", "React", "PHP", "Next.js", "Laravel"]
    },
    {
      category: "Data & AI",
      items: ["Python", "SQL (MySQL / PostgreSQL)", "Tableau"]
    },
    {
      category: "Tools & Workflow",
      items: ["Git & GitHub", "Figma", "VS Code", "Google Colab"]
    }
  ],

  // 3. PENGALAMAN (Tab "Experience")
  experience: [
    {
      role: "Department Coordinator — Education Division",
      organization: "Information Systems Student Association of Universitas Singaperbangsa Karawang (Himsika)",
      period: "Jan 2026 — Present",
      description:
        "Guiding the department by setting direction, mentoring members, and providing constructive feedback across technical workshops and peer-learning initiatives—turning prior hands-on experience into structured team leadership."
    },
    {
      role: "Academic Department Member — Education Division",
      organization: "Information Systems Student Association of Universitas Singaperbangsa Karawang (Himsika)",
      period: "Jan 2025 — Nov 2025",
      description:
        "Executed departmental work programs and handled hands-on technical tasks while actively taking on diverse roles across committees and divisions. This cross-functional exposure broadened my operational perspective and built strong foundations in initiative, communication, and teamwork."
    }
  ],

  // 4. PENDIDIKAN (Tab "Education")
  education: [
    {
      degree: "Bachelor of Information Systems",
      institution: "Universitas Singaperbangsa Karawang (UNSIKA)",
      period: "2024 — Present",
      description:
        "Pursuing an undergraduate degree with a focus on data science, analytics, and web development. Beyond coursework, I actively push my boundaries through data competitions and student organizations—seeking diverse experiences to turn classroom theory into practical solutions."
    }
  ],

  // 5. PROYEK & PORTOFOLIO
  projects: [
    {
      id: "moywoo",
      title: "Moywoo",
      category: "Web",
      year: "2026",
      shortDesc:
        "A marketplace platform that helps student organizations run fundraising sales through their own digital storefronts.",
      fullDesc:
        "Moywoo is a marketplace platform built for student organizations (danusan) to sell products and manage fundraising activities in one place. Sellers register their organization, build a product catalog, and share a public storefront link with buyers. The platform tracks stock in real time and blocks orders when inventory runs low to prevent overselling. Seller and buyer access are separated, with authentication protecting the seller dashboard.",
      role: "Full Stack Developer",
      techStack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "NextAuth", "Tailwind CSS"],
      image: "assets/images/project-web-moywoo.png",
      githubUrl: "https://github.com/fchrylhm/moywoo-app",
      liveUrl: "https://moywoo-app.vercel.app/"
    },
    {
      id: "waste-classification",
      title: "Waste Classification Pipeline",
      category: "Data & AI",
      year: "2026",
      shortDesc:
        "End-to-end computer vision pipeline for 3-class imbalanced waste classification (~26.5K images) built for Satria Data 2026.",
      fullDesc:
        "Developed for the Satria Data 2026 Big Data Challenge (Team SyuQuLan) to classify ~26,500 imbalanced waste images into Recyclable, Electronic, and Organic categories evaluated on Macro F1-score. The pipeline uses YOLOv10 strictly for main-object localization and cropping, followed by a 6-model multi-fold ensemble combining ConvNeXt-Base and EfficientNetV2-M backbones in PyTorch. To handle class imbalance and training variance, I implemented a custom MixUp/CutMix-compatible Soft Focal Loss with class weighting and label smoothing, Exponential Moving Average (EMA) weights, and Macro-F1 weighted inference with Test-Time Augmentation (TTA), alongside confusion-matrix error analysis on Recyclable vs. Organic edge cases.",
      role: "Team Lead & ML Engineer",
      techStack: ["PyTorch", "YOLOv10", "ConvNeXt", "EfficientNetV2", "timm", "OpenCV"],
      image: "",
      githubUrl: "https://github.com/fchrylhm/satria-data-2026-waste-classification",
      liveUrl: ""
    },
    {
      id: "flood-probability",
      title: "Flood Probability Prediction",
      category: "Data & AI",
      year: "2026",
      shortDesc:
        "End-to-end regression and risk-clustering pipeline predicting flood probability across 50,000 records and 20 environmental factors.",
      fullDesc:
        "Built as a preliminary submission for a Data Science Competition (Team es_kelapa_lovers) on a 50,000-row dataset spanning 20 environmental and infrastructure risk indicators. Engineered a composite Total Risk Index (TRI) with four risk thresholds (Low, Moderate, High, Critical) and performed stratified 80/20 splitting to benchmark Linear Regression (OLS), Random Forest, and XGBoost—with XGBoost achieving the highest R² score. Complemented supervised modeling with feature importance analysis and unsupervised K-Means clustering (k=3 via Elbow Method, projected with 2D PCA) into Safe, Alert, and Danger zones, synthesized into a Visual Risk Intelligence Dashboard.",
      role: "Data Scientist",
      techStack: ["Python", "XGBoost", "Scikit-Learn", "Pandas", "Seaborn", "PCA & K-Means"],
      image: "assets/images/project-flood.png",
      githubUrl: "https://github.com/fchrylhm/flood-probability-prediction",
      liveUrl: ""
    }
  ],

  // 6. PRESTASI & SERTIFIKASI
  achievements: [
    {
      title: "1st Place Winner — Business Plan Competition (Veternity BERAKSI 2026)",
      issuer: "UPN \"Veteran\" Yogyakarta",
      year: "2026",
      description: "Won 1st place pitching Moywoo as CTO. Authored the business architecture, TAM/SAM/SOM market sizing, community-led go-to-market strategy, and competitor analysis."
    },
    {
      title: "Stage 1 Internal Selection Qualifier — PKM 2026",
      issuer: "Universitas Singaperbangsa Karawang",
      year: "2026",
      description: "Qualified through internal university selection for the NutriAudit monitoring platform proposal in the PKM Karsa Cipta track."
    }
  ],

  // 7. KONTAK
  contact: {
    heading: "Let's Build Something Useful",
    subheading:
      "Have a project idea, collaboration opportunity, or just want to talk tech? Feel free to reach out directly.",
    formspreeEndpoint: ""
  }
};