import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  dialog: {
    left: 0,
    position: 'fixed',
    top: 0,
    height: '100%',
    width: '100%',

    /* this is what centers your element in the fixed wrapper*/
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center', // aligns on vertical for column
    alignItems: 'center', // aligns on horizontal for column
    backgroundColor: 'rgba(0,0,0,0.4)',
  },

  dialogContent: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    border: '1px solid #888',
    margin: 'auto',
    padding: '20px',
  },
});

const Dialog: React.FC = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.dialog}>
      <div className={classes.dialogContent}>{children}</div>
    </div>
  );
};

export default Dialog;
