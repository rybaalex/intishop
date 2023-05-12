import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppState } from "store/store";
import { IAuth } from "types/Auth";

const initialState: IAuth = {
  identity: false,
  data: {}
};

export const authSlice = createSlice({
  name: "authState",
  initialState: initialState,
  reducers: {
    setAuthIdentity: (_state, action: PayloadAction<IAuth>) => {
      return { ..._state, identity: action.payload.identity };
    },
    setAuthData: (_state, action: PayloadAction<IAuth>) => {
      return { ..._state, data: action.payload.data };
    }
  }
});

export const { setAuthIdentity, setAuthData } = authSlice.actions;

export const getAuth = (state: AppState) => state.authState;

export default authSlice;
