import * as React from 'react'
import {Route} from 'react-router-dom'

import './App.css'

import {Cart, Header, Home} from './u5-pages'

//Types
export type Rating = 1 | 2 | 3 | 5 | 6 | 7 | 8 | 9 | 10
export type PizzaType = {
   id: number
   imageUrl: string
   name: string
   types: number[]
   sizes: number[]
   price: number
   category: number
   rating: Rating
}

const App: React.FC = () => {

   return (
       <div className="App">
          <div className="wrapper">
             <Header/>
             <div className="content">
                <Route exact path='/' render={() => <Home/>}/>
                <Route exact path='/cart' render={() => <Cart/>}/>
             </div>
          </div>
       </div>
   )
}

export default App



