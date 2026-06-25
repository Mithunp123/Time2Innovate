import { useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { ArrowUpRight, ArrowLeft, Mail, Phone, MapPin, Send, Users, Heart, Zap, Globe } from 'lucide-react'
import { ScrollReveal, SectionTag } from '../components'

const benefits = [
  {
    icon: Users,
    title: 'Collaborative Culture',
    desc: "Work alongside brilliant minds in a supportive, team-first environment.",
  },
  {
    icon: Zap,
    title: 'Cutting-Edge Tech',
    desc: 'Get hands-on with the latest technologies in AI, cloud, and cybersecurity.',
  },
  {
    icon: Heart,
    title: 'Work-Life Balance',
    desc: 'Flexible work arrangements that let you do your best work, your way.',
  },
  {
    icon: Globe,
    title: 'Global Impact',
    desc: 'Build solutions that transform businesses and communities worldwide.',
  },
]

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'careers@time2innovate.com' },
  { icon: Phone, label: 'Phone', value: '+1 (234) 567-890' },
  { icon: MapPin, label: 'Location', value: 'San Francisco, CA' },
]

export default function CareersPage() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])

  return (
    <>
      {/* Hero Banner */}
      <section className="bg-black pt-32 pb-16 px-4 sm:px-6 md:px-12">
        <ScrollReveal>
          <SectionTag>Careers</SectionTag>
        </ScrollReveal>
        <ScrollReveal>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-[-0.03em] mb-5">
            Join Our Team
          </h1>
        </ScrollReveal>
        <ScrollReveal>
          <p className="text-gray-400 max-w-2xl text-base sm:text-lg leading-relaxed">
            We're always looking for talented individuals who are passionate about technology and innovation. Be part of a team that's building the future.
          </p>
        </ScrollReveal>
      </section>

      {/* Why Work With Us */}
      <section className="bg-gray-950 py-24 md:py-32">
        <div className="px-4 sm:px-6 md:px-12">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-[-0.03em] mb-16 text-center">
              Why Time2Innovate?
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {benefits.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 100}>
                <div className="liquid-glass rounded-2xl p-6 md:p-8 text-center">
                  <div className="liquid-glass w-12 h-12 rounded-xl mx-auto mb-5 flex items-center justify-center">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-medium mb-3">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-black py-24 md:py-32">
        <div className="section-divider" />
        <div className="px-4 sm:px-6 md:px-12">
          <div className="text-center mb-16 md:mb-20">
            <ScrollReveal>
              <SectionTag>Get in Touch</SectionTag>
            </ScrollReveal>
            <ScrollReveal>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-[-0.03em] mb-5">
                Ready to Make an Impact?
              </h2>
            </ScrollReveal>
            <ScrollReveal>
              <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                Send us your details and we'll get back to you about opportunities that match your skills.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 md:gap-12 max-w-6xl mx-auto">
            {/* Form */}
            <div className="lg:col-span-3">
              <ScrollReveal>
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="liquid-glass rounded-2xl p-6 md:p-8"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="glass-input"
                    />
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="glass-input"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Position you're interested in"
                    className="glass-input mb-5"
                  />
                  <textarea
                    placeholder="Tell us about yourself and your experience..."
                    className="glass-input mb-5"
                    rows={5}
                  />
                  <button
                    type="submit"
                    className="bg-white text-black rounded-full font-medium px-8 py-3 inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
                  >
                    Send Application
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </ScrollReveal>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2 flex flex-col gap-5">
              {contactInfo.map((item) => (
                <ScrollReveal key={item.label}>
                  <div className="liquid-glass rounded-2xl p-6 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl liquid-glass flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm text-gray-400 mb-1">{item.label}</h4>
                      <p className="text-white">{item.value}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Back to Home */}
      <section className="bg-gray-950 py-16 text-center">
        <ScrollReveal>
          <Link
            to="/"
            className="liquid-glass rounded-full inline-flex items-center gap-2 px-6 py-3 hover:opacity-80 transition-opacity"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </ScrollReveal>
      </section>
    </>
  )
}
