import {CartActionsType} from '../actions/cart'
import {AddCartPizzaType} from '../../u3-components/PizzaBlock'

type CartItem = {
   [key: string]: Array<AddCartPizzaType>
}

export type CartInitialState = {
   items: CartItem
   totalPrice: number
   totalCount: number
}

const initializeState: CartInitialState = {
   items: {},
   totalPrice: 0,
   totalCount: 0,
}

export const cartReducer = (state: CartInitialState = initializeState, action: CartActionsType): CartInitialState => {
   switch (action.type) {
      case 'cart/ADD_PIZZA_CART': {
         const newItems = {
            ...state.items,
            [action.payload.id]: !state.items[action.payload.id]
                ? [action.payload]
                : [...state.items[action.payload.id], action.payload]
         }

         const allPizzas = [].concat.apply([], Object.values(newItems))

         const totalPrice = allPizzas.reduce((sum, obj:AddCartPizzaType) => obj.price + sum, 0)

         return {
            ...state,
            items: newItems,
            totalCount: allPizzas.length,
            totalPrice,
         }
      }
      default:
         return state
   }
}



