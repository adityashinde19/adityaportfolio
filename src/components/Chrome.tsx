import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { profile } from '../data'
import { scrollToId } from '../lib/scroll'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })
  return <motion.div className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-cyan via-violet to-pink" style={{ scaleX }} />
}

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Journey' },
  { id: 'skills', label: 'Stack' },
  { id: 'contact', label: 'Contact' },
]

export function Nav() {
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    LINKS.forEach((l) => {
      const el = document.getElementById(l.id)
      if (el) io.observe(el)
    })
    return () => {
      window.removeEventListener('scroll', onScroll)
      io.disconnect()
    }
  }, [])

  const go = (id: string) => {
    setOpen(false)
    scrollToId(id)
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-4 z-50 px-4"
    >
      <nav className={`mx-auto flex max-w-5xl items-center justify-between rounded-full px-5 py-3 transition-all duration-500 ${scrolled ? 'glass shadow-[0_8px_40px_-12px_rgba(34,211,238,0.25)]' : ''}`}>
        <button onClick={() => go('top')} className="font-display text-sm font-bold tracking-[0.3em] text-white">
          A<span className="text-cyan">·</span>S
        </button>
        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <li key={l.id}>
              <button onClick={() => go(l.id)} className="relative rounded-full px-4 py-2 font-mono text-xs uppercase tracking-widest text-fog transition-colors hover:text-white">
                {active === l.id && (
                  <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full border border-cyan/30 bg-cyan/10" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
                )}
                <span className={`relative ${active === l.id ? 'text-white' : ''}`}>{l.label}</span>
              </button>
            </li>
          ))}
        </ul>
        <a href={profile.resume} download className="hidden rounded-full border border-cyan/40 px-4 py-2 font-mono text-xs uppercase tracking-widest text-cyan transition hover:bg-cyan hover:text-void md:inline-block">
          Résumé
        </a>
        <button className="text-white md:hidden" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            className="glass mx-auto mt-3 max-w-5xl rounded-3xl p-3 md:hidden"
          >
            {[...LINKS, { id: 'resume', label: 'Résumé ↓' }].map((l, i) => (
              <motion.li key={l.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                {l.id === 'resume' ? (
                  <a href={profile.resume} download className="block rounded-2xl px-4 py-3 font-mono text-sm uppercase tracking-widest text-cyan">
                    {l.label}
                  </a>
                ) : (
                  <button onClick={() => go(l.id)} className="w-full rounded-2xl px-4 py-3 text-left font-mono text-sm uppercase tracking-widest text-fog hover:bg-white/5 hover:text-white">
                    {l.label}
                  </button>
                )}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
