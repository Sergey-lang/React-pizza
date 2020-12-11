import {combineReducers, createStore} from 'redux'
import {filtersReducer} from './filters'
import {pizzasReducer} from './pizzas'

const rootReducer = combineReducers({
   filters: filtersReducer,
   pizzas: pizzasReducer,
})

export type AppStateType = ReturnType<typeof rootReducer>
export default rootReducer