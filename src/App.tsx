import * as React from 'react'
import axios from 'axios'
import {Route} from 'react-router-dom'

import './App.css'

import {Home, Cart, Header} from './u5-pages'
import {AppStateType} from './u6-redux/reducers'
import {connect} from 'react-redux'
import {setPizzas} from './u6-redux/actions/pizzas'
import {FiltersInitialState} from './u6-redux/reducers/filters'

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
type OwnPropsType = MapStateType & MapDispatchType

class App extends React.Component<OwnPropsType> {

   componentDidMount() {
         axios.get<GetPizzasResponse>('http://localhost:3001/db.json')
             .then(({data}) => {
                this.props.setPizzas(data.pizzas)
             })
   }

   render() {
      return (
          <div className="App">
             <div className="wrapper">
                <Header/>
                <div className="content">
                   <Route exact path='/' render={() => <Home items={this.props.items}/>}/>
                   <Route exact path='/cart' render={() => <Cart/>}/>
                </div>
             </div>
          </div>
      )
   }
}

type MapDispatchType = {
   setPizzas: (items: PizzaType[]) => void
}
type MapStateType = {
   items: Array<PizzaType>
   filters: FiltersInitialState
}
const mapStateToProps = (state: AppStateType): MapStateType => ({
   items: state.pizzas.items,
   filters: state.filters
})

export default connect<MapStateType, MapDispatchType, {}, AppStateType>(mapStateToProps,{setPizzas}) (App)


// const App: React.FC = () => {
//
//    // const [pizzas, setPizzas] = React.useState<Array<PizzaType>>([])
//
//    React.useEffect(() => {
//       axios.get<GetPizzasResponse>('http://localhost:3001/db.json')
//           .then(({data}) => {
//              setPizzas(data.pizzas)
//           })
//    }, [])
//
//    return (
//        <div className="App">
//           <div className="wrapper">
//              <Header/>
//              <div className="content">
//                 <Route exact path='/' render={() => <Home items={pizzas}/>}/>
//                 <Route exact path='/cart' render={() => <Cart/>}/>
//              </div>
//           </div>
//        </div>
//    )
// }
//
// export default App