import React from 'react'
import {Route} from 'react-router-dom'

import './App.css'

import {Home, Cart, Header} from './u5-pages'

function App() {

   return (
       <div className="App">
          <div className="wrapper">
             <Header/>
             <div className="content">
                <Route exact path='/' component={Home}/>
                <Route exact path='/cart' component={Cart}/>
             </div>
          </div>
       </div>
   )
}

export default App
