import * as React from 'react'
import {Route} from 'react-router-dom'
import {Cart} from './u5-pages/Cart'
import {Home} from './u5-pages/Home'
import {Header} from './u3-components/Header/Header'

import './App.css'

export const App: React.FC = () => {

   return (
       <div className="App">
          <div className="wrapper">
             <Header/>
             <div className="content">
                <Route exact path='/' render={() => <Home/>}/>
                <Route exact path='/cart' render={() => <Cart />}/>
             </div>
          </div>
       </div>
   )
}



