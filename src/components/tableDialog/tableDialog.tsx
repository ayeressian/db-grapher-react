import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { AppState } from '../../store/reducer';
import Dialog from '../dialog/dialog';

const TableDialog: React.FC = () => {
  const create = useSelector((store: AppState) => store.dialog.tableDialog, shallowEqual);
  if (!create) return null;

  const title = create ? 'Create Table' : 'Edit Table';
  return (
    <Dialog>
      <h3>{title}</h3>
      <form>
        <div>
          <label>Name:
            <input type='text' required={true} />
          </label>
        </div>
        <table>
          <thead>
            <tr>
              <th>Columns</th>
            </tr>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>PK</th>
              <th>UQ</th>
              <th>NN</th>
              <th/>
            </tr>
          </thead>
          <tbody/>
        </table>
        <button id='add_column'>Add column</button>
        <table>
          <thead>
            <tr>
              <th>Foreign Key Columns</th>
            </tr>
            <tr>
              <th>Name</th>
              <th>PK</th>
              <th>UQ</th>
              <th>NN</th>
              <th>Foreign Table</th>
              <th>Foreign Column</th>
              <th/>
            </tr>
          </thead>
          <tbody/>
        </table>
        <button>Add relation</button>
        <div className='errors'/>
        <menu>
          <button type='button'>Cancel</button>
          <button/>
        </menu>
      </form>
    </Dialog>
  );
};

export default TableDialog;
