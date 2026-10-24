import { CareerProfile } from '../types';

export const CareersData: CareerProfile[] = [
  {
    id: 'software-ai-engineer',
    title: 'Software & AI Engineer',
    category: 'Computer Science & Technology',
    riasecCode: 'IRC',
    riasecDimensions: ['I', 'R', 'C'],
    shortSummary: 'Designs, develops, and deploys intelligent software systems, cloud APIs, and algorithmic models.',
    detailedOverview: 'Software and AI Engineers build computational architectures, modern web and mobile applications, and machine learning pipelines. In Pakistan, the tech sector offers strong domestic and remote global employment opportunities for skilled problem solvers with demonstrable project portfolios.',
    typicalActivities: [
      'Architecting scalable backend databases and REST/GraphQL APIs',
      'Training and fine-tuning machine learning models for natural language and computer vision',
      'Debugging distributed systems and optimizing algorithmic runtimes',
      'Writing automated unit and integration tests and managing CI/CD pipelines',
    ],
    recommendedSubjects: [
      'Mathematics (Calculus, Linear Algebra, Probability)',
      'Computer Science (Programming fundamentals)',
      'Physics (Logical problem solving)',
    ],
    essentialSkills: [
      { name: 'Data Structures & Algorithms', priority: 'core', verifiedBasis: 'Standard technical interview requirement across Pakistani & global software firms' },
      { name: 'TypeScript & Python', priority: 'core', verifiedBasis: 'Dominant modern languages for cloud services and ML models' },
      { name: 'Git & Version Control', priority: 'core', verifiedBasis: 'Prerequisite for collaborative engineering workflows' },
      { name: 'SQL & NoSQL Database Design', priority: 'supportive', verifiedBasis: 'Required for reliable state persistence' },
    ],
    routes: [
      {
        routeName: 'Traditional F.Sc. / Intermediate Route',
        targetQualification: 'BS Computer Science / BS Software Engineering (4 Years)',
        estimatedYears: '6 Years (2 yrs Inter + 4 yrs BS)',
        admissionTest: 'ECAT, NUST NET, FAST NU Test, or GIKI Test',
        steps: [
          { stage: 'Secondary (Matric)', duration: '2 Years', description: 'Matriculation in Science or Computer Science (BISE)', institutionTypes: ['Public/Private Schools'] },
          { stage: 'Higher Secondary', duration: '2 Years', description: 'F.Sc. Pre-Engineering or ICS (Physics/Maths/CS)', institutionTypes: ['Intermediate Colleges'] },
          { stage: 'Undergraduate Degree', duration: '4 Years', description: 'HEC/NCEAC-accredited BS in Computer Science or Software Engineering', institutionTypes: ['FAST-NUCES', 'NUST', 'NED', 'ITU', 'UET', 'COMSATS', 'GIKI'] },
        ],
      },
      {
        routeName: 'Technical & Vocational (DAE) Route',
        targetQualification: 'BS Computer Science via Technical Diploma',
        estimatedYears: '7 Years (3 yrs DAE + 4 yrs BS)',
        admissionTest: 'University Entrance Test',
        steps: [
          { stage: 'Secondary (Matric)', duration: '2 Years', description: 'Matriculation in Science (Technical Board eligibility)', institutionTypes: ['Secondary Schools'] },
          { stage: 'Technical Diploma', duration: '3 Years', description: 'DAE in Computer Information Technology (CIT) or Electronics', institutionTypes: ['Polytechnic Institutes (SBTE / PBTE)'] },
          { stage: 'Undergraduate Degree', duration: '4 Years', description: 'BS Computer Science under HEC technical equivalence quota', institutionTypes: ['Public & Chartered Universities'] },
        ],
      },
      {
        routeName: 'International Cambridge Route',
        targetQualification: 'BS Computer Science (4 Years)',
        estimatedYears: '6 Years (2 yrs O-Level + 2 yrs A-Level + 4 yrs BS)',
        admissionTest: 'SAT / University Admission Test',
        steps: [
          { stage: 'O-Levels', duration: '2-3 Years', description: 'Minimum 8 subjects with Math, Physics, and Computer Science', institutionTypes: ['Cambridge Schools'] },
          { stage: 'A-Levels', duration: '2 Years', description: 'Mathematics and Physics or Computing (IBCC Equivalence required)', institutionTypes: ['Colleges / A-Level Academies'] },
          { stage: 'Undergraduate Degree', duration: '4 Years', description: 'BS Computer Science', institutionTypes: ['LUMS', 'Habib University', 'NUST', 'FAST', 'GIKI'] },
        ],
      },
    ],
    sources: [
      { title: 'National Computing Education Accreditation Council (NCEAC)', url: 'https://nceac.org.pk', lastCheckedDate: '2026-10-01', verificationStatus: 'verified' },
      { title: 'Higher Education Commission (HEC) Curriculum Guidelines', url: 'https://hec.gov.pk', lastCheckedDate: '2026-09-15', verificationStatus: 'verified' },
    ],
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist & Statistical Modeler',
    category: 'Data & Mathematical Sciences',
    riasecCode: 'IRC',
    riasecDimensions: ['I', 'R', 'C'],
    shortSummary: 'Transforms raw quantitative data into predictive insights, business intelligence, and mathematical models.',
    detailedOverview: 'Data Scientists synthesize statistical theory, database querying, and machine learning to extract actionable knowledge from financial transactions, healthcare records, logistics, and telecommunication networks.',
    typicalActivities: [
      'Exploratory data analysis and visual anomaly detection',
      'Statistical hypothesis testing and multivariate regression modeling',
      'Building predictive recommendation engines and fraud detection algorithms',
      'Communicating analytical findings clearly to business stakeholders',
    ],
    recommendedSubjects: [
      'Mathematics (Statistics, Linear Algebra, Probability)',
      'Computer Science',
      'Economics or Physics',
    ],
    essentialSkills: [
      { name: 'Python (Pandas, NumPy, Scikit-learn)', priority: 'core', verifiedBasis: 'Industry standard for data exploration and modeling' },
      { name: 'Advanced SQL Querying', priority: 'core', verifiedBasis: 'Required to extract and transform enterprise warehouse tables' },
      { name: 'Applied Statistics', priority: 'core', verifiedBasis: 'Prevents false correlation and sampling bias errors' },
      { name: 'Data Visualization (PowerBI / Seaborn)', priority: 'supportive', verifiedBasis: 'Essential for presenting findings to non-technical leaders' },
    ],
    routes: [
      {
        routeName: 'Standard HEC BS Data Science Route',
        targetQualification: 'BS Data Science (4 Years)',
        estimatedYears: '6 Years (2 yrs Inter + 4 yrs BS)',
        admissionTest: 'University Entry Test',
        steps: [
          { stage: 'Secondary', duration: '2 Years', description: 'Matriculation in Science or Computer Science', institutionTypes: ['Secondary Schools'] },
          { stage: 'Intermediate', duration: '2 Years', description: 'ICS (Stats/Maths/CS) or F.Sc. Pre-Engineering', institutionTypes: ['Colleges'] },
          { stage: 'BS Data Science', duration: '4 Years', description: 'HEC-recognized BS Data Science degree', institutionTypes: ['FAST-NUCES', 'NUST', 'COMSATS', 'NED', 'PUCIT'] },
        ],
      },
    ],
    sources: [
      { title: 'HEC Approved Undergraduate Curriculum for Data Science', url: 'https://hec.gov.pk', lastCheckedDate: '2026-08-20', verificationStatus: 'verified' },
    ],
  },
  {
    id: 'chartered-accountant',
    title: 'Chartered Accountant (CA / ACCA)',
    category: 'Finance, Audit & Corporate Governance',
    riasecCode: 'CEI',
    riasecDimensions: ['C', 'E', 'I'],
    shortSummary: 'Leads financial auditing, taxation strategy, corporate governance, and investment risk evaluation.',
    detailedOverview: 'Chartered Accountants are the financial stewards of commercial organizations. Regulated by the Institute of Chartered Accountants of Pakistan (ICAP), CAs ensure transparency, regulatory compliance, and fiscal health across private and public sectors.',
    typicalActivities: [
      'Conducting statutory corporate financial audits and balance sheet verifications',
      'Formulating corporate tax strategies in compliance with FBR laws',
      'Evaluating enterprise solvency, mergers, and capital expenditure decisions',
      'Enforcing rigorous internal control systems against fraudulent leakage',
    ],
    recommendedSubjects: [
      'Accounting & Commerce (Principles of Accounting)',
      'Business Mathematics & Statistics',
      'Economics and Business Communication',
    ],
    essentialSkills: [
      { name: 'International Financial Reporting Standards (IFRS)', priority: 'core', verifiedBasis: 'Official ICAP syllabus requirement for legal corporate reporting' },
      { name: 'Auditing & Internal Controls', priority: 'core', verifiedBasis: 'Core qualification pillar for licensed practicing accountants' },
      { name: 'Pakistani Corporate & Tax Law', priority: 'core', verifiedBasis: 'Enforces compliance with Companies Act and FBR Income Tax Ordinance' },
      { name: 'Financial Modeling & Spreadsheets', priority: 'supportive', verifiedBasis: 'Crucial for valuation and cash-flow projections' },
    ],
    routes: [
      {
        routeName: 'ICAP Direct Professional Qualification Route',
        targetQualification: 'Associate Chartered Accountant (ACA - ICAP)',
        estimatedYears: '5 to 6 Years',
        admissionTest: 'ICAP PRC (Pre-Requisite Competency) Examinations',
        steps: [
          { stage: 'Higher Secondary', duration: '2 Years', description: 'Intermediate (I.Com/F.Sc/ICS/FA) with minimum 50% or A-Levels', institutionTypes: ['Colleges / Schools'] },
          { stage: 'PRC Level', duration: '6-12 Months', description: '5 computer-based exams (Business Writing, Math, Stats, Econ, Accounting)', institutionTypes: ['ICAP Registered RAETs'] },
          { stage: 'CAF Level', duration: '1.5-2 Years', description: 'Certificate in Accounting and Finance (8 technical papers)', institutionTypes: ['ICAP Training Institutes'] },
          { stage: 'Articleship & CFAP', duration: '3.5 Years', description: 'Mandatory practical training with registered audit firm + final examinations', institutionTypes: ['Registered CA Firms (Big 4 & Mid-Tier)'] },
        ],
      },
    ],
    sources: [
      { title: 'Institute of Chartered Accountants of Pakistan (ICAP)', url: 'https://icap.org.pk', lastCheckedDate: '2026-10-10', verificationStatus: 'verified' },
    ],
  },
  {
    id: 'ui-ux-product-designer',
    title: 'UI/UX & Product Designer',
    category: 'Design, HCI & Digital Media',
    riasecCode: 'AIS',
    riasecDimensions: ['A', 'I', 'S'],
    shortSummary: 'Crafts intuitive, accessible, and delightful digital user interfaces and interaction systems.',
    detailedOverview: 'Product Designers bridge human psychology, visual aesthetics, and software functionality. They conduct user research, create wireframes, test prototypes with real users, and ensure software products are comfortable and enjoyable to use.',
    typicalActivities: [
      'Conducting user interviews and mapping emotional journey flows',
      'Building responsive wireframes and high-fidelity interactive prototypes in Figma',
      'Maintaining design systems with consistent typography, color tokens, and components',
      'Collaborating with frontend engineers to ensure design fidelity during implementation',
    ],
    recommendedSubjects: [
      'Art, Drawing & Graphic Design',
      'Computer Science & Web Basics',
      'Psychology or Sociology',
    ],
    essentialSkills: [
      { name: 'Figma & Design Systems', priority: 'core', verifiedBasis: 'Dominant global industry tool for UI/UX specification and component libraries' },
      { name: 'User Research & Usability Testing', priority: 'core', verifiedBasis: 'Separates evidence-based product design from subjective graphic decoration' },
      { name: 'Information Architecture & Wireframing', priority: 'core', verifiedBasis: 'Ensures complex applications remain navigable on small mobile screens' },
      { name: 'Accessibility (WCAG Standards)', priority: 'supportive', verifiedBasis: 'Essential for inclusive software accessible to diverse abilities' },
    ],
    routes: [
      {
        routeName: 'Formal Design Degree Route',
        targetQualification: 'Bachelor of Design (B.Des) / BS Communication Design',
        estimatedYears: '6 Years (2 yrs Inter + 4 yrs Degree)',
        admissionTest: 'Drawing & Creative Aptitude Test + Portfolio Review',
        steps: [
          { stage: 'Higher Secondary', duration: '2 Years', description: 'Intermediate (any group) or A-Levels with portfolio preparation', institutionTypes: ['Colleges'] },
          { stage: 'Undergraduate Degree', duration: '4 Years', description: 'B.Des in Communication Design / Visual Studies / HCI', institutionTypes: ['IVS (Karachi)', 'NCA (Lahore)', 'Habib University', 'KU Department of Visual Studies'] },
        ],
      },
      {
        routeName: 'Technical Self-Directed + Portfolio Route',
        targetQualification: 'Professional Portfolio & Industry Placements',
        estimatedYears: '2 to 3 Years',
        admissionTest: 'Portfolio evaluation & case studies review',
        steps: [
          { stage: 'Foundations', duration: '6 Months', description: 'Mastering visual hierarchy, typography, and Figma components', institutionTypes: ['Structured Courses & Mentorship'] },
          { stage: 'Live Projects', duration: '1 Year', description: 'Redesigning real Pakistani consumer apps, documenting user problem statements', institutionTypes: ['Freelance & Community Projects'] },
          { stage: 'Junior Designer Placement', duration: 'Ongoing', description: 'Joining a tech product studio or software house', institutionTypes: ['Tech Companies & Startups'] },
        ],
      },
    ],
    sources: [
      { title: 'Indus Valley School of Art and Architecture (IVS)', url: 'https://indusvalley.edu.pk', lastCheckedDate: '2026-09-01', verificationStatus: 'verified' },
      { title: 'National College of Arts (NCA)', url: 'https://nca.edu.pk', lastCheckedDate: '2026-09-01', verificationStatus: 'verified' },
    ],
  },
  {
    id: 'mechanical-mechatronics-engineer',
    title: 'Mechanical & Robotics Engineer',
    category: 'Engineering & Manufacturing',
    riasecCode: 'RIE',
    riasecDimensions: ['R', 'I', 'E'],
    shortSummary: 'Develops physical machinery, thermal power systems, industrial robotics, and automated manufacturing lines.',
    detailedOverview: 'Mechanical Engineers apply thermodynamic, structural mechanics, and materials science principles to design everything from industrial energy turbines to miniature surgical robotics. In Pakistan, they work in power generation, textile manufacturing, automotive, and emerging aerospace sectors.',
    typicalActivities: [
      '3D CAD modeling and finite-element structural stress simulation',
      'Designing heating, ventilation, and thermodynamic heat exchangers',
      'Configuring automated PLC microcontrollers and industrial pneumatic valves',
      'Supervising plant preventative maintenance and machinery safety audits',
    ],
    recommendedSubjects: [
      'Mathematics (Calculus, Differential Equations)',
      'Physics (Mechanics, Thermodynamics, Electromagnetism)',
      'Chemistry (Materials Science)',
    ],
    essentialSkills: [
      { name: 'CAD Software (SolidWorks / AutoCAD)', priority: 'core', verifiedBasis: 'Mandatory standard for producing engineering fabrication drawings' },
      { name: 'Thermodynamics & Fluid Dynamics', priority: 'core', verifiedBasis: 'Undergraduate PEC requirement for energy system design' },
      { name: 'PLC & Embedded Systems Basics', priority: 'supportive', verifiedBasis: 'Crucial for modern Mechatronics and robotic assembly lines' },
    ],
    routes: [
      {
        routeName: 'PEC-Accredited Engineering Degree Route',
        targetQualification: 'BE / BS Mechanical Engineering (4 Years)',
        estimatedYears: '6 Years (2 yrs Inter + 4 yrs BE)',
        admissionTest: 'ECAT, NUST NET, NED Entry Test',
        steps: [
          { stage: 'Higher Secondary', duration: '2 Years', description: 'F.Sc. Pre-Engineering (minimum 60% as per PEC regulation)', institutionTypes: ['Colleges'] },
          { stage: 'Engineering Degree', duration: '4 Years', description: 'PEC-accredited Bachelor of Engineering (BE / BS Mechanical)', institutionTypes: ['NED University (Karachi)', 'NUST (Islamabad)', 'UET (Lahore)', 'GIKI'] },
        ],
      },
    ],
    sources: [
      { title: 'Pakistan Engineering Council (PEC) Accreditation Portal', url: 'https://pec.org.pk', lastCheckedDate: '2026-10-05', verificationStatus: 'verified' },
    ],
  },
];
