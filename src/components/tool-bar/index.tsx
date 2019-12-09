import React from 'react';
import './style.css';

const ToolBar: React.FC = () => {
  const createTable = () => {

  };

  const createRelation = () => {
    
  };

  return (
    <ul className="left_toolbar">
      <li className="action create_table" title="Create Table" onClick={createTable}></li>
      <li className="action create_relation" title="Create Relation" onClick={createRelation}></li>
    </ul>
  );
};

export default ToolBar;