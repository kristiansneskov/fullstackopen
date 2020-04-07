import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Statistics = ({good, neutral, bad, all}) => {
  const sum = all.reduce((a, b) => a + b, 0);
  const calcAverage = () => {
    if (all.length === 0) {
      return 0
    }
    return sum / all.length
  }
  const calcRatio = () => {
    if (all.length === 0) {
      return 0
    }
    return 100 * (good / all.length)
  }
  return (
    <div>
      <h2>Statistics</h2>
      <p>Good {good}</p>
      <p>Neutral {neutral}</p>
      <p>Bad {bad}</p>
      <p>Total {good+bad+neutral}</p>
      <p>Avg. {calcAverage()}</p>
      <p>Positive {calcRatio()} %</p>
    </div>
  )
}

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
)

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allReviews, setAll] = useState([])


  const handleGoodClick = () => {
    setAll(allReviews.concat(1))
    setGood(good + 1)
  }
  const handleBadClick = () => {
    setAll(allReviews.concat(-1))
    setBad(bad + 1)
  }
  const handleNeutralClick = () => {
    setAll(allReviews.concat(0))
    setNeutral(neutral + 1)
  }
  return (
    <div>
      <h2>Give feedback</h2>
      <Button text='good' handleClick={handleGoodClick}/>
      <Button text='neutral' handleClick={handleNeutralClick}/>
      <Button text='bad' handleClick={handleBadClick}/>
      <Statistics good={good} bad={bad} neutral={neutral} all={allReviews}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))