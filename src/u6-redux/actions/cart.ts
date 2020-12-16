import {AddCartPizzaType} from '../../u3-components/PizzaBlock'

export type CartActionsType =
    ReturnType<typeof addPizzaToCart>

export const addPizzaToCart = (pizzaObj: AddCartPizzaType) => ({
   type: 'cart/ADD_PIZZA_CART',
   payload: pizzaObj,
} as const)


