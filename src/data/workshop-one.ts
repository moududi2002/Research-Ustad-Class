// src/data/workshop-one.ts

import type { Slide } from '@/types/slide';

/* =========================================================
   WORKSHOP ONE — Part 1 (Slides 1–15)
   "Research: What, Why and Its Importance in Higher Study"
   ========================================================= */

export const workshopOneMeta = {
  slug: 'workshop-one',
  title: 'Research: What, Why and Its Importance in Higher Study',
  subtitle: 'Workshop Part 1 — A 60-Minute Academic Session',
  date: 'October 2026',
  instructor: 'Research Ustad Classes',
  duration: '120 Minutes',
  level: 'Beginner',
  logo: '/RU_logo.png',
};

export const workshopOneSlides: Slide[] = [
  /* --------------------------------------------------------- */
  /* Slide 1 — Cover                                           */
  /* --------------------------------------------------------- */
  {
    id: 1,
    type: 'cover',
    title: 'Research: What, Why and Its Importance in Higher Study',
    subtitle: 'Workshop Part 1 — A 60-Minute Academic Session',
    speaker: 'Anichur Rahman, Founder & CEO',
    date: 'October 2026',
    background:
      'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1920&q=80',
    logo: '/RU_logo.png',
    duration: '60 Minutes',
  },

  
  /* --------------------------------------------------------- */
  /* Slide 2 — speaker indroductoon                            */
  /* --------------------------------------------------------- */
  {
  id: 2,
  type: 'speaker-profile',
  title: 'Meet Your Speaker',
  speaker: {
    name: 'Md. Abul Ala Moududi',
    designation: 'Executive Director, Research Ustad',
    image: '/images/speakers/moududi.png',

    education: [
      'B.Sc. in Computer Science & Engineering',
      'National Institute of Textile Engineering & Research (University of Dhaka)',
    ],

    profession: [
      'Executive Director, Research Ustad',
      'Full Stack Developer',
      'Research Mentor',
    ],

    experience: [
      'Academic Profile Building',
      'Higher Study Mentorship',
      'Research Training',
    ],

    impact: [
      'IEEE Indexed Research Publication',
      'Brain Tumor MRI Research',
      'Federated TinyML BCI Research',
    ],

    links: [
      {
        label: 'LinkedIn',
        url: 'https://linkedin.com/in/abul-ala-moududi',
      },
      {
        label: 'Portfolio',
        url: 'https://moududi.researchustad.org',
      },
      {
        label: 'Research Ustad',
        url: 'https://researchustad.org',
      },
    ],
  },
},


  /* --------------------------------------------------------- */
  /* Slide 3 — Ice Breaking (LIVE POLL)                        */
  /* --------------------------------------------------------- */
  {
    id: 3,
    type: 'poll-live',
    title: 'Ice Breaking',
    pollSlug: 'ice-breaker-1',
    liveEnabled: true,
    fallbackQuestion: 'Why do you want to learn Research?',
    fallbackOptions: [
      { id: 'opt1', label: 'Scholarship',    weight: 30 },
      { id: 'opt2', label: 'Higher Study',   weight: 25 },
      { id: 'opt3', label: 'Publication',    weight: 20 },
      { id: 'opt4', label: 'Career Growth',  weight: 15 },
      { id: 'opt5', label: 'Pure Curiosity', weight: 10 },
    ],
    footnote:
      'Research is not a single-track path — every motivation is valid and often they overlap.',
  },


  /* --------------------------------------------------------- */
  /* Slide 4 — What is Research?                               */
  /* --------------------------------------------------------- */
  {
    id: 4,
    type: 'flow',
    title: 'What is Research?',
    definition:
      'Research is a systematic process of discovering new knowledge, validating ideas and solving problems through evidence-based inquiry.',
    steps: ['Question', 'Investigation', 'Analysis', 'Knowledge'],
    caption:
      'A good research question is narrow, answerable and meaningful — everything else follows.',
  },

  /* --------------------------------------------------------- */
  /* Slide 5 — Why Research Matters                            */
  /* --------------------------------------------------------- */
  {
    id: 5,
    type: 'checklist',
    title: 'Why Research Matters',
    intro: 'Research is the engine behind every meaningful advance we use today.',
    items: [
      'Solves real-world problems with evidence',
      'Enables informed, data-driven decisions',
      'Drives innovation across every industry',
      'Advances collective human knowledge',
      'Builds critical thinking and intellectual independence',
    ],
    footnote:
      'From vaccine development to the smartphone in your pocket — every innovation began as a research question.',
  },

  /* --------------------------------------------------------- */
  /* Slide 6 — Research Around Us                              */
  /* --------------------------------------------------------- */
  {
    id: 6,
    type: 'image-cards',
    title: 'Research Around Us',
    subtitle: 'Five everyday technologies that exist because of decades of research.',
    cards: [
      {
        src: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&w=800&q=80',
        alt: 'Search engine illustration',
        caption: 'Google PageRank — the graph algorithm behind modern search',
      },
      {
        src: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
        alt: 'AI chat assistant',
        caption: 'ChatGPT — built on the Transformer architecture (Vaswani et al., 2017)',
      },
      {
        src: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80',
        alt: 'MRI brain scan',
        caption: 'AI-based MRI tumour detection — saving radiologists critical time',
      },
      {
        src: 'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?auto=format&fit=crop&w=800&q=80',
        alt: 'Self driving car sensors',
        caption: 'Self-driving cars — a fusion of computer vision, robotics and control theory',
      },
      {
        src: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=800&q=80',
        alt: 'Weather satellite',
        caption: 'Weather forecasting — numerical models run on supercomputers',
      },
    ],
  },

  /* --------------------------------------------------------- */
  /* Slide 7 — Research vs Normal Learning                     */
  /* --------------------------------------------------------- */
  {
    id: 7,
    type: 'comparison-table',
    title: 'Research vs. Normal Learning',
    columns: ['Learning', 'Research'],
    rows: [
      { aspect: 'Goal',        left: 'Read existing knowledge',   right: 'Create new knowledge' },
      { aspect: 'Approach',    left: 'Follow the textbook',       right: 'Ask unanswered questions' },
      { aspect: 'Role',        left: 'Consume information',       right: 'Produce information' },
      { aspect: 'Outcome',     left: 'Understand the known',      right: 'Extend the known' },
      { aspect: 'Evaluation',  left: 'Exams and grades',          right: 'Peer review and citation' },
    ],
    footnote:
      'Learning is the foundation — research is the next step on top of it.',
  },

  /* --------------------------------------------------------- */
  /* Slide 8 — Research Cycle                                  */
  /* --------------------------------------------------------- */
  {
    id: 8,
    type: 'cycle',
    title: 'The Research Cycle',
    subtitle: 'A repeatable loop — not a straight line.',
    steps: [
      'Problem',
      'Literature Review',
      'Methodology',
      'Experiment',
      'Analysis',
      'Publication',
    ],
    caption:
      'Publication is not the end — it feeds back into the next question and the cycle continues.',
  },

  /* --------------------------------------------------------- */
  /* Slide 9 — Research Fields                                 */
  /* --------------------------------------------------------- */
  {
    id: 9,
    type: 'mindmap',
    title: 'Research Fields',
    centre: 'Research',
    branches: [
      { label: 'AI / Machine Learning',   icon: '🤖' },
      { label: 'Medical Imaging',         icon: '🩻' },
      { label: 'Cybersecurity',           icon: '🔐' },
      { label: 'Networking',              icon: '🌐' },
      { label: 'Robotics',                icon: '🦾' },
      { label: 'Natural Language Processing', icon: '💬' },
      { label: 'Data Science',            icon: '📊' },
      { label: 'Human–Computer Interaction', icon: '🧑‍💻' },
    ],
  },

  /* --------------------------------------------------------- */
  /* Slide 10 — Publication Ecosystem                           */
  /* --------------------------------------------------------- */
  {
    id: 10,
    type: 'flow',
    title: 'The Publication Ecosystem',
    steps: [
      'Research Idea',
      'Paper Writing',
      'Conference / Journal',
      'Publication',
      'Citation',
    ],
    caption:
      'Each stage adds credibility. Citations are the currency of academic impact.',
  },

  /* --------------------------------------------------------- */
  /* Slide 11 — Impact of Research (Chart)                     */
  /* --------------------------------------------------------- */
  {
    id: 11,
    type: 'chart',
    chartType: 'bar',
    title: 'The Impact of Research',
    subtitle: 'How visibility compounds from idea to citation.',
    data: [
      { name: 'Idea',        value: 5   },
      { name: 'Paper',       value: 20  },
      { name: 'Publication', value: 50  },
      { name: 'Citation',    value: 100 },
    ],
    unit: 'Relative visibility',
    footnote:
      'Illustrative scale — real citation curves vary by field, but the compounding effect is universal.',
  },

  /* --------------------------------------------------------- */
  /* Slide 12 — Research & Higher Study                        */
  /* --------------------------------------------------------- */
  {
    id: 12,
    type: 'checklist',
    title: 'How Research Helps in Higher Study',
    intro: 'A strong research profile is one of the most transferable assets you can build.',
    items: [
      'Strengthens MS admission applications',
      'Essential for funded PhD positions',
      'Improves scholarship competitiveness',
      'Opens Research Assistant (RA) opportunities',
      'Builds strong professor recommendations',
      'Signals intellectual maturity to selection committees',
    ],
  },

  /* --------------------------------------------------------- */
  /* Slide 13 — Scholarship Reality (Pie Chart)                */
  /* --------------------------------------------------------- */
  {
    id: 13,
    type: 'chart',
    chartType: 'pie',
    title: 'Scholarship Reality — What Committees Actually Weigh',
    subtitle: 'A typical weighting pattern across competitive international programs.',
    data: [
      { name: 'CGPA',                  value: 30 },
      { name: 'Research Experience',   value: 25 },
      { name: 'SOP',                   value: 15 },
      { name: 'IELTS / TOEFL',         value: 15 },
      { name: 'LOR',                   value: 15 },
    ],
    unit: '%',
    footnote:
      'Approximate pattern based on common admission guidelines. Actual weights vary by university and program.',
  },

  /* --------------------------------------------------------- */
  /* Slide 14 — Real Example (Student A vs Student B)          */
  /* --------------------------------------------------------- */
  {
    id: 14,
    type: 'comparison',
    title: 'Real Example — The Two Applicants',
    subtitle:
      'Illustrative scenario based on common admission committee decisions. Names are fictional.',
    left: {
      heading: 'Student A',
      rows: [
        { label: 'CGPA',       value: '3.90' },
        { label: 'IELTS',      value: '7.5'  },
        { label: 'Research',   value: 'None' },
        { label: 'Publications', value: '0'  },
      ],
    },
    right: {
      heading: 'Student B',
      rows: [
        { label: 'CGPA',       value: '3.50' },
        { label: 'IELTS',      value: '7.0'  },
        { label: 'Research',   value: '2 years, 2 projects' },
        { label: 'Publications', value: '2'  },
      ],
      highlight: true,
    },
    conclusion:
      'In many funded programs, Student B — despite a lower CGPA — is the stronger candidate because research experience and publication record are directly aligned with academic potential.',
  },

  /* --------------------------------------------------------- */
  /* Slide 15 — Common Myths vs Reality                        */
  /* --------------------------------------------------------- */
  {
    id: 15,
    type: 'myth-reality',
    title: 'Common Myths About Research',
    myths: [
      'You need a huge budget',
      'You need a foreign supervisor',
      'You need a genius-level IQ',
      'You need an expensive laboratory',
      'You need prior connections',
    ],
    reality:
      'You need consistency, curiosity and the discipline to read, replicate and improve — again and again.',
  },

  /* --------------------------------------------------------- */
  /* Slide 16 — Key Takeaways                                  */
  /* --------------------------------------------------------- */
  {
    id: 16,
    type: 'checklist',
    title: 'Key Takeaways — Part 1',
    items: [
      'Research is a learnable skill, not a talent',
      'Start early — even a single project compounds over time',
      'Build a visible research portfolio (Scholar, GitHub, ORCID)',
      'Publications significantly strengthen higher-study applications',
      'Consistency beats natural talent in the long run',
    ],
    footnote:
      'Part 2 will show you exactly how to start — with zero lab, zero funding and only a laptop.',
  },


 /* --------------------------------------------------------- */
  /* Slide 17 — 10 Minutes Break                              */
  /* --------------------------------------------------------- */
  {
    id: 17,
    type: 'break',
    title: '10 Minutes Break',
    subtitle: 'Pause. Refresh. Connect.',
    duration: 600,
    activities: [
      {
        title: 'Refresh',
        description:
          'Step away from the screen, stretch, drink some water and give your mind a short reset.',
      },
      {
        title: 'Connect',
        description:
          'Talk to someone beside you. Share one research idea or one question you have after Part 1.',
      },
      {
        title: 'Reflect',
        description:
          'Think quietly: “What is one research problem I would genuinely like to explore?”',
      },
    ],
  },
];

