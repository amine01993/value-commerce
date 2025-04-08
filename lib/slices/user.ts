import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    displayName: string;
}

const initialState: UserState = {
    displayName: '',
}; 

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        set(state: UserState, action: PayloadAction<string>) {
            state.displayName = action.payload;
        },
    },
});

export const {set} = userSlice.actions;
export default userSlice.reducer;