import React from 'react';
import './style.css';

const Dialog: React.FC = ({ children }) => (
  <div className='dialog'>
    <div className='dialog-content'>{children}</div>
  </div>
);

export default Dialog;
