import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'
import Navbar from '../components/Navbar'

const resources = [
  {
    category: 'Home Energy Grants',
    emoji: '🏠',
    items: [
      {
        title: 'SEAI Home Energy Grants',
        desc: 'Grants of up to €25,000 for home retrofits including insulation, heat pumps and solar panels.',
        url: 'https://www.seai.ie/grants/home-energy-grants',
        tag: 'Grant',
      },
      {
        title: 'National Home Retrofit Scheme',
        desc: 'One-stop-shop for homeowners to retrofit their home with government support.',
        url: 'https://www.seai.ie/grants/home-energy-grants/national-home-energy-upgrade-scheme',
        tag: 'Grant',
      },
      {
        title: 'SEAI Solar PV Grant',
        desc: 'Up to €2,400 grant for solar panel installation on your home.',
        url: 'https://www.seai.ie/grants/home-energy-grants/solar-electricity-grant',
        tag: 'Grant',
      },
      {
        title: 'Warmer Homes Scheme',
        desc: 'Free energy upgrades for homeowners on low incomes.',
        url: 'https://www.seai.ie/grants/home-energy-grants/better-energy-warmer-homes-scheme',
        tag: 'Free Scheme',
      },
    ],
  },
  {
    category: 'Transport',
    emoji: '🚗',
    items: [
      {
        title: 'EV Purchase Grant',
        desc: 'Up to €3,500 SEAI grant when buying a new electric vehicle in Ireland.',
        url: 'https://www.seai.ie/grants/electric-vehicle-grants',
        tag: 'Grant',
      },
      {
        title: 'Transport for Ireland — Journey Planner',
        desc: 'Plan your journey using public transport anywhere in Ireland.',
        url: 'https://www.transportforireland.ie',
        tag: 'Tool',
      },
      {
        title: 'Leap Card',
        desc: 'Save up to 31% on public transport fares across Ireland.',
        url: 'https://www.leapcard.ie',
        tag: 'Tool',
      },
      {
        title: 'Bike to Work Scheme',
        desc: 'Save up to 52% on a new bike through tax relief via your employer.',
        url: 'https://www.revenue.ie/en/jobs-and-pensions/taxation-of-employer-benefits/cycle-to-work-scheme.aspx',
        tag: 'Tax Relief',
      },
      {
        title: 'EV Home Charger Grant',
        desc: 'Up to €300 grant for installing a home EV charger.',
        url: 'https://www.seai.ie/grants/electric-vehicle-grants/electric-vehicle-home-charger-grant',
        tag: 'Grant',
      },
    ],
  },
  {
    category: 'Food & Diet',
    emoji: '🥗',
    items: [
      {
        title: 'Bord Bia — Seasonal Food Calendar',
        desc: 'Find out what Irish fruit and vegetables are in season each month.',
        url: 'https://www.bordbia.ie/whats-in-season',
        tag: 'Resource',
      },
      {
        title: 'GIY Ireland',
        desc: 'Grow It Yourself — community and resources for growing your own food in Ireland.',
        url: 'https://giy.ie',
        tag: 'Community',
      },
      {
        title: 'Too Good To Go',
        desc: 'App to buy surplus food from restaurants and shops at reduced prices.',
        url: 'https://toogoodtogo.com/en-ie',
        tag: 'App',
      },
      {
        title: 'Irish Farmers Markets',
        desc: 'Find your nearest farmers market across Ireland.',
        url: 'https://www.bordbia.ie/farmers-markets',
        tag: 'Resource',
      },
    ],
  },
  {
    category: 'Shopping & Waste',
    emoji: '♻️',
    items: [
      {
        title: 'Conscious Cup Campaign',
        desc: 'Find cafés in Ireland that accept reusable cups.',
        url: 'https://www.consciouscup.ie',
        tag: 'Resource',
      },
      {
        title: 'Recycle List Ireland',
        desc: 'Check exactly what can and cannot be recycled in your bin.',
        url: 'https://www.mywaste.ie',
        tag: 'Tool',
      },
      {
        title: 'Charity Shop Finder',
        desc: 'Find secondhand and charity shops near you in Ireland.',
        url: 'https://www.charityshopping.ie',
        tag: 'Resource',
      },
      {
        title: 'RepairiT',
        desc: 'Find local repair cafés and repair services across Ireland.',
        url: 'https://www.repairit.ie',
        tag: 'Community',
      },
    ],
  },
  {
    category: 'Learn & Get Involved',
    emoji: '📖',
    items: [
      {
        title: 'EPA Ireland',
        desc: 'Ireland\'s Environmental Protection Agency — data, reports and guidance.',
        url: 'https://www.epa.ie',
        tag: 'Resource',
      },
      {
        title: 'An Taisce — Green Schools',
        desc: 'Ireland\'s leading environmental education programme.',
        url: 'https://www.greenschoolsireland.org',
        tag: 'Education',
      },
      {
        title: 'Stop Climate Chaos',
        desc: 'Irish coalition of organisations campaigning for climate action.',
        url: 'https://www.stopclimatechaos.ie',
        tag: 'Community',
      },
      {
        title: 'Friends of the Earth Ireland',
        desc: 'Campaigns and resources for environmental action in Ireland.',
        url: 'https://www.foe.ie',
        tag: 'Community',
      },
      {
        title: 'SEAI Energy Academy',
        desc: 'Free online courses on sustainable energy for Irish residents.',
        url: 'https://www.seai.ie/energy-academy',
        tag: 'Education',
      },
    ],
  },
]

