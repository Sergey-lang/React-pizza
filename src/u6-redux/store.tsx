import {combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {filtersReducer} from '../u3-components/SortPopup/filters-reducer'
import {pizzasReducer} from '../u3-components/PizzaBlock/pizzas-reducer'
import {cartReducer} from '../u3-components/CartItem/cart-reducer'
import {configureStore} from '@reduxjs/toolkit'

const rootReducer = combineReducers({
   filters: filtersReducer,
   pizzas: pizzasReducer,
   cart: cartReducer,
})
export type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>
export default rootReducer

export const store = configureStore({
   reducer: rootReducer,
   middleware: getDefaultMiddleware => getDefaultMiddleware()
       .prepend(thunkMiddleware)
})



