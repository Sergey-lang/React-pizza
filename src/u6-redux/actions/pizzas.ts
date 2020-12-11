import {PizzaType} from '../../App'

export type PizzasActionsType =
    ReturnType<typeof setPizzas>

export const setPizzas = (items: PizzaType[]) => ({
   type: 'pizzas/SET_PIZZAS',
   payload: items,
} as const)


