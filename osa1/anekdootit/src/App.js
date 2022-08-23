import { useState } from 'react'


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
  const [votes, setVotes] = useState([0,0,0,0,0,0,0])

  let len = anecdotes.length
  const [selected, setSelected] = useState(0)

  const handleVote = () => {
    let newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  return (
    <div>
      <h1>anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <Votes votes={votes} ind={selected}/>
      <Button text="ok" handleClick={() => {setSelected(getRandomInt(0, len))}}/>
      <Button text="vote" handleClick={handleVote}/>
      <h2>anecdote with the most votes</h2>
      <MostVotes votes={votes} an={anecdotes}/>
    </div>

  )
}

const Button = ({text, handleClick}) => {
  return <button onClick={handleClick}>
    {text}
  </button>
}

const Votes = ({votes, ind}) => {
  if (votes[ind] === 1) return <p>has {votes[ind]} vote</p> 
  return <VotesLine votes={votes} ind={ind} />
}

const VotesLine = ({votes, ind}) => {
  return <p>has {votes[ind]} votes</p>
}

const MostVotes = ({votes, an}) => {
  let most = Math.max(...votes)
  if (most === 0) return <p>none yet</p>
  let winner = votes.indexOf(most)
  return <div>
    <p>{an[winner]}</p>
    <VotesLine votes={votes} ind={winner}/>
  </div>
}


//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}


export default App