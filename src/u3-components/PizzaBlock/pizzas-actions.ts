import {createAsyncThunk} from '@reduxjs/toolkit';
import {FiltersInitialState} from '../SortPopup/filters-reducer';
import axios from 'axios';
import {isError, isLoading} from './pizzas-reducer';

export const fetchPizzas = createAsyncThunk('pizzas/fetchPizzas', async (filters: FiltersInitialState, thunkAPI) => {
    thunkAPI.dispatch(isLoading())
    try {
        const {data} = await axios.get(`/pizzas?${filters.category ? 'category=' + filters.category + '&' : ''}_sort=${filters.sortBy}&_order=desc`)
        return {items: data}
    } catch (err) {
        thunkAPI.dispatch(isError(err))
        thunkAPI.rejectWithValue(err)
    }
})
