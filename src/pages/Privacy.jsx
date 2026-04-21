import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'

const sections = [
  {
    emoji: '💾',
    title: 'What is stored on your device',
    content: [
      'Your quiz answers (transport, diet, home, shopping, water habits)',
      'Your calculated EcoScore and category scores',
      'Any goals you save from your recommendations',
      'Your first name if you choose to enter it for the score card',
    ],
    note: 'All of this lives in your browser\'s localStorage. It never leaves your device unless you choose to share it.',
  },
  {
    emoji: '🤖',
    title: 'What is sent to our AI',
    content: [
      'A summary of your quiz answers (e.g. "drives a diesel car, eats meat daily")',
      'Your category scores (e.g. "Transport: 48/100")',
    ],
    note: 'No name, no location, no email, no identifying information is ever sent. The AI receives only a lifestyle summary — the same as you\'d tell a friend.',
  },
  {
    emoji: '🔒',
    title: 'What we never collect',
    content: [
      'We have no accounts, no sign up, no login',
      'We do not use cookies or tracking',
      'We do not use Google Analytics or any analytics',
      'We do not sell or share any data',
      'We have no database or server storing your information',
    ],
    note: null,
  },
  {
    emoji: '🌐',
    title: 'Third party services',
    content: [
      'Groq API — processes your anonymised lifestyle summary to generate recommendations. Groq\'s privacy policy applies to this interaction.',
      'Vercel — hosts this website. No user data is processed by Vercel beyond standard web hosting.',
    ],
    note: 'We chose Groq specifically because it does not use your data to train its models by default.',
  },
  {
    emoji: '🗑️',
    title: 'Deleting your data',
    content: [
      'Open your browser DevTools (F12)',
      'Go to Application → Local Storage',
      'Delete all ecoself_ keys',
      'Or simply clear your browser data',
    ],
    note: 'Since everything is on your device, you have full control at all times.',
  },
]

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#f8faf9]">
      <Navbar />

      <div className="max-w-2xl mx-auto px-6 pb-20">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-10"
        >
          <div className="text-4xl mb-3">🔒</div>
          <h1 className="section-title mb-2">Privacy Policy</h1>
          <p className="section-sub text-base">
            Simple, honest and jargon-free
          </p>
        </motion.div>

        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card mb-6 bg-forest-50 border border-forest-100"
        >
          <p className="text-forest-800 text-sm leading-relaxed">
            EcoSelf was built with privacy as a core principle, not an afterthought.
            We believe you should be able to learn about your environmental impact
            without handing over your personal data. Here is exactly how it works.
          </p>
        </motion.div>

        {/* Sections */}
        {sections.map((section, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.1 }}
            className="card mb-4"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{section.emoji}</span>
              <h2 className="font-display font-bold text-gray-900">
                {section.title}
              </h2>
            </div>
            <ul className="space-y-2 mb-3">
              {section.content.map((item, ii) => (
                <li key={ii} className="flex items-start gap-2">
                  <span className="text-forest-400 mt-0.5 shrink-0">•</span>
                  <span className="text-sm text-gray-600 leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            {section.note && (
              <div className="bg-gray-50 rounded-xl p-3 mt-3">
                <p className="text-xs text-gray-500 leading-relaxed">
                  💡 {section.note}
                </p>
              </div>
            )}
          </motion.div>
        ))}

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center text-sm text-gray-400 mt-8"
        >
          <p>Questions about privacy? This app is open source.</p>
          <p className="mt-1">You can inspect every line of code yourself.</p>
        </motion.div>

      </div>
    </div>
  )
}