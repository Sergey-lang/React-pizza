import * as React from 'react'
import classNames from 'classnames'
import {FilterItemType} from '../SortPopup/SortPopup'

type PopupMenuType = {
   items: Array<FilterItemType>
   onClick: (obj: FilterItemType) => void
   children: React.HTMLAttributes<HTMLSpanElement>
   activeItem?: 'rating' | 'price' | 'name'
}

export const PopupMenu: React.FC<PopupMenuType> = ({children, items, onClick, activeItem}) => {

   let [visiblePopup, setVisiblePopup] = React.useState(false)

   const sortRef = React.useRef<HTMLDivElement>(null)

   const clickOutsideCallback = React.useCallback(e => {
      // const path = e.path || (e.composedPath && e.composedPath())
      if (!e.path.includes(sortRef.current)) {
         setVisiblePopup(false);
      }
   }, []);

   const handleOutsideClick = (item: FilterItemType) => {
      if (onClick) {
         onClick(item)
      }
      setVisiblePopup(false)
   }

   // ParentNode.querySelector<"body">(     selectors: "body"): HTMLBodyElement | null
   // ParentNode.querySelector<E extends Element = Element>(     selectors: string): E | null
   const mappedSortType = items && items.map((item: FilterItemType, index: number) => (
       <li
           key={index}
           className={classNames({active: item.value === activeItem})}
           onClick={handleOutsideClick.bind(this, item)}>
          {item.label}
       </li>))

   React.useEffect(() => {
      // const  doc = document.querySelector<"body">('body'): HTMLBodyElement | null
      const  doc = document.querySelector<E extends Element = Element>('body'): E | null
      doc.addEventListener('click', clickOutsideCallback);

      return () => document.querySelector('body').removeEventListener('click', clickOutsideCallback);
   }, [clickOutsideCallback]);

   return (
       <React.Fragment>
          <div onClick={() => {
             setVisiblePopup(!visiblePopup)
          }}>{children}</div>
          {visiblePopup && (
              <div ref={sortRef} className="sort__popup">
                 <ul>
                    {mappedSortType}
                 </ul>
              </div>
          )}
       </React.Fragment>
   )
}

