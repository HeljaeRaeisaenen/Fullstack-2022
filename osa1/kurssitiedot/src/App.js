const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }

  return (
    <div>
      <Header course={course}/>
      <Content course={course}/>
      <Total course={course}/>
      
    </div>
  )
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.course.name}</h1>
    </div>
  )

}

const Content = (props) => {
  return (
    <div>
      <Part part={props.course.parts[0].name} exerc={props.course.parts[0].exercises}/>
      <Part part={props.course.parts[1].name} exerc={props.course.parts[1].exercises}/>
      <Part part={props.course.parts[2].name} exerc={props.course.parts[2].exercises}/>    
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
  props.course.parts.forEach(value => {
    sum += value.exercises    
  })
  return (
    <p>
      <p>Number of exercises {sum}</p>
    </p>
  )
}

export default App