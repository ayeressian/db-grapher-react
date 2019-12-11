import React from 'react';
import DbViewer from '../dbViewer/dbViewer';
import FileInputs from '../fileInputs/fileInputs';
import ToolBar from '../toolBar/toolBar';
import TopMenu from '../topMenu/topMenu';
import WelcomeDialog from '../welcomeDialog/welcomeDialog';
import './style.css';

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
};

export default App;
