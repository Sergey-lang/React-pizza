import {CartActionsType} from '../actions/cart'
import {AddCartPizzaType} from '../../u3-components/PizzaBlock/pizzaBlock'

function getTotalPrice<T>(arr: T[]): number {
   return arr.reduce((sum: number, obj: AddCartPizzaType[] | any) => obj.price + sum, 0)
}

const _get = (obj: any, path: any) => {
   const [firstKey, ...keys] = path.split('.')
   return keys.reduce((val: any, key: any) => {
      return val[key]
   }, obj[firstKey])
}

const getTotalSum = (obj: any, path: any) => {
   return Object.values(obj).reduce((sum, obj) => {
      const value = _get(obj, path)
      return sum + value
   }, 0)
}

export const cartReducer = (state: CartInitialState = initializeState, action: CartActionsType): CartInitialState => {
   switch (action.type) {

      case 'cart/ADD_PIZZA_CART': {
         const currentPizzaItems = !state.items[action.payload.id]
             ? [action.payload]
             : [...state.items[action.payload.id].items, action.payload]

         const newItems = {
            ...state.items,
            [action.payload.id]: {
               items: currentPizzaItems,
               totalPrice: getTotalPrice(currentPizzaItems)
            }
         }

         const totalCount = getTotalSum(newItems, 'items.length')
         const totalPrice = getTotalSum(newItems, 'totalPrice')

         return {
            ...state,
            items: newItems,
            totalCount,
            totalPrice,
         }
      }

      case 'cart/REMOVE_CART_ITEM': {
         const newItems = {
            ...state.items
         }
         const currentTotalPrice = newItems[action.payload].totalPrice
         const currentTotalCount = newItems[action.payload].items.length
         delete newItems[action.payload]
         return {
            ...state,
            items: newItems,
            totalPrice: state.totalPrice - currentTotalPrice,
            totalCount: state.totalCount - currentTotalCount
         }
      }

      case 'cart/CLEAR_CART': {
         return {totalCount: 0, totalPrice: 0, items: {}}
      }

      case 'cart/PLUS_CART_ITEM': {
         const newObjItems = [
            ...state.items[action.payload].items,
            state.items[action.payload].items[0]
         ]

         const newItems = {
            ...state.items,
            [action.payload]: {
               items: newObjItems,
               totalPrice: getTotalPrice(newObjItems)
            }
         }

         const totalCount = getTotalSum(newItems, 'items.length')
         const totalPrice = getTotalSum(newItems, 'totalPrice')

         return {
            ...state,
            items: newItems,
            totalCount,
            totalPrice
         }
      }

      case 'cart/MINUS_CART_ITEM': {
         const oldItems = state.items[action.payload].items
         const newObjItems = oldItems.length > 1
             ? state.items[action.payload].items.slice(1)
             : oldItems

         const newItems = {
            ...state.items,
            [action.payload]: {
               items: newObjItems,
               totalPrice: getTotalPrice(newObjItems)
            }
         }

         const totalCount = getTotalSum(newItems, 'items.length')
         const totalPrice = getTotalSum(newItems, 'totalPrice')

         return {
            ...state,
            items: newItems,
            totalCount,
            totalPrice
         }
      }
      default:
         return state
   }
}

type ItemsKeyValue = {
   items: Array<AddCartPizzaType>
   totalPrice: number
}

export type MainCartItemType = {
   [key: string]: ItemsKeyValue
}

export type CartInitialState = {
   items: MainCartItemType
   totalPrice: any
   totalCount: any
}

const initializeState: CartInitialState = {
   items: {},
   totalPrice: 0,
   totalCount: 0,
}



