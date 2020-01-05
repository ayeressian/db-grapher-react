import React from 'react';
import { IColumn } from '../types';
import useTableStyles from '../useCommonTableStyle';

interface IProps {
  columns: IColumn[];
  register: any;
  addColumn:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
}

const Columns: React.FC<IProps> = ({ columns, register, addColumn }) => {
  const tableStyle = useTableStyles().table;
  const columnsTemplate = columns.map((_, index) => (
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
