import React, { ChangeEvent, MouseEvent as ReactMouseEvent } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useImmer } from 'use-immer';
import { AppState } from '../../store/reducer';
import { actions as tableDialogActions } from '../../store/slices/createDialog';
import { actions as dbViewerModeActions } from '../../store/slices/dbViewerMode';
import Dialog from '../dialog/dialog';
import Columns from './columns';
import FkColumns from './fkColumns';
import { IColumn } from './IColumn';

export interface IFk {
  table: string;
  column: string;
}

interface ITable {
  columns: IColumn[];
  name: string;
}

interface ITableWithFk extends ITable {
  columnsFk: IColumn[];
}

const TableDialog: React.FC = () => {
  const [table, updateTable] = useImmer<ITableWithFk>({
    columns: [],
    columnsFk: [],
    name: '',
  });

  const dispatch = useDispatch();
  const create = useSelector(
    (store: AppState) => store.dialog.tableDialog,
    shallowEqual,
  );
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

  const onChangeTableName = (event: ChangeEvent<HTMLInputElement>) => {
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

  const addFkColumn = (
    event: ReactMouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    updateTable((draft) => {
      draft.columnsFk.push({
        name: '',
        nn: false,
        pk: false,
        fk: {
          table: '',
          column: '',
        },
        uq: false,
      });
    });
  };

  const addRelation = () => { };

  const onColumnNameChange = (index: number) => (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;
    updateTable((draft) => {
      draft.columns[index].name = value;
    });
  };

  const onTypeChange = (index: number) => (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;
    updateTable((draft) => {
      draft.columns[index].type = value;
    });
  };

  const onPkChange = (index: number) => (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const checked = event.target.checked;
    updateTable((draft) => {
      draft.columns[index].pk = checked;
    });
  };

  const onUqChange = (index: number) => (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const checked = event.target.checked;
    updateTable((draft) => {
      draft.columns[index].uq = checked;
    });
  };

  const onNnChange = (index: number) => (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const checked = event.target.checked;
    updateTable((draft) => {
      draft.columns[index].nn = checked;
    });
  };

  const onFkColumnNameChange = (index: number) => (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;
    updateTable((draft) => {
      draft.columnsFk[index].name = value;
    });
  };

  const onFkPkChange = (index: number) => (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const checked = event.target.checked;
    updateTable((draft) => {
      draft.columnsFk[index].pk = checked;
    });
  };

  const onFkUqChange = (index: number) => (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const checked = event.target.checked;
    updateTable((draft) => {
      draft.columnsFk[index].uq = checked;
    });
  };

  const onFkNnChange = (index: number) => (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const checked = event.target.checked;
    updateTable((draft) => {
      draft.columnsFk[index].nn = checked;
    });
  };

  return (
    <Dialog>
      <h3>{title}</h3>
      <form>
        <div>
          <label>
            Name:
            <input
              type='text'
              required={true}
              value={table.name}
              onChange={onChangeTableName}
            />
          </label>
        </div>
        <Columns
          {...{
            addColumn,
            columns: table.columns,
            onColumnNameChange,
            onNnChange,
            onPkChange,
            onTypeChange,
            onUqChange,
          }}
        />
        <FkColumns
          {...{
            addFkColumn,
            fkColumns: table.columnsFk,
            onFkColumnNameChange,
            onFkNnChange,
            onFkPkChange,
            onFkUqChange,
          }}
        />
        <div className='errors' />
        <menu>
          <button onClick={cancel}>Cancel</button>
          <button onClick={save}>{saveLabel}</button>
        </menu>
      </form>
    </Dialog>
  );
};

export default TableDialog;
