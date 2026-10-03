import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'

const V = '#a78bfa'
const C = '#22d3ee'
const CX = 200
const CY = 128
const R = 96
const TOOLS = 23
const nodes = Array.from({ length: TOOLS }, (_, i) => {
  const a = (i / TOOLS) * Math.PI * 2 - Math.PI / 2
  return { x: CX + Math.cos(a) * R, y: CY + Math.sin(a) * R * 0.78 }
})
const hot = [0, 5, 9, 14, 18]

const chat = [
  { who: 'user', text: 'Book me Pune → Berlin, Tue, within policy' },
  { who: 'tool', text: 'flights.search · hotels.search · policy.check' },
  { who: 'agent', text: '3 in-policy flights + hotel near venue. Book best?' },
  { who: 'agent', text: '✓ Itinerary booked & sent to calendar' },
]

export function AgentVisual({ active }: { active: boolean }) {
  const [step, setStep] = useState(0)
  useEffect(() => {
    if (!active) return
    const id = window.setInterval(() => setStep((s) => (s + 1) % chat.length), 1700)
    return () => window.clearInterval(id)
  }, [active])

  return (
    <div className="relative h-full w-full">
      <svg viewBox="0 0 400 300" className="h-full w-full" role="img" aria-label="An AI agent node orchestrating 23 MCP tools, with data packets flowing between them">
        <defs>
          <radialGradient id="core-g">
            <stop offset="0" stopColor={V} stopOpacity="0.9" />
            <stop offset="1" stopColor={V} stopOpacity="0" />
          </radialGradient>
        </defs>

        <motion.ellipse cx={CX} cy={CY} rx={R} ry={R * 0.78} fill="none" stroke={V} strokeOpacity="0.25" strokeDasharray="2 5"
          initial={{ pathLength: 0 }} animate={active ? { pathLength: 1 } : {}} transition={{ duration: 1.5 }} />

        {nodes.map((n, i) => (
          <motion.line key={`l${i}`} x1={CX} y1={CY} x2={n.x} y2={n.y} stroke={hot.includes(i) ? C : V} strokeOpacity={hot.includes(i) ? 0.45 : 0.12}
            initial={{ pathLength: 0 }} animate={active ? { pathLength: 1 } : {}} transition={{ duration: 0.8, delay: 0.4 + i * 0.03 }} />
        ))}

        {hot.map((i, k) => (
          <motion.circle key={`p${i}`} r="2.6" fill={C}
            initial={{ cx: CX, cy: CY, opacity: 0 }}
            animate={active ? { cx: [CX, nodes[i].x, CX], cy: [CY, nodes[i].y, CY], opacity: [0, 1, 1, 0] } : {}}
            transition={{ duration: 2.2, repeat: Infinity, delay: k * 0.45, ease: 'easeInOut' }}
            style={{ filter: `drop-shadow(0 0 4px ${C})` }} />
        ))}

        {nodes.map((n, i) => (
          <motion.g key={`n${i}`} initial={{ scale: 0, opacity: 0 }} animate={active ? { scale: 1, opacity: 1 } : {}}
            transition={{ type: 'spring', delay: 0.6 + i * 0.04, stiffness: 300, damping: 15 }} style={{ transformOrigin: `${n.x}px ${n.y}px` }}>
            <circle cx={n.x} cy={n.y} r={hot.includes(i) ? 6 : 4} fill="#0a0d18" stroke={hot.includes(i) ? C : V} strokeWidth="1.5" />
            {hot.includes(i) && (
              <motion.circle cx={n.x} cy={n.y} r="6" fill="none" stroke={C} animate={active ? { r: [6, 14], opacity: [0.8, 0] } : {}} transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.1 }} />
            )}
          </motion.g>
        ))}

        <circle cx={CX} cy={CY} r="44" fill="url(#core-g)" opacity="0.35" />
        <motion.circle cx={CX} cy={CY} r="24" fill="none" stroke={V} strokeWidth="1"
          animate={active ? { r: [24, 40], opacity: [0.7, 0] } : {}} transition={{ duration: 2, repeat: Infinity }} />
        <motion.g animate={active ? { rotate: 360 } : {}} transition={{ duration: 12, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: `${CX}px ${CY}px` }}>
          <polygon points={`${CX},${CY - 22} ${CX + 19},${CY - 11} ${CX + 19},${CY + 11} ${CX},${CY + 22} ${CX - 19},${CY + 11} ${CX - 19},${CY - 11}`} fill="#0a0d18" stroke={V} strokeWidth="1.5" />
        </motion.g>
        <text x={CX} y={CY + 3} textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff" fontFamily="JetBrains Mono">AGENT</text>
        <text x={CX} y="16" textAnchor="middle" fontSize="8" fill={V} fontFamily="JetBrains Mono" opacity="0.8">DEEP AGENT · 23 MCP TOOLS</text>
      </svg>

      <div className="absolute inset-x-4 bottom-3 h-[64px]">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 16, scale: 0.96, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
            transition={{ duration: 0.45 }}
            className={`max-w-[88%] rounded-2xl border px-3 py-2 font-mono text-[11px] leading-snug ${
              chat[step].who === 'user'
                ? 'ml-auto border-white/10 bg-white/10 text-white'
                : chat[step].who === 'tool'
                  ? 'mx-auto border-cyan/30 bg-cyan/10 text-cyan'
                  : 'border-violet/40 bg-violet/15 text-violet'
            }`}
          >
            <span className="opacity-60">{chat[step].who === 'tool' ? '⚙ mcp ' : chat[step].who === 'agent' ? '◆ agent ' : '● you '}</span>
            {chat[step].text}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
