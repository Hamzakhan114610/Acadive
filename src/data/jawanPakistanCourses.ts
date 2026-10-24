/**
 * Jawan Pakistan Free Courses
 * Institute: Jawan Pakistan
 * Website: https://jawanpakistan.com/
 *
 * Free skill-development courses available to Pakistani youth,
 * especially students who have completed Matric and have free time
 * before starting Intermediate or higher education.
 *
 * Source: https://jawanpakistan.com/ (Government of Pakistan initiative)
 */

export interface JawanCourse {
  id: string;
  title: string;
  urduTitle: string;
  category: string;
  categoryIcon: string;
  duration: string;
  format: 'Online' | 'Physical' | 'Both';
  description: string;
  link: string;
}

export const JAWAN_PAKISTAN_COURSES: JawanCourse[] = [
  {
    id: 'jp_digital_marketing',
    title: 'Digital Marketing',
    urduTitle: 'ڈیجیٹل مارکیٹنگ',
    category: 'Marketing & Business',
    categoryIcon: '📱',
    duration: '3 Months',
    format: 'Both',
    description:
      'Social media marketing, SEO, Google Ads, and online brand building. Start earning freelance from home.',
    link: 'https://jawanpakistan.com/',
  },
  {
    id: 'jp_it_fundamentals',
    title: 'IT & Computer Fundamentals',
    urduTitle: 'آئی ٹی بنیادیات',
    category: 'Technology',
    categoryIcon: '💻',
    duration: '2 Months',
    format: 'Both',
    description:
      'Basic computer skills, MS Office, internet usage, and intro to programming concepts for beginners.',
    link: 'https://jawanpakistan.com/',
  },
  {
    id: 'jp_freelancing',
    title: 'Freelancing & E-Commerce',
    urduTitle: 'فری لانسنگ',
    category: 'Entrepreneurship',
    categoryIcon: '💼',
    duration: '3 Months',
    format: 'Online',
    description:
      'Fiverr, Upwork, and online selling. Learn how to market your skills globally and earn in dollars.',
    link: 'https://jawanpakistan.com/',
  },
  {
    id: 'jp_graphic_design',
    title: 'Graphic Design',
    urduTitle: 'گرافک ڈیزائن',
    category: 'Creative Arts',
    categoryIcon: '🎨',
    duration: '3 Months',
    format: 'Both',
    description:
      'Adobe Photoshop, Illustrator, Canva. Design logos, banners, and social media posts professionally.',
    link: 'https://jawanpakistan.com/',
  },
  {
    id: 'jp_mobile_apps',
    title: 'Mobile App Development',
    urduTitle: 'موبائل ایپ ڈویلپمنٹ',
    category: 'Technology',
    categoryIcon: '📲',
    duration: '4 Months',
    format: 'Both',
    description:
      'Build Android & iOS apps using beginner-friendly frameworks. No prior coding experience needed.',
    link: 'https://jawanpakistan.com/',
  },
  {
    id: 'jp_english_comm',
    title: 'English Communication & Personality',
    urduTitle: 'انگریزی مواصلات',
    category: 'Soft Skills',
    categoryIcon: '🗣️',
    duration: '2 Months',
    format: 'Both',
    description:
      'Spoken English, interview skills, professional writing, and confidence building for future careers.',
    link: 'https://jawanpakistan.com/',
  },
  {
    id: 'jp_web_dev',
    title: 'Web Development',
    urduTitle: 'ویب ڈویلپمنٹ',
    category: 'Technology',
    categoryIcon: '🌐',
    duration: '4 Months',
    format: 'Both',
    description:
      'HTML, CSS, JavaScript basics. Build real websites and start your tech career or freelancing journey.',
    link: 'https://jawanpakistan.com/',
  },
  {
    id: 'jp_entrepreneurship',
    title: 'Entrepreneurship & Business Planning',
    urduTitle: 'کاروباری مہارت',
    category: 'Business',
    categoryIcon: '🚀',
    duration: '2 Months',
    format: 'Both',
    description:
      'How to start a business, write a business plan, manage finances, and grow your startup idea.',
    link: 'https://jawanpakistan.com/',
  },
];

/** Qualification stages where the Jawan Pakistan section should appear */
export const JAWAN_ELIGIBLE_STAGES = [
  'matric_science',
  'fsc_pre_eng',
  'fsc_pre_med',
  'ics',
  'icom',
  'dae',
  'a_level',
] as const;
