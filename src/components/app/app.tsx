import React from 'react';
import { createUseStyles } from 'react-jss';
import DbViewer from '../dbViewer/dbViewer';
import FileInputs from '../fileInputs/fileInputs';
import TableDialog from '../tableDialog/tableDialog';
import ToolBar from '../toolBar/toolBar';
import TopMenu from '../topMenu/topMenu';
import WelcomeDialog from '../welcomeDialog/welcomeDialog';

const useStyle = createUseStyles({
  mainContainer: {
    display: 'grid',
    gridTemplateColumns: '60px 1fr',
    gridTemplateRows: '52px 1fr',
    width: '100vw',
    height: '100vh',
  },
});

const App: React.FC = () => {
  const classes = useStyle();
  return (
    <>
      <div className={classes.mainContainer}>
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
