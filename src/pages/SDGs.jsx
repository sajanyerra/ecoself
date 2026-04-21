import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react'
import Navbar from '../components/Navbar'

const sdgs = [
  {
    id: 1, emoji: '🏠', title: 'No Poverty',
    color: 'bg-red-100 border-red-200',
    description: 'End poverty in all its forms everywhere.',
    ireland: 'Ireland has a consistent housing crisis with rising rents pushing many into poverty. 1 in 10 Irish people are at risk of poverty.',
    youCan: 'Support local food banks, buy from social enterprises, reduce waste to lower costs for everyone.',
    relevantTo: [],
  },
  {
    id: 2, emoji: '🌾', title: 'Zero Hunger',
    color: 'bg-yellow-100 border-yellow-200',
    description: 'End hunger, achieve food security and promote sustainable agriculture.',
    ireland: 'Ireland wastes ~80kg of food per person per year. Food poverty affects 1 in 8 Irish households.',
    youCan: 'Reduce food waste, buy local Irish produce, support community gardens and food banks.',
    relevantTo: ['diet'],
  },
  {
    id: 3, emoji: '❤️', title: 'Good Health & Wellbeing',
    color: 'bg-green-100 border-green-200',
    description: 'Ensure healthy lives and promote wellbeing for all.',
    ireland: 'Air pollution from traffic and solid fuel burning affects Irish health. Walking and cycling reduce both emissions and improve health.',
    youCan: 'Walk or cycle more, reduce solid fuel burning, eat more plant-based foods.',
    relevantTo: ['transport', 'diet'],
  },
  {
    id: 4, emoji: '📚', title: 'Quality Education',
    color: 'bg-red-100 border-red-200',
    description: 'Ensure inclusive and quality education for all.',
    ireland: 'Ireland performs well on education but sustainability is not yet a core curriculum subject.',
    youCan: 'Share what you learn, educate others about sustainability, support environmental education.',
    relevantTo: [],
  },
  {
    id: 5, emoji: '⚧️', title: 'Gender Equality',
    color: 'bg-orange-100 border-orange-200',
    description: 'Achieve gender equality and empower all women and girls.',
    ireland: 'Women are disproportionately affected by climate change globally. Ireland has made progress but gaps remain in leadership.',
    youCan: 'Support women-led sustainable businesses and advocate for inclusive climate policy.',
    relevantTo: [],
  },
  {
    id: 6, emoji: '💧', title: 'Clean Water & Sanitation',
    color: 'bg-blue-100 border-blue-200',
    description: 'Ensure availability and sustainable management of water.',
    ireland: 'Ireland has high rainfall but ageing infrastructure causes water loss. Some areas face water restrictions.',
    youCan: 'Shorten showers, fix leaks, avoid water waste, never pour chemicals down drains.',
    relevantTo: ['water'],
  },
  {
    id: 7, emoji: '⚡', title: 'Affordable & Clean Energy',
    color: 'bg-yellow-100 border-yellow-200',
    description: 'Ensure access to affordable, reliable and sustainable energy.',
    ireland: 'Ireland targets 80% renewable electricity by 2030. Currently at 42%. SEAI offers grants for home energy upgrades.',
    youCan: 'Switch to a green energy tariff, install solar panels, reduce home energy use.',
    relevantTo: ['home'],
  },
  {
    id: 8, emoji: '💼', title: 'Decent Work & Economic Growth',
    color: 'bg-red-100 border-red-200',
    description: 'Promote sustained, inclusive and sustainable economic growth.',
    ireland: 'Ireland\'s green economy is growing. Sustainability skills are increasingly valued by Irish employers.',
    youCan: 'Support local businesses, choose sustainable employers, develop green skills.',
    relevantTo: ['shopping'],
  },
  {
    id: 9, emoji: '🏭', title: 'Industry, Innovation & Infrastructure',
    color: 'bg-orange-100 border-orange-200',
    description: 'Build resilient infrastructure and foster innovation.',
    ireland: 'Ireland is investing in offshore wind, EV charging networks and green hydrogen research.',
    youCan: 'Support green innovation, use public EV charging, advocate for better cycling infrastructure.',
    relevantTo: ['transport'],
  },
  {
    id: 10, emoji: '⚖️', title: 'Reduced Inequalities',
    color: 'bg-pink-100 border-pink-200',
    description: 'Reduce inequality within and among countries.',
    ireland: 'Energy poverty affects 1 in 5 Irish households. Retrofit grants help but awareness is low.',
    youCan: 'Share information about SEAI grants, support community energy projects.',
    relevantTo: ['home'],
  },
  {
    id: 11, emoji: '🏙️', title: 'Sustainable Cities & Communities',
    color: 'bg-yellow-100 border-yellow-200',
    description: 'Make cities inclusive, safe, resilient and sustainable.',
    ireland: 'Dublin is expanding cycling lanes and public transport. Rural areas still heavily car-dependent.',
    youCan: 'Use public transport, support local shops, advocate for cycling infrastructure.',
    relevantTo: ['transport'],
  },
  {
    id: 12, emoji: '♻️', title: 'Responsible Consumption',
    color: 'bg-amber-100 border-amber-200',
    description: 'Ensure sustainable consumption and production patterns.',
    ireland: 'Ireland generates 2.8 million tonnes of municipal waste per year. Fast fashion is a growing problem.',
    youCan: 'Buy secondhand, repair before replacing, reduce single-use plastics, compost food waste.',
    relevantTo: ['shopping', 'water'],
  },
  {
    id: 13, emoji: '🌍', title: 'Climate Action',
    color: 'bg-green-100 border-green-200',
    description: 'Take urgent action to combat climate change.',
    ireland: 'Ireland is legally bound to cut emissions 51% by 2030. Currently only 10% reduction achieved.',
    youCan: 'Every action you take on EcoSelf directly contributes to this goal.',
    relevantTo: ['transport', 'diet', 'home', 'shopping', 'water'],
  },
  {
    id: 14, emoji: '🌊', title: 'Life Below Water',
    color: 'bg-blue-100 border-blue-200',
    description: 'Conserve and sustainably use the oceans and marine resources.',
    ireland: 'Ireland has the largest ocean territory per capita in the EU. Plastic pollution threatens Irish coastlines.',
    youCan: 'Reduce single-use plastics, participate in beach cleanups, avoid microplastic products.',
    relevantTo: ['water', 'shopping'],
  },
  {
    id: 15, emoji: '🌿', title: 'Life on Land',
    color: 'bg-green-100 border-green-200',
    description: 'Protect, restore and promote sustainable use of ecosystems.',
    ireland: 'Only 11% of Ireland is forested — one of the lowest in Europe. Biodiversity is declining rapidly.',
    youCan: 'Plant native trees, support rewilding projects, avoid pesticides, grow your own food.',
    relevantTo: ['diet'],
  },
  {
    id: 16, emoji: '☮️', title: 'Peace, Justice & Strong Institutions',
    color: 'bg-blue-100 border-blue-200',
    description: 'Promote peaceful and inclusive societies.',
    ireland: 'Ireland is a strong performer on governance but needs stronger climate accountability.',
    youCan: 'Vote in local and national elections with sustainability in mind, engage with public consultations.',
    relevantTo: [],
  },
  {
    id: 17, emoji: '🤝', title: 'Partnerships for the Goals',
    color: 'bg-blue-100 border-blue-200',
    description: 'Strengthen the means of implementation and global partnerships.',
    ireland: 'Ireland contributes 0.32% of GNI to overseas development aid, below the 0.7% UN target.',
    youCan: 'Support Irish development organisations, share EcoSelf with others, build community.',
    relevantTo: [],
  },
]

