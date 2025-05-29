import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MainState {
    openMenu: boolean;
    isMobile: boolean;
    query: string;
}

const initialState: MainState = {
    openMenu: false,
    isMobile: true,
    query: "",
}; 

const mainSlice = createSlice({
    name: "main",
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
        setSearchQuery(state: MainState, action: PayloadAction<string>) {
            state.query = action.payload;
        }
    },
});

export const {showMenu, hideMenu, setDeviceType, setSearchQuery} = mainSlice.actions;
export default mainSlice.reducer;