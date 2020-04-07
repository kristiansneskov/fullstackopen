import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
)

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}

const MostVotes = ({votes, anecdotes}) => {
  let i = votes.indexOf(Math.max(...votes));
  return (
    <div>
      <h2>Anecdote with most votes:</h2>
      <p>{anecdotes[i]}</p>
      <p>has {votes[i]} votes</p>
    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(getRandomInt(6))
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const getAnecdote = () => {
    setSelected(getRandomInt(6))
  }

  const voteForAnecdote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy) 
  }
  console.log(selected)
  console.log(votes)

  return (
    <div>
      <h2>Anecdote of the day</h2>
        <div>{props.anecdotes[selected]}</div>
        <div>has {votes[selected]} votes</div>
      <div>
        <Button text='vote' handleClick={voteForAnecdote}/>
        <Button text='next anecdote' handleClick={getAnecdote}/>
      </div>
      <MostVotes votes={votes} anecdotes={anecdotes}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)