import {FiltersActionsType} from '../actions/filters'

export type FiltersInitialState = {
   category: number
   sortBy: string
}

const initializeState: FiltersInitialState = {
   category: 0,
   sortBy: 'popular'
}

export const filtersReducer = (state: FiltersInitialState = initializeState, action: FiltersActionsType): FiltersInitialState => {
   switch (action.type) {
      case 'filters/SET_SORT_BY': {
         return {
            ...state, sortBy: action.payload,
         }
      }
      default:
         return state
   }
}



