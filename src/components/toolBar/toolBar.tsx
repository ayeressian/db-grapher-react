import React from 'react';
import './style.css';

const ToolBar: React.FC = () => {
  const createTable = () => {
    // TODO
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
