import * as React from 'react'

type CategoriesProps = {
   types: string[]
   onClickItem?: (name: string) => void
}

const Categories: React.FC<CategoriesProps> = ({types, onClickItem}) => {

   let [activeItem, setActiveItem] = React.useState<number | null>(null)

   const onSelectItem = (index: number | null) => {
      setActiveItem(index)
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

export default Categories


// export class Categories extends React.Component {
//
//    state = {
//       activeItem: null
//    }
//
//    onSelectItem = index => {
//       this.setState({
//          activeItem: index
//       })
//    }
//
//    render() {
//       let {items, onClickItem} = this.props
//
//       const categoriesArray = items
//           .map((name, index) => (
//               <li key={`${name}_${index}`}
//                   onClick={() => this.onSelectItem(index)}
//                   className={this.state.activeItem === index ? 'active' : ''}
//               >{name}</li>))
//
//       return (
//           <div className="categories">
//              <ul>
//                 <li className="active">Все</li>
//                 {categoriesArray}
//              </ul>
//           </div>
//       )
//    }
// }
