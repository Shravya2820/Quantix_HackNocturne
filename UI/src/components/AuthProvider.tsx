import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { Profile } from '../types';

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  isAuthReady: boolean;
  isDemo: boolean;
  loginAsDemo: (role: 'client' | 'freelancer') => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  isAuthReady: false,
  isDemo: false,
  loginAsDemo: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [isDemo, setIsDemo] = useState(false);

  const loginAsDemo = (role: 'client' | 'freelancer') => {
    setIsDemo(true);
    setProfile({
      id: role === 'client' ? 'demo-client' : 'demo-freelancer',
      name: role === 'client' ? 'Demo Employer' : 'Demo Freelancer',
      email: 'demo@trustchain.app',
      role: role,
      client_rating: 4.8,
      completed_contracts: 12,
      total_earnings: 45000,
      skills: ['React', 'Solidity', 'Tailwind'],
      bio: 'This is a demo account for hackathon testing.',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${role}`
    });
    setLoading(false);
    setIsAuthReady(true);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (isDemo) return;
      setUser(user);
      if (user) {
        try {
          const profileDoc = await getDoc(doc(db, 'profiles', user.uid));
          if (profileDoc.exists()) {
            setProfile(profileDoc.data() as Profile);
          }

          onSnapshot(doc(db, 'profiles', user.uid), (doc) => {
            if (doc.exists()) {
              setProfile(doc.data() as Profile);
            }
          });
        } catch (e) {
          console.error("Firebase profile fetch failed, likely unconfigured rules or auth.", e);
        }
      } else {
        setProfile(null);
      }
      setIsAuthReady(true);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [isDemo]);

  return (
    <AuthContext.Provider value={{ user, profile, loading, isAuthReady, isDemo, loginAsDemo }}>
      {children}
    </AuthContext.Provider>
  );
};
