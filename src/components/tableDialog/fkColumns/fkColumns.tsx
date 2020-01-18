import React, { ChangeEvent, useEffect, useState } from 'react';
import { ColAtrs } from '../ColAttrs';
import useTableStyles from '../useCommonTableStyle';

interface IProps {
  register: any;
  addFkColumn:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
  tables: ITableSchema[];
  onColChange: (attr: ColAtrs, value: string, colIndex: number) => void;
}

const filterPkUq = (table: ITableSchema) =>
  table.columns.filter((column) => column.uq || column.pk);

const FkColumns: React.FC<IProps> = ({
  addFkColumn,
  register,
  tables = [],
  onColChange,
}) => {
  const tableStyle = useTableStyles().table;
  const currentTable = tables[tables.length - 1];
  const [refColumns, setRefColumns] = useState<IColumnSchema[]>([]);
  useEffect(() => {
    if (tables.length > 0) {
      setRefColumns(filterPkUq(tables[0]));
    }
  }, [tables]);

  const tableSelect = (colIndex: number) => (
    event: ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedTableName = event.target.value;
    const table = tables.find(
      (tableItem) => tableItem.name === selectedTableName,
    );
    console.log(table);
    setRefColumns(filterPkUq(table!));
    onColChange('fkTable', selectedTableName, colIndex);
  };

  const onColChangeLocal = (attr: ColAtrs, colIndex: number) => (
    Event: React.FormEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
  ) => onColChange(attr, Event.currentTarget.value, colIndex);

  const columnsTemplate = currentTable.columns.reduce<JSX.Element[]>(
    (acc, column, index) => {
      if ((column as IColumnFkSchema).fk != null) {
        const template = (
          <tr key={index}>
            <td>
              <input
                name={`columns[${index}].name`}
                ref={register({ required: true })}
                onChange={onColChangeLocal('name', index)}
              />
            </td>
            <td>
              <input
                name={`columnsFk[${index}].pk`}
                type='checkbox'
                ref={register}
                onChange={onColChangeLocal('pk', index)}
              />
            </td>
            <td>
              <input
                name={`columnsFk[${index}].uq`}
                type='checkbox'
                ref={register}
                onChange={onColChangeLocal('uq', index)}
              />
            </td>
            <td>
              <input
                name={`columnsFk[${index}].nn`}
                type='checkbox'
                ref={register}
                onChange={onColChangeLocal('nn', index)}
              />
            </td>
            <td>
              <select
                name={`columnsFk[${index}].fk.table`}
                ref={register({ required: true })}
                onChange={tableSelect(index)}
              >
                {tables.map(({ name }) => (
                  <option key={name}>{name}</option>
                ))}
              </select>
            </td>
            <td>
              <select
                name={`columnsFk[${index}].fk.column`}
                ref={register({ required: true })}
                onChange={onColChangeLocal('fkColumn', index)}
              >
                {refColumns.map(({ name }, refColumnIndex) => (
                  <option key={refColumnIndex}>{name}</option>
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
