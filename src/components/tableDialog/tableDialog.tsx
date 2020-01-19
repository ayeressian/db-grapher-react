import React, {
  ChangeEvent,
  MouseEvent as ReactMouseEvent,
  useEffect,
} from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';
import { useImmer } from 'use-immer';
import { AppState } from '../../store/reducer';
import { actions as tableDialogActions } from '../../store/slices/createDialog';
import { actions as dbViewerModeActions } from '../../store/slices/dbViewerMode';
import Dialog from '../dialog/dialog';
import { ColAtrs } from './ColAttrs';
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

  const dispatch = useDispatch();
  const create = useSelector((store: AppState) => store.dialog.tableDialog);

  const storeTables = useSelector((store: AppState) => store.schema?.tables);

  const [tables, setTables] = useImmer<ITableSchema[]>([]);

  useEffect(() => {
    setTables(() =>
      storeTables?.concat({ name: EMPTY_TABLE_NAME, columns: [] }),
    );
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
    const formattedNewName = newName ? newName : EMPTY_TABLE_NAME;
    setTables((draft) => {
      const currentTable = getCurrentTable(draft);
      currentTable.name = formattedNewName;
    });
  };

  const onSubmit = (data: ITableSchema) => {
    console.log(data);
  };

  const onColChange = (
    attr: ColAtrs,
    value: string | boolean,
    colIndex: number,
  ) => {
    setTables((draft) => {
      const column = getCurrentTable(draft)!.columns[colIndex];
      switch (attr) {
        case 'name':
          column.name = value as string;
          break;
        case 'fkColumn':
          (column as IColumnFkSchema).fk!.column = value as string;
          break;
        case 'fkTable':
          (column as IColumnFkSchema).fk!.table = value as string;
          break;
        case 'pk':
        case 'nn':
        case 'uq':
          column[attr] = value as boolean;
          break;
        case 'type':
          (column as IColumnNoneFkSchema)[attr] = value as string;
          break;
      }
    });
  };

  return (
    <Dialog>
      <h3>{title}</h3>
      <form>
        <div>
          <label>
            Name:
            <input name='name' type='text' onChange={onChangeTableName} />
          </label>
        </div>
        <Columns
          {...{
            addColumn,
            tables,
            onColChange,
          }}
        />
        <FkColumns
          {...{
            addFkColumn,
            tables,
            onColChange,
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
