import React, { ChangeEvent, MouseEvent as ReactMouseEvent } from 'react';
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

  const name = watch('name');
  console.log(name);
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
              required={true}
              onChange={onChangeTableName}
              ref={register({ required: true })}
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
