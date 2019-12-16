import React, { ChangeEvent, MouseEvent as ReactMouseEvent } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useImmer } from 'use-immer';
import { AppState } from '../../store/reducer';
import { actions as tableDialogActions } from '../../store/slices/createDialog';
import { actions as dbViewerModeActions } from '../../store/slices/dbViewerMode';
import Dialog from '../dialog/dialog';

interface IFk {
  table: string;
  column: string;
}

interface IColumn {
  name: string;
  type: string;
  pk: boolean;
  uq: boolean;
  nn: boolean;
  fk?: IFk;
}

interface ITable {
  columns: IColumn[];
  name: string;
}

const TableDialog: React.FC = () => {
  const [table, updateTable] = useImmer<ITable>({
    columns: [],
    name: '',
  });

  const dispatch = useDispatch();
  const create = useSelector((store: AppState) => store.dialog.tableDialog, shallowEqual);
  if (!create) return null;

  const title = create ? 'Create Table' : 'Edit Table';
  const saveLabel = create ? 'Create' : 'Save';

  const end = () => {
    dispatch(tableDialogActions.close());
    dispatch(dbViewerModeActions.none());
  };

  const cancel = () => {
    end();
  };

  const save = () => {
    end();
  };

  const onChangeTableName =
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      updateTable((draft) => {
        draft.name = value;
      });
    };

  const addColumn = (event: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    updateTable((draft) => {
      draft.columns.push({
        name: '',
        nn: false,
        pk: false,
        type: '',
        uq: false,
      });
    });
  };

  const addRelation = () => {};

  const onColumnNameChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    updateTable((draft) => {
      draft.columns[index].name = value;
    });
  };

  const onTypeChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    updateTable((draft) => {
      draft.columns[index].type = value;
    });
  };

  const onPkChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    updateTable((draft) => {
      draft.columns[index].pk = checked;
    });
  };

  const onUqChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    updateTable((draft) => {
      draft.columns[index].uq = checked;
    });
  };

  const onNnChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    updateTable((draft) => {
      draft.columns[index].nn = checked;
    });
  };

  const columns = table.columns.filter((column) => column.fk == null).map(({name, type, pk, uq, nn}, index) => (
    <tr key={index}>
      <td>
        <input value={name} onChange={onColumnNameChange(index)}/>
      </td>
      <td>
        <input value={type} onChange={onTypeChange(index)}/>
      </td>
      <td>
        <input type='checkbox' checked={pk} onChange={onPkChange(index)}/>
      </td>
      <td>
        <input type='checkbox' checked={uq} onChange={onUqChange(index)}/>
      </td>
      <td>
        <input type='checkbox' checked={nn} onChange={onNnChange(index)}/>
      </td>
    </tr>
    ));

  const fkColumns = table.columns.filter((column) => column.fk != null).map(({name, pk, uq, nn, fk}) => (
    <tr key={name}>
      <td>{name}</td>
      <td>{pk}</td>
      <td>{uq}</td>
      <td>{nn}</td>
      <td>{fk!.table}</td>
      <td>{fk!.column}</td>
    </tr>
    ));

  return (
    <Dialog>
      <h3>{title}</h3>
      <form>
        <div>
          <label>Name:
            <input type='text' required={true} value={table.name} onChange={onChangeTableName}/>
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
          <tbody>
            {columns}
          </tbody>
        </table>
        <button onClick={addColumn}>Add column</button>
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
            </tr>
          </thead>
          <tbody>
            {fkColumns}
          </tbody>
        </table>
        <button onClick={addRelation}>Add relation</button>
        <div className='errors'/>
        <menu>
          <button onClick={cancel}>Cancel</button>
          <button onClick={save}>{saveLabel}</button>
        </menu>
      </form>
    </Dialog>
  );
};

export default TableDialog;
