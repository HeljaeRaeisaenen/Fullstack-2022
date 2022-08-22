import { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  let total = good+neutral+bad

  return (
    <div>
      <h1>give feedback</h1>
      <p>
        <Button text="good" handleClick={() => setGood(good+1)}/>
        <Button text="neutral" handleClick={() => setNeutral(neutral+1)}/>
        <Button text="bad" handleClick={() => setBad(bad+1)}/>
      </p>
      <Statistics good={good} neutral={neutral} bad={bad} total={total}/>
    </div>
  )
}

const Button = ({text, handleClick}) => {
  return <button onClick={handleClick}>
    {text}
  </button>
}

const Statistics = ({good, neutral, bad, total}) => {
  if (total === 0) return <p>no feedback given</p>
  return(
  <div>
    <h2>statistics</h2>
    <table>
      <tbody>
        <StatisticLine text="good" value={good}/>
        <StatisticLine text="neutral" value={neutral}/>
        <StatisticLine text="bad" value={bad}/>
        <StatisticLine text="all" value={total}/>
        <StatisticLine text="average" value={
          <AverageClicks good={good} bad={bad} total={total}/>
        }/>
        <StatisticLine text="positive" value={
          <PositiveClicks good={good} total={total}/> 
        }/>
      </tbody>
    </table>
  </div>
  )
}

const StatisticLine = ({text, value}) => {
  return <tr><td>{text}</td><td>{value}</td></tr>
}

const AverageClicks = ({good, bad, total}) => {
  return ((good + (0-bad)) / total)
}

const PositiveClicks = ({good, total}) => {
  return `${(good / total)*100}%`
}

export default App