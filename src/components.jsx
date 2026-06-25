import { useRef, useState, useEffect } from 'react'

/* ========================================
   Custom Hook: Scroll Reveal
   ======================================== */

export function useScrollReveal(threshold = 0.15) {
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
   AnimatedElement (initial load animation)
   ======================================== */

export function AnimatedElement({
  delay = 0,
  className = '',
  children,
  style = {},
  ...props
}) {
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

/* ========================================
   ScrollReveal (scroll-triggered animation)
   ======================================== */

export function ScrollReveal({
  delay = 0,
  className = '',
  children,
  ...props
}) {
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

/* ========================================
   Section Tag (pill label above headings)
   ======================================== */

export function SectionTag({ children }) {
  return (
    <span className="liquid-glass inline-block rounded-full px-4 py-1.5 text-xs tracking-widest uppercase mb-6">
      {children}
    </span>
  )
}
