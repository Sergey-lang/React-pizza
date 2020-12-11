import * as React from 'react'
import axios from 'axios'
import {Route} from 'react-router-dom'

import './App.css'

import {Home, Cart, Header} from './u5-pages'

//types
type Rating = 1 | 2 | 3 | 5 | 6 | 7 | 8 | 9 | 10
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
type GetPizzasResponse = {
   pizzas: PizzaType[]
}

const App: React.FC = () => {

   const [pizzas, setPizzas] = React.useState<Array<PizzaType>>([])

   React.useEffect(() => {
      axios.get<GetPizzasResponse>('http://localhost:3001/db.json')
          .then(({data}) => {
             setPizzas(data.pizzas)
          })
   }, [])

   return (
       <div className="App">
          <div className="wrapper">
             <Header/>
             <div className="content">
                <Route exact path='/' render={() => <Home items={pizzas}/>}/>
                <Route exact path='/cart' render={() => <Cart/>}/>
             </div>
          </div>
       </div>
   )
}

export default App
