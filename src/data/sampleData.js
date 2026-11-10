export const initialUsers = [
  {
    id: 'user-cand-1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'candidate',
    title: 'Senior Frontend & Full Stack Developer',
    location: 'San Francisco, CA',
    phone: '+1 (555) 234-5678',
    bio: 'Passionate software engineer with 5+ years of experience building scalable, high-performance web applications using React, Node.js, and modern cloud technologies.',
    skills: ['React.js', 'Node.js', 'JavaScript', 'TypeScript', 'MongoDB', 'Express.js', 'REST APIs', 'CSS3/HTML5'],
    resumeName: 'John_Doe_Resume_2026.pdf',
    resumeUrl: '#',
    experienceYears: 5,
    education: 'B.S. in Computer Science - UC Berkeley (2021)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-01-15'
  },
  {
    id: 'user-emp-1',
    name: 'Sarah Jenkins',
    email: 'recruiter@techcorp.com',
    role: 'employer',
    companyName: 'TechCorp Solutions',
    companyWebsite: 'https://techcorp.example.com',
    companyIndustry: 'Software & Cloud Services',
    companySize: '50-200 employees',
    location: 'New York, NY',
    phone: '+1 (555) 876-5432',
    bio: 'Talent Acquisition Director helping exceptional engineers and designers find their dream roles at TechCorp.',
    companyDescription: 'TechCorp is a high-growth tech enterprise empowering modern businesses with next-gen collaborative cloud infrastructure and developer productivity tools.',
    companyLogo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=120&auto=format&fit=crop&q=60',
    createdAt: '2026-01-10'
  },
  {
    id: 'user-admin-1',
    name: 'Alex Vance',
    email: 'admin@jobconnect.com',
    role: 'admin',
    title: 'System Administrator & Portal Overseer',
    location: 'Austin, TX',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-01-01'
  }
];

export const initialCategories = [
  { id: 'cat-1', name: 'Software Development', icon: 'Code', jobCount: 42 },
  { id: 'cat-2', name: 'Product & Design', icon: 'Palette', jobCount: 28 },
  { id: 'cat-3', name: 'Marketing & Growth', icon: 'TrendingUp', jobCount: 19 },
  { id: 'cat-4', name: 'Sales & Business', icon: 'Briefcase', jobCount: 15 },
  { id: 'cat-5', name: 'Finance & Operations', icon: 'DollarSign', jobCount: 12 },
  { id: 'cat-6', name: 'Customer Success', icon: 'Headphones', jobCount: 9 },
  { id: 'cat-7', name: 'Data & Analytics', icon: 'Database', jobCount: 24 },
  { id: 'cat-8', name: 'Human Resources', icon: 'Users', jobCount: 7 }
];

