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

const Columns: React.FC<IProps> = ({ columns, register, addColumn }) => {
  const columnsJsx = columns.map((_, index) => (
    <tr key={index}>
      <td>
        <input
          name={`columns[${index}].name`}
          ref={register({ required: true })}
        />
      </td>
      <td>
        <input
          name={`columns[${index}].type`}
          ref={register({ required: true })}
        />
      </td>
      <td>
        <input name={`columns[${index}].pk`} type='checkbox' ref={register} />
      </td>
      <td>
        <input name={`columns[${index}].uq`} type='checkbox' ref={register} />
      </td>
      <td>
        <input name={`columns[${index}].nn`} type='checkbox' ref={register} />
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
