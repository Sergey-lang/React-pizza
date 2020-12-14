import {FiltersActionsType} from '../actions/filters'
import {SortByType} from '../../u5-pages/Home'

export type FiltersInitialState = {
   category: number | null
   sortBy: SortByType
}

const initializeState: FiltersInitialState = {
   category: null,
   sortBy: {
      name: 'популярности',
      type: 'popular',
      order: 'desc'
   }
}

export const filtersReducer = (state: FiltersInitialState = initializeState, action: FiltersActionsType): FiltersInitialState => {
   switch (action.type) {
      case 'filters/SET_SORT_BY': {
         return {
            ...state, sortBy: action.payload
         }
      }
      case 'filters/SET_CATEGORY': {
         return {
            ...state, category: action.payload
         }
      }
      default:
         return state
   }
}



