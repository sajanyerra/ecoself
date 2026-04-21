import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Target, CheckCircle } from 'lucide-react'
import { calculateScores } from '../utils/scoring'
import Navbar from '../components/Navbar'

const sdgInfo = {
  2:  { label: 'Zero Hunger', emoji: '🌾' },
  3:  { label: 'Good Health', emoji: '❤️' },
  7:  { label: 'Clean Energy', emoji: '⚡' },
  11: { label: 'Sustainable Cities', emoji: '🏙️' },
  12: { label: 'Responsible Consumption', emoji: '♻️' },
  13: { label: 'Climate Action', emoji: '🌍' },
  14: { label: 'Life Below Water', emoji: '🌊' },
  15: { label: 'Life on Land', emoji: '🌿' },
}

const difficultyStyles = {
  Easy: 'bg-forest-100 text-forest-700',
  Medium: 'bg-sun-300 text-yellow-800',
  'Big change': 'bg-orange-100 text-orange-700',
}

function buildPrompt(answers, scores) {
  const transport = answers.T1?.selected || []
  const routine = answers.T0?.selected || 'unknown'
  const diet = answers.D1?.selected || 'unknown'
  const heating = answers.H1?.selected || []
  const electricity = answers.H3?.selected || 'unknown'
  const shortFlights = answers.T3a?.selected || 'none'
  const longFlights = answers.T3b?.selected || 'none'
  const shopping = answers.S1?.selected || 'unknown'
  const secondhand = answers.S2?.selected || 'unknown'
  const shower = answers.W1?.selected || 'unknown'
  const recycling = answers.W3?.selected || 'unknown'
  const insulation = answers.H2?.selected || 'unknown'
  const appliances = answers.H5?.selected || []

  return `You are an expert sustainability advisor for people living in Ireland.

A user has completed a sustainability quiz. Here is their lifestyle profile:

- Daily routine: ${routine}
- Transport methods: ${transport.join(', ') || 'not specified'}
- Short-haul flights per year: ${shortFlights}
- Long-haul flights per year: ${longFlights}
- Diet: ${diet}
- Home heating: ${heating.join(', ') || 'not specified'}
- Electricity: ${electricity}
- Home insulation: ${insulation}
- Home appliances: ${appliances.join(', ') || 'none specified'}
- New clothes shopping: ${shopping}
- Secondhand shopping: ${secondhand}
- Shower duration: ${shower}
- Recycling habits: ${recycling}

Their EcoScores are:
- Overall: ${scores.overall}/100
- Transport: ${scores.categories.transport}/100
- Diet: ${scores.categories.diet}/100
- Home Energy: ${scores.categories.home}/100
- Shopping: ${scores.categories.shopping}/100
- Water & Waste: ${scores.categories.water}/100

Please provide exactly 5 personalised sustainability recommendations for this person living in Ireland.

For each recommendation, respond in this exact JSON format:
{
  "recommendations": [
    {
      "title": "Short action title",
      "why": "One sentence explaining the environmental impact",
      "action": "One specific, practical action they can take today",
      "irishResource": "A specific Irish resource, grant, scheme or website that can help",
"irishResourceUrl": "The direct URL to that Irish resource e.g. https://www.seai.ie",
      "sdgs": [13, 12],
      "difficulty": "Easy"
    }
  ]
}

Rules:
- difficulty must be exactly one of: Easy, Medium, Big change
- sdgs must be numbers from this list only: 2, 3, 7, 11, 12, 13, 14, 15
- Focus on the lowest scoring categories first
- Keep language friendly, encouraging and non-judgmental
- Irish resources must be real and specific
- Irish resource URLs must be real working URLs
- Return only valid JSON, no extra text`
}

