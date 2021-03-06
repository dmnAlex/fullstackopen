import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ text, onClick }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Display = ({ selected, voteCount }) => (
  <div>
    <h1>Anecdote of the day</h1>
    <p>{anecdotes[selected]}</p>
    <p>has {voteCount} votes</p>
  </div>
)

const DisplayMV = ({ votes }) => {
  let maxVotes = Math.max(...votes)

  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[votes.indexOf(maxVotes)]}</p>
      <p>has {maxVotes} votes</p>
    </div>
  )
}

const App = (props) => {
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [selected, setSelected] = useState(0)

  const handleNextClick = () => (
    setSelected(Math.floor(Math.random() * anecdotes.length))
  )

  const handleVoteClick = () => {
    const votesCopy = [...votes]

    votesCopy[selected]++
    setVotes(votesCopy)
  }

  return (
    <div>
      <Display selected={selected} voteCount={votes[selected]} />
      <Button text='vote' onClick={handleVoteClick} />
      <Button text='next anecdote' onClick={handleNextClick} />
      <DisplayMV votes={votes} />
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