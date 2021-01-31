import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import axios from 'axios'
import {FiltersInitialState} from './filters-reducer'

export type PizzaItemType = {
    id: number
    imageUrl: string
    name: string
    types: [0, 1]
    sizes: [26, 30, 40]
    price: number
    category: number
    rating: number
}

type ErrorType = null | string

const initialState = {
    items: [] as Array<PizzaItemType>,
    isLoading: false,
    error: null as ErrorType
}

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

export type PizzasInitialState = typeof initialState

const slice = createSlice({
    name: 'pizzas',
    initialState: initialState,
    reducers: {
        isLoading(state) {
            state.isLoading = true
        },
        isLoaded(state) {
            state.isLoading = false
        },
        isError(state, acton: PayloadAction<{ error: null | string }>) {
            state.isLoading = false
            state.error = acton.payload.error
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                if (action.payload) {
                    state.items = action.payload.items
                }
                state.isLoading = false
            })
    }
})

export const pizzasReducer = slice.reducer
export const {isLoaded, isLoading, isError} = slice.actions