import * as React from 'react'
import axios from 'axios'
import {Route} from 'react-router-dom'

import './App.css'

import {Cart, Header, Home} from './u5-pages'
import {useDispatch} from 'react-redux'
import {setPizzas} from './u6-redux/actions/pizzas'

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
export type GetPizzasResponse = {
   pizzas: PizzaType[]
}

const App: React.FC = () => {

   const dispatch = useDispatch()

   React.useEffect(() => {
      axios.get<GetPizzasResponse>('http://localhost:3001/db.json')
          .then(({data}) => {
             dispatch(setPizzas(data.pizzas))
          })
   }, [])

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



