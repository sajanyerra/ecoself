import { Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Landing from './pages/Landing'
import Quiz from './pages/Quiz'
import Results from './pages/Results'
import Recommendations from './pages/Recommendations'
import Goals from './pages/Goals'
import Ireland from './pages/Ireland'
import SDGs from './pages/SDGs'
import Resources from './pages/Resources'
import Privacy from './pages/Privacy'

function App() {
  return (
    <div className="min-h-screen bg-[#f8faf9]">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/results" element={<Results />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/ireland" element={<Ireland />} />
        <Route path="/sdgs" element={<SDGs />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
    </div>
  )
}

export default App