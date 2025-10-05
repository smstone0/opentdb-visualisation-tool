import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DistributionPieChart from './components/DistributionPieChart.jsx'
import DistributionMixBarChart from './components/DistributionMixBarChart.jsx'

function App() {
  const [count, setCount] = useState(0)
  const [questions, setQuestions] = useState(null)
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [categoryCounts, setCategoryCounts] = useState({})
  const [difficultyCounts, setDifficultyCounts] = useState({})
  const [categoryDifficultyDistribution, setCategoryDifficultyDistribution] = useState({})

  function getCategoryDifficultyCounts(questions) {
    if (!questions) return {}
    return questions.reduce((acc, q) => {
      if (!acc[q.category]) acc[q.category] = {}
      acc[q.category][q.difficulty] = (acc[q.category][q.difficulty] || 0) + 1
      return acc
    }, {})
  }

  function getCategoryCounts(questions, selectedCategory) {
    if (!questions) return {}
    const total = questions.length
    if (selectedCategory === 'all') {
      return { total }
    }
    const selected = questions.filter(q => q.category === selectedCategory).length
    return { selected, total }
  }

  function getDifficultyCounts(questions, selectedCategory) {
    if (!questions) return {}
    let filtered = questions
    if (selectedCategory !== 'all') {
      filtered = questions.filter(q => q.category === selectedCategory)
    }
    return filtered.reduce((acc, q) => {
      acc[q.difficulty] = (acc[q.difficulty] || 0) + 1
      return acc
    }, {})
  }

    /**
     * Fetch 50 questions from the Open Trivia Database API on page load
     * Extract unique categories from the fetched questions and sort alphabetically
     */
    useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=50')
      .then(res => res.json())
      .then(json => {
        setQuestions(json.results)
        setSelectedCategory('all')

        const uniqueCategories = [...new Set(json.results.map(q => q.category))]
        uniqueCategories.sort()
        setCategories(uniqueCategories)

        const categoryDifficultyCounts = getCategoryDifficultyCounts(json.results)
        setCategoryDifficultyDistribution(categoryDifficultyCounts)
      })
      .catch(err => console.error(err))
  }, [])

  /**
   * Filter questions based on selected category
   * Update difficulty distribution based on new filtered questions
   */
  useEffect(() => {
    setCategoryCounts(getCategoryCounts(questions || [], selectedCategory))
    setDifficultyCounts(getDifficultyCounts(questions || [], selectedCategory))
  }, [selectedCategory, questions])

  return (
    <>
      <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
        <option value="all">All Categories</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>{category}</option>
        ))}
      </select>
      <div className="chart-container">
        {selectedCategory === 'all' ? (
          <DistributionMixBarChart data={categoryDifficultyDistribution} />
        ) : (
          <>
            <DistributionPieChart data={categoryCounts} chartTitle={`Category Count: ${categoryCounts.selected || 0} / ${categoryCounts.total || 0}`} />
            <DistributionPieChart data={difficultyCounts} chartTitle={`Difficulty Breakdown for ${selectedCategory}`} />
          </>
        )}
      </div>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
