import { combineReducers } from 'redux';
import { reducer as tableDialog } from './slices/createDialog';
import { reducer as dbViewerMode } from './slices/dbViewerMode';
import { reducer as fileOpenDialog } from './slices/fileOpenDialog';
import { reducer as fileSqlOpenDialog } from './slices/fileSqlOpenDialog';
import { reducer as schema } from './slices/schema';
import { reducer as welcomeDialog } from './slices/welcomeDialog';

const rootReducer = combineReducers({
  dbViewerMode,
  dialog: combineReducers({
    fileDialog: combineReducers({
      fileOpenDialog,
      fileSqlOpenDialog,
    }),
    tableDialog,
    welcomeDialog,
  }),
  schema,
});

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;
