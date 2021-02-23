import {createAsyncThunk} from '@reduxjs/toolkit';
import {objForCart} from '../PizzaBlock/PizzaBlock';
import {AppStateType} from '../../u6-redux/store';
import {PizzaItemType} from '../PizzaBlock/pizzas-reducer';

export const addToCart = createAsyncThunk('cart/addToCart', (pizzaItem: objForCart, thunkAPI) => {
    const pizzas = (thunkAPI.getState() as AppStateType).pizzas.items;
    const pizzaObj = pizzas && pizzas.find((obj: { id: number }) => obj.id === pizzaItem.id)
    if (pizzaObj) {
        return {pizzaItem: pizzaObj}
    } else {
        return {pizzaItem: {} as PizzaItemType}
    }
})
