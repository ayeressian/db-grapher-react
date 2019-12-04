import React from 'react';
import TopMenu from './components/top-menu/TopMenu';
import './App.css';
import ToolBar from './components/tool-bar/ToolBar';
import 'db-viewer-component';

const App: React.FC = () => {
  return (
    <div className='main_container'>
      <TopMenu/>
      <ToolBar/>
      <db-viewer/>
    </div>
  );
}

export default App;