/* =========================================================
   Part 2 slides are exported separately so the file stays
   readable. They will be appended in Step 2B as:
   export const workshopOneSlidesPart2: Slide[] = [ ... ];
   ========================================================= */

   /* =========================================================
   WORKSHOP ONE — Part 2 (Slides 16–30)
   "Resource Independent Research Journey"
   ========================================================= */

export const workshopOneSlidesPart2: Slide[] = [

    /* --------------------------------------------------------- */
  /* Slide 18 — Part 2 Cover                                   */
  /* --------------------------------------------------------- */
  {
    id: 18,
    type: 'cover',
    title: 'Resource Independent Research Journey',
    subtitle: 'Workshop Part 2 — From Curiosity to Research',
    speaker: 'Anichur Rahman, Founder & CEO',
    date: 'October 2026',
    background:
      'https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg',
    logo: '/RU_logo.png',
    duration: '60 Minutes',
  },

  /* --------------------------------------------------------- */
  /* Slide 19 — The Problem                                    */
  /* --------------------------------------------------------- */
  {
    id: 19,
    type: 'barrier',
    title: 'The Problem — Why Most People Never Start',
    intro:
      'These are the most common excuses students give before abandoning research entirely.',
    barriers: [
      'No mentor available',
      'No laboratory access',
      'No funding or scholarship',
      'No GPU or powerful hardware',
      'No professional connections',
      'No formal research training',
    ],
    footnote:
      'Notice something: every single one of these is an external condition — none of them describe the student themselves.',
  },

  /* --------------------------------------------------------- */
  /* Slide 20 — The Truth                                      */
  /* --------------------------------------------------------- */
  {
    id: 20,
    type: 'minimal-setup',
    title: 'The Truth About Starting',
    items: [
      'A laptop',
      'A stable internet connection',
      'Curiosity and consistency',
    ],
    image: {
      src: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80',
      alt: 'A minimal laptop desk setup',
      caption: 'Many published researchers began with exactly this setup.',
    },
    closing:
      'Expensive equipment accelerates research — it does not create it.',
  },

  /* --------------------------------------------------------- */
  /* Slide 21 — Research Resources (Free)                      */
  /* --------------------------------------------------------- */
  {
    id: 21,
    type: 'logo-cards',
    title: 'Free Research Resources You Already Have Access To',
    subtitle: 'No subscription. No institutional login required for most.',
    cards: [
      {
        name: 'Google Scholar',
        description: 'Search peer-reviewed papers, theses and citations across disciplines.',
        url: 'https://scholar.google.com',
      },
      {
        name: 'arXiv',
        description: 'Open-access preprints in physics, mathematics, CS and more.',
        url: 'https://arxiv.org',
      },
      {
        name: 'Semantic Scholar',
        description: 'AI-powered academic search with citation graphs and TLDR summaries.',
        url: 'https://www.semanticscholar.org',
      },
      {
        name: 'Papers with Code',
        description: 'Research papers paired with their official code implementations.',
        url: 'https://paperswithcode.com',
      },
      {
        name: 'Kaggle',
        description: 'Datasets, notebooks and community competitions for applied research.',
        url: 'https://www.kaggle.com',
      },
      {
        name: 'GitHub',
        description: 'Version control, open-source codebases and collaborative tooling.',
        url: 'https://github.com',
      },
    ],
    footnote: 'All of these are free and used daily by active researchers worldwide.',
  },

  /* --------------------------------------------------------- */
  /* Slide 22 — Learning Roadmap                               */
  /* --------------------------------------------------------- */
  {
    id: 22,
    type: 'timeline',
    title: 'Your Learning Roadmap',
    subtitle: 'A five-stage path from beginner to first publication.',
    steps: [
      { label: 'Learn Basics',   caption: 'Python, statistics and domain fundamentals' },
      { label: 'Read Papers',    caption: 'Start with survey papers, then specific works' },
      { label: 'Replicate',      caption: 'Reproduce results from an existing paper' },
      { label: 'Improve',        caption: 'Modify the method, dataset, or evaluation' },
      { label: 'Publish',        caption: 'Write up and submit to a conference or journal' },
    ],
  },

  /* --------------------------------------------------------- */
  /* Slide 23 — Paper Reading Strategy                         */
  /* --------------------------------------------------------- */
  {
    id: 23,
    type: 'numbered-list',
    title: 'How to Read a Research Paper',
    intro:
      'Read papers in this order — not from start to finish. It saves hours and improves comprehension.',
    items: [
      {
        title: 'Abstract',
        description: 'Understand the problem, the claimed contribution and the result.',
      },
      {
        title: 'Figures & Tables',
        description: 'Charts and result tables reveal what the paper actually achieves.',
      },
      {
        title: 'Results & Discussion',
        description: 'Look at the numbers and the authors\u2019 interpretation of them.',
      },
      {
        title: 'Methodology',
        description: 'Only now dive into the technical details of how it was done.',
      },
      {
        title: 'Related Work (optional)',
        description: 'Useful when you are building a literature map for your own paper.',
      },
    ],
  },

  /* --------------------------------------------------------- */
  /* Slide 24 — Free Datasets                                  */
  /* --------------------------------------------------------- */
  {
    id: 24,
    type: 'logo-cards',
    title: 'Free Datasets You Can Start With Today',
    subtitle: 'Real datasets used in published research across ML, healthcare and engineering.',
    cards: [
      {
        name: 'Kaggle Datasets',
        description: 'Tens of thousands of public datasets across every domain.',
        url: 'https://www.kaggle.com/datasets',
      },
      {
        name: 'PhysioNet',
        description: 'Biomedical signals and medical datasets (ECG, EEG, ICU).',
        url: 'https://physionet.org',
      },
      {
        name: 'UCI ML Repository',
        description: 'Classic benchmark datasets used in machine learning courses.',
        url: 'https://archive.ics.uci.edu',
      },
      {
        name: 'OpenBMI',
        description: 'Open brain-computer interface dataset for EEG research.',
        url: 'https://bbci.de/competition',
      },
      {
        name: 'HAM10000',
        description: '10,000 dermatoscopic images for skin lesion classification.',
        url: 'https://dataverse.harvard.edu/dataset.xhtml?persistentId=doi:10.7910/DVN/DBW86T',
      },
    ],
    footnote:
      'Pick one dataset, understand it deeply and build something small — that is a project.',
  },

  /* --------------------------------------------------------- */
  /* Slide 25 — Free Tools                                     */
  /* --------------------------------------------------------- */
  {
    id: 25,
    type: 'logo-cards',
    title: 'The Free Toolkit of a Modern Researcher',
    subtitle: 'Everything here is free, industry-standard and worth learning well.',
    cards: [
      {
        name: 'Python',
        description: 'The dominant language for data science and scientific computing.',
        url: 'https://www.python.org',
      },
      {
        name: 'Google Colab',
        description: 'Free cloud notebooks with optional GPU access — no setup required.',
        url: 'https://colab.research.google.com',
      },
      {
        name: 'VS Code',
        description: 'A lightweight, extensible editor for code and LaTeX.',
        url: 'https://code.visualstudio.com',
      },
      {
        name: 'Zotero',
        description: 'Free reference manager for collecting and citing papers.',
        url: 'https://www.zotero.org',
      },
      {
        name: 'Overleaf',
        description: 'Collaborative online LaTeX editor — the standard for papers.',
        url: 'https://www.overleaf.com',
      },
    ],
    footnote:
      'Master these five tools and you can run a complete research workflow from a laptop.',
  },

  /* --------------------------------------------------------- */
  /* Slide 26 — Research Workflow                              */
  /* --------------------------------------------------------- */
  {
    id: 26,
    type: 'flow',
    title: 'A Typical Research Workflow',
    steps: [
      'Dataset',
      'Preprocessing',
      'Model Training',
      'Evaluation',
      'Paper Writing',
    ],
    caption:
      'Every published paper is the visible tip of an invisible pipeline like this one.',
  },

  /* --------------------------------------------------------- */
  /* Slide 27 — Common Mistakes                                */
  /* --------------------------------------------------------- */
  {
    id: 27,
    type: 'warning-cards',
    title: 'Common Mistakes Beginners Make',
    cards: [
      {
        title: 'Copying papers',
        description:
          'Reproducing results is fine; claiming them as yours is plagiarism and ends careers.',
      },
      {
        title: 'Skipping literature review',
        description:
          'You will accidentally re-invent something that already exists — and reviewers will notice.',
      },
      {
        title: 'No documentation',
        description:
          'If you cannot reproduce your own experiment three months later, neither can a reviewer.',
      },
      {
        title: 'Poor writing',
        description:
          'Even strong research gets rejected when the paper is unclear, unstructured, or grammatically weak.',
      },
      {
        title: 'Chasing novelty only',
        description:
          'A well-executed study on an existing problem often beats a shallow attempt at a new one.',
      },
    ],
  },

  /* --------------------------------------------------------- */
  /* Slide 28 — Building Research Profile                      */
  /* --------------------------------------------------------- */
  {
    id: 28,
    type: 'ecosystem',
    title: 'Building a Visible Research Profile',
    subtitle:
      'Create all of these early — even before your first publication. They compound.',
    centre: 'Your Research Identity',
    nodes: [
      'Google Scholar',
      'ORCID',
      'ResearchGate',
      'GitHub',
      'LinkedIn',
      'Personal Website',
    ],
  },

  /* --------------------------------------------------------- */
  /* Slide 29 — First Publication Roadmap                      */
  /* --------------------------------------------------------- */
  {
    id: 29,
    type: 'timeline',
    title: 'Your First Publication — A 5-Month Roadmap',
    subtitle: 'A realistic, part-time timeline for a beginner.',
    steps: [
      { label: 'Month 1', caption: 'Learning — Python, math and domain basics' },
      { label: 'Month 2', caption: 'Paper Reading — 20\u201330 papers, notes, literature map' },
      { label: 'Month 3', caption: 'Implementation — replicate one paper\u2019s result' },
      { label: 'Month 4', caption: 'Writing — draft with LaTeX on Overleaf' },
      { label: 'Month 5', caption: 'Submission — choose venue, format and submit' },
    ],
  },

  /* --------------------------------------------------------- */
  /* Slide 30 — Research Ustad Ecosystem                       */
  /* --------------------------------------------------------- */
  {
    id: 30,
    type: 'ecosystem',
    title: 'The Research Ustad Ecosystem',
    subtitle: 'A complete support system — from first lesson to first publication.',
    centre: 'Research Ustad Classes',
    nodes: [
      'Training',
      'Mentorship',
      'Team Projects',
      'Publication Support',
      'Peer Community',
      'Career Guidance',
    ],
  },

  /* --------------------------------------------------------- */
  /* Slide 31 — Success Stories                                */
  /* --------------------------------------------------------- */
  {
    id: 31,
    type: 'achievement-cards',
    title: 'Success Stories',
    subtitle:
      'Illustrative milestones — many students begin with no lab, no mentor and no funding.',
    cards: [
      {
        name: 'Beginner Track',
        achievement: 'First conference paper',
        detail:
          'Started with a Kaggle dataset and a laptop. Submitted to a regional IEEE conference within 6 months.',
      },
      {
        name: 'Higher-Study Track',
        achievement: 'Funded MS admission',
        detail:
          'Two workshop papers and a strong SOP led to a fully-funded MS position abroad.',
      },
      {
        name: 'Research Track',
        achievement: 'Journal publication',
        detail:
          'Extended an undergraduate project into a peer-reviewed journal article.',
      },
    ],
    footnote:
      'Student names are withheld for privacy. Timelines are based on typical outcomes, not guarantees.',
  },

  /* --------------------------------------------------------- */
  /* Slide 32 — Action Plan                                    */
  /* --------------------------------------------------------- */
  {
    id: 32,
    type: 'roadmap',
    title: 'Your Action Plan — Starting Today',
    items: [
      { when: 'Today',      action: 'Create a Google Scholar and ORCID profile' },
      { when: 'This Week',  action: 'Read three papers from arXiv in your field' },
      { when: 'This Month', action: 'Pick one dataset and start your first mini-project' },
      { when: 'Next Month', action: 'Document your work on GitHub and write a short report' },
    ],
    closing:
      'Progress is cumulative. Ten minutes a day beats a burst of motivation once a year.',
  },

  /* --------------------------------------------------------- */
  /* Slide 33 — Thank You + Q&A                                */
  /* --------------------------------------------------------- */
  {
    id: 33,
    type: 'closing',
    title: 'Thank You — Questions & Discussion',
    quote:
      'Research is not for geniuses. Research is for curious and consistent people.',
    quoteAuthor: 'Research Ustad Classes',
    contact: 'info@researchustad.org',
    website: 'www.researchustad.org',
    logo: '/RU_logo.png',
    // qrImage: qr.png, // আপনি চাইলে পরে /qr.png দিতে পারবেন
  },
 /* --------------------------------------------------------- */
  /* Slide 34 -- Promotion                                     */
  /* --------------------------------------------------------- */
  
  {
  id: 34,
  type: 'promotion',
  title: 'Stay Connected. Keep Researching.',
  subtitle:
    'Complete your attendance and feedback, then continue your research journey with Research Ustad.',

  attendanceFeedbackUrl: 'https://class.researchustad.org/atendence',

  courseTitle: 'Research Fundamentals',
  courseSubtitle:
    'A structured 3-month journey from zero to advanced research — learn, practice and build your research profile step by step.',
  courseDuration: '3 Months',
  courseModules: 5,

  discountCode: 'RUW26/01',
  discountPercent: 25,
  discountCondition:
    'Workshop participants can claim this discount by registering with the same email address used for this workshop registration.',
},

];