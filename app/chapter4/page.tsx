'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const TEXT_STYLE = { fontSize: 24, color: '#FFD54F' } as const
const LINE_FADE_S = 0.4
const INVESTIGATE_AFTER_LINE2_EXIT_MS = Math.ceil(LINE_FADE_S * 1000) + 80
const CLUE_CAPTION_STYLE = {
  fontSize: 32,
  color: '#000000',
  letterSpacing: '0.15em',
} as const

/** 百分比定位（光點中心）；對應圖片請放 public/images/chapter4/ */
const LIGHT_HOTSPOTS = [
  {
    id: 1,
    label: '左上櫥櫃上',
    left: '16%',
    top: '18%',
    clueSrc: '/images/chapter4/kouhong.png',
    clueTitle: '口紅',
  },
  {
    id: 2,
    label: '右方床上衣物堆疊處',
    left: '72%',
    top: '56%',
    offsetXPx: 120,
    clueSrc: '/images/chapter4/chenshan.png',
    clueTitle: '襯衫',
  },
  {
    id: 3,
    label: '櫥櫃門上',
    left: '14%',
    top: '44%',
    clueSrc: '/images/chapter4/zhangce.png',
    clueTitle: '帳冊',
  },
  {
    id: 4,
    label: '左手邊地上的陰暗處',
    left: '10%',
    bottom: '14%',
    clueSrc: '/images/chapter4/zhentong.png',
    clueTitle: '針筒',
  },
  {
    id: 5,
    label: '右上床邊地板',
    left: '78%',
    top: '52%',
    offsetXPx: -200,
    offsetYPx: -250,
    clueSrc: '/images/chapter4/yaofen.png',
    clueTitle: '藥粉',
  },
  {
    id: 6,
    label: '右上床上',
    left: '76%',
    top: '34%',
    offsetXPx: 150,
    offsetYPx: -150,
    clueSrc: '/images/chapter4/zhaopian.png',
    clueTitle: '照片',
  },
] as const

