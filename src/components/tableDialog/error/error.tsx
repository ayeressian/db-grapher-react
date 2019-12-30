import React from 'react';
import './style.css';

interface IProps {
  message: string;
}

const TableDialog: React.FC<IProps> = ({ message }) => (
  <div className='error'>{message}</div>
);

export default TableDialog;
