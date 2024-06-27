import { formatDate } from "./filters"
import {feedTypeArr, getUrl, milkTypeArr, typeArr} from './constants';

import axios from 'axios'
import { showToast } from "vant";



export const FormatDatePlugin = {
  install: (app: any, options?: any) => {
    app.config.globalProperties.$formatDate = formatDate;
    app.config.globalProperties.$typeStr = (value: number, type = 'default') => {
      let result = null;
      switch (type) {
        case 'default':
          result = typeArr.find((item) => item.id === value);
          break;
        case 'feed':
          result = feedTypeArr.find((item) => item.id === value);
          break;
        case 'milk':
          result = milkTypeArr.find((item) => item.id === value);
          break;
      }
      return result ? result.text : '其他';
    };
  }
}

export const AxiosPlugin = {
  install: (app: any) => {
    const  instance = axios.create({
      baseURL: getUrl(),
      timeout: 6e4,
    });
    instance.interceptors.request.use((config) => {
      config.headers['token'] = localStorage.getItem('token')
      return config;
    });
    instance.interceptors.response.use((response) => {
      const {code, msg, data} = response.data || {};
      if (code === 1) {
        return data;
      }
      if (msg) {
        showToast({message: msg, type: 'fail'});
      }
      if (code === 8000) {
        const router = app.config.globalProperties.$router;
        if (router) {
          router.replace('/login');
        }
      }
      throw new Error(msg || '未知错误');
    });

    app.config.globalProperties.$http = instance;
  }
}