import React, { ChangeEvent } from 'react';
import { ColAtrs } from '../ColAttrs';
import useTableStyles from '../useCommonTableStyle';

interface IProps {
  addFkColumn:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
  tables: ITableSchema[];
  onColChange: (
    attr: ColAtrs,
    value: string | boolean,
    colIndex: number,
  ) => void;
}

const filterPkUq = (table: ITableSchema) =>
  table.columns.filter((column) => column.uq || column.pk);

const FkColumns: React.FC<IProps> = ({
  addFkColumn,
  tables = [],
  onColChange,
}) => {
  const tableStyle = useTableStyles().table;
  const currentTable = tables[tables.length - 1];

  const getFkColumnOptions = (colIndex: number) => {
    const fkTableName = (currentTable.columns[colIndex] as IColumnFkSchema).fk!
      .table;
    if (fkTableName !== '') {
      const selectedTable = tables.find((table) => fkTableName === table.name);
      return filterPkUq(selectedTable!);
    }
    return [];
  };

  const onColChangeLocal = (attr: ColAtrs, colIndex: number) => (
    Event: React.FormEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
  ) =>
    onColChange(
      attr,
      ['nn', 'pk', 'uq'].indexOf(attr) === -1
        ? Event.currentTarget.value
        : (Event.currentTarget as HTMLInputElement).checked,
      colIndex,
    );

  const columnsTemplate = currentTable.columns.reduce<JSX.Element[]>(
    (acc, column, index) => {
      if ((column as IColumnFkSchema).fk != null) {
        const template = (
          <tr key={index}>
            <td>
              <input
                name={`columns[${index}].name`}
                onChange={onColChangeLocal('name', index)}
                value={column.name}
              />
            </td>
            <td>
              <input
                name={`columnsFk[${index}].pk`}
                type='checkbox'
                onChange={onColChangeLocal('pk', index)}
                checked={column.pk}
              />
            </td>
            <td>
              <input
                name={`columnsFk[${index}].uq`}
                type='checkbox'
                onChange={onColChangeLocal('uq', index)}
                checked={column.uq}
              />
            </td>
            <td>
              <input
                name={`columnsFk[${index}].nn`}
                type='checkbox'
                onChange={onColChangeLocal('nn', index)}
                checked={column.nn}
              />
            </td>
            <td>
              <select
                name={`columnsFk[${index}].fk.table`}
                onChange={onColChangeLocal('fkTable', index)}
                value={(column as IColumnFkSchema).fk!.table}
              >
                <option />
                {tables.map(({ name }) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <select
                name={`columnsFk[${index}].fk.column`}
                onChange={onColChangeLocal('fkColumn', index)}
                value={(column as IColumnFkSchema).fk!.column}
              >
                <option />
                {getFkColumnOptions(index).map(({ name }, refColumnIndex) => (
                  <option key={refColumnIndex} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </td>
          </tr>
        );
        acc.push(template);
      }
      return acc;
    },
    [],
  );

  return (
    <>
      <table className={tableStyle}>
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
        <tbody>{columnsTemplate}</tbody>
      </table>
      <button onClick={addFkColumn}>Add relation</button>
    </>
  );
};

export default FkColumns;
