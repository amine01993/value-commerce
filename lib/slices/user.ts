import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Language { label: string; locale: string; }

interface UserState {
    displayName: string;
    language: Language;

    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    passwordLastUpdate: string;
}

const initialState: UserState = {
    displayName: "",
    language: {
        label: "English",
        locale: "en",
    },

    firstName: "John",
    lastName: "Doe",
    phone: "(123) 456-7890",
    email: "test@anonymous.com",
    passwordLastUpdate: "5-2-2025",
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
        setFirstName(state: UserState, action: PayloadAction<string>) {
            state.firstName = action.payload;
        },
        setLastName(state: UserState, action: PayloadAction<string>) {
            state.lastName = action.payload;
        },
        setPhone(state: UserState, action: PayloadAction<string>) {
            state.phone = action.payload;
        },
        setEmail(state: UserState, action: PayloadAction<string>) {
            state.email = action.payload;
        },
        setPasswordLastUpdate(state: UserState, action: PayloadAction<string>) {
            state.passwordLastUpdate = action.payload;
        },
    },
});

export const {setDisplayName, setLanguage, setFirstName, setLastName, setPhone, setEmail, setPasswordLastUpdate} = userSlice.actions;
export default userSlice.reducer;