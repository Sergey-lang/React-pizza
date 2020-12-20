import {combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {filtersReducer} from './reducers/filters-reducer'
import {pizzasReducer} from './reducers/pizzas-reducer'
import {cartReducer} from './reducers/cart-reducer'
import {configureStore} from '@reduxjs/toolkit'

const rootReducer = combineReducers({
   filters: filtersReducer,
   pizzas: pizzasReducer,
   cart: cartReducer,
})

export type AppStateType = ReturnType<typeof rootReducer>
export default rootReducer

export const store = configureStore({
   reducer: rootReducer,
   middleware: getDefaultMiddleware => getDefaultMiddleware()
       .prepend(thunkMiddleware)
})

//@ts-ignore
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
// export let store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))



