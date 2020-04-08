import React from 'react';

const Course = ({name, parts}) => (
    <div>
        <Header course={name}/>
        <Content parts={parts}/>
        <Total parts={parts} />
     </div>
  )
  
  const Header = (props) => {
    console.log(props)
    return (
      <h1>{props.course}</h1>
    )
  }
  const Content = ({parts}) => {
    console.log(parts)
  
    return (
      <div>
        {parts.map((part) => <Part key={part.id} name={part.name} exercises={part.exercises}/>
        )}
      </div>
    )
  }
  const Total = ({parts}) => {
    const total = parts.reduce((accu, curr) => {
      return accu + curr.exercises
    }, 0)
  
    return (
      <p><b>Total of {total} exercises</b></p>
    )
  }
  const Part = (props) => <p>{props.name} {props.exercises}</p> 

  export default Course