import { RiasecDimension, RiasecDimensionInfo, RiasecQuestion } from '../types/riasec';

export const RiasecDimensionDetails: Record<RiasecDimension, RiasecDimensionInfo> = {
  R: {
    code: 'R',
    name: 'Realistic',
    fullName: 'Realistic (Doers)',
    description: 'Hands-on problem solvers who enjoy practical tools, machinery, hardware, and physical building.',
    sampleRoles: ['Mechanical Engineer', 'Robotics Technician', 'Network Engineer'],
  },
  I: {
    code: 'I',
    name: 'Investigative',
    fullName: 'Investigative (Thinkers)',
    description: 'Analytical thinkers who enjoy solving complex logic puzzles, coding, scientific research, and data.',
    sampleRoles: ['AI & Software Engineer', 'Data Scientist', 'Cybersecurity Analyst'],
  },
  A: {
    code: 'A',
    name: 'Artistic',
    fullName: 'Artistic (Creators)',
    description: 'Creative and expressive individuals who love visual design, storytelling, UI/UX, and media.',
    sampleRoles: ['UI/UX Product Designer', 'Game Artist', 'Creative Director'],
  },
  S: {
    code: 'S',
    name: 'Social',
    fullName: 'Social (Helpers)',
    description: 'Empathetic communicators who thrive on teaching, mentoring, healthcare, and community support.',
    sampleRoles: ['Education Lead', 'Community Health Specialist', 'Clinical Counselor'],
  },
  E: {
    code: 'E',
    name: 'Enterprising',
    fullName: 'Enterprising (Persuaders)',
    description: 'Decisive leaders who enjoy starting ventures, pitching ideas, negotiations, and business strategy.',
    sampleRoles: ['Startup Founder', 'Product Manager', 'Fintech Strategist'],
  },
  C: {
    code: 'C',
    name: 'Conventional',
    fullName: 'Conventional (Organizers)',
    description: 'Detail-oriented professionals who excel with financial ledgers, audit compliance, and structured data.',
    sampleRoles: ['Chartered Accountant (CA/ACCA)', 'Database Administrator', 'Financial Analyst'],
  },
};

/**
 * 6 Quick High-Impact Questions (Fast 60-Second Assessment)
 */
export const RiasecQuestions: RiasecQuestion[] = [
  {
    id: 1,
    scenario: 'Group Project',
    context: 'In a college tech exhibition project, which part would you naturally take on?',
    options: [
      { id: '1a', text: 'Assembling the physical hardware, circuits, or equipment.', dimension: 'R', weight: 1 },
      { id: '1b', text: 'Writing the algorithmic logic, formulas, or code.', dimension: 'I', weight: 1 },
      { id: '1c', text: 'Designing the visual UI, poster, and presentation slides.', dimension: 'A', weight: 1 },
      { id: '1d', text: 'Pitching the project and managing the budget.', dimension: 'E', weight: 1 },
    ],
  },
  {
    id: 2,
    scenario: 'Free Afternoon',
    context: 'You have free time to learn something on your laptop. What sounds most fun?',
    options: [
      { id: '2a', text: 'Solving coding or mathematical logic puzzles.', dimension: 'I', weight: 1 },
      { id: '2b', text: 'Editing a creative video or designing a website concept in Figma.', dimension: 'A', weight: 1 },
      { id: '2c', text: 'Helping a classmate understand a difficult topic or tutoring.', dimension: 'S', weight: 1 },
      { id: '2d', text: 'Organizing financial spreadsheets, budgets, or file systems.', dimension: 'C', weight: 1 },
    ],
  },
  {
    id: 3,
    scenario: 'Problem Solving',
    context: 'When facing an unexpected breakdown or challenge, what is your first instinct?',
    options: [
      { id: '3a', text: 'Grab tools and inspect the physical components directly.', dimension: 'R', weight: 1 },
      { id: '3b', text: 'Analyze data and find the root cause through step-by-step logic.', dimension: 'I', weight: 1 },
      { id: '3c', text: 'Talk to the people involved and resolve emotional conflicts.', dimension: 'S', weight: 1 },
      { id: '3d', text: 'Check the rulebook, verify records, and follow a checklist.', dimension: 'C', weight: 1 },
    ],
  },
  {
    id: 4,
    scenario: 'Ideal Work Setup',
    context: 'Which working environment feels most natural and energizing to you?',
    options: [
      { id: '4a', text: 'A hands-on workshop, laboratory, or technical build space.', dimension: 'R', weight: 1 },
      { id: '4b', text: 'A creative studio filled with visuals, mood boards, and prototypes.', dimension: 'A', weight: 1 },
      { id: '4c', text: 'A dynamic startup meeting room pitching ideas and leading teams.', dimension: 'E', weight: 1 },
      { id: '4d', text: 'A structured corporate office managing financial audits and clear ledgers.', dimension: 'C', weight: 1 },
    ],
  },
  {
    id: 5,
    scenario: 'Community Initiative',
    context: 'Your campus is organizing a youth welfare campaign. How do you contribute?',
    options: [
      { id: '5a', text: 'Setting up sound systems, power cables, and technical equipment.', dimension: 'R', weight: 1 },
      { id: '5b', text: 'Mentoring younger students and listening to their concerns.', dimension: 'S', weight: 1 },
      { id: '5c', text: 'Leading the sponsorship drive and negotiating with corporate donors.', dimension: 'E', weight: 1 },
      { id: '5d', text: 'Managing the attendance records, accounting, and receipt verification.', dimension: 'C', weight: 1 },
    ],
  },
  {
    id: 6,
    scenario: 'Career Goal',
    context: 'In 5 to 10 years, which achievement would make you proudest?',
    options: [
      { id: '6a', text: 'Inventing new algorithms, software, or scientific breakthroughs.', dimension: 'I', weight: 1 },
      { id: '6b', text: 'Creating an inspiring brand, design system, or media platform.', dimension: 'A', weight: 1 },
      { id: '6c', text: 'Mentoring and uplifting thousands of students and communities.', dimension: 'S', weight: 1 },
      { id: '6d', text: 'Building a profitable, scalable company and leading a large team.', dimension: 'E', weight: 1 },
    ],
  },
];
