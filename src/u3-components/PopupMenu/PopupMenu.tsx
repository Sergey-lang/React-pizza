import * as React from 'react'
import classNames from 'classnames'
import {FilterItemType} from '../SortPopup/SortPopup'

type PopupMenuType = {
   items: Array<FilterItemType>
   onClick: Function
   children?: any
   activeItem?: "rating" | "price" | "name"
}

export const PopupMenu: React.FC<PopupMenuType> = ({children, items, onClick, activeItem}) => {
   let [visiblePopup, setVisiblePopup] = React.useState(false)
   const sortRef = React.useRef<HTMLDivElement>(null)

   const clickOutsideCallback = React.useCallback(e => {
      if (!e.path.includes(sortRef.current)) {
         setVisiblePopup(false)
      }
   }, [])

   const handleOutsideClick = (item: any) => {
      if (onClick) {
         onClick(item)
      }
      setVisiblePopup(false)
   }

   const mappedSortType = items && items.map((item, index) => (
       <li key={index}
           className={classNames({active: item.value === activeItem})}
           onClick={handleOutsideClick.bind(this, item)}>
          {item.label}
       </li>))


   React.useEffect(() => {
      document.querySelector<any>('body').addEventListener('click', clickOutsideCallback)
      return () => document.querySelector<any>('body').removeEventListener('click', clickOutsideCallback)
   }, [clickOutsideCallback])

   return (
       <>
          <div onClick={() => setVisiblePopup(!visiblePopup)}>{children}</div>
          {visiblePopup && (
              <div ref={sortRef} className="popup-menu">
                 <ul>
                    {mappedSortType}
                 </ul>
              </div>
          )}
       </>
   )
}

