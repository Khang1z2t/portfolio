export type Locale = "en" | "vi";

export type LocalizedFeaturedProject = {
  title: string;
  type: string;
  summary: string;
  impact: string;
  repoUrl?: string;
  liveUrl?: string;
  visibility?: "public" | "private" | "confidential";
};

export type LocalizedSkillGroup = {
  title: string;
};

export type LocalizedPipelineStep = {
  title: string;
  status: string;
  description: string;
};

export type LocalizedAboutFact = {
  label: string;
  value: string;
};

export type LocalizedContent = {
  brand: string;
  nav: {
    about: string;
    aboutShort?: string;
    work: string;
    workShort?: string;
    skills: string;
    skillsShort?: string;
    pipeline: string;
    pipelineShort?: string;
    engineering: string;
    engineeringShort?: string;
    contact: string;
    contactShort?: string;
  };
  labels: {
    language: string;
    nowItFeels: string;
    selectedWork: string;
    skills: string;
    pipeline: string;
    engineering: string;
    nextPass: string;
    viewRepository: string;
    livePreview: string;
    viewProject: string;
    privateProject: string;
    confidentialProject: string;
    githubProfile: string;
    connectWithMe: string;
    connect: string;
    connectSheet: string;
    facebook: string;
    github: string;
    linkedin: string;
    phone: string;
    zalo: string;
    viewCv: string;
    downloadCv: string;
    close: string;
    cvTitle: string;
    cvMissing: string;
  };
  hero: {
    eyebrow: string;
    eyebrowStates?: string[];
    headingWords: string[];
    animatedWords: string[];
    summary: string;
    primaryAction: string;
    secondaryAction: string;
    notes: string[];
  };
  about: {
    eyebrow: string;
    heading: string;
    description: string;
    facts: LocalizedAboutFact[];
  };
  panel: {
    captionLeft: string;
    captionRight: string;
    primaryLabel: string;
    primaryValue: string;
    secondaryLabel: string;
    secondaryValue: string;
  };
  capabilities: string[];
  projectsHeading: string;
  featuredProjects: LocalizedFeaturedProject[];
  skillsHeading: string;
  skillGroups: LocalizedSkillGroup[];
  pipelineHeading: string;
  pipelineDescription: string;
  pipelineSteps: LocalizedPipelineStep[];
  engineeringHeading: string;
  engineeringDescription: string;
  engineeringPoints: string[];
  contactHeading: string;
  contactDescription: string;
  contactEmail: string;
  contactPhone: string;
  facebookUrl?: string;
  githubUrl: string;
  linkedinUrl: string;
};

export const sharedSkillItems = [
  ["Java", "C#", "TypeScript", "JavaScript", "SQL", "HTML", "CSS"],
  [
    "ReactJS",
    "Next.js",
    "Tailwind CSS",
    "Ant Design",
    "REST integration",
    "Responsive UI",
  ],
  [
    "Spring Boot",
    "Spring Security",
    "RESTful APIs",
    "JWT",
    "Keycloak",
    "Camunda",
  ],
  [
    "PostgreSQL",
    "SQLServer",
    "Redis",
    "Docker",
    "GitHub Actions",
    "Nginx",
    "Postman",
  ],
] as const;

