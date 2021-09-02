import React from 'react'

const Header = ( { name }) => (<h1>{name}</h1>)

const Part = ( { part }) => <p> {part.name} {part.exercises} </p>

const Total = ( { parts }) => {
  const exercises = parts.map(e => e.exercises)
  const total = exercises.reduce((s, v) => s + v, 0)

  return (
    <b>total of {total} exercises</b>
  )
}

const Content = ( { parts } ) => {
  return (
    <div>
      {parts.map(part => <Part key={part.id} part={part} />)}
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course
