import { useState, useEffect } from 'react'
import './App.css'
import DistributionPieChart from './components/DistributionPieChart.jsx'
import DistributionMixBarChart from './components/DistributionMixBarChart.jsx'
import he from 'he';

function App() {
  const [questions, setQuestions] = useState(null)
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [categoryCounts, setCategoryCounts] = useState({})
  const [difficultyCounts, setDifficultyCounts] = useState({})
  const [categoryDifficultyDistribution, setCategoryDifficultyDistribution] = useState({})

  /**
   * Get the distribution of all questions by category and difficulty level for bar chart
   * @param {*} questions
   * @returns {category: {easy: number, medium: number, hard: number}}
   */
  function getCategoryDifficultyCounts(questions) {
    if (!questions) return {}
    return questions.reduce((acc, q) => {
      if (!acc[q.category]) acc[q.category] = {}
      acc[q.category][q.difficulty] = (acc[q.category][q.difficulty] || 0) + 1
      return acc
    }, {})
  }

  /**
   * Get the number of questions belonging to the selected category for pie chart
   * @param {*} questions
   * @param {*} selectedCategory
   * @returns {selected: number, total: number}
   */
  function getCategoryCounts(questions, selectedCategory) {
    if (!questions) return {}
    const total = questions.length
    if (selectedCategory === 'all') {
      return { total }
    }
    const selected = questions.filter(q => q.category === selectedCategory).length
    return { selected, total }
  }

  /**
   * Get the distribution of questions by difficulty level belonging to the selected category for pie chart
   * @param {*} questions
   * @param {*} selectedCategory
   * @returns {easy: number, medium: number, hard: number}
   */
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
     * Extract unique categories from the fetched questions and sort alphabetically for dropdown
     */
    useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=50')
      .then(res => res.json())
      .then(json => {
        // Decode HTML entities in category names
        const decodedQuestions = json.results?.map(q => ({
        ...q,
        category: he.decode(q.category),
      }));
        setQuestions(decodedQuestions)
        setSelectedCategory('all')

        const uniqueCategories = [...new Set(decodedQuestions.map(q => q.category))]
        uniqueCategories.sort()
        setCategories(uniqueCategories)

        const categoryDifficultyCounts = getCategoryDifficultyCounts(decodedQuestions)
        setCategoryDifficultyDistribution(categoryDifficultyCounts)
      })
      .catch(err => console.error(err))
  }, [])

  /**
   * Update categoryCounts and difficultyCounts when selected category changes
   */
  useEffect(() => {
    setCategoryCounts(getCategoryCounts(questions || [], selectedCategory))
    setDifficultyCounts(getDifficultyCounts(questions || [], selectedCategory))
  }, [selectedCategory, questions])

  return (
    <>
      <h1>OpenTDB Visualisation Tool</h1>
      <select id="category-select" onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
        <option value="all">All Categories</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>{category}</option>
        ))}
      </select>
      <div className="mix-chart-container">
        {selectedCategory === 'all' ? (
          <DistributionMixBarChart data={categoryDifficultyDistribution} />
        ) : (
          <div>
          <button
            id="back-button"
            onClick={() => setSelectedCategory('all')}
          >
            Back to All Categories
          </button>
        <div className="pie-chart-container">
          <div className="pie-chart">
            <DistributionPieChart
              data={categoryCounts}
              chartTitle={`Category Count: ${categoryCounts.selected || 0}/${categoryCounts.total || 0}`}
            />
          </div>

          <div className="pie-chart">
            <DistributionPieChart
              data={difficultyCounts}
              chartTitle={"Difficulty Breakdown"}
            />
          </div>
        </div>
        </div>
        )}
      </div>
    </>
  )
}

export default App
