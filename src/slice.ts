import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CarI } from "./types";

interface CarsState {
  cars: CarI[];
  winner: null | number;
  status: string | null;
  bestTime: number;
  isMatchEnded: boolean;
}

const initialState: CarsState = {
  cars: [],
  winner: null,
  status: null,
  bestTime: 0,
  isMatchEnded: true,
};

const cars = createSlice({
  name: "cars",
  initialState,
  reducers: {
    setCars: (state, action: PayloadAction<CarI[]>) => {
      state.cars = action.payload;
    },
    setCar: (state, action: PayloadAction<CarI>) => {
      state.cars = [...state.cars, action.payload];
    },
    setWinner: (state, action: PayloadAction<number | null>) => {
      state.winner = action.payload;
    },
    setStatus: (state, action: PayloadAction<string | null>) => {
      state.status = action.payload;
    },
    setBestTime: (state, action: PayloadAction<number>) => {
      state.bestTime = action.payload;
    },
    setMatch: (state, action: PayloadAction<boolean>) => {
      state.isMatchEnded = action.payload;
    },
  },
});

export const { setCars, setCar, setStatus, setWinner, setBestTime, setMatch } = cars.actions;
export default cars.reducer;
