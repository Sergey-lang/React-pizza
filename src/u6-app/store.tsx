import {ActionCreatorsMapObject, bindActionCreators, combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {filtersReducer} from '../u3-components/SortPopup/filters-reducer'
import {pizzasReducer} from '../u3-components/PizzaBlock/pizzas-reducer'
import {cartReducer} from '../u3-components/CartItem/cart-reducer'
import {configureStore} from '@reduxjs/toolkit'
import {useDispatch} from 'react-redux';
import {useMemo} from 'react';

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

export type AppDispatchType = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatchType>()

export function useActions<T extends ActionCreatorsMapObject<any>>(actions: T) {
   const dispatch = useAppDispatch()

   const boundActions = useMemo(() => {
      return bindActionCreators(actions, dispatch)
   }, [])

   return boundActions
}


