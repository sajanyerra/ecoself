import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Leaf, Shield, Target, TrendingUp, Clock, ChevronRight } from 'lucide-react'
import Navbar from '../components/Navbar'

const features = [
  {
    icon: '🌍',
    title: 'Your EcoScore',
    desc: 'Get a personalised sustainability score based on your real lifestyle habits.'
  },
  {
    icon: '🤖',
    title: 'AI Recommendations',
    desc: 'Receive smart, Ireland-specific suggestions to reduce your environmental impact.'
  },
  {
    icon: '🎯',
    title: 'Goal Tracking',
    desc: 'Set meaningful goals and track your progress week by week.'
  },
  {
    icon: '🇮🇪',
    title: 'Ireland Insights',
    desc: 'See how Ireland is doing on sustainability and where you fit in.'
  },
  {
    icon: '🌐',
    title: 'SDG Explorer',
    desc: 'Discover how your habits connect to the UN Sustainable Development Goals.'
  },
  {
    icon: '📚',
    title: 'Resources Library',
    desc: 'Curated Irish grants, schemes and tools to help you live greener.'
  },
]

const stats = [
  { value: '3 min', label: 'to complete' },
  { value: '~20', label: 'smart questions' },
  { value: '100%', label: 'private' },
]

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#f8faf9]">

      {/* Navbar */}
      <Navbar />

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block bg-forest-100 text-forest-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            🇮🇪 Built for Ireland · Free · Private
          </span>

          <h1 className="text-5xl md:text-6xl font-display font-extrabold text-gray-900 leading-tight mb-6">
            How sustainable
            <span className="text-forest-500"> is your life</span>
            <br />really?
          </h1>

          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Answer a few quick questions about your lifestyle and get a personalised EcoScore, 
            AI-powered recommendations and actionable steps — all tailored to life in Ireland.
          </p>

          {/* Stats row */}
          <div className="flex items-center justify-center gap-8 mb-10">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-display font-bold text-forest-600">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/quiz')}
            className="btn-primary text-lg px-10 py-4 inline-flex items-center gap-2"
          >
            Discover Your EcoScore
            <ChevronRight size={20} />
          </motion.button>

          <p className="text-sm text-gray-400 mt-4 flex items-center justify-center gap-1">
            <Shield size={14} />
            Your answers never leave your device
          </p>
        </motion.div>

        {/* Hero visual */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 relative"
        >
          <div className="bg-white rounded-3xl shadow-card p-8 max-w-sm mx-auto border border-forest-100">
            <div className="text-sm text-gray-400 mb-2 font-medium">Your EcoScore</div>
            <div className="text-7xl font-display font-extrabold text-forest-500 mb-1">74</div>
            <div className="text-forest-600 font-semibold mb-4">🌿 Green Explorer</div>
            <div className="space-y-2">
              {[
                { label: '🚗 Transport', score: 80 },
                { label: '🥗 Diet', score: 65 },
                { label: '🏠 Home Energy', score: 70 },
                { label: '🛍️ Shopping', score: 75 },
                { label: '💧 Water & Waste', score: 85 },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-xs text-gray-500 w-28 text-left">{item.label}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.score}%` }}
                      transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                      className="bg-forest-400 h-2 rounded-full"
                    />
                  </div>
                  <span className="text-xs font-semibold text-forest-600 w-6">{item.score}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Floating badges */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute -top-4 -right-4 md:right-16 bg-sun-400 text-gray-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-soft"
          >
            🎯 3 goals set
          </motion.div>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 3.5, repeat: Infinity }}
            className="absolute -bottom-4 -left-4 md:left-16 bg-forest-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-soft"
          >
            ✅ SDG 13 connected
          </motion.div>
        </motion.div>
      </section>

      {/* Features */}
      {/* Features */}
<section className="bg-white py-20">
  <div className="max-w-6xl mx-auto px-6">
    <div className="text-center mb-12">
      <h2 className="section-title">Everything you need to go greener</h2>
      <p className="section-sub">Practical, personal and rooted in Irish context</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((f, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          className="card hover:shadow-glow transition-shadow duration-300"
        >
          <div className="text-3xl mb-3">{f.icon}</div>
          <h3 className="font-display font-bold text-gray-900 mb-2">{f.title}</h3>
          <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
        </motion.div>
      ))}
    </div>
  </div>
