import * as React from 'react'

import {Categories, SortPopup, PizzaBlock} from '../u3-components'
import {PizzaType} from '../App'

type HomeProps = {
   items: PizzaType[]
}

export type FilterItems = {
   name: 'популярности' | 'цене' | 'алфавиту'
   type: 'popular' | 'price' | 'alphabet'
}

const Home: React.FC<HomeProps> = ({items}) => {

   const types: string[] = ['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']
   const filterItems: FilterItems[] = [
      {name: 'популярности', type: 'popular'},
      {name: 'цене', type: 'price'},
      {name: 'алфавиту', type: 'alphabet'}]

   const mappedPizza = items.map(obj => <PizzaBlock key={obj.id} {...obj}/>)

   return (
       <div className="container">
          <div className="content__top">
             <Categories types={types}
                         onClickItem={(name) => console.log(name)}
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
