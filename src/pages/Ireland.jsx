import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Navbar from '../components/Navbar'

const stats = [
  {
    category: 'Climate Emissions',
    emoji: '💨',
    items: [
      {
        label: 'Emissions Reduction vs 1990',
        value: 10,
        current: '10% reduction achieved so far',
        targetLabel: '51% reduction needed by 2030',
        detail: 'In 1990 Ireland emitted 55Mt CO₂. Target is 27Mt by 2030. Currently at ~49Mt.',
        bad: true,
      },
      {
        label: 'Agriculture Share of Emissions',
        value: 37,
        current: '37% of all Irish emissions',
        targetLabel: 'Highest agriculture share in EU',
        detail: 'Irish agriculture emits ~18Mt CO₂ per year, largely from livestock and fertiliser.',
        bad: true,
      },
    ],
  },
  {
    category: 'Energy',
    emoji: '⚡',
    items: [
      {
        label: 'Electricity from Renewables',
        value: 42,
        current: '42% renewable electricity in 2023',
        targetLabel: '80% target by 2030',
        detail: 'Wind power alone accounts for 35% of Irish electricity. Solar is growing rapidly.',
        bad: false,
      },
      {
        label: 'Homes with Heat Pumps',
        value: 4,
        current: 'Only 4% of Irish homes (~90,000)',
        targetLabel: '600,000 homes target by 2030',
        detail: 'SEAI offers grants of up to €6,500 for heat pump installation.',
        bad: true,
      },
    ],
  },
  {
    category: 'Transport',
    emoji: '🚗',
    items: [
      {
        label: 'EV Share of New Car Sales',
        value: 16,
        current: '16% of new cars are electric',
        targetLabel: '100% zero emission new cars by 2030',
        detail: 'Ireland had ~100,000 EVs on the road in 2024. Government offers €3,500 EV grant.',
        bad: false,
      },
      {
        label: 'Solo Car Commuters',
        value: 64,
        current: '64% of Irish workers drive alone',
        targetLabel: 'EU average is 48%',
        detail: 'Outside Dublin, public transport options remain limited, making cars the default.',
        bad: true,
      },
    ],
  },
  {
    category: 'Waste & Recycling',
    emoji: '♻️',
    items: [
      {
        label: 'Household Recycling Rate',
        value: 41,
        current: '41% recycled nationally',
        targetLabel: '55% EU target by 2025',
        detail: 'Ireland generates about 2.8 million tonnes of municipal waste per year.',
        bad: true,
      },
      {
        label: 'Food Waste Per Person',
        value: 75,
        current: '~80kg food wasted per person/year',
        targetLabel: 'EU average is 70kg',
        detail: 'Food waste costs the average Irish household €700 per year.',
        bad: true,
      },
    ],
  },
]

const facts = [
  { emoji: '🌊', text: 'Ireland has the largest ocean territory per capita in the EU — 10x its land area.' },
  { emoji: '💨', text: 'Ireland has some of the best wind energy potential in Europe due to its Atlantic location.' },
  { emoji: '🐄', text: 'Ireland has more cattle than people — 7.5 million cows vs 5.1 million people.' },
  { emoji: '🌲', text: 'Only 11% of Ireland is forested — one of the lowest rates in Europe.' },
  { emoji: '☀️', text: 'SEAI offers grants of up to €25,000 for home energy retrofits in Ireland.' },
  { emoji: '🚲', text: 'Dublin\'s cycling infrastructure has grown 40% since 2020.' },
]

export default function Ireland() {
  const navigate = useNavigate()

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
          <div className="text-4xl mb-3">🇮🇪</div>
          <h1 className="section-title mb-2">Ireland's Sustainability</h1>
          <p className="section-sub text-base">
            Where Ireland stands — the good, the bad and the urgent
          </p>
        </motion.div>

        {/* Stats */}
        {stats.map((section, si) => (
          <motion.div
            key={si}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: si * 0.1 }}
            className="card mb-6"
          >
            <h3 className="font-display font-bold text-gray-900 mb-4 text-lg">
              {section.emoji} {section.category}
            </h3>
            <div className="space-y-5">
              {section.items.map((item, ii) => (
                <div key={ii}>
                  <div className="flex items-start justify-between mb-1.5 gap-2">
  <span className="text-sm text-gray-700 font-medium">
    {item.label}
  </span>
  <span className={`text-xs font-bold px-2 py-0.5 rounded-full shrink-0 ${
    item.bad
      ? 'bg-orange-100 text-orange-600'
      : 'bg-forest-100 text-forest-700'
  }`}>
    {item.value}%
  </span>
</div>
<div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
  <motion.div
    initial={{ width: 0 }}
    animate={{ width: `${item.value}%` }}
    transition={{ duration: 1, delay: si * 0.1 + ii * 0.1 }}
    className={`h-2.5 rounded-full ${
      item.bad ? 'bg-orange-300' : 'bg-forest-400'
    }`}
  />
</div>
<div className="flex justify-between mt-1">
  <span className="text-xs text-gray-400">{item.current}</span>
  <span className="text-xs text-gray-400">{item.targetLabel}</span>
</div>
<div className="mt-2 bg-gray-50 rounded-xl px-3 py-2">
  <p className="text-xs text-gray-500 leading-relaxed">
    📌 {item.detail}
  </p>
</div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Interesting Facts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card mb-6"
        >
          <h3 className="font-display font-bold text-gray-900 mb-4 text-lg">
            💡 Did You Know?
          </h3>
          <div className="space-y-3">
            {facts.map((fact, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-xl shrink-0">{fact.emoji}</span>
                <p className="text-sm text-gray-600 leading-relaxed">{fact.text}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Data Sources */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-forest-50 border border-forest-100 rounded-2xl p-4 mb-6"
        >
          <p className="text-xs text-forest-700 font-semibold mb-1">📊 Data Sources</p>
          <p className="text-xs text-forest-600 leading-relaxed">
            EPA Ireland · SEAI · CSO Ireland · Climate Action Plan 2024 ·
            European Environment Agency · Transport for Ireland
          </p>
        </motion.div>

        {/* Navigation */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate('/sdgs')}
            className="btn-primary w-full py-4 flex items-center justify-center gap-2"
          >
            🌐 Explore the SDGs
          </button>
          <button
            onClick={() => navigate('/resources')}
            className="btn-secondary w-full py-4 flex items-center justify-center gap-2"
          >
            📚 Irish Resources & Grants
          </button>
        </div>

      </div>
    </div>
  )
}