export const localizedContent: Record<Locale, LocalizedContent> = {
  en: {
    brand: "KHANG",
    nav: {
      about: "About",
      work: "Work",
      skills: "Skills",
      pipeline: "How I work",
      // pipelineShort: "Pipeline",
      engineering: "Engineering",
      engineeringShort: "Mindset",
      contact: "Contact",
    },
    labels: {
      language: "Language",
      nowItFeels: "Now it feels",
      selectedWork: "Selected work",
      skills: "Skills",
      pipeline: "How I work",
      engineering: "Engineering focus",
      nextPass: "Next pass",
      viewRepository: "View repository",
      livePreview: "Live preview",
      viewProject: "View project",
      privateProject: "Private project",
      confidentialProject: "Confidential project",
      githubProfile: "GitHub profile",
      connectWithMe: "Connect with me",
      connect: "Connect",
      connectSheet: "Find me",
      facebook: "Facebook",
      github: "GitHub",
      linkedin: "LinkedIn",
      phone: "Phone",
      zalo: "Zalo",
      viewCv: "View CV",
      downloadCv: "Download CV",
      close: "Close",
      cvTitle: "Curriculum Vitae",
      cvMissing:
        "Update the CV file in your Supabase storage path and it will appear here automatically.",
    },
    hero: {
      eyebrow: "Fullstack developer — Java, Spring Boot, ReactJS",
      eyebrowStates: [
        "Full-stack developer — Java, Spring Boot, ReactJS",
        "Backend developer — Java, C#, Node.js",
        "Frontend developer — Next.js, TypeScript, Tailwind",
      ],
      headingWords: [
        "I'm",
        "Khang.",
        "Fullstack",
        "developer",
        "who",
        "actually",
        "ships.",
      ],
      animatedWords: [
        "fullstack",
        "shippable",
        "scalable",
        "secure",
        "backend",
      ],
      summary:
        "I build backend systems, APIs, and web products with a strong focus on reliability, practical architecture, and end-to-end delivery.",
      primaryAction: "View projects",
      secondaryAction: "Explore skills",
      notes: [
        "Java, Spring Boot, ReactJS, Docker, and CI/CD.",
        "Production experience from real enterprise and banking environments.",
      ],
    },
    about: {
      eyebrow: "About me",
      heading: "I'm Dinh Quoc Bao Khang",
      description:
        "I'm a full-stack developer based in Ho Chi Minh City, with a strong focus on backend systems, API design, and building practical products end-to-end. I enjoy working on software that is secure, stable, and useful in real production environments.",
      facts: [
        { label: "Location", value: "Ho Chi Minh City, Vietnam" },
        { label: "Experience", value: "1+ year" },
        {
          label: "Focus",
          value: "Backend systems, API design, and full-stack delivery",
        },
        { label: "Availability", value: "Full-time or remote" },
      ],
    },
    panel: {
      captionLeft: "Developer signal",
      captionRight: "Bilingual / fullstack framing",
      primaryLabel: "Stack",
      primaryValue:
        "Java Spring Boot + ReactJS, deployed with Docker and CI/CD",
      secondaryLabel: "Current focus",
      secondaryValue:
        "Backend systems, API design, and delivering stable full-stack products",
    },
    capabilities: [
      "Fullstack portfolio framing — backend-leaning, not just UI",
      "Next.js App Router base with isolated client animation layer",
      "Bilingual content switching between English and Vietnamese",
      "A clean path for GitHub-sourced projects, pinned selections, and private entries",
    ],
    projectsHeading: "Projects built end-to-end for real production use.",
    featuredProjects: [
      {
        title: "Pacific Travel",
        type: "Fullstack Travel Booking Platform",
        summary:
          "Tour booking platform with JWT auth, Redis caching, payments, and CI/CD deployment.",
        impact:
          "Improved page speed by 45% after SQL optimization and PostgreSQL + Supabase migration.",
        repoUrl: "https://github.com/Khang1z2t/Pacific",
        liveUrl: "https://pacifictravel.id.vn/",
      },
      {
        title: "BookStore",
        type: "Ecommerce Platform + Admin Workflow",
        summary:
          "CRUD bookstore app with ReactJS frontend and Spring Boot backend.",
        impact:
          "Integrated Keycloak RBAC and Camunda workflow for enterprise-style order processing.",
        repoUrl: "https://github.com/Khang1z2t/BookStore",
      },
      {
        title: "ACB Internal E-Form & Approval System",
        type: "Enterprise Banking — Production Internship",
        summary:
          "Maintained and improved ACB’s internal employee workflow platform for e-forms, approvals, and card-related operations. Started at FPT IS for 3 months, then transitioned to ACB for on-site delivery.",
        impact:
          "Contributed to maintenance and continuous improvements across reliability, process speed, and operational usability in a regulated banking environment.",
        visibility: "confidential",
      },
    ],
    skillsHeading:
      "A stack built around backend reliability and fullstack delivery.",
    skillGroups: [
      { title: "Languages" },
      { title: "Frontend" },
      { title: "Backend" },
      { title: "Data & tooling" },
    ],
    pipelineHeading: "How I approach product and engineering work.",
    pipelineDescription:
      "From understanding the problem to shipping a reliable product.",
    pipelineSteps: [
      {
        title: "Understand the problem",
        status: "Step 01",
        description:
          "Clarify goals, constraints, and the real problem before coding.",
      },
      {
        title: "Design the system",
        status: "Step 02",
        description: "Define API flow, data model, and service boundaries.",
      },
      {
        title: "Build end-to-end",
        status: "Step 03",
        description: "Implement backend and frontend as one complete system.",
      },
      {
        title: "Test and refine",
        status: "Step 04",
        description:
          "Handle edge cases, improve reliability, and polish delivery.",
      },
    ],
    engineeringHeading: "Backend-first thinking, fullstack delivery.",
    engineeringDescription:
      "I focus on the parts that make software dependable in production: secure auth flows, reliable APIs, and deployment pipelines that stay stable under change. Frontend decisions still follow user flow and business outcomes.",
    engineeringPoints: [
      "Build production-ready Spring Boot APIs with JWT/Keycloak, clear service boundaries, and data models designed for long-term maintainability.",
      "Use ReactJS + Tailwind to keep the frontend fast to iterate while staying aligned with real user journeys and product goals.",
      "Hands-on production experience in banking systems, Docker-based deployments, and GitHub Actions CI/CD across real delivery cycles.",
    ],
    contactHeading:
      "Open to Junior Fullstack or Backend roles in Ho Chi Minh City.",
    contactDescription:
      "I'm looking for a team where I can contribute from day one in backend or fullstack delivery. Reach out via email or LinkedIn.",
    contactEmail: "khangbao3008@gmail.com",
    contactPhone: "0865399254",
    facebookUrl: "https://www.facebook.com/Yuno1z2t/",
    githubUrl: "https://github.com/Khang1z2t",
    linkedinUrl: "https://www.linkedin.com/in/yunok/",
  },
  vi: {
    brand: "KHANG",
    nav: {
      about: "Về mình",
      aboutShort: "Về",
      work: "Dự án",
      workShort: "Dự án",
      skills: "Kỹ năng",
      skillsShort: "Kỹ năng",
      pipeline: "Cách tôi làm việc",
      pipelineShort: "Quy trình",
      engineering: "Chuyên môn",
      engineeringShort: "Chuyên môn",
      contact: "Liên hệ",
      contactShort: "Liên hệ",
    },
    labels: {
      language: "Ngôn ngữ",
      nowItFeels: "Hiện tại trông",
      selectedWork: "Dự án nổi bật",
      skills: "Kỹ năng",
      pipeline: "Cách tôi làm việc",
      engineering: "Thiên hướng kỹ thuật",
      nextPass: "Bước tiếp theo",
      viewRepository: "Xem repository",
      livePreview: "Xem bản chạy",
      viewProject: "Xem dự án",
      privateProject: "Dự án nội bộ",
      confidentialProject: "Dự án bảo mật",
      githubProfile: "Trang GitHub",
      connectWithMe: "Kết nối với tôi",
      connect: "Kết nối",
      connectSheet: "Tìm tôi",
      facebook: "Facebook",
      github: "GitHub",
      linkedin: "LinkedIn",
      phone: "Số điện thoại",
      zalo: "Zalo",
      viewCv: "Xem CV",
      downloadCv: "Tải CV",
      close: "Đóng",
      cvTitle: "Sơ yếu lý lịch",
      cvMissing:
        "Chỉ cần cập nhật file CV trong đường dẫn Supabase Storage là phần này sẽ hiển thị tự động.",
    },
    hero: {
      eyebrow: "Lập trình viên Fullstack — Java, Spring Boot, ReactJS",
      eyebrowStates: [
        "Lập trình Full-stack — Java, Spring Boot, ReactJS",
        "Lập trình Backend — Java, C#, Node.js",
        "Lập trình Frontend — Next.js, TypeScript, Tailwind",
      ],
      headingWords: ["Tôi", "là", "Khang.", "Code", "thật,", "deploy", "thật."],
      animatedWords: [
        "fullstack",
        "thực chiến",
        "bảo mật",
        "ổn định",
        "tối ưu",
      ],
      summary:
        "Mình xây dựng hệ thống backend, API và sản phẩm web với định hướng ổn định, thực tế và có thể triển khai được từ đầu đến cuối.",
      primaryAction: "Xem dự án",
      secondaryAction: "Xem kỹ năng",
      notes: [
        "Java, Spring Boot, ReactJS, Docker và CI/CD.",
        "Có kinh nghiệm production trong môi trường enterprise và banking thực tế.",
      ],
    },
    about: {
      eyebrow: "Về tôi",
      heading: "Tôi là Đinh Quốc Bảo Khang",
      description:
        "Tôi là lập trình viên full-stack tại TP. Hồ Chí Minh, tập trung mạnh vào backend, thiết kế API và xây dựng sản phẩm có thể triển khai thực tế từ đầu đến cuối. Tôi thích làm những hệ thống ổn định, bảo mật và thực sự hữu ích trong môi trường production.",
      facts: [
        { label: "Địa điểm", value: "TP. Hồ Chí Minh, Việt Nam" },
        { label: "Kinh nghiệm", value: "1+ năm" },
        {
          label: "Trọng tâm",
          value: "Hệ thống backend, thiết kế API và triển khai full-stack",
        },
        {
          label: "Sẵn sàng",
          value: "Full-time hoặc remote",
        },
      ],
    },
    panel: {
      captionLeft: "Dấu ấn developer",
      captionRight: "Song ngữ / định vị fullstack",
      primaryLabel: "Stack",
      primaryValue: "Java Spring Boot + ReactJS, deploy bằng Docker và CI/CD",
      secondaryLabel: "Trọng tâm hiện tại",
      secondaryValue:
        "Hệ thống backend, thiết kế API và xây dựng và triển khai sản phẩm full-stack ổn định",
    },
    capabilities: [
      "Định vị portfolio theo hướng fullstack thiên backend, không chỉ là UI",
      "Nền tảng Next.js App Router với phần client animation tách riêng",
      "Chuyển đổi nội dung song ngữ giữa tiếng Anh và tiếng Việt",
      "Có sẵn hướng mở rộng để lấy project từ GitHub, ghim dự án và thêm entry private",
    ],
    projectsHeading: "Các project fullstack triển khai cho môi trường thực tế.",
    featuredProjects: [
      {
        title: "Pacific Travel",
        type: "Nền tảng đặt tour du lịch fullstack",
        summary:
          "Nền tảng đặt tour với JWT auth, Redis caching, thanh toán và CI/CD.",
        impact:
          "Tăng tốc độ tải 45% sau tối ưu SQL và chuyển PostgreSQL + Supabase.",
        repoUrl: "https://github.com/Khang1z2t/Pacific",
        liveUrl: "https://pacifictravel.id.vn/",
      },
      {
        title: "BookStore",
        type: "Nền tảng thương mại + quy trình admin",
        summary:
          "Web app CRUD quản lý sách/đơn với ReactJS frontend và Spring Boot backend.",
        impact:
          "Tích hợp Keycloak phân quyền và Camunda workflow theo hướng enterprise.",
        repoUrl: "https://github.com/Khang1z2t/BookStore",
      },
      {
        title: "Hệ thống E-Form & Phê duyệt nội bộ ACB",
        type: "Thực tập production tại ngân hàng doanh nghiệp",
        summary:
          "Bảo trì và cải tiến nền tảng workflow nội bộ cho e-form, phê duyệt và nghiệp vụ liên quan thẻ tại ACB. Bắt đầu 3 tháng tại FPT IS, sau đó được điều qua ACB làm on-site.",
        impact:
          "Đóng góp cho cả vận hành và cải tiến liên tục về độ ổn định, tốc độ xử lý quy trình và khả năng sử dụng trong môi trường banking được kiểm soát.",
        visibility: "confidential",
      },
    ],
    skillsHeading: "Tư duy backend làm gốc, kỹ năng fullstack làm đầu ra.",
    skillGroups: [
      { title: "Ngôn ngữ" },
      { title: "Frontend" },
      { title: "Backend" },
      { title: "Dữ liệu & công cụ" },
    ],
    pipelineHeading:
      "Một quy trình đơn giản cho cách mình tiếp cận bài toán và triển khai sản phẩm.",
    pipelineDescription:
      "Phần này nói về cách mình làm việc chứ không phải cách portfolio được xây dựng. Nó mô tả cách mình thường đi từ việc hiểu bài toán đến lúc hoàn thiện một sản phẩm đủ ổn định để đưa vào sử dụng.",
    pipelineSteps: [
      {
        title: "Hiểu bài toán",
        status: "Bước 01",
        description:
          "Làm rõ mục tiêu sản phẩm, giới hạn kỹ thuật và vấn đề thực sự cần giải quyết trước khi thiết kế hay viết code.",
      },
      {
        title: "Thiết kế hệ thống",
        status: "Bước 02",
        description:
          "Xác định luồng API, mô hình dữ liệu, ranh giới service và hướng triển khai để quá trình build có định hướng rõ ràng.",
      },
      {
        title: "Build end-to-end",
        status: "Bước 03",
        description:
          "Triển khai backend, nối với frontend và đảm bảo sản phẩm hoạt động như một hệ thống hoàn chỉnh thay vì những phần rời rạc.",
      },
      {
        title: "Kiểm tra và tinh chỉnh",
        status: "Bước 04",
        description:
          "Xử lý edge case, tăng độ ổn định và hoàn thiện trải nghiệm cuối để sản phẩm đủ tốt cho việc triển khai và bảo trì.",
      },
    ],
    engineeringHeading: "Tư duy backend-first, làm chủ toàn bộ fullstack.",
    engineeringDescription:
      "Mình tập trung vào những phần quyết định độ tin cậy khi chạy production: auth flow bảo mật, API ổn định, và pipeline triển khai chịu được thay đổi. Frontend vẫn đi theo user flow và mục tiêu sản phẩm để trải nghiệm nhất quán.",
    engineeringPoints: [
      "Xây API Spring Boot theo hướng production với JWT/Keycloak, service boundary rõ ràng và mô hình dữ liệu ưu tiên khả năng bảo trì dài hạn.",
      "Làm frontend bằng ReactJS + Tailwind để vừa linh hoạt khi phát triển, vừa bám sát hành vi người dùng và mục tiêu kinh doanh.",
      "Có kinh nghiệm production thực tế trong hệ thống ngân hàng, deploy bằng Docker, và vận hành quy trình GitHub Actions CI/CD qua nhiều vòng phát hành.",
    ],
    contactHeading:
      "Đang tìm kiếm vị trí Junior Fullstack hoặc Backend tại TP. Hồ Chí Minh.",
    contactDescription:
      "Mình sẵn sàng đóng góp từ ngày đầu — dù là xây API, bảo trì hệ thống, hay ship tính năng end-to-end. Liên hệ qua email hoặc kết nối trên LinkedIn nhé.",
    contactEmail: "khangbao3008@gmail.com",
    contactPhone: "0865399254",
    facebookUrl: "https://www.facebook.com/Yuno1z2t/",
    githubUrl: "https://github.com/Khang1z2t",
    linkedinUrl: "https://www.linkedin.com/in/yunok/",
  },
};
