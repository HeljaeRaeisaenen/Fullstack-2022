const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'äöääöö',
        exercises: 3,
        id: 5
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

const Course = ({course}) => {
  return <div>
    <Header course={course}/>
    <Content course={course}/>
    <Total course={course}/>
  </div>
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.course.name}</h1>
    </div>
  )

}

const Content = ({course}) => {
  return (
    <div>
      {course.parts.map(note => ( <Part key={note.id} part={note.name} exerc={note.exercises} />))}
    </div>)
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