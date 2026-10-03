import { motion, useInView, useScroll, useTransform } from 'motion/react'
import { useRef, type ComponentType } from 'react'
import { projects, type Project } from '../data'
import { ArrowUpRight } from 'lucide-react'
import { Magnetic, SectionHeading, TiltCard } from './ui'
import { RagVisual } from './visuals/RagVisual'
import { AgentVisual } from './visuals/AgentVisual'
import { HailVisual } from './visuals/HailVisual'
import { MedVisual } from './visuals/MedVisual'

const VISUALS: Record<string, ComponentType<{ active: boolean }>> = {
  rag: RagVisual,
  agent: AgentVisual,
  hail: HailVisual,
  med: MedVisual,
}

function ProjectSlide({ p, i }: { p: Project; i: number }) {
  const ref = useRef<HTMLElement>(null)
  const visualRef = useRef<HTMLDivElement>(null)
  const active = useInView(visualRef, { margin: '-15% 0px' })
  const Visual = VISUALS[p.id]

  // Gentle parallax across the slide's full pass through the viewport.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const visualY = useTransform(scrollYProgress, [0, 1], [50, -50])
  const watermarkY = useTransform(scrollYProgress, [0, 1], [-160, 160])
  const glowOpacity = useTransform(scrollYProgress, [0.15, 0.5, 0.85], [0, 0.35, 0])

  const flip = i % 2 === 1

  return (
    <section ref={ref} id={`project-${p.id}`} className="relative flex min-h-[100svh] items-center overflow-hidden py-24">
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${p.accent}66, transparent)` }} />
      <motion.div
        className="pointer-events-none absolute top-1/2 h-[700px] w-[700px] -translate-y-1/2 rounded-full blur-[140px]"
        style={{ background: p.accent, opacity: glowOpacity, [flip ? 'left' : 'right']: '-15%' }}
      />
      <motion.span
        aria-hidden
        className="pointer-events-none absolute top-1/2 -translate-y-1/2 select-none font-display text-[38vw] font-black leading-none text-transparent opacity-[0.07] lg:text-[26vw]"
        style={{ y: watermarkY, WebkitTextStroke: `2px ${p.accent}`, [flip ? 'right' : 'left']: '-2vw' }}
      >
        {p.index}
      </motion.span>

      <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
        <div className="relative grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className={flip ? 'lg:order-2' : ''}>
            <div className="mb-5 flex items-center gap-4">
              <span className="font-display text-5xl font-black text-transparent md:text-6xl" style={{ WebkitTextStroke: `1px ${p.accent}` }}>
                {p.index}
              </span>
              <span className="rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-widest" style={{ borderColor: `${p.accent}66`, color: p.accent }}>
                ● {p.status}
              </span>
            </div>
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="font-display text-2xl font-bold leading-tight text-white md:text-4xl"
            >
              {p.title}
            </motion.h3>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="mt-3 text-lg italic" style={{ color: p.accent }}>
              {p.tagline}
            </motion.p>
            <ul className="mt-6 space-y-3">
              {p.bullets.map((b, k) => (
                <motion.li
                  key={k}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25 + k * 0.12, duration: 0.6 }}
                  className="flex gap-3 text-[15px] leading-relaxed text-slate-300"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45" style={{ background: p.accent }} />
                  {b}
                </motion.li>
              ))}
            </ul>
            <div className="mt-7 grid grid-cols-3 gap-3">
              {p.metrics.map((m, k) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + k * 0.1, type: 'spring', stiffness: 200 }}
                  className="rounded-2xl border border-white/5 bg-white/[0.03] p-3"
                >
                  <div className="font-display text-lg font-bold md:text-xl" style={{ color: p.accent }}>{m.value}</div>
                  <div className="mt-1 font-mono text-[10px] uppercase leading-tight tracking-wider text-fog">{m.label}</div>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {p.tech.map((t, k) => (
                <motion.span
                  key={t}
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + k * 0.05 }}
                  whileHover={{ y: -3, borderColor: p.accent, color: '#fff' }}
                  className="rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] text-fog"
                >
                  {t}
                </motion.span>
              ))}
            </div>
            {p.link && (
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.8 }} className="mt-7">
                <Magnetic>
                  <a
                    href={p.link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-void transition-shadow"
                    style={{ background: p.accent, boxShadow: `0 0 30px -6px ${p.accent}` }}
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-void/60" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-void" />
                    </span>
                    {p.link.label}
                    <ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </Magnetic>
              </motion.div>
            )}
          </div>

          <motion.div ref={visualRef} style={{ y: visualY }} className={flip ? 'lg:order-1' : ''}>
            <TiltCard glow={p.accent} max={7}>
              <div
                className="glow-border relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/5 bg-void/80"
                style={{ ['--glow' as string]: p.accent, boxShadow: `0 30px 80px -30px ${p.accent}55` }}
              >
                <div className="bg-grid absolute inset-0 opacity-50" />
                <div className="absolute left-4 top-3 z-10 flex gap-1.5">
                  {[0, 1, 2].map((d) => (
                    <span key={d} className="h-2 w-2 rounded-full" style={{ background: p.accent, opacity: 0.3 + d * 0.25 }} />
                  ))}
                </div>
                <div className="relative h-full w-full pt-4">
                  <Visual active={active} />
                </div>
                {p.link && (
                  <a
                    href={p.link.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={p.link.label}
                    className="group absolute inset-0 z-20 flex items-start justify-end p-4"
                  >
                    <span
                      className="flex items-center gap-1 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-widest opacity-70 backdrop-blur transition-opacity group-hover:opacity-100"
                      style={{ borderColor: `${p.accent}88`, color: p.accent, background: '#04050acc' }}
                    >
                      Open live <ArrowUpRight size={12} />
                    </span>
                  </a>
                )}
                <motion.div
                  className="pointer-events-none absolute inset-x-0 h-24"
                  style={{ background: `linear-gradient(to bottom, transparent, ${p.accent}14, transparent)` }}
                  animate={{ top: ['-25%', '110%'] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'linear' }}
                />
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export function Projects() {
  return (
    <div id="projects" className="relative">
      <div className="mx-auto max-w-7xl px-6 pt-28 md:px-10 md:pt-32">
        <SectionHeading kicker="02 / Selected Work" title="Systems I've Shipped" sub="Production AI, not prototypes. Each system below runs a live simulation of what it actually does." />
      </div>
      {projects.map((p, i) => (
        <ProjectSlide key={p.id} p={p} i={i} />
      ))}
    </div>
  )
}
