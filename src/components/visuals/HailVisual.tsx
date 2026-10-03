import { motion } from 'motion/react'
import { useEffect, useState } from 'react'

const P = '#f472b6'
const dents = [
  { x: 128, y: 120, r: 13, depth: 2.4 },
  { x: 196, y: 108, r: 9, depth: 1.1 },
  { x: 250, y: 132, r: 15, depth: 3.2 },
  { x: 168, y: 152, r: 10, depth: 1.7 },
  { x: 290, y: 108, r: 8, depth: 0.8 },
]

export function HailVisual({ active }: { active: boolean }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (!active) return
    const id = window.setInterval(() => setI((n) => (n + 1) % dents.length), 1500)
    return () => window.clearInterval(id)
  }, [active])
  const d = dents[i]

  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" role="img" aria-label="A phone camera scanning a dented surface and estimating hail dent depth">
      <defs>
        <radialGradient id="dent">
          <stop offset="0" stopColor={P} stopOpacity="0.9" />
          <stop offset="0.6" stopColor={P} stopOpacity="0.25" />
          <stop offset="1" stopColor={P} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="panel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1b2140" />
          <stop offset="1" stopColor="#0b0e1c" />
        </linearGradient>
        <pattern id="mesh" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M10 0H0V10" fill="none" stroke={P} strokeOpacity="0.12" strokeWidth="0.6" />
        </pattern>
      </defs>

      {/* Scanned surface panel */}
      <motion.rect
        x="70" y="78" width="262" height="112" rx="14"
        fill="url(#panel)" stroke="#e8e9ff" strokeOpacity="0.35" strokeWidth="1.2"
        initial={{ opacity: 0, scale: 0.94 }} animate={active ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.9, ease: 'easeOut' }}
        style={{ transformOrigin: '201px 134px' }}
      />
      <motion.rect x="70" y="78" width="262" height="112" rx="14" fill="url(#mesh)"
        initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : {}} transition={{ delay: 0.6 }} />
      {/* Camera viewfinder corners */}
      <motion.g stroke={P} strokeOpacity="0.6" strokeWidth="1.5" fill="none" initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : {}} transition={{ delay: 0.8 }}>
        <path d="M58 86 V66 H78" />
        <path d="M324 66 H344 V86" />
        <path d="M344 182 V202 H324" />
        <path d="M78 202 H58 V182" />
      </motion.g>
      <text x="58" y="218" fontSize="7.5" fill={P} fillOpacity="0.7" fontFamily="JetBrains Mono">● 1 PHOTO · NO SPECIAL HARDWARE</text>

      {/* Dent heat-spots */}
      {dents.map((dn, k) => (
        <motion.circle key={k} cx={dn.x} cy={dn.y} r={dn.r} fill="url(#dent)"
          initial={{ scale: 0 }} animate={active ? { scale: [1, 1.15, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity, delay: 1.8 + k * 0.2 }}
          style={{ transformOrigin: `${dn.x}px ${dn.y}px` }} />
      ))}

      {/* Scanner reticle */}
      <motion.g animate={{ x: d.x, y: d.y }} initial={{ x: dents[0].x, y: dents[0].y }} transition={{ type: 'spring', stiffness: 90, damping: 14 }}>
        <motion.g animate={active ? { rotate: 90 } : {}} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}>
          {[0, 90, 180, 270].map((a) => (
            <path key={a} d="M-22 -12 V-22 H-12" fill="none" stroke={P} strokeWidth="2" transform={`rotate(${a})`} />
          ))}
        </motion.g>
        <line x1="-6" x2="6" stroke={P} />
        <line y1="-6" y2="6" stroke={P} />
        <line x1="22" y1="-22" x2="44" y2="-44" stroke={P} strokeOpacity="0.7" />
      </motion.g>

      {/* Readout follows reticle */}
      <motion.g animate={{ x: Math.min(d.x + 44, 300), y: d.y - 74 }} initial={{ x: 172, y: 46 }} transition={{ type: 'spring', stiffness: 90, damping: 14 }}>
        <rect width="92" height="34" rx="6" fill="#0a0d18" stroke={P} strokeOpacity="0.7" />
        <text x="8" y="14" fontSize="7.5" fill={P} fontFamily="JetBrains Mono">DENT #{i + 1}</text>
        <text x="8" y="27" fontSize="10" fill="#fff" fontWeight="700" fontFamily="JetBrains Mono">depth {d.depth.toFixed(1)}mm</text>
      </motion.g>

      {/* Depth histogram */}
      <g transform="translate(40 238)">
        <text y="-4" fontSize="7.5" fill={P} fillOpacity="0.8" fontFamily="JetBrains Mono">DEPTH MAP · SINGLE PHOTO · CNN</text>
        {Array.from({ length: 32 }, (_, k) => {
          const h = 6 + Math.abs(Math.sin(k * 1.7) * 22) + (k % 5 === 0 ? 10 : 0)
          return (
            <motion.rect key={k} x={k * 10} width="6" rx="1.5" fill={P}
              initial={{ height: 0, y: 40 }}
              animate={active ? { height: [h * 0.3, h, h * 0.6, h], y: [40 - h * 0.3, 40 - h, 40 - h * 0.6, 40 - h] } : {}}
              transition={{ duration: 2.4, repeat: Infinity, repeatType: 'mirror', delay: k * 0.04 }}
              fillOpacity={0.25 + (h / 40) * 0.7} />
          )
        })}
      </g>
    </svg>
  )
}
