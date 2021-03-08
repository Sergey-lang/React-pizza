import {rootReducer, store} from '../u6-app/store';

export type RootReducerType = typeof rootReducer

export type AppRootStateType = ReturnType<RootReducerType>
export type AppDispatchType = typeof store.dispatch
