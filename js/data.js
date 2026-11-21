export const portfolioData = {
  // 0. LABEL ANTARMUKA (UI)
  ui: {
    nav: {
      about: { en: "About", id: "Tentang" },
      journey: { en: "Journey", id: "Perjalanan" },
      projects: { en: "Projects", id: "Proyek" },
      awards: { en: "Awards", id: "Prestasi" },
      contact: { en: "Contact", id: "Kontak" }
    },
    hero: {
      exploreBtn: { en: "Explore Projects", id: "Lihat Proyek" },
      cvBtn: { en: "Download CV", id: "Unduh CV" },
      touchBtn: { en: "Get in Touch", id: "Hubungi Saya" },
      scroll: { en: "Scroll", id: "Gulir" }
    },
    about: {
      kicker: { en: "Overview", id: "Ringkasan" },
      titleHtml: { en: "A bit <em>about</em> me", id: "Sekilas <em>tentang</em> saya" },
      basedIn: { en: "Based in", id: "Berdomisili di" }
    },
    journey: {
      kicker: { en: "Trajectory", id: "Rekam Jejak" },
      titleHtml: { en: "Experience & <em>Education</em>", id: "Pengalaman & <em>Pendidikan</em>" },
      subtitle: {
        en: "Roles, student initiatives, and academic foundations shaping my work.",
        id: "Peran organisasi, inisiatif mahasiswa, dan fondasi akademik yang membentuk cara kerja saya."
      },
      tabExperience: { en: "Experience", id: "Pengalaman" },
      tabEducation: { en: "Education", id: "Pendidikan" }
    },
    projects: {
      kicker: { en: "Portfolio", id: "Portofolio" },
      titleHtml: { en: "Selected <em>Work</em>", id: "Karya <em>Pilihan</em>" },
      subtitle: {
        en: "Click any project card to explore the architecture, role, and source repository.",
        id: "Klik kartu proyek untuk melihat arsitektur, peran, dan repositori kodenya."
      },
      filterAll: { en: "All", id: "Semua" },
      empty: { en: "No projects found in this category yet.", id: "Belum ada proyek di kategori ini." },
      inspectCta: { en: "Inspect Case Study", id: "Lihat Detail Proyek" },
      modalRole: { en: "Role", id: "Peran" },
      modalStack: { en: "Technologies Used", id: "Teknologi yang Digunakan" },
      modalGithub: { en: "Source Code (GitHub)", id: "Kode Sumber (GitHub)" },
      modalLive: { en: "Live Demo", id: "Demo Langsung" }
    },
    achievements: {
      kicker: { en: "Recognition", id: "Pencapaian" },
      titleHtml: { en: "Awards & <em>Credentials</em>", id: "Prestasi & <em>Sertifikasi</em>" },
      tabAwards: { en: "Awards & Honors", id: "Prestasi & Penghargaan" },
      tabCertifications: { en: "Certifications", id: "Sertifikasi" },
      viewCert: { en: "View Certificate", id: "Lihat Sertifikat" },
      verifyCert: { en: "Verify Credential", id: "Verifikasi Kredensial" }
    },
    contact: {
      kicker: { en: "Connect", id: "Terhubung" },
      directEmail: { en: "Direct Email", id: "Email Langsung" },
      copy: { en: "Copy", id: "Salin" },
      copiedToast: { en: "Email copied to clipboard", id: "Email berhasil disalin" },
      copyErrorToast: { en: "Unable to copy automatically", id: "Gagal menyalin secara otomatis" },
      nameLabel: { en: "Name", id: "Nama" },
      namePlaceholder: { en: "Your name", id: "Nama Anda" },
      messageLabel: { en: "Message", id: "Pesan" },
      messagePlaceholder: { en: "Tell me about your project or idea...", id: "Ceritakan proyek atau ide Anda..." },
      sendBtn: { en: "Send Message", id: "Kirim Pesan" }
    },
    footer: {
      backToTop: { en: "Back to top", id: "Kembali ke atas" }
    }
  },

  // 1. IDENTITAS & HERO SECTION
  profile: {
    brandInitials: "fahri.",
    fullName: "Muhamad Fahri Ilham",
    role: {
      en: "Information Systems Student & Aspiring Engineer",
      id: "Mahasiswa Sistem Informasi & Aspiring Engineer"
    },
    tagline: {
      en: "Turning unfamiliar challenges into working solutions through persistence and hands-on learning—driven by data science and backed by web development.",
      id: "Mengubah tantangan baru menjadi solusi nyata lewat ketekunan dan praktik langsung—didorong oleh data science dan didukung pengembangan web."
    },
    statusBadge: {
      en: "Open for Internships",
      id: "Terbuka untuk Magang"
    },
    location: {
      en: "Bekasi, West Java, Indonesia",
      id: "Bekasi, Jawa Barat, Indonesia"
    },
    email: "muhamadfahriilham06@gmail.com",
    cvUrl: "assets/docs/cv-muhamadfahriilham.pdf",
    avatarUrl: "assets/images/profile/mypp.jpg",
    avatarAlt: "Portrait of Muhamad Fahri Ilham",

    about: {
      en: [
        "I'm an Information Systems undergraduate at Universitas Singaperbangsa Karawang with a strong interest in bridging software engineering and data-driven problem solving.",
        "Outside of coursework, I actively build full-stack web apps, experiment with machine learning pipelines, and coordinate educational initiatives within my student organization."
      ],
      id: [
        "Saya adalah mahasiswa S1 Sistem Informasi di Universitas Singaperbangsa Karawang dengan minat kuat dalam menjembatani rekayasa perangkat lunak dan pemecahan masalah berbasis data.",
        "Di luar perkuliahan, saya aktif membangun aplikasi web full-stack, bereksperimen dengan pipeline machine learning, serta mengoordinasikan program edukasi di organisasi mahasiswa."
      ]
    },

    socials: [
      { label: "GitHub", url: "https://github.com/fchrylhm" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/muhamad-fahri-ilham/" },
      { label: "Instagram", url: "https://www.instagram.com/muhamadfahriilham_" }
    ]
  },

  // 2. KEAHLIAN (Dual-Track Orbital Marquee)
  skills: {
    orbitTop: [
      { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
      { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
      { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg", invert: true },
      { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" },
      { name: "Laravel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg" },
      { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" }
    ],
    orbitBottom: [
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
      { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
      { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
      { name: "Tableau", icon: "https://api.iconify.design/logos/tableau-icon.svg" },
      { name: "Google Colab", icon: "https://api.iconify.design/logos/google-colab.svg" },
      { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
      { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg", invert: true },
      { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" }
    ]
  },

  // 3. PENGALAMAN (Tambahkan foto dokumentasi di properti `photos` jika ada)
  experience: [
    {
      role: {
        en: "Head of Academic Department — Education Division",
        id: "Koordinator Departemen Akademik — Divisi Edukasi"
      },
      organization: "Himpunan Mahasiswa Sistem Informasi UNSIKA (Himsika)",
      period: { en: "Jan 2026 — Present", id: "Jan 2026 — Sekarang" },
      description: {
        en: "Guiding the department by setting direction, mentoring members, and providing constructive feedback across technical workshops and peer-learning initiatives—turning prior hands-on experience into structured team leadership.",
        id: "Mengarahkan departemen melalui penetapan strategi kerja, pendampingan anggota, dan evaluasi konstruktif pada berbagai workshop teknis serta program belajar bersama—mengubah pengalaman lapangan sebelumnya menjadi kepemimpinan tim yang terstruktur."
      },
      photos: [
        {
          src: "assets/images/experiences/01-exp-1.jpg",
          caption: { en: "Team of Education Division", id: "Tim Divisi Edukasi" }
        },
        {
          src: "assets/images/experiences/01-exp-2.jpg",
          caption: { en: "Team of Education Division", id: "Tim Divisi Edukasi" }
        },
        {
          src: "assets/images/experiences/01-exp-3.JPG",
          caption: { en: "Coordinate Event Study Club 2026", id: "Mengoordinasikan Acara Study Club 2026" }
        }
      ]
    },
    {
      role: {
        en: "Academic Department Member — Education Division",
        id: "Anggota Departemen Akademik — Divisi Edukasi"
      },
      organization: "Himpunan Mahasiswa Sistem Informasi UNSIKA (Himsika)",
      period: "Jan 2025 — Nov 2025",
      description: {
        en: "Executed departmental work programs and handled hands-on technical tasks while actively taking on diverse roles across committees and divisions. This cross-functional exposure broadened my operational perspective and built strong foundations in initiative, communication, and teamwork.",
        id: "Menjalankan program kerja departemen dan menangani kebutuhan teknis secara langsung sembari aktif mengambil berbagai peran lintas divisi dan kepanitiaan. Pengalaman lintas fungsi ini memperluas wawasan operasional sekaligus membangun fondasi inisiatif, komunikasi, dan kerja tim."
      },
      photos: []
    }
  ],

  // 4. PENDIDIKAN
  education: [
    {
      degree: {
        en: "Bachelor of Information Systems",
        id: "S1 Sistem Informasi"
      },
      institution: "Universitas Singaperbangsa Karawang (UNSIKA)",
      period: { en: "2024 — Present", id: "2024 — Sekarang" },
      description: {
        en: "Pursuing an undergraduate degree with a focus on data science, analytics, and web development. Beyond coursework, I actively push my boundaries through data competitions and student organizations—seeking diverse experiences to turn classroom theory into practical solutions.",
        id: "Menempuh pendidikan sarjana dengan fokus pada data science, analitik, dan pengembangan web. Di luar kelas, saya aktif mengasah kemampuan melalui kompetisi data dan organisasi mahasiswa untuk mengubah teori perkuliahan menjadi solusi praktis."
      }
    },
    {
      degree: {
        en: "High School Diploma in Natural Sciences",
        id: "SMA Jurusan Ilmu Pengetahuan Alam (IPA)"
      },
      institution: "SMA Negeri 1 Sukatani",
      period: "2021 — 2024",
      description: {
        en: "Built a strong analytical foundation in mathematics and sciences, consistently ranking among the top students in class. Competed in the National Science Olympiad (OSN) for Mathematics while staying actively involved in school extracurriculars.",
        id: "Membangun fondasi analitis yang kuat di bidang matematika dan sains dengan konsisten meraih peringkat atas di kelas. Turut berkompetisi dalam Olimpiade Sains Nasional (OSN) bidang Matematika serta aktif dalam kegiatan ekstrakurikuler sekolah."
      }
    }
  ],

  // 5. PROYEK & PORTOFOLIO
  projects: [
    {
      id: "moywoo",
      title: "Moywoo",
      category: "Web",
      year: "2026",
      shortDesc: {
        en: "A marketplace platform that helps student organizations run fundraising sales through their own digital storefronts.",
        id: "Platform marketplace yang membantu organisasi mahasiswa mengelola penjualan danusan melalui etalase digital masing-masing."
      },
      fullDesc: {
        en: "Moywoo is a marketplace platform built for student organizations (danusan) to sell products and manage fundraising activities in one place. Sellers register their organization, build a product catalog, and share a public storefront link with buyers. The platform tracks stock in real time and blocks orders when inventory runs low to prevent overselling. Seller and buyer access are separated, with authentication protecting the seller dashboard.",
        id: "Moywoo adalah platform marketplace bagi organisasi mahasiswa untuk menjual produk dan mengelola kegiatan danusan secara terpusat. Penjual dapat mendaftarkan organisasi, menyusun katalog produk, dan membagikan tautan etalase publik ke pembeli. Sistem memantau stok secara real-time dan otomatis membatasi pesanan saat persediaan menipis untuk mencegah overselling, dilengkapi pemisahan akses pembeli dan dashboard penjual berautentikasi."
      },
      role: "Full Stack Developer",
      techStack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "NextAuth", "Tailwind CSS"],
      image: "assets/images//projects/project-web-moywoo.png",
      githubUrl: "https://github.com/fchrylhm/moywoo-app",
      liveUrl: "https://moywoo-app.vercel.app/"
    },
    {
      id: "waste-classification",
      title: "Waste Classification Pipeline",
      category: "Data & AI",
      year: "2026",
      shortDesc: {
        en: "End-to-end computer vision pipeline for 3-class imbalanced waste classification (~26.5K images) built for Satria Data 2026.",
        id: "Pipeline computer vision end-to-end untuk klasifikasi 3 kelas sampah tidak seimbang (~26,5 ribu citra) pada Satria Data 2026."
      },
      fullDesc: {
        en: "Developed for the Satria Data 2026 Big Data Challenge (Team SyuQuLan) to classify ~26,500 imbalanced waste images into Recyclable, Electronic, and Organic categories evaluated on Macro F1-score. The pipeline uses YOLOv10 strictly for main-object localization and cropping, followed by a 6-model multi-fold ensemble combining ConvNeXt-Base and EfficientNetV2-M backbones in PyTorch. To handle class imbalance and training variance, I implemented a custom MixUp/CutMix-compatible Soft Focal Loss with class weighting and label smoothing, Exponential Moving Average (EMA) weights, and Macro-F1 weighted inference with Test-Time Augmentation (TTA), alongside confusion-matrix error analysis on Recyclable vs. Organic edge cases.",
        id: "Dikembangkan untuk Satria Data 2026 Big Data Challenge (Tim SyuQuLan) guna mengklasifikasikan ~26.500 citra sampah imbalanced ke dalam kelas Recyclable, Electronic, dan Organic dengan metrik Macro F1-score. Pipeline memakai YOLOv10 khusus untuk lokalisasi dan pemotongan objek utama, dilanjutkan ensemble 6 model multi-fold ConvNeXt-Base dan EfficientNetV2-M di PyTorch. Untuk menangani ketidakseimbangan kelas dan fluktuasi pelatihan, diterapkan Soft Focal Loss yang kompatibel dengan MixUp/CutMix, bobot EMA, serta inferensi tertimbang dengan Test-Time Augmentation (TTA) dan analisis error confusion matrix."
      },
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
      shortDesc: {
        en: "End-to-end regression and risk-clustering pipeline predicting flood probability across 50,000 records and 20 environmental factors.",
        id: "Pipeline regresi dan klastering risiko end-to-end untuk memprediksi probabilitas banjir pada 50.000 data dan 20 faktor lingkungan."
      },
      fullDesc: {
        en: "Built as a preliminary submission for a Data Science Competition (Team es_kelapa_lovers) on a 50,000-row dataset spanning 20 environmental and infrastructure risk indicators. Engineered a composite Total Risk Index (TRI) with four risk thresholds (Low, Moderate, High, Critical) and performed stratified 80/20 splitting to benchmark Linear Regression (OLS), Random Forest, and XGBoost—with XGBoost achieving the highest R² score. Complemented supervised modeling with feature importance analysis and unsupervised K-Means clustering (k=3 via Elbow Method, projected with 2D PCA) into Safe, Alert, and Danger zones, synthesized into a Visual Risk Intelligence Dashboard.",
        id: "Dibangun sebagai submisi babak penyisihan Data Science Competition (Tim es_kelapa_lovers) menggunakan dataset 50.000 baris dengan 20 indikator risiko lingkungan dan infrastruktur. Mencakup rekayasa fitur Total Risk Index (TRI) dalam empat tingkat risiko serta stratified split 80/20 untuk membandingkan Linear Regression (OLS), Random Forest, dan XGBoost—dengan XGBoost mencatat skor R² tertinggi. Dilengkapi analisis feature importance dan klastering K-Means (k=3 via Elbow Method, proyeksi PCA 2D) ke zona Aman, Waspada, dan Bahaya dalam Visual Risk Intelligence Dashboard."
      },
      role: "Data Scientist",
      techStack: ["Python", "XGBoost", "Scikit-Learn", "Pandas", "Seaborn", "PCA & K-Means"],
      image: "assets/images//projects/project-flood.png",
      githubUrl: "https://github.com/fchrylhm/flood-probability-prediction",
      liveUrl: ""
    }
  ],

  // 6. PRESTASI & PENGHARGAAN
  achievements: [
    {
      title: {
        en: "1st Place Winner — Business Plan Competition (Veternity BERAKSI 2026)",
        id: "Juara 1 — Business Plan Competition (Veternity BERAKSI 2026)"
      },
      issuer: "UPN \"Veteran\" Yogyakarta",
      year: "2026",
      description: {
        en: "Won 1st place pitching Moywoo as CTO. Authored the business architecture, TAM/SAM/SOM market sizing, community-led go-to-market strategy, and competitor analysis.",
        id: "Meraih juara 1 mempresentasikan Moywoo sebagai CTO. Menyusun arsitektur bisnis, estimasi pasar TAM/SAM/SOM, strategi go-to-market berbasis komunitas, dan analisis kompetitor."
      },
      image: "assets/images/cert-veternity.jpg",
      credentialUrl: ""
    },
    {
      title: {
        en: "Stage 1 Internal Selection Qualifier — PKM 2026",
        id: "Lolos Seleksi Internal Tahap 1 — PKM 2026"
      },
      issuer: "Universitas Singaperbangsa Karawang",
      year: "2026",
      description: {
        en: "Qualified through internal university selection for the NutriAudit monitoring platform proposal in the PKM Karsa Cipta track.",
        id: "Lolos seleksi internal universitas melalui proposal platform pemantauan gizi NutriAudit pada skema PKM Karsa Cipta."
      },
      image: "",
      credentialUrl: ""
    }
  ],

  // 7. SERTIFIKASI (Ganti dengan sertifikat Dicoding / Bootcamp / AWS milikmu)
  certifications: [
  {
    title: {
      en: "Fundamentals of AI",
      id: "Belajar Dasar AI"
    },
    issuer: "Dicoding Indonesia",
    year: "June 2026 - June 2029",
    description: {
      en: "Completed a beginner-level course on core AI concepts, covering the role of data in AI, the fundamentals of machine learning, and an introduction to deep learning with practical examples.",
      id: "Menyelesaikan kelas pemula tentang konsep dasar AI, mencakup peran data dalam AI, dasar-dasar machine learning, dan pengenalan deep learning beserta contoh penerapannya."
    },
    credentialUrl: "https://www.dicoding.com/certificates/NVP7NVL8RZR0",
    image: "assets/images/certifications/certification-02.jpg"
  },
  {
    title: {
      en: "Getting Started with Python Programming",
      id: "Memulai Pemrograman dengan Python"
    },
    issuer: "Dicoding Indonesia",
    year: "July 2026 - July 2029",
    description: {
      en: "Completed a beginner-level Python course covering data types, expressions, control flow, error handling, functions, and PEP 8 coding conventions, along with an introduction to commonly used libraries.",
      id: "Menyelesaikan kelas Python tingkat pemula yang mencakup tipe data, ekspresi, control flow, penanganan kesalahan, fungsi, dan standar penulisan kode PEP 8, serta pengenalan library populer."
    },
    credentialUrl: "https://www.dicoding.com/certificates/98XW0972WXM3",
    image: "assets/images/certifications/certification-01.jpg"
  }
  ],

  // 8. KONTAK
  contact: {
    heading: {
      en: "Let's Build Something Useful",
      id: "Mari Bangun Solusi Bermanfaat"
    },
    subheading: {
      en: "Have a project idea, collaboration opportunity, or just want to talk tech? Feel free to reach out directly.",
      id: "Punya ide proyek, peluang kolaborasi, atau sekadar ingin berdiskusi soal teknologi? Jangan ragu menghubungi saya langsung."
    },
    formspreeEndpoint: ""
  }
};