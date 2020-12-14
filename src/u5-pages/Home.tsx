import * as React from 'react'

import {Categories, PizzaBlock, SortPopup} from '../u3-components'
import {PizzaType} from '../App'
import {useDispatch, useSelector} from 'react-redux'
import {AppStateType} from '../u6-redux/reducers'
import {setCategory} from '../u6-redux/actions/filters'

export type FilterItems = {
   name: 'популярности' | 'цене' | 'алфавиту'
   type: 'popular' | 'price' | 'alphabet'
}

//if you contain data inside component it'll call rerender
const filterItems: FilterItems[] = [
   {name: 'популярности', type: 'popular'},
   {name: 'цене', type: 'price'},
   {name: 'алфавиту', type: 'alphabet'}]

const types: string[] = ['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

const Home: React.FC = (props) => {

   let dispatch = useDispatch()
   const items = useSelector<AppStateType, PizzaType[]>(state => state.pizzas.items)

   const onSelectCategory = React.useCallback((index: number | null) => {
      dispatch(setCategory(index))
   }, [])

   const mappedPizza = items && items.map(obj => <PizzaBlock key={obj.id} {...obj}/>)

   return (
       <div className="container">
          <div className="content__top">
             <Categories types={types}
                         onClickItem={onSelectCategory}
             />
             <SortPopup filterItems={filterItems}
                        onClickFilter={(name: string) => console.log(name)}
             />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
             {mappedPizza}
          </div>
       </div>
   )
}

export default Home

