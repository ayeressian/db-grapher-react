import React from 'react';
import TopMenu from '../top-menu';
import './style.css';
import ToolBar from '../tool-bar';
import WelcomeDialog from '../welcomeDialog';
import FileInputs from '../fileInputs';
import DbViewer from '../dbViewer';

const App: React.FC = () => {
  return (
    <>
      <div className='main_container'>
        <TopMenu/>
        <ToolBar/>
        <DbViewer/>
        <WelcomeDialog/>
      </div>
      <FileInputs/>
    </>
  );
}

export default App;
