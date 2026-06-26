import { useRef, useEffect, useState } from 'react'
import Lottie from 'lottie-react'
const LottieComponent = Lottie.default || Lottie;
import { socialIcons } from './socialIcons'
import { SOCIAL_LINKS } from './data'
import { ScrollReveal } from './components'

/**
 * Creates a generic Lottie bounce animation that wraps any content.
 * The animation is a smooth scale pulse that plays on hover.
 */
function createBounceAnimation() {
  return {
    v: '5.7.4',
    fr: 30,
    ip: 0,
    op: 40,
    w: 48,
    h: 48,
    nm: 'bounce',
    ddd: 0,
    assets: [],
    layers: [
      {
        ddd: 0,
        ind: 1,
        ty: 4,
        nm: 'circle',
        sr: 1,
        ks: {
          o: {
            a: 1,
            k: [
              {
                i: { x: [0.4], y: [1] },
                o: { x: [0.6], y: [0] },
                t: 0,
                s: [30],
              },
              {
                i: { x: [0.4], y: [1] },
                o: { x: [0.6], y: [0] },
                t: 20,
                s: [60],
              },
              { t: 40, s: [30] },
            ],
          },
          r: { a: 0, k: 0 },
          p: { a: 0, k: [24, 24, 0] },
          a: { a: 0, k: [0, 0, 0] },
          s: {
            a: 1,
            k: [
              {
                i: { x: [0.4, 0.4, 0.4], y: [1, 1, 1] },
                o: { x: [0.6, 0.6, 0.6], y: [0, 0, 0] },
                t: 0,
                s: [100, 100, 100],
              },
              {
                i: { x: [0.4, 0.4, 0.4], y: [1, 1, 1] },
                o: { x: [0.6, 0.6, 0.6], y: [0, 0, 0] },
                t: 20,
                s: [120, 120, 100],
              },
              { t: 40, s: [100, 100, 100] },
            ],
          },
        },
        ao: 0,
        shapes: [
          {
            ty: 'el',
            d: 1,
            s: { a: 0, k: [44, 44] },
            p: { a: 0, k: [0, 0] },
            nm: 'Ellipse',
          },
          {
            ty: 'st',
            c: { a: 0, k: [1, 1, 1, 1] },
            o: { a: 0, k: 40 },
            w: { a: 0, k: 1.5 },
            lc: 1,
            lj: 1,
            nm: 'Stroke',
          },
        ],
        ip: 0,
        op: 40,
        st: 0,
      },
    ],
  }
}

const bounceAnimationData = createBounceAnimation()

/**
 * A social media icon button with Lottie hover animation ring effect.
 */
function SocialIconButton({ name, url }) {
  const lottieRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const icon = socialIcons[name]

  useEffect(() => {
    if (lottieRef.current) {
      if (isHovered) {
        lottieRef.current.play()
      } else {
        lottieRef.current.stop()
      }
    }
  }, [isHovered])

  if (!icon) return null

  const brandColorClass = {
    LinkedIn: 'text-[#0A66C2] opacity-85 group-hover:opacity-100',
    'X (Twitter)': 'text-white opacity-75 group-hover:opacity-100',
    Instagram: 'text-[#E1306C] opacity-85 group-hover:opacity-100',
    Facebook: 'text-[#1877F2] opacity-85 group-hover:opacity-100',
    YouTube: 'text-[#FF0000] opacity-85 group-hover:opacity-100',
  }[name] || 'text-gray-400 group-hover:text-white';

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col items-center gap-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={name}
    >
      <div className="relative w-12 h-12 flex items-center justify-center">
        {/* Lottie bounce ring animation (plays on hover) */}
        <div className="absolute inset-0 pointer-events-none">
          {Lottie && (
            <LottieComponent
              lottieRef={lottieRef}
              animationData={bounceAnimationData}
              loop={true}
              autoplay={false}
              className="w-full h-full"
            />
          )}
        </div>
        {/* SVG icon */}
        <div className={`w-6 h-6 transition-all duration-300 group-hover:scale-110 relative z-10 ${brandColorClass}`}>
          {icon}
        </div>
      </div>
      <span className="text-[10px] text-gray-500 group-hover:text-gray-300 transition-colors duration-300 tracking-wider uppercase">
        {name}
      </span>
    </a>
  )
}

/**
 * Social Media Section for the Footer
 */
export default function SocialSection() {
  return (
    <div className="py-8">
      <ScrollReveal>
        <div className="flex flex-wrap justify-center gap-8 sm:gap-10 md:gap-12">
          {SOCIAL_LINKS.map((link) => (
            <SocialIconButton key={link.name} name={link.name} url={link.url} />
          ))}
        </div>
      </ScrollReveal>
    </div>
  )
}
