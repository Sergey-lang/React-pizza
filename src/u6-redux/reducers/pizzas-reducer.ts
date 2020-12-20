import {PizzaType} from '../../App'
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {SortByType} from '../../u5-pages/Home'
import {Dispatch} from 'redux'
import axios from 'axios'

export type PizzasInitialState = {
   items: PizzaType[] | []
   isLoaded: boolean
}

const initialState: PizzasInitialState = {
   items: [],
   isLoaded: false
}

const slice = createSlice({
   name: 'pizzas',
   initialState: initialState,
   reducers: {
      setPizzas(state, action: PayloadAction<{ items: PizzaType[] }>) {
         state.items = action.payload.items
         state.isLoaded = true
      },
      setLoaded(state, action: PayloadAction<{ value: boolean }>) {
         state.isLoaded = action.payload.value
      },
   }
})

export const pizzasReducer = slice.reducer
export const {setPizzas, setLoaded} = slice.actions

//Thunk
export const fetchPizzas = (category: number | null, sortBy: SortByType) =>
    (dispatch: Dispatch) => {
       dispatch(setLoaded({value: true}))
       axios.get<PizzaType[]>(`/pizzas?${
           category !== null
               ? `category=${category}`
               : ''}&_sort=${sortBy.type}&_order=${sortBy.order}`)
           .then(({data}) => {
              dispatch(setPizzas({items: data}))
           })
       dispatch(setLoaded({value: false}))
    }