import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import store from './store'

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
	root.render(
		<Router>
			<Provider store={store}>
				<App />
			</Provider>
		</Router>
	)
}
store.subscribe(() => console.log(store.getState()))

renderApp()
store.subscribe(renderApp)
