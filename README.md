# 🌱 EcoSelf — Sustainable Living Score for Ireland

**[Live App](https://ecoself.vercel.app)** · Built with React · Powered by Groq AI · Privacy First

![EcoSelf Landing](https://ecoself.vercel.app)

---

## What is EcoSelf?

EcoSelf is a free, privacy-first web app that gives you a personalised sustainability score based on your lifestyle — tailored specifically to life in Ireland.

Answer ~20 questions about your transport, diet, home energy, shopping and water habits → get an AI-powered EcoScore → receive personalised recommendations → track your progress.

---

## Features

- 🎯 **Personalised EcoScore** — scored across 5 categories with Ireland averages for comparison
- 🤖 **AI Recommendations** — powered by Groq (Llama 3.3) with Ireland-specific tips and resources
- 🎯 **Goal Tracker** — save recommendations as goals and track your progress
- 🇮🇪 **Ireland Sustainability Hub** — real data from EPA, SEAI and CSO Ireland
- 🌐 **SDG Explorer** — all 17 UN Sustainable Development Goals explained with Irish context
- 📚 **Resources Library** — verified Irish grants, schemes and tools
- 📊 **Shareable Score Card** — download and share your EcoScore
- 🔒 **Privacy First** — all data stored locally on your device, no accounts, no tracking

---

## Privacy

All user data is stored in your browser's localStorage and never leaves your device. The only external call is an anonymised lifestyle summary sent to Groq AI to generate recommendations — no name, no location, no identifying information is ever sent.

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| React + Vite | Frontend framework |
| Tailwind CSS v3 | Styling |
| Framer Motion | Animations |
| React Router DOM | Routing |
| Groq API (Llama 3.3) | AI recommendations |
| Vercel Serverless | Secure API proxy |
| html2canvas | Score card download |
| Vercel | Hosting + Analytics |

---

## Running Locally

### Prerequisites
- Node.js v20+
- Groq API key (free at [console.groq.com](https://console.groq.com))

### Steps

```bash
# Clone the repository
git clone https://github.com/sajanyerra/ecoself.git

# Navigate to project
cd ecoself

# Install dependencies
npm install

# Create .env file
echo GROQ_API_KEY=your_key_here > .env

# Start development server
vercel dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
src/
  pages/
    Landing.jsx         # Home page
    Quiz.jsx            # 20-question sustainability quiz
    Results.jsx         # EcoScore dashboard
    Recommendations.jsx # AI-powered recommendations
    Goals.jsx           # Goal tracker
    Ireland.jsx         # Ireland sustainability stats
    SDGs.jsx            # UN SDG explorer
    Resources.jsx       # Irish resources and grants
    Privacy.jsx         # Privacy policy
  components/
    Navbar.jsx          # Shared navigation
  data/
    questions.js        # Quiz questions and branching logic
  utils/
    scoring.js          # Scoring algorithm and Ireland averages
api/
  recommend.js          # Vercel serverless function (API proxy)
```

---

## Data Sources

- **EPA Ireland** — emissions and environmental data
- **SEAI** — energy statistics and grant information
- **CSO Ireland** — transport and household surveys
- **Climate Action Plan 2024** — government targets
- **European Environment Agency** — EU comparisons
- **Transport for Ireland** — public transport data

---

## Scoring System

| Category | Weight |
|----------|--------|
| 🚗 Transport | 25% |
| 🥗 Diet | 25% |
| 🏠 Home Energy | 25% |
| 🛍️ Shopping | 15% |
| 💧 Water & Waste | 10% |

### Score Labels
| Score | Label |
|-------|-------|
| 85+ | 🏆 Eco Champion |
| 70+ | 🌿 Green Explorer |
| 55+ | 🌱 Conscious Starter |
| 40+ | 🌍 Aware & Growing |
| <40 | 🌾 Room to Grow |

---

## Connect

- 🌐 [ecoself.vercel.app](https://ecoself.vercel.app)
- 💼 [LinkedIn](https://www.linkedin.com/in/yourlinkedin)
- 🐙 [GitHub](https://github.com/sajanyerra)

---

*Built with 💚 in Ireland · Your data stays with you*
