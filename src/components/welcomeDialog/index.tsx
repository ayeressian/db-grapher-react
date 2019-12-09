import React from 'react';
import './style.css';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import Dialog from '../dialog';
import { AppState } from '../../store/reducer';
import {action as fileOpenAction} from '../../store/fileOpenDialogSlice';
import {action as fileSqlOpenAction} from '../../store/fileSqlOpenDialogSlice';

const WelcomeDialog: React.FC = () => {
  const open = useSelector((store: AppState) => store.dialog.welcomeDialog, shallowEqual);
  const dispatch = useDispatch();

  if (!open) return null;

  const openFile = () => {
    dispatch(fileOpenAction.open());
  };

  const openSqlFile = () => {
    dispatch(fileSqlOpenAction.open());
  };
  return (
    <Dialog>
      <div className="content">
        <h4 className="operation" id="new-file">New File</h4>
        <h4 className="operation" id="open-file" onClick={openFile}>Open File</h4>
        <h4 className="operation" id="import-sql-file" onClick={openSqlFile}>Import SQL File</h4>
      </div>
    </Dialog>
  );
};

export default WelcomeDialog;