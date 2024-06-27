import { useHttp } from "@/helper/hooks";
import type { IUserInfo } from "@/types";
import { defineStore } from "pinia";
import { showDialog } from "vant";
import { ref } from "vue";
import { useRouter } from "vue-router";

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<IUserInfo>({
    babyBirthday: '',
    babyName: '宝宝',
  });
  const http = useHttp();
  const router= useRouter();

  async function init() {
    const res = await http.get<IUserInfo>('/user/info');
    const {babyBirthday, babyName} = res;
    if (!babyBirthday && !babyName) {
      // 没有完善信息
      try {
        const skip = localStorage.getItem('skipBabyInfo');
        // 没有skip信息或者skip信息已经过期
        if (!skip || +skip < Date.now()) {
          await showDialog({
            title: '宝宝信息未完善',
            message: '完善宝宝信息后，系统提示信息会更加精准哦！\n没有敏感信息，放心填写。',
            confirmButtonText: '去完善',
            showCancelButton: true,
            cancelButtonText: '稍后提醒',
            closeOnClickOverlay: false,
          });
          router.push('/user/edit');
        }
      } catch (error) {
      }
      localStorage.setItem('skipBabyInfo', Date.now() + 24*60*6e4 + '');
    }
    userInfo.value = res;
  }

  function updateUserInfo(data: Partial<IUserInfo>) {
    userInfo.value = Object.assign(userInfo.value, data);
  }

  init();


  return {
    userInfo,
    updateUserInfo,
  }
} )