export const initialJobs = [
  {
    id: 'job-1',
    title: 'Senior Full Stack React / Node Developer',
    company: 'TechCorp Solutions',
    employerId: 'user-emp-1',
    companyLogo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=120&auto=format&fit=crop&q=60',
    location: 'Remote (US / Canada)',
    jobType: 'Full-time',
    category: 'Software Development',
    experienceLevel: 'Senior',
    salaryMin: 120000,
    salaryMax: 155000,
    currency: 'USD',
    status: 'approved', // 'approved', 'pending', 'rejected'
    featured: true,
    description: 'We are seeking an experienced Senior Full Stack Engineer to lead front-end architecture and scale back-end RESTful APIs. You will work closely with product designers, system architects, and DevOps to deliver seamless client-facing web applications.',
    requirements: [
      '5+ years of production experience with React.js and modern JavaScript (ES6+)',
      'Solid command of Node.js, Express, MongoDB, and REST API design',
      'Experience with responsive design, state management, and modern CSS frameworks',
      'Familiarity with CI/CD pipelines, Docker, and AWS or Cloudinary asset management',
      'Strong problem-solving abilities and clear communication skills'
    ],
    responsibilities: [
      'Design, architect, and implement high-performance React UI components',
      'Build secure, scalable RESTful microservices and database schemas in MongoDB',
      'Optimize application load times, accessibility, and cross-browser reliability',
      'Mentor junior software engineers and conduct thorough code reviews'
    ],
    benefits: [
      'Competitive salary + equity stock options',
      '100% company-paid health, dental, and vision insurance',
      '$2,500 annual home office & tech stipend',
      'Flexible paid time off (PTO) and parental leave'
    ],
    postedAt: '2026-11-01T10:00:00Z',
    applicantsCount: 6
  },
  {
    id: 'job-2',
    title: 'Lead UI/UX Product Designer',
    company: 'PixelCraft Studio',
    employerId: 'user-emp-2',
    companyLogo: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=120&auto=format&fit=crop&q=60',
    location: 'New York, NY (Hybrid)',
    jobType: 'Full-time',
    category: 'Product & Design',
    experienceLevel: 'Senior',
    salaryMin: 110000,
    salaryMax: 140000,
    currency: 'USD',
    status: 'approved',
    featured: true,
    description: 'PixelCraft is looking for a visionary Lead Product Designer to transform how millions interact with digital fintech and enterprise platforms. You will guide design systems from concept to implementation.',
    requirements: [
      '4+ years experience designing intuitive mobile and desktop web interfaces',
      'Mastery of Figma, design systems, wireframing, and user testing protocols',
      'Strong portfolio demonstrating human-centered problem solving and crisp aesthetics',
      'Ability to collaborate smoothly with frontend developers and product owners'
    ],
    responsibilities: [
      'Create high-fidelity prototypes, user journeys, and component design kits',
      'Conduct user interviews, usability audits, and iterative A/B testing experiments',
      'Maintain and elevate the company unified design token library'
    ],
    benefits: [
      'Comprehensive medical and 401(k) matching up to 5%',
      'Catered gourmet lunches at NYC headquarters',
      'Annual conference and continuous learning budget'
    ],
    postedAt: '2026-11-03T14:30:00Z',
    applicantsCount: 4
  },
  {
    id: 'job-3',
    title: 'Junior Backend Engineer (Node.js & MongoDB)',
    company: 'CloudFlow Dynamics',
    employerId: 'user-emp-3',
    companyLogo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=120&auto=format&fit=crop&q=60',
    location: 'Austin, TX (Remote Available)',
    jobType: 'Full-time',
    category: 'Software Development',
    experienceLevel: 'Entry',
    salaryMin: 70000,
    salaryMax: 90000,
    currency: 'USD',
    status: 'approved',
    featured: false,
    description: 'An exciting junior engineering opening for driven programmers eager to master distributed systems, data caching, REST API patterns, and modern NoSQL databases in a supportive high-growth team.',
    requirements: [
      'Proficiency in JavaScript/Node.js and basic understanding of Express and HTTP protocols',
      'Experience with relational or NoSQL databases such as MongoDB or PostgreSQL',
      'Eagerness to learn clean coding principles, automated testing, and git branching flows'
    ],
    responsibilities: [
      'Implement API endpoints under the guidance of senior technical leads',
      'Write unit tests, documentation, and maintain database seeding scripts',
      'Troubleshoot bugs and assist in backend performance monitoring'
    ],
    benefits: [
      'Mentorship program with designated principal staff engineers',
      'Health insurance + wellness stipend',
      'Clear promotion trajectory to Mid-level engineer within 18 months'
    ],
    postedAt: '2026-11-05T09:15:00Z',
    applicantsCount: 9
  },
  {
    id: 'job-4',
    title: 'Growth Marketing & Content Manager',
    company: 'Apex Growth Labs',
    employerId: 'user-emp-4',
    companyLogo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=120&auto=format&fit=crop&q=60',
    location: 'San Francisco, CA',
    jobType: 'Full-time',
    category: 'Marketing & Growth',
    experienceLevel: 'Mid',
    salaryMin: 85000,
    salaryMax: 110000,
    currency: 'USD',
    status: 'approved',
    featured: false,
    description: 'Lead organic acquisition, multi-channel performance campaigns, product newsletters, and community growth for cutting-edge SaaS software products.',
    requirements: [
      '3+ years B2B SaaS growth marketing or content strategy experience',
      'Deep understanding of SEO, conversion rate optimization (CRO), and Google Analytics 4',
      'Outstanding copywriting and storytelling skills'
    ],
    responsibilities: [
      'Plan and execute monthly content editorial calendars and product launch buzz',
      'Collaborate with PPC and email teams to optimize customer acquisition cost (CAC)',
      'Analyze funnel drop-offs and launch targeted retargeting sequences'
    ],
    benefits: [
      'Quarterly performance bonuses',
      'Generous gym and wellness allowance',
      'Flexible hybrid schedule'
    ],
    postedAt: '2026-11-06T11:45:00Z',
    applicantsCount: 2
  },
  {
    id: 'job-5',
    title: 'DevOps & Cloud Infrastructure Specialist',
    company: 'TechCorp Solutions',
    employerId: 'user-emp-1',
    companyLogo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=120&auto=format&fit=crop&q=60',
    location: 'Remote (Global)',
    jobType: 'Contract',
    category: 'Software Development',
    experienceLevel: 'Senior',
    salaryMin: 95,
    salaryMax: 130,
    currency: 'USD/hr',
    status: 'approved',
    featured: false,
    description: 'Join TechCorp as a Cloud Infrastructure Consultant to build robust automated Terraform infrastructure, Kubernetes clusters, and zero-downtime blue/green deployment workflows.',
    requirements: [
      'Extensive hands-on AWS or GCP architecture experience',
      'Strong scripting skills in Bash/Python and Docker container orchestration',
      'Experience securing VPCs, managing secrets, and setting up Prometheus/Grafana alerts'
    ],
    responsibilities: [
      'Maintain Kubernetes clusters and manage automatic horizontal pod autoscaling',
      'Implement automated security scanning in GitHub Actions workflows',
      'Reduce monthly cloud expenditure through intelligent instance rightsizing'
    ],
    benefits: [
      'Flexible hourly schedule',
      'Opportunity for long-term contract extension',
      'International remote contractor support'
    ],
    postedAt: '2026-11-07T16:20:00Z',
    applicantsCount: 3
  },
  {
    id: 'job-6',
    title: 'Financial Analyst & Budget Planner',
    company: 'Vanguard Capital Partners',
    employerId: 'user-emp-5',
    companyLogo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=120&auto=format&fit=crop&q=60',
    location: 'Chicago, IL',
    jobType: 'Full-time',
    category: 'Finance & Operations',
    experienceLevel: 'Mid',
    salaryMin: 90000,
    salaryMax: 115000,
    currency: 'USD',
    status: 'pending', // Awaiting admin approval
    featured: false,
    description: 'Analyze capital allocations, produce monthly forecasting variance reports, and advise senior leadership on cash flow optimization strategies.',
    requirements: [
      'Bachelor’s degree in Finance, Economics, or Accounting',
      '3+ years modeling financial forecasts in Excel and ERP systems',
      'Strong analytical rigor and presentation capabilities'
    ],
    responsibilities: [
      'Prepare quarterly earnings decks and corporate budget sheets',
      'Audit department expenses and identify cost-efficiency avenues'
    ],
    benefits: ['Full healthcare, 401k match, year-end bonus program'],
    postedAt: '2026-11-08T08:00:00Z',
    applicantsCount: 0
  },
  {
    id: 'job-7',
    title: 'Frontend Web Developer Intern (Summer 2027)',
    company: 'TechCorp Solutions',
    employerId: 'user-emp-1',
    companyLogo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=120&auto=format&fit=crop&q=60',
    location: 'San Francisco, CA / Remote',
    jobType: 'Internship',
    category: 'Software Development',
    experienceLevel: 'Entry',
    salaryMin: 35,
    salaryMax: 45,
    currency: 'USD/hr',
    status: 'pending', // Awaiting admin approval
    featured: false,
    description: 'An immersive 12-week paid internship for university students and bootcamp graduates passionate about HTML, modern CSS, React, and building delightful user experiences.',
    requirements: [
      'Basic knowledge of JavaScript, React, and CSS layout models',
      'Desire to build impactful features used by thousands of customers daily'
    ],
    responsibilities: [
      'Build internal dashboard components with React and Lucide icons',
      'Participate in daily engineering standups and sprint planning'
    ],
    benefits: ['Paid hourly rate + stipend for hardware and remote gear'],
    postedAt: '2026-11-09T12:00:00Z',
    applicantsCount: 0
  }
];

