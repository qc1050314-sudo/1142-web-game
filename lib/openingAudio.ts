// Module-level singleton — survives client-side navigation between pages.
let audio: HTMLAudioElement | null = null

function getInstance(): HTMLAudioElement | null {
  if (typeof window === 'undefined') return null
  if (!audio) {
    audio = new Audio('/audio/opening_music.mp3')
    audio.loop = true
    audio.volume = 1
  }
  return audio
}

export function startOpeningMusic() {
  const a = getInstance()
  if (!a) return
  a.currentTime = 0
  a.volume = 1
  a.play().catch(() => {})
}

export function fadeOutOpeningMusic(durationMs = 1500) {
  const a = getInstance()
  if (!a || a.paused) return
  const steps = 30
  const interval = durationMs / steps
  const decrement = a.volume / steps
  const timer = setInterval(() => {
    if (!a) { clearInterval(timer); return }
    if (a.volume > decrement) {
      a.volume = Math.max(0, a.volume - decrement)
    } else {
      a.pause()
      a.volume = 1
      clearInterval(timer)
    }
  }, interval)
}
