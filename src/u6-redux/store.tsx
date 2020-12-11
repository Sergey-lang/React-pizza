import {createStore} from 'redux'
import rootReducer from './reducers'


//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export let store = createStore(rootReducer, composeEnhancers())



