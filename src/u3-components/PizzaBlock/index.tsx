import * as React from 'react'
import classNames from 'classnames'
import {PizzaType} from '../../App'
import Button from '../Button/Button'

const Index: React.FC<PizzaBlockProps> = ({id,imageUrl, name = '--', price = 0, types = [], sizes = [], onClickAddPizza}) => {

   const availableTypes: string[] = ['тонкое', 'традиционнное']
   const availableSizes: number[] = [26, 30, 40]

   const [activeType, setActiveType] = React.useState<number>(types[0])
   const [activeSize, setActiveSize] = React.useState<number>(0)

   const onSelectType = (index: number) => {
      setActiveType(index)
   }

   const onSelectSize = (index: number) => {
      setActiveSize(index)
   }

   const onAddPizza = () => {
      const obj:AddCartPizzaType = {
         id,
         imageUrl,
         name,
         price,
         size: availableSizes[activeSize],
         type: availableTypes[activeType]
      }
      onClickAddPizza(obj)
   }

   const mappedAvailableTypes = availableTypes
       .map((type, index) =>
           <li key={type}
               className={classNames({
                  'active': activeType === index,
                  'disabled': !types.includes(index)
               })}
               onClick={() => onSelectType(index)}>{type}</li>)

   const mappedAvailableSizes = availableSizes
       .map((size, index) =>
           <li key={size}
               className={classNames({
                  'active': activeSize === index,
                  'disabled': !sizes.includes(size)
               })}
               onClick={() => onSelectSize(index)}>{size} см.</li>)

   return <div className="pizza-block">
      <img
          className="pizza-block__image"
          src={imageUrl}
          alt="Pizza"
      />
      <h4 className="pizza-block__title">{name}</h4>
      <div className="pizza-block__selector">
         <ul>
            {mappedAvailableTypes}
         </ul>
         <ul>
            {mappedAvailableSizes}
         </ul>
      </div>
      <div className="pizza-block__bottom">
         <div className="pizza-block__price">от {price} ₽</div>
         <Button className="button--add"
                 onClick={onAddPizza}
                 outline>
            <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
               <path
                   d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                   fill="white"
               />
            </svg>
            <span>Добавить</span>
            <i>2</i>
         </Button>
      </div>
   </div>
}

export type AddCartPizzaType = {
   id: number
   imageUrl: string
   name: string
   price: number
   size: number
   type: string
}

type PizzaBlockProps = PizzaType & {
   onClickAddPizza: (object: AddCartPizzaType) => void
}

export default Index