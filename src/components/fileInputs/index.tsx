import React, { useRef, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../store/reducer';
import { validateJson } from './validateSchema';
import { action as schemaAction } from '../../store/schema';

const INVALID_JSON_MSG = 'Selected file doesn\'t contain valid JSON.';
const INVALID_FILE_FORMAT = 'Selected file doesn\'t have correct Db designer file format';

const FileInputs: React.FC = () => {
  const fileOpenElem = useRef<HTMLInputElement>(null);
  const fileSqlOpenElem = useRef<HTMLInputElement>(null);

  const openFile = useSelector((state: AppState) => state.dialog.fileDialog.fileOpenDialog);
  const openSqlFile = useSelector((state: AppState) => state.dialog.fileDialog.fileSqlOpenDialog);
  if (openFile) {
    fileOpenElem.current!.click();
  }

  if (openSqlFile) {
    fileOpenElem.current!.click();
  }

  const dispatch = useDispatch();

  const fileOpenChange = (event: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const target = event.target;
    reader.readAsText(target.files![0]);
    reader.onload = (event) => {
      let schema;
      try {
        schema = JSON.parse(event.target!.result as string);
      } catch (e) {
        alert(INVALID_JSON_MSG);
        return;
      }
      const jsonValidation = validateJson(schema);
      if (!jsonValidation) {
        alert(INVALID_FILE_FORMAT);
        return;
      }
      dispatch(schemaAction.setSchema());
    };
  };
  
  return (
    <>
      <input type="file" id="file_open" style={{ display: 'none' }} accept="application/json" ref={fileOpenElem} onChange={fileOpenChange}/>
      <input type="file" id="db_schema_file_open" style={{ display: 'none' }} ref={fileSqlOpenElem}/>
    </>
  );
};

export default FileInputs;