import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface ILocalsState {
  globe: [number, number];
  filters: {
    country: any;
    subnational: any;
    games: string[];
  }
}

const initialState: ILocalsState = {
  globe: [40.656920, -74.002240],
  filters: {
    country: null,
    subnational: null,
    games: []
  }
};

export const localsSlice = createSlice({
  name: "locals",
  initialState,
  reducers: {
    setGlobeState: (state, action: PayloadAction<[number, number]>) => {
      state.globe = action.payload;
    },
    setFilterState: (state, action: PayloadAction<any>) => {
      const { country, subnational, games } = action.payload;
      
      if (country) state.filters = { ...state.filters, country, subnational: null }
      if (subnational) state.filters = { ...state.filters, subnational }
      if (games) state.filters = { ...state.filters, games }
    },
  },
});

export const { setGlobeState, setFilterState } = localsSlice.actions;
export const localsReducer = localsSlice.reducer;