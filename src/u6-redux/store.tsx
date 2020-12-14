import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk'
import {filtersReducer} from './reducers/filters'
import {pizzasReducer} from './reducers/pizzas'

const rootReducer = combineReducers({
   filters: filtersReducer,
   pizzas: pizzasReducer,
})

export type AppStateType = ReturnType<typeof rootReducer>
export default rootReducer

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export let store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))



