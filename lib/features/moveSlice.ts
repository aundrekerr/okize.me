import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { SF6Move }from "@/lib/types/Move";

export interface IMoveState {
  data: SF6Move | null;
  install: string
}

const initialState: IMoveState = {
  data: null,
  install: 'base'
};

export const moveSlice = createSlice({
  name: "move",
  initialState,
  reducers: {
    setMoveState: (state, action: PayloadAction<SF6Move | null>) => {
      state.data = action.payload;
    },
    setInstallState: (state, action: PayloadAction<string>) => {
      state.install = action.payload;
    },
  },
});

export const { setMoveState, setInstallState } = moveSlice.actions;
export const moveReducer = moveSlice.reducer;