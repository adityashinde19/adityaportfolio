import { motion } from 'motion/react'
import { Counter } from '../ui'

const M = '#34d399'
const loss = 'M20 30 C40 34 50 70 70 86 S110 112 140 118 S190 126 230 128'

function Bar({ label, base, tuned, max, better, active, delay }: { label: string; base: number; tuned: number; max: number; better: 'up' | 'down'; active: boolean; delay: number }) {
  const H = 110
  const hb = (base / max) * H
  const ht = (tuned / max) * H
  return (
    <g>
      <text x="0" y="-8" fontSize="8" fill="#94a3b8" fontFamily="JetBrains Mono">{label}</text>
      <line x1="0" x2="120" y1={H} y2={H} stroke="#ffffff" strokeOpacity="0.15" />
      <motion.rect x="12" width="36" rx="4" fill="#64748b" fillOpacity="0.5"
        initial={{ height: 0, y: H }} animate={active ? { height: hb, y: H - hb } : {}} transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }} />
      <motion.rect x="64" width="36" rx="4" fill={better === 'up' ? M : '#f472b6'}
        initial={{ height: 0, y: H }} animate={active ? { height: ht, y: H - ht } : {}} transition={{ duration: 1.2, delay: delay + 0.35, ease: [0.16, 1, 0.3, 1] }}
        style={{ filter: `drop-shadow(0 0 8px ${better === 'up' ? M : '#f472b6'})` }} />
      <motion.text x="30" textAnchor="middle" fontSize="9" fill="#cbd5e1" fontFamily="JetBrains Mono" initial={{ opacity: 0, y: H }} animate={active ? { opacity: 1, y: H - hb - 5 } : {}} transition={{ duration: 1.2, delay }}>
        {base}%
      </motion.text>
      <motion.text x="82" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff" fontFamily="JetBrains Mono" initial={{ opacity: 0, y: H }} animate={active ? { opacity: 1, y: H - ht - 5 } : {}} transition={{ duration: 1.2, delay: delay + 0.35 }}>
        {tuned}%
      </motion.text>
      <text x="30" y={H + 12} textAnchor="middle" fontSize="7" fill="#94a3b8" fontFamily="JetBrains Mono">BASE</text>
      <text x="82" y={H + 12} textAnchor="middle" fontSize="7" fill={M} fontFamily="JetBrains Mono">QLoRA</text>
    </g>
  )
}

export function MedVisual({ active }: { active: boolean }) {
  return (
    <div className="relative h-full w-full">
      <svg viewBox="0 0 400 300" className="h-full w-full" role="img" aria-label="Bar charts showing correctness rising from 78% to 91% and hallucination falling from 8.5% to 5.8%, beside a training loss curve">
        <defs>
          <linearGradient id="loss-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor={M} stopOpacity="0.35" />
            <stop offset="1" stopColor={M} stopOpacity="0" />
          </linearGradient>
        </defs>

        <g transform="translate(24 66)">
          <Bar label="CORRECTNESS ↑" base={78} tuned={91} max={100} better="up" active={active} delay={0.2} />
        </g>
        <g transform="translate(152 66)">
          <Bar label="HALLUCINATION ↓" base={8.5} tuned={5.8} max={10} better="down" active={active} delay={0.6} />
        </g>

        {/* Loss curve */}
        <g transform="translate(276 66) scale(0.5)">
          <text x="20" y="-16" fontSize="16" fill="#94a3b8" fontFamily="JetBrains Mono">TRAIN LOSS</text>
          {[30, 70, 110, 150].map((y) => (
            <line key={y} x1="20" x2="230" y1={y} y2={y} stroke="#fff" strokeOpacity="0.07" />
          ))}
          <motion.path d={`${loss} L230 150 L20 150 Z`} fill="url(#loss-fill)" initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : {}} transition={{ delay: 2, duration: 1 }} />
          <motion.path d={loss} fill="none" stroke={M} strokeWidth="4" strokeLinecap="round"
            initial={{ pathLength: 0 }} animate={active ? { pathLength: 1 } : {}} transition={{ duration: 2.2, delay: 0.4, ease: 'easeInOut' }} />
          <motion.circle r="7" fill={M} initial={{ offsetDistance: '0%', opacity: 0 }} animate={active ? { offsetDistance: '100%', opacity: 1 } : {}}
            transition={{ duration: 2.2, delay: 0.4, ease: 'easeInOut' }} style={{ offsetPath: `path('${loss}')`, filter: `drop-shadow(0 0 6px ${M})` }} />
        </g>

        {/* Low-rank adapter: W + B·A */}
        <g transform="translate(276 170)" fontFamily="JetBrains Mono">
          <text y="-6" fontSize="8" fill="#94a3b8">ADAPTER ΔW = B·A</text>
          {Array.from({ length: 16 }, (_, k) => (
            <motion.rect key={k} x={(k % 4) * 9} y={Math.floor(k / 4) * 9} width="7" height="7" rx="1.5" fill="#64748b"
              animate={active ? { fillOpacity: [0.2, 0.7, 0.2] } : {}} transition={{ duration: 2, repeat: Infinity, delay: k * 0.08 }} />
          ))}
          <text x="40" y="22" fontSize="10" fill="#fff">+</text>
          {Array.from({ length: 4 }, (_, k) => (
            <motion.rect key={k} x="52" y={k * 9} width="7" height="7" rx="1.5" fill={M}
              animate={active ? { opacity: [0.3, 1, 0.3] } : {}} transition={{ duration: 1.4, repeat: Infinity, delay: k * 0.15 }} />
          ))}
          {Array.from({ length: 4 }, (_, k) => (
            <motion.rect key={k} x={64 + k * 9} y="0" width="7" height="7" rx="1.5" fill={M}
              animate={active ? { opacity: [0.3, 1, 0.3] } : {}} transition={{ duration: 1.4, repeat: Infinity, delay: 0.6 + k * 0.15 }} />
          ))}
        </g>

        <text x="24" y="28" fontSize="9" fill={M} fontFamily="JetBrains Mono">MEDGEMMA-4B · QLoRA · LANGSMITH EVAL GATE</text>
        <motion.g initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : {}} transition={{ delay: 2.4 }}>
          <rect x="24" y="226" width="112" height="20" rx="10" fill={M} fillOpacity="0.12" stroke={M} strokeOpacity="0.5" />
          <text x="34" y="239" fontSize="8.5" fill={M} fontFamily="JetBrains Mono">✓ ROLLOUT APPROVED</text>
        </motion.g>
      </svg>
      <div className="pointer-events-none absolute bottom-[8%] right-[6%] text-right font-mono">
        <div className="text-[10px] uppercase tracking-widest text-fog">gain</div>
        <div className="font-display text-2xl font-bold text-mint">{active ? <Counter to={13} prefix="+" suffix="pt" /> : '+0pt'}</div>
      </div>
    </div>
  )
}
