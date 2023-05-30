import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppState } from "store/store";
import { IAuth } from "types/Auth";

interface IMenuShow {
  isShow: boolean;
}

const initialState: IMenuShow = {
  isShow: false
};

export const menuShowSlice = createSlice({
  name: "menuShowState",
  initialState: initialState,
  reducers: {
    setMenuShow: (_state, action: PayloadAction<IMenuShow>) => {
      return { ..._state, isShow: action.payload.isShow };
    }
  }
});

export const { setMenuShow } = menuShowSlice.actions;

export const getMenuShow = (state: AppState) => state.menuShowState.isShow;

export default menuShowSlice;
