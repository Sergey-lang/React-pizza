import * as React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {setCategory, setSortBy} from '../u3-components/SortPopup/filters-reducer'
import {fetchPizzas} from '../u3-components/PizzaBlock/pizzas-reducer'
import {Categories} from '../u3-components/Categories/Categories'
import {FilterItemType, SortPopup} from '../u3-components/SortPopup/SortPopup'
import {objForCart, PizzaBlock} from '../u3-components/PizzaBlock/PizzaBlock'
import {addToCart} from '../u3-components/CartItem/cart-reducer';
import {cartSelectors} from '../u3-components/CartItem';
import {pizzaSelectors} from '../u3-components/PizzaBlock';
import {filterSelectors} from '../u3-components/SortPopup';

export const Home: React.FC = (props) => {
   const dispatch = useDispatch()

   const pizzasItems = useSelector(pizzaSelectors.pizzasItemsSelectors)
   const pizzaIsLoading = useSelector(pizzaSelectors.pizzaIsLoadingSelectors)
   const cartItems = useSelector(cartSelectors.cartItemsSelectors)
   const filters = useSelector(filterSelectors.filtersSelectors)

   const addItemsToCart = React.useCallback((obj: objForCart) => dispatch(addToCart(obj))
   , [dispatch])

   const selectCategory = React.useCallback((index: number | null) => dispatch(setCategory({catIndex: index}))
       , [dispatch])

   const selectSort = React.useCallback((filterObj: FilterItemType) => dispatch(setSortBy({name: filterObj.value}))
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



