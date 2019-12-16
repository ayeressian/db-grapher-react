import React from 'react';
import DbViewer from '../dbViewer/dbViewer';
import FileInputs from '../fileInputs/fileInputs';
import TableDialog from '../tableDialog/tableDialog';
import ToolBar from '../toolBar/toolBar';
import TopMenu from '../topMenu/topMenu';
import WelcomeDialog from '../welcomeDialog/welcomeDialog';
import './style.css';

const App: React.FC = () => {
  return (
    <>
      <div className='main_container'>
        <TopMenu />
        <ToolBar />
        <DbViewer />
        <WelcomeDialog />
        <TableDialog />
      </div>
      <FileInputs />
    </>
  );
};

export default App;
