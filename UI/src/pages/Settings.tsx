import React, { useState } from 'react';
import { 
  User, 
  Lock, 
  Wallet, 
  Bell, 
  Shield, 
  Eye, 
  EyeOff,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Save
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../components/AuthProvider';

export const Settings: React.FC = () => {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState('account');
  const [showPassword, setShowPassword] = useState(false);

  const tabs = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-text-primary">Settings</h1>
        <p className="text-text-muted">Manage your account preferences, security, and wallet connections.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Settings Navigation */}
        <div className="lg:col-span-1 flex flex-col gap-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-4 p-4 rounded-2xl font-bold text-sm transition-all ${
                activeTab === tab.id 
                ? 'bg-accent-primary text-bg-main shadow-lg shadow-accent-primary/20' 
                : 'text-text-muted hover:bg-bg-highlight hover:text-text-primary'
              }`}
            >
              <tab.icon size={20} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-8 flex flex-col gap-8"
          >
            {activeTab === 'account' && (
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-6">
                  <h3 className="text-xl font-bold text-text-primary">Account Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-text-muted uppercase tracking-widest">Full Name</label>
                      <input 
                        type="text" 
                        defaultValue={profile?.name}
                        className="bg-bg-highlight border border-border-main rounded-xl py-3 px-4 text-text-primary outline-none focus:border-accent-primary transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-text-muted uppercase tracking-widest">Email Address</label>
                      <input 
                        type="email" 
                        defaultValue={profile?.email}
                        className="bg-bg-highlight border border-border-main rounded-xl py-3 px-4 text-text-primary outline-none focus:border-accent-primary transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-2 md:col-span-2">
                      <label className="text-xs font-bold text-text-muted uppercase tracking-widest">Bio</label>
                      <textarea 
                        rows={4}
                        defaultValue="Passionate Web3 developer building the future of decentralized work."
                        className="bg-bg-highlight border border-border-main rounded-xl py-3 px-4 text-text-primary outline-none focus:border-accent-primary transition-all resize-none"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button className="px-8 py-3 bg-accent-primary text-bg-main rounded-xl font-bold hover:bg-accent-secondary transition-all flex items-center gap-2">
                    <Save size={18} /> Save Changes
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-6">
                  <h3 className="text-xl font-bold text-text-primary">Password & Security</h3>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-text-muted uppercase tracking-widest">Current Password</label>
                      <div className="relative">
                        <input 
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          className="w-full bg-bg-highlight border border-border-main rounded-xl py-3 px-4 text-text-primary outline-none focus:border-accent-primary transition-all"
                        />
                        <button 
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-text-muted uppercase tracking-widest">New Password</label>
                      <input 
                        type="password"
                        placeholder="••••••••"
                        className="w-full bg-bg-highlight border border-border-main rounded-xl py-3 px-4 text-text-primary outline-none focus:border-accent-primary transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="h-px bg-border-main" />

                <div className="flex flex-col gap-6">
                  <h3 className="text-xl font-bold text-text-primary">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between p-4 bg-bg-highlight border border-border-main rounded-2xl">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-accent-primary/10 text-accent-primary rounded-xl flex items-center justify-center">
                        <Shield size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-text-primary">Authenticator App</p>
                        <p className="text-xs text-text-muted">Use Google Authenticator or Authy</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-accent-primary text-bg-main rounded-lg text-xs font-bold hover:bg-accent-secondary transition-all">
                      Enable
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'wallet' && (
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-6">
                  <h3 className="text-xl font-bold text-text-primary">Connected Wallets</h3>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between p-5 bg-bg-highlight border border-accent-primary/30 rounded-2xl">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-accent-primary/10 text-accent-primary rounded-xl flex items-center justify-center">
                          <Wallet size={24} />
                        </div>
                        <div>
                          <p className="font-bold text-text-primary">MetaMask</p>
                          <p className="text-xs text-text-muted font-mono">0x71C7...d897</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-widest">
                        <CheckCircle2 size={16} /> Connected
                      </div>
                    </div>
                    
                    <button className="w-full py-4 border-2 border-dashed border-border-main rounded-2xl text-text-muted font-bold hover:border-accent-primary hover:text-accent-primary transition-all flex items-center justify-center gap-2">
                      <PlusCircle size={20} /> Connect Another Wallet
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-6">
                  <h3 className="text-xl font-bold text-text-primary">Notification Preferences</h3>
                  <div className="flex flex-col gap-4">
                    {[
                      { label: 'Project Updates', desc: 'New milestones, submissions, and approvals' },
                      { label: 'Payment Alerts', desc: 'Escrow funding and payment releases' },
                      { label: 'Messaging', desc: 'New direct messages from clients/freelancers' },
                      { label: 'Dispute Notifications', desc: 'Updates on active or resolved disputes' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-bg-highlight border border-border-main rounded-2xl">
                        <div>
                          <p className="font-bold text-text-primary">{item.label}</p>
                          <p className="text-xs text-text-muted">{item.desc}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-bg-dark peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-primary"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const PlusCircle = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="16" />
    <line x1="8" y1="12" x2="16" y2="12" />
  </svg>
);
