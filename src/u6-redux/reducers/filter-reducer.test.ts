import {FiltersInitialState, filtersReducer, setCategory, setSortBy} from './filters-reducer'

let startState: FiltersInitialState;
beforeEach(() => {
   startState = {
      category: 1,
      sortBy: 'rating'
   }
})

test('set category', () => {
   const action = setCategory({catIndex: 2})

   const endState = filtersReducer(startState,action)

   expect(endState.category).toEqual(2)
})

test('change sort category', () => {

   const action = setSortBy({name:'name'})

   const endState = filtersReducer(startState,action)

   expect(endState.sortBy).toBe('name')
})
