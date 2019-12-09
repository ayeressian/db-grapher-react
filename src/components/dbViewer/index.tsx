import React, { useRef } from 'react';
import './style.css';
import 'db-viewer-component';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/reducer';

const DbViewer: React.FC = ({ children }) => {
  const schema = useSelector((state: AppState) => state.schema);
  const dbViewer = useRef<HTMLElement>();
  dbViewer.setSchema()
  
  return (
    <db-viewer ref={ dbViewer as any }/>
  );  
};

export default DbViewer;