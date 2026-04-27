export const irelandAverages = {
  transport: 48,
  diet: 52,
  home: 41,
  shopping: 55,
  water: 58,
  overall: 51,
}

const weights = {
  transport: 0.25,
  diet: 0.25,
  home: 0.25,
  shopping: 0.15,
  water: 0.10,
}

function scoreTransport(answers) {
  let score = 60 // realistic start

  const t0 = answers.T0?.selected
  if (t0 === 'at-home') score += 15
  if (t0 === 'student') score += 5
  if (t0 === 'hybrid') score += 5
  if (t0 === 'commute') score -= 5
  if (t0 === 'driving') score -= 20

  const t1 = answers.T1?.selected || []
  if (t1.includes('car')) score -= 20
  if (t1.includes('motorbike')) score -= 10
  if (t1.includes('cycle')) score += 15
  if (t1.includes('walk')) score += 10
  if (t1.includes('bus') || t1.includes('train')) score += 8

  const t2 = answers.T2?.selected
  if (t2 === 'petrol') score -= 15
  if (t2 === 'diesel') score -= 20
  if (t2 === 'hybrid') score -= 5
  if (t2 === 'electric') score += 10

  const t3a = answers.T3a?.selected
  if (t3a === 'none') score += 8
  if (t3a === '1-2') score -= 5
  if (t3a === '3-5') score -= 12
  if (t3a === '6+') score -= 20

  const t3b = answers.T3b?.selected
  if (t3b === 'none') score += 10
  if (t3b === '1-2') score -= 20
  if (t3b === '3-4') score -= 35
  if (t3b === '5+') score -= 45

  const t4 = answers.T4?.selected
  if (t4 === 'under5') score += 8
  if (t4 === '20-50') score -= 8
  if (t4 === '50+') score -= 15

  return Math.min(100, Math.max(0, score))
}

function scoreDiet(answers) {
  let score = 55 // realistic start

  const d1 = answers.D1?.selected
  if (d1 === 'meat-heavy') score -= 30
  if (d1 === 'balanced') score -= 10
  if (d1 === 'pescatarian') score += 5
  if (d1 === 'vegetarian') score += 15
  if (d1 === 'vegan') score += 20

  const d2 = answers.D2?.selected || []
  if (d2.includes('local')) score += 8
  if (d2.includes('farmers-market')) score += 8
  if (d2.includes('grow-own')) score += 12
  if (d2.includes('takeaway')) score -= 10
  if (d2.includes('supermarket') && d2.length === 1) score -= 5

  const d3 = answers.D3?.selected
  if (d3 === 'most-days') score -= 25
  if (d3 === 'few-week') score -= 15
  if (d3 === 'occasionally') score -= 5
  if (d3 === 'rarely') score += 10

  const d4 = answers.D4?.selected
  if (d4 === 'always') score += 10
  if (d4 === 'sometimes') score += 5
  if (d4 === 'rarely') score -= 5
  if (d4 === 'never') score -= 10

  return Math.min(100, Math.max(0, score))
}

function scoreHome(answers) {
  let score = 50 // Irish homes are generally poor, realistic start

  const h1 = answers.H1?.selected || []
  if (h1.includes('oil')) score -= 25
  if (h1.includes('gas')) score -= 15
  if (h1.includes('solid-fuel')) score -= 20
  if (h1.includes('heat-pump')) score += 20
  if (h1.includes('electric')) score -= 8

  const h2 = answers.H2?.selected
  if (h2 === 'poor') score -= 25
  if (h2 === 'average') score -= 10
  if (h2 === 'good') score += 10
  if (h2 === 'retrofitted') score += 25

  const h3 = answers.H3?.selected
  if (h3 === 'standard') score -= 10
  if (h3 === 'green-tariff') score += 15
  if (h3 === 'solar') score += 20
  if (h3 === 'solar-battery') score += 25

  const h4 = answers.H4?.selected
  if (h4 === 'boiler') score -= 10
  if (h4 === 'immersion') score -= 5
  if (h4 === 'solar-thermal') score += 15
  if (h4 === 'heat-pump') score += 20

  const h5 = answers.H5?.selected || []
  if (h5.includes('led')) score += 5
  if (h5.includes('a-rated')) score += 8
  if (h5.includes('smart-thermostat')) score += 7
  if (h5.includes('smart-meter')) score += 5
  if (h5.includes('none')) score -= 8

  return Math.min(100, Math.max(0, score))
}

