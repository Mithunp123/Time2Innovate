import { useState } from 'react'
import {
  Menu,
  X,
  ArrowUpRight,
} from 'lucide-react'

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_094145_4a271a6c-3869-4f1c-8aa7-aeb0cb227994.mp4'

const NAV_LINKS = [
  'Home',
  'Services',
  'Project',
  'About',
  'Contact',
]

function AnimatedElement({ delay = 0, className = '', children, style = {}, ...props }) {
  return (
    <div
      className={`animate-blur-fade-up ${className}`}
      style={{ animationDelay: `${delay}ms`, ...style }}
      {...props}
    >
      {children}
    </div>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="relative h-screen w-screen bg-black text-white overflow-hidden">
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
          Bottom Blur Overlay (no gradient darkening)
          ======================================== */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          WebkitBackdropFilter: 'blur(24px)',
          backdropFilter: 'blur(24px)',
          WebkitMaskImage:
            'linear-gradient(to top, black 0%, transparent 45%)',
          maskImage:
            'linear-gradient(to top, black 0%, transparent 45%)',
        }}
      />

      {/* ========================================
          Main Content Container
          ======================================== */}
      <div
        className="relative flex flex-col h-full w-full"
        style={{ zIndex: 10 }}
      >
        {/* ====================================
            Navbar
            ==================================== */}
        <nav
          className="relative flex items-center justify-between px-4 sm:px-6 md:px-12 py-4 md:py-6"
          style={{ zIndex: 50 }}
        >
          {/* Logo */}
          <AnimatedElement delay={0}>
            <span className="text-xl md:text-2xl font-bold tracking-widest select-none h-8 md:h-10 flex items-center">
              TIME2INNOVATE
            </span>
          </AnimatedElement>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link, i) => (
              <AnimatedElement key={link} delay={100 + i * 50}>
                <a
                  href="#"
                  className="text-sm text-white hover:text-gray-300 transition-colors duration-300"
                >
                  {link}
                </a>
              </AnimatedElement>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Contact Us Button */}
            <AnimatedElement delay={350} className="hidden sm:block">
              <button className="liquid-glass rounded-full px-4 md:px-6 py-2 flex items-center gap-2 text-sm text-white cursor-pointer hover:bg-white/5 transition-colors duration-300">
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
          className={`absolute left-0 right-0 lg:hidden transition-all duration-500 ease-out ${
            menuOpen
              ? 'translate-y-0 opacity-100'
              : '-translate-y-4 opacity-0 pointer-events-none'
          }`}
          style={{ top: '72px', zIndex: 40 }}
        >
          <div className="bg-gray-900/95 backdrop-blur-lg border-t border-b border-gray-800 shadow-2xl">
            <div className="flex flex-col px-4 py-2">
              {NAV_LINKS.map((link, i) => (
                <a
                  key={link}
                  href="#"
                  className="animate-slide-in py-3 px-3 rounded-lg text-white hover:bg-gray-800/50 transition-colors duration-300 text-sm"
                  style={{
                    animationDelay: menuOpen ? `${i * 50}ms` : '0ms',
                    opacity: menuOpen ? undefined : 0,
                  }}
                >
                  {link}
                </a>
              ))}
            </div>

            {/* Contact Us for small screens */}
            <div className="sm:hidden border-t border-gray-800 px-4 py-4 flex items-center gap-3">
              <button className="liquid-glass rounded-full px-4 py-2 flex items-center gap-2 text-sm text-white cursor-pointer flex-1 justify-center">
                <span>Contact Us</span>
                <ArrowUpRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* ====================================
            Hero Content
            ==================================== */}
        <div className="flex-1 flex flex-col justify-end px-4 sm:px-6 md:px-12 pb-8 md:pb-16">
          <div className="max-w-4xl">
            {/* Title */}
            <AnimatedElement delay={300}>
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-[-0.04em] mb-4 md:mb-6">
                Innovative Technology That Drives Business Growth
              </h1>
            </AnimatedElement>

            {/* Description */}
            <AnimatedElement delay={500}>
              <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-8 md:mb-12 max-w-3xl leading-relaxed">
                At Time2Innovate, we transform ambitious ideas into intelligent digital
                solutions. From AI-powered applications and enterprise software to cloud
                infrastructure, cybersecurity, and digital transformation, we build
                future-ready technology that accelerates innovation, improves efficiency,
                and delivers lasting business value.
              </p>
            </AnimatedElement>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <AnimatedElement delay={600}>
                <button className="bg-white text-black rounded-full font-medium px-6 sm:px-8 py-2.5 sm:py-3 flex items-center gap-2 hover:bg-gray-200 transition-colors duration-300 cursor-pointer">
                  Get Started
                  <ArrowUpRight size={18} />
                </button>
              </AnimatedElement>
              <AnimatedElement delay={700}>
                <button className="liquid-glass rounded-full font-medium px-6 sm:px-8 py-2.5 sm:py-3 text-white cursor-pointer hover:bg-white/5 transition-colors duration-300">
                  Learn More
                </button>
              </AnimatedElement>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