export default function SDGs() {
  const navigate = useNavigate()
  const [expanded, setExpanded] = useState(null)
  const scores = JSON.parse(localStorage.getItem('ecoself_scores') || '{}')

  function toggle(id) {
    setExpanded(expanded === id ? null : id)
  }

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
          <div className="text-4xl mb-3">🌐</div>
          <h1 className="section-title mb-2">The 17 Global Goals</h1>
          <p className="section-sub text-base">
            How your lifestyle connects to the UN Sustainable Development Goals
          </p>
        </motion.div>

        {/* SDG Cards */}
        <div className="space-y-3">
          {sdgs.map((sdg, i) => {
            const isExpanded = expanded === sdg.id
            const isRelevant = sdg.relevantTo.length > 0

            return (
              <motion.div
                key={sdg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className={`border-2 rounded-2xl overflow-hidden ${sdg.color}`}
              >
                {/* Header row */}
                <button
                  onClick={() => toggle(sdg.id)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{sdg.emoji}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-display font-bold text-gray-900 text-sm">
                          SDG {sdg.id}: {sdg.title}
                        </span>
                        {isRelevant && (
                          <span className="text-xs bg-forest-500 text-white 
                            px-2 py-0.5 rounded-full">
                            Relevant to you
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {sdg.description}
                      </p>
                    </div>
                  </div>
                  {isExpanded
                    ? <ChevronUp size={16} className="text-gray-400 shrink-0" />
                    : <ChevronDown size={16} className="text-gray-400 shrink-0" />
                  }
                </button>

                {/* Expanded content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-4 pb-4 space-y-3"
                    >
                      <div className="bg-white rounded-xl p-3">
                        <p className="text-xs font-semibold text-gray-500 mb-1">
                          🇮🇪 Ireland
                        </p>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {sdg.ireland}
                        </p>
                      </div>
                      <div className="bg-white rounded-xl p-3">
                        <p className="text-xs font-semibold text-gray-500 mb-1">
                          ✅ What you can do
                        </p>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {sdg.youCan}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-3 mt-8">
          <button
            onClick={() => navigate('/resources')}
            className="btn-primary w-full py-4 flex items-center justify-center gap-2"
          >
            📚 Irish Resources & Grants
          </button>
        </div>

      </div>
    </div>
  )
}