import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/reducer';
import { actions as dbViewerModeAction } from '../../store/slices/dbViewerMode';
import { IDbViewerMode } from '../../store/slices/IDbViewerMode';
import './style.css';

const ToolBar: React.FC = () => {
  const dispatch = useDispatch();
  const mode = useSelector(({ dbViewerMode }: AppState) => dbViewerMode);

  const createTable = () => dispatch(dbViewerModeAction.createMode());

  const createRelation = () => dispatch(dbViewerModeAction.relationMode());

  return (
    <ul className='left_toolbar'>
      <li
        className={`action create_table ${
          mode === IDbViewerMode.Create ? 'active' : ''
        }`}
        title='Create Table'
        onClick={createTable}
      />
      <li
        className={`action create_relation ${
          mode === IDbViewerMode.Relation ? 'active' : ''
        }`}
        title='Create Relation'
        onClick={createRelation}
      />
    </ul>
  );
};

export default ToolBar;
