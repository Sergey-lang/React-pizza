import * as React from 'react'

import {Categories, PizzaBlock, SortPopup} from '../u3-components'
import {PizzaType} from '../App'
import {useDispatch, useSelector} from 'react-redux'
import {setCategory, setSortBy} from '../u6-redux/actions/filters'
import {fetchPizzas} from '../u6-redux/actions/pizzas'
import LoadingBlock from '../u3-components/PizzaBlock/LoadingBlock'
import {FiltersInitialState} from '../u6-redux/reducers/filters'
import {AppStateType} from '../u6-redux/store'
import {AddCartPizzaType} from '../u3-components/PizzaBlock'
import {addPizzaToCart} from '../u6-redux/actions/cart'

const filterItems: SortByType[] = [
   {name: 'популярности', type: 'popular', order: 'desc'},
   {name: 'цене', type: 'price', order: 'desc'},
   {name: 'алфавиту', type: 'name', order: 'asc'}]

const types: string[] = ['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

const Home: React.FC = (props) => {

   const dispatch = useDispatch()
   const items = useSelector<AppStateType, PizzaType[]>(state => state.pizzas.items)
   const isLoaded = useSelector<AppStateType, boolean>(state => state.pizzas.isLoaded)
   const {category, sortBy} = useSelector<AppStateType, FiltersInitialState>(state => state.filters)

   React.useEffect(() => {
      dispatch(fetchPizzas(category, sortBy))
   }, [category, sortBy])

   const onSelectCategory = React.useCallback((index: number | null) => {
      dispatch(setCategory(index))
   }, [])

   const onSelectSortType = React.useCallback((type: SortByType) => {
      dispatch(setSortBy(type))
   }, [])

   const handleAddPizzaToCart = (obj: AddCartPizzaType) => {
      dispatch(addPizzaToCart(obj))
   }

   const mappedPizza = isLoaded
       ? items.map(obj => <PizzaBlock onClickAddPizza={handleAddPizzaToCart}
                                      key={obj.id}
                                      {...obj}/>)
       : Array(12).fill(0).map((_, index) => <LoadingBlock key={index}/>)

   return (
       <div className="container">
          <div className="content__top">
             <Categories types={types}
                         activeCategory={category}
                         onClickCategory={onSelectCategory}
             />
             <SortPopup filterItems={filterItems}
                        activeSortType={sortBy.type}
                        onClickSortType={onSelectSortType}
             />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
             {mappedPizza}
          </div>
       </div>
   )
}

export type FilterName = 'популярности' | 'цене' | 'алфавиту'
export type FilterType = 'popular' | 'price' | 'name'

export type SortByType = {
   name: FilterName
   type: FilterType
   order: 'desc' | 'asc'
}

export default Home

