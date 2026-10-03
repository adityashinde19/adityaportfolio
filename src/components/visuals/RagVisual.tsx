import { motion } from 'motion/react'

const C = '#22d3ee'

const detections = [
  { x: 96, y: 112, w: 46, h: 46, label: 'valve · 0.97' },
  { x: 222, y: 96, w: 58, h: 34, label: 'flange · 0.94' },
  { x: 168, y: 186, w: 40, h: 40, label: 'pump · 0.96' },
  { x: 288, y: 176, w: 44, h: 50, label: 'sensor · 0.91' },
]

const schematic = [
  'M60 135 H96 M142 135 H222 M280 113 H330 V176',
  'M188 158 V186 M208 206 H288',
  'M119 158 V230 H168',
  'M330 226 V250 H60 V135',
]

export function RagVisual({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" role="img" aria-label="Animated engineering drawing being scanned by a symbol detector and matched to a search query">
      <defs>
        <pattern id="bp-grid" width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M16 0H0V16" fill="none" stroke={C} strokeOpacity="0.08" />
        </pattern>
        <linearGradient id="scan" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={C} stopOpacity="0" />
          <stop offset="1" stopColor={C} stopOpacity="0.45" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#bp-grid)" />

      {/* Ingestion stream of pages */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.rect
          key={i}
          width="14"
          height="18"
          rx="2"
          fill="none"
          stroke={C}
          strokeOpacity="0.6"
          y={272}
          initial={{ x: -20, opacity: 0 }}
          animate={active ? { x: [-20, 420], opacity: [0, 1, 1, 0] } : {}}
          transition={{ duration: 4, repeat: Infinity, delay: i * 0.8, ease: 'linear' }}
        />
      ))}
      <text x="12" y="266" fill={C} fillOpacity="0.6" fontSize="8" fontFamily="JetBrains Mono">INGEST ▸ 90,000+ pages/day</text>

      {/* Drawing sheet */}
      <motion.rect
        x="44" y="70" width="312" height="192" rx="4" fill="none" stroke={C} strokeOpacity="0.5" strokeDasharray="4 4"
        initial={{ pathLength: 0 }} animate={active ? { pathLength: 1 } : {}} transition={{ duration: 1.4 }}
      />
      {schematic.map((d, i) => (
        <motion.path
          key={i} d={d} fill="none" stroke="#e0f7ff" strokeOpacity="0.75" strokeWidth="1.4"
          initial={{ pathLength: 0 }} animate={active ? { pathLength: 1 } : {}} transition={{ duration: 1.6, delay: 0.3 + i * 0.25, ease: 'easeInOut' }}
        />
      ))}
      {/* Symbols */}
      <motion.g initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : {}} transition={{ delay: 1 }} stroke="#e0f7ff" strokeOpacity="0.8" fill="none" strokeWidth="1.4">
        <path d="M104 120 L134 150 M134 120 L104 150 M104 120 V150 M134 120 V150" />
        <rect x="228" y="102" width="46" height="22" />
        <line x1="251" y1="102" x2="251" y2="124" />
        <circle cx="188" cy="206" r="14" />
        <path d="M180 206 L196 206 L190 200 M196 206 L190 212" />
        <circle cx="310" cy="201" r="12" />
        <text x="304" y="205" fontSize="9" fill="#e0f7ff" stroke="none">PT</text>
      </motion.g>
      <text x="300" y="256" fill="#e0f7ff" fillOpacity="0.5" fontSize="7" fontFamily="JetBrains Mono">DWG-4471 · REV C</text>

      {/* Scanner */}
      <motion.g initial={{ y: 0 }} animate={active ? { y: [0, 176, 0] } : {}} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
        <rect x="44" y="50" width="312" height="22" fill="url(#scan)" />
        <line x1="44" x2="356" y1="72" y2="72" stroke={C} strokeWidth="1.5" />
      </motion.g>

      {/* YOLO detections */}
      {detections.map((d, i) => (
        <motion.g
          key={d.label}
          initial={{ opacity: 0, scale: 1.3 }}
          animate={active ? { opacity: [0, 1, 1, 1, 0], scale: [1.3, 1, 1, 1, 1] } : {}}
          transition={{ duration: 5, repeat: Infinity, delay: 1.4 + i * 0.6, times: [0, 0.08, 0.5, 0.85, 1] }}
          style={{ transformOrigin: `${d.x + d.w / 2}px ${d.y + d.h / 2}px` }}
        >
          <rect x={d.x} y={d.y} width={d.w} height={d.h} fill={C} fillOpacity="0.08" stroke={C} strokeWidth="1.5" />
          <rect x={d.x} y={d.y - 11} width={d.label.length * 4.6 + 6} height="11" fill={C} />
          <text x={d.x + 3} y={d.y - 3} fontSize="7.5" fill="#04050a" fontFamily="JetBrains Mono" fontWeight="700">{d.label}</text>
        </motion.g>
      ))}

      {/* Query bar */}
      <rect x="44" y="16" width="312" height="28" rx="14" fill="#0a0d18" stroke={C} strokeOpacity="0.4" />
      <circle cx="62" cy="30" r="5" fill="none" stroke={C} strokeWidth="1.5" />
      <line x1="66" y1="34" x2="70" y2="38" stroke={C} strokeWidth="1.5" />
      <clipPath id="type-clip">
        <motion.rect x="78" y="18" height="24" initial={{ width: 0 }} animate={active ? { width: [0, 200, 200, 0] } : {}} transition={{ duration: 5, repeat: Infinity, times: [0, 0.35, 0.9, 1] }} />
      </clipPath>
      <text x="80" y="34" clipPath="url(#type-clip)" fill="#e0f7ff" fontSize="10" fontFamily="JetBrains Mono">"pump housing, latest revision"</text>
      <motion.g initial={{ opacity: 0 }} animate={active ? { opacity: [0, 0, 1, 1, 0] } : {}} transition={{ duration: 5, repeat: Infinity, times: [0, 0.4, 0.45, 0.9, 1] }}>
        <rect x="290" y="21" width="60" height="18" rx="9" fill={C} />
        <text x="297" y="33" fontSize="8" fill="#04050a" fontFamily="JetBrains Mono" fontWeight="700">→ p.412</text>
      </motion.g>
    </svg>
  )
}
