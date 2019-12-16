import { IFk } from './tableDialog';
export interface IColumn {
  name: string;
  type?: string;
  pk: boolean;
  uq: boolean;
  nn: boolean;
  fk?: IFk;
}
