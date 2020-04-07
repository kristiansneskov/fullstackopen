import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Statistics = ({good, neutral, bad}) => {
  const sum = good + bad + neutral
  if (sum === 0) {
    return <p>No feedback given</p>
  }
  const calcAvg = ()  => {
    return ((good - bad) / sum).toFixed(1)
  }
  const calcRatio = () => {
    return (100 * good / sum).toFixed(1) + ' %'
  }
  return (
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <Statistic name='good' agg={good}/>
          <Statistic name='neutral' agg={neutral}/>
          <Statistic name='bad' agg={bad}/>
          <Statistic name='total' agg={sum}/>
          <Statistic name='average' agg={calcAvg()}/>
          <Statistic name='positive' agg={calcRatio()}/>
      </tbody>
      </table>
    </div>
  )
}

const Statistic = ({name, agg}) => <tr><td>{name}</td><td>{agg}</td></tr>
  

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
)

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const handleGoodClick = () => setGood(good + 1)
  const handleBadClick = () => setBad(bad + 1) 
  const handleNeutralClick = () => setNeutral(neutral + 1) 
  return (
    <div>
      <h2>Give feedback</h2>
      <Button text='good' handleClick={handleGoodClick}/>
      <Button text='neutral' handleClick={handleNeutralClick}/>
      <Button text='bad' handleClick={handleBadClick}/>
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))