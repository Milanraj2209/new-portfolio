export const portfolioData = {
  profile: {
    name: 'Milan Raj',
    title: 'Transforming Ideas Into Digital Experiences.',
    roles: ['AI Enthusiast', 'Developer', 'Digital Innovation Specialist'],
    roleString: 'AI Enthusiast | Developer | Digital Innovation Specialist',
    heroTagline: 'CREATIVE 3D DEVELOPER & AI INNOVATION SPECIALIST',
    status: 'AVAILABLE FOR OPPORTUNITIES',
    bioHeading: 'WHO AM I?',
    bio: "I am Milan Raj, a technology enthusiast passionate about artificial intelligence, web development, automation, and digital innovation. I enjoy developing intelligent solutions and creating digital experiences that solve real-world problems.",
    extendedBio: "With a builder mindset and an eye for high-polish interactivity, I bridge cutting-edge AI models, computer vision systems, and robust full-stack web applications into seamless, production-ready experiences.",
    email: 'milanraj.dev@example.com', // Replace with your verified email
    location: 'Phagwara, Punjab, India',
    resumeUrl: '#contact', // Add resume PDF path e.g. '/resume.pdf'
    socials: {
      github: 'https://github.com/milanraj',
      linkedin: 'https://www.linkedin.com/in/milanraj',
      email: 'mailto:milanraj.dev@example.com'
    },
    metrics: [
      { label: 'Core Projects Shipped', value: '10+' },
      { label: 'AI & CV Architectures', value: '4+' },
      { label: 'Code Quality & Uptime', value: '99.9%' },
      { label: 'Creative Tech Stack', value: '3D/WebGL' }
    ]
  },

  skills: {
    frontend: [
      { name: 'React.js', level: 95, icon: '⚛️', color: '#61DAFB' },
      { name: 'JavaScript (ES6+)', level: 92, icon: '⚡', color: '#F7DF1E' },
      { name: 'HTML5 & CSS3', level: 95, icon: '🎨', color: '#E34F26' },
      { name: 'Tailwind CSS', level: 90, icon: '🌊', color: '#38BDF8' },
      { name: 'Three.js / WebGL', level: 85, icon: '🌐', color: '#A855F7' }
    ],
    backend: [
      { name: 'Python', level: 92, icon: '🐍', color: '#3776AB' },
      { name: 'FastAPI', level: 88, icon: '⚡', color: '#009688' },
      { name: 'Flask', level: 85, icon: '🧪', color: '#FFFFFF' },
      { name: 'REST APIs', level: 94, icon: '🔌', color: '#6366F1' }
    ],
    ai_ml: [
      { name: 'Generative AI', level: 90, icon: '🧠', color: '#EC4899' },
      { name: 'Machine Learning', level: 88, icon: '🤖', color: '#8B5CF6' },
      { name: 'YOLOv8', level: 86, icon: '👁️', color: '#10B981' },
      { name: 'PyTorch', level: 82, icon: '🔥', color: '#EE4C2C' },
      { name: 'TensorFlow', level: 80, icon: '📊', color: '#FF6F00' },
      { name: 'LangChain', level: 85, icon: '🔗', color: '#3B82F6' }
    ],
    tools: [
      { name: 'Firebase', level: 90, icon: '🔥', color: '#FFCA28' },
      { name: 'MongoDB', level: 88, icon: '🍃', color: '#47A248' },
      { name: 'Google Cloud (GCP)', level: 82, icon: '☁️', color: '#4285F4' },
      { name: 'GitHub & CI/CD', level: 92, icon: '🐙', color: '#E2E8F0' },
      { name: 'Vercel', level: 94, icon: '▲', color: '#FFFFFF' }
    ]
  },

  projects: [
    {
      id: 'socialpulse-ai',
      number: '01',
      title: 'SocialPulse AI',
      category: 'AI · Social Media Listening & Analytics',
      accentColor: '#8b5cf6',
      badge: 'Live Platform',
      description: 'An AI-powered social media sentiment analysis and monitoring platform designed to track brand health, analyze audience sentiment in real-time, detect negative mentions, and empower teams with actionable intelligence.',
      features: [
        'Real-time Sentiment Analysis',
        'Automated Negative Comment Detection',
        'Omnichannel Social Media Monitoring',
        'Competitor Intelligence & Benchmarking',
        'Brand Mention & Crisis Tracking',
        'Interactive Analytics & Insights Dashboard'
      ],
      techStack: ['React', 'Firebase', 'Gemini API', 'Sentiment NLP', 'Vite'],
      liveUrl: 'https://socialpulseai-iota.vercel.app/',
      githubUrl: 'https://github.com/milanraj/socialpulse-ai',
      featured: true
    },
    {
      id: 'ai-cattle-breed',
      number: '02',
      title: 'AI Cattle Breed Recognition',
      category: 'Computer Vision · Deep Learning · Research',
      accentColor: '#3b82f6',
      badge: 'Research Project',
      description: 'An advanced AI-based computer vision architecture specifically developed for accurately identifying and classifying Indian indigenous cattle and buffalo breeds from field images.',
      features: [
        'Multi-class Cattle & Buffalo Breed Classification',
        'High-accuracy Visual Feature Extraction',
        'YOLOv8 Real-time Bounding Box Detection',
        'Optimized PyTorch Model Inference Pipeline',
        'Field-ready Image Recognition Interface'
      ],
      techStack: ['YOLOv8', 'PyTorch', 'Computer Vision', 'Python', 'FastAPI'],
      liveUrl: '#contact',
      githubUrl: 'https://github.com/milanraj/cattle-breed-recognition',
      featured: true
    },
    {
      id: 'online-proctored-exam',
      number: '03',
      title: 'Online Protected Examination System',
      category: 'Full-Stack Web App · Computer Vision · Security',
      accentColor: '#ec4899',
      badge: 'Secure Platform',
      description: 'An enterprise-grade online examination and proctoring platform with dedicated role-based portals for students, educators, and administrators featuring automated AI monitoring and identity verification.',
      features: [
        'Dedicated Admin, Instructor & Student Dashboards',
        'Continuous AI Identity Verification via Webcam',
        'Real-time Malpractice & Tab-switch Detection',
        'Secure Online Examination Management & Timer',
        'Automated Evaluation & Proctored Audit Logs'
      ],
      techStack: ['React', 'FastAPI', 'Webcam AI', 'MongoDB', 'JWT Auth'],
      liveUrl: '#contact',
      githubUrl: 'https://github.com/milanraj/online-protected-exam',
      featured: true
    },
    {
      id: 'student-target-portal',
      number: '04',
      title: 'Student Target Management Portal',
      category: 'EdTech Portal · Workflow Automation · Analytics',
      accentColor: '#10b981',
      badge: 'Workflow Automation',
      description: 'A productivity and goal-tracking portal engineered for academic institutions to streamline target assignment, submission collection, and progress auditing across multiple cohorts.',
      features: [
        'Dynamic Monthly Target Allocation & Deadlines',
        'Student Submission Portals with Proof Links',
        'Comprehensive Multi-tier Admin Dashboard',
        'Real-time Cohort Performance Tracking',
        'Automated Compliance & Progress Reporting'
      ],
      techStack: ['React', 'Node.js', 'Firebase', 'Tailwind CSS', 'Chart.js'],
      liveUrl: '#contact',
      githubUrl: 'https://github.com/milanraj/student-target-management',
      featured: true
    }
  ],

  experience: [
    {
      period: 'JUNE 2026 — PRESENT',
      role: 'Digital Brand Strategy (Screening & Monitoring)',
      organization: 'Lovely Professional University',
      location: 'Phagwara, Punjab, India',
      description: "Working on improving and maintaining the university's online presence across digital platforms. Monitoring external websites, forums, education platforms, and online discussions, tracking brand mentions, ensuring information accuracy, responding to relevant student queries, and supporting digital brand visibility.",
      achievements: [
        'Monitored online reputation across 20+ discussion boards and educational portals',
        'Surfaced timely sentiment insights to uphold official brand positioning and clarity',
        'Coordinated rapid factual clarifications for prospective and enrolled students'
      ]
    },
    {
      period: '2025 — 2026',
      role: 'AI & Full-Stack Systems Developer',
      organization: 'Independent Innovation Projects',
      location: 'India',
      description: 'Researched, architected, and shipped production-grade AI solutions spanning generative AI integrations, computer vision pipelines (YOLOv8), and modern interactive web experiences.',
      achievements: [
        'Engineered SocialPulse AI sentiment analytics pipeline serving live users',
        'Built deep learning models for agricultural and institutional automation',
        'Crafted high-performance 3D interactive web experiences using Three.js and React'
      ]
    }
  ]
};
