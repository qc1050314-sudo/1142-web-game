'use client'

import { useState, Fragment } from 'react'
import type { CSSProperties } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'

type EvidenceId = 'ledger' | 'glass' | 'engraved' | 'card'

type EvidenceData = {
  name: string
  icon: string
  title: string
  content: string[]
  clue: string
  image: string
}

const EVIDENCE: Record<EvidenceId, EvidenceData> = {
  ledger: {
    name: '訂位紀錄簿',
    icon: '📋',
    title: '五月花　訂位紀錄簿',
    content: [],
    clue: '305桌的客人名字被刻意劃掉了……',
    image: '/images/ch1_ledger.png',
  },
  glass: {
    name: '口紅酒杯',
    icon: '🍷',
    title: '305桌　酒杯',
    content: [],
    clue: '有人和娟娟喝過酒……',
    image: '/images/ch1_glass.png',
  },
  engraved: {
    name: '刻字酒杯',
    icon: '🥃',
    title: '專屬刻字酒杯',
    content: [],
    clue: '杯底三個字母，是某人姓名的縮寫。',
    image: '/images/ch1_engraved_glass.png',
  },
  card: {
    name: '會員卡',
    icon: '🎫',
    title: '五月花歌廳　貴賓會員卡',
    content: [],
    clue: '桌下掉落的一張會員卡……真相就在眼前。',
    image: '/images/ch1_card.png',
  },
}

const HOTSPOTS: { id: EvidenceId; label: string; style: CSSProperties }[] = [
  { id: 'ledger',   label: '訂位紀錄簿', style: { left: '78%', top: '75%', width: 94, height: 72 } },
  { id: 'glass',    label: '酒杯',       style: { left: '20%', top: '45%', width: 52, height: 88 } },
  { id: 'engraved', label: '刻字酒杯',   style: { left: '72%', top: '45%', width: 52, height: 88 } },
  { id: 'card',     label: '桌下',       style: { left: '9%', top: '70%', width: 80, height: 24 } },
]

const NEED_FOR_PUZZLE: EvidenceId[] = ['ledger', 'engraved', 'card']
const ALL_IDS: EvidenceId[] = ['ledger', 'glass', 'engraved', 'card']

/* ─── small reusable pieces ─── */

