import {AppStateType} from '../../u6-redux/store';

export const pizzasItemsSelectors =(state: AppStateType) => state.pizzas.items
export const pizzaIsLoadingSelectors =(state: AppStateType) => state.pizzas.isLoading
