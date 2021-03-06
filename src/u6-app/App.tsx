import * as React from 'react'
import {Route} from 'react-router-dom'
import {Cart} from '../u5-pages/Cart'
import {Home} from '../u5-pages/Home'
import {Header} from '../u3-components/Header'

import './App.css'

export const path = {
    CART: '/cart',
    HOME: '/'
}

export const App: React.FC = () => {

   return (
       <div className="App">
          <div className="wrapper">
             <Header/>
             <div className="content">
                <Route exact path={path.HOME} render={() => <Home/>}/>
                <Route exact path={path.CART} render={() => <Cart />}/>
             </div>
          </div>
       </div>
   )
}



