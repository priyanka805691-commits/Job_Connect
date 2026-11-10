# JobConnect – Modern Full-Stack Online Job Portal

JobConnect is a responsive, full-stack Online Job Portal connecting ambitious candidates with verified employers across engineering, design, marketing, finance, and operations.

---

## 🚀 Technology Stack

- **Frontend**: React.js (Vite), React Router v6, Axios, Lucide React, Modern CSS3 & CSS Variables
- **Backend**: Node.js, Express.js, RESTful APIs
- **Database**: MongoDB with Mongoose ODM (supports MongoDB Atlas, local MongoDB, or automatic in-memory fallback)
- **Authentication**: JSON Web Tokens (JWT) & `bcryptjs` password hashing
- **File Upload**: Multer and Cloudinary (with local disk storage fallback)
- **Tools**: Git, GitHub, Postman, MongoDB Atlas, Concurrently

---

## 🌟 Main Features & Capabilities

1. **User Authentication & Role-Based Access Control (RBAC)**
   - Three distinct roles: **Candidate**, **Employer**, and **Admin**.
   - Secure password hashing with `bcryptjs` and stateless JWT authorization headers.
   - Protected routes and customized dashboards tailored to each role.
   - Quick 1-click demo switcher in the navigation bar for instant testing of all 3 roles.

2. **Candidate Experience**
   - **Candidate Dashboard**: Live metrics on applications, active hiring stages, bookmarks, and a profile strength indicator.
   - **Profile & Resume Management**: Update professional headline, bio, contact details, dynamic skills tags, and upload/replace/delete candidate resumes via Multer/Cloudinary.
   - **Job Search & Advanced Filters**: Real-time filtering by keyword, location, job type (Full-time, Part-time, Remote, Contract, Internship), industry category, experience level, and minimum annual salary slider.
   - **Job Details & Application Flow**: Full job breakdown (responsibilities, requirements, benefits) with an interactive application modal supporting cover notes and resume attachment.
   - **Application Tracker**: Detailed stage tracker (Pending, Reviewed, Shortlisted, Interviewing, Accepted, Rejected) with employer feedback notes.
   - **Saved Bookmarks**: Quick access to save and manage shortlisted positions.

3. **Employer Experience**
   - **Employer Dashboard**: Metrics on active jobs, total candidates, shortlisted applicants, and submissions awaiting approval.
   - **Post a Job**: Comprehensive job creation form with compensation tiers, currency selection, and structured bullet lists. Automatically queues for administrator approval.
   - **Edit & Delete Jobs**: Manage existing postings and update requirements.
   - **Applicant Management**: Filter candidates by specific job and stage, view contact details and cover letters, download resumes, update hiring stages, and record private internal recruiter notes.

4. **Administrator Console**
   - **Job Approvals Queue**: Review pending employer job submissions with 1-click **Approve** (instantly publish live) or **Reject**.
   - **Manage All Portal Jobs**: Search, view, and purge listings across the platform.
   - **User Directory**: View registered candidates, employers, and administrators with role-filtering and account controls.

5. **Design & Responsiveness**
   - Professional blue-and-white theme (`#2563eb`, `#1e40af`, `#ffffff`, `#f8fafc`).
   - Fully responsive for mobile devices, tablets, and desktop displays with responsive navigation drawers and sidebars.

---

## 📂 Project Structure

```
OnlineJob/
├── package.json        (Root orchestration: runs client + server concurrently)
├── .gitignore
├── README.md
├── client/             (Frontend: React, Vite, React Router, Lucide React, Axios)
│   ├── .env
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css
│       ├── api/
│       │   └── client.js
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── Footer.jsx
│       │   ├── JobCard.jsx
│       │   ├── FilterSidebar.jsx
│       │   ├── StatusBadge.jsx
│       │   ├── Modal.jsx
│       │   └── ProtectedRoute.jsx
│       ├── context/
│       │   ├── AuthContext.jsx
│       │   └── JobContext.jsx
│       ├── data/
│       │   └── sampleData.js
│       └── pages/
│           ├── Home.jsx
│           ├── JobListings.jsx
│           ├── JobDetails.jsx
│           ├── Login.jsx
│           ├── Register.jsx
│           ├── CandidateDashboard.jsx
│           ├── CandidateProfile.jsx
│           ├── Applications.jsx
│           ├── SavedJobs.jsx
│           ├── EmployerDashboard.jsx
│           ├── PostJob.jsx
│           ├── EditJob.jsx
│           ├── EmployerApplicants.jsx
│           ├── AdminDashboard.jsx
│           └── NotFound.jsx
└── server/             (Backend: Express, MongoDB Mongoose, JWT, Multer, Cloudinary)
    ├── .env
    ├── .env.example
    ├── package.json
    ├── server.js
    ├── config/
    │   ├── db.js
    │   └── cloudinary.js
    ├── middleware/
    │   ├── auth.js
    │   ├── role.js
    │   ├── upload.js
    │   └── errorHandler.js
    ├── models/
    │   ├── User.js
    │   ├── Job.js
    │   └── Application.js
    ├── controllers/
    │   ├── authController.js
    │   ├── jobController.js
    │   ├── applicationController.js
    │   ├── adminController.js
    │   └── uploadController.js
    ├── routes/
    │   ├── authRoutes.js
    │   ├── jobRoutes.js
    │   ├── applicationRoutes.js
    │   ├── adminRoutes.js
    │   └── uploadRoutes.js
    └── utils/
        └── seeder.js
```

---

## ⚡ How to Run the Complete Full-Stack Project

From the project root directory (`C:\Users\Welcome\Documents\OnlineJob`):

### 1. Start Both Backend & Frontend Together (Recommended)
```bash
npm run dev
```
This runs the Express API server on **`http://localhost:5000`** and the React frontend on **`http://localhost:3000`** concurrently!

### 2. Or Start Separately:
```bash
# Terminal 1 - Backend Server
npm run server

# Terminal 2 - Frontend Client
npm run client
```

---

## 🔑 Demo Accounts for Evaluation

| Role | Email | Password | Details |
|---|---|---|---|
| **Candidate** | `john@example.com` | `password123` | John Doe – Senior Full Stack React/Node Developer |
| **Employer** | `recruiter@techcorp.com` | `password123` | Sarah Jenkins – TechCorp Solutions |
| **Admin** | `admin@jobconnect.com` | `admin123` | Alex Vance – System Super Administrator |

*(You can also use the 1-click demo fill buttons on `/login` or the **Role Switcher** pill in the top navigation bar!)*

---

## 📋 3-Phase Roadmap

- [x] **PHASE 1 – Frontend UI & Prototype**: Complete modern UI, responsive pages, dashboards for all 3 roles, candidate profile & resume upload simulation, job search & filters, job posting, applicant review, admin approval queue, and sample data.
- [x] **PHASE 2 – Backend & Database**: Express.js REST API, MongoDB connection with Mongoose models (`User`, `Job`, `Application`), JWT authentication & `bcryptjs`, Multer + Cloudinary resume upload, role middlewares, and admin controls.
- [x] **PHASE 3 – Integration & Testing**: Wire Axios client to Express REST endpoints, live database operations, complete end-to-end testing, error handling, and deployment preparation.
