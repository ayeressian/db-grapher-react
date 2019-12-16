import React from 'react';
import { IColumn } from './IColumn';

type callback = (
  arg0: number,
) => ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;

interface IProps {
  columns: IColumn[];
  register: any;
  addColumn:
  | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
  | undefined;
}

const Columns: React.FC<IProps> = ({
  columns,
  register,
  addColumn,
}) => {
  const columnsJsx = columns.map(({ name, type, pk, uq, nn }, index) => (
    <tr key={index}>
      <td>
        <input value={name} />
      </td>
      <td>
        <input value={type} />
      </td>
      <td>
        <input type='checkbox' checked={pk} />
      </td>
      <td>
        <input type='checkbox' checked={uq} />
      </td>
      <td>
        <input type='checkbox' checked={nn} />
      </td>
    </tr>
  ));

  return (
    <>
      <table>
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
        <tbody>{columnsJsx}</tbody>
      </table>
      <button onClick={addColumn}>Add column</button>
    </>
  );
};

export default Columns;
