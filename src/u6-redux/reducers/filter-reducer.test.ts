import {FiltersInitialState, filtersReducer, setCategory, setSortBy} from './filters-reducer'

let startState: FiltersInitialState;
beforeEach(() => {
   startState = {
      category: 1,
      sortBy: {
         name: 'популярности',
         type: 'popular',
         order: 'desc'
      }
   }
})

test('set category', () => {
   const action = setCategory({catIndex: 2})

   const endState = filtersReducer(startState,action)

   expect(endState.category).toEqual(2)
})

test('change sort category', () => {
   const sortBy = {
      name:'цене',
      type: 'price',
      order: 'desc',
   }

   const action = setSortBy({type: sortBy})

   const endState = filtersReducer(startState,action)

   expect(endState.sortBy.name).toBe('цене')
   expect(endState.sortBy.type).toBe('price')
   expect(endState.sortBy.order).toBe('desc')
})
