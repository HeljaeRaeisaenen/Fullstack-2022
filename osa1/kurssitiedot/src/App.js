const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course}/>
      <Content part1={part1} part2={part2} part3={part3}/>
      <Total e1={part1.exercises} e2={part2.exercises} e3={part3.exercises}/>
      
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
      <Part part={props.part1.name} exerc={props.part1.exercises}/>
      <Part part={props.part2.name} exerc={props.part2.exercises}/>
      <Part part={props.part3.name} exerc={props.part3.exercises}/>    
      </div>
    
    )
}

const Part = (props) => {
  return (
    <p>{props.part} {props.exerc}</p>
  )
}

const Total = (props) => {
  return (
    <p>
      <p>Number of exercises {props.e1 + props.e2 + props.e3}</p>
    </p>
  )
}

export default App