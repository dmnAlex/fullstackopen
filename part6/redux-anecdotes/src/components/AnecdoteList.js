import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleClick }) => (
  <div>
    <div>
      {anecdote.content}
    </div>
    <div>
      has {anecdote.votes}
      <button onClick={handleClick}>vote</button>
    </div>
  </div>
)

const AnecdoteList = () => {
  const anecdotes = useSelector(state => [...state].sort((a, b) => b.votes - a.votes))
  const dispatch = useDispatch()

  return (
    <div>
      {anecdotes.map(anecdote =>
        <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={() => dispatch(voteForAnecdote(anecdote.id))} />
      )}
    </div>
  )
}

export default AnecdoteList