import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MainState {
    openMenu: boolean;
    isMobile: boolean;
}

const initialState: MainState = {
    openMenu: false,
    isMobile: true,
}; 

const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        showMenu(state: MainState) {
            state.openMenu = true;
        },
        hideMenu(state: MainState) {
            state.openMenu = false;
        },
        setDeviceType(state: MainState, action: PayloadAction<string|undefined>) {
            if(action.payload) {
                state.isMobile = action.payload === "mobile";
            }
        },
    },
});

export const {showMenu, hideMenu, setDeviceType} = mainSlice.actions;
export default mainSlice.reducer;