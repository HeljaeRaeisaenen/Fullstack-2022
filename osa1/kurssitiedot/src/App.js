const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course}/>
      <Content 
      parts={[part1, part2, part3]} 
      exerc={[exercises1, exercises2, exercises3]} />
      <Total e1={exercises1} e2={exercises2} e3={exercises3}/>
      
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
    <p>
      <p>{props.parts[0]} {props.exerc[0]}</p>
      <p>{props.parts[1]} {props.exerc[1]}</p>
      <p>{props.parts[2]} {props.exerc[2]}</p>
    </p>
    
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