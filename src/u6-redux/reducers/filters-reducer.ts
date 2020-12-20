import {SortByType} from '../../u5-pages/Home'
import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export type FiltersInitialState = {
   category: number | null
   sortBy: SortByType
}

const initialState: FiltersInitialState = {
   category: null,
   sortBy: {
      name: 'популярности',
      type: 'popular',
      order: 'desc'
   }
}

const slice = createSlice({
   name: 'filters',
   initialState: initialState,
   reducers: {
      setSortBy(state, action: PayloadAction<{type: SortByType }>) {
         state.sortBy = action.payload.type
      },
      setCategory(state, action: PayloadAction<{ catIndex: number | null }>) {
         state.category = action.payload.catIndex
      },
   }
})

export const filtersReducer = slice.reducer
export const {setSortBy, setCategory} = slice.actions
