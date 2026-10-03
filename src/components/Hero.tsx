import { motion, useScroll, useTransform } from 'motion/react'
import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { ArrowDownRight, Download, MapPin } from 'lucide-react'
import { profile } from '../data'
import { scrollToId } from '../lib/scroll'
import { Magnetic } from './ui'

const HeroScene = lazy(() => import('./HeroScene'))

function Typer({ words }: { words: string[] }) {
  const [i, setI] = useState(0)
  const [text, setText] = useState('')
  const [del, setDel] = useState(false)

  useEffect(() => {
    const word = words[i % words.length]
    const done = !del && text === word
    const empty = del && text === ''
    const t = window.setTimeout(
      () => {
        if (done) setDel(true)
        else if (empty) {
          setDel(false)
          setI((n) => n + 1)
        } else setText(del ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1))
      },
      done ? 1800 : del ? 35 : 70,
    )
    return () => window.clearTimeout(t)
  }, [text, del, i, words])

  return <span className="caret">{text}</span>
}

function FadeName({ word, delay, className }: { word: string; delay: number; className?: string }) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: 'easeOut' }}
    >
      {word}
    </motion.span>
  )
}

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 180])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.35])
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.1])

  return (
    <section ref={ref} id="top" className="relative flex min-h-[100svh] items-center overflow-hidden">
      <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
      <div className="absolute -left-40 top-1/4 h-[420px] w-[420px] rounded-full bg-violet/20 blur-[120px]" />
      <div className="absolute -right-20 bottom-0 h-[380px] w-[380px] rounded-full bg-cyan/15 blur-[120px]" />

      <motion.div style={{ scale: sceneScale, opacity: sceneOpacity }} className="absolute inset-0 md:left-[38%]">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }} className="h-full w-full">
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </motion.div>
      </motion.div>

      <motion.div style={{ y, opacity }} className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-24 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.25em] text-fog"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
            </span>
            Open to opportunities
          </motion.div>

          <h1 className="font-display font-black uppercase leading-[0.9] tracking-tight">
            <FadeName word={profile.first} delay={0.1} className="block text-[clamp(3rem,min(11vw,15vh),9.5rem)] text-white" />
            <br />
            <FadeName word={profile.last} delay={0.25} className="block text-[clamp(3rem,min(11vw,15vh),9.5rem)] text-gradient" />
          </h1>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="mt-6 h-8 font-mono text-lg text-cyan md:text-2xl">
            <span className="text-violet">&gt;_ </span>
            <Typer words={profile.roles} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.8 }}
            className="mt-6 max-w-xl text-base text-fog md:text-lg"
          >
            I build production-grade agentic AI systems: multimodal RAG, autonomous agents powered by custom MCP servers, and fine-tuned models that ship to real users.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.8 }} className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic>
              <button
                onClick={() => scrollToId('projects')}
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-cyan to-violet px-7 py-3.5 font-semibold text-void shadow-[0_0_40px_-8px_rgba(34,211,238,0.7)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View my work <ArrowDownRight size={18} className="transition-transform group-hover:rotate-[-45deg]" />
                </span>
                <span className="absolute inset-0 -translate-x-full bg-white/40 transition-transform duration-700 group-hover:translate-x-full" />
              </button>
            </Magnetic>
            <Magnetic>
              <a href={profile.resume} download className="glass flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold text-white transition hover:border-cyan/50">
                <Download size={18} /> Résumé
              </a>
            </Magnetic>
            <span className="flex items-center gap-1.5 font-mono text-xs text-fog">
              <MapPin size={14} className="text-pink" /> {profile.location}
            </span>
          </motion.div>
        </motion.div>

      <motion.button
        onClick={() => scrollToId('about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 z-10 flex [@media(max-height:760px)]:hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-fog"
        aria-label="Scroll down"
      >
        scroll
        <span className="relative h-10 w-[1px] overflow-hidden bg-white/10">
          <motion.span className="absolute left-0 top-0 h-4 w-full bg-cyan" animate={{ y: [-16, 40] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }} />
        </span>
      </motion.button>
    </section>
  )
}
