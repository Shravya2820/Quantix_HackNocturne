import React, { useState } from 'react';
import { 
  Search, 
  Send, 
  MoreVertical, 
  Phone, 
  Video, 
  Image as ImageIcon, 
  Paperclip, 
  Smile,
  Briefcase,
  CheckCheck
} from 'lucide-react';
import { motion } from 'framer-motion';
import { MOCK_MESSAGES } from '../mockData';
import { useAuth } from '../components/AuthProvider';

export const Messages: React.FC = () => {
  const { profile } = useAuth();
  const [activeChat, setActiveChat] = useState(MOCK_MESSAGES[0]);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    // Logic to send message
    setNewMessage('');
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex gap-6">
      {/* Sidebar - Chat List */}
      <div className="w-80 flex flex-col gap-6 glass-card p-6">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold text-text-primary">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
            <input 
              type="text"
              placeholder="Search chats..."
              className="w-full bg-bg-highlight border border-border-main rounded-xl py-2 pl-10 pr-4 text-sm text-text-primary outline-none focus:border-accent-primary transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto flex flex-col gap-2 pr-2 custom-scrollbar">
          {MOCK_MESSAGES.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setActiveChat(chat)}
              className={`flex items-center gap-4 p-3 rounded-2xl transition-all text-left ${
                activeChat.id === chat.id 
                ? 'bg-accent-primary/10 border border-accent-primary/20' 
                : 'hover:bg-bg-highlight border border-transparent'
              }`}
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-xl overflow-hidden border border-border-main">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${chat.sender_name}`} alt={chat.sender_name} />
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-bg-navbar rounded-full" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-text-primary text-sm truncate">{chat.sender_name}</h4>
                  <span className="text-[10px] text-text-muted">12:45 PM</span>
                </div>
                <p className="text-xs text-text-muted truncate mt-0.5">{chat.content}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col glass-card overflow-hidden">
        {/* Chat Header */}
        <header className="p-6 border-b border-border-main flex items-center justify-between bg-bg-navbar/50 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl overflow-hidden border border-border-main">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${activeChat.sender_name}`} alt={activeChat.sender_name} />
            </div>
            <div>
              <h3 className="font-bold text-text-primary">{activeChat.sender_name}</h3>
              <div className="flex items-center gap-2 text-xs text-emerald-400">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                Online
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2.5 rounded-xl bg-bg-highlight text-text-muted hover:text-accent-primary transition-all">
              <Phone size={20} />
            </button>
            <button className="p-2.5 rounded-xl bg-bg-highlight text-text-muted hover:text-accent-primary transition-all">
              <Video size={20} />
            </button>
            <button className="p-2.5 rounded-xl bg-bg-highlight text-text-muted hover:text-accent-primary transition-all">
              <MoreVertical size={20} />
            </button>
          </div>
        </header>

        {/* Project Context Bar */}
        <div className="px-6 py-3 bg-accent-primary/5 border-b border-border-main flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Briefcase size={16} className="text-accent-primary" />
            <span className="text-xs font-bold text-text-primary">Project: E-commerce Platform Redesign</span>
          </div>
          <button className="text-[10px] font-bold text-accent-primary uppercase tracking-widest hover:underline">
            View Project
          </button>
        </div>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 custom-scrollbar">
          <div className="flex justify-center">
            <span className="px-3 py-1 bg-bg-highlight rounded-full text-[10px] font-bold text-text-muted uppercase tracking-widest">Today</span>
          </div>

          {/* Incoming Message */}
          <div className="flex gap-4 max-w-[80%]">
            <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0 mt-auto">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${activeChat.sender_name}`} alt={activeChat.sender_name} />
            </div>
            <div className="flex flex-col gap-1">
              <div className="bg-bg-highlight p-4 rounded-2xl rounded-bl-none border border-border-main">
                <p className="text-sm text-text-primary leading-relaxed">
                  {activeChat.content}
                </p>
              </div>
              <span className="text-[10px] text-text-muted ml-1">12:45 PM</span>
            </div>
          </div>

          {/* Outgoing Message */}
          <div className="flex gap-4 max-w-[80%] ml-auto flex-row-reverse">
            <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0 mt-auto">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile?.name}`} alt={profile?.name} />
            </div>
            <div className="flex flex-col gap-1 items-end">
              <div className="bg-accent-primary p-4 rounded-2xl rounded-br-none text-bg-main shadow-lg shadow-accent-primary/20">
                <p className="text-sm font-medium leading-relaxed">
                  Thanks for the update! I'll review the deliverables by tomorrow morning.
                </p>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-text-muted mr-1">
                12:48 PM <CheckCheck size={12} className="text-accent-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <footer className="p-6 border-t border-border-main bg-bg-navbar/50">
          <form onSubmit={handleSend} className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button type="button" className="p-2 text-text-muted hover:text-accent-primary transition-colors">
                <Paperclip size={20} />
              </button>
              <button type="button" className="p-2 text-text-muted hover:text-accent-primary transition-colors">
                <ImageIcon size={20} />
              </button>
            </div>
            <div className="flex-1 relative">
              <input 
                type="text"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="w-full bg-bg-highlight border border-border-main rounded-2xl py-3 px-4 pr-12 text-sm text-text-primary outline-none focus:border-accent-primary transition-all"
              />
              <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-accent-primary transition-colors">
                <Smile size={20} />
              </button>
            </div>
            <button 
              type="submit"
              className="w-12 h-12 bg-accent-primary text-bg-main rounded-xl flex items-center justify-center shadow-lg hover:bg-accent-secondary transition-all"
            >
              <Send size={20} />
            </button>
          </form>
        </footer>
      </div>
    </div>
  );
};
