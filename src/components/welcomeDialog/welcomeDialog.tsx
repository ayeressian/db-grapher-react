import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/reducer';
import {actions as fileOpenAction} from '../../store/slices/fileOpenDialog';
import {actions as fileSqlOpenAction} from '../../store/slices/fileSqlOpenDialog';
import {actions as schemAction} from '../../store/slices/schema';
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

  const newFile = () => {
    dispatch(schemAction.setSchema({tables: []}));
  };

  return (
    <Dialog>
      <div className='content'>
        <h4 className='operation' onClick={newFile}>New File</h4>
        <h4 className='operation' onClick={openFile}>Open File</h4>
        <h4 className='operation' onClick={openSqlFile}>Import SQL File</h4>
      </div>
    </Dialog>
  );
};

export default WelcomeDialog;
