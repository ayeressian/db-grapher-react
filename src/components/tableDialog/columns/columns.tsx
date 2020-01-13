import React from 'react';
import { ColAtrs } from '../ColAttrs';
import useTableStyles from '../useCommonTableStyle';

interface IProps {
  register: any;
  addColumn:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
  tables: ITableSchema[];
  onColChange: (attr: ColAtrs, value: string, colIndex: number) => void;
}

const Columns: React.FC<IProps> = ({
  register,
  addColumn,
  tables,
  onColChange,
}) => {
  const tableStyle = useTableStyles().table;
  const currentTable = tables[tables.length - 1];
  const onColChangeLocal = (attr: ColAtrs, colIndex: number) => (
    Event: React.FormEvent<HTMLInputElement>,
  ) => onColChange(attr, Event.currentTarget.value, colIndex);

  const columnsTemplate = currentTable.columns.reduce<JSX.Element[]>(
    (acc, column, index) => {
      if ((column as IColumnFkSchema).fk == null) {
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
                name={`columns[${index}].type`}
                ref={register({ required: true })}
                onChange={onColChangeLocal('type', index)}
              />
            </td>
            <td>
              <input
                name={`columns[${index}].pk`}
                type='checkbox'
                ref={register}
                onChange={onColChangeLocal('pk', index)}
              />
            </td>
            <td>
              <input
                name={`columns[${index}].uq`}
                type='checkbox'
                ref={register}
                onChange={onColChangeLocal('uq', index)}
              />
            </td>
            <td>
              <input
                name={`columns[${index}].nn`}
                type='checkbox'
                ref={register}
                onChange={onColChangeLocal('nn', index)}
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
