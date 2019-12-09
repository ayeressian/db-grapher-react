import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'schema',
  initialState: null,
  reducers: {
    setSchema: schema => schema,
  }
});

export default slice;

export const reducer = slice.reducer;
export const action = slice.actions;