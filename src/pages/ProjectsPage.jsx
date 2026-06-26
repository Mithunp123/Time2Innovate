import { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { ArrowUpRight, ArrowLeft } from 'lucide-react'
import { ScrollReveal, SectionTag } from '../components'
import { ALL_PROJECTS } from '../data'

export default function ProjectsPage() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])

  const [activeFilter, setActiveFilter] = useState('all')

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'product', label: 'Our Products' },
    { key: 'service', label: 'Client Services' },
  ]

  const filteredProjects = ALL_PROJECTS.filter((project) => {
    if (activeFilter === 'all') return true
    return project.type === activeFilter
  })

  return (
    <>
      {/* ── Hero Banner ── */}
      <section className="bg-black pt-32 pb-16 px-4 sm:px-6 md:px-12">
        <div className="max-w-4xl">
          <ScrollReveal>
            <SectionTag>Our Portfolio</SectionTag>
          </ScrollReveal>

          <ScrollReveal>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-5 bg-gradient-to-b from-white via-white to-white/60 bg-clip-text text-transparent pb-1">
              Projects &amp; Products
            </h1>
          </ScrollReveal>

          <ScrollReveal>
            <p className="text-gray-400">
              From our own product suite to client solutions, every project reflects our commitment to innovation and technical excellence.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <p className="text-gray-500 text-sm mt-4">
              Time2 products are our own innovations. Other projects are service-based solutions built for clients.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Filter Tabs ── */}
      <section className="bg-black pb-8 px-4 sm:px-6 md:px-12">
        <ScrollReveal>
          <div className="flex flex-row gap-3">
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`rounded-full px-5 py-2 text-sm tracking-wide transition-all duration-300 ${
                  activeFilter === filter.key
                    ? 'bg-white text-black'
                    : 'liquid-glass text-gray-300 hover:text-white'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* ── Projects Grid ── */}
      <section className="bg-gray-950 py-16 md:py-24 px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {filteredProjects.map((project, i) => (
            <ScrollReveal key={project.id ?? i} delay={i * 80}>
              <div className="liquid-glass rounded-2xl overflow-hidden group cursor-pointer transition-all duration-500 hover:-translate-y-1">
                {/* Card Top – Visual Area */}
                <div className="h-48 sm:h-56 relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} to-transparent`} />
                  <div
                    className="absolute inset-0"
                    style={{ background: `radial-gradient(circle at 50% 50%, ${project.glow}, transparent 70%)` }}
                  />

                  {/* Type Badge – top right */}
                  <div className="absolute top-4 right-5 z-10">
                    <span
                      className={`liquid-glass rounded-full px-2.5 py-0.5 text-[10px] tracking-wider uppercase ${
                        project.type === 'product' ? 'text-emerald-400' : 'text-blue-400'
                      }`}
                    >
                      {project.type === 'product' ? 'Product' : 'Service'}
                    </span>
                  </div>

                  {/* Category Badge – bottom left */}
                  <div className="absolute bottom-4 left-5 z-10">
                    <span className="liquid-glass rounded-full px-3 py-1 text-[11px] tracking-wider uppercase">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Card Bottom – Info Area */}
                <div className="p-5 md:p-6">
                  <h3 className="text-lg md:text-xl font-medium mb-3">{project.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  <Link
                    to={project.link ?? '#'}
                    className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors duration-300"
                  >
                    View Details
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── Back to Home ── */}
      <section className="bg-black py-16 text-center">
        <ScrollReveal>
          <Link
            to="/"
            className="inline-flex items-center gap-2 liquid-glass rounded-full px-6 py-3 text-sm tracking-wide text-gray-300 hover:text-white transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </ScrollReveal>
      </section>
    </>
  )
}
