import React from 'react';

const Course = ({ course }) => (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total sum={course.parts.map(part => part.exercises).reduce((a, b) => a + b, 0)} />
    </div>
  )
  
  const Header = ({ name }) => (
    <h2>{name}</h2>
  )
  
  const Content = ({ parts }) => (
    <div>
      {parts.map(part => <Part key={part.id} part={part} />)}
    </div>
  )
  
  const Part = ({ part }) => (
    <p>
      {part.name} {part.exercises}
    </p>
  )
  
  const Total = ({ sum }) => (
    <p><b>total of {sum} exercises</b></p>
  )

  export default Course