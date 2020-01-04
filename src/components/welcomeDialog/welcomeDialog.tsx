import React from 'react';
import { createUseStyles } from 'react-jss';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/reducer';
import { actions as fileOpenAction } from '../../store/slices/fileOpenDialog';
import { actions as fileSqlOpenAction } from '../../store/slices/fileSqlOpenDialog';
import { actions as schemAction } from '../../store/slices/schema';
import { actions as welcomeDialogActions } from '../../store/slices/welcomeDialog';
import Dialog from '../dialog/dialog';

const useStyles = createUseStyles({
  operation: {
    color: '#0a70b4',
    cursor: 'pointer',
  },
  content: {
    marginLeft: '300px',
    width: '100vw',
  },
});

const WelcomeDialog: React.FC = () => {
  const classes = useStyles();
  const open = useSelector(
    (store: AppState) => store.dialog.welcomeDialog,
    shallowEqual,
  );
  const dispatch = useDispatch();

  if (!open) return null;

  const openFile = () => {
    dispatch(fileOpenAction.open());
  };

  const openSqlFile = () => {
    dispatch(fileSqlOpenAction.open());
  };

  const newFile = () => {
    dispatch(schemAction.setSchema({ tables: [] }));
    dispatch(welcomeDialogActions.close());
  };

  return (
    <Dialog>
      <div className={classes.content}>
        <h4 className={classes.operation} onClick={newFile}>
          New File
        </h4>
        <h4 className={classes.operation} onClick={openFile}>
          Open File
        </h4>
        <h4 className={classes.operation} onClick={openSqlFile}>
          Import SQL File
        </h4>
      </div>
    </Dialog>
  );
};

export default WelcomeDialog;
