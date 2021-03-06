import {AppStateType} from '../../u6-app/store';

export const pizzasItemsSelectors =(state: AppStateType) => state.pizzas.items
export const pizzaIsLoadingSelectors =(state: AppStateType) => state.pizzas.isLoading
