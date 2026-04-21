import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const hasCompletedQuiz = !!localStorage.getItem('ecoself_scores')

  const alwaysLinks = [
    { label: '🇮🇪 Ireland Stats', path: '/ireland' },
    { label: '🌐 SDGs', path: '/sdgs' },
    { label: '📚 Resources', path: '/resources' },
  ]

  const quizLinks = [
    { label: '📊 My Score', path: '/results' },
    { label: '🤖 Recommendations', path: '/recommendations' },
    { label: '🎯 My Goals', path: '/goals' },
  ]

  function handleNav(path) {
    navigate(path)
    setMenuOpen(false)
  }

  return (
    <>
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleNav('/')}
        >
          <span className="text-2xl">🌱</span>
          <span className="font-display font-bold text-forest-700 text-xl">
            EcoSelf
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {alwaysLinks.map(link => (
            <button
              key={link.path}
              onClick={() => handleNav(link.path)}
              className={`text-sm px-3 py-2 rounded-xl transition-colors
                ${location.pathname === link.path
                  ? 'bg-forest-100 text-forest-700 font-semibold'
                  : 'text-gray-500 hover:text-forest-600 hover:bg-forest-50'
                }`}
            >
              {link.label}
            </button>
          ))}

          {hasCompletedQuiz && quizLinks.map(link => (
            <button
              key={link.path}
              onClick={() => handleNav(link.path)}
              className={`text-sm px-3 py-2 rounded-xl transition-colors
                ${location.pathname === link.path
                  ? 'bg-forest-100 text-forest-700 font-semibold'
                  : 'text-gray-500 hover:text-forest-600 hover:bg-forest-50'
                }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNav('/quiz')}
            className="hidden md:block btn-primary text-sm"
          >
            {hasCompletedQuiz ? 'Retake Quiz' : 'Start Quiz →'}
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-500 hover:text-gray-700 transition-colors"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-b border-gray-100 
              shadow-soft px-6 py-4 space-y-1"
          >
            {alwaysLinks.map(link => (
              <button
                key={link.path}
                onClick={() => handleNav(link.path)}
                className={`w-full text-left text-sm px-4 py-3 rounded-xl 
                  transition-colors
                  ${location.pathname === link.path
                    ? 'bg-forest-100 text-forest-700 font-semibold'
                    : 'text-gray-600 hover:bg-forest-50'
                  }`}
              >
                {link.label}
              </button>
            ))}

            {hasCompletedQuiz && (
              <>
                <div className="border-t border-gray-100 my-2" />
                <p className="text-xs text-gray-400 px-4 pb-1">Your Results</p>
                {quizLinks.map(link => (
                  <button
                    key={link.path}
                    onClick={() => handleNav(link.path)}
                    className={`w-full text-left text-sm px-4 py-3 rounded-xl 
                      transition-colors
                      ${location.pathname === link.path
                        ? 'bg-forest-100 text-forest-700 font-semibold'
                        : 'text-gray-600 hover:bg-forest-50'
                      }`}
                  >
                    {link.label}
                  </button>
                ))}
              </>
            )}

            <div className="border-t border-gray-100 pt-3">
              <button
                onClick={() => handleNav('/quiz')}
                className="btn-primary w-full py-3 text-sm"
              >
                {hasCompletedQuiz ? 'Retake Quiz' : 'Start Quiz →'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}