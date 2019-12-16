import React from 'react';
import { IColumn } from './IColumn';

type callback = (
  arg0: number,
) => ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;

interface IProps {
  fkColumns: IColumn[];
  onFkColumnNameChange: callback;
  onFkPkChange: callback;
  onFkUqChange: callback;
  onFkNnChange: callback;
  addFkColumn:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
}

const FkColumns: React.FC<IProps> = ({
  fkColumns,
  onFkColumnNameChange,
  onFkPkChange,
  onFkUqChange,
  onFkNnChange,
  addFkColumn,
}) => {
  const columnsJsx = fkColumns.map(({ name, pk, uq, nn }, index) => (
    <tr key={index}>
      <td>
        <input value={name} onChange={onFkColumnNameChange(index)} />
      </td>
      <td>
        <input type='checkbox' checked={pk} onChange={onFkPkChange(index)} />
      </td>
      <td>
        <input type='checkbox' checked={uq} onChange={onFkUqChange(index)} />
      </td>
      <td>
        <input type='checkbox' checked={nn} onChange={onFkNnChange(index)} />
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
