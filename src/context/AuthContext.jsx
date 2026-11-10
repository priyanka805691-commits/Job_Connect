import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/client';
import { initialUsers } from '../data/sampleData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('jobconnect_users');
    return saved ? JSON.parse(saved) : initialUsers;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('jobconnect_current_user');
    return saved ? JSON.parse(saved) : initialUsers[0]; // default to Candidate for immediate testing
  });

  const [token, setToken] = useState(() => localStorage.getItem('jobconnect_token') || '');

  // Verify and sync current user from backend on mount
  useEffect(() => {
    const fetchMe = async () => {
      const storedToken = localStorage.getItem('jobconnect_token');
      if (storedToken) {
        try {
          const res = await api.get('/auth/me');
          if (res.data?.success && res.data.user) {
            const u = res.data.user;
            const normalized = {
              id: u._id,
              name: u.name,
              email: u.email,
              role: u.role,
              title: u.title,
              location: u.location,
              phone: u.phone,
              skills: u.skills,
              resumeName: u.resumeName,
              resumeUrl: u.resumeUrl,
              companyName: u.companyName,
              companyIndustry: u.companyIndustry,
              companyWebsite: u.companyWebsite,
              companySize: u.companySize,
              bio: u.bio
            };
            setCurrentUser(normalized);
            localStorage.setItem('jobconnect_current_user', JSON.stringify(normalized));
          }
        } catch (err) {
          console.warn('[AuthContext] Backend /auth/me check failed:', err.message);
        }
      }
    };

    fetchMe();
  }, []);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('jobconnect_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('jobconnect_current_user');
    }
  }, [currentUser]);

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.data?.success) {
        const u = res.data.user;
        const normalized = {
          id: u.id || u._id,
          name: u.name,
          email: u.email,
          role: u.role,
          title: u.title,
          location: u.location,
          phone: u.phone,
          skills: u.skills,
          resumeName: u.resumeName,
          resumeUrl: u.resumeUrl,
          companyName: u.companyName,
          companyIndustry: u.companyIndustry,
          companyWebsite: u.companyWebsite,
          companySize: u.companySize,
          bio: u.bio
        };
        localStorage.setItem('jobconnect_token', res.data.token);
        setToken(res.data.token);
        setCurrentUser(normalized);
        return normalized;
      }
    } catch (apiError) {
      console.warn('[AuthContext] API login failed, checking local credentials:', apiError.response?.data?.message || apiError.message);
      // Fallback for offline/local testing
      const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
      if (user) {
        setCurrentUser(user);
        return user;
      }
      throw new Error(apiError.response?.data?.message || 'Invalid email or password.');
    }
  };

  const register = async (userData) => {
    try {
      const res = await api.post('/auth/register', userData);
      if (res.data?.success) {
        const u = res.data.user;
        const normalized = {
          id: u.id || u._id,
          name: u.name,
          email: u.email,
          role: u.role,
          title: u.title,
          location: u.location,
          phone: u.phone,
          skills: u.skills,
          resumeName: u.resumeName,
          resumeUrl: u.resumeUrl,
          companyName: u.companyName,
          companyIndustry: u.companyIndustry,
          companyWebsite: u.companyWebsite,
          companySize: u.companySize
        };
        localStorage.setItem('jobconnect_token', res.data.token);
        setToken(res.data.token);
        setCurrentUser(normalized);
        setUsers((prev) => [...prev, normalized]);
        return normalized;
      }
    } catch (apiError) {
      console.warn('[AuthContext] API register failed, falling back to local state:', apiError.response?.data?.message || apiError.message);
      const existing = users.find((u) => u.email.toLowerCase() === userData.email.toLowerCase());
      if (existing) {
        throw new Error('An account with this email already exists.');
      }

      const newUser = {
        id: `user-${Date.now()}`,
        createdAt: new Date().toISOString(),
        skills: userData.skills ? (Array.isArray(userData.skills) ? userData.skills : userData.skills.split(',').map(s => s.trim())) : [],
        resumeName: userData.resumeName || null,
        ...userData
      };

      setUsers((prev) => [...prev, newUser]);
      setCurrentUser(newUser);
      return newUser;
    }
  };

  const logout = () => {
    localStorage.removeItem('jobconnect_token');
    localStorage.removeItem('jobconnect_current_user');
    setToken('');
    setCurrentUser(null);
  };

  const updateProfile = async (updatedFields) => {
    if (!currentUser) return;

    try {
      const res = await api.put('/auth/profile', updatedFields);
      if (res.data?.success && res.data.user) {
        const u = res.data.user;
        const normalized = { ...currentUser, ...updatedFields, id: u._id || currentUser.id };
        setCurrentUser(normalized);
        return normalized;
      }
    } catch (err) {
      console.warn('[AuthContext] Backend profile update failed, updating local state:', err.message);
    }

    const updated = { ...currentUser, ...updatedFields };
    setCurrentUser(updated);
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
    return updated;
  };

  // Demo Switcher for fast testing in navigation
  const switchRole = async (role) => {
    const demoAccounts = {
      candidate: { email: 'john@example.com', password: 'password123' },
      employer: { email: 'recruiter@techcorp.com', password: 'password123' },
      admin: { email: 'admin@jobconnect.com', password: 'admin123' }
    };

    const target = demoAccounts[role];
    if (target) {
      try {
        await login(target.email, target.password);
        return;
      } catch (err) {
        console.warn(`[AuthContext] Switching role via API login failed for ${role}:`, err.message);
      }
    }

    const found = users.find((u) => u.role === role);
    if (found) {
      setCurrentUser(found);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        users,
        token,
        login,
        register,
        logout,
        updateProfile,
        switchRole,
        isAuthenticated: !!currentUser,
        isCandidate: currentUser?.role === 'candidate',
        isEmployer: currentUser?.role === 'employer',
        isAdmin: currentUser?.role === 'admin'
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
