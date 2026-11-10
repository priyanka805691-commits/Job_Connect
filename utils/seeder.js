import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import User from '../models/User.js';
import Job from '../models/Job.js';
import Application from '../models/Application.js';
import { connectDB } from '../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

export const seedDatabase = async () => {
  try {
    console.log('[Seeder] Checking existing data...');
    const userCount = await User.countDocuments();

    if (userCount > 0) {
      console.log(`[Seeder] Database already contains ${userCount} users. Skipping seeder.`);
      return;
    }

    console.log('[Seeder] Database is empty. Seeding initial test data for Candidate, Employer, and Admin...');

    // 1. Create Users
    const candidate = await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      role: 'candidate',
      title: 'Senior Frontend & Full Stack Developer',
      location: 'San Francisco, CA',
      phone: '+1 (555) 234-5678',
      bio: 'Passionate software engineer with 5+ years of experience building scalable, high-performance web applications using React, Node.js, and modern cloud technologies.',
      skills: ['React.js', 'Node.js', 'JavaScript', 'TypeScript', 'MongoDB', 'Express.js', 'REST APIs', 'CSS3/HTML5'],
      resumeName: 'John_Doe_Resume_2026.pdf',
      resumeUrl: '',
      experienceYears: 5,
      education: 'B.S. in Computer Science - UC Berkeley (2021)'
    });

    const employer = await User.create({
      name: 'Sarah Jenkins',
      email: 'recruiter@techcorp.com',
      password: 'password123',
      role: 'employer',
      location: 'New York, NY',
      phone: '+1 (555) 876-5432',
      companyName: 'TechCorp Solutions',
      companyWebsite: 'https://techcorp.example.com',
      companyIndustry: 'Software & Cloud Services',
      companySize: '50-200 employees',
      companyDescription: 'TechCorp is a high-growth tech enterprise empowering modern businesses with next-gen collaborative cloud infrastructure and developer productivity tools.'
    });

    const admin = await User.create({
      name: 'Alex Vance',
      email: 'admin@jobconnect.com',
      password: 'admin123',
      role: 'admin',
      location: 'Austin, TX',
      title: 'System Administrator & Portal Overseer'
    });

    console.log('[Seeder] Users created: Candidate (john@example.com), Employer (recruiter@techcorp.com), Admin (admin@jobconnect.com).');

    // 2. Create Jobs
    const jobs = await Job.create([
      {
        title: 'Senior Full Stack React / Node Developer',
        company: 'TechCorp Solutions',
        employer: employer._id,
        location: 'Remote (US / Canada)',
        jobType: 'Full-time',
        category: 'Software Development',
        experienceLevel: 'Senior',
        salaryMin: 120000,
        salaryMax: 155000,
        currency: 'USD',
        status: 'approved',
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
        applicantsCount: 1
      },
      {
        title: 'Lead UI/UX Product Designer',
        company: 'PixelCraft Studio',
        employer: employer._id,
        location: 'New York, NY (Hybrid)',
        jobType: 'Full-time',
        category: 'Product & Design',
        experienceLevel: 'Senior',
        salaryMin: 110000,
        salaryMax: 140000,
        currency: 'USD',
        status: 'approved',
        featured: true,
        description: 'PixelCraft is looking for a visionary Lead Product Designer to transform how millions interact with digital fintech and enterprise platforms.',
        requirements: [
          '4+ years experience designing intuitive mobile and desktop web interfaces',
          'Mastery of Figma, design systems, wireframing, and user testing protocols'
        ],
        responsibilities: [
          'Create high-fidelity prototypes, user journeys, and component design kits',
          'Conduct user interviews, usability audits, and iterative A/B testing experiments'
        ],
        benefits: [
          'Comprehensive medical and 401(k) matching up to 5%',
          'Annual conference and continuous learning budget'
        ],
        applicantsCount: 1
      },
      {
        title: 'Junior Backend Engineer (Node.js & MongoDB)',
        company: 'CloudFlow Dynamics',
        employer: employer._id,
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
          'Experience with relational or NoSQL databases such as MongoDB'
        ],
        responsibilities: [
          'Implement API endpoints under the guidance of senior technical leads',
          'Write unit tests, documentation, and maintain database seeding scripts'
        ],
        benefits: [
          'Mentorship program with designated principal staff engineers',
          'Clear promotion trajectory to Mid-level engineer within 18 months'
        ],
        applicantsCount: 0
      },
      {
        title: 'Financial Analyst & Budget Planner',
        company: 'TechCorp Solutions',
        employer: employer._id,
        location: 'Chicago, IL',
        jobType: 'Full-time',
        category: 'Finance & Operations',
        experienceLevel: 'Mid',
        salaryMin: 90000,
        salaryMax: 115000,
        currency: 'USD',
        status: 'pending', // Pending Admin Approval!
        featured: false,
        description: 'Analyze capital allocations, produce monthly forecasting variance reports, and advise senior leadership on cash flow optimization strategies.',
        requirements: [
          'Bachelor’s degree in Finance, Economics, or Accounting',
          '3+ years modeling financial forecasts in Excel and ERP systems'
        ],
        responsibilities: [
          'Prepare quarterly earnings decks and corporate budget sheets'
        ],
        benefits: ['Full healthcare, 401k match, year-end bonus program'],
        applicantsCount: 0
      },
      {
        title: 'Frontend Web Developer Intern (Summer 2027)',
        company: 'TechCorp Solutions',
        employer: employer._id,
        location: 'San Francisco, CA / Remote',
        jobType: 'Internship',
        category: 'Software Development',
        experienceLevel: 'Entry',
        salaryMin: 35,
        salaryMax: 45,
        currency: 'USD/hr',
        status: 'pending', // Pending Admin Approval!
        featured: false,
        description: 'An immersive paid internship for university students and bootcamp graduates passionate about HTML, modern CSS, React, and building delightful user experiences.',
        requirements: ['Basic knowledge of JavaScript, React, and CSS layout models'],
        responsibilities: ['Build internal dashboard components with React and Lucide icons'],
        benefits: ['Paid hourly rate + stipend for hardware and remote gear'],
        applicantsCount: 0
      }
    ]);

    console.log(`[Seeder] Seeded ${jobs.length} jobs (including 2 pending approval for admin queue testing).`);

    // 3. Create Applications
    await Application.create([
      {
        job: jobs[0]._id,
        candidate: candidate._id,
        employer: employer._id,
        candidateName: candidate.name,
        candidateEmail: candidate.email,
        candidatePhone: candidate.phone,
        resumeName: candidate.resumeName,
        resumeUrl: '',
        coverNote: 'I am thrilled to apply for the Senior Full Stack Developer role. With over 5 years of production experience in React, Node.js, and MongoDB, I have led architectures that scale smoothly to thousands of concurrent users.',
        status: 'reviewed',
        employerNotes: 'Strong profile, great match for upcoming frontend redesign.'
      },
      {
        job: jobs[1]._id,
        candidate: candidate._id,
        employer: employer._id,
        candidateName: candidate.name,
        candidateEmail: candidate.email,
        candidatePhone: candidate.phone,
        resumeName: candidate.resumeName,
        resumeUrl: '',
        coverNote: 'Having worked extensively with design systems and responsive component libraries, I love creating clean, accessible interfaces that users truly enjoy.',
        status: 'shortlisted',
        employerNotes: 'Invited to portfolio review on Friday.'
      }
    ]);

    // Save one bookmark for candidate
    candidate.savedJobs = [jobs[0]._id, jobs[2]._id];
    await candidate.save();

    console.log('[Seeder] Applications and bookmark test data created successfully.');
  } catch (error) {
    console.error('[Seeder] Error seeding database:', error.message);
  }
};

// If run directly from terminal: `node utils/seeder.js`
if (process.argv[1] && process.argv[1].endsWith('seeder.js')) {
  (async () => {
    try {
      await connectDB();
      await seedDatabase();
      console.log('[Seeder] Completed successfully.');
      process.exit(0);
    } catch (err) {
      console.error('[Seeder] Direct execution failed:', err);
      process.exit(1);
    }
  })();
}

