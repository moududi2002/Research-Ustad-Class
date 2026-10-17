// src/data/introduction.ts

import type { Slide } from '@/types/slide';

export const introductionMeta = {
  title: 'Introduction to Research Ustad',
  subtitle: 'Our Mission, Team, Impact and Success Stories',
};

export const introductionSlides: Slide[] = [
  // Slide 1 — About Research Ustad
  {
    id: 1,
    type: 'cover',
    title: 'Research Ustad',
    subtitle:
      'Empowering researchers through mentorship, research training and global higher-study opportunities.',
    speaker: 'Research Ustad Team',
    date: 'Introduction',
    background:
      'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1920&q=80',
    logo: '/RU_logo.png',
    duration: '5 Slides',
  },

  
{
  id: 2,
  type: 'achievement-cards',
  title: 'About Research Ustad',
  subtitle: 'An Academic Research & Mentorship Community',
  cards: [
    {
      name: 'Research Mentorship',
      achievement: 'Expert Guidance',
      detail: 'Supporting students throughout their research journey.',
    },
    {
      name: 'Research & Publications',
      achievement: 'From Idea to Paper',
      detail: 'Research design, methodology, implementation and publication.',
    },
    {
      name: 'Academic Writing',
      achievement: 'Write with Confidence',
      detail: 'Academic writing, literature reviews, citations and manuscript preparation.',
    },
    {
      name: 'Higher Study Guidance',
      achievement: 'Global Opportunities',
      detail: 'Academic profile development, scholarships and graduate applications.',
    },
    {
      name: 'Workshops & Training',
      achievement: 'Practical Learning',
      detail: 'Hands-on sessions on research tools, methods and technology.',
    },
    {
      name: 'Research Collaboration',
      achievement: 'Growing Together',
      detail: 'Connecting learners and researchers for collaborative projects.',
    },
  ],
  footnote:
    'Our mission is to make research knowledge, mentorship and academic opportunities more accessible.',
},


  // Slide 2 — Meet Our Team
  
{
  id: 3,
  type: 'team-overview',
  title: 'Meet Our Team',
  subtitle: 'Experienced minds. Collaborative research. Global perspectives.',
  teamPageUrl: 'https://researchustad.org/team-members',
  roles: [
    { name: 'Team Lead', count: '09' },
    { name: 'Advisor', count: '08' },
    { name: 'Mentor', count: '15' },
    { name: 'Research Associate', count: '10' },
  ],
  message:
    'Our team brings together experienced researchers and academics with research and teaching experience in Bangladesh and abroad, working together to support the next generation of researchers.',
},


  // Slide 3 — Our Impact
  {
    id: 4,
    type: 'achievement-cards',
    title: 'Our Impact',
    subtitle: 'Building research skills and opening academic opportunities',
    cards: [
      {
        name: '🔬 Research',
        achievement: '10+ Research Projects',
        detail: 'Ongoing research and scholarly collaboration',
      },
      {
        name: '📚 Publications',
        achievement: '90+ Publications',
        detail: 'Research papers and publication support',
      },
      {
        name: '🎓 Mentorship',
        achievement: '50+ Students Mentored',
        detail: 'Research guidance and academic development',
      },
      {
        name: '🌍 Higher Study',
        achievement: '5+ Scholarship Recipients',
        detail: 'International education and scholarship guidance',
      },
      {
        name: '🧑‍🏫 Training',
        achievement: '5+ Workshops & Classes',
        detail: 'Practical learning and research training',
      },
      {
        name: '🤝 Community',
        achievement: '150+ Community Members',
        detail: 'A collaborative academic network',
      },
    ],
    footnote:
      'Dare to Dream Big.',
  },

  // Slide 4 — CEO Profile
  
{
  id: 5,
  type: 'ceo-profile',
  title: 'Meet Your CEO',
  subtitle:
    'The vision and leadership behind Research Ustad',
  image: '/images/anichur-rahman.png',
  cards: [
    {
      name: '📄 Publications',
      achievement: '75+',
      detail: 'Peer-reviewed publications',
    },
    {
      name: '📈 Research Impact',
      achievement: '4,800+ Citations',
      detail: 'h-index: 32',
    },
    {
      name: '🏆 Recognition',
      achievement: 'Top 2% Scientist',
      detail:
        'Elsevier–Stanford rankings: 261,348 (2024) · 131,353 (2025) · 95,393 (2026)',
    },
    {
      name: '🎓 Fellowship',
      achievement: 'Presidential Doctoral Research Fellow',
      detail:
        'Georgia Southern University, USA · 2026–2027',
    },
    {
      name: '🥇 Research Award',
      achievement: 'Averitt Award',
      detail: 'Excellence in Graduate Research · 2026',
    },
    {
      name: '🔐 Research Areas',
      achievement: 'AI · Cybersecurity · Blockchain',
      detail:
        'Quantum sensing, smart healthcare and wearable intelligence',
    },
  ],
  footnote:
    'Also received the BTMA Gold Medal for Excellence in Research (2023–2024).',
},


  // Slide 5 — Student Success Story
  {
  id: 6,
  type: 'success-story-image',
  title: 'A Research Success Story',
  subtitle: ' Tanjum An Tashrif· Ongoing MSc, Cyber Security, Military Institute of Science & Technology (MIST)',
  image: '/images/success-story.png',
},
];
