import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FilterItem {
    label: string;
    value: string;
}

export type FilterData = FilterItem|FilterItem[]|number[];

interface SearchState {
    filters: string[];
    filterData: {[key:string]: FilterData};

    priceRange: number[];
    brands: string[];
    availabilities: string[];
    rating: string;
}

const initialState: SearchState = {
    filters: ["pr", "br", "av", "ra"],
    filterData: {},

    priceRange: [0, 9800],
    brands: [],
    availabilities: [],
    rating: "",
}; 

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setFilter(state: SearchState, action: PayloadAction<[string, FilterData]>) {
            if(state.filters.includes(action.payload[0])) {
                state.filterData[action.payload[0]] = action.payload[1];
            }
        },
        removeFilter(state: SearchState, action: PayloadAction<[string, string?]>) {
            if(action.payload[1] === undefined && state.filterData[action.payload[0]] !== undefined) {
                delete state.filterData[action.payload[0]];
            }
            if(action.payload[1] !== undefined && state.filterData[action.payload[0]] !== undefined) {
                state.filterData[action.payload[0]] = (state.filterData[action.payload[0]] as FilterItem[]).filter(item => item.value !== action.payload[1]);
                if((state.filterData[action.payload[0]] as FilterItem[]).length === 0) {
                    delete state.filterData[action.payload[0]];
                }
            }
        },
        clearFilter(state: SearchState) {
            state.filterData = {};
        },
        setPriceRange(state: SearchState, action: PayloadAction<number[]>) {
            state.priceRange = action.payload;
        },
        setBrands(state: SearchState, action: PayloadAction<string[]>) {
            state.brands = action.payload;
        },
        setAvailabilities(state: SearchState, action: PayloadAction<string[]>) {
            state.availabilities = action.payload;
        },
        setRating(state: SearchState, action: PayloadAction<string>) {
            state.rating = action.payload;
        },
    },
});

export const {setFilter, removeFilter, clearFilter, setBrands, setPriceRange, setAvailabilities, setRating} = searchSlice.actions;
export default searchSlice.reducer;