import Menu, { MenuItem, SubMenu } from 'rc-menu';
// tslint:disable-next-line: no-submodule-imports
import 'rc-menu/assets/index.css';
import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  rcMenuRoot: {
    marginTop: 0,
    gridRow: 1,
    gridColumnStart: 1,
    gridColumnEnd: 3,
  },
});

const TopMenu: React.FC = () => {
  const classes = useStyles();
  return (
    <Menu mode='horizontal' className={classes.rcMenuRoot}>
      <SubMenu
        title={<span className='submenu-title-wrapper'>File</span>}
        key='1'
      >
        <MenuItem key='new'>New</MenuItem>
        <MenuItem key='open'>Open</MenuItem>
        <MenuItem key='download'>Download</MenuItem>
      </SubMenu>
      <SubMenu
        title={<span className='submenu-title-wrapper'>Import/Export</span>}
        key='2'
      >
        <MenuItem key='import'>Import</MenuItem>
        <MenuItem key='export'>Export</MenuItem>
      </SubMenu>
      <SubMenu
        title={<span className='submenu-title-wrapper'>Help</span>}
        key='3'
      >
        <MenuItem key='issueReport'>Report an issue</MenuItem>
      </SubMenu>
    </Menu>
  );
};

export default TopMenu;
