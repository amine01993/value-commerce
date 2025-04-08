import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MainState {
    openMenu: boolean;
}

const initialState: MainState = {
    openMenu: false,
}; 

const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        show(state: MainState) {
            state.openMenu = true;
        },
        hide(state: MainState) {
            state.openMenu = false;
        },
    },
});

export const {show, hide} = mainSlice.actions;
export default mainSlice.reducer;