import React from 'react'
import ReactDOM from 'react-dom'

import './u0-scss/app.scss'
import App from './App'
import {HashRouter} from 'react-router-dom'

ReactDOM.render(
    <React.StrictMode>
       <HashRouter>
          <App/>
       </HashRouter>
    </React.StrictMode>,
    document.getElementById('root')
)
