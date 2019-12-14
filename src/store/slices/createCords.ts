import { createSlice, PayloadAction, CaseReducer } from '@reduxjs/toolkit';
import { AppState } from '../reducer';

interface IPoint {
  x: number;
  y: number;
}

type IPointNullable = IPoint | null | void;
const setCord: CaseReducer<IPointNullable, PayloadAction<IPointNullable>> =
  (state, action) => action!.payload;

const slice = createSlice({
  initialState: null,
  name: 'createCord',
  reducers: {
    setCord,
  },
});

export default slice;

export const reducer = slice.reducer;
export const actions = slice.actions;
