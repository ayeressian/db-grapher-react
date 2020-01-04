import classnames from 'classnames';
import React from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/reducer';
import { actions as dbViewerModeAction } from '../../store/slices/dbViewerMode';
import { IDbViewerMode } from '../../store/slices/IDbViewerMode';
import relationIcon from './asset/icon_create_relation_48x48.png';
import createIcon from './asset/icon_create_table_48x48.png';

const useStyles = createUseStyles({
  leftToolbar: {
    padding: 0,
    margin: 0,
    gridRow: 2,
  },
  action: {
    width: '60px',
    height: '60px',
    listStyleType: 'none',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    '&:hover': {
      backgroundColor: '#dddddd',
    },
  },
  active: {
    backgroundColor: '#d68080',
  },
  createTable: {
    backgroundImage: `url(${createIcon})`,
  },
  createRelation: {
    backgroundImage: `url(${relationIcon})`,
  },
});

const ToolBar: React.FC = () => {
  const dispatch = useDispatch();
  const mode = useSelector(({ dbViewerMode }: AppState) => dbViewerMode);

  const createTable = () => dispatch(dbViewerModeAction.createMode());

  const createRelation = () => dispatch(dbViewerModeAction.relationMode());

  const classes = useStyles(mode);

  return (
    <ul className={classes.leftToolbar}>
      <li
        className={classnames(classes.action, classes.createTable, {
          [classes.active]: mode === IDbViewerMode.Create,
        })}
        title='Create Table'
        onClick={createTable}
      />
      <li
        className={classnames(classes.action, classes.createRelation, {
          [classes.active]: mode === IDbViewerMode.Relation,
        })}
        title='Create Relation'
        onClick={createRelation}
      />
    </ul>
  );
};

export default ToolBar;
