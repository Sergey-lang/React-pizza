
import {addPizzaToCart, CartInitialState, cartReducer} from './cart-reducer'

let startState: CartInitialState
beforeEach(() => {
   startState = {
      items: {
         '0': {
            items: [
               {
                  id: 1,
                  size: 30,
                  imageUrl: 'http',
                  name: 'Chicken',
                  type: 'hot',
                  price: 255
               },
               {
                  id: 2,
                  size: 30,
                  imageUrl: 'http',
                  name: 'Chicken',
                  type: 'hot',
                  price: 255
               }
            ],
            totalPrice: 250
         },
         '1': {
            items: [
               {
                  id: 1,
                  size: 30,
                  imageUrl: 'http',
                  name: 'Chicken',
                  type: 'hot',
                  price: 255
               },
               {
                  id: 2,
                  size: 30,
                  imageUrl: 'http',
                  name: 'Chicken',
                  type: 'hot',
                  price: 255
               }
            ],
            totalPrice: 250
         }
      },
      totalCount: 0,
      totalPrice: 0
   }
})

test('add new pizza type with key', () => {

   const PizzaObj = {
          id: 1,
          size: 30,
          imageUrl: 'http',
          name: 'Chicken',
          type: 'hot',
          price: 255
       }

   const actionId = 0

   const action = addPizzaToCart(PizzaObj)

   const endState = cartReducer(startState, action)

   expect(endState.items[actionId].items.length).toBe(3)
})
