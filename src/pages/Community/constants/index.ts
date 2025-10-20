export const COMMUNITY_CATEGORIES = {
  TECHNOLOGY: 'technology',
  BUSINESS: 'business',
  EDUCATION: 'education',
  ENTERTAINMENT: 'entertainment',
  SPORTS: 'sports',
  HEALTH: 'health',
  LIFESTYLE: 'lifestyle',
  OTHER: 'other'
} as const;

export const COMMUNITY_SORT_OPTIONS = {
  NEWEST: 'newest',
  POPULAR: 'popular',
  MEMBERS: 'members',
  NAME: 'name'
} as const;

export const MOCK_COMMUNITIES = [
  {
    id: '1',
    name: 'React Developers',
    description: 'A community for React developers to share knowledge, best practices, and help each other grow.',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=400&fit=crop',
    membersCount: 15420,
    category: 'technology',
    isVerified: true,
    createdAt: '2023-01-15',
    link: '/community/react-developers'
  },
  {
    id: '2',
    name: 'Startup Founders',
    description: 'Connect with fellow entrepreneurs, share experiences, and get advice on building successful startups.',
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=400&fit=crop',
    membersCount: 8900,
    category: 'business',
    isVerified: true,
    createdAt: '2023-02-20',
    link: '/community/startup-founders'
  },
  {
    id: '3',
    name: 'Online Learning Hub',
    description: 'Share courses, learning resources, and study tips with a global community of learners.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop',
    membersCount: 23500,
    category: 'education',
    isVerified: true,
    createdAt: '2023-03-10',
    link: '/community/online-learning'
  },
  {
    id: '4',
    name: 'Fitness Enthusiasts',
    description: 'Workout routines, nutrition advice, and motivation to help you reach your fitness goals.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=400&fit=crop',
    membersCount: 12300,
    category: 'health',
    isVerified: false,
    createdAt: '2023-04-05',
    link: '/community/fitness'
  },
  {
    id: '5',
    name: 'Digital Nomads',
    description: 'Work remotely from anywhere in the world. Share tips, destinations, and remote work opportunities.',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=400&fit=crop',
    membersCount: 9800,
    category: 'lifestyle',
    isVerified: true,
    createdAt: '2023-05-12',
    link: '/community/digital-nomads'
  },
  {
    id: '6',
    name: 'Gaming Community',
    description: 'Gamers unite! Discuss games, share gameplay, organize tournaments, and make new gaming friends.',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=400&fit=crop',
    membersCount: 31200,
    category: 'entertainment',
    isVerified: true,
    createdAt: '2023-06-18',
    link: '/community/gaming'
  }
];
