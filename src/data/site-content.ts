export type Locale = "en" | "vi";

export type LocalizedFeaturedProject = {
  title: string;
  type: string;
  summary: string;
  impact: string;
  repoUrl?: string;
  liveUrl?: string;
};

export type LocalizedSkillGroup = {
  title: string;
};

export type LocalizedPipelineStep = {
  title: string;
  status: string;
  description: string;
};

export type LocalizedContent = {
  brand: string;
  nav: {
    work: string;
    skills: string;
    pipeline: string;
    engineering: string;
    contact: string;
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
    githubProfile: string;
    connectWithMe: string;
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
      work: "Work",
      skills: "Skills",
      pipeline: "How I work",
      engineering: "Engineering",
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
      githubProfile: "GitHub profile",
      connectWithMe: "Connect with me",
      viewCv: "View CV",
      downloadCv: "Download CV",
      close: "Close",
      cvTitle: "Curriculum Vitae",
      cvMissing:
        "Add your CV file to public/resume/*.pdf and it will appear here automatically.",
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
    panel: {
      captionLeft: "Developer signal",
      captionRight: "Bilingual / fullstack framing",
      primaryLabel: "Stack",
      primaryValue:
        "Java Spring Boot + ReactJS, deployed with Docker and CI/CD",
      secondaryLabel: "Current focus",
      secondaryValue:
        "Backend systems, API design, and shipping stable full-stack products",
    },
    capabilities: [
      "Fullstack portfolio framing — backend-leaning, not just UI",
      "Next.js App Router base with isolated client animation layer",
      "Bilingual content switching between English and Vietnamese",
      "A clean path for GitHub-sourced projects, pinned selections, and private entries",
    ],
    projectsHeading:
      "Projects built end-to-end — from database design to production deployment.",
    featuredProjects: [
      {
        title: "Pacific Travel",
        type: "Fullstack Travel Booking Platform",
        summary:
          "Full-stack tour booking platform with JWT auth, Redis caching, and payment gateway integration. Deployed to DigitalOcean VPS via Docker, Nginx, and GitHub Actions CI/CD. Integrated Google Gemini API for AI-powered travel recommendations.",
        impact:
          "45% faster page load after SQL optimization and PostgreSQL + Supabase migration. Demonstrates end-to-end ownership from API design to production deployment.",
        repoUrl: "https://github.com/Khang1z2t/Pacific",
        liveUrl: "https://pacifictravel.id.vn/",
      },
      {
        title: "BookStore",
        type: "Ecommerce Platform + Admin Workflow",
        summary:
          "Full CRUD web app for book and order management with ReactJS frontend and Spring Boot backend. Integrated Keycloak for role-based access control and Camunda workflow engine for automated order processing.",
        impact:
          "Demonstrates ability to build both customer-facing storefront and internal admin tools within an enterprise-grade auth and workflow setup.",
        repoUrl: "https://github.com/Khang1z2t/BookStore",
      },
      {
        title: "ACB Bank E-Form System",
        type: "Enterprise Banking — Production Internship",
        summary:
          "Maintained mission-critical digital banking e-form systems for ACB Bank on-site during a 9-month internship at FPT IS. Performed bug fixes, functional and regression testing, code reviews, and security patches under strict enterprise banking standards.",
        impact:
          "Production-level exposure to high-stakes financial systems. Applied enterprise security practices alongside senior developers and QA in a regulated banking environment.",
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
    pipelineHeading:
      "A simple workflow for how I approach product and engineering work.",
    pipelineDescription:
      "This section is about how I work, not how the portfolio is built. It shows the way I usually move from understanding a problem to shipping something reliable.",
    pipelineSteps: [
      {
        title: "Understand the problem",
        status: "Step 01",
        description:
          "Clarify the product goal, technical constraints, and the real problem that needs to be solved before designing anything.",
      },
      {
        title: "Design the system",
        status: "Step 02",
        description:
          "Shape the API flow, data model, service boundaries, and delivery plan so implementation has a clear direction.",
      },
      {
        title: "Build end-to-end",
        status: "Step 03",
        description:
          "Implement the backend, connect the frontend, and make sure the product works as a complete system rather than isolated pieces.",
      },
      {
        title: "Test and refine",
        status: "Step 04",
        description:
          "Review edge cases, improve reliability, and polish the final result so it is practical enough to ship and maintain.",
      },
    ],
    engineeringHeading: "Backend-first thinking, fullstack delivery.",
    engineeringDescription:
      "I focus on the parts that make software actually work — secure auth flows, reliable APIs, and deployment pipelines that don't break. The frontend is there to serve clarity and usability, not the other way around.",
    engineeringPoints: [
      "I build production-ready APIs with Spring Boot, handling auth (JWT, Keycloak), data modeling, and service boundaries that can scale with the product.",
      "Frontend work is driven by user flow and business goals — ReactJS for interaction, Tailwind for speed, and component structure that stays maintainable.",
      "I've worked in real production environments: ACB Bank e-form systems, Docker-based deployments, GitHub Actions CI/CD, and DigitalOcean VPS.",
    ],
    contactHeading:
      "Open to Junior Fullstack or Backend roles in Ho Chi Minh City.",
    contactDescription:
      "I'm actively looking for a team where I can contribute from day one — whether that's building APIs, maintaining systems, or shipping features end-to-end. Feel free to reach out via email or connect on LinkedIn.",
    contactEmail: "khangbao3008@gmail.com",
    contactPhone: "0865399254",
    githubUrl: "https://github.com/Khang1z2t",
    linkedinUrl: "https://www.linkedin.com/in/yunok/",
  },
  vi: {
    brand: "KHANG",
    nav: {
      work: "Dự án",
      skills: "Kỹ năng",
      pipeline: "Cách tôi làm việc",
      engineering: "Chuyên môn",
      contact: "Liên hệ",
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
      githubProfile: "Trang GitHub",
      connectWithMe: "Kết nối với tôi",
      viewCv: "Xem CV",
      downloadCv: "Tải CV",
      close: "Đóng",
      cvTitle: "Sơ yếu lý lịch",
      cvMissing:
        "Chỉ cần thêm file CV của bạn vào public/resume/*.pdf là phần này sẽ hiển thị ngay.",
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
    panel: {
      captionLeft: "Dấu ấn developer",
      captionRight: "Song ngữ / định vị fullstack",
      primaryLabel: "Stack",
      primaryValue: "Java Spring Boot + ReactJS, deploy bằng Docker và CI/CD",
      secondaryLabel: "Trọng tâm hiện tại",
      secondaryValue:
        "Hệ thống backend, thiết kế API và ship sản phẩm full-stack ổn định",
    },
    capabilities: [
      "Định vị portfolio theo hướng fullstack thiên backend, không chỉ là UI",
      "Nền tảng Next.js App Router với phần client animation tách riêng",
      "Chuyển đổi nội dung song ngữ giữa tiếng Anh và tiếng Việt",
      "Có sẵn hướng mở rộng để lấy project từ GitHub, ghim dự án và thêm entry private",
    ],
    projectsHeading:
      "Các project xây từ đầu đến cuối — từ thiết kế database đến deploy production.",
    featuredProjects: [
      {
        title: "Pacific Travel",
        type: "Nền tảng đặt tour du lịch fullstack",
        summary:
          "Nền tảng đặt tour với JWT auth, Redis caching và tích hợp cổng thanh toán. Deploy lên DigitalOcean VPS qua Docker, Nginx và GitHub Actions CI/CD. Tích hợp Google Gemini API để gợi ý tour bằng AI.",
        impact:
          "Tải trang nhanh hơn 45% sau khi tối ưu SQL và chuyển sang PostgreSQL + Supabase. Thể hiện khả năng làm chủ toàn bộ luồng từ thiết kế API đến production.",
        repoUrl: "https://github.com/Khang1z2t/Pacific",
        liveUrl: "https://pacifictravel.id.vn/",
      },
      {
        title: "BookStore",
        type: "Nền tảng thương mại + quy trình admin",
        summary:
          "Web app CRUD đầy đủ cho quản lý sách và đơn hàng với ReactJS frontend và Spring Boot backend. Tích hợp Keycloak phân quyền và Camunda workflow engine để tự động hóa xử lý đơn.",
        impact:
          "Chứng minh khả năng xây cả giao diện người dùng lẫn công cụ quản trị nội bộ trong một hệ thống xác thực và workflow chuẩn enterprise.",
        repoUrl: "https://github.com/Khang1z2t/BookStore",
      },
      {
        title: "Hệ thống E-Form ACB Bank",
        type: "Thực tập production tại ngân hàng doanh nghiệp",
        summary:
          "Bảo trì hệ thống e-form ngân hàng điện tử của ACB Bank trong 9 tháng thực tập tại FPT IS. Sửa lỗi, kiểm thử chức năng và hồi quy, review code và vá bảo mật theo tiêu chuẩn banking enterprise.",
        impact:
          "Tiếp xúc với hệ thống tài chính thực tế yêu cầu cao. Áp dụng quy trình bảo mật doanh nghiệp cùng senior developer và đội QA trong môi trường banking được kiểm soát chặt.",
      },
    ],
    skillsHeading:
      "Bộ kỹ năng xây quanh sự ổn định backend và khả năng ship fullstack.",
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
    engineeringHeading: "Tư duy backend-first, ship được fullstack.",
    engineeringDescription:
      "Mình tập trung vào phần làm cho phần mềm thực sự chạy được — luồng xác thực bảo mật, API ổn định, và pipeline deploy không gãy. Frontend là để phục vụ trải nghiệm và mục tiêu sản phẩm, không phải ngược lại.",
    engineeringPoints: [
      "Xây API production-ready bằng Spring Boot — xử lý auth (JWT, Keycloak), thiết kế dữ liệu và ranh giới service đủ linh hoạt để mở rộng theo sản phẩm.",
      "Frontend được xây theo luồng người dùng và mục tiêu nghiệp vụ — ReactJS cho tương tác, Tailwind cho tốc độ, cấu trúc component dễ bảo trì lâu dài.",
      "Đã làm trong môi trường production thực tế: hệ thống e-form ACB Bank, deploy bằng Docker, CI/CD với GitHub Actions, VPS DigitalOcean.",
    ],
    contactHeading:
      "Đang tìm kiếm vị trí Junior Fullstack hoặc Backend tại TP. Hồ Chí Minh.",
    contactDescription:
      "Mình sẵn sàng đóng góp từ ngày đầu — dù là xây API, bảo trì hệ thống, hay ship tính năng end-to-end. Liên hệ qua email hoặc kết nối trên LinkedIn nhé.",
    contactEmail: "khangbao3008@gmail.com",
    contactPhone: "0865399254",
    githubUrl: "https://github.com/Khang1z2t",
    linkedinUrl: "https://www.linkedin.com/in/yunok/",
  },
};