export const initialApplications = [
  {
    id: 'app-1',
    jobId: 'job-1',
    jobTitle: 'Senior Full Stack React / Node Developer',
    company: 'TechCorp Solutions',
    employerId: 'user-emp-1',
    candidateId: 'user-cand-1',
    candidateName: 'John Doe',
    candidateEmail: 'john@example.com',
    candidatePhone: '+1 (555) 234-5678',
    resumeName: 'John_Doe_Resume_2026.pdf',
    resumeUrl: '#',
    coverNote: 'I am thrilled to apply for the Senior Full Stack Developer role. With over 5 years of production experience in React, Node.js, and MongoDB, I have led architectures that scale smoothly to thousands of concurrent users.',
    status: 'reviewed', // 'pending', 'reviewed', 'shortlisted', 'accepted', 'rejected'
    appliedAt: '2026-11-02T11:20:00Z',
    employerNotes: 'Strong profile, great match for our upcoming frontend redesign.'
  },
  {
    id: 'app-2',
    jobId: 'job-2',
    jobTitle: 'Lead UI/UX Product Designer',
    company: 'PixelCraft Studio',
    employerId: 'user-emp-2',
    candidateId: 'user-cand-1',
    candidateName: 'John Doe',
    candidateEmail: 'john@example.com',
    candidatePhone: '+1 (555) 234-5678',
    resumeName: 'John_Doe_Resume_2026.pdf',
    resumeUrl: '#',
    coverNote: 'Having worked extensively with design systems and responsive component libraries, I love creating clean, accessible interfaces that users truly enjoy.',
    status: 'shortlisted',
    appliedAt: '2026-11-04T15:45:00Z',
    employerNotes: 'Invited to first stage portfolio discussion.'
  },
  {
    id: 'app-3',
    jobId: 'job-1',
    jobTitle: 'Senior Full Stack React / Node Developer',
    company: 'TechCorp Solutions',
    employerId: 'user-emp-1',
    candidateId: 'user-cand-2',
    candidateName: 'Emily Watson',
    candidateEmail: 'emily.watson@example.com',
    candidatePhone: '+1 (555) 901-2345',
    resumeName: 'Emily_Watson_FullStack.pdf',
    resumeUrl: '#',
    coverNote: 'Experienced in React, TypeScript, and microservice APIs with 4 years in fast-paced startup environments.',
    status: 'pending',
    appliedAt: '2026-11-05T18:10:00Z',
    employerNotes: ''
  },
  {
    id: 'app-4',
    jobId: 'job-5',
    jobTitle: 'DevOps & Cloud Infrastructure Specialist',
    company: 'TechCorp Solutions',
    employerId: 'user-emp-1',
    candidateId: 'user-cand-3',
    candidateName: 'Marcus Brown',
    candidateEmail: 'marcus.brown@example.com',
    candidatePhone: '+1 (555) 432-1098',
    resumeName: 'Marcus_Brown_DevOps.pdf',
    resumeUrl: '#',
    coverNote: 'Certified AWS Solutions Architect with hands-on Kubernetes, CI/CD, and Terraform production experience.',
    status: 'interviewing',
    appliedAt: '2026-11-08T09:30:00Z',
    employerNotes: 'Technical round scheduled for Thursday.'
  }
];

export const initialSavedJobs = ['job-1', 'job-3'];

