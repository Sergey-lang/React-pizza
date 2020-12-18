import {AddCartPizzaType} from '../../u3-components/PizzaBlock/pizzaBlock'

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



