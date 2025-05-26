import { configureStore } from "@reduxjs/toolkit";
import userSlice from "@/lib/slices/user";
import mainSlice from "@/lib/slices/main";
import searchSlice from "@/lib/slices/search";
import accountSlice from "@/lib/slices/account";

export const makeStore = () => {
    return configureStore({
        reducer: {
            userSlice,
            mainSlice,
            searchSlice,
            accountSlice,
        },
    });
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