export default function Chapter4Page() {
  const [phase, setPhase] = useState<0 | 1 | 2 | 3>(0)
  const [screen, setScreen] = useState<'intro' | 'investigate'>('intro')
  const [activeClueId, setActiveClueId] = useState<number | null>(null)
  const line2HoldTimer = useRef<number | null>(null)
  const investigateTimer = useRef<number | null>(null)
  const line2RevealScheduled = useRef(false)

  useEffect(() => {
    const tShow1 = window.setTimeout(() => setPhase(1), 1000)
    const tToLine2 = window.setTimeout(() => setPhase(2), 1000 + 1500)
    return () => {
      window.clearTimeout(tShow1)
      window.clearTimeout(tToLine2)
      if (line2HoldTimer.current) {
        window.clearTimeout(line2HoldTimer.current)
        line2HoldTimer.current = null
      }
      if (investigateTimer.current) {
        window.clearTimeout(investigateTimer.current)
        investigateTimer.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (phase !== 3 || screen !== 'intro') return
    investigateTimer.current = window.setTimeout(() => {
      investigateTimer.current = null
      setScreen('investigate')
    }, INVESTIGATE_AFTER_LINE2_EXIT_MS)
    return () => {
      if (investigateTimer.current) {
        window.clearTimeout(investigateTimer.current)
        investigateTimer.current = null
      }
    }
  }, [phase, screen])

  useEffect(() => {
    if (activeClueId === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveClueId(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeClueId])

  const activeClue = activeClueId
    ? LIGHT_HOTSPOTS.find((s) => s.id === activeClueId)
    : undefined

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        {screen === 'intro' ? (
          <motion.div
            key="intro"
            className="absolute inset-0"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/images/chapter4-room.png"
              alt="柯老雄房間"
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
            />

            <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
              <AnimatePresence mode="wait">
                {phase === 1 && (
                  <motion.p
                    key="line1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: LINE_FADE_S }}
                    className="max-w-[min(92vw,36rem)] px-6 text-center font-serif"
                    style={TEXT_STYLE}
                  >
                    進入柯老雄房間...
                  </motion.p>
                )}
                {phase === 2 && (
                  <motion.p
                    key="line2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: LINE_FADE_S }}
                    className="max-w-[min(92vw,36rem)] px-6 text-center font-serif leading-relaxed"
                    style={TEXT_STYLE}
                    onAnimationComplete={() => {
                      if (line2RevealScheduled.current) return
                      line2RevealScheduled.current = true
                      line2HoldTimer.current = window.setTimeout(() => {
                        line2HoldTimer.current = null
                        setPhase(3)
                      }, 3000)
                    }}
                  >
                    請你揭發柯老雄的秘密
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="investigate"
            role="presentation"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.55 }}
          >
            <Image
              src="/images/chapter4-room-clues.png"
              alt="房內搜查視角"
              fill
              className="object-cover object-center"
              sizes="100vw"
            />

            <p
              className="pointer-events-none absolute inset-x-0 top-[30px] z-20 px-6 pt-6 pb-10 text-center font-serif leading-snug tracking-wide"
              style={{
                fontSize: 24,
                color: '#FFD54F',
                textShadow: '0 1px 3px rgba(0,0,0,0.85)',
              }}
            >
              請點擊光點，將三項關鍵線索拖曳放入公事包
            </p>

            <div className="absolute inset-0 z-10">
              {LIGHT_HOTSPOTS.map((spot) => {
                const ox = 'offsetXPx' in spot ? spot.offsetXPx : 0
                const oy = 'offsetYPx' in spot ? spot.offsetYPx : 0
                return (
                  <div
                    key={spot.id}
                    className="absolute"
                    style={{
                      left: spot.left,
                      ...('bottom' in spot
                        ? { bottom: spot.bottom }
                        : { top: spot.top }),
                      transform: `translate(calc(-50% + ${ox}px), calc(-50% + ${oy}px))`,
                    }}
                  >
                    <motion.button
                      type="button"
                      aria-label="線索"
                      initial={{ scale: 0.85 }}
                      animate={{
                        opacity: [0.75, 1, 0.75],
                        scale: [0.92, 1.08, 0.92],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 2.4,
                        ease: 'easeInOut',
                      }}
                      className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border-2 border-yellow-300/90 bg-yellow-400/95 shadow-[0_0_12px_6px_rgba(255,214,94,0.55)] outline-none focus-visible:ring-2 focus-visible:ring-amber-200"
                      onClick={() =>
                        setActiveClueId((prev) =>
                          prev === spot.id ? null : spot.id,
                        )
                      }
                    />
                  </div>
                )
              })}
            </div>

            <AnimatePresence mode="wait">
              {activeClue && (
                <motion.div
                  key={activeClue.id}
                  role="presentation"
                  className="fixed inset-0 z-100 flex items-center justify-center bg-black/55 p-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setActiveClueId(null)}
                >
                  <motion.div
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="clue-modal-title"
                    className="relative max-h-[92vh] w-full max-w-lg overflow-auto rounded-xl bg-white p-6 shadow-2xl"
                    initial={{ scale: 0.96, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.96, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      className="absolute right-4 top-4 rounded-full p-1.5 text-stone-500 transition hover:bg-stone-100 hover:text-stone-800"
                      aria-label="關閉"
                      onClick={() => setActiveClueId(null)}
                    >
                      <X className="h-6 w-6" strokeWidth={2} />
                    </button>
                    {/* next/image skipped: varied intrinsic sizes */}
                    <img
                      src={activeClue.clueSrc}
                      alt=""
                      className="mx-auto block max-h-[min(62vh,calc(92vh-8rem))] w-auto max-w-full object-contain"
                    />
                    <p
                      id="clue-modal-title"
                      className="mt-[10px] text-center font-serif"
                      style={CLUE_CAPTION_STYLE}
                    >
                      {activeClue.clueTitle}
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
