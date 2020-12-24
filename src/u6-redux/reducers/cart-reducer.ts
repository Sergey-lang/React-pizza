import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Dispatch} from 'redux'
import {PizzaItemType} from './pizzas-reducer'
import {objForCart} from '../../u3-components/PizzaBlock/PizzaBlock'
import { reduce, map } from 'lodash';

export type ItemArray = {
   [key: string]: Array<PizzaItemType>
}

const initialState = {
   items: {} as ItemArray,
   totalPrice: 0,
   itemsCount: 0,
}

export type CartInitialState = typeof initialState

const slice = createSlice({
   name: 'cart',
   initialState: initialState,
   reducers: {
      addPizzaToCart(state, action: PayloadAction<{ pizzaItem: PizzaItemType }>) {
         if (!state.items[action.payload.pizzaItem.id]) {
            state.items[action.payload.pizzaItem.id] = []
         }
         state.items[action.payload.pizzaItem.id].push(action.payload.pizzaItem)

         const result = reduce(map(state.items), (prev, cur) => prev.concat(cur as never), []);
         state.totalPrice = result.reduce((total:number, obj:PizzaItemType) => obj.price + total, 0);
         state.itemsCount = result.length;
      },
      plusItem(state, action: PayloadAction<{ id: number }>) {
         state.items[action.payload.id].push(state.items[action.payload.id][0])

         const result = reduce(map(state.items), (prev, cur) => prev.concat(cur as never), []);
         state.totalPrice = result.reduce((total:number, obj:PizzaItemType) => obj.price + total, 0);
         state.itemsCount = result.length;
      },
      minusItem(state, action: PayloadAction<{ id: number }>) {
         if (state.items[action.payload.id].length > 1) {
            state.items[action.payload.id].shift()

            const result = reduce(map(state.items), (prev, cur) => prev.concat(cur as never), []);
            state.totalPrice = result.reduce((total:number, obj:PizzaItemType) => obj.price + total, 0);
            state.itemsCount = result.length;
         }
      },
      removeItemsById(state, action: PayloadAction<{ id: number }>) {
         delete state.items[action.payload.id]

         const result = reduce(map(state.items), (prev, cur) => prev.concat(cur as never), []);
         state.totalPrice = result.reduce((total:number, obj:PizzaItemType) => obj.price + total, 0);
         state.itemsCount = result.length;
      },
      clearItems(state) {
         state.items = {}

         const result = reduce(map(state.items), (prev, cur) => prev.concat(cur as never), []);
         state.totalPrice = result.reduce((total:number, obj:PizzaItemType) => obj.price + total, 0);
         state.itemsCount = result.length;
      },
   }
})

//redux toolkit, find  resolve call function outside slice
// const getAllPizzasArray = (state: ItemArray): Array<PizzaItemType> => {
//    return reduce(map(state.items), (prev, cur) => prev.concat(cur as never), [])
// }
//
// const getTotalPrice = (pizzasArray: Array<PizzaItemType>) => {
//    return pizzasArray.reduce((total: number, obj: PizzaItemType) => obj.price + total, 0)
// }

export const cartReducer = slice.reducer
export const {addPizzaToCart, plusItem, minusItem, removeItemsById, clearItems} = slice.actions

//Thunk
export const addToCart = (pizzaItem: objForCart) => (dispatch: Dispatch, getState: Function) => {
   //Array PizzaItemType
   const pizzas = getState().pizzas.items
   //PizzaItemType
   const pizzaObj = pizzas && pizzas.find((obj: { id: number }) => obj.id === pizzaItem.id)
   dispatch(addPizzaToCart({pizzaItem: pizzaObj}))
}
