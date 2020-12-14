import {PizzasActionsType} from '../actions/pizzas'
import {PizzaType} from '../../App'

export type PizzasInitialState = {
   items: PizzaType[] | []
   isLoaded: boolean
}

const initializeState: PizzasInitialState = {
   items: [],
   isLoaded: false
}

export const pizzasReducer = (state: PizzasInitialState = initializeState, action: PizzasActionsType): PizzasInitialState => {
   switch (action.type) {
      case 'pizzas/SET_PIZZAS': {
         return {
            ...state, items: action.payload,
            isLoaded: true
         }
      }
      case 'pizzas/SET_LOADED': {
         return {
            ...state, isLoaded: action.payload
         }
      }
      default:
         return state
   }
}
