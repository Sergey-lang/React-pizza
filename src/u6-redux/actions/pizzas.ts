import {PizzaType} from '../../App'
import {ThunkAction, ThunkDispatch} from 'redux-thunk'
import axios from 'axios'
import {SortByType} from '../../u5-pages/Home'
import {AppStateType} from '../store'

export type PizzasActionsType =
    ReturnType<typeof setPizzas> |
    ReturnType<typeof setLoaded>

export const setPizzas = (items: PizzaType[]) => ({
   type: 'pizzas/SET_PIZZAS',
   payload: items,
} as const)

export const setLoaded = (value: boolean) => ({
   type: 'pizzas/SET_LOADED',
   payload: value,
} as const)

type ThunkType = ThunkAction<void, AppStateType, unknown, PizzasActionsType>

//Thunk
export const fetchPizzas = (category: number | null, sortBy: SortByType,): ThunkType =>
    (dispatch: ThunkDispatch<AppStateType, unknown, PizzasActionsType>) => {
       dispatch(setLoaded(true))
       axios.get<PizzaType[]>(`/pizzas?${
           category !== null 
               ? `category=${category}` 
               : ''}&_sort=${sortBy.type}&_order=${sortBy.order}`)
           .then(({data}) => {
              dispatch(setPizzas(data))
           })
       dispatch(setLoaded(false))
    }
