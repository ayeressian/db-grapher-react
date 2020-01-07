import React, { ChangeEvent, useEffect, useState } from 'react';
import useTableStyles from '../useCommonTableStyle';

interface IProps {
  register: any;
  addFkColumn:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
  tables: ITableSchema[];
}

const FkColumns: React.FC<IProps> = ({
  addFkColumn,
  register,
  tables = [],
}) => {
  const tableStyle = useTableStyles().table;
  const currentTable = tables[tables.length - 1];
  const [refColumns, setRefColumns] = useState<IColumnSchema[]>([]);
  useEffect(() => {
    if (tables.length > 0) {
      setRefColumns(tables[0].columns);
    }
  }, [tables]);

  const tableSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedTableName = event.target.value;
    const table = tables.find(
      (tableItem) => tableItem.name === selectedTableName,
    );
    setRefColumns(table!.columns.filter((column) => column.uq || column.pk));
  };

  const columnsTemplate = currentTable.columns.reduce<JSX.Element[]>(
    (acc, column, index) => {
      if (column.pk || column.uq) {
        const template = (
          <tr key={index}>
            <td>
              <input
                name={`columns[${index}].name`}
                ref={register({ required: true })}
              />
            </td>
            <td>
              <input
                name={`columnsFk[${index}].pk`}
                type='checkbox'
                ref={register}
              />
            </td>
            <td>
              <input
                name={`columnsFk[${index}].uq`}
                type='checkbox'
                ref={register}
              />
            </td>
            <td>
              <input
                name={`columnsFk[${index}].nn`}
                type='checkbox'
                ref={register}
              />
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
                {refColumns.map(({ name }) => (
                  <option key={name}>{name}</option>
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
