import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IItems, randomData } from "../data";

type StateType = {
  item: string | null,
  preData: IItems[],
  data: IItems[],
  filter: string,
};

const data = randomData();

const initialState: StateType = {
  item: null,
  preData: data,
  data: data,
  filter: '',
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setItem(state, action: PayloadAction<string | null>) {
      state.item = action.payload;
    },
    setFilter(state, action: PayloadAction<string>) {
      state.filter = action.payload;
    },
    setData(state, action: PayloadAction<IItems[]>) {
      state.data = action.payload;
    },
  }
});

export default mainSlice.reducer;
export const { setItem, setFilter, setData } = mainSlice.actions;