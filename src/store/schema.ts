import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'schema',
  initialState: null,
  reducers: {
    setSchema: (_, { payload }) => payload,
  },
});

export default slice;

export const reducer = slice.reducer;
export const action = slice.actions;
