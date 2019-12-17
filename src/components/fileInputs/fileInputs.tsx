import React, { ChangeEvent, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/reducer';
import { actions as schemaAction } from '../../store/slices/schema';
import { validateJson } from './validateSchema';

const INVALID_JSON_MSG = 'Selected file does not contain valid JSON.';
const INVALID_FILE_FORMAT =
  'Selected file does not have correct Db designer file format';

const FileInputs: React.FC = () => {
  const fileOpenElem = useRef<HTMLInputElement>(null);
  const fileSqlOpenElem = useRef<HTMLInputElement>(null);

  const openFile = useSelector(
    (state: AppState) => state.dialog.fileDialog.fileOpenDialog,
  );
  const openSqlFile = useSelector(
    (state: AppState) => state.dialog.fileDialog.fileSqlOpenDialog,
  );
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
    reader.onload = (readerEvent) => {
      let schema;
      try {
        schema = JSON.parse(readerEvent.target!.result as string);
      } catch (e) {
        alert(INVALID_JSON_MSG);
        return;
      }
      const jsonValidation = validateJson(schema);
      if (!jsonValidation) {
        alert(INVALID_FILE_FORMAT);
        return;
      }
      dispatch(schemaAction.setSchema(schema));
    };
  };

  const importSqlFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    // this.chooseDbDialog.getDbType().then((dbType) => {
    //   if (dbType == null) {
    //     this.dialog.open();
    //     return;
    //   }
    //   setupDbScehmaFileOpen(dbSchemaFileOpen, setSchema, () => Promise.resolve(dbType));
    //   dbSchemaFileOpen.click();
    // });
  };

  return (
    <>
      <input
        type='file'
        style={{ display: 'none' }}
        accept='application/json'
        ref={fileOpenElem}
        onChange={fileOpenChange}
      />
      <input
        type='file'
        style={{ display: 'none' }}
        ref={fileSqlOpenElem}
        onChange={importSqlFileChange}
      />
    </>
  );
};

export default FileInputs;
