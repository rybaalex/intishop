import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import type {AppState, AppThunk} from "store/store";
import {HYDRATE} from "next-redux-wrapper";
import {
    INavResponse, INavSlice
} from "types/nav.d";

const initialState: INavResponse = {
    customErrorCode: 0,
    systemErrorMessage: "",
    hasError: false,
    errorMessage: "",
    response: []
};

export const staticPageSlice = createSlice({
    name: "staticPageState",
    initialState: initialState,
    reducers: {
        setData: (_state, action: PayloadAction<INavSlice>) => {
            return action.payload.staticPageState;
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action: PayloadAction<INavSlice>) => {
            return {
                ...state,
                ...action.payload.staticPageState
            };
        }
    }
});

export const fetchStaticPage =
    (dispatchData: INavSlice): AppThunk =>
        async (dispatch) => {
            dispatch(staticPageSlice.actions.setData(dispatchData));
        };


export const getStaticPage = (state: AppState) => state.staticPageState;

export default staticPageSlice;
