import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [allQuestions, setAllQuestions] = useState(null)
  const [filteredQuestions, setFilteredQuestions] = useState(null)
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')

    /**
     * Fetch 50 questions from the Open Trivia Database API on page load
     * Extract unique categories from the fetched questions and sort alphabetically
     */
    useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=50')
      .then(res => res.json())
      .then(json => {
        setAllQuestions(json.results)
        setFilteredQuestions(json.results)
        const uniqueCategories = [...new Set(json.results.map(q => q.category))]
        uniqueCategories.sort()
        setCategories(uniqueCategories)
      })
      .catch(err => console.error(err))
  }, [])

  /**
   * Filter questions based on selected category
   */
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredQuestions(allQuestions)
    } else {
      const filtered = allQuestions?.filter(q => q.category === selectedCategory)
      setFilteredQuestions(filtered)
    }
  }, [selectedCategory])

  return (
    <>
      <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
        <option value="all">All Categories</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>{category}</option>
        ))}
      </select>
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
      <div>{filteredQuestions ? <div>{JSON.stringify(filteredQuestions)}</div> : <p>No data available</p>}</div>
    </>
  )
}

export default App
