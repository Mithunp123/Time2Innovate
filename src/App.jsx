import { useState, useRef, useEffect } from 'react'
import {
  Menu,
  X,
  ArrowUpRight,
  Brain,
  Code,
  Cloud,
  Shield,
  Rocket,
  TrendingUp,
  Mail,
  Phone,
  MapPin,
  Send,
} from 'lucide-react'

/* ========================================
   Constants
   ======================================== */

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_094145_4a271a6c-3869-4f1c-8aa7-aeb0cb227994.mp4'

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

const SERVICES = [
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

const PROJECTS = [
  {
    title: 'NeuralForge AI Platform',
    category: 'AI / Machine Learning',
    description:
      'An enterprise-grade AI analytics platform that processes millions of data points in real-time, delivering actionable insights through intuitive dashboards and predictive models.',
    gradient: 'from-violet-500/20 via-indigo-500/10',
    glow: 'rgba(139,92,246,0.15)',
  },
  {
    title: 'CloudVault Security Suite',
    category: 'Cybersecurity / Cloud',
    description:
      'A comprehensive cloud security solution providing real-time threat detection, zero-trust architecture, and automated compliance monitoring for enterprise environments.',
    gradient: 'from-emerald-500/20 via-teal-500/10',
    glow: 'rgba(16,185,129,0.15)',
  },
  {
    title: 'QuantumFlow ERP System',
    category: 'Enterprise Software',
    description:
      'A next-generation enterprise resource planning system that streamlines operations across departments with AI-driven workflow automation and real-time analytics.',
    gradient: 'from-amber-500/20 via-orange-500/10',
    glow: 'rgba(245,158,11,0.15)',
  },
]

const STATS = [
  { value: '10+', label: 'Years Experience' },
  { value: '200+', label: 'Projects Delivered' },
  { value: '50+', label: 'Team Members' },
  { value: '98%', label: 'Client Satisfaction' },
]

/* ========================================
   Custom Hook: Scroll Reveal
   ======================================== */

function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, isVisible]
}

/* ========================================
   Utility Components
   ======================================== */

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

function ScrollReveal({ delay = 0, className = '', children, ...props }) {
  const [ref, isVisible] = useScrollReveal()
  return (
    <div
      ref={ref}
      className={`${isVisible ? 'animate-blur-fade-up' : 'opacity-0'} ${className}`}
      style={isVisible ? { animationDelay: `${delay}ms` } : {}}
      {...props}
    >
      {children}
    </div>
  )
}

function SectionTag({ children }) {
  return (
    <span className="liquid-glass inline-block rounded-full px-4 py-1.5 text-xs tracking-widest uppercase mb-6">
      {children}
    </span>
  )
}

