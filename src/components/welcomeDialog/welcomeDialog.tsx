import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/reducer';
import {action as fileOpenAction} from '../../store/slices/fileOpenDialogSlice';
import {action as fileSqlOpenAction} from '../../store/slices/fileSqlOpenDialogSlice';
import Dialog from '../dialog/dialog';
import './style.css';

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
      <div className='content'>
        <h4 className='operation'>New File</h4>
        <h4 className='operation' onClick={openFile}>Open File</h4>
        <h4 className='operation' onClick={openSqlFile}>Import SQL File</h4>
      </div>
    </Dialog>
  );
};

export default WelcomeDialog;
