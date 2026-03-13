import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';
import { ShieldCheck, Mail, Lock, ArrowRight, AlertCircle, Wallet } from 'lucide-react';
import { useAuth } from '../components/AuthProvider';
import { motion } from 'framer-motion';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { loginAsDemo } = useAuth();

  const handleDemoLogin = (role: 'client' | 'freelancer') => {
    loginAsDemo(role);
    navigate('/dashboard');
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/operation-not-allowed') {
        setError('Authentication service is not fully configured yet. Please try demo mode.');
      } else {
        setError(err.message || 'Failed to login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/dashboard');
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/operation-not-allowed') {
        setError('Google login is not enabled. Please try demo mode.');
      } else {
        setError(err.message || 'Failed to login with Google');
      }
    }
  };

  return (
    <div className="min-h-screen bg-bg-main flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-accent-primary/5 blur-[120px] rounded-full -z-10" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card w-full max-w-md p-10 flex flex-col gap-8"
      >
        <div className="flex flex-col items-center gap-4">
          <Link to="/" className="w-12 h-12 bg-accent-primary rounded-xl flex items-center justify-center">
            <ShieldCheck className="text-bg-main" size={28} />
          </Link>
          <h1 className="text-3xl font-bold text-text-primary">Welcome back</h1>
          <p className="text-text-muted text-center">Enter your details to access your dashboard</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm flex items-start gap-3">
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleEmailLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-text-muted ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full bg-bg-mid border border-border-main rounded-xl py-3 pl-12 pr-4 text-text-primary focus:ring-2 focus:ring-accent-primary/20 focus:border-accent-primary outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-text-muted ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-bg-mid border border-border-main rounded-xl py-3 pl-12 pr-4 text-text-primary focus:ring-2 focus:ring-accent-primary/20 focus:border-accent-primary outline-none transition-all"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="bg-accent-primary text-bg-main py-3 rounded-xl font-bold mt-2 hover:bg-accent-hover transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'} <ArrowRight size={18} />
          </button>
        </form>

        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-border-main" />
          <span className="text-xs font-bold text-text-muted uppercase tracking-widest">OR</span>
          <div className="flex-1 h-px bg-border-main" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-2 bg-bg-mid border border-border-main rounded-xl py-3 text-text-primary hover:bg-bg-highlight transition-all"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
            <span>Google</span>
          </button>
          <button 
            className="flex items-center justify-center gap-2 bg-bg-mid border border-border-main rounded-xl py-3 text-text-primary hover:bg-bg-highlight transition-all"
          >
            <Wallet size={18} className="text-accent-primary" />
            <span>Wallet</span>
          </button>
        </div>

        <div className="space-y-3">
          <p className="text-center text-[10px] font-bold text-accent-primary uppercase tracking-[0.2em] mb-2">Hackathon Demo Mode</p>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => handleDemoLogin('client')}
              className="flex flex-col items-center justify-center gap-1 bg-accent-primary/10 border border-accent-primary/20 rounded-xl py-3 text-accent-primary hover:bg-accent-primary/20 transition-all"
            >
              <span className="text-xs font-bold">Demo Client</span>
            </button>
            <button 
              onClick={() => handleDemoLogin('freelancer')}
              className="flex flex-col items-center justify-center gap-1 bg-accent-secondary/10 border border-accent-secondary/20 rounded-xl py-3 text-accent-secondary hover:bg-accent-secondary/20 transition-all"
            >
              <span className="text-xs font-bold">Demo Freelancer</span>
            </button>
          </div>
        </div>

        <p className="text-center text-text-muted text-sm">
          Don't have an account? <Link to="/register" className="text-accent-primary font-bold hover:underline">Sign up</Link>
        </p>
      </motion.div>
    </div>
  );
};
