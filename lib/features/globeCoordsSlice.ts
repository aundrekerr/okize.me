import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface ICoordState {
  coordState: [number, number];
}

const initialState: ICoordState = {
  coordState: [40.656920, -74.002240],
};

export const coordSlice = createSlice({
  name: "coord",
  initialState,
  reducers: {
    setCoordState: (state, action: PayloadAction<[number, number]>) => {
      state.coordState = action.payload;
    },
  },
});

export const { setCoordState } = coordSlice.actions;
export const coordReducer = coordSlice.reducer;