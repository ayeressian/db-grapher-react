import 'db-viewer-component';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/reducer';
import { actions as welcomeDialogAction } from '../../store/slices/welcomeDialog';
import './style.css';

const DbViewer: React.FC = ({ children }) => {
  const dispatch = useDispatch();
  const schema = useSelector((state: AppState) => state.schema);
  const dbViewer = useRef<any>();
  if (schema != null) {
    dbViewer.current.schema = schema;
    dispatch(welcomeDialogAction.close());
  }

  return (
    <db-viewer ref={dbViewer}/>
  );
};

export default DbViewer;
