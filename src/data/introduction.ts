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
    type: 'checklist',
    title: 'About Research Ustad',
    intro:
      'An Academic Research & Mentorship Community',
    items: [
      'A community dedicated to helping students and early-career researchers grow academically.',
      'Research mentorship and academic profile development for stronger research portfolios.',
      'Practical research training, from idea development and methodology to academic writing.',
      'Guidance on research publication, scholarly communication and responsible research practices.',
      'Preparation for higher studies, international opportunities and scholarship applications.',
      'A collaborative environment connecting learners, researchers and mentors.',
    ],
    footnote:
      'Our mission is to make research knowledge, mentorship and academic opportunities more accessible.',
  },

  // Slide 2 — Meet Our Team
  {
    id: 3,
    type: 'logo-cards',
    title: 'Meet Our Team',
    subtitle: 'The people behind our research community',
    cards: [
      {
        name: '👤 [Team Member Name]',
        description: '[Designation] · [Research expertise]',
        url: 'https://researchustad.org/team-members',
      },
      {
        name: '🎓 [Team Member Name]',
        description: '[Designation] · [Academic background]',
        url: 'https://researchustad.org/team-members',
      },
      {
        name: '🔬 [Team Member Name]',
        description: '[Designation] · [Research interests]',
        url: 'https://researchustad.org/team-members',
      },
      {
        name: '🤝 [Team Member Name]',
        description: '[Designation] · [Area of contribution]',
        url: 'https://researchustad.org/team-members',
      },
    ],
    footnote:
      'Replace these placeholders with actual team members, roles and profile links.',
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
        achievement: '[Research Projects]',
        detail: 'Ongoing research and scholarly collaboration',
      },
      {
        name: '📚 Publications',
        achievement: '[Publication Count]',
        detail: 'Research papers and publication support',
      },
      {
        name: '🎓 Mentorship',
        achievement: '[Students Mentored]',
        detail: 'Research guidance and academic development',
      },
      {
        name: '🌍 Higher Study',
        achievement: '[Scholarship Recipients]',
        detail: 'International education and scholarship guidance',
      },
      {
        name: '🧑‍🏫 Training',
        achievement: '[Workshops & Classes]',
        detail: 'Practical learning and research training',
      },
      {
        name: '🤝 Community',
        achievement: '[Community Members]',
        detail: 'A collaborative academic network',
      },
    ],
    footnote:
      'Replace all bracketed values with verified Research Ustad statistics.',
  },

  // Slide 4 — CEO Profile
  {
    id: 5,
    type: 'achievement-cards',
    title: 'Meet Our Founder & CEO',
    subtitle:
      'Anichur Rahman · PhD Student in Applied Computing, Georgia Southern University',
    cards: [
      {
        name: '📄 Publications',
        achievement: '75+',
        detail: 'Peer-reviewed publications',
      },
      {
        name: '📈 Research Impact',
        achievement: '4,490+ Citations',
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
        detail: 'Georgia Southern University · 2026–2027',
      },
      {
        name: '🥇 Research Award',
        achievement: 'Averitt Award',
        detail: 'Excellence in Graduate Research · 2026',
      },
      {
        name: '🔐 Research Areas',
        achievement: 'AI · Cybersecurity · Blockchain',
        detail: 'Quantum sensing, smart healthcare and wearable intelligence',
      },
    ],
    footnote:
      'Also received the BTMA Gold Medal for Excellence in Research (2023–2024).',
  },

  // Slide 5 — Student Success Story
  {
    id: 6,
    type: 'achievement-cards',
    title: 'A Research Success Story',
    subtitle: '[Student Name] · [University / Department]',
    cards: [
      {
        name: '📄 Publications',
        achievement: '[Total Publications]',
        detail: '[Journal papers · Conference papers]',
      },
      {
        name: '📈 Citations',
        achievement: '[Total Citations]',
        detail: 'h-index: [Value] · [Other research impact]',
      },
      {
        name: '🎓 Scholarships',
        achievement: '[Scholarship Name]',
        detail: '[University · Country · Funding details]',
      },
      {
        name: '🏅 Achievements',
        achievement: '[Major Achievement]',
        detail: '[Awards · Research recognition · Other outcomes]',
      },
      {
        name: '🤝 Research Journey',
        achievement: '[Research Ustad Contribution]',
        detail: '[Mentorship · Training · Collaboration]',
      },
      {
        name: '🌍 Next Milestone',
        achievement: '[Current Position / Opportunity]',
        detail: '[Future study, research or career outcome]',
      },
    ],
    footnote:
      'Replace with a real student story and verified achievements before presenting.',
  },
];
