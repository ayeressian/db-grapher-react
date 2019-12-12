import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  initialState: null,
  name: 'schema',
  reducers: {
    setSchema: (_, { payload }) => payload,
  },
});

export default slice;

export const reducer = slice.reducer;
export const actions = slice.actions;
