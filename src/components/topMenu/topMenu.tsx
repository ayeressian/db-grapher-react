import Menu, { MenuItem, SubMenu } from 'rc-menu';
import 'rc-menu/assets/index.css';
import React from 'react';
import './style.css';

const TopMenu: React.FC = () => {
  return (
    <Menu
      mode='horizontal'
    >
      <SubMenu title={<span className='submenu-title-wrapper'>File</span>} key='1'>
        <MenuItem key='new'>New</MenuItem>
        <MenuItem key='open'>Open</MenuItem>
        <MenuItem key='download'>Download</MenuItem>
      </SubMenu>
      <SubMenu title={<span className='submenu-title-wrapper'>Import/Export</span>} key='2'>
        <MenuItem key='import'>Import</MenuItem>
        <MenuItem key='export'>Export</MenuItem>
      </SubMenu>
      <SubMenu title={<span className='submenu-title-wrapper'>Help</span>} key='3'>
        <MenuItem key='issueReport'>Report an issue</MenuItem>
      </SubMenu>
    </Menu>
  );
};

export default TopMenu;
