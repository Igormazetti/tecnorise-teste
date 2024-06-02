import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";
import modalReducer from "./Reducers/modalReducer";
import repositoryReducer from "./Reducers/repositoryReducer";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const middleware = (getDefaultMiddleware: any) => getDefaultMiddleware().concat();

const store = configureStore({
  reducer: combineReducers({
    modal: modalReducer,
    repositories: repositoryReducer,
  }),
  middleware,
});

setupListeners(store.dispatch);

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
