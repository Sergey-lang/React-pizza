import * as React from 'react'

type CategoriesProps = {
   types: string[]
   onClickItem: (index: number | null) => void
}

const Categories: React.FC<CategoriesProps> = React.memo(
    ({types, onClickItem}) => {
       console.log('RERENDER Categories')
       let [activeItem, setActiveItem] = React.useState<number | null>(null)

       const onSelectItem = (index: number | null) => {
          setActiveItem(index)
          onClickItem(index)
       }

       const categoriesArray = types && types
           .map((name, index) => (
               <li key={`${name}_${index}`}
                   onClick={() => onSelectItem(index)}
                   className={activeItem === index ? 'active' : ''}
               >{name}</li>))

       return (
           <div className="categories">
              <ul>
                 <li className={activeItem === null ? 'active' : ''}
                     onClick={() => onSelectItem(null)}>Все
                 </li>
                 {categoriesArray}
              </ul>
           </div>
       )
    }
)

export default Categories