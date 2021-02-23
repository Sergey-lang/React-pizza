import {AppStateType} from '../../u6-redux/store';

export const cartItemsSelectors =(state: AppStateType) => state.cart.items
export const totalPriceSelectors =(state: AppStateType) => state.cart.totalPrice
export const itemsCountSelectors =(state: AppStateType) => state.cart.itemsCount
