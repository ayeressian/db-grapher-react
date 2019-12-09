import Ajv from 'ajv';
import validationSchema from './validationSchema';

const ajv = new Ajv();
const ajvCompiled = ajv.compile(validationSchema);

export function validateJson(dbSchema: string) {
  const validJson = ajvCompiled(dbSchema);
  return validJson;
}
