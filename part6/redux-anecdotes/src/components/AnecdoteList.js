import React from 'react'
import { connect } from 'react-redux'
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

const AnecdoteList = (props) => {
  return (
    <div>
      {props.anecdotes.map(anecdote => {
        const handleClick = () => {
          props.voteForAnecdote(anecdote)
          props.notificationCreate(`You voted '${anecdote.content}'`, 5)
        }
        return <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={handleClick} />
      }
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  const anecdotes = state.anecdotes.sort((a, b) => b.votes - a.votes)
  const filter = state.filter
  const filteredAnecdotes = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter))
  return {
    anecdotes: filteredAnecdotes
  }
}

const mapDispatchToProps = {
  voteForAnecdote,
  notificationCreate
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)