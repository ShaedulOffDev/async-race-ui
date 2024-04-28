import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Car } from "./components";

interface CarsState {
  cars: Car[];
}

const initialState: CarsState = {
  cars: [],
};

const cars = createSlice({
  name: "cars",
  initialState,
  reducers: {
    setCars: (state, action: PayloadAction<Car[]>) => {
      state.cars = action.payload;
    },
    setCar: (state, action: PayloadAction<Car>) => {
      state.cars = [...state.cars, action.payload];
    },
  },
});

export const { setCars, setCar } = cars.actions;
export default cars.reducer;
