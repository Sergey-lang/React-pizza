import * as React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {FiltersInitialState, setCategory, setSortBy} from '../u6-redux/reducers/filters-reducer'
import {AppStateType} from '../u6-redux/store'
import {fetchPizzas, PizzaItemType} from '../u6-redux/reducers/pizzas-reducer'
import {Categories} from '../u3-components/Categories/Categories'
import {SortPopup} from '../u3-components/SortPopup/SortPopup'
import {objForCart, PizzaBlock} from '../u3-components/PizzaBlock/PizzaBlock'
import {addToCart} from '../u6-redux/reducers/cart-reducer'

export const Home: React.FC = (props) => {
   const dispatch = useDispatch()

   const pizzasItems = useSelector<AppStateType, Array<PizzaItemType>>(state => state.pizzas.items)
   const pizzaIsLoading = useSelector<AppStateType, boolean>(state => state.pizzas.isLoading)
   const cartItems = useSelector<AppStateType, any>(state => state.cart.items)
   const filters = useSelector<AppStateType, FiltersInitialState>(state => state.filters)
   //empty object
   const addItemsToCart = React.useCallback((obj: objForCart) => dispatch(addToCart(obj)), [dispatch])

   const selectCategory = React.useCallback((index: number | null) => dispatch(setCategory({catIndex: index}))
       , [dispatch])

   const selectSort = React.useCallback((obj: any) => dispatch(setSortBy({name: obj.value}))//get object
       , [dispatch])

   const mappedPizza = pizzasItems && !pizzaIsLoading
       ? pizzasItems.map((item) => <PizzaBlock key={item.id}
                                               onAdd={addItemsToCart}
                                               cartItems={cartItems}
                                               isLoading={pizzaIsLoading}
                                               {...item}/>)
       : [...Array(8).map((_, index) => <PizzaBlock key={index} isLoading={pizzaIsLoading}/>)]

   React.useEffect(() => {
      dispatch(fetchPizzas(filters))
   }, [dispatch, filters])

   React.useEffect(() => {
      window.scroll(0, 0)
   }, [])

   return (
       <div className="container">
          <div className="content__top">
             <Categories
                 activeCategory={filters.category}
                 items={['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']}
                 onClick={selectCategory}
             />
             <SortPopup
                 sortBy={filters.sortBy}
                 onSelect={selectSort}
             />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          {console.log(pizzaIsLoading)}
          <div className="content__items">
             {
                mappedPizza
             }
          </div>
       </div>
   )
}



