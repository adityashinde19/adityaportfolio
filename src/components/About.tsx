import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { profile, stats } from '../data'
import { Counter, SectionHeading, TiltCard } from './ui'

const words = profile.summary.split(' ')

function RevealParagraph() {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] })
  return (
    <p ref={ref} className="flex flex-wrap text-2xl font-medium leading-snug md:text-[2rem]">
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </p>
  )
}

function Word({ children, progress, range }: { children: string; progress: ReturnType<typeof useScroll>['scrollYProgress']; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.12, 1])
  const highlight = /\d|RAG|agentic|LLM|QLoRA|computer-vision/i.test(children)
  return (
    <motion.span style={{ opacity }} className={`mr-[0.28em] ${highlight ? 'text-cyan' : 'text-white'}`}>
      {children}
    </motion.span>
  )
}

const terminal = [
  ['whoami', 'aditya.shinde'],
  ['role', 'generative_ai_engineer'],
  ['exp', '2+ years · production'],
  ['stack', 'python · pytorch · langgraph · azure'],
  ['focus', 'rag · agents · fine-tuning · cv'],
  ['status', 'shipping ▲'],
]

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-40">
      <SectionHeading kicker="01 / About" title="Engineering Intelligence" />
      <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr]">
        <RevealParagraph />
        <TiltCard glow="#a78bfa" max={8}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15%' }}
            transition={{ duration: 0.8 }}
            className="glass glow-border h-full overflow-hidden rounded-3xl"
            style={{ ['--glow' as string]: '#a78bfa' }}
          >
            <div className="flex items-center gap-2 border-b border-white/5 px-5 py-3">
              <span className="h-3 w-3 rounded-full bg-pink/80" />
              <span className="h-3 w-3 rounded-full bg-yellow-300/80" />
              <span className="h-3 w-3 rounded-full bg-mint/80" />
              <span className="ml-3 font-mono text-xs text-fog">~/aditya/profile.sh</span>
            </div>
            <div className="space-y-2.5 p-6 font-mono text-sm">
              {terminal.map(([k, v], i) => (
                <motion.div key={k} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.12 }}>
                  <span className="text-violet">$</span> <span className="text-fog">{k}</span>
                  <div className="pl-4 text-cyan">→ {v}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </TiltCard>
      </div>

      <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.7 }}
            className="group relative bg-void p-6 md:p-8"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-cyan/0 to-cyan/0 transition-all duration-500 group-hover:from-cyan/10" />
            <Counter to={s.value} prefix={s.prefix} suffix={s.suffix} className="relative font-display text-3xl font-bold text-gradient md:text-5xl" />
            <div className="relative mt-2 font-mono text-[11px] uppercase tracking-widest text-fog">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
