import { Project, Profile, Milestone, Dispute, Application, Notification, Message } from './types';

export const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    client_id: 'demo-client',
    client_name: 'Acme Corp',
    client_rating: 4.8,
    status: 'active',
    title: 'AI Chatbot Web App',
    description: 'Develop a modern AI chatbot interface with real-time streaming responses.',
    budget: 4500,
    createdAt: Date.now() - 86400000 * 5,
    milestoneCount: 4,
    escrowState: 'funded',
    category: 'AI Development',
    deadline: '2024-05-01'
  },
  {
    id: '2',
    client_id: 'demo-client',
    client_name: 'Acme Corp',
    client_rating: 4.8,
    status: 'hiring',
    title: 'Blockchain Voting System',
    description: 'Secure and transparent voting system built on Ethereum.',
    budget: 3000,
    createdAt: Date.now() - 86400000 * 2,
    milestoneCount: 3,
    escrowState: 'unfunded',
    category: 'Web3',
    deadline: '2024-06-15'
  },
  {
    id: '3',
    client_id: 'other-client',
    client_name: 'Global Tech',
    client_rating: 4.5,
    status: 'hiring',
    title: 'Portfolio Website Redesign',
    description: 'Minimalist portfolio for a creative director.',
    budget: 1200,
    createdAt: Date.now() - 86400000 * 30,
    milestoneCount: 2,
    escrowState: 'unfunded',
    category: 'Design',
    deadline: '2024-04-20'
  }
];

export const MOCK_MILESTONES: Milestone[] = [
  {
    id: 'm1',
    project_id: '1',
    title: 'UI/UX Design',
    description: 'Create high-fidelity mockups for the chatbot interface.',
    amount: 1000,
    deadline: '2024-04-01',
    status: 'approved',
    attempts: 1,
    dispute_count: 0
  },
  {
    id: 'm2',
    project_id: '1',
    title: 'Backend Integration',
    description: 'Connect the frontend to the Gemini API.',
    amount: 1500,
    deadline: '2024-04-15',
    status: 'submitted',
    attempts: 2,
    dispute_count: 1
  }
];

export const MOCK_DISPUTES: Dispute[] = [
  {
    id: 'd1',
    project_id: '1',
    project_title: 'AI Chatbot Web App',
    milestone_id: 'm2',
    freelancer_name: 'John Doe',
    client_name: 'Acme Corp',
    reason: 'Deliverables do not match the agreed scope.',
    status: 'active',
    createdAt: Date.now() - 86400000,
    summary: 'Client claims the API integration is slow and buggy.'
  },
  {
    id: 'd2',
    project_id: '3',
    project_title: 'Portfolio Website Redesign',
    milestone_id: 'm1',
    freelancer_name: 'Jane Smith',
    client_name: 'Global Tech',
    reason: 'Delayed delivery.',
    status: 'resolved',
    outcome: 'Freelancer paid 80%, 20% refunded to client.',
    createdAt: Date.now() - 86400000 * 10,
    summary: 'The project was delayed by 2 weeks.'
  }
];

export const MOCK_APPLICATIONS: Application[] = [
  {
    id: 'a1',
    project_id: '2',
    project_title: 'Blockchain Voting System',
    freelancer_id: 'demo-freelancer',
    cover_message: 'I have extensive experience with Solidity and React.',
    estimated_time: '4 weeks',
    portfolio_link: 'https://github.com/johndoe',
    bid_amount: 3000,
    delivery_time: '30 days',
    status: 'pending',
    createdAt: Date.now() - 86400000
  }
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    userId: 'demo-client',
    title: 'New Submission',
    message: 'John Doe submitted work for Milestone 2.',
    type: 'info',
    read: false,
    createdAt: Date.now() - 3600000
  },
  {
    id: 'n2',
    userId: 'demo-client',
    title: 'Payment Released',
    message: 'Payment for Milestone 1 has been released.',
    type: 'success',
    read: true,
    createdAt: Date.now() - 86400000
  }
];

export const MOCK_MESSAGES: Message[] = [
  {
    id: 'msg1',
    project_id: '1',
    sender_id: 'demo-client',
    sender_name: 'Acme Corp',
    content: 'Hi John, how is the progress on the backend?',
    createdAt: Date.now() - 86400000
  },
  {
    id: 'msg2',
    project_id: '1',
    sender_id: 'demo-freelancer',
    sender_name: 'John Doe',
    content: 'Going well! I just finished the API integration.',
    createdAt: Date.now() - 86400000 + 3600000
  }
];

export const MOCK_FREELANCER_STATS = {
  applicationsSent: 12,
  activeContracts: 3,
  clientRating: 4.9,
  completedContracts: 25,
  totalEarnings: 125000
};

export const MOCK_CLIENT_STATS = {
  activeProjects: 3,
  escrowLocked: 7500,
  milestonesPending: 5,
  disputesOpen: 1
};
