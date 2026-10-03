import { motion } from 'motion/react'
import { stats } from '../data'
import { Counter, SectionHeading, TiltCard } from './ui'

const shipped = [
  { k: 'Multimodal RAG', v: '90,000+ pages / day' },
  { k: 'Agentic travel product', v: 'live with real users' },
  { k: 'QLoRA medical LLM', v: '78% → 91% accuracy' },
  { k: 'Computer vision', v: 'deployed in the field' },
]

function Intro() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-15%' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <p className="text-3xl font-semibold leading-tight text-white md:text-[2.6rem]">
        I turn agentic AI ideas into <span className="text-gradient">production systems</span> that people actually use.
      </p>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fog">
        Generative AI Engineer with 2+ years shipping GenAI, deep learning and NLP on Azure and AWS, from retrieval
        pipelines and autonomous agents to fine-tuned models and rigorous evaluation.
      </p>
      <ul className="mt-10 grid gap-x-10 gap-y-5 border-t border-white/10 pt-8 sm:grid-cols-2">
        {shipped.map((s) => (
          <li key={s.k} className="border-l-2 border-cyan/60 pl-4">
            <div className="font-medium text-white">{s.k}</div>
            <div className="mt-0.5 font-mono text-sm text-fog">{s.v}</div>
          </li>
        ))}
      </ul>
    </motion.div>
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
        <Intro />
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
