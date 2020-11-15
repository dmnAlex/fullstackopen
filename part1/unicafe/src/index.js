import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = ({ text, value }) => (
  <tr>
    <td>
      {text}
    </td>
    <td>
      {value}
    </td>
  </tr>
)

const Statistics = ({ good, neutral, bad }) => {
  let all = good + neutral + bad

  return all !== 0 ? (
    <div>
      <table>
        <thead>
          <tr>
            <td>Name</td>
            <td>Value</td>
          </tr>
        </thead>
        <tbody>
          <Statistic text='good' value={good} />
          <Statistic text='neutral' value={neutral} />
          <Statistic text='bad' value={bad} />
          <Statistic text='all' value={all} />
          <Statistic text='average' value={(1 * good + 0 * neutral + (-1) * bad) / (all)} />
          <Statistic text='positive' value={good * 100 / (all)} />
        </tbody>
      </table>
    </div>
  ) :
    (
      <div>
        <p>No feedback given</p>
      </div>
    )
}

const Button = ({ text, onClick }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }
  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button text='good' onClick={handleGoodClick} />
      <Button text='neutral' onClick={handleNeutralClick} />
      <Button text='bad' onClick={handleBadClick} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)