import { combineReducers } from 'redux';
import { reducer as schemaReducer } from './schema';
import { reducer as fileOpenDialogReducer } from './slices/fileOpenDialogSlice';
import { reducer as fileSqlOpenDialogReducer } from './slices/fileSqlOpenDialogSlice';
import { reducer as welcomeDialogReducer } from './slices/welcomeDialog';

const rootReducer = combineReducers({
  dialog: combineReducers({
    fileDialog: combineReducers({
      fileOpenDialog: fileOpenDialogReducer,
      fileSqlOpenDialog: fileSqlOpenDialogReducer,
    }),
    welcomeDialog: welcomeDialogReducer,
  }),
  schema: schemaReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;
