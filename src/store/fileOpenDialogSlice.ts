import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'fileOpenDialogSlice',
  initialState: false,
  reducers: {
    open: () => true,
    close: () => false
  }
});

export default slice;

export const reducer = slice.reducer;
export const action = slice.actions;