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
      <h2>statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {total}</p>
      <p>
        <AverageClicks good={good} bad={bad} total={total}/> 
      </p>
      <p>
        <PositiveClicks good={good} total={total}/> 
      </p>
    </div>
  )
}

const Button = ({text, handleClick}) => {
  return <button onClick={handleClick}>
    {text}
  </button>
}



const AverageClicks = ({good, bad, total}) => {
  if (total === 0) return "average 0"
  return `average ${(good + -bad / total)}`
}

const PositiveClicks = ({good, total}) => {
  if (total === 0) return "positive 0%"
  return `positive ${good / total}%`
}

export default App