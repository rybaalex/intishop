import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import type {AppState, AppThunk} from "store/store";
import {HYDRATE} from "next-redux-wrapper";
import {IBannerResponse, IBannerSlice} from "features/home/banners/Banners.d";

const initialState: IBannerResponse = {
    customErrorCode: 0,
    systemErrorMessage: "",
    hasError: false,
    errorMessage: "",
    response: {}
};

export const bannerSlice = createSlice({
    name: "bannerState",
    initialState: initialState,
    reducers: {
        setData: (_state, action: PayloadAction<IBannerSlice>) => {
            return action.payload.bannerState;
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action: PayloadAction<IBannerSlice>) => {
            return {
                ...state,
                ...action.payload.bannerState
            };
        }
    }
});

export const fetchBanner =
    (dispatchData: IBannerSlice): AppThunk =>
        async (dispatch) => {
            dispatch(bannerSlice.actions.setData(dispatchData));
        };

/*export const {} =
    factorySlice.actions;*/

export const getBanner = (state: AppState) => state.bannerState;

export default bannerSlice;
