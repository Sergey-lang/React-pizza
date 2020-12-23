import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Dispatch} from 'redux'
import {PizzaItemType} from './pizzas-reducer'
import {objForCart} from '../../u3-components/PizzaBlock/PizzaBlock'

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
      },
      plusItem(state, action: PayloadAction<{ id: number }>) {
         state.items[action.payload.id].push(state.items[action.payload.id][0])
      },
      minusItem(state, action: PayloadAction<{ id: number }>) {
         if (state.items[action.payload.id].length > 1) {
            state.items[action.payload.id].shift()
         }
      },
      removeItemsById(state, action: PayloadAction<{ id: number }>) {
         delete state.items[action.payload.id]
      },
      clearItems(state) {
         state.items = {}
      },
   }
})

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
