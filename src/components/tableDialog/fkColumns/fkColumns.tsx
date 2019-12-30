import React, { ChangeEvent, useEffect, useState } from 'react';
import { IColumn } from '../IColumn';

type callback = (
  arg0: number,
) => ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;

interface IProps {
  fkColumns: IColumn[];
  register: any;
  addFkColumn:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
  tables: ITableSchema[];
}

const FkColumns: React.FC<IProps> = ({
  fkColumns,
  addFkColumn,
  register,
  tables = [],
}) => {
  const [columns, setColumns] = useState<IColumnSchema[]>([]);

  useEffect(() => {
    if (tables.length > 0) {
      setColumns(tables[0].columns);
    }
  }, [tables]);

  const tableSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedTableName = event.target.value;
    const table = tables.find(
      (tableItem) => tableItem.name === selectedTableName,
    );
    setColumns(table!.columns);
  };
  const columnsJsx = fkColumns.map((_, index) => (
    <tr key={index}>
      <td>
        <input
          name={`columns[${index}].name`}
          ref={register({ required: true })}
        />
      </td>
      <td>
        <input name={`columnsFk[${index}].pk`} type='checkbox' ref={register} />
      </td>
      <td>
        <input name={`columnsFk[${index}].uq`} type='checkbox' ref={register} />
      </td>
      <td>
        <input name={`columnsFk[${index}].nn`} type='checkbox' ref={register} />
      </td>
      <td>
        <select
          name={`columnsFk[${index}].fk.table`}
          ref={register({ required: true })}
          onChange={tableSelect}
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
        >
          {columns.map(({ name }) => (
            <option key={name}>{name}</option>
          ))}
        </select>
      </td>
    </tr>
  ));

  return (
    <>
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
        <tbody>{columnsJsx}</tbody>
      </table>
      <button onClick={addFkColumn}>Add relation</button>
    </>
  );
};

export default FkColumns;
