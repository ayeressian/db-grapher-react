import React from 'react';
import { ColAtrs } from '../ColAttrs';
import useTableStyles from '../useCommonTableStyle';

interface IProps {
  addColumn:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
  tables: ITableSchema[];
  onColChange: (
    attr: ColAtrs,
    value: string | boolean,
    colIndex: number,
  ) => void;
}

const Columns: React.FC<IProps> = ({ addColumn, tables, onColChange }) => {
  const tableStyle = useTableStyles().table;
  const currentTable = tables[tables.length - 1];
  const onColChangeLocal = (attr: ColAtrs, colIndex: number) => (
    Event: React.FormEvent<HTMLInputElement>,
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
      if ((column as IColumnFkSchema).fk == null) {
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
                name={`columns[${index}].type`}
                onChange={onColChangeLocal('type', index)}
                value={(column as IColumnNoneFkSchema).type}
              />
            </td>
            <td>
              <input
                name={`columns[${index}].pk`}
                type='checkbox'
                onChange={onColChangeLocal('pk', index)}
                checked={column.pk}
              />
            </td>
            <td>
              <input
                name={`columns[${index}].uq`}
                type='checkbox'
                onChange={onColChangeLocal('uq', index)}
                checked={column.uq}
              />
            </td>
            <td>
              <input
                name={`columns[${index}].nn`}
                type='checkbox'
                onChange={onColChangeLocal('nn', index)}
                checked={column.nn}
              />
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
            <th>Columns</th>
          </tr>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>PK</th>
            <th>UQ</th>
            <th>NN</th>
            <th />
          </tr>
        </thead>
        <tbody>{columnsTemplate}</tbody>
      </table>
      <button onClick={addColumn}>Add column</button>
    </>
  );
};

export default Columns;
