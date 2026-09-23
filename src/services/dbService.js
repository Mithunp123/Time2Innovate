import { 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  addDoc, 
  query, 
  where,
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { db, COLLECTION_NAME } from '../lib/firebase';

// Initial Mock Seed Data for Fallback / Quick Startup
const SEED_PROJECTS = [
  {
    id: 'proj-1',
    token: 'token-alpha-99',
    title: 'AI-Powered Enterprise Dashboard',
    clientName: 'Nexus Tech Solutions',
    clientEmail: 'contact@nexustech.io',
    clientCompany: 'Nexus Global',
    status: 'Pending', // Pending | Confirmed | Changes Requested
    budget: '$24,500',
    timeline: '6 Weeks (Target: Nov 15, 2026)',
    createdDate: '2026-09-20',
    expiryDate: '2026-10-15',
    description: 'Custom enterprise analytics portal with automated LLM insights, real-time telemetry, and multi-tenant user access control.',
    deliverables: [
      { id: 1, title: 'Interactive Analytics Dashboard UI with Dark Glass Theme', done: false },
      { id: 2, title: 'Firebase Firestore & Realtime Data Sync Pipeline', done: false },
      { id: 3, title: 'Role-Based Access Control (RBAC) & Single Sign-On Integration', done: false },
      { id: 4, title: 'API Documentation & End-to-End Automated Test Suite', done: false }
    ],
    milestones: [
      { phase: 'Phase 1', label: 'Architecture & UX Mockups', amount: '$7,350', status: 'Completed' },
      { phase: 'Phase 2', label: 'Core Frontend & Backend Integration', amount: '$9,800', status: 'In Progress' },
      { phase: 'Phase 3', label: 'Security Audit & Final Production Deployment', amount: '$7,350', status: 'Upcoming' }
    ],
    terms: 'Payment schedule follows 30% initial deposit, 40% mid-project milestone, and 30% upon final sign-off. Change requests post-confirmation may adjust the project timeline and budget.',
    feedback: null,
    confirmedAt: null
  },
  {
    id: 'proj-2',
    token: 'token-beta-102',
    title: 'FinTech Mobile Banking Application',
    clientName: 'AeroPay Financials',
    clientEmail: 'dev@aeropay.com',
    clientCompany: 'AeroPay Inc.',
    status: 'Confirmed',
    budget: '$38,000',
    timeline: '10 Weeks (Target: Dec 01, 2026)',
    createdDate: '2026-09-15',
    expiryDate: '2026-10-01',
    description: 'Next-generation mobile payment wallet with biometric security, split payments, and instant crypto-fiat settlement.',
    deliverables: [
      { id: 1, title: 'iOS & Android Native Mobile Client (React Native)', done: true },
      { id: 2, title: 'Stripe & Plaid API Banking Gateways', done: true },
      { id: 3, title: 'Biometric Auth & PCI-DSS Security Compliance', done: false },
      { id: 4, title: 'Push Notification Server & Transaction History', done: false }
    ],
    milestones: [
      { phase: 'Phase 1', label: 'UX/UI Wireframes & API Specification', amount: '$11,400', status: 'Completed' },
      { phase: 'Phase 2', label: 'App Development & Payment Gateways', amount: '$15,200', status: 'In Progress' },
      { phase: 'Phase 3', label: 'App Store & Play Store Submissions', amount: '$11,400', status: 'Upcoming' }
    ],
    terms: 'Full IP transfer upon final payment receipt. 12-month post-launch maintenance included.',
    feedback: 'Approved by AeroPay Board on Sep 22, 2026.',
    confirmedAt: '2026-09-22T14:30:00Z'
  },
  {
    id: 'proj-3',
    token: 'token-gamma-204',
    title: 'SaaS E-Commerce Platform Modernization',
    clientName: 'Vanguard Retail Ltd',
    clientEmail: 'sarah@vanguardretail.com',
    clientCompany: 'Vanguard Retail',
    status: 'Changes Requested',
    budget: '$18,900',
    timeline: '4 Weeks (Target: Oct 30, 2026)',
    createdDate: '2026-09-18',
    expiryDate: '2026-10-10',
    description: 'High-conversion headless e-commerce frontend rebuild using Vite, React 19, and micro-frontend architecture.',
    deliverables: [
      { id: 1, title: 'Headless Storefront with Sub-Second Page Load Speed', done: false },
      { id: 2, title: 'Shopify Plus GraphQL API Integration', done: false },
      { id: 3, title: 'Automated Inventory & Cart Management System', done: false }
    ],
    milestones: [
      { phase: 'Phase 1', label: 'Design System & Component Library', amount: '$5,670', status: 'In Progress' },
      { phase: 'Phase 2', label: 'Storefront Engineering & Checkout Flow', amount: '$7,560', status: 'Upcoming' },
      { phase: 'Phase 3', label: 'SEO Audit & Launch', amount: '$5,670', status: 'Upcoming' }
    ],
    terms: 'Standard agency services agreement. 30-day warranty following launch.',
    feedback: 'Client requested adding multi-currency auto-detection feature to Phase 2.',
    confirmedAt: null
  }
];

const SEED_CLIENTS = [
  { id: 'client-1', name: 'Nexus Tech Solutions', contact: 'Alex Rivera', email: 'contact@nexustech.io', phone: '+1 (555) 019-2834', projectsCount: 1, status: 'Active' },
  { id: 'client-2', name: 'AeroPay Financials', contact: 'Marcus Vance', email: 'dev@aeropay.com', phone: '+1 (555) 018-9921', projectsCount: 1, status: 'Active' },
  { id: 'client-3', name: 'Vanguard Retail Ltd', contact: 'Sarah Jenkins', email: 'sarah@vanguardretail.com', phone: '+1 (555) 017-3342', projectsCount: 1, status: 'Review Needed' },
  { id: 'client-4', name: 'CloudScale Systems', contact: 'David Thorne', email: 'd.thorne@cloudscale.net', phone: '+1 (555) 012-4411', projectsCount: 0, status: 'Lead' }
];

const SEED_TEMPLATES = [
  {
    id: 'tpl-1',
    title: 'Full-Stack Web Application Proposal',
    category: 'Web Development',
    estimatedBudget: '$20,000 - $35,000',
    duration: '6-8 Weeks',
    description: 'Standard agency template for modern React/Node web apps with authentication, admin portal, and database architecture.',
    deliverables: ['Custom UI/UX Design', 'Frontend Development (React/Vite)', 'REST/GraphQL API Setup', 'Database & Cloud Deployment']
  },
  {
    id: 'tpl-2',
    title: 'Mobile App MVP Scope',
    category: 'Mobile App',
    estimatedBudget: '$25,000 - $45,000',
    duration: '8-10 Weeks',
    description: 'Complete cross-platform iOS & Android application template including push notifications, authentication, and payment portal.',
    deliverables: ['Cross-Platform App (React Native)', 'Backend Server Setup', 'Push Notifications API', 'App Store / Play Store Release']
  },
  {
    id: 'tpl-3',
    title: 'AI Integration & Automation Pipeline',
    category: 'Artificial Intelligence',
    estimatedBudget: '$15,000 - $30,000',
    duration: '4-6 Weeks',
    description: 'Template for integrating OpenAI, Gemini, or custom LLM workflows into existing web applications.',
    deliverables: ['LLM Prompt Engineering', 'RAG / Vector Database Setup', 'Custom AI Copilot UI', 'Latency & Token Optimization']
  }
];

const SEED_DOCUMENTS = [
  { id: 'doc-1', title: 'Nexus_AI_Dashboard_Proposal_v2.pdf', project: 'AI-Powered Enterprise Dashboard', size: '2.4 MB', date: '2026-09-20', type: 'Proposal' },
  { id: 'doc-2', title: 'AeroPay_Banking_Signed_Contract.pdf', project: 'FinTech Mobile Banking Application', size: '4.1 MB', date: '2026-09-22', type: 'Contract' },
  { id: 'doc-3', title: 'Vanguard_Change_Request_Note.pdf', project: 'SaaS E-Commerce Platform Modernization', size: '1.2 MB', date: '2026-09-18', type: 'Change Request' }
];

const SEED_ACTIVITIES = [
  { id: 'act-1', text: 'Project token "token-alpha-99" viewed by client Nexus Tech', time: '10 mins ago', type: 'view' },
  { id: 'act-2', text: 'Project "FinTech Mobile Banking Application" status updated to Confirmed', time: '1 hour ago', type: 'confirm' },
  { id: 'act-3', text: 'Change request submitted for "SaaS E-Commerce Platform Modernization"', time: '3 hours ago', type: 'change' },
  { id: 'act-4', text: 'New project "AI-Powered Enterprise Dashboard" created by Admin', time: '1 day ago', type: 'create' }
];

// Helper to get local data from localStorage if Firestore is not available
const getLocalStore = (key, defaultData) => {
  try {
    const item = localStorage.getItem(`t2i_${key}`);
    return item ? JSON.parse(item) : defaultData;
  } catch {
    return defaultData;
  }
};

const setLocalStore = (key, data) => {
  try {
    localStorage.setItem(`t2i_${key}`, JSON.stringify(data));
  } catch (e) {
    console.error("Local storage error:", e);
  }
};

// Database Service Engine (uses Firestore `confirm` collection alongside `qr_codes` in (default) db)
export const dbService = {
  // Check if real Firebase Firestore is active
  isFirebaseActive: () => Boolean(db),

  // Initialize and populate 'confirm' collection in the same (default) Firestore database
  initDatabase: async () => {
    if (db) {
      try {
        const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
        if (querySnapshot.empty) {
          console.log("Populating 'confirm' collection into (default) Firestore database...");
          for (const proj of SEED_PROJECTS) {
            await setDoc(doc(db, COLLECTION_NAME, proj.id), proj, { merge: true });
          }
        }
      } catch (err) {
        console.warn("Firestore auto-init warning:", err);
      }
    }
  },

  // ==========================================
  // PROJECTS & CONFIRMATIONS (`confirm` collection)
  // ==========================================
  getProjects: async () => {
    if (db) {
      try {
        const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
        const list = [];
        querySnapshot.forEach((docSnap) => {
          list.push({ id: docSnap.id, ...docSnap.data() });
        });
        if (list.length > 0) return list;
        
        // If Firestore confirm collection is empty, auto-seed sample projects so tokens work out of the box
        await dbService.seedSampleData();
        return SEED_PROJECTS;
      } catch (err) {
        console.warn("Firestore fetch error, fallback to local store:", err);
      }
    }
    return getLocalStore('projects', SEED_PROJECTS);
  },

  getProjectByToken: async (token) => {
    if (db) {
      try {
        const q = query(collection(db, COLLECTION_NAME), where('token', '==', token));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const docSnap = querySnapshot.docs[0];
          return { id: docSnap.id, ...docSnap.data() };
        }
      } catch (err) {
        console.warn("Firestore getProjectByToken error, fallback to local store:", err);
      }
    }
    const projects = getLocalStore('projects', SEED_PROJECTS);
    const found = projects.find((p) => p.token === token);
    if (found && db) {
      try {
        await setDoc(doc(db, COLLECTION_NAME, found.id), found, { merge: true });
      } catch (err) {
        console.warn("Firestore sync project error:", err);
      }
    }
    return found || null;
  },

  getProjectById: async (id) => {
    if (db) {
      try {
        const docRef = doc(db, COLLECTION_NAME, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          return { id: docSnap.id, ...docSnap.data() };
        }
      } catch (err) {
        console.warn("Firestore getProjectById error:", err);
      }
    }
    const projects = getLocalStore('projects', SEED_PROJECTS);
    return projects.find((p) => p.id === id) || null;
  },

  createProject: async (projectData) => {
    const newId = `proj-${Date.now()}`;
    const token = projectData.token || `token-${Math.random().toString(36).substring(2, 9)}`;
    const fullProject = {
      id: newId,
      token,
      title: projectData.title || 'Untitled Project',
      clientName: projectData.clientName || 'Client',
      clientEmail: projectData.clientEmail || '',
      clientCompany: projectData.clientCompany || '',
      status: 'Pending',
      budget: projectData.budget || '$0',
      timeline: projectData.timeline || '4 Weeks',
      createdDate: new Date().toISOString().split('T')[0],
      expiryDate: projectData.expiryDate || '2026-12-31',
      description: projectData.description || '',
      deliverables: projectData.deliverables || [],
      milestones: projectData.milestones || [],
      terms: projectData.terms || 'Standard Agency Services Agreement',
      feedback: null,
      confirmedAt: null,
      createdAt: new Date().toISOString()
    };

    if (db) {
      try {
        await setDoc(doc(db, COLLECTION_NAME, newId), fullProject);
      } catch (err) {
        console.warn("Firestore createProject error, writing to local store:", err);
      }
    }

    // Always update local cache
    const projects = getLocalStore('projects', SEED_PROJECTS);
    const updated = [fullProject, ...projects];
    setLocalStore('projects', updated);

    // Log Activity
    await dbService.logActivity(`New project "${fullProject.title}" created with token ${token}`, 'create');

    return fullProject;
  },

  confirmProject: async (token, clientFeedback = '', signatureUrl = null) => {
    const nowIso = new Date().toISOString();
    let updatedProject = null;

    if (db) {
      try {
        const q = query(collection(db, COLLECTION_NAME), where('token', '==', token));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const docRef = querySnapshot.docs[0].ref;
          await updateDoc(docRef, {
            status: 'Confirmed',
            confirmedAt: nowIso,
            feedback: clientFeedback || 'Approved by client via public token link.',
            ...(signatureUrl ? { signatureUrl } : {})
          });
        }
      } catch (err) {
        console.warn("Firestore confirmProject error:", err);
      }
    }

    const projects = getLocalStore('projects', SEED_PROJECTS);
    const updatedList = projects.map((p) => {
      if (p.token === token) {
        updatedProject = {
          ...p,
          status: 'Confirmed',
          confirmedAt: nowIso,
          feedback: clientFeedback || 'Approved by client via public token link.',
          ...(signatureUrl ? { signatureUrl } : (p.signatureUrl ? { signatureUrl: p.signatureUrl } : {}))
        };
        return updatedProject;
      }
      return p;
    });
    setLocalStore('projects', updatedList);

    if (updatedProject) {
      await dbService.logActivity(`Project "${updatedProject.title}" (Token: ${token}) was CONFIRMED with digital signature!`, 'confirm');
    }

    return updatedProject;
  },

  requestChanges: async (token, changesData) => {
    let updatedProject = null;
    const feedbackText = typeof changesData === 'string' ? changesData : changesData.feedback;

    if (db) {
      try {
        const q = query(collection(db, COLLECTION_NAME), where('token', '==', token));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const docRef = querySnapshot.docs[0].ref;
          await updateDoc(docRef, {
            status: 'Changes Requested',
            feedback: feedbackText
          });
        }
      } catch (err) {
        console.warn("Firestore requestChanges error:", err);
      }
    }

    const projects = getLocalStore('projects', SEED_PROJECTS);
    const updatedList = projects.map((p) => {
      if (p.token === token) {
        updatedProject = {
          ...p,
          status: 'Changes Requested',
          feedback: feedbackText
        };
        return updatedProject;
      }
      return p;
    });
    setLocalStore('projects', updatedList);

    if (updatedProject) {
      await dbService.logActivity(`Client submitted scope change request for project "${updatedProject.title}"`, 'change');
    }

    return updatedProject;
  },

  deleteProject: async (id) => {
    if (db) {
      try {
        await setDoc(doc(db, COLLECTION_NAME, id), { deleted: true }, { merge: true });
      } catch (err) {
        console.warn("Firestore delete error:", err);
      }
    }
    const projects = getLocalStore('projects', SEED_PROJECTS);
    const filtered = projects.filter((p) => p.id !== id);
    setLocalStore('projects', filtered);
  },

  // ==========================================
  // CLIENTS
  // ==========================================
  getClients: async () => {
    return getLocalStore('clients', SEED_CLIENTS);
  },

  addClient: async (clientData) => {
    const clients = getLocalStore('clients', SEED_CLIENTS);
    const newClient = {
      id: `client-${Date.now()}`,
      name: clientData.name,
      contact: clientData.contact || clientData.name,
      email: clientData.email,
      phone: clientData.phone || 'N/A',
      projectsCount: 0,
      status: 'Active'
    };
    const updated = [newClient, ...clients];
    setLocalStore('clients', updated);
    await dbService.logActivity(`Added new client "${newClient.name}"`, 'create');
    return newClient;
  },

  // ==========================================
  // TEMPLATES
  // ==========================================
  getTemplates: async () => {
    return getLocalStore('templates', SEED_TEMPLATES);
  },

  // ==========================================
  // DOCUMENTS
  // ==========================================
  getDocuments: async () => {
    return getLocalStore('documents', SEED_DOCUMENTS);
  },

  // ==========================================
  // ACTIVITIES & AUDIT LOG
  // ==========================================
  getActivities: async () => {
    return getLocalStore('activities', SEED_ACTIVITIES);
  },

  logActivity: async (text, type = 'info') => {
    const activities = getLocalStore('activities', SEED_ACTIVITIES);
    const newAct = {
      id: `act-${Date.now()}`,
      text,
      time: 'Just now',
      type
    };
    const updated = [newAct, ...activities.slice(0, 29)];
    setLocalStore('activities', updated);
  },

  // ==========================================
  // SYNC & SEED UTILITY
  // ==========================================
  getLastFirestoreError: () => lastFirestoreError,

  syncAllToFirestore: async () => {
    if (!db) throw new Error("Firebase Firestore instance is not initialized.");
    const projects = getLocalStore('projects', SEED_PROJECTS);
    let successCount = 0;

    for (const proj of projects) {
      try {
        await setDoc(doc(db, COLLECTION_NAME, proj.id), proj, { merge: true });
        successCount++;
      } catch (err) {
        lastFirestoreError = err.message || String(err);
        console.error(`Failed to write project ${proj.id} to Firestore:`, err);
        throw err;
      }
    }
    lastFirestoreError = null;
    return successCount;
  },

  seedSampleData: async () => {
    setLocalStore('projects', SEED_PROJECTS);
    setLocalStore('clients', SEED_CLIENTS);
    setLocalStore('templates', SEED_TEMPLATES);
    setLocalStore('documents', SEED_DOCUMENTS);
    setLocalStore('activities', SEED_ACTIVITIES);

    if (db) {
      try {
        for (const proj of SEED_PROJECTS) {
          await setDoc(doc(db, COLLECTION_NAME, proj.id), proj);
        }
        lastFirestoreError = null;
      } catch (err) {
        lastFirestoreError = err.message || String(err);
        console.warn("Firestore seed error:", err);
      }
    }
    return true;
  }
};

let lastFirestoreError = null;

