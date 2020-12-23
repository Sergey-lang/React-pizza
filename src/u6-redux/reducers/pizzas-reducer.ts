import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Dispatch} from 'redux'
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

export type PizzasInitialState = typeof initialState

const slice = createSlice({
   name: 'pizzas',
   initialState: initialState,
   reducers: {
      setItems(state, action: PayloadAction<{ items: PizzaItemType[] }>) {
         state.items = action.payload.items
         state.isLoading = false
      },
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
   }
})

export const pizzasReducer = slice.reducer
export const {setItems, isLoaded, isLoading, isError} = slice.actions

//Thunk
export const fetchPizzas = (filters: FiltersInitialState) => (dispatch: Dispatch) => {
   dispatch(isLoading())
   axios.get(`/pizzas?${filters.category ? 'category=' + filters.category + '&' : ''}_sort=${filters.sortBy}&_order=desc`)
       .then(({data}) => {
          dispatch(setItems({items: data}))
       })
       .catch(err => {
          console.error(err)
          dispatch(isError(err))
       })
}