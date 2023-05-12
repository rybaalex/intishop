import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import staticPageSlice from "components/common/header/static_page/StaticPageSlice";
import authSlice from "components/common/header/auth/AuthSlice";


const makeStore = () =>
  configureStore({
    reducer: {
      [staticPageSlice.name]: staticPageSlice.reducer,
      [authSlice.name]: authSlice.reducer
    },
    devTools: true
  });

// eslint-disable-next-line no-undef
export type AppStore = ReturnType<typeof makeStore>;
// eslint-disable-next-line no-undef
export type AppState = ReturnType<AppStore["getState"]>;
// eslint-disable-next-line no-undef
export type AppDispatch = AppStore["dispatch"];

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);
