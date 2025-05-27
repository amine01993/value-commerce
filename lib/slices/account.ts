
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CardType {
    id: string;
    type: string;
    number: string;
    expiry: string;
    isDefault: boolean;
    address: AddressType;
}

export interface AddressType {
    id?: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    city: string;
    province: string;
    postalCode: string;
    isDefault: boolean;
}

interface AccountState {
    cardList: CardType[];
    addressList: AddressType[];
}

const initialState: AccountState = {
    cardList: [],
    addressList: [],
};

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        addCard(state: AccountState, action: PayloadAction<CardType>) {
            if(action.payload.isDefault) {
                state.cardList.forEach(c => {
                    c.isDefault = false
                });
            }
            state.cardList.push(action.payload);
        },
        removeCard(state: AccountState, action: PayloadAction<string>) {
            state.cardList = state.cardList.filter(c => c.id !== action.payload);
        },
        saveAddress(state: AccountState, action: PayloadAction<AddressType>) {
            const addrIndex = state.addressList.findIndex(addr => addr.id === action.payload.id);
            if(addrIndex > -1) {
                if(action.payload.isDefault) {
                    state.addressList.forEach((addr, index) => {
                        if(addrIndex !== index) addr.isDefault = false
                    });
                }
                state.addressList[addrIndex] = action.payload;
            }
            else {
                if(action.payload.isDefault) {
                    state.addressList.forEach(addr => {
                        addr.isDefault = false
                    });
                }
                state.addressList.push(action.payload);
            }
        },
        removeAddress(state: AccountState, action: PayloadAction<string>) {
            state.addressList = state.addressList.filter(addr => addr.id !== action.payload);
        },
    },
});

export const {addCard, removeCard, saveAddress, removeAddress} = accountSlice.actions;
export default accountSlice.reducer;
