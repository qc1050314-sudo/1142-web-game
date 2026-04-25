'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'

type Phase = 'black' | 'flash' | 'case' | 'suspect' | 'revelation' | 'mission' | 'cta'

const PHASE_ORDER: Phase[] = ['black', 'flash', 'case', 'suspect', 'revelation', 'mission', 'cta']

const FLASH_FRAMES: { src?: string; bg?: string; filter?: string; duration: number }[] = [
  { src: '/images/flash_glass.png',     filter: 'brightness(0.85)',                    duration: 1200 },
  { bg: '#000',                                                                         duration: 180 },
  { src: '/images/flash_accordion.png', filter: 'brightness(0.78)',                    duration: 1200 },
  { bg: '#000',                                                                         duration: 180 },
  { src: '/images/flash_street.png',    filter: 'brightness(0.72)',                    duration: 1200 },
  { bg: '#000',                                                                         duration: 180 },
  { src: '/images/flash_blood.png',     filter: 'brightness(0.7) contrast(1.1)',       duration: 1200 },
  { bg: '#000',                                                                         duration: 180 },
  { src: '/images/flash_joss.png',      filter: 'brightness(0.8)',                     duration: 1200 },
]

/* ── sub-scenes ── */

function CaseScene() {
  return (
    <div style={{
      border: '1px solid rgba(200,160,55,0.28)',
      padding: '36px 48px',
      background: 'rgba(8,6,3,0.92)',
      maxWidth: 340,
      width: '100%',
    }}>
      <p style={{
        color: '#3e2c0e',
        fontSize: '0.52rem',
        letterSpacing: '0.45em',
        fontFamily: 'sans-serif',
        textAlign: 'center',
        marginBottom: 28,
      }}>
        ── 警察局　調查報告 ──
      </p>
      <div className="flex flex-col gap-5">
        {[
          ['案件編號', '0715'],
          ['案件名稱', '五月花命案'],
        ].map(([label, value]) => (
          <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ color: '#4a3818', fontSize: '0.58rem', letterSpacing: '0.25em', fontFamily: 'sans-serif' }}>
              {label}
            </span>
            <span style={{ color: '#c8a848', fontSize: '0.82rem', letterSpacing: '0.2em', fontFamily: 'serif' }}>
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function SuspectScene() {
  return (
    <div style={{
      border: '1px solid rgba(200,160,55,0.22)',
      padding: '36px 48px',
      background: 'rgba(8,6,3,0.92)',
      maxWidth: 340,
      width: '100%',
    }}>
      <p style={{
        color: '#3e2c0e',
        fontSize: '0.52rem',
        letterSpacing: '0.45em',
        fontFamily: 'sans-serif',
        textAlign: 'center',
        marginBottom: 28,
      }}>
        ── 嫌疑人資料 ──
      </p>
      <div className="flex flex-col gap-5">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ color: '#4a3818', fontSize: '0.58rem', letterSpacing: '0.25em', fontFamily: 'sans-serif' }}>
            姓名
          </span>
          <span style={{ color: '#c8a848', fontSize: '0.82rem', letterSpacing: '0.2em', fontFamily: 'serif' }}>
            娟娟（藝名）
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ color: '#4a3818', fontSize: '0.58rem', letterSpacing: '0.25em', fontFamily: 'sans-serif' }}>
            狀態
          </span>
          <motion.span
            animate={{ opacity: [1, 0.45, 1] }}
            transition={{ duration: 2.4, repeat: Infinity }}
            style={{ color: '#c04040', fontSize: '0.75rem', letterSpacing: '0.2em', fontFamily: 'sans-serif' }}
          >
            待判定
          </motion.span>
        </div>
      </div>
    </div>
  )
}

function RevelationScene() {
  return (
    <div className="flex flex-col items-center gap-6" style={{ maxWidth: 360 }}>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.8 }}
        style={{
          color: '#d8c8a0',
          fontSize: '1.35rem',
          letterSpacing: '0.3em',
          fontFamily: 'serif',
          textAlign: 'center',
          textShadow: '0 0 40px rgba(216,200,160,0.2)',
        }}
      >
        她殺了一個人。
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        style={{
          color: '#6a5838',
          fontSize: '0.85rem',
          letterSpacing: '0.28em',
          fontFamily: 'serif',
          textAlign: 'center',
        }}
      >
        但沒有人知道為什麼。
      </motion.p>
    </div>
  )
}

function MissionScene() {
  return (
    <div className="flex flex-col items-center gap-5" style={{ maxWidth: 360 }}>
      <p style={{
        color: '#3e2c0e',
        fontSize: '0.52rem',
        letterSpacing: '0.45em',
        fontFamily: 'sans-serif',
      }}>
        ── 任務說明 ──
      </p>
      <div className="flex flex-col items-center gap-3">
        {['重建事件經過', '並做出最終判斷'].map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.35, duration: 0.7 }}
            style={{
              color: '#c8a848',
              fontSize: '1.05rem',
              letterSpacing: '0.28em',
              fontFamily: 'serif',
              textAlign: 'center',
              textShadow: '0 0 30px rgba(200,168,72,0.18)',
            }}
          >
            {line}
          </motion.p>
        ))}
      </div>
    </div>
  )
}

