import React from 'react';
import { useDispatch } from 'react-redux';
import { actions as tableDialogAction } from '../../store/slices/createDialog';
import './style.css';

const ToolBar: React.FC = () => {
  const dispatch = useDispatch();
  const createTable = () => {
    dispatch(tableDialogAction.open());
  };

  const createRelation = () => {
    // TODO
  };

  return (
    <ul className='left_toolbar'>
      <li className='action create_table' title='Create Table' onClick={createTable}/>
      <li className='action create_relation' title='Create Relation' onClick={createRelation}/>
    </ul>
  );
};

export default ToolBar;
