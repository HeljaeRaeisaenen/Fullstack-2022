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
    <div>
      <Part part={props.parts[0]} exerc={props.exerc[0]}/>
      <Part part={props.parts[1]} exerc={props.exerc[1]}/>
      <Part part={props.parts[2]} exerc={props.exerc[2]}/>
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