import 'db-viewer-component';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/reducer';
import { actions as tableDialogAction } from '../../store/slices/createDialog';
import { IDbViewerMode } from '../../store/slices/IDbViewerMode';
import { actions as welcomeDialogAction } from '../../store/slices/welcomeDialog';
import './style.css';

interface IDbViewer extends HTMLElement {
  schema: object;
}

const DbViewer: React.FC = ({ children }) => {
  const dispatch = useDispatch();
  const schema = useSelector((state: AppState) => state.schema);
  const dbViewerMode = useSelector((state: AppState) => state.dbViewerMode);
  const dbViewer = useRef<any>(null).current! as IDbViewer;

  const createTableHandler = () => {
    dispatch(tableDialogAction.open());
    dbViewer.removeEventListener('viewportClick', createTableHandler);
  };

  switch (dbViewerMode) {
    case IDbViewerMode.Create:
      dbViewer.addEventListener('viewportClick', createTableHandler);
      break;
    case IDbViewerMode.Relation:
      break;
  }
  if (schema != null) {
    dbViewer.schema = schema;
    dispatch(welcomeDialogAction.close());
  }
  return (
    // <input ref={dbViewer}/>
    <db-viewer ref={dbViewer}/>
  );
};

export default DbViewer;
