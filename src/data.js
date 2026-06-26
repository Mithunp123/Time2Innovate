import {
  Brain,
  Code,
  Cloud,
  Shield,
  Rocket,
  TrendingUp,
} from 'lucide-react'

/* ========================================
   Navigation
   ======================================== */

export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
  { label: 'Careers', href: '/careers', isRoute: true },
]

/* ========================================
   Services
   ======================================== */

export const SERVICES = [
  {
    icon: Brain,
    title: 'AI & Machine Learning',
    description:
      'Custom AI models, natural language processing, computer vision, and predictive analytics that transform raw data into competitive advantage.',
  },
  {
    icon: Code,
    title: 'Enterprise Software',
    description:
      'Scalable, secure enterprise applications built with modern architectures that streamline operations and drive organizational efficiency.',
  },
  {
    icon: Cloud,
    title: 'Cloud Infrastructure',
    description:
      'End-to-end cloud solutions including migration, optimization, and management across AWS, Azure, and Google Cloud platforms.',
  },
  {
    icon: Shield,
    title: 'Cybersecurity',
    description:
      'Comprehensive security solutions including threat detection, vulnerability assessment, compliance management, and incident response.',
  },
  {
    icon: Rocket,
    title: 'Digital Transformation',
    description:
      'Strategic consulting and implementation services that modernize legacy systems and create seamless digital experiences.',
  },
  {
    icon: TrendingUp,
    title: 'Data Analytics',
    description:
      'Advanced analytics platforms that turn complex data into clear, actionable business intelligence and reporting dashboards.',
  },
]

/* ========================================
   Projects (All 10)
   ======================================== */

export const ALL_PROJECTS = [
  {
    title: 'Time2Order',
    category: 'Local Commerce',
    type: 'product',
    description:
      'A local commerce platform that enables customers to pre-order products from nearby shops while providing vendors with inventory, order, subscription, and payment management.',
    gradient: 'from-blue-500/20 via-indigo-500/10',
    glow: 'rgba(59,130,246,0.15)',
    link: 'https://time2orders.com',
  },
  {
    title: 'Time2Due',
    category: 'Payments & Reminders',
    type: 'product',
    description:
      'A due date and payment reminder platform that helps individuals and businesses manage pending payments, reminders, and schedules efficiently.',
    gradient: 'from-violet-500/20 via-purple-500/10',
    glow: 'rgba(139,92,246,0.15)',
    link: '#',
  },
  {
    title: 'Time2Farm',
    category: 'Agriculture Tech',
    type: 'product',
    description:
      'A digital agriculture management platform designed to assist farmers in managing crops, farming activities, agricultural records, and related information.',
    gradient: 'from-emerald-500/20 via-green-500/10',
    glow: 'rgba(16,185,129,0.15)',
    link: 'https://time2farm.pages.dev',
  },
  {
    title: 'Time2Confirm',
    category: 'Verification & Approval',
    type: 'product',
    description:
      'A digital verification and approval management platform that streamlines document verification, confirmation workflows, and approval processes.',
    gradient: 'from-cyan-500/20 via-teal-500/10',
    glow: 'rgba(6,182,212,0.15)',
    link: 'https://time2confirm.pages.dev',
  },
  {
    title: 'Time2Track',
    category: 'Tracking & Monitoring',
    type: 'product',
    description:
      'A tracking and monitoring platform designed to manage records, monitor activities, and provide real-time status updates through an organized dashboard.',
    gradient: 'from-lime-500/20 via-emerald-500/10',
    glow: 'rgba(132,204,22,0.15)',
    link: 'https://ctc.vikast.me/login',
  },
  {
    title: 'Propic',
    category: 'Business Web Platform',
    type: 'service',
    description:
      'A professional business web platform developed to provide a modern, responsive, and user-friendly online presence for business operations.',
    gradient: 'from-rose-500/20 via-pink-500/10',
    glow: 'rgba(244,63,94,0.15)',
    link: 'https://www.propic.in/',
  },
  {
    title: 'AutoRevives',
    category: 'Vehicle Marketplace',
    type: 'service',
    description:
      'An online vehicle auction and marketplace platform where users can list, browse, and bid on vehicles through a secure digital environment.',
    gradient: 'from-amber-500/20 via-orange-500/10',
    glow: 'rgba(245,158,11,0.15)',
    link: 'https://autorevives.com/',
  },
  {
    title: 'TheAstro Billing System',
    category: 'Billing & Invoicing',
    type: 'service',
    description:
      'A comprehensive billing and invoice management system developed for an astrology business, enabling customer management, invoice generation, and payment tracking.',
    gradient: 'from-yellow-500/20 via-amber-500/10',
    glow: 'rgba(234,179,8,0.15)',
    link: 'https://theastrotech.pages.dev/login',
  },
  {
    title: 'TheAstro Portfolio Website',
    category: 'Portfolio & Branding',
    type: 'service',
    description:
      'A professional portfolio website showcasing astrology services, consultation details, business information, and customer engagement features.',
    gradient: 'from-slate-400/20 via-blue-400/10',
    glow: 'rgba(148,163,184,0.15)',
    link: 'https://theastro.pages.dev/',
  },
  {
    title: 'Challengers Trust Blood Management',
    category: 'Healthcare',
    type: 'service',
    description:
      'A blood donation and blood bank management system that connects donors, hospitals, and patients while simplifying blood inventory management and emergency requests.',
    gradient: 'from-red-500/20 via-rose-500/10',
    glow: 'rgba(239,68,68,0.15)',
    link: 'https://ctrust.pages.dev/',
  },
]

/* Featured projects shown on home page */
export const FEATURED_PROJECTS = ALL_PROJECTS.filter((p) =>
  ['Time2Order', 'Time2Farm', 'Time2Confirm'].includes(p.title)
)

/* ========================================
   Stats
   ======================================== */

export const STATS = [
  { value: '2+', label: 'Years Experience' },
  { value: '10+', label: 'Projects Delivered' },
  { value: '10+', label: 'Team Members' },
  { value: '98%', label: 'Client Satisfaction' },
]

/* ========================================
   Social Media Links
   ======================================== */

export const SOCIAL_LINKS = [
  { name: 'LinkedIn', url: 'https://linkedin.com' },
  { name: 'X (Twitter)', url: 'https://x.com' },
  { name: 'Instagram', url: 'https://instagram.com' },
  { name: 'Facebook', url: 'https://facebook.com' },
  { name: 'YouTube', url: 'https://youtube.com' },
]

/* ========================================
   Video
   ======================================== */

export const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_094145_4a271a6c-3869-4f1c-8aa7-aeb0cb227994.mp4'