/* ========================================
   Main App
   ======================================== */

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
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
            Sticky Navbar
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
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="text-xl md:text-2xl font-bold tracking-widest select-none h-8 md:h-10 flex items-center"
            >
              TIME2INNOVATE
            </a>
          </AnimatedElement>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link, i) => (
              <AnimatedElement key={link.label} delay={100 + i * 50}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
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
                onClick={(e) => handleNavClick(e, '#contact')}
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
                  onClick={(e) => handleNavClick(e, link.href)}
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
                onClick={(e) => handleNavClick(e, '#contact')}
                className="liquid-glass rounded-full px-4 py-2 flex items-center gap-2 text-sm text-white cursor-pointer flex-1 justify-center"
              >
                <span>Contact Us</span>
                <ArrowUpRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* ====================================
            Hero Section
            ==================================== */}
        <section
          id="home"
          className="h-screen flex flex-col justify-end px-4 sm:px-6 md:px-12 pb-8 md:pb-16"
        >
          <div className="max-w-4xl">
            <AnimatedElement delay={300}>
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-[-0.04em] mb-4 md:mb-6">
                Innovative Technology That Drives Business Growth
              </h1>
            </AnimatedElement>

            <AnimatedElement delay={500}>
              <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-8 md:mb-12 max-w-3xl leading-relaxed">
                At Time2Innovate, we transform ambitious ideas into intelligent
                digital solutions. From AI-powered applications and enterprise
                software to cloud infrastructure, cybersecurity, and digital
                transformation, we build future-ready technology that accelerates
                innovation, improves efficiency, and delivers lasting business
                value.
              </p>
            </AnimatedElement>

            <div className="flex flex-wrap gap-3 sm:gap-4">
              <AnimatedElement delay={600}>
                <button
                  onClick={(e) => handleNavClick(e, '#services')}
                  className="bg-white text-black rounded-full font-medium px-6 sm:px-8 py-2.5 sm:py-3 flex items-center gap-2 hover:bg-gray-200 transition-colors duration-300 cursor-pointer"
                >
                  Get Started
                  <ArrowUpRight size={18} />
                </button>
              </AnimatedElement>
              <AnimatedElement delay={700}>
                <button
                  onClick={(e) => handleNavClick(e, '#about')}
                  className="liquid-glass rounded-full font-medium px-6 sm:px-8 py-2.5 sm:py-3 text-white cursor-pointer hover:bg-white/5 transition-colors duration-300"
                >
                  Learn More
                </button>
              </AnimatedElement>
            </div>
          </div>
        </section>

        {/* ====================================
            Services Section
            ==================================== */}
        <section
          id="services"
          className="relative bg-black py-24 md:py-32 scroll-mt-20"
        >
          <div className="section-divider absolute top-0 left-0 right-0" />
          <div className="px-4 sm:px-6 md:px-12">
            <div className="text-center mb-16 md:mb-20">
              <ScrollReveal>
                <SectionTag>Our Services</SectionTag>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-[-0.03em] mb-5">
                  Solutions That Power Innovation
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                  We deliver end-to-end technology services that help businesses
                  innovate, scale, and stay ahead of the curve.
                </p>
              </ScrollReveal>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {SERVICES.map((service, i) => (
                <ScrollReveal key={service.title} delay={i * 100}>
                  <div className="liquid-glass rounded-2xl p-6 md:p-8 h-full group cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:bg-white/[0.03]">
                    <div className="w-12 h-12 rounded-xl liquid-glass flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
                      <service.icon size={22} className="text-white" />
                    </div>
                    <h3 className="text-lg md:text-xl font-medium mb-3">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ====================================
            Projects Section
            ==================================== */}
        <section
          id="projects"
          className="relative bg-gray-950 py-24 md:py-32 scroll-mt-20"
        >
          <div className="section-divider absolute top-0 left-0 right-0" />
          <div className="px-4 sm:px-6 md:px-12">
            <div className="text-center mb-16 md:mb-20">
              <ScrollReveal>
                <SectionTag>Featured Projects</SectionTag>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-[-0.03em] mb-5">
                  Crafting Digital Excellence
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                  Explore a selection of our recent work — each project a
                  testament to innovation, precision, and measurable impact.
                </p>
              </ScrollReveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {PROJECTS.map((project, i) => (
                <ScrollReveal key={project.title} delay={i * 150}>
                  <div className="liquid-glass rounded-2xl overflow-hidden group cursor-pointer transition-all duration-500 hover:-translate-y-1">
                    {/* Gradient Image Area */}
                    <div className="h-48 sm:h-56 relative overflow-hidden">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${project.gradient} to-transparent`}
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `radial-gradient(ellipse at 30% 40%, ${project.glow}, transparent 60%)`,
                        }}
                      />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.03),transparent_50%)]" />
                      {/* Category Badge */}
                      <div className="absolute bottom-4 left-5">
                        <span className="liquid-glass rounded-full px-3 py-1 text-[11px] tracking-wider uppercase">
                          {project.category}
                        </span>
                      </div>
                    </div>
                    {/* Content */}
                    <div className="p-5 md:p-6">
                      <h3 className="text-lg md:text-xl font-medium mb-3">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-400 leading-relaxed mb-4">
                        {project.description}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-sm text-white hover:text-gray-300 transition-colors group-hover:gap-2.5 duration-300">
                        View Project <ArrowUpRight size={14} />
                      </span>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ====================================
            About Section
            ==================================== */}
        <section
          id="about"
          className="relative bg-black py-24 md:py-32 scroll-mt-20"
        >
          <div className="section-divider absolute top-0 left-0 right-0" />
          <div className="px-4 sm:px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-start">
              {/* Left — Text */}
              <div>
                <ScrollReveal>
                  <SectionTag>About Us</SectionTag>
                </ScrollReveal>
                <ScrollReveal delay={100}>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-[-0.03em] mb-6 md:mb-8">
                    Pioneering the Future of Technology
                  </h2>
                </ScrollReveal>
                <ScrollReveal delay={200}>
                  <p className="text-base sm:text-lg text-gray-400 leading-relaxed mb-5">
                    Founded with a vision to bridge the gap between cutting-edge
                    technology and real-world business needs, Time2Innovate has
                    grown into a trusted partner for organizations seeking
                    digital excellence.
                  </p>
                </ScrollReveal>
                <ScrollReveal delay={300}>
                  <p className="text-base sm:text-lg text-gray-400 leading-relaxed mb-8">
                    Our team of engineers, designers, and strategists work
                    collaboratively to deliver solutions that are not just
                    technically superior, but genuinely transformative. We
                    believe that great technology should be accessible, scalable,
                    and built to last.
                  </p>
                </ScrollReveal>
                <ScrollReveal delay={400}>
                  <button
                    onClick={(e) => handleNavClick(e, '#contact')}
                    className="bg-white text-black rounded-full font-medium px-6 sm:px-8 py-2.5 sm:py-3 flex items-center gap-2 hover:bg-gray-200 transition-colors duration-300 cursor-pointer"
                  >
                    Work With Us
                    <ArrowUpRight size={18} />
                  </button>
                </ScrollReveal>
              </div>

              {/* Right — Stats Grid */}
              <div className="grid grid-cols-2 gap-4 md:gap-5">
                {STATS.map((stat, i) => (
                  <ScrollReveal key={stat.label} delay={150 + i * 100}>
                    <div className="liquid-glass rounded-2xl p-6 md:p-8 text-center transition-all duration-500 hover:-translate-y-1 hover:bg-white/[0.03]">
                      <div className="text-3xl sm:text-4xl md:text-5xl font-light mb-2 tracking-tight">
                        {stat.value}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-400 tracking-wide">
                        {stat.label}
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ====================================
            Contact Section
            ==================================== */}
        <section
          id="contact"
          className="relative bg-gray-950 py-24 md:py-32 scroll-mt-20"
        >
          <div className="section-divider absolute top-0 left-0 right-0" />
          <div className="px-4 sm:px-6 md:px-12">
            <div className="text-center mb-16 md:mb-20">
              <ScrollReveal>
                <SectionTag>Get in Touch</SectionTag>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-[-0.03em] mb-5">
                  Let's Build Something Great Together
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                  Ready to transform your business with intelligent technology?
                  Reach out and let's start a conversation.
                </p>
              </ScrollReveal>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 md:gap-12 max-w-6xl mx-auto">
              {/* Left — Contact Form */}
              <ScrollReveal delay={100} className="lg:col-span-3">
                <form
                  className="liquid-glass rounded-2xl p-6 md:p-8 space-y-5"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="glass-input"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="glass-input"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Subject"
                    className="glass-input"
                  />
                  <textarea
                    placeholder="Tell us about your project..."
                    className="glass-input"
                  />
                  <button
                    type="submit"
                    className="bg-white text-black rounded-full font-medium px-8 py-3 flex items-center gap-2 hover:bg-gray-200 transition-colors duration-300 cursor-pointer w-full sm:w-auto justify-center"
                  >
                    Send Message
                    <Send size={16} />
                  </button>
                </form>
              </ScrollReveal>

              {/* Right — Contact Info */}
              <div className="lg:col-span-2 flex flex-col gap-5">
                <ScrollReveal delay={200}>
                  <div className="liquid-glass rounded-2xl p-6 flex items-start gap-4 transition-all duration-500 hover:bg-white/[0.03]">
                    <div className="w-10 h-10 rounded-xl liquid-glass flex items-center justify-center shrink-0">
                      <Mail size={18} />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Email</div>
                      <a
                        href="mailto:hello@time2innovate.com"
                        className="text-sm sm:text-base hover:text-gray-300 transition-colors"
                      >
                        hello@time2innovate.com
                      </a>
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={300}>
                  <div className="liquid-glass rounded-2xl p-6 flex items-start gap-4 transition-all duration-500 hover:bg-white/[0.03]">
                    <div className="w-10 h-10 rounded-xl liquid-glass flex items-center justify-center shrink-0">
                      <Phone size={18} />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Phone</div>
                      <a
                        href="tel:+1234567890"
                        className="text-sm sm:text-base hover:text-gray-300 transition-colors"
                      >
                        +1 (234) 567-890
                      </a>
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={400}>
                  <div className="liquid-glass rounded-2xl p-6 flex items-start gap-4 transition-all duration-500 hover:bg-white/[0.03]">
                    <div className="w-10 h-10 rounded-xl liquid-glass flex items-center justify-center shrink-0">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Location</div>
                      <span className="text-sm sm:text-base">
                        San Francisco, CA
                      </span>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================
            Footer
            ==================================== */}
        <footer className="relative bg-black border-t border-white/5 py-12 md:py-16">
          <div className="px-4 sm:px-6 md:px-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="text-center md:text-left">
                <span className="text-xl font-bold tracking-widest">
                  TIME2INNOVATE
                </span>
                <p className="text-gray-500 text-sm mt-2">
                  Transforming ideas into intelligent solutions.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
            <div className="section-divider my-8" />
            <div className="text-center text-gray-600 text-sm">
              © {new Date().getFullYear()} Time2Innovate. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
