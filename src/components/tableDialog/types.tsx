export interface IColumn {
  name: string;
  type?: string;
  pk: boolean;
  uq: boolean;
  nn: boolean;
  fk?: IFk;
}

export interface IFk {
  table: string;
  column: string;
}

export interface ITable {
  columns: IColumn[];
  name: string;
}

export interface ITableWithFk extends ITable {
  columnsFk: IColumn[];
}