export default function Recommendations() {
  const navigate = useNavigate()
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [savedGoals, setSavedGoals] = useState([])
  const [scores, setScores] = useState(null)

  useEffect(() => {
    const savedGoalsData = localStorage.getItem('ecoself_goals')
    if (savedGoalsData) setSavedGoals(JSON.parse(savedGoalsData))

    const answers = localStorage.getItem('ecoself_answers')
    const scoresData = localStorage.getItem('ecoself_scores')

    if (!answers) {
      navigate('/')
      return
    }

    const parsedAnswers = JSON.parse(answers)
    const parsedScores = scoresData
      ? JSON.parse(scoresData)
      : calculateScores(parsedAnswers)

    setScores(parsedScores)
    fetchRecommendations(parsedAnswers, parsedScores)
  }, [])

  async function fetchRecommendations(answers, scores) {
    try {
      setLoading(true)
      setError(null)

      const apiKey = import.meta.env.VITE_GROQ_API_KEY
      const prompt = buildPrompt(answers, scores)

      const response = await fetch(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [
              {
                role: 'user',
                content: prompt
              }
            ],
            temperature: 0.7,
            max_tokens: 2048,
          })
        }
      )

      if (!response.ok) {
        const errData = await response.json()
        console.error('Groq error:', errData)
        throw new Error('API request failed')
      }

      const data = await response.json()
      const text = data.choices[0].message.content

      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (!jsonMatch) throw new Error('Invalid response format')

      const parsed = JSON.parse(jsonMatch[0])
      setRecommendations(parsed.recommendations || [])

    } catch (err) {
      console.error('Full error:', err)
      setError('Something went wrong fetching your recommendations. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function toggleGoal(rec) {
    const exists = savedGoals.find(g => g.title === rec.title)
    let updated
    if (exists) {
      updated = savedGoals.filter(g => g.title !== rec.title)
    } else {
      updated = [...savedGoals, {
        title: rec.title,
        difficulty: rec.difficulty,
        saved: new Date().toISOString(),
        completed: false,
      }]
    }
    setSavedGoals(updated)
    localStorage.setItem('ecoself_goals', JSON.stringify(updated))
  }

  function isGoalSaved(title) {
    return savedGoals.some(g => g.title === title)
  }

  return (
    <div className="min-h-screen bg-[#f8faf9]">
      {/* Navbar */}
      <Navbar />

      <div className="max-w-2xl mx-auto px-6 pb-20">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-10"
        >
          <div className="text-4xl mb-3">🤖</div>
          <h1 className="section-title mb-2">Your AI Recommendations</h1>
          <p className="section-sub text-base">
            Personalised for your lifestyle and tailored to life in Ireland
          </p>
        </motion.div>

        {/* Loading state */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="text-5xl mb-6 inline-block"
            >
              🌍
            </motion.div>
            <p className="text-gray-500 font-medium">
              Analysing your lifestyle...
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Finding the best tips for you in Ireland
            </p>
          </motion.div>
        )}

        {/* Error state */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card text-center py-10"
          >
            <div className="text-4xl mb-4">😕</div>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => {
                const answers = JSON.parse(localStorage.getItem('ecoself_answers'))
                fetchRecommendations(answers, scores)
              }}
              className="btn-primary"
            >
              Try Again
            </button>
          </motion.div>
        )}

        {/* Recommendations */}
        {!loading && !error && (
          <AnimatePresence>
            <div className="space-y-6">
              {recommendations.map((rec, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className="card"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <span className="text-xl font-display font-bold text-gray-900">
                      {i + 1}. {rec.title}
                    </span>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full shrink-0 ${difficultyStyles[rec.difficulty] || difficultyStyles['Easy']}`}>
                      {rec.difficulty}
                    </span>
                  </div>

                  {/* Why */}
                  <p className="text-gray-500 text-sm mb-3 leading-relaxed">
                    {rec.why}
                  </p>

                  {/* Action */}
                  <div className="bg-forest-50 border border-forest-100 rounded-2xl p-3 mb-3">
                    <p className="text-forest-800 text-sm font-medium">
                      ✅ {rec.action}
                    </p>
                  </div>

                  {rec.irishResource && (
  <div className="flex items-start gap-2 mb-4">
    <span className="text-lg">🇮🇪</span>
    <div>
      <p className="text-gray-500 text-sm leading-relaxed">
        {rec.irishResource}
      </p>
      {rec.irishResourceUrl && (
        <a
          href={rec.irishResourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-forest-600 
            hover:text-forest-700 text-xs font-semibold mt-1 
            hover:underline transition-colors"
        >
          Visit Resource →
        </a>
      )}
    </div>
  </div>
)}

                  {/* SDGs */}
                  {rec.sdgs && rec.sdgs.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {rec.sdgs.map(sdg => {
                        const info = sdgInfo[sdg]
                        if (!info) return null
                        return (
                          <span
                            key={sdg}
                            className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                          >
                            {info.emoji} SDG {sdg}: {info.label}
                          </span>
                        )
                      })}
                    </div>
                  )}

                  {/* Save as goal button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleGoal(rec)}
                    className={`w-full py-2.5 rounded-2xl text-sm font-semibold 
                      transition-all duration-200 flex items-center justify-center gap-2
                      ${isGoalSaved(rec.title)
                        ? 'bg-forest-500 text-white'
                        : 'bg-gray-100 hover:bg-forest-50 text-gray-600 hover:text-forest-700'
                      }`}
                  >
                    {isGoalSaved(rec.title) ? (
                      <>
                        <CheckCircle size={16} />
                        Saved as Goal!
                      </>
                    ) : (
                      <>
                        <Target size={16} />
                        Save as Goal
                      </>
                    )}
                  </motion.button>
                </motion.div>
              ))}

              {/* Navigation */}
              {recommendations.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="flex flex-col gap-3 pt-4"
                >
                  <button
                    onClick={() => navigate('/goals')}
                    className="btn-primary w-full py-4 text-lg flex items-center justify-center gap-2"
                  >
                    <Target size={20} />
                    View My Goals
                  </button>
                  <button
                    onClick={() => navigate('/ireland')}
                    className="btn-secondary w-full py-4 text-lg flex items-center justify-center gap-2"
                  >
                    🇮🇪 Explore Ireland's Sustainability Stats
                  </button>
                </motion.div>
              )}
            </div>
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}