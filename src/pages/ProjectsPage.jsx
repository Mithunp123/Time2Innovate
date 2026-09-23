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
    { key: 'all', label: 'All Projects' },
    { key: 'product', label: 'Our Products' },
    { key: 'service', label: 'Client Services' },
  ]

  const filteredProjects = ALL_PROJECTS.filter((project) => {
    if (activeFilter === 'all') return true
    return project.type === activeFilter
  })

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen selection:bg-blue-600 selection:text-white font-sans">
      {/* ── Hero Banner ── */}
      <section className="pt-32 pb-16 px-4 sm:px-6 md:px-12 max-w-6xl mx-auto">
        <div className="max-w-4xl space-y-4">
          <ScrollReveal>
            <span className="px-3.5 py-1.5 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono font-bold rounded-full uppercase tracking-wider inline-block">
              Our Portfolio
            </span>
          </ScrollReveal>

          <ScrollReveal>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900">
              Projects &amp; Products
            </h1>
          </ScrollReveal>

          <ScrollReveal>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              From our own product suite to client solutions, every project reflects our commitment to innovation, speed, and technical excellence.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <p className="text-slate-500 text-xs font-medium">
              Time2 products are our own software innovations. Service projects are tailored client solutions.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Filter Tabs ── */}
      <section className="pb-8 px-4 sm:px-6 md:px-12 max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="flex flex-row gap-3">
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`rounded-xl px-5 py-2 text-xs font-bold tracking-wide transition-all duration-300 shadow-sm cursor-pointer ${
                  activeFilter === filter.key
                    ? 'bg-slate-900 text-white shadow-slate-900/10'
                    : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200/90 hover:bg-slate-100'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* ── Projects Grid ── */}
      <section className="bg-white border-t border-slate-200/80 py-16 md:py-24 px-4 sm:px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, i) => (
            <ScrollReveal key={project.id ?? i} delay={i * 80}>
              <a
                href={project.link ?? '#'}
                target={project.link && project.link !== '#' ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="block bg-white border border-slate-200 rounded-3xl overflow-hidden group cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60 shadow-md"
              >
                {/* Card Top – Visual Gradient Header Area */}
                <div className="h-44 sm:h-48 relative overflow-hidden bg-slate-100">
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20`} />
                  <div
                    className="absolute inset-0"
                    style={{ background: `radial-gradient(circle at 50% 50%, ${project.glow}, transparent 70%)` }}
                  />

                  {/* Type Badge – top right */}
                  <div className="absolute top-4 right-4 z-10">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border shadow-sm ${
                        project.type === 'product' 
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                          : 'bg-blue-50 text-blue-700 border-blue-200'
                      }`}
                    >
                      {project.type === 'product' ? 'Product' : 'Service'}
                    </span>
                  </div>

                  {/* Category Badge – bottom left */}
                  <div className="absolute bottom-4 left-4 z-10">
                    <span className="bg-white/90 backdrop-blur-md text-slate-800 border border-slate-200 rounded-full px-3 py-1 text-[11px] font-semibold tracking-wider uppercase shadow-sm">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Card Bottom – Info Area */}
                <div className="p-6 space-y-3">
                  <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 font-normal">
                    {project.description}
                  </p>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                      <span>View Project Details</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── Back to Home ── */}
      <section className="bg-slate-50 py-16 text-center border-t border-slate-200">
        <ScrollReveal>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-white border border-slate-300 rounded-full px-6 py-3 text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-all duration-300 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </ScrollReveal>
      </section>
    </div>
  )
}