</section>

{/* Explore Section */}
<section className="py-20 max-w-6xl mx-auto px-6">
  <div className="text-center mb-12">
    <h2 className="section-title">Explore EcoSelf</h2>
    <p className="section-sub">No quiz needed — dive straight in</p>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.1 }}
      onClick={() => navigate('/ireland')}
      className="card hover:shadow-glow transition-all duration-300 
        cursor-pointer hover:-translate-y-1 text-center"
    >
      <div className="text-4xl mb-4">🇮🇪</div>
      <h3 className="font-display font-bold text-gray-900 mb-2">
        Ireland's Sustainability
      </h3>
      <p className="text-gray-500 text-sm leading-relaxed mb-4">
        See where Ireland stands on emissions, energy, 
        transport and waste — the good and the urgent.
      </p>
      <span className="text-forest-600 text-sm font-semibold">
        Explore Stats →
      </span>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.2 }}
      onClick={() => navigate('/sdgs')}
      className="card hover:shadow-glow transition-all duration-300 
        cursor-pointer hover:-translate-y-1 text-center"
    >
      <div className="text-4xl mb-4">🌐</div>
      <h3 className="font-display font-bold text-gray-900 mb-2">
        The 17 Global Goals
      </h3>
      <p className="text-gray-500 text-sm leading-relaxed mb-4">
        Explore the UN Sustainable Development Goals 
        and how your lifestyle connects to each one.
      </p>
      <span className="text-forest-600 text-sm font-semibold">
        Explore SDGs →
      </span>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.3 }}
      onClick={() => navigate('/resources')}
      className="card hover:shadow-glow transition-all duration-300 
        cursor-pointer hover:-translate-y-1 text-center"
    >
      <div className="text-4xl mb-4">📚</div>
      <h3 className="font-display font-bold text-gray-900 mb-2">
        Irish Resources & Grants
      </h3>
      <p className="text-gray-500 text-sm leading-relaxed mb-4">
        SEAI grants, transport schemes, food resources 
        and more — all verified Irish sources.
      </p>
      <span className="text-forest-600 text-sm font-semibold">
        Explore Resources →
      </span>
    </motion.div>
  </div>
</section>

      {/* Privacy Section */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="text-4xl mb-4">🔒</div>
          <h2 className="section-title mb-4">Your privacy is non-negotiable</h2>
          <p className="section-sub max-w-2xl mx-auto mb-8">
            All your answers, scores and goals are stored only on your device. 
            We never create accounts, never track you, and never sell your data. 
            The only external call is to generate your AI recommendations — and even 
            then, no personal details are ever sent.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              '✅ No account needed',
              '✅ No data collection',
              '✅ Stored on your device',
              '✅ Anonymous AI calls',
            ].map((item, i) => (
              <span key={i} className="bg-forest-50 text-forest-700 text-sm font-medium px-4 py-2 rounded-full border border-forest-200">
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="bg-forest-600 py-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-display font-bold text-white mb-4">
              Ready to find out your EcoScore?
            </h2>
            <p className="text-forest-200 text-lg mb-8">
              Takes 3 minutes. No sign up. Completely free.
            </p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/quiz')}
              className="bg-sun-400 hover:bg-sun-500 text-gray-900 font-bold text-lg px-10 py-4 rounded-2xl transition-all duration-200 inline-flex items-center gap-2"
            >
              Start Now — It's Free
              <ChevronRight size={20} />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-400 text-sm">
  <p>🌱 EcoSelf · Built with 💚 in Ireland · Your data stays with you</p>
  <p className="mt-2">
    <a
      href="/privacy"
      className="text-forest-500 hover:text-forest-600 transition-colors"
    >
      Privacy Policy
    </a>
  </p>
</footer>

    </div>
  )
}