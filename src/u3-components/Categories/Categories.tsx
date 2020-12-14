import * as React from 'react'

const Categories: React.FC<CategoriesProps> = React.memo(
    ({types, onClickCategory, activeCategory}) => {

       const mappedCategories = types && types
           .map((name, index) => (
               <li key={`${name}_${index}`}
                   onClick={() => onClickCategory(index)}
                   className={activeCategory === index ? 'active' : ''}
               >{name}</li>))

       return (
           <div className="categories">
              <ul>
                 <li className={activeCategory === null ? 'active' : ''}
                     onClick={() => onClickCategory(null)}>Все
                 </li>
                 {mappedCategories}
              </ul>
           </div>
       )
    }
)

type CategoriesProps = {
   types: string[]
   onClickCategory: (index: number | null) => void
   activeCategory: number | null
}

export default Categories