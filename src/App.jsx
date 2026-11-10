import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { JobProvider } from './context/JobContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import JobListings from './pages/JobListings';
import JobDetails from './pages/JobDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import CandidateDashboard from './pages/CandidateDashboard';
import CandidateProfile from './pages/CandidateProfile';
import Applications from './pages/Applications';
import SavedJobs from './pages/SavedJobs';
import EmployerDashboard from './pages/EmployerDashboard';
import PostJob from './pages/PostJob';
import EditJob from './pages/EditJob';
import EmployerApplicants from './pages/EmployerApplicants';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';

// Scroll to top on route navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <JobProvider>
          <div className="app-container">
            <ScrollToTop />
            <Navbar />
            <main className="main-content">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/jobs" element={<JobListings />} />
                <Route path="/jobs/:id" element={<JobDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Candidate Protected Routes */}
                <Route
                  path="/candidate/dashboard"
                  element={
                    <ProtectedRoute allowedRoles={['candidate']}>
                      <CandidateDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/candidate/profile"
                  element={
                    <ProtectedRoute allowedRoles={['candidate']}>
                      <CandidateProfile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/candidate/applications"
                  element={
                    <ProtectedRoute allowedRoles={['candidate']}>
                      <Applications />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/candidate/saved"
                  element={
                    <ProtectedRoute allowedRoles={['candidate']}>
                      <SavedJobs />
                    </ProtectedRoute>
                  }
                />

                {/* Employer Protected Routes */}
                <Route
                  path="/employer/dashboard"
                  element={
                    <ProtectedRoute allowedRoles={['employer']}>
                      <EmployerDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/employer/post-job"
                  element={
                    <ProtectedRoute allowedRoles={['employer']}>
                      <PostJob />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/employer/edit-job/:id"
                  element={
                    <ProtectedRoute allowedRoles={['employer']}>
                      <EditJob />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/employer/applicants"
                  element={
                    <ProtectedRoute allowedRoles={['employer']}>
                      <EmployerApplicants />
                    </ProtectedRoute>
                  }
                />

                {/* Admin Protected Routes */}
                <Route
                  path="/admin/dashboard"
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />

                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </JobProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;

