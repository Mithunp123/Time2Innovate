import { useState, useEffect } from 'react'
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'
import { Menu, X, ArrowUpRight, MapPin } from 'lucide-react'
import { AnimatedElement } from './components'
import { NAV_LINKS, VIDEO_URL } from './data'
import SocialSection from './SocialSection'
import HomePage from './pages/HomePage'
import ProjectsPage from './pages/ProjectsPage'
import CareersPage from './pages/CareersPage'

/* ========================================
   Main App (Layout + Router)
   ======================================== */

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

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

  return (
    <div className="relative w-full bg-black text-white">
      {/* ========================================
          Background Video
          ======================================== */}
      <video
        className="fixed inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
        src={VIDEO_URL}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* ========================================
          Bottom Blur Overlay
          ======================================== */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          WebkitBackdropFilter: 'blur(24px)',
          backdropFilter: 'blur(24px)',
          WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 45%)',
          maskImage: 'linear-gradient(to top, black 0%, transparent 45%)',
        }}
      />

      {/* ========================================
          Main Content
          ======================================== */}
      <div className="relative" style={{ zIndex: 10 }}>
        {/* ====================================
            Fixed Navbar
            ==================================== */}
        <nav
          className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 md:px-12 transition-all duration-500 ${
            scrolled
              ? 'py-3 md:py-4 bg-black/60 backdrop-blur-xl border-b border-white/5'
              : 'py-4 md:py-6'
          }`}
        >
          {/* Logo */}
          <AnimatedElement delay={0}>
            <Link
              to="/"
              className="text-xl md:text-2xl font-bold tracking-widest select-none h-8 md:h-10 flex items-center"
            >
              <img className="h-28 md:h-28" src="/T2I-logo.png" alt="Logo" />
            </Link>
          </AnimatedElement>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link, i) => (
              <AnimatedElement key={link.label} delay={100 + i * 50}>
                <a
                  href={link.isRoute ? link.href : link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className="text-sm text-white hover:text-gray-300 transition-colors duration-300"
                >
                  {link.label}
                </a>
              </AnimatedElement>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Contact Us Button */}
            <AnimatedElement delay={350} className="hidden sm:block">
              <button
                onClick={(e) =>
                  handleNavClick(e, { href: '#contact', isRoute: false })
                }
                className="liquid-glass rounded-full px-4 md:px-6 py-2 flex items-center gap-2 text-sm text-white cursor-pointer hover:bg-white/5 transition-colors duration-300"
              >
                <span>Contact Us</span>
                <ArrowUpRight size={18} />
              </button>
            </AnimatedElement>

            {/* Hamburger Menu (below lg) */}
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

        {/* ====================================
            Mobile Menu
            ==================================== */}
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
            <div className="sm:hidden border-t border-gray-800 px-4 py-4 flex items-center gap-3">
              <button
                onClick={(e) =>
                  handleNavClick(e, { href: '#contact', isRoute: false })
                }
                className="liquid-glass rounded-full px-4 py-2 flex items-center gap-2 text-sm text-white cursor-pointer flex-1 justify-center"
              >
                <span>Contact Us</span>
                <ArrowUpRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* ====================================
            Page Routes
            ==================================== */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/careers" element={<CareersPage />} />
        </Routes>

        {/* ====================================
            Footer
            ==================================== */}
        <footer className="relative bg-black border-t border-white/5">
          <div className="px-4 sm:px-6 md:px-12 py-12 md:py-16">
            {/* Main Footer Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
              {/* Brand Column */}
              <div className="lg:col-span-2">
                <Link to="/" className="text-xl font-bold tracking-widest">
                  TIME2INNOVATE
                </Link>
                <p className="text-gray-400 text-sm sm:text-base mt-3 max-w-md leading-relaxed">
                  Empowering businesses with intelligent, future-ready technology.
                  We don't just build software — we engineer the digital
                  backbone that powers tomorrow's industry leaders.
                </p>
                <div className="flex items-start gap-2 mt-4 text-gray-500 text-sm">
                  <MapPin size={16} className="mt-0.5 shrink-0" />
                  <span>
                    Erode, Tamil Nadu, India
                  </span>
                </div>
              </div>

              {/* Quick Links */}
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

              {/* Company Info */}
              <div>
                <h4 className="text-sm font-medium tracking-wider uppercase text-gray-300 mb-4">
                  Company
                </h4>
                <div className="flex flex-col gap-2.5 text-sm text-gray-500">
                  <Link
                    to="/careers"
                    className="hover:text-white transition-colors duration-300"
                  >
                    Careers
                  </Link>
                  <a
                    href="#contact"
                    onClick={(e) =>
                      handleNavClick(e, { href: '#contact', isRoute: false })
                    }
                    className="hover:text-white transition-colors duration-300"
                  >
                    Contact
                  </a>
                  <Link
                    to="/projects"
                    className="hover:text-white transition-colors duration-300"
                  >
                    Portfolio
                  </Link>
                  <span>Privacy Policy</span>
                  <span>Terms of Service</span>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="section-divider" />
          <div className="px-4 sm:px-6 md:px-12">
            <SocialSection />
          </div>

          {/* Copyright */}
          <div className="section-divider" />
          <div className="px-4 sm:px-6 md:px-12 py-6 text-center text-gray-600 text-sm">
            © {new Date().getFullYear()} Time2Innovate. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  )
}
