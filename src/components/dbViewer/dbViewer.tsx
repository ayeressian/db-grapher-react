import 'db-viewer-component';
import React, { useEffect, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/reducer';
import { actions as createCordsAction } from '../../store/slices/createCords';
import { actions as tableDialogAction } from '../../store/slices/createDialog';
import { IDbViewerMode } from '../../store/slices/IDbViewerMode';
import { actions as welcomeDialogAction } from '../../store/slices/welcomeDialog';

const useStyle = createUseStyles({
  dbViewer: {
    gridRow: 2,
    overflow: 'auto',
    width: '100%',
    height: '100%',
  },
});

const DbViewerComponent: React.FC = () => {
  const classes = useStyle();
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

  useEffect(() => {
    if (schema != null) {
      dbViewer.current!.schema = schema;
      dispatch(welcomeDialogAction.close());
    }
  }, [dispatch, schema]);

  return <db-viewer ref={dbViewer} className={classes.dbViewer} />;
};

export default DbViewerComponent;
