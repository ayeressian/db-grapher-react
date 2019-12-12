import { combineReducers } from 'redux';
import { reducer as fileOpenDialogReducer } from './slices/fileOpenDialog';
import { reducer as fileSqlOpenDialogReducer } from './slices/fileSqlOpenDialog';
import { reducer as schemaReducer } from './slices/schema';
import { reducer as tableDialogReducer } from './slices/createDialog';
import { reducer as welcomeDialogReducer } from './slices/welcomeDialog';

const rootReducer = combineReducers({
  dialog: combineReducers({
    fileDialog: combineReducers({
      fileOpenDialog: fileOpenDialogReducer,
      fileSqlOpenDialog: fileSqlOpenDialogReducer,
    }),
    tableDialog: tableDialogReducer,
    welcomeDialog: welcomeDialogReducer,
  }),
  schema: schemaReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;
