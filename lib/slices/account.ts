
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CardType {
    id: string;
    type: string;
    number: string;
    expiry: string;
}

interface AccountState {
    cardList: CardType[];
}

const initialState: AccountState = {
    cardList: []
};

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        addCard(state: AccountState, action: PayloadAction<CardType>) {
            console.log('addCard', action.payload)
            state.cardList.push(action.payload);
        },
        removeCard(state: AccountState, action: PayloadAction<string>) {
            state.cardList = state.cardList.filter(c => c.id !== action.payload);
        },
    },
});

export const {addCard, removeCard} = accountSlice.actions;
export default accountSlice.reducer;
