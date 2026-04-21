import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { questions, categoryIntros } from '../data/questions'

function shouldShowQuestion(question, answers) {
  if (!question.showIf) return true
  const { questionId, includesValue, excludesValues } = question.showIf
  const answer = answers[questionId]
  if (!answer) return false

  // excludesValues: show question unless answer matches one of these
  if (excludesValues) {
    const selected = answer.selected
    return !excludesValues.includes(selected)
  }

  // includesValue: show question only if answer includes this value
  if (Array.isArray(answer.selected)) {
    return answer.selected.includes(includesValue)
  }
  return answer.selected === includesValue
}

function getVisibleQuestions(answers) {
  return questions.filter(q => shouldShowQuestion(q, answers))
}

export default function Quiz() {
  const navigate = useNavigate()
  const [answers, setAnswers] = useState({})
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showCategoryIntro, setShowCategoryIntro] = useState(true)
  const [direction, setDirection] = useState(1)

  const visibleQuestions = getVisibleQuestions(answers)
  const currentQuestion = visibleQuestions[currentIndex]
  const currentAnswer = answers[currentQuestion?.id] || { selected: [], other: '' }
  const progress = ((currentIndex) / visibleQuestions.length) * 100

  // Check if current category is different from previous question
  const isNewCategory = currentIndex === 0 ||
    visibleQuestions[currentIndex - 1]?.category !== currentQuestion?.category

  useEffect(() => {
    if (isNewCategory) {
      setShowCategoryIntro(true)
    }
  }, [currentIndex])

  // Load saved answers
  useEffect(() => {
    const saved = localStorage.getItem('ecoself_answers')
    if (saved) {
      setAnswers(JSON.parse(saved))
    }
  }, [])

  // Save answers to localStorage
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      localStorage.setItem('ecoself_answers', JSON.stringify(answers))
    }
  }, [answers])

  function handleSingleSelect(value) {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: {
        ...currentAnswer,
        selected: value,
      }
    }))
  }

  function handleMultiSelect(value) {
    const current = Array.isArray(currentAnswer.selected) ? currentAnswer.selected : []
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value]
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: {
        ...currentAnswer,
        selected: updated,
      }
    }))
  }

  function handleOther(text) {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: {
        ...currentAnswer,
        other: text,
      }
    }))
  }

  function isSelected(value) {
    if (currentQuestion.type === 'single') {
      return currentAnswer.selected === value
    }
    return Array.isArray(currentAnswer.selected) &&
      currentAnswer.selected.includes(value)
  }
function canProceed() {
  if (currentQuestion.type === 'single') {
    return (
      currentAnswer.selected !== undefined &&
      currentAnswer.selected !== '' &&
      !Array.isArray(currentAnswer.selected)
    )
  }
  return Array.isArray(currentAnswer.selected) && currentAnswer.selected.length > 0
}

  function handleNext() {
    if (currentIndex < visibleQuestions.length - 1) {
      setDirection(1)
      setCurrentIndex(prev => prev + 1)
    } else {
      // Quiz complete — save and go to results
      localStorage.setItem('ecoself_answers', JSON.stringify(answers))
      navigate('/results')
    }
  }

  function handleBack() {
    if (showCategoryIntro && currentIndex > 0) {
      setShowCategoryIntro(false)
      return
    }
    if (currentIndex > 0) {
      setDirection(-1)
      setCurrentIndex(prev => prev - 1)
    } else {
      navigate('/')
    }
  }

  const categoryIntro = categoryIntros[currentQuestion?.category]

  // Category intro screen
  if (showCategoryIntro && isNewCategory) {
    return (
      <div className="min-h-screen bg-[#f8faf9] flex flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 max-w-2xl mx-auto w-full">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ArrowLeft size={18} />
            <span className="text-sm">Back</span>
          </button>
          <span className="text-sm text-gray-400">
            {currentIndex + 1} of {visibleQuestions.length}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-100 h-1.5">
          <motion.div
            className="bg-forest-500 h-1.5 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

        {/* Category intro */}
        <div className="flex-1 flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-md"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-7xl mb-6"
            >
              {categoryIntro?.emoji}
            </motion.div>
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-3">
              {categoryIntro?.title}
            </h2>
            <p className="text-gray-500 text-lg mb-10">
              {categoryIntro?.desc}
            </p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowCategoryIntro(false)}
              className="btn-primary text-lg px-10 py-4 inline-flex items-center gap-2"
            >
              Let's go
              <ArrowRight size={20} />
            </motion.button>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8faf9] flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 max-w-2xl mx-auto w-full">
  <button
    onClick={handleBack}
    className="flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors"
  >
    <ArrowLeft size={18} />
    <span className="text-sm">Back</span>
  </button>
  <div
    className="flex items-center gap-1.5 cursor-pointer"
    onClick={() => navigate('/')}
  >
    <span className="text-lg">🌱</span>
    <span className="font-display font-bold text-forest-700 text-sm">EcoSelf</span>
  </div>
  <span className="text-sm text-gray-400">
    {currentIndex + 1} / {visibleQuestions.length}
  </span>
</div>

      {/* Progress bar */}
      <div className="w-full bg-gray-100 h-1.5">
        <motion.div
          className="bg-forest-500 h-1.5 rounded-full"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion?.id}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-2xl"
          >
            {/* Question text */}
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-2">
                {currentQuestion?.question}
              </h2>
              <p className="text-gray-400 text-sm">
                {currentQuestion?.subtitle}
              </p>
            </div>

            {/* Options grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
              {currentQuestion?.options.map((option) => (
                <motion.button
                  key={option.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() =>
                    currentQuestion.type === 'single'
                      ? handleSingleSelect(option.value)
                      : handleMultiSelect(option.value)
                  }
                  className={`quiz-option relative ${isSelected(option.value) ? 'selected' : ''}`}
                >
                  {isSelected(option.value) && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2 right-2 bg-forest-500 text-white rounded-full p-0.5"
                    >
                      <Check size={10} />
                    </motion.div>
                  )}
                  <span className="text-3xl">{option.emoji}</span>
                  <span className="text-sm font-medium text-gray-700 leading-tight">
                    {option.label}
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Other text input */}
            {currentQuestion?.hasOther && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-6"
              >
                <input
                  type="text"
                  placeholder="✏️  Something else? Tell us here..."
                  value={currentAnswer.other || ''}
                  onChange={(e) => handleOther(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-100 
                    focus:border-forest-300 focus:outline-none text-sm text-gray-600
                    bg-white transition-colors"
                />
              </motion.div>
            )}

            {/* Milestone messages */}
            {currentIndex === Math.floor(visibleQuestions.length / 2) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-sm text-forest-600 font-medium mb-4"
              >
                🌿 Halfway there — you're doing great!
              </motion.div>
            )}

            {/* Next button */}
            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: canProceed() ? 1.03 : 1 }}
                whileTap={{ scale: canProceed() ? 0.97 : 1 }}
                onClick={handleNext}
                disabled={!canProceed()}
                className={`inline-flex items-center gap-2 px-10 py-4 rounded-2xl 
                  font-semibold text-lg transition-all duration-200
                  ${canProceed()
                    ? 'bg-forest-500 hover:bg-forest-600 text-white shadow-soft hover:shadow-glow'
                    : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                  }`}
              >
                {currentIndex === visibleQuestions.length - 1 ? 'See My EcoScore 🌱' : 'Next'}
                <ArrowRight size={20} />
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}