import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/AuthProvider';
import { Layout } from './components/Layout';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

import { Dashboard } from './pages/Dashboard';
import { CreateProject } from './pages/CreateProject';
import { Explore } from './pages/Explore';
import { ProjectDetails } from './pages/ProjectDetails';
import { CreditScore } from './pages/CreditScore';
import { Disputes } from './pages/Disputes';
import { Applications } from './pages/Applications';
import { Messages } from './pages/Messages';
import { ClientRating } from './pages/ClientRating';
import { ClientRatings } from './pages/ClientRatings';
import { SubmissionReview } from './pages/SubmissionReview';
import { ExploreJobs } from './pages/ExploreJobs';
import { SubmitWork } from './pages/SubmitWork';
import { EscrowTracker } from './pages/EscrowTracker';
import { Milestones } from './pages/Milestones';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) return (
    <div className="min-h-screen bg-bg-main flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-accent-primary/20 border-t-accent-primary rounded-full animate-spin" />
    </div>
  );
  
  if (!user) return <Navigate to="/login" />;
  
  return <Layout>{children}</Layout>;
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/projects" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/explore" element={<ProtectedRoute><ExploreJobs /></ProtectedRoute>} />
          <Route path="/create-project" element={<ProtectedRoute><CreateProject /></ProtectedRoute>} />
          <Route path="/projects/:id" element={<ProtectedRoute><ProjectDetails /></ProtectedRoute>} />
          <Route path="/milestones" element={<ProtectedRoute><Milestones /></ProtectedRoute>} />
          <Route path="/escrow" element={<ProtectedRoute><EscrowTracker /></ProtectedRoute>} />
          <Route path="/disputes" element={<ProtectedRoute><Disputes /></ProtectedRoute>} />
          <Route path="/applications" element={<ProtectedRoute><Applications /></ProtectedRoute>} />
          <Route path="/submit-work" element={<ProtectedRoute><SubmitWork /></ProtectedRoute>} />
          <Route path="/submit-work/:milestoneId" element={<ProtectedRoute><SubmitWork /></ProtectedRoute>} />
          <Route path="/review-submission/:milestoneId" element={<ProtectedRoute><SubmissionReview /></ProtectedRoute>} />
          <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
          <Route path="/credit-score" element={<ProtectedRoute><CreditScore /></ProtectedRoute>} />
          <Route path="/client-rating" element={<ProtectedRoute><ClientRating /></ProtectedRoute>} />
          <Route path="/client-ratings" element={<ProtectedRoute><ClientRatings /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
