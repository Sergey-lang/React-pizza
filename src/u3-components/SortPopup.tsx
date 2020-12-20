import * as React from 'react'
import {SortByType} from '../u5-pages/Home'

export const SortPopup: React.FC<SortPopupProps> = React.memo(({filterItems, activeSortType, onClickSortType}) => {

   React.useEffect(() => {
      document.addEventListener('click', handleOutsideClick)
   }, [])

   let [visiblePopup, setVisiblePopup] = React.useState(false)

   const sortRef = React.useRef<HTMLDivElement>(null)

   const toggleVisiblePopup = () => setVisiblePopup(!visiblePopup)

   const onSelectFilter = (type: SortByType) => {
      onClickSortType(type)
      setVisiblePopup(false)
   }

   let activeFilterName;
   const activeFilter = filterItems.find(obj => obj.type === activeSortType)
   if (activeFilter) {
      activeFilterName = activeFilter.name
   }

   const handleOutsideClick = (ev: any) => {
      const path = ev.path || (ev.composedPath && ev.composedPath())
      if (!path.includes(sortRef.current)) {
         setVisiblePopup(false)
      }
   }

   const mappedSortType = filterItems && filterItems.map((obj, i) => (
       <li key={`${obj.type}_${i}`}
           className={activeSortType === obj.type ? 'active' : ''}
           onClick={() => onSelectFilter(obj)}>
          {obj.name}
       </li>))

   return (
       <div ref={sortRef} className="sort">
          <div className="sort__label">
             <svg className={visiblePopup ? 'rotate' : ''}
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
             >
                <path
                    d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                    fill="#2C2C2C"
                />
             </svg>
             <b>Сортировка по:</b>
             <span onClick={toggleVisiblePopup}>{activeFilterName}</span>
          </div>
          {visiblePopup && <div className="sort__popup">
             <ul>
                {mappedSortType}
             </ul>
          </div>}
       </div>
   )
})

type SortPopupProps = {
   filterItems: SortByType[]
   activeSortType: string
   onClickSortType: (type: SortByType) => void
}
