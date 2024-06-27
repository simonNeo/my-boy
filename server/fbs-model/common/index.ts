export interface IPage {
  pageIndex: number;
  pageSize: number;
  pageTotal?: number;
}
export interface IReturnData<T> {
  code: number;
  data: {
    content: T;
    page?: IPage;
  };
  msg: string;
}