function PulseNode({ collected }: { collected: boolean }) {
  if (collected) {
    return (
      <div className="absolute top-1.5 right-1.5 rounded-full"
           style={{ width: 7, height: 7, background: '#50d060', boxShadow: '0 0 6px #50d060' }} />
    )
  }
  return (
    <motion.div
      className="absolute top-1.5 right-1.5 rounded-full"
      style={{ width: 7, height: 7, background: '#c8a030', boxShadow: '0 0 6px #c8a030' }}
      animate={{ opacity: [1, 0.2, 1], scale: [1, 1.6, 1] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

/* ─── main component ─── */

export default function Chapter1() {
  const router = useRouter()
  const [inventory, setInventory] = useState<Set<EvidenceId>>(new Set())
  const [modal, setModal] = useState<EvidenceId | null>(null)
  const [answer, setAnswer] = useState('')
  const [wrong, setWrong] = useState(false)
  const [hoveredId, setHoveredId] = useState<EvidenceId | null>(null)

  const canSolve = NEED_FOR_PUZZLE.every(id => inventory.has(id))

  function pick(id: EvidenceId) {
    setInventory(prev => new Set([...prev, id]))
    setModal(id)
  }

  function submitAnswer() {
    if (answer.trim() === '柯老雄') {
      router.push('/cutscene1')
    } else {
      setWrong(true)
      setTimeout(() => setWrong(false), 600)
    }
  }

  return (
    <div className="relative h-full w-full flex flex-col overflow-hidden"
         style={{ background: '#16161c' }}>

      {/* ══════════════════════════════════════════
          TOP: Scene (56% height)
      ══════════════════════════════════════════ */}
      <div className="relative flex-none" style={{ height: '56%' }}>

        {/* Background */}
        <div className="absolute inset-0" style={{
          backgroundImage: "url('/images/ch1_bg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center 55%',
        }} />
        {/* Vignette */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.05) 60%, rgba(22,22,28,0.7) 100%)',
        }} />

        {/* Chapter label */}
        <div className="absolute top-4 left-5 flex flex-col gap-0.5 pointer-events-none"
             style={{ textShadow: '0 2px 10px rgba(0,0,0,0.95)' }}>
          <p style={{ color: '#806030', fontSize: '0.55rem', letterSpacing: '0.38em', fontFamily: 'sans-serif' }}>
            CHAPTER  I
          </p>
          <p style={{ color: '#e8c870', fontSize: '1rem', letterSpacing: '0.2em', fontFamily: 'serif' }}>
            五月花歌廳
          </p>
        </div>

        {/* Collected count badge (top-right, Notes-style) */}
        <div className="absolute top-4 right-5 flex flex-col gap-1 pointer-events-none"
             style={{ textShadow: '0 2px 10px rgba(0,0,0,0.95)' }}>
          <p style={{ color: '#806030', fontSize: '0.55rem', letterSpacing: '0.3em', fontFamily: 'sans-serif', textAlign: 'right' }}>
            CLUES
          </p>
          <p style={{ color: '#e8c870', fontSize: '0.75rem', letterSpacing: '0.15em', fontFamily: 'serif', textAlign: 'right' }}>
            {inventory.size} / {ALL_IDS.length}
          </p>
        </div>

        {/* Hotspots */}
        {HOTSPOTS.map(({ id, label, style }) => {
          const collected = inventory.has(id)
          const hovered = hoveredId === id
          return (
            <motion.button
              key={id}
              className="absolute"
              style={{ ...style, cursor: 'pointer' }}
              onClick={() => pick(id)}
              onMouseEnter={() => setHoveredId(id)}
              onMouseLeave={() => setHoveredId(null)}
              whileTap={{ scale: 0.93 }}
            >
              <PulseNode collected={collected} />

              {/* Hover border */}
              <AnimatePresence>
                {hovered && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.12 }}
                    className="absolute inset-0"
                    style={{
                      border: `2px solid ${collected ? 'rgba(80,210,80,0.75)' : 'rgba(220,175,60,0.85)'}`,
                      background: collected ? 'rgba(60,180,60,0.07)' : 'rgba(220,175,60,0.08)',
                      borderRadius: 5,
                      boxShadow: collected
                        ? '0 0 18px rgba(60,200,60,0.28)'
                        : '0 0 18px rgba(220,175,60,0.28)',
                    }}
                  />
                )}
              </AnimatePresence>

              {/* Tooltip */}
              <AnimatePresence>
                {hovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.12 }}
                    className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none z-10"
                    style={{
                      background: 'rgba(6,5,14,0.92)',
                      border: '1px solid rgba(200,160,50,0.5)',
                      borderRadius: 4,
                      padding: '4px 12px',
                      color: '#d4b060',
                      fontSize: '0.6rem',
                      letterSpacing: '0.18em',
                      fontFamily: 'sans-serif',
                    }}
                  >
                    {label}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          )
        })}

        {/* Hint */}
        <AnimatePresence>
          {inventory.size === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 1.5 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none"
              style={{
                color: '#c8a040',
                fontSize: '0.65rem',
                letterSpacing: '0.22em',
                fontFamily: 'sans-serif',
                textShadow: '0 2px 10px rgba(0,0,0,0.95)',
              }}
            >
              點擊場景中發光的物件進行調查
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* ══════════════════════════════════════════
          BOTTOM: Evidence + Logic Board (44% height)
      ══════════════════════════════════════════ */}
      <div className="flex-1 flex overflow-hidden"
           style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>

        {/* ── Evidence Panel (left half) ── */}
        <div className="flex flex-col overflow-hidden"
             style={{ width: '50%', padding: '14px 16px', borderRight: '1px solid rgba(255,255,255,0.06)' }}>

          {/* Panel header */}
          <div className="flex items-baseline gap-2 mb-3 flex-none">
            <h2 style={{ color: '#dcc070', fontSize: '0.9rem', letterSpacing: '0.22em', fontFamily: 'serif' }}>
              Evidence
            </h2>
            <span style={{ color: '#5a4820', fontSize: '0.55rem', letterSpacing: '0.18em', fontFamily: 'sans-serif' }}>
              證據欄
            </span>
          </div>

          {/* 2×2 grid */}
          <div className="grid grid-cols-2 grid-rows-2 gap-2.5 flex-1 min-h-0 overflow-hidden">
            {ALL_IDS.map(id => {
              const ev = EVIDENCE[id]
              const collected = inventory.has(id)
              return (
                <motion.button
                  key={id}
                  onClick={() => collected ? setModal(id) : undefined}
                  disabled={!collected}
                  className="relative flex flex-col items-center justify-between rounded-lg overflow-hidden min-h-0"
                  style={{
                    background: collected ? 'rgba(26,20,10,0.95)' : 'rgba(18,18,24,0.8)',
                    border: `1px solid ${collected ? 'rgba(210,165,55,0.6)' : 'rgba(50,50,62,0.5)'}`,
                    boxShadow: collected
                      ? '0 0 16px rgba(210,165,55,0.14), inset 0 1px 0 rgba(210,165,55,0.08)'
                      : 'none',
                    cursor: collected ? 'pointer' : 'default',
                    padding: collected ? '8px 6px 6px' : 0,
                  }}
                  whileHover={collected ? { scale: 1.025, y: -1 } : {}}
                  whileTap={collected ? { scale: 0.97 } : {}}
                >
                  {collected ? (
                    <>
                      {/* Image */}
                      <div className="flex-1 min-h-0 flex items-center justify-center w-full overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={ev.image}
                          alt={ev.name}
                          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', display: 'block' }}
                        />
                      </div>
                      {/* Label */}
                      <p style={{
                        color: '#a08838',
                        fontSize: '0.52rem',
                        letterSpacing: '0.12em',
                        fontFamily: 'sans-serif',
                        flexShrink: 0,
                        marginTop: 4,
                      }}>
                        {ev.name}
                      </p>
                    </>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-1"
                         style={{ opacity: 0.18 }}>
                      <span style={{ fontSize: '1.6rem' }}>?</span>
                      <span style={{ color: '#606075', fontSize: '0.5rem', letterSpacing: '0.1em', fontFamily: 'sans-serif' }}>
                        未發現
                      </span>
                    </div>
                  )}
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* ── Logic Board Panel (right half) ── */}
        <div className="flex flex-col overflow-hidden"
             style={{ width: '50%', padding: '14px 18px' }}>

          {/* Panel header */}
          <div className="flex items-baseline gap-2 mb-3 flex-none">
            <h2 style={{ color: '#dcc070', fontSize: '0.9rem', letterSpacing: '0.22em', fontFamily: 'serif' }}>
              Logic Board
            </h2>
            <span style={{ color: '#5a4820', fontSize: '0.55rem', letterSpacing: '0.18em', fontFamily: 'sans-serif' }}>
              推理板
            </span>
          </div>

          {/* Clue chain */}
          <div className="flex items-center justify-center gap-1.5 flex-none mb-4">
            {NEED_FOR_PUZZLE.map((id, i) => {
              const ev = EVIDENCE[id]
              const collected = inventory.has(id)
              return (
                <Fragment key={id}>
                  {/* Node */}
                  <motion.button
                    onClick={() => collected ? setModal(id) : undefined}
                    disabled={!collected}
                    className="flex flex-col items-center gap-1"
                    style={{ cursor: collected ? 'pointer' : 'default' }}
                    whileHover={collected ? { scale: 1.05, y: -2 } : {}}
                  >
                    <div style={{
                      width: 58, height: 58,
                      background: collected ? 'rgba(22,16,8,0.95)' : 'rgba(18,18,24,0.7)',
                      border: `1px solid ${collected ? 'rgba(210,165,55,0.65)' : 'rgba(45,45,58,0.6)'}`,
                      borderRadius: 7,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      overflow: 'hidden',
                      boxShadow: collected ? '0 0 12px rgba(210,165,55,0.18)' : 'none',
                      opacity: collected ? 1 : 0.28,
                      flexShrink: 0,
                    }}>
                      {collected ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={ev.image} alt={ev.name}
                             style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <span style={{ color: '#4a4a5a', fontSize: '1.1rem', fontFamily: 'serif' }}>?</span>
                      )}
                    </div>
                    <span style={{
                      color: collected ? '#9a7e38' : '#30303c',
                      fontSize: '0.5rem',
                      letterSpacing: '0.08em',
                      fontFamily: 'sans-serif',
                      maxWidth: 62,
                      textAlign: 'center',
                    }}>
                      {ev.name}
                    </span>
                  </motion.button>

                  {/* Arrow connector */}
                  {i < NEED_FOR_PUZZLE.length - 1 && (
                    <div style={{
                      color: canSolve ? '#b89030' : '#282832',
                      fontSize: '1rem',
                      flexShrink: 0,
                      paddingBottom: 16,
                      transition: 'color 0.4s',
                    }}>
                      →
                    </div>
                  )}
                </Fragment>
              )
            })}
          </div>

          {/* Divider */}
          <div className="flex-none mb-3"
               style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />

          {/* Question */}
          <p className="flex-none text-center mb-2.5" style={{
            color: canSolve ? '#c8aa60' : '#484858',
            fontSize: '0.78rem',
            letterSpacing: '0.2em',
            fontFamily: 'serif',
            transition: 'color 0.4s',
          }}>
            305桌的客人是誰？
          </p>

          {/* Input */}
          <motion.div
            className="flex-none mb-2"
            animate={wrong ? { x: [-6, 6, -6, 6, 0] } : { x: 0 }}
            transition={{ duration: 0.32 }}
          >
            <input
              type="text"
              value={answer}
              onChange={e => setAnswer(e.target.value)}
              onKeyDown={undefined}
              disabled={!canSolve}
              placeholder={canSolve ? '輸入名字……' : '需蒐集更多線索'}
              style={{
                width: '100%',
                padding: '9px 14px',
                background: wrong
                  ? 'rgba(180,50,50,0.09)'
                  : (canSolve ? 'rgba(6,5,12,0.7)' : 'rgba(14,14,20,0.5)'),
                border: `1px solid ${wrong
                  ? 'rgba(210,70,70,0.6)'
                  : (canSolve ? 'rgba(200,155,55,0.42)' : 'rgba(40,40,52,0.55)')}`,
                borderRadius: 7,
                color: canSolve ? '#e8dcc0' : '#30303c',
                fontSize: '0.88rem',
                letterSpacing: '0.28em',
                fontFamily: 'serif',
                outline: 'none',
                textAlign: 'center',
                boxSizing: 'border-box',
                transition: 'border-color 0.3s, color 0.3s',
              }}
            />
          </motion.div>

          {wrong && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-none text-center mb-2"
              style={{ color: '#a04040', fontSize: '0.58rem', letterSpacing: '0.14em', fontFamily: 'sans-serif' }}
            >
              答案不對，再想想……
            </motion.p>
          )}

          {/* Submit */}
          <motion.button
            className="flex-none w-full"
            onClick={() => canSolve && submitAnswer()}
            disabled={!canSolve}
            style={{ cursor: canSolve ? 'pointer' : 'default' }}
            whileHover={canSolve ? { scale: 1.02 } : {}}
            whileTap={canSolve ? { scale: 0.97 } : {}}
          >
            <div style={{
              padding: '9px',
              background: canSolve ? 'rgba(200,150,45,0.16)' : 'rgba(18,18,24,0.6)',
              border: `1px solid ${canSolve ? 'rgba(200,150,45,0.65)' : 'rgba(40,40,52,0.45)'}`,
              borderRadius: 7,
              color: canSolve ? '#e0b040' : '#30303c',
              fontSize: '0.7rem',
              letterSpacing: '0.3em',
              fontFamily: 'sans-serif',
              textAlign: 'center',
              boxShadow: canSolve ? '0 0 20px rgba(200,150,45,0.12)' : 'none',
              transition: 'all 0.35s',
            }}>
              提交答案
            </div>
          </motion.button>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          Evidence detail modal (overlay)
      ══════════════════════════════════════════ */}
      <AnimatePresence>
        {modal && (
          <motion.div
            key="ev-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-0 z-20 flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(5px)' }}
            onClick={() => setModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 26, scale: 0.93 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              onClick={e => e.stopPropagation()}
              style={{
                background: 'linear-gradient(155deg, #1e1710 0%, #120e07 100%)',
                border: '1px solid rgba(200,160,55,0.38)',
                borderRadius: 14,
                width: 390,
                maxHeight: '80vh',
                padding: '26px 30px',
                boxShadow: '0 30px 100px rgba(0,0,0,0.8)',
                overflowY: 'auto',
              }}
            >
              {/* Header */}
              <div className="flex items-center mb-5">
                <h3 style={{ color: '#dcc070', fontSize: '0.85rem', letterSpacing: '0.2em', fontFamily: 'serif' }}>
                  {EVIDENCE[modal].title}
                </h3>
              </div>

              {/* Evidence image */}
              <div className="flex items-center justify-center mb-5" style={{
                background: 'rgba(0,0,0,0.55)',
                border: '1px solid rgba(200,160,55,0.1)',
                borderRadius: 8,
                padding: 12,
                minHeight: 180,
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={EVIDENCE[modal].image}
                  alt={EVIDENCE[modal].name}
                  style={{ maxWidth: '100%', maxHeight: 260, objectFit: 'contain', borderRadius: 4 }}
                />
              </div>

              {/* Clue */}
              <div style={{
                padding: '11px 14px',
                background: 'rgba(200,160,55,0.055)',
                border: '1px solid rgba(200,160,55,0.16)',
                borderRadius: 7,
                marginBottom: 18,
              }}>
                <p style={{ color: '#9a7a38', fontSize: '0.68rem', letterSpacing: '0.14em', fontFamily: 'sans-serif', lineHeight: 1.75 }}>
                  💡　{EVIDENCE[modal].clue}
                </p>
              </div>

              <button
                onClick={() => setModal(null)}
                style={{
                  width: '100%', padding: '9px',
                  background: 'rgba(200,160,55,0.1)',
                  border: '1px solid rgba(200,160,55,0.35)',
                  borderRadius: 7,
                  color: '#a88030',
                  fontSize: '0.65rem',
                  letterSpacing: '0.3em',
                  fontFamily: 'sans-serif',
                  cursor: 'pointer',
                }}
              >
                收入口袋
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
