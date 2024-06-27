import axios from 'axios';

import { AxiosRequestConfig, AxiosResponse } from 'axios';  
  
// 泛型类型，用于描述 $http 方法可能返回的任何数据  
export type HttpResponseData<T = any> = T;  
  
// 自定义的 $http 方法类型  
export type CustomAxiosInstance<T = any> = {  
  <R = T>(config: AxiosRequestConfig): Promise<HttpResponseData<R>>;  
  get<R = T>(url: string, config?: AxiosRequestConfig): Promise<HttpResponseData<R>>;  
  post<R = T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<HttpResponseData<R>>;  
};

export {}

declare module 'vue' {
  interface ComponentCustomProperties {
    $formatDate: (a: any, b?: any) => any; 
    $typeStr: (a: number, b?: string) => string;
    $http: CustomAxiosInstance;
  }
}

export interface IUserInfo {
  babyName: string;
  babyBirthday: string;
}