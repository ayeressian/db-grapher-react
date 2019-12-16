import React from 'react';
import { IColumn } from './IColumn';

type callback = (
  arg0: number,
) => ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;

interface IProps {
  columns: IColumn[];
  onColumnNameChange: callback;
  onTypeChange: callback;
  onPkChange: callback;
  onUqChange: callback;
  onNnChange: callback;
  addColumn:
  | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
  | undefined;
}

const Columns: React.FC<IProps> = ({
  columns,
  onColumnNameChange,
  onTypeChange,
  onPkChange,
  onUqChange,
  onNnChange,
  addColumn,
}) => {
  const columnsJsx = columns.map(({ name, type, pk, uq, nn }, index) => (
    <tr key={index}>
      <td>
        <input value={name} onChange={onColumnNameChange(index)} />
      </td>
      <td>
        <input value={type} onChange={onTypeChange(index)} />
      </td>
      <td>
        <input type='checkbox' checked={pk} onChange={onPkChange(index)} />
      </td>
      <td>
        <input type='checkbox' checked={uq} onChange={onUqChange(index)} />
      </td>
      <td>
        <input type='checkbox' checked={nn} onChange={onNnChange(index)} />
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
