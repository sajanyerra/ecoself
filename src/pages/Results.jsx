import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, RefreshCw, Share2 } from 'lucide-react'
import { calculateScores, getScoreLabel, categoryMeta, irelandAverages } from '../utils/scoring'
import Navbar from '../components/Navbar'
import html2canvas from 'html2canvas'

function AnimatedNumber({ target, duration = 2000 }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCurrent(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration])

  return <span>{current}</span>
}

function ScoreRing({ score }) {
  const radius = 80
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="200" height="200" className="-rotate-90">
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="#dcf5e7"
          strokeWidth="12"
        />
        <motion.circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="#2d9e6b"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 2, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute text-center">
        <div className="text-5xl font-display font-extrabold text-forest-600">
          <AnimatedNumber target={score} />
        </div>
        <div className="text-sm text-gray-400 font-medium">out of 100</div>
      </div>
    </div>
  )
}

export default function Results() {
  const navigate = useNavigate()
  const [scores, setScores] = useState(null)
  const [copied, setCopied] = useState(false)
  const [userName, setUserName] = useState('')
const [showNameInput, setShowNameInput] = useState(false)
  const shareCardRef = useRef(null)

  useEffect(() => {
    const saved = localStorage.getItem('ecoself_answers')
    if (!saved) {
      navigate('/')
      return
    }
    const answers = JSON.parse(saved)
    const calculated = calculateScores(answers)
    setScores(calculated)
    localStorage.setItem('ecoself_scores', JSON.stringify(calculated))

    const savedName = localStorage.getItem('ecoself_name')
    if (savedName) setUserName(savedName)
  }, [])

  function handleShare() {
    const text = `🌱 I just got my EcoScore on EcoSelf: ${scores.overall}/100 — ${getScoreLabel(scores.overall).label}! How sustainable is your life? Find out here → https://ecoself.vercel.app`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  async function handleDownload() {
    if (!shareCardRef.current) return
    const canvas = await html2canvas(shareCardRef.current, {
      scale: 2,
      backgroundColor: null,
    })
    const link = document.createElement('a')
    link.download = 'my-ecoself-score.png'
    link.href = canvas.toDataURL()
    link.click()
  }

  function handleRetake() {
    localStorage.removeItem('ecoself_answers')
    localStorage.removeItem('ecoself_scores')
    navigate('/quiz')
  }

  if (!scores) return null

  const scoreLabel = getScoreLabel(scores.overall)

  return (
    <div className="min-h-screen bg-[#f8faf9]">
      <Navbar />

      <div className="max-w-2xl mx-auto px-6 pb-20">

        {/* Score reveal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center py-10"
        >
          <p className="text-gray-400 font-medium mb-6">Your EcoScore</p>
          <ScoreRing score={scores.overall} />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <div className="text-3xl mt-4">{scoreLabel.emoji}</div>
            <h2 className={`text-2xl font-display font-bold mt-1 ${scoreLabel.color}`}>
              {scoreLabel.label}
            </h2>
            <p className="text-gray-400 mt-2 text-sm">
              Ireland average: <span className="font-semibold text-gray-600">
                {irelandAverages.overall}/100
              </span>
            </p>
          </motion.div>
        </motion.div>

        {/* Category breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card mb-6"
        >
          <h3 className="font-display font-bold text-gray-900 mb-5 text-lg">
            Category Breakdown
          </h3>
          <div className="space-y-4">
            {Object.entries(scores.categories).map(([key, value], i) => {
              const meta = categoryMeta[key]
              const avg = irelandAverages[key]
              const isAboveAvg = value >= avg

              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-gray-700">
                      {meta.emoji} {meta.label}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">
                        IE avg: {avg}
                      </span>
                      <span className={`text-sm font-bold ${
                        isAboveAvg ? 'text-forest-600' : 'text-orange-400'
                      }`}>
                        {value}/100
                      </span>
                    </div>
                  </div>
                  <div className="relative h-2.5 bg-gray-100 rounded-full">
                    <div
                      className="absolute top-0 w-0.5 h-2.5 bg-gray-300 rounded-full z-10"
                      style={{ left: `${avg}%` }}
                    />
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${value}%` }}
                      transition={{ duration: 1, delay: 0.6 + i * 0.1 }}
                      className={`h-2.5 rounded-full ${
                        isAboveAvg ? 'bg-forest-400' : 'bg-orange-300'
                      }`}
                    />
                  </div>
                  <div className="flex justify-end mt-0.5">
                    <span className={`text-xs font-medium ${
                      isAboveAvg ? 'text-forest-500' : 'text-orange-400'
                    }`}>
                      {isAboveAvg
                        ? `+${value - avg} above average`
                        : `${value - avg} below average`}
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* What this means */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="card mb-6 bg-forest-50 border border-forest-100"
        >
          <div className="text-2xl mb-2">{scoreLabel.emoji}</div>
          <h3 className="font-display font-bold text-forest-800 mb-2">
            What does {scoreLabel.label} mean?
          </h3>
          <p className="text-forest-700 text-sm leading-relaxed">
            {scores.overall >= 85 && "You're living exceptionally sustainably — well above the Irish average. You're proof that eco-friendly living is achievable and rewarding!"}
            {scores.overall >= 70 && scores.overall < 85 && "You're making great choices and living more sustainably than most people in Ireland. A few more tweaks and you could be an Eco Champion!"}
            {scores.overall >= 55 && scores.overall < 70 && "You're aware of your impact and making conscious choices. You're on the right path — small changes now can make a big difference!"}
            {scores.overall >= 40 && scores.overall < 55 && "You're starting to think about sustainability which is great! There are some easy wins available to boost your score significantly."}
            {scores.overall < 40 && "Everyone starts somewhere! The fact you took this quiz means you care. Your AI recommendations will show you simple, affordable steps to improve."}
          </p>
        </motion.div>

        {/* Shareable Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mb-6"
        >
          <div
            ref={shareCardRef}
            className="bg-gradient-to-br from-forest-600 to-forest-800
              rounded-3xl p-8 text-white text-center"
          >
            <div className="text-3xl mb-2">🌱</div>
            <p className="text-forest-200 text-sm font-medium mb-1">EcoSelf</p>
{userName && (
  <p className="text-white font-display font-bold text-lg mb-1">
    {userName}'s EcoScore
  </p>
)}
            <div className="text-7xl font-display font-extrabold mb-1">
              {scores.overall}
            </div>
            <div className="text-forest-200 text-sm mb-2">out of 100</div>
            <div className="text-2xl mb-1">{scoreLabel.emoji}</div>
            <div className="text-xl font-display font-bold mb-6">
              {scoreLabel.label}
            </div>
            <div className="space-y-2 mb-6">
              {Object.entries(scores.categories).map(([key, value]) => {
                const meta = categoryMeta[key]
                return (
                  <div key={key} className="flex items-center gap-3">
                    <span className="text-xs text-forest-200 w-24 text-left">
                      {meta.emoji} {meta.label}
                    </span>
                    <div className="flex-1 bg-forest-700 rounded-full h-1.5">
                      <div
                        className="bg-sun-400 h-1.5 rounded-full"
                        style={{ width: `${value}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold text-sun-400 w-6">
                      {value}
                    </span>
                  </div>
                )
              })}
            </div>
            <p className="text-forest-200 text-xs">
  ecoself.vercel.app · How sustainable is your life?
</p>
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col gap-3"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/recommendations')}
            className="btn-primary w-full py-4 text-lg flex items-center justify-center gap-2"
          >
            Get My AI Recommendations
            <ArrowRight size={20} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleShare}
            className="btn-secondary w-full py-4 text-lg flex items-center justify-center gap-2"
          >
            <Share2 size={18} />
            {copied ? '✅ Copied to clipboard!' : 'Copy Share Text'}
          </motion.button>

          {showNameInput ? (
  <div className="flex gap-2">
    <input
      type="text"
      placeholder="Your first name..."
      value={userName}
      onChange={(e) => setUserName(e.target.value)}
      className="flex-1 px-4 py-3 rounded-2xl border-2 border-forest-200 
        focus:border-forest-400 focus:outline-none text-sm"
    />
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => {
        localStorage.setItem('ecoself_name', userName)
        handleDownload()
        setShowNameInput(false)
      }}
      className="btn-primary px-6"
    >
      Download
    </motion.button>
  </div>
) : (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={() => {
      const saved = localStorage.getItem('ecoself_name')
      if (saved) {
        setUserName(saved)
        handleDownload()
      } else {
        setShowNameInput(true)
      }
    }}
    className="btn-secondary w-full py-4 text-lg flex items-center justify-center gap-2"
  >
    ⬇️ Download Score Card
  </motion.button>
)}
        </motion.div>

      </div>
    </div>
  )
}