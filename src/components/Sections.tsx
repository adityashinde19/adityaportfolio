import { motion, useScroll, useSpring } from 'motion/react'
import { useRef, useState } from 'react'
import { ArrowUpRight, BadgeCheck, Bot, Brain, Briefcase, Check, Cloud, Code2, Copy, GraduationCap, Mail, Phone, Sparkles, Terminal } from 'lucide-react'
import { certifications, experience, marquee, profile, skillGroups } from '../data'
import { LinkedInIcon, Magnetic, ScrambleText, SectionHeading, TiltCard } from './ui'

export function Experience() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 25 })

  return (
    <section id="experience" className="relative mx-auto max-w-5xl px-6 py-28 md:px-10 md:py-40">
      <SectionHeading kicker="03 / Journey" title="Trajectory" />
      <div ref={ref} className="relative pl-10 md:pl-16">
        <div className="absolute left-3 top-0 h-full w-px bg-white/10 md:left-5" />
        <motion.div style={{ scaleY }} className="absolute left-3 top-0 h-full w-px origin-top bg-gradient-to-b from-cyan via-violet to-pink shadow-[0_0_12px_#22d3ee] md:left-5" />
        {experience.map((e, i) => {
          const Icon = i === 0 ? Briefcase : GraduationCap
          return (
            <motion.div
              key={e.role}
              initial={{ opacity: 0, x: 60, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-20%' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative mb-14 last:mb-0"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: '-20%' }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="absolute -left-10 top-1 flex h-7 w-7 items-center justify-center rounded-full border border-cyan/50 bg-void text-cyan shadow-[0_0_20px_rgba(34,211,238,0.5)] md:-left-[3.2rem]"
              >
                <Icon size={14} />
              </motion.div>
              <TiltCard max={4} glow="#22d3ee">
                <div className="glass rounded-3xl p-6 md:p-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-xl font-bold text-white md:text-2xl">{e.role}</h3>
                    <span className="font-mono text-xs uppercase tracking-widest text-cyan">{e.period}</span>
                  </div>
                  <div className="mt-1 text-fog">
                    {e.company} · {e.place}
                  </div>
                  <ul className="mt-5 space-y-2">
                    {e.points.map((pt) => (
                      <li key={pt} className="flex gap-3 text-slate-300">
                        <span className="text-violet">▹</span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

const ICONS = { sparkles: Sparkles, brain: Brain, bot: Bot, cloud: Cloud, code: Code2, terminal: Terminal }
const ACCENTS = ['#22d3ee', '#a78bfa', '#f472b6', '#34d399', '#fbbf24', '#60a5fa']

function Marquee({ items, reverse }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="relative flex overflow-hidden py-3 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className={`flex shrink-0 gap-4 pr-4 ${reverse ? 'animate-marquee-rev' : 'animate-marquee'}`}>
        {[...items, ...items].map((t, i) => (
          <span key={i} className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.02] px-5 py-2 font-display text-sm uppercase tracking-widest text-fog">
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

export function Skills() {
  return (
    <section id="skills" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading kicker="04 / Stack" title="Neural Toolkit" sub="The models, frameworks and infrastructure I use to take AI from idea to production." />
      </div>
      <div className="mb-16 -rotate-2 space-y-1">
        <Marquee items={marquee} />
        <Marquee items={[...marquee].reverse()} reverse />
      </div>
      <div className="mx-auto grid max-w-7xl gap-5 px-6 sm:grid-cols-2 md:px-10 lg:grid-cols-3">
        {skillGroups.map((g, i) => {
          const Icon = ICONS[g.icon as keyof typeof ICONS]
          const accent = ACCENTS[i]
          return (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.12 }}
              style={{ perspective: 800 }}
            >
              <TiltCard glow={accent} max={8} className="h-full">
                <div className="group glass h-full rounded-3xl p-6 transition-colors duration-500 hover:border-white/20">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:rotate-[360deg]" style={{ background: `${accent}1a`, color: accent }}>
                      <Icon size={20} />
                    </div>
                    <h3 className="font-display text-lg font-bold text-white">{g.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {g.items.map((s, k) => (
                      <motion.span
                        key={s}
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + k * 0.03 }}
                        whileHover={{ scale: 1.08, color: '#fff', borderColor: accent, boxShadow: `0 0 18px ${accent}55` }}
                        className="rounded-lg border border-white/10 px-2.5 py-1 font-mono text-xs text-fog"
                      >
                        {s}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

export function Certifications() {
  return (
    <section id="certs" className="relative mx-auto max-w-7xl px-6 py-24 md:px-10">
      <SectionHeading kicker="05 / Credentials" title="Certified" />
      <div className="grid gap-6 md:grid-cols-3">
        {certifications.map((c, i) => {
          const accent = i === 0 ? '#60a5fa' : '#f59e0b'
          return (
            <motion.a
              key={c.name}
              href={c.url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 60, rotateY: -30 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="block"
              style={{ perspective: 1000 }}
            >
              <TiltCard glow={accent} max={14} className="h-full">
                <div className="group glow-border relative h-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-transparent p-7" style={{ ['--glow' as string]: accent }}>
                  {/* holographic sheen */}
                  <div className="pointer-events-none absolute -inset-full rotate-12 bg-[linear-gradient(110deg,transparent_40%,rgba(255,255,255,0.12)_50%,transparent_60%)] transition-transform duration-1000 group-hover:translate-x-1/2" />
                  <div className="flex items-start justify-between">
                    <BadgeCheck size={34} style={{ color: accent }} />
                    <span className="font-display text-3xl font-black text-white/10">{c.code}</span>
                  </div>
                  <div className="mt-8 font-mono text-[11px] uppercase tracking-widest" style={{ color: accent }}>{c.issuer}</div>
                  <h3 className="mt-2 font-display text-xl font-bold leading-snug text-white">{c.name}</h3>
                  <div className="mt-6 inline-flex items-center gap-1 font-mono text-xs text-fog transition-colors group-hover:text-white">
                    Verify credential <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </TiltCard>
            </motion.a>
          )
        })}
      </div>
    </section>
  )
}

export function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden px-6 py-32 md:px-10 md:py-48">
      <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <motion.div
        className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: 'conic-gradient(from 0deg, #22d3ee33, #a78bfa33, #f472b633, #22d3ee33)', filter: 'blur(80px)' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      <div className="relative mx-auto max-w-4xl text-center">
        <div className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-cyan">06 / Contact</div>
        <h2 className="font-display text-[clamp(2.4rem,8vw,6rem)] font-black uppercase leading-[0.95]">
          <ScrambleText text="Let's build" className="block text-white" />
          <ScrambleText text="the future" className="block text-gradient" delay={0.3} />
        </h2>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="mx-auto mt-6 max-w-xl text-lg text-fog">
          Have an AI product to ship, an agent to orchestrate, or a model to fine-tune? My inbox is open.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.7 }} className="mt-12 flex flex-col items-center gap-5">
          <Magnetic strength={0.25}>
            <a
              href={`mailto:${profile.email}`}
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-cyan via-violet to-pink p-[1.5px]"
            >
              <span className="flex items-center gap-3 rounded-full bg-void px-6 py-4 font-mono text-sm text-white transition-colors group-hover:bg-transparent group-hover:text-void sm:px-8 sm:text-lg">
                <Mail size={20} /> {profile.email}
              </span>
            </a>
          </Magnetic>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button onClick={copy} className="glass flex items-center gap-2 rounded-full px-5 py-2.5 font-mono text-xs text-fog transition hover:text-white">
              {copied ? <Check size={14} className="text-mint" /> : <Copy size={14} />} {copied ? 'Copied!' : 'Copy email'}
            </button>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="glass flex items-center gap-2 rounded-full px-5 py-2.5 font-mono text-xs text-fog transition hover:text-white">
              <LinkedInIcon className="h-3.5 w-3.5" /> LinkedIn
            </a>
            <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="glass flex items-center gap-2 rounded-full px-5 py-2.5 font-mono text-xs text-fog transition hover:text-white">
              <Phone size={14} /> {profile.phone}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 px-6 py-8 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 font-mono text-xs text-fog md:flex-row">
        <span>© {new Date().getFullYear()} Aditya Shinde · Generative AI Engineer</span>
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-mint" /> Built with React · Three.js · Motion
        </span>
      </div>
    </footer>
  )
}
