import React from 'react';
import { IColumn } from './IColumn';

type callback = (
  arg0: number,
) => ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;

interface IProps {
  fkColumns: IColumn[];
  register: any;
  addFkColumn:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
}

const FkColumns: React.FC<IProps> = ({ fkColumns, addFkColumn, register }) => {
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
        />
      </td>
      <td>
        <select
          name={`columnsFk[${index}].fk.column`}
          ref={register({ required: true })}
        />
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
