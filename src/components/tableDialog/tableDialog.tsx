import React, { MouseEvent as ReactMouseEvent, useState } from 'react';
import useForm from 'react-hook-form';
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

const EMPTY_TABLE_NAME = '<CURRENT_TABLE>';

const TableDialog: React.FC = () => {
  const { register, handleSubmit, watch } = useForm<ITableWithFk>();
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

  const storeTables = useSelector(
    (store: AppState) => store.schema?.tables ?? [],
    shallowEqual,
  );

  const [oldName, setOldName] = useState(EMPTY_TABLE_NAME);
  const [tables, setTables] = useImmer([
    ...storeTables,
    { name: oldName, columns: [] },
  ]);

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
        fk: {
          column: '',
          table: '',
        },
        name: '',
        nn: false,
        pk: false,
        uq: false,
      });
    });
  };

  const addRelation = () => {
    // TODO
  };

  const onChangeTableName = () => {
    // TODO
  };

  const onSubmit = (data: ITableWithFk) => {
    console.log(data);
  };

  let name = watch('name');
  if (name !== oldName) {
    setTables((tablesDraft) => {
      const currentTable = tablesDraft.find(
        (tableItem) => tableItem.name === oldName,
      )!;
      name = !name ? EMPTY_TABLE_NAME : name;
      currentTable.name = name;
    });
    setOldName(name);
  }
  return (
    <Dialog>
      <h3>{title}</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>
            Name:
            <input
              name='name'
              type='text'
              onChange={onChangeTableName}
              ref={register({
                required: true,
                validate: (value) =>
                  tables.findIndex((tableItem) => tableItem.name === value) ===
                  -1,
              })}
            />
          </label>
        </div>
        <Columns
          {...{
            addColumn,
            columns: table.columns,
            register,
          }}
        />
        <FkColumns
          {...{
            addFkColumn,
            fkColumns: table.columnsFk,
            register,
            tables,
          }}
        />
        <div className='errors' />
        <menu>
          <button onClick={cancel}>Cancel</button>
          <button onClick={save}>{saveLabel}</button>
          <input type='submit' />
        </menu>
      </form>
    </Dialog>
  );
};

export default TableDialog;
