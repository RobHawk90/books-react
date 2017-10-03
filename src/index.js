import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import './index.css'

import App from './App'
import Home from './Home'
import AuthorBox from './Author'

import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  (
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/authors" component={AuthorBox} />
        <Route path="/books" />
      </Route>
    </Router>
  )
  , document.getElementById('root')
)

registerServiceWorker()