const tagStyles = {
  Grant: 'bg-forest-100 text-forest-700',
  'Free Scheme': 'bg-green-100 text-green-700',
  'Tax Relief': 'bg-sun-300 text-yellow-800',
  Tool: 'bg-blue-100 text-blue-700',
  App: 'bg-purple-100 text-purple-700',
  Resource: 'bg-gray-100 text-gray-600',
  Community: 'bg-orange-100 text-orange-700',
  Education: 'bg-pink-100 text-pink-700',
}

export default function Resources() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#f8faf9]">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 pb-20">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-10"
        >
          <div className="text-4xl mb-3">📚</div>
          <h1 className="section-title mb-2">Irish Resources & Grants</h1>
          <p className="section-sub text-base">
            Real tools, grants and schemes to help you live greener in Ireland
          </p>
        </motion.div>

        {/* Resource Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {resources.slice(0, 3).map((section, si) => (
            <motion.div
              key={si}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: si * 0.1 }}
              className="card"
            >
              <h2 className="font-display font-bold text-gray-900 text-lg mb-4">
                {section.emoji} {section.category}
              </h2>
              <div className="space-y-3">
                {section.items.map((item, ii) => (
                  <a
                    key={ii}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:bg-forest-50 rounded-xl p-2 
                      transition-colors group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                          <span className="font-semibold text-gray-900 text-sm 
                            group-hover:text-forest-600 transition-colors">
                            {item.title}
                          </span>
                          <span className={`text-xs font-semibold px-2 py-0.5 
                            rounded-full shrink-0 
                            ${tagStyles[item.tag] || tagStyles.Resource}`}
                          >
                            {item.tag}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                      <ExternalLink
                        size={14}
                        className="text-gray-300 shrink-0 mt-0.5 
                          group-hover:text-forest-400 transition-colors"
                      />
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {resources.slice(3).map((section, si) => (
            <motion.div
              key={si}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + si * 0.1 }}
              className="card"
            >
              <h2 className="font-display font-bold text-gray-900 text-lg mb-4">
                {section.emoji} {section.category}
              </h2>
              <div className="space-y-3">
                {section.items.map((item, ii) => (
                  <a
                    key={ii}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:bg-forest-50 rounded-xl p-2 
                      transition-colors group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                          <span className="font-semibold text-gray-900 text-sm 
                            group-hover:text-forest-600 transition-colors">
                            {item.title}
                          </span>
                          <span className={`text-xs font-semibold px-2 py-0.5 
                            rounded-full shrink-0 
                            ${tagStyles[item.tag] || tagStyles.Resource}`}
                          >
                            {item.tag}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                      <ExternalLink
                        size={14}
                        className="text-gray-300 shrink-0 mt-0.5 
                          group-hover:text-forest-400 transition-colors"
                      />
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Data note */}
        <div className="bg-forest-50 border border-forest-100 rounded-2xl p-4">
          <p className="text-xs text-forest-700 leading-relaxed">
            💡 All links go to official Irish government, state agency or 
            verified Irish organisation websites. Always verify grant 
            eligibility directly with the provider.
          </p>
        </div>

      </div>
    </div>
  )
}