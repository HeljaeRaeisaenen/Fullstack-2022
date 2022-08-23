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
    const sum = props.course.parts.reduce(reducerjsajajsdkfgk)
  
  
  
    //console.log("sum", sum)
    return (
      <div>
        <p>Total exercises: {sum.exercises}</p>
      </div>
    )
  }
  
  function reducerjsajajsdkfgk(prev, curr) {
    //console.log(prev, prev.exercises)
    //console.log(curr, curr.exercises)
    return {exercises: prev.exercises+curr.exercises}
  }
  

export default Course