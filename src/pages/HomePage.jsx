import { useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { ArrowUpRight, Mail, Phone, MapPin, Send } from 'lucide-react'
import { AnimatedElement, ScrollReveal, SectionTag } from '../components'
import { SERVICES, FEATURED_PROJECTS, STATS } from '../data'

export default function HomePage() {
  const { hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100)
    }
  }, [hash])

  const scrollTo = (e, href) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
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
                onClick={(e) => scrollTo(e, '#services')}
                className="bg-white text-black rounded-full font-medium px-6 sm:px-8 py-2.5 sm:py-3 flex items-center gap-2 hover:bg-gray-200 transition-colors duration-300 cursor-pointer"
              >
                Get Started
                <ArrowUpRight size={18} />
              </button>
            </AnimatedElement>
            <AnimatedElement delay={700}>
              <button
                onClick={(e) => scrollTo(e, '#about')}
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
                innovate, scale, and stay ahead of the curve. We build both
                our own products and custom solutions for clients.
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
          Projects Section (3 Featured)
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
                Explore a selection of our flagship products — each built to
                solve real-world problems with innovative technology.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {FEATURED_PROJECTS.map((project, i) => (
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
                    {/* Type Badge */}
                    <div className="absolute top-4 right-5">
                      <span className="liquid-glass rounded-full px-2.5 py-0.5 text-[10px] tracking-wider uppercase text-emerald-400">
                        Product
                      </span>
                    </div>
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

          {/* View All Projects */}
          <ScrollReveal delay={300}>
            <div className="text-center mt-12 md:mt-16">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 liquid-glass rounded-full font-medium px-8 py-3 text-white hover:bg-white/5 transition-colors duration-300"
              >
                View All Projects
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </ScrollReveal>
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
                  grown into a trusted partner for organizations seeking digital
                  excellence.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={300}>
                <p className="text-base sm:text-lg text-gray-400 leading-relaxed mb-8">
                  Our team of engineers, designers, and strategists work
                  collaboratively to deliver solutions that are not just
                  technically superior, but genuinely transformative. We believe
                  that great technology should be accessible, scalable, and built
                  to last.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={400}>
                <button
                  onClick={(e) => scrollTo(e, '#contact')}
                  className="bg-white text-black rounded-full font-medium px-6 sm:px-8 py-2.5 sm:py-3 flex items-center gap-2 hover:bg-gray-200 transition-colors duration-300 cursor-pointer"
                >
                  Work With Us
                  <ArrowUpRight size={18} />
                </button>
              </ScrollReveal>
            </div>

            {/* Right — Stats */}
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
            {/* Contact Form */}
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

            {/* Contact Info */}
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
    </>
  )
}
