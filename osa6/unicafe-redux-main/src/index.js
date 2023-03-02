import React from 'react'
import ReactDOM from 'react-dom/client'
import counterReducer from './reducer'

import { createStore } from 'redux'

const store = createStore(counterReducer)

const Stats = () => {
  const state = store.getState()

  return <>
    <li key='good'>
    good: {state.good}  </li>
    <li key='ok'>
    ok: {state.ok}  </li>
    <li key='bad'>
    bad: {state.bad}  </li>
  </>
}

const App = () => {
  return <div>
    <h1>Unicafe mmielipiteet</h1>
    <button onClick={e => store.dispatch({type: 'GOOD'})}>
        good
    </button>
    <button onClick={e => store.dispatch({type: 'OK'})}>
        ok
    </button>
    <button onClick={e => store.dispatch({type: 'BAD'})}>
        bad
    </button>
    <button onClick={e => store.dispatch({type: 'ZERO'})}>
        zero
    </button>
    <h2>tilastot:</h2>
    <Stats/>
  </div>
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)