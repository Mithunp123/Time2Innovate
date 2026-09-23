import { useState, useEffect } from 'react'
import { Routes, Route, Link, useNavigate, useLocation, Navigate } from 'react-router-dom'
import { Menu, X, ArrowUpRight, MapPin } from 'lucide-react'
import { AnimatedElement } from './components'
import { NAV_LINKS, VIDEO_URL } from './data'
import SocialSection from './SocialSection'
import HomePage from './pages/HomePage'
import ProjectsPage from './pages/ProjectsPage'
import CareersPage from './pages/CareersPage'

// Public Confirmation Pages
import ProjectConfirmPage from './pages/confirm/ProjectConfirmPage'
import ConfirmSuccessPage from './pages/confirm/ConfirmSuccessPage'
import RequestChangesPage from './pages/confirm/RequestChangesPage'

// Admin Pages
import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import ProjectsOverviewPage from './pages/admin/ProjectsOverviewPage'
import CreateProjectPage from './pages/admin/CreateProjectPage'
import ProjectDetailsPage from './pages/admin/ProjectDetailsPage'
import ClientsPage from './pages/admin/ClientsPage'
import TemplatesPage from './pages/admin/TemplatesPage'
import DocumentsPage from './pages/admin/DocumentsPage'
import ActivityPage from './pages/admin/ActivityPage'
import SettingsPage from './pages/admin/SettingsPage'
import AdminProtectedRoute from './components/admin/AdminProtectedRoute'
import { dbService } from './services/dbService'

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  // Auto-init Firestore 'confirm' collection in the same (default) database alongside 'qr_codes'
  useEffect(() => {
    dbService.initDatabase();
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  /* Close mobile menu on route change */
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const handleNavClick = (e, link) => {
    e.preventDefault()
    setMenuOpen(false)

    if (link.isRoute) {
      navigate(link.href)
      return
    }

    /* Hash-based section link */
    if (location.pathname === '/') {
      const el = document.querySelector(link.href)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/' + link.href)
    }
  }

  // Determine if current route is a standalone portal route (Confirm or Admin)
  const isConfirmRoute = location.pathname.startsWith('/confirm')
  const isAdminRoute = [
    '/dashboard', 
    '/projects', 
    '/clients', 
    '/templates', 
    '/documents', 
    '/activity', 
    '/settings', 
    '/admin'
  ].some(path => location.pathname === path || location.pathname.startsWith(path + '/'))

  const isStandaloneRoute = isConfirmRoute || isAdminRoute

  return (
    <div className="relative w-full bg-black text-white min-h-screen print:bg-white print:text-slate-900 print:min-h-0 print:h-auto">
      {/* If marketing page, render background video */}
      {!isStandaloneRoute && (
        <>
          <video
            className="fixed inset-0 w-full h-full object-cover print:hidden"
            style={{ zIndex: 0 }}
            src={VIDEO_URL}
            autoPlay
            loop
            muted
            playsInline
          />
          <div
            className="fixed inset-0 pointer-events-none print:hidden"
            style={{
              zIndex: 1,
              WebkitBackdropFilter: 'blur(24px)',
              backdropFilter: 'blur(24px)',
              WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 45%)',
              maskImage: 'linear-gradient(to top, black 0%, transparent 45%)',
            }}
          />
        </>
      )}

      {/* Main Container */}
      <div className="relative" style={{ zIndex: 10 }}>
        {/* Render Navbar only for marketing pages */}
        {!isStandaloneRoute && (
          <>
            <nav
              className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 md:px-12 transition-all duration-500 ${
                location.pathname === '/portfolio'
                  ? 'py-3 md:py-4 bg-white/80 backdrop-blur-xl border-b border-slate-200/80 shadow-sm'
                  : scrolled
                  ? 'py-3 md:py-4 bg-black/60 backdrop-blur-xl border-b border-white/5'
                  : 'py-4 md:py-6'
              }`}
            >
              {/* Logo */}
              <AnimatedElement delay={0}>
                <Link
                  to="/"
                  className="select-none h-12 sm:h-14 md:h-20 flex items-center"
                >
                  <img className="h-full w-auto object-contain" src="/T2I-log.png" alt="Time2Innovate logo" />
                </Link>
              </AnimatedElement>

              {/* Desktop Nav Links */}
              <div className="hidden lg:flex items-center gap-8">
                {NAV_LINKS.map((link, i) => (
                  <AnimatedElement key={link.label} delay={100 + i * 50}>
                    <a
                      href={link.isRoute ? link.href : link.href}
                      onClick={(e) => handleNavClick(e, link)}
                      className={`text-sm font-medium transition-colors duration-300 ${
                        location.pathname === '/portfolio'
                          ? 'text-slate-800 hover:text-blue-600 font-semibold'
                          : 'text-white hover:text-gray-300'
                      }`}
                    >
                      {link.label}
                    </a>
                  </AnimatedElement>
                ))}
              </div>

              {/* Right Side */}
              <div className="flex items-center gap-3">
                <AnimatedElement delay={350} className="hidden sm:block">
                  <button
                    onClick={(e) =>
                      handleNavClick(e, { href: '#contact', isRoute: false })
                    }
                    className={`rounded-full px-4 md:px-6 py-2 flex items-center gap-2 text-sm font-semibold cursor-pointer transition-colors duration-300 ${
                      location.pathname === '/portfolio'
                        ? 'bg-slate-900 hover:bg-slate-800 text-white shadow-sm'
                        : 'liquid-glass text-white hover:bg-white/5'
                    }`}
                  >
                    <span>Contact Us</span>
                    <ArrowUpRight size={18} />
                  </button>
                </AnimatedElement>

                <AnimatedElement delay={400} className="lg:hidden">
                  <button
                    onClick={() => setMenuOpen((v) => !v)}
                    className="liquid-glass w-10 h-10 rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-white/5 transition-colors duration-300 relative"
                    aria-label="Toggle menu"
                  >
                    <span
                      className={`absolute transition-all duration-500 ease-out ${
                        menuOpen
                          ? 'rotate-180 opacity-0 scale-50'
                          : 'rotate-0 opacity-100 scale-100'
                      }`}
                    >
                      <Menu size={18} />
                    </span>
                    <span
                      className={`absolute transition-all duration-500 ease-out ${
                        menuOpen
                          ? 'rotate-0 opacity-100 scale-100'
                          : '-rotate-180 opacity-0 scale-50'
                      }`}
                    >
                      <X size={18} />
                    </span>
                  </button>
                </AnimatedElement>
              </div>
            </nav>

            {/* Mobile Menu */}
            <div
              className={`fixed left-0 right-0 z-40 lg:hidden transition-all duration-500 ease-out ${
                menuOpen
                  ? 'translate-y-0 opacity-100'
                  : '-translate-y-4 opacity-0 pointer-events-none'
              }`}
              style={{ top: '72px' }}
            >
              <div className="bg-gray-900/95 backdrop-blur-lg border-t border-b border-gray-800 shadow-2xl">
                <div className="flex flex-col px-4 py-2">
                  {NAV_LINKS.map((link, i) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link)}
                      className="animate-slide-in py-3 px-3 rounded-lg text-white hover:bg-gray-800/50 transition-colors duration-300 text-sm"
                      style={{
                        animationDelay: menuOpen ? `${i * 50}ms` : '0ms',
                        opacity: menuOpen ? undefined : 0,
                      }}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* ====================================
            All Application Routes
            ==================================== */}
        <Routes>
          {/* Public Marketing Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolio" element={<ProjectsPage />} />
          <Route path="/careers" element={<CareersPage />} />

          {/* PUBLIC Confirmation Routes */}
          <Route path="/confirm/:token" element={<ProjectConfirmPage />} />
          <Route path="/confirm/:token/success" element={<ConfirmSuccessPage />} />
          <Route path="/confirm/:token/changes" element={<RequestChangesPage />} />

          {/* ADMIN Portal Routes (Protected by 'allowme' passcode) */}
          <Route path="/admin" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<AdminProtectedRoute><AdminDashboardPage /></AdminProtectedRoute>} />
          <Route path="/projects" element={<AdminProtectedRoute><ProjectsOverviewPage /></AdminProtectedRoute>} />
          <Route path="/projects/create" element={<AdminProtectedRoute><CreateProjectPage /></AdminProtectedRoute>} />
          <Route path="/projects/:id" element={<AdminProtectedRoute><ProjectDetailsPage /></AdminProtectedRoute>} />
          <Route path="/clients" element={<AdminProtectedRoute><ClientsPage /></AdminProtectedRoute>} />
          <Route path="/templates" element={<AdminProtectedRoute><TemplatesPage /></AdminProtectedRoute>} />
          <Route path="/documents" element={<AdminProtectedRoute><DocumentsPage /></AdminProtectedRoute>} />
          <Route path="/activity" element={<AdminProtectedRoute><ActivityPage /></AdminProtectedRoute>} />
          <Route path="/settings" element={<AdminProtectedRoute><SettingsPage /></AdminProtectedRoute>} />
        </Routes>

        {/* Render Footer only for marketing pages */}
        {!isStandaloneRoute && (
          <footer className="relative bg-black border-t border-white/5">
            <div className="px-4 sm:px-6 md:px-12 py-12 md:py-16">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
                <div className="lg:col-span-2">
                  <Link to="/" className="text-xl font-bold tracking-widest">
                    TIME2INNOVATE
                  </Link>
                  <p className="text-gray-400 text-sm sm:text-base mt-3 max-w-md leading-relaxed">
                    Empowering businesses with intelligent, future-ready technology.
                  </p>
                  <div className="flex items-start gap-2 mt-4 text-gray-500 text-sm">
                    <MapPin size={16} className="mt-0.5 shrink-0" />
                    <span>Erode, Tamil Nadu, India</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium tracking-wider uppercase text-gray-300 mb-4">
                    Quick Links
                  </h4>
                  <div className="flex flex-col gap-2.5">
                    {NAV_LINKS.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link)}
                        className="text-sm text-gray-500 hover:text-white transition-colors duration-300"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium tracking-wider uppercase text-gray-300 mb-4">
                    Company
                  </h4>
                  <div className="flex flex-col gap-2.5 text-sm text-gray-500">
                    <Link to="/careers" className="hover:text-white transition-colors duration-300">
                      Careers
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="section-divider" />
            <div className="px-4 sm:px-6 md:px-12">
              <SocialSection />
            </div>

            <div className="section-divider" />
            <div className="px-4 sm:px-6 md:px-12 py-6 text-center text-gray-600 text-sm">
              © {new Date().getFullYear()} Time2Innovate. All rights reserved.
            </div>
          </footer>
        )}
      </div>
    </div>
  )
}
