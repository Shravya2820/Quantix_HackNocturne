import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { ShieldCheck, Mail, Lock, User, ArrowRight, Briefcase, UserCircle } from 'lucide-react';
import { Profile } from '../types';

export const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'client' | 'freelancer'>('freelancer');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName: name });

      const profile: Profile = {
        id: user.uid,
        name,
        email,
        role,
        client_rating: 5,
        completed_contracts: 0,
        total_earnings: 0,
        skills: [],
        bio: '',
      };

      await setDoc(doc(db, 'profiles', user.uid), profile);
      navigate('/dashboard');
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/operation-not-allowed') {
        setError('Authentication service is not fully configured yet. Please try demo mode on the login page.');
      } else {
        setError(err.message || 'Failed to create account');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-main flex items-center justify-center p-6">
      <div className="glass-card w-full max-w-lg p-10 flex flex-col gap-8">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 bg-accent-primary rounded-xl flex items-center justify-center">
            <ShieldCheck className="text-bg-main" size={28} />
          </div>
          <h1 className="text-3xl font-bold text-text-primary">Create TrustChain Account</h1>
          <p className="text-text-muted text-center">Join the decentralized future of work</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-text-muted ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-bg-mid border border-border-main rounded-xl py-3 pl-12 pr-4 text-text-primary focus:ring-2 focus:ring-accent-primary/20 focus:border-accent-primary outline-none transition-all"
                />
              </div>
            </div>

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

          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium text-text-muted ml-1">I am a...</label>
            <div className="grid grid-cols-2 gap-4">
              <button 
                type="button"
                onClick={() => setRole('client')}
                className={`flex items-center justify-center gap-3 p-4 rounded-xl border transition-all ${
                  role === 'client' 
                    ? 'bg-accent-primary/10 border-accent-primary text-accent-primary' 
                    : 'bg-bg-mid border-border-main text-text-muted hover:border-text-muted'
                }`}
              >
                <UserCircle size={20} />
                <span className="font-bold">Employer</span>
              </button>
              <button 
                type="button"
                onClick={() => setRole('freelancer')}
                className={`flex items-center justify-center gap-3 p-4 rounded-xl border transition-all ${
                  role === 'freelancer' 
                    ? 'bg-accent-primary/10 border-accent-primary text-accent-primary' 
                    : 'bg-bg-mid border-border-main text-text-muted hover:border-text-muted'
                }`}
              >
                <Briefcase size={20} />
                <span className="font-bold">Freelancer</span>
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="bg-accent-primary text-bg-main py-4 rounded-xl font-bold mt-2 hover:bg-accent-hover transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Register'} <ArrowRight size={18} />
          </button>
        </form>

        <p className="text-center text-text-muted text-sm">
          Already have an account? <Link to="/login" className="text-accent-primary font-bold hover:underline">Log In</Link>
        </p>
      </div>
    </div>
  );
};
