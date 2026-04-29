'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const TEXT_STYLE = { fontSize: 24, color: '#5E0006' } as const
const LINE_FADE_S = 0.4

export default function Chapter4Page() {
  const [phase, setPhase] = useState<0 | 1 | 2 | 3>(0)
  const line2HoldTimer = useRef<number | null>(null)
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
    }
  }, [])

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
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
              請你點選場景中的家具找尋柯老雄的秘密
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
