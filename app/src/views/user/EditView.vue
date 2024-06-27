<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "../../store";
import { watch } from "vue";
import moment from "moment";
import { Calendar, showToast } from "vant";
import { computed } from "vue";
import { YEAR_1997 } from "../../helper/constants";
import { useHttp } from "../../helper/hooks";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const isShowBirthdayCalendar = ref(false);
const form = ref(userStore.userInfo);
const isFormLoading = ref(false);
const http = useHttp();
const router = useRouter();

watch(
  () => userStore.userInfo,
  (newVal) => {
    const birthday = newVal.babyBirthday;
    if (birthday) {
      const mmt = moment(birthday);
      newVal._birthday = [
        mmt.format("YYYY"),
        mmt.format("MM"),
        mmt.format("DD"),
      ];
    } else {
      newVal._birthday = [];
    }
    form.value = newVal;
  },
  { immediate: true }
);

const birthdayToShow = computed(() => {
  const arr = form.value._birthday;
  if (!arr.length) {
    return "";
  } else {
    return arr.join("-");
  }
});

function onConfirmBirthday(val: Date) {
  console.log("val: ", val);
  const mmt = moment(val);
  form.value = {
    ...form.value,
    _birthday: [mmt.format("YYYY"), mmt.format("MM"), mmt.format("DD")],
  };
  isShowBirthdayCalendar.value = false;
}

async function submit() {
  const { babyName, _birthday } = form.value;
  let msg = "";
  if (!babyName) {
    msg = "请输入宝宝称呼";
  } else if (!_birthday.length) {
    msg = "请选择宝宝生日";
  }
  if (msg) {
    return showToast(msg);
  }

  isFormLoading.value = true;
  try {
    const newUser = await http.post("/user/edit/baby/info", {
      babyName,
      babyBirthday: _birthday.join("-"),
    });
    userStore.updateUserInfo(newUser);
    isFormLoading.value = false;
    showToast("保存成功！");
    router.replace("/");
  } catch (error) {
    isFormLoading.value = false;
  }
}
</script>

<template>
  <div class="p-4 pt-[100px]">
    <VanField
      v-model="form.babyName"
      label="宝宝称呼"
      placeholder="大名小名均可"
    />
    <VanField
      v-model="birthdayToShow"
      label="宝宝生日"
      placeholder="请选择宝宝生日"
      readonly
      @click="isShowBirthdayCalendar = true"
    />
    <Calendar
      @confirm="onConfirmBirthday"
      v-model:show="isShowBirthdayCalendar"
      switch-mode="year-month"
      :min-date="YEAR_1997"
    />
    <div class="mt-4">
      <VanButton
        type="primary"
        round
        block
        @click="submit"
        :loading="isFormLoading"
        >保存</VanButton
      >
    </div>
  </div>
</template>
<style></style>
