import React, { useRef } from 'react';
import './style.css';
import 'db-viewer-component';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../store/reducer';
import { action as welcomeDialogAction } from '../../store/welcomeDialog';

const DbViewer: React.FC = ({ children }) => {
  const dispatch = useDispatch();
  const schema = useSelector((state: AppState) => state.schema);
  const dbViewer = useRef<any>();
  if (schema != null) {
    dbViewer.current.schema = schema;
    dispatch(welcomeDialogAction.close());
  }
  
  return (
    <db-viewer ref={ dbViewer }/>
  );  
};

export default DbViewer;