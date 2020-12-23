import {isLoaded, PizzasInitialState, pizzasReducer, setItems} from './pizzas-reducer'

type PizzaType = {
   id: number
   imageUrl: string
   name: string
   types: [0, 1]
   sizes: [26, 30, 40]
   price: number
   category: number
   rating: number
}

let startState: PizzasInitialState
beforeEach(() => {
   startState = {
      items: [],
      isLoading: false,
      error: null
   }
})

test('set pizzas on page', () => {
   const pizzaObj: PizzaType[] = [
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

   const action = setItems({items: pizzaObj})

   const endState = pizzasReducer(startState, action)

   expect(endState.items.length).toEqual(2)
})

test('change sort category', () => {

   const action = isLoaded({value: true})

   const endState = pizzasReducer(startState, action)

   expect(endState.isLoading).toBeTruthy()
})
