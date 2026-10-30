export const profile = {
  name: 'Milan Raj',
  role: 'Developer & Digital Innovation Specialist',
  intro: 'I turn ideas into useful digital experiences — blending web development, AI, automation and creative problem-solving.',
  email: 'your.email@example.com', // Replace with your professional email
  location: 'India',
  socials: [
    { label: 'GitHub', href: 'https://github.com/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
  ],
};

export const skills = [
  { name: 'React', group: 'Frontend' }, { name: 'JavaScript', group: 'Frontend' },
  { name: 'HTML & CSS', group: 'Frontend' }, { name: 'Python', group: 'Programming' },
  { name: 'FastAPI', group: 'Backend' }, { name: 'Firebase', group: 'Backend' },
  { name: 'MongoDB', group: 'Backend' }, { name: 'Three.js', group: 'Creative tech' },
  { name: 'AI / ML', group: 'Artificial intelligence' }, { name: 'YOLOv8', group: 'Computer vision' },
  { name: 'Sentiment Analysis', group: 'AI / Analytics' }, { name: 'Automation', group: 'Workflow' },
];

export const projects = [
  {
    number: '01', title: 'SocialPulse AI', category: 'AI · Social Listening · Analytics',
    description: 'A sentiment-analysis and social monitoring dashboard designed to track brand mentions, understand audience conversations and surface actionable insights.',
    tags: ['React', 'Firebase', 'Gemini API', 'Sentiment Analysis'], accent: 'violet',
    link: 'https://socialpulseai-iota.vercel.app/',
  },
  {
    number: '02', title: 'AI Cattle Breed Recognition', category: 'Computer Vision · Research',
    description: 'An image-based breed recognition concept for Indian cattle and buffaloes, exploring deep learning and visual feature extraction.',
    tags: ['YOLOv8', 'PyTorch', 'Computer Vision'], accent: 'blue', link: '#contact',
  },
  {
    number: '03', title: 'Online Protected Examination', category: 'Web application · AI',
    description: 'A role-based examination platform concept with student, instructor and admin workflows, plus AI-assisted identity verification and monitoring.',
    tags: ['React', 'AI Verification', 'Web App'], accent: 'pink', link: '#contact',
  },
];

export const experience = [
  { date: '2026 — PRESENT', role: 'Digital Brand Strategy (Screening & Monitoring)', org: 'Lovely Professional University', detail: 'Monitoring online conversations and brand mentions, reviewing external content, supporting information accuracy and helping maintain a consistent digital presence.' },
  { date: 'CONTINUOUS LEARNING', role: 'AI, Web Development & Automation', org: 'Independent projects', detail: 'Building practical projects across web applications, AI-powered analysis, computer vision and workflow automation.' },
];
