import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {PizzaItemType} from './pizzas-reducer'
import {objForCart} from '../../u3-components/PizzaBlock/PizzaBlock'
import {map, reduce} from 'lodash';
import {AppStateType} from '../store';

export type ItemArray = {
    [key: string]: Array<PizzaItemType>
}

const initialState = {
    items: {} as ItemArray,
    totalPrice: 0,
    itemsCount: 0,
}

export type CartInitialState = typeof initialState

export const addToCart = createAsyncThunk('cart/addToCart', (pizzaItem: objForCart, thunkAPI) => {
    const pizzas = (thunkAPI.getState() as AppStateType).pizzas.items;
    const pizzaObj = pizzas && pizzas.find((obj: { id: number }) => obj.id === pizzaItem.id)
    if (pizzaObj) {
        return {pizzaItem: pizzaObj}
    } else {
        return {pizzaItem: {} as PizzaItemType}
    }
})

const slice = createSlice({
    name: 'cart',
    initialState: {
        items: {} as ItemArray,
        totalPrice: 0,
        itemsCount: 0,
    },
    reducers: {
        plusItem(state, action: PayloadAction<{ id: number }>) {
            state.items[action.payload.id].push(state.items[action.payload.id][0])

            const result = reduce(map(state.items), (prev, cur) => prev.concat(cur as never), []);
            state.totalPrice = result.reduce((total: number, obj: PizzaItemType) => obj.price + total, 0);
            state.itemsCount = result.length;
        },
        minusItem(state, action: PayloadAction<{ id: number }>) {
            if (state.items[action.payload.id].length > 1) {
                state.items[action.payload.id].shift()

                const result = reduce(map(state.items), (prev, cur) => prev.concat(cur as never), []);
                state.totalPrice = result.reduce((total: number, obj: PizzaItemType) => obj.price + total, 0);
                state.itemsCount = result.length;
            }
        },
        removeItemsById(state, action: PayloadAction<{ id: number }>) {

            delete state.items[action.payload.id]

            const result = reduce(map(state.items), (prev, cur) => prev.concat(cur as never), []);
            state.totalPrice = result.reduce((total: number, obj: PizzaItemType) => obj.price + total, 0);
            state.itemsCount = result.length;
        },
        clearItems(state) {
            state.items = {}

            const result = reduce(map(state.items), (prev, cur) => prev.concat(cur as never), []);
            state.totalPrice = result.reduce((total: number, obj: PizzaItemType) => obj.price + total, 0);
            state.itemsCount = result.length;
        },
    },
    extraReducers: builder => {
        builder.addCase(addToCart.fulfilled, (state, action) => {
                if (!state.items[action.payload.pizzaItem.id]) {
                    state.items[action.payload.pizzaItem.id] = []
                }
                state.items[action.payload.pizzaItem.id].push(action.payload.pizzaItem)

                const result = reduce(map(state.items), (prev, cur) => prev.concat(cur as never), []);
                state.totalPrice = result.reduce((total: number, obj: PizzaItemType) => obj.price + total, 0);
                state.itemsCount = result.length;
            })
    }
})

export const cartReducer = slice.reducer
export const {plusItem, minusItem, removeItemsById, clearItems} = slice.actions
