import {FilterItems} from '../../u5-pages/Home'

export type FiltersActionsType =
    ReturnType<typeof setSortBy>

export const setSortBy = (name: string) => ({
   type: 'filters/SET_SORT_BY',
   payload: name,
} as const)

export const setCategory = (catIndex: number | null) => ({
   type: 'filters/SET_CATEGORY',
   payload: catIndex,
} as const)

