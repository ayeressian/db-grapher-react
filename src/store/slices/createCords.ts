import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IPoint {
  x: number;
  y: number;
}
type IPointNullable = IPoint | null;

const slice = createSlice({
  initialState: null as IPointNullable,
  name: 'createCord',
  reducers: {
    setCord: (_, action: PayloadAction<IPoint>) => action.payload,
  },
});

export default slice;

export const reducer = slice.reducer;
export const actions = slice.actions;
