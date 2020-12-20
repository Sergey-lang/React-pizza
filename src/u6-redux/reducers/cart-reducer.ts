import {AddCartPizzaType} from '../../u3-components/PizzaBlock/PizzaBlock'

function getTotalPrice(arr: AddCartPizzaType[]): number {
   return arr.reduce((sum: number, obj: AddCartPizzaType) => obj.price + sum, 0)
}

const _get = (obj: any, path: 'items.length' | 'totalPrice') => {
   const [firstKey, ...keys] = path.split('.')
   return keys.reduce((val: any, key: any) => {
      return val[key]
   }, obj[firstKey])
}

const getTotalSum = (obj: MainCartItemType, path: 'items.length' | 'totalPrice') => {
   return Object.values(obj).reduce((sum: number, obj: any) => {
      const value = _get(obj, path)
      return sum + value
   }, 0)
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

//Actions
export type CartActionsType =
    ReturnType<typeof addPizzaToCart> |
    ReturnType<typeof clearCart> |
    ReturnType<typeof removeCartItem> |
    ReturnType<typeof plusCartItem> |
    ReturnType<typeof minusCartItem>

export const addPizzaToCart = (pizzaObj: AddCartPizzaType) => ({
   type: 'cart/ADD_PIZZA_CART',
   payload: pizzaObj,
} as const)

export const clearCart = () => ({
   type: 'cart/CLEAR_CART',
} as const)

export const removeCartItem = (id: number) => ({
   type: 'cart/REMOVE_CART_ITEM',
   payload: id,
} as const)

export const plusCartItem = (id: number) => ({
   type: 'cart/PLUS_CART_ITEM',
   payload: id,
} as const)

export const minusCartItem = (id: number) => ({
   type: 'cart/MINUS_CART_ITEM',
   payload: id,
} as const)
