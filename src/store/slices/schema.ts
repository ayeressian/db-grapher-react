import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const slice = createSlice({
  initialState: {
    tables: [] as ITableSchema[],
  },
  name: 'schema',
  reducers: {
    setSchema: (_, action: PayloadAction<ISchema>) => action.payload,
  },
});

export default slice;

export const reducer = slice.reducer;
export const actions = slice.actions;
