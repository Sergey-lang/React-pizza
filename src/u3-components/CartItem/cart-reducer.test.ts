import {
   CartInitialState,
   cartReducer,
   clearItems,
   minusItem,
   plusItem,
   removeItemsById
} from './cart-reducer'
import {PizzaItemType} from '../PizzaBlock/pizzas-reducer'
import {addToCart} from './cart-actions';

let startState: CartInitialState
beforeEach(() => {
   startState = {
      items: {
         '0': [
            {
               'id': 0,
               'imageUrl': 'https://dodopizza.azureedge.net/static/Img/Products/f035c7f46c0844069722f2bb3ee9f113_584x584.jpeg',
               'name': 'Пепперони Фреш с перцем',
               'types': [0, 1],
               'sizes': [26, 30, 40],
               'price': 500,
               'category': 0,
               'rating': 4
            },
         ],
         '2': [
            {
               'id': 2,
               'imageUrl': 'https://dodopizza.azureedge.net/static/Img/Products/f035c7f46c0844069722f2bb3ee9f113_584x584.jpeg',
               'name': 'Пепперони Фреш с перцем',
               'types': [0, 1],
               'sizes': [26, 30, 40],
               'price': 550,
               'category': 0,
               'rating': 4
            },
            {
               'id': 2,
               'imageUrl': 'https://dodopizza.azureedge.net/static/Img/Products/f035c7f46c0844069722f2bb3ee9f113_584x584.jpeg',
               'name': 'Пепперони Фреш с перцем',
               'types': [0, 1],
               'sizes': [26, 30, 40],
               'price': 550,
               'category': 0,
               'rating': 4
            },
         ]
      },
      itemsCount: 1,
      totalPrice: 803
   }
})

test('add item to cart with index 0', () => {

   const newItem: PizzaItemType = {
      'id': 0,
      'imageUrl': 'https://dodopizza.azureedge.net/static/Img/Products/f035c7f46c0844069722f2bb3ee9f113_584x584.jpeg',
      'name': 'Test Pizza',
      'types': [0, 1],
      'sizes': [26, 30, 40],
      'price': 803,
      'category': 0,
      'rating': 4
   }

   const action = addToCart.fulfilled({pizzaItem: newItem},'requestId',newItem)

   const endState = cartReducer(startState, action)

   expect(endState.items[0].length).toBe(2)
   expect(endState.items[0][1].name).toBe('Test Pizza')
})

test('add new key for new type items,key 5 and 1 item', () => {

   const newItem: PizzaItemType = {
      'id': 5,
      'imageUrl': 'https://dodopizza.azureedge.net/static/Img/Products/f035c7f46c0844069722f2bb3ee9f113_584x584.jpeg',
      'name': 'Test Pizza key',
      'types': [0, 1],
      'sizes': [26, 30, 40],
      'price': 803,
      'category': 0,
      'rating': 4
   }

   const action = addToCart.fulfilled({pizzaItem: newItem},'requestId',newItem)

   const endState = cartReducer(startState, action)

   expect(endState.items[5].length).toBe(1)
   expect(endState.items[5][0].name).toBe('Test Pizza key')
   expect(endState.items[0][0].name).toBe('Пепперони Фреш с перцем')
})

test('total count in cart after added new item should be 4', () => {

   const newItem: PizzaItemType = {
      'id': 5,
      'imageUrl': 'https://dodopizza.azureedge.net/static/Img/Products/f035c7f46c0844069722f2bb3ee9f113_584x584.jpeg',
      'name': 'Test Pizza key',
      'types': [0, 1],
      'sizes': [26, 30, 40],
      'price': 500,
      'category': 0,
      'rating': 4
   }

   const action = addToCart.fulfilled({pizzaItem: newItem},'requestId',newItem)

   const endState = cartReducer(startState, action)

   expect(endState.items[5].length).toBe(1)
   expect(endState.items[5][0].name).toBe('Test Pizza key')
   expect(endState.items[0][0].name).toBe('Пепперони Фреш с перцем')

   expect(endState.itemsCount).toBe(4)
})

test('total price in cart after added new item should be 2100', () => {

   const newItem: PizzaItemType = {
      'id': 5,
      'imageUrl': 'https://dodopizza.azureedge.net/static/Img/Products/f035c7f46c0844069722f2bb3ee9f113_584x584.jpeg',
      'name': 'Test Pizza key',
      'types': [0, 1],
      'sizes': [26, 30, 40],
      'price': 500,
      'category': 0,
      'rating': 4
   }

   const action = addToCart.fulfilled({pizzaItem: newItem},'requestId',newItem)

   const endState = cartReducer(startState, action)

   expect(endState.items[5].length).toBe(1)
   expect(endState.items[5][0].name).toBe('Test Pizza key')
   expect(endState.items[0][0].name).toBe('Пепперони Фреш с перцем')

   expect(endState.totalPrice).toBe(2100)
})


test('increase total price and count after added new item in cart', () => {

   const action = plusItem({id: 0})

   const endState = cartReducer(startState, action)

   expect(endState.itemsCount).toBe(4)
   expect(endState.totalPrice).toBe(2100)
})

test('decrease prise and count after add new deleted', () => {

   const action = minusItem({id: 2})

   const endState = cartReducer(startState, action)

   expect(endState.itemsCount).toBe(2)
   expect(endState.totalPrice).toBe(1050)
})

test('remove items with id 2', () => {

   const action = removeItemsById({id: 2})

   const endState = cartReducer(startState, action)

   expect(endState.items[2]).toBeUndefined()
   expect(endState.itemsCount).toBe(1)
   expect(endState.totalPrice).toBe(500)
})

test('items shoudl be empty', () => {

   const action = clearItems()

   const endState = cartReducer(startState, action)

   expect(endState.items[0]).toBeUndefined()
   expect(endState.items[2]).toBeUndefined()
   expect(endState.itemsCount).toBe(0)
   expect(endState.totalPrice).toBe(0)
})
