import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle, Circle, Target, Sparkles } from 'lucide-react'
import Navbar from '../components/Navbar'

const difficultyStyles = {
  Easy: 'bg-forest-100 text-forest-700',
  Medium: 'bg-sun-300 text-yellow-800',
  'Big change': 'bg-orange-100 text-orange-700',
}

const emptyStateMessages = [
  "No goals yet! Head to your recommendations and save some. 🌱",
  "Your goals will appear here once you save them from recommendations.",
]

export default function Goals() {
  const navigate = useNavigate()
  const [goals, setGoals] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem('ecoself_goals')
    if (saved) setGoals(JSON.parse(saved))
  }, [])

  function toggleComplete(index) {
    const updated = goals.map((goal, i) =>
      i === index ? { ...goal, completed: !goal.completed } : goal
    )
    setGoals(updated)
    localStorage.setItem('ecoself_goals', JSON.stringify(updated))
  }

  function removeGoal(index) {
    const updated = goals.filter((_, i) => i !== index)
    setGoals(updated)
    localStorage.setItem('ecoself_goals', JSON.stringify(updated))
  }

  const completed = goals.filter(g => g.completed).length
  const total = goals.length
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0

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
          <div className="text-4xl mb-3">🎯</div>
          <h1 className="section-title mb-2">My Eco Goals</h1>
          <p className="section-sub text-base">
            Small steps lead to big change
          </p>
        </motion.div>

        {/* Progress Overview */}
        {total > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card mb-6"
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-display font-bold text-gray-900">
                  Your Progress
                </h3>
                <p className="text-sm text-gray-400 mt-0.5">
                  {completed} of {total} goals completed
                </p>
              </div>
              <div className="text-3xl font-display font-extrabold text-forest-500">
                {progress}%
              </div>
            </div>

            {/* Progress bar */}
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-3 bg-forest-400 rounded-full"
              />
            </div>

            {/* Milestone message */}
            {progress === 100 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-3 text-center text-forest-600 
                  font-semibold text-sm"
              >
                🏆 Amazing! You've completed all your goals!
              </motion.div>
            )}
            {progress >= 50 && progress < 100 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-3 text-center text-forest-500 
                  font-medium text-sm"
              >
                🌿 Halfway there — keep going!
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Empty State */}
        {total === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card text-center py-16"
          >
            <div className="text-5xl mb-4">🌱</div>
            <h3 className="font-display font-bold text-gray-700 mb-2">
              No goals yet!
            </h3>
            <p className="text-gray-400 text-sm mb-6 max-w-xs mx-auto">
              Head to your AI recommendations and tap
              "Save as Goal" on the ones you want to work on.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/recommendations')}
              className="btn-primary inline-flex items-center gap-2"
            >
              <Sparkles size={16} />
              Get Recommendations
            </motion.button>
          </motion.div>
        )}

        {/* Goals List */}
        <AnimatePresence>
          <div className="space-y-4">
            {goals.map((goal, i) => (
              <motion.div
                key={goal.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: i * 0.1 }}
                className={`card transition-all duration-300 ${
                  goal.completed ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Checkbox */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleComplete(i)}
                    className="mt-0.5 shrink-0"
                  >
                    {goal.completed ? (
                      <CheckCircle
                        size={24}
                        className="text-forest-500"
                      />
                    ) : (
                      <Circle
                        size={24}
                        className="text-gray-300 hover:text-forest-400 
                          transition-colors"
                      />
                    )}
                  </motion.button>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className={`font-display font-bold text-gray-900 
                        ${goal.completed ? 'line-through text-gray-400' : ''}`}
                      >
                        {goal.title}
                      </h3>
                      <span className={`text-xs font-semibold px-2 py-1 
                        rounded-full shrink-0 
                        ${difficultyStyles[goal.difficulty] || 
                          difficultyStyles['Easy']}`}
                      >
                        {goal.difficulty}
                      </span>
                    </div>

                    <p className="text-xs text-gray-400 mt-1">
                      Saved {new Date(goal.saved).toLocaleDateString('en-IE', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </p>

                    {/* Remove button */}
                    <button
                      onClick={() => removeGoal(i)}
                      className="text-xs text-red-300 hover:text-red-400 
                        transition-colors mt-2"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>

        {/* Bottom Actions */}
        {total > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col gap-3 mt-8"
          >
            <button
              onClick={() => navigate('/recommendations')}
              className="btn-secondary w-full py-4 flex 
                items-center justify-center gap-2"
            >
              <Target size={18} />
              Add More Goals
            </button>
            <button
              onClick={() => navigate('/ireland')}
              className="btn-secondary w-full py-4 flex 
                items-center justify-center gap-2"
            >
              🇮🇪 Explore Ireland's Sustainability Stats
            </button>
          </motion.div>
        )}

      </div>
    </div>
  )
}