function scoreShopping(answers) {
  let score = 55 // realistic start

  const s1 = answers.S1?.selected
  if (s1 === 'weekly') score -= 35
  if (s1 === 'monthly') score -= 20
  if (s1 === 'seasonally') score += 5
  if (s1 === 'rarely') score += 15

  const s2 = answers.S2?.selected
  if (s2 === 'never') score -= 20
  if (s2 === 'sometimes') score += 5
  if (s2 === 'often') score += 15
  if (s2 === 'always') score += 25

  const s3 = answers.S3?.selected || []
  if (s3.includes('replace')) score -= 15
  if (s3.includes('repair')) score += 15
  if (s3.includes('recycle')) score += 10
  if (s3.includes('donate')) score += 10

  return Math.min(100, Math.max(0, score))
}

function scoreWater(answers) {
  let score = 60 // realistic start

  const w1 = answers.W1?.selected
  if (w1 === 'under4') score += 20
  if (w1 === '4-7') score += 5
  if (w1 === '8-12') score -= 20
  if (w1 === '12+') score -= 35

  const w2 = answers.W2?.selected
  if (w2 === 'often') score -= 25
  if (w2 === 'occasionally') score -= 12
  if (w2 === 'rarely') score -= 3
  if (w2 === 'never') score += 8

  const w3 = answers.W3?.selected
  if (w3 === 'not-really') score -= 25
  if (w3 === 'basics') score -= 12
  if (w3 === 'pretty-well') score += 8
  if (w3 === 'carefully') score += 20

  const w4 = answers.W4?.selected
  if (w4 === 'lots') score -= 25
  if (w4 === 'some') score -= 12
  if (w4 === 'rarely') score += 8
  if (w4 === 'almost-none') score += 20

  return Math.min(100, Math.max(0, score))
}

export function calculateScores(answers) {
  const categories = {
    transport: scoreTransport(answers),
    diet: scoreDiet(answers),
    home: scoreHome(answers),
    shopping: scoreShopping(answers),
    water: scoreWater(answers),
  }

  const overall = Math.round(
    Object.entries(categories).reduce((sum, [key, val]) => {
      return sum + val * weights[key]
    }, 0)
  )

  return {
    overall,
    categories: {
      transport: Math.round(categories.transport),
      diet: Math.round(categories.diet),
      home: Math.round(categories.home),
      shopping: Math.round(categories.shopping),
      water: Math.round(categories.water),
    }
  }
}

export function getScoreLabel(score) {
  if (score >= 85) return { label: 'Eco Champion', emoji: '🏆', color: 'text-forest-600' }
  if (score >= 70) return { label: 'Green Explorer', emoji: '🌿', color: 'text-forest-500' }
  if (score >= 55) return { label: 'Conscious Starter', emoji: '🌱', color: 'text-forest-400' }
  if (score >= 40) return { label: 'Aware & Growing', emoji: '🌍', color: 'text-sun-500' }
  return { label: 'Room to Grow', emoji: '🌾', color: 'text-orange-400' }
}

export const categoryMeta = {
  transport: { label: 'Transport', emoji: '🚗' },
  diet: { label: 'Diet', emoji: '🥗' },
  home: { label: 'Home Energy', emoji: '🏠' },
  shopping: { label: 'Shopping', emoji: '🛍️' },
  water: { label: 'Water & Waste', emoji: '💧' },
}