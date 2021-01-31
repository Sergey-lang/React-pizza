import {
   fetchPizzas,
   isError,
   isLoaded,
   isLoading,
   PizzaItemType,
   PizzasInitialState,
   pizzasReducer,
} from './pizzas-reducer'

let startState: PizzasInitialState
beforeEach(() => {
   startState = {
      items: [],
      isLoading: false,
      error: null
   }
})

test('set pizzas array on  main page', () => {
   const items: PizzaItemType[] = [
      {
         'id': 8,
         'imageUrl': 'https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/ec29465e-606b-4a04-a03e-da3940d37e0e.jpg',
         'name': 'Четыре сезона',
         'types': [0, 1],
         'sizes': [26, 30, 40],
         'price': 395,
         'category': 5,
         'rating': 10
      },
      {
         'id': 9,
         'imageUrl': 'https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/30367198-f3bd-44ed-9314-6f717960da07.jpg',
         'name': 'Овощи и грибы 🌱',
         'types': [0, 1],
         'sizes': [26, 30, 40],
         'price': 285,
         'category': 5,
         'rating': 7
      }
   ]

   const endState = pizzasReducer(startState, fetchPizzas.fulfilled({items}, 'requestId', { category: 5, sortBy: 'name' }))

   expect(endState.items.length).toEqual(2)
})

test('loading status should be change, to be "false"', () => {

   const action = isLoaded()

   const endState = pizzasReducer(startState, action)

   expect(endState.isLoading).toBeFalsy()
})

test('loading status should be change, to be "true"', () => {

   const action = isLoading()

   const endState = pizzasReducer(startState, action)

   expect(endState.isLoading).toBeTruthy()
})

test('show error in console if request to json has mistakes', () => {

   const action = isError({error: 'request mistake'})

   const endState = pizzasReducer(startState, action)

   expect(endState.isLoading).toBeFalsy()
   expect(endState.error).toBe('request mistake')
})

