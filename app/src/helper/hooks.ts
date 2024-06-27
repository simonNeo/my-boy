import { getCurrentInstance } from "vue";

export function useHttp() {
  const instance = getCurrentInstance();
  if (!instance) {
    throw new Error("instance is undefined");
  }

  return instance.appContext.config.globalProperties.$http;
}