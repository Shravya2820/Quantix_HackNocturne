import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  Search, 
  PlusCircle, 
  CheckCircle2, 
  ShieldCheck, 
  AlertCircle, 
  Star, 
  User, 
  Settings,
  Bell,
  Wallet,
  LogOut,
  Menu,
  X,
  MessageSquare,
  FileText,
  Send
} from 'lucide-react';
import { useAuth } from './AuthProvider';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_NOTIFICATIONS } from '../mockData';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


interface SidebarItemProps {
  to: string;
  icon: any;
  label: string;
  active: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ to, icon: Icon, label, active }) => (
  <Link 
    to={to} 
    className={cn(
      "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
      active 
        ? "bg-accent-primary/10 text-accent-primary border border-accent-primary/20" 
        : "text-text-muted hover:bg-bg-highlight hover:text-text-primary"
    )}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </Link>
);

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, profile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  const isClient = profile?.role === 'client';
  const isFreelancer = profile?.role === 'freelancer';

  const clientMenuItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/projects', icon: Briefcase, label: 'Projects' },
    { to: '/create-project', icon: PlusCircle, label: 'Create Project' },
    { to: '/milestones', icon: CheckCircle2, label: 'Milestones' },
    { to: '/escrow', icon: ShieldCheck, label: 'Escrow Tracker' },
    { to: '/disputes', icon: AlertCircle, label: 'Disputes' },
    { to: '/client-rating', icon: Star, label: 'Client Rating' },
    { to: '/notifications', icon: Bell, label: 'Notifications' },
    { to: '/profile', icon: User, label: 'Profile' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  const freelancerMenuItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/explore', icon: Search, label: 'Explore Jobs' },
    { to: '/applications', icon: Send, label: 'Applications' },
    { to: '/milestones', icon: CheckCircle2, label: 'Milestones' },
    { to: '/submit-work', icon: FileText, label: 'Submit Work' },
    { to: '/escrow', icon: ShieldCheck, label: 'Escrow Tracker' },
    { to: '/disputes', icon: AlertCircle, label: 'Disputes' },
    { to: '/messages', icon: MessageSquare, label: 'Messages' },
    { to: '/credit-score', icon: Star, label: 'Credit Score' },
    { to: '/profile', icon: User, label: 'Profile' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  const menuItems = isClient ? clientMenuItems : freelancerMenuItems;

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <div className="min-h-screen bg-bg-main flex flex-col">
      {/* Navbar */}
      <nav className="h-16 bg-bg-navbar border-b border-border-main flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button 
            className="lg:hidden text-text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent-primary rounded-lg flex items-center justify-center">
              <ShieldCheck className="text-bg-main" size={20} />
            </div>
            <span className="text-xl font-bold tracking-tight text-text-primary">TrustChain</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center bg-bg-mid border border-border-main rounded-full px-4 py-1.5 w-96">
          <Search size={18} className="text-text-muted" />
          <input 
            type="text" 
            placeholder="Search projects, freelancers..." 
            className="bg-transparent border-none focus:ring-0 text-sm w-full ml-2 text-text-primary placeholder:text-text-muted"
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <button 
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="p-2 text-text-muted hover:text-text-primary transition-colors relative"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-accent-primary text-bg-main text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            <AnimatePresence>
              {isNotificationsOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-80 bg-bg-navbar border border-border-main rounded-2xl shadow-2xl overflow-hidden z-50"
                >
                  <div className="p-4 border-b border-border-main flex items-center justify-between bg-bg-highlight">
                    <h3 className="font-bold text-text-primary">Notifications</h3>
                    <span className="text-xs text-accent-primary font-medium">{unreadCount} New</span>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map(n => (
                        <div 
                          key={n.id} 
                          onClick={() => markAsRead(n.id)}
                          className={cn(
                            "p-4 border-b border-border-main hover:bg-bg-highlight transition-colors cursor-pointer",
                            !n.read && "bg-accent-primary/5"
                          )}
                        >
                          <div className="flex gap-3">
                            <div className={cn(
                              "w-2 h-2 rounded-full mt-1.5 shrink-0",
                              n.type === 'success' ? "bg-emerald-400" : "bg-accent-primary"
                            )} />
                            <div>
                              <p className="text-sm font-bold text-text-primary">{n.title}</p>
                              <p className="text-xs text-text-muted mt-1">{n.message}</p>
                              <p className="text-[10px] text-text-muted mt-2 uppercase tracking-widest">
                                {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center">
                        <p className="text-sm text-text-muted">No notifications yet</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="hidden sm:flex items-center gap-2 bg-bg-mid border border-border-main rounded-full px-3 py-1.5">
            <Wallet size={18} className="text-accent-primary" />
            <span className="text-xs font-mono text-text-primary">
              {user?.uid ? `${user.uid.slice(0, 6)}...${user.uid.slice(-4)}` : 'Connect Wallet'}
            </span>
          </div>
          <div className="w-8 h-8 bg-bg-highlight border border-border-main rounded-full flex items-center justify-center overflow-hidden">
            {profile?.avatar ? (
              <img src={profile.avatar} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User size={18} className="text-text-muted" />
            )}
          </div>
        </div>
      </nav>

      <div className={cn("flex flex-1", isFreelancer && "flex-row-reverse")}>
        {/* Sidebar */}
        <aside className={cn(
          "fixed inset-y-0 transform lg:relative lg:translate-x-0 transition duration-200 ease-in-out z-40 w-64 bg-bg-main border-border-main p-4 flex flex-col justify-between pt-20 lg:pt-4",
          isClient ? "left-0 border-r" : "right-0 border-l",
          isMobileMenuOpen 
            ? "translate-x-0" 
            : (isClient ? "-translate-x-full" : "translate-x-full")
        )}>
          <div className="space-y-1">
            {menuItems.map((item) => (
              <SidebarItem 
                key={item.to}
                to={item.to}
                icon={item.icon}
                label={item.label}
                active={location.pathname.startsWith(item.to)}
              />
            ))}
          </div>

          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-all duration-200 mt-auto"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-10 overflow-auto">
          {children}
        </main>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};
