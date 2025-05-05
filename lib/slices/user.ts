import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Language { label: string; locale: string; }

interface UserState {
    displayName: string;
    language: Language;
}

const initialState: UserState = {
    displayName: "",
    language: {
        label: "English",
        locale: "en",
    },
}; 

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setDisplayName(state: UserState, action: PayloadAction<string>) {
            state.displayName = action.payload;
        },
        setLanguage(state: UserState, action: PayloadAction<Language>) {
            state.language = action.payload;
        },
    },
});

export const {setDisplayName, setLanguage} = userSlice.actions;
export default userSlice.reducer;