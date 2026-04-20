'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Droplets, ZoomIn, X } from 'lucide-react'

// 定義酒杯資料結構
const INITIAL_CUPS = [
  { id: 1, hasLipstick: true, content: '紹興酒', description: '杯緣留有鮮紅且凌亂的口紅印。' },
  { id: 2, hasLipstick: false, content: '紹興酒', description: '杯緣乾淨，只有一些指紋。' },
  { id: 3, hasLipstick: true, content: '紹興酒', description: '口紅印已經暈開，顯示飲用者情緒不穩。' },
  { id: 4, hasLipstick: true, content: '紹興酒', description: '杯口殘留著淡淡的血絲與紅印。' },
  { id: 5, hasLipstick: true, content: '紹興酒', description: '杯身濕漉漉的，口紅印清晰可見。' },
  { id: 6, hasLipstick: false, content: '紹興酒', description: '完全乾淨的杯子，應該是施暴者喝的。' },
  { id: 7, hasLipstick: true, content: '紹興酒', description: '最後一杯酒，印記顯得支離破碎。' },
  { id: 8, hasLipstick: true, content: '紹興酒', description: '這杯酒似乎混雜了淚水。' },
]

export default function Chapter2() {
  const [selectedCup, setSelectedCup] = useState<any>(null)
  const [showLogicBoard, setShowLogicBoard] = useState(false)
  const [answer, setAnswer] = useState<string>('')
  const [isSolved, setIsSolved] = useState(false)

  const checkAnswer = () => {
    if (answer === '6') {
      setIsSolved(true)
      alert("「六杯...她竟然被灌了六杯烈酒。」雲芳的手顫抖著。")
    } else {
      alert("不對，口紅印的數量對不上。再仔細觀察。")
    }
  }

  return (
    <div className="relative h-screen w-screen bg-[#0a0a0a] overflow-hidden">
      {/* 背景圖：洗手間場景 */}
      <div 
        className="absolute inset-0 bg-[url('/images/ch2_washroom_bg.jpg')] bg-cover bg-center opacity-60 grayscale-[0.3]"
        style={{ filter: 'contrast(1.2) brightness(0.8)' }}
      />

      {/* 1960s 粒子/雜訊特效 (Overlay) */}
      <div className="absolute inset-0 bg-red-900/5 pointer-events-none" />

      {/* 頂部標題 */}
      <div className="absolute top-8 left-8">
        <h2 className="text-xl tracking-[0.3em] font-serif text-slate-400 border-b border-slate-700 pb-2">
          CHAPTER 02: 洗手間的倒影
        </h2>
      </div>

      {/* 核心物件：洗手台區域 */}
      <div className="absolute left-[15%] top-[45%] flex flex-wrap gap-4 w-[400px]">
        {INITIAL_CUPS.map((cup) => (
          <motion.div
            key={cup.id}
            whileHover={{ scale: 1.1, y: -5 }}
            onClick={() => setSelectedCup(cup)}
            className="w-16 h-20 bg-white/10 border border-white/20 cursor-zoom-in flex flex-col items-center justify-end pb-2 rounded-t-sm"
          >
            {cup.hasLipstick && <div className="w-6 h-1 bg-red-600/60 rounded-full mb-12 blur-[1px]" />}
            <span className="text-[10px] text-white/40">Cup {cup.id}</span>
          </motion.div>
        ))}
      </div>

      {/* 倒在地上的娟娟 (互動點) */}
      <motion.div 
        initial={{ opacity: 0.5 }}
        whileHover={{ opacity: 1 }}
        className="absolute right-[20%] bottom-[10%] w-[40%] h-[30%] cursor-help"
        onClick={() => alert("娟娟蜷縮在濕冷的地板上，長髮散亂，口中喃喃自語。")}
      />

      {/* 放大觀察視窗 (AnimatePresence) */}
      <AnimatePresence>
        {selectedCup && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black/90 flex items-center justify-center p-20"
          >
            <div className="relative max-w-2xl w-full text-center">
              <button onClick={() => setSelectedCup(null)} className="absolute -top-10 right-0 text-white hover:text-red-500">
                <X size={32} />
              </button>
              <div className="text-6xl mb-8">🍷</div>
              <h3 className="text-3xl font-serif mb-4 text-red-100">酒杯線索</h3>
              <p className="text-xl text-slate-300 leading-loose tracking-widest italic">
                「{selectedCup.description}」
              </p>
              <div className="mt-8 text-sm text-slate-500 uppercase tracking-widest">
                殘留物：{selectedCup.content}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 推理面板 (Logic Board) */}
      <div className="fixed bottom-10 right-10">
        {!isSolved ? (
          <div className="bg-black/80 border border-red-900/50 p-6 backdrop-blur-md">
            <p className="text-sm text-red-200 mb-4 tracking-tighter">【 推理任務：計算娟娟飲下的酒量 】</p>
            <div className="flex items-center gap-4">
              <span className="text-lg">娟娟一共喝了</span>
              <input 
                type="number" 
                className="w-16 bg-transparent border-b-2 border-red-700 text-center text-2xl focus:outline-none"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
              <span className="text-lg">杯</span>
              <button 
                onClick={checkAnswer}
                className="ml-4 px-4 py-2 bg-red-900/40 hover:bg-red-900/80 border border-red-600 text-xs transition-all"
              >
                確認結論
              </button>
            </div>
          </div>
        ) : (
          <motion.div initial={{ y: 20 }} animate={{ y: 0 }} className="bg-green-900/20 border border-green-500/50 p-6">
            <p className="text-green-400 font-serif">真相：柯老雄在三一三號房強迫娟娟飲下六杯紹興酒。</p>
            <button className="mt-4 text-xs underline hover:text-white">前往金華街公寓 →</button>
          </motion.div>
        )}
      </div>

      {/* 背景環境音效提示 (實作時可加入 Audio tag) */}
      <div className="absolute bottom-4 left-4 flex items-center gap-2 text-slate-500">
        <Droplets size={14} />
        <span className="text-[10px] tracking-widest uppercase">環境音：水滴聲、悶熱的蟬鳴</span>
      </div>
    </div>
  )
}