import 'db-viewer-component';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/reducer';
import { actions as createCordsAction } from '../../store/slices/createCords';
import { actions as tableDialogAction } from '../../store/slices/createDialog';
import { IDbViewerMode } from '../../store/slices/IDbViewerMode';
import { actions as welcomeDialogAction } from '../../store/slices/welcomeDialog';
import './style.css';

interface IDbViewer extends HTMLElement {
  schema: object;
}

const DbViewer: React.FC = () => {
  const dispatch = useDispatch();
  const schema = useSelector((state: AppState) => state.schema);
  const dbViewerMode = useSelector((state: AppState) => state.dbViewerMode);
  const dbViewer = useRef<IDbViewer>(null);

  const createTableHandler = (event: any) => {
    dispatch(createCordsAction.setCord(event.detail));
    dispatch(tableDialogAction.open());
    dbViewer.current!.removeEventListener('viewportClick', createTableHandler);
  };

  switch (dbViewerMode) {
    case IDbViewerMode.Create:
      dbViewer.current!.addEventListener('viewportClick', createTableHandler);
      break;
    case IDbViewerMode.Relation:
      break;
  }
  if (schema != null) {
    dbViewer.current!.schema = schema;
    dispatch(welcomeDialogAction.close());
  }
  return (
    <db-viewer ref={dbViewer} />
  );
};

export default DbViewer;
