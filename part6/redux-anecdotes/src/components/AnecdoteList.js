import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { notificationCreate } from '../reducers/notificationReducer'

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
  const anecdotes = useSelector(state => [...state.anecdotes].sort((a, b) => b.votes - a.votes))
  const filter = useSelector(state => state.filter)
  const filteredAnecdotes = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter))
  const dispatch = useDispatch()

  return (
    <div>
      {filteredAnecdotes.map(anecdote => {
          const handleClick = () => {
            dispatch(voteForAnecdote(anecdote))
            dispatch(notificationCreate(`You voted '${anecdote.content}'`, 5))
          }
          return <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={handleClick} />        
        }
      )}
    </div>
  )
}

export default AnecdoteList