import { combineReducers } from 'redux';
import { reducer as fileOpenDialogReducer } from './fileOpenDialogSlice';
import { reducer as fileSqlOpenDialogReducer } from './fileSqlOpenDialogSlice';
import { reducer as welcomeDialogReducer } from './welcomeDialog';
import { reducer as schemaReducer } from './schema';

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