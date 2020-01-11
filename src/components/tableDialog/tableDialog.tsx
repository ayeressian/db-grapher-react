import React, {
  ChangeEvent,
  MouseEvent as ReactMouseEvent,
  useEffect,
} from 'react';
import { ErrorMessage, useForm } from 'react-hook-form';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';
import { useImmer } from 'use-immer';
import { AppState } from '../../store/reducer';
import { actions as tableDialogActions } from '../../store/slices/createDialog';
import { actions as dbViewerModeActions } from '../../store/slices/dbViewerMode';
import Dialog from '../dialog/dialog';
import Columns from './columns/columns';
import FkColumns from './fkColumns/fkColumns';

const EMPTY_TABLE_NAME = '<CURRENT_TABLE>';

const useStyles = createUseStyles({
  error: {
    color: '#cc0000',
  },
  menu: {
    display: 'flex',
    justifyContent: 'center',
    paddingleft: 0,
    '& button:not(:first-child)': {
      marginLeft: '10px',
    },
  },
});

const TableDialog: React.FC = () => {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm<ITableSchema>();

  const dispatch = useDispatch();
  const create = useSelector((store: AppState) => store.dialog.tableDialog);

  const storeTables = useSelector((store: AppState) => store.schema?.tables);

  const [tables, setTables] = useImmer<ITableSchema[]>([]);

  useEffect(() => {
    setTables(() => [...(storeTables || []), { name: '', columns: [] }]);
  }, [setTables, storeTables]);

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
    setTables((draft) => {
      const currentTable = getCurrentTable(draft);
      currentTable.columns.push({
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
    setTables((draft) => {
      const currentTable = getCurrentTable(draft);
      currentTable.columns.push({
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

  const getCurrentTable = (tablesTmp = tables) =>
    tablesTmp[tablesTmp.length - 1];

  const onChangeTableName = (event: ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setTables((tablesDraft) => {
      const formattedNewName = newName ? newName : EMPTY_TABLE_NAME;
      setTables((draft) => {
        const currentTable = getCurrentTable(draft);
        currentTable.name = formattedNewName;
      });
    });
  };

  const onSubmit = (data: ITableSchema) => {
    console.log(data);
  };

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
                required: 'Name is required',
                validate: (value: string) =>
                  tables.findIndex((tableItem) => tableItem.name === value) ===
                  -1,
              })}
            />
          </label>
          <ErrorMessage
            errors={errors}
            name='name'
            as={<div className={classes.error} />}
          />
        </div>
        <Columns
          {...{
            addColumn,
            register,
            tables,
          }}
        />
        <FkColumns
          {...{
            addFkColumn,
            register,
            tables,
          }}
        />
        <div className='errors' />
        <menu className={classes.menu}>
          <button onClick={cancel}>Cancel</button>
          <button onClick={save}>{saveLabel}</button>
          <input type='submit' />
        </menu>
      </form>
    </Dialog>
  );
};

export default TableDialog;