function CtaScene({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex flex-col items-center gap-10">
      {/* Background hint — the scene behind */}
      <p style={{
        color: '#3e2c0e',
        fontSize: '0.52rem',
        letterSpacing: '0.45em',
        fontFamily: 'sans-serif',
      }}>
        五月花歌廳　1968
      </p>

      <motion.button
        onClick={onStart}
        whileHover={{ scale: 1.05, boxShadow: '0 0 48px rgba(200,150,45,0.28)' }}
        whileTap={{ scale: 0.97 }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        style={{
          padding: '16px 64px',
          background: 'rgba(200,150,45,0.14)',
          border: '1px solid rgba(200,150,45,0.75)',
          borderRadius: 2,
          color: '#e0b040',
          fontSize: '0.85rem',
          letterSpacing: '0.5em',
          fontFamily: 'sans-serif',
          cursor: 'pointer',
          boxShadow: '0 0 24px rgba(200,150,45,0.14)',
          transition: 'box-shadow 0.3s',
        }}
      >
        開始調查
      </motion.button>
    </div>
  )
}

/* ── main component ── */

export default function Opening() {
  const router = useRouter()
  const [phase, setPhase] = useState<Phase>('black')
  const [flashIdx, setFlashIdx] = useState(0)
  const [visible, setVisible] = useState(true)

  // black → flash
  useEffect(() => {
    if (phase !== 'black') return
    const t = setTimeout(() => setPhase('flash'), 2200)
    return () => clearTimeout(t)
  }, [phase])

  // flash auto-advance
  useEffect(() => {
    if (phase !== 'flash') return
    if (flashIdx < FLASH_FRAMES.length - 1) {
      const t = setTimeout(() => setFlashIdx(i => i + 1), FLASH_FRAMES[flashIdx].duration)
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(() => setPhase('case'), 900)
      return () => clearTimeout(t)
    }
  }, [phase, flashIdx])

  function advance() {
    if (!['case', 'suspect', 'revelation', 'mission'].includes(phase)) return
    const idx = PHASE_ORDER.indexOf(phase)
    setVisible(false)
    setTimeout(() => {
      setPhase(PHASE_ORDER[idx + 1])
      setVisible(true)
    }, 250)
  }

  function startGame() {
    localStorage.setItem('ch1_started', '1')
    router.push('/chapter1')
  }

  const isTextPhase = ['case', 'suspect', 'revelation', 'mission'].includes(phase)
  const isClickable = isTextPhase

  return (
    <div
      className="relative h-full w-full overflow-hidden select-none"
      style={{ background: '#000', cursor: isClickable ? 'pointer' : 'default' }}
      onClick={isClickable ? advance : undefined}
    >

      {/* Flash sequence */}
      <AnimatePresence mode="wait">
        {phase === 'flash' && (
          <motion.div
            key={`flash-${flashIdx}`}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            style={{ background: FLASH_FRAMES[flashIdx].bg ?? '#000' }}
          >
            {FLASH_FRAMES[flashIdx].src && (
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url('${FLASH_FRAMES[flashIdx].src}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: FLASH_FRAMES[flashIdx].filter,
                }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Text & CTA phases */}
      <AnimatePresence mode="wait">
        {(isTextPhase || phase === 'cta') && visible && (
          <motion.div
            key={phase}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{ padding: '0 10%' }}
          >
            {/* Subtle bg hint for later phases */}
            {['case', 'suspect', 'revelation', 'mission', 'cta'].includes(phase) && (
              <div className="absolute inset-0" style={{
                backgroundImage: "url('/images/opening_desk.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center 30%',
                filter: 'brightness(0.12) blur(1px)',
              }} />
            )}

            <div className="relative z-10 flex flex-col items-center">
              {phase === 'case'       && <CaseScene />}
              {phase === 'suspect'    && <SuspectScene />}
              {phase === 'revelation' && <RevelationScene />}
              {phase === 'mission'    && <MissionScene />}
              {phase === 'cta'        && <CtaScene onStart={startGame} />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click-to-continue hint */}
      <AnimatePresence>
        {isTextPhase && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none"
          >
            <motion.p
              animate={{ opacity: [0.25, 0.7, 0.25] }}
              transition={{ duration: 2.8, repeat: Infinity }}
              style={{
                color: '#3e2c0e',
                fontSize: '0.52rem',
                letterSpacing: '0.35em',
                fontFamily: 'sans-serif',
              }}
            >
              點擊繼續
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
