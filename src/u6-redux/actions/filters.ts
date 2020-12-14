import {SortByType} from '../../u5-pages/Home'

export type FiltersActionsType =
    ReturnType<typeof setSortBy> |
    ReturnType<typeof setCategory>

export const setSortBy = (type: SortByType) => ({
   type: 'filters/SET_SORT_BY',
   payload: type,
} as const)

export const setCategory = (catIndex: number | null) => ({
   type: 'filters/SET_CATEGORY',
   payload: catIndex,
} as const)

