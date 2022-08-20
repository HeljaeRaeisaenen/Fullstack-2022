const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course}/>
      <Content parts={parts}/>
      <Total parts={parts}/>
      
    </div>
  )
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )

}

const Content = (props) => {
  return (
    <div>
      <Part part={props.parts[0].name} exerc={props.parts[0].exercises}/>
      <Part part={props.parts[1].name} exerc={props.parts[1].exercises}/>
      <Part part={props.parts[2].name} exerc={props.parts[2].exercises}/>    
      </div>
    
    )
}

const Part = (props) => {
  return (
    <p>{props.part} {props.exerc}</p>
  )
}

const Total = (props) => {
  let sum = 0
  props.parts.forEach(value => {
    sum += value.exercises    
  })
  return (
    <p>
      <p>Number of exercises {sum}</p>
    </p>
  )
}

export default App