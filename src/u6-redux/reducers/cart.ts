import {CartActionsType} from '../actions/cart'
import {AddCartPizzaType} from '../../u3-components/PizzaBlock/pizzaBlock'

type Value = {
   items: Array<AddCartPizzaType>
   totalPrice: number
}

export type CartItem = {
   [key: string]: Value
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

function getTotalPrice(arr: any): number {
   return arr.reduce((sum: number, obj: any) => obj.price + sum, 0)
}

export const cartReducer = (state: CartInitialState = initializeState, action: CartActionsType): CartInitialState => {
   switch (action.type) {
      case 'cart/ADD_PIZZA_CART': {
         const currentPizzaItems = !state.items[action.payload.id] //check key
             ? [action.payload] //create array
             : [...state.items[action.payload.id].items, action.payload]
         //items:[{obj},{obj},{obj}]

         const newItems = {
            ...state.items,
            [action.payload.id]: {
               items: currentPizzaItems,
               totalPrice: getTotalPrice(currentPizzaItems)
            }
         }
         //items:{'0':{items:[{obj},{obj},{obj}]}}

         const items = Object.values(newItems).map((obj: any) => obj.items)
         const allPizzas = [].concat.apply([], items)

         const totalPrice = getTotalPrice(allPizzas)

         return {
            ...state,
            items: newItems, //items: {items: [{obj},{obj},{obj}].length}
            totalCount: allPizzas.length,
            totalPrice,
         }
      }
      default:
         return state
   }
}



