import { animate, motion, useInView, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'motion/react'
import { useEffect, useRef, useState, type ReactNode, type MouseEvent } from 'react'

const GLYPHS = '!<>-_\\/[]{}—=+*^?#01ABCDEF'

/** Text that "decodes" from random glyphs once it scrolls into view. */
export function ScrambleText({ text, className, delay = 0, speed = 28 }: { text: string; className?: string; delay?: number; speed?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const [out, setOut] = useState(text.replace(/\S/g, ' '))

  useEffect(() => {
    if (!inView) return
    let frame = 0
    let id: number | undefined
    const total = text.length + 12
    const timeout = window.setTimeout(() => {
      id = window.setInterval(() => {
        frame++
        setOut(
          text
            .split('')
            .map((ch, i) => {
              if (ch === ' ') return ' '
              if (i < frame - 8) return ch
              if (i < frame) return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
              return ' '
            })
            .join(''),
        )
        if (frame > total) {
          setOut(text)
          window.clearInterval(id)
        }
      }, speed)
    }, delay * 1000)
    return () => {
      window.clearTimeout(timeout)
      if (id) window.clearInterval(id)
    }
  }, [inView, text, delay, speed])

  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden>{out}</span>
    </span>
  )
}

export function Counter({ to, prefix = '', suffix = '', className }: { to: number; prefix?: string; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, { duration: 2.2, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setVal(Math.round(v)) })
    return () => controls.stop()
  }, [inView, to])
  return (
    <span ref={ref} className={className}>
      {prefix}
      {val.toLocaleString('en-US')}
      {suffix}
    </span>
  )
}

export function SectionHeading({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) {
  return (
    <div className="mb-14 md:mb-20">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-cyan"
      >
        <span className="h-px w-10 bg-gradient-to-r from-cyan to-transparent" />
        {kicker}
      </motion.div>
      <h2 className="font-display text-4xl font-bold uppercase leading-[1.05] tracking-tight md:text-6xl">
        <ScrambleText text={title} />
      </h2>
      {sub && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-5 max-w-2xl text-lg text-fog"
        >
          {sub}
        </motion.p>
      )}
    </div>
  )
}

/** Card with pointer-tracked 3D tilt and a spotlight that follows the cursor. */
export function TiltCard({ children, className = '', glow = '#22d3ee', max = 10 }: { children: ReactNode; className?: string; glow?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const sx = useSpring(px, { stiffness: 160, damping: 18 })
  const sy = useSpring(py, { stiffness: 160, damping: 18 })
  const rotateY = useTransform(sx, [0, 1], [-max, max])
  const rotateX = useTransform(sy, [0, 1], [max, -max])
  const gx = useTransform(px, (v) => `${v * 100}%`)
  const gy = useTransform(py, (v) => `${v * 100}%`)
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${gx} ${gy}, ${glow}22, transparent 45%)`

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = ref.current!.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
  }
  const onLeave = () => {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <div style={{ perspective: 1200 }} className={className}>
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative h-full rounded-3xl"
      >
        {children}
        <motion.div className="pointer-events-none absolute inset-0 rounded-3xl" style={{ background: spotlight }} />
      </motion.div>
    </div>
  )
}

/** Button that is magnetically pulled toward the cursor. */
export function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useSpring(0, { stiffness: 200, damping: 14 })
  const y = useSpring(0, { stiffness: 200, damping: 14 })
  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className="inline-block"
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect()
        x.set((e.clientX - (r.left + r.width / 2)) * strength)
        y.set((e.clientY - (r.top + r.height / 2)) * strength)
      }}
      onMouseLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}

export function LinkedInIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  )
}
