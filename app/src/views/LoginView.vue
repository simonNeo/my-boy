<script setup lang="ts">
import { useHttp } from "@/helper/hooks";
import { showDialog, showToast } from "vant";
import { ref } from "vue";
import { useRouter } from "vue-router";

const http = useHttp();
const router = useRouter();

const pageMode = ref("login");
const loading = ref(false);

const loginForm = ref({
  account: "",
  pwd: "",
});
const registerForm = ref({
  account: "",
  pwd: "",
  confirmPwd: "",
});

async function login() {
  loading.value = true;
  try {
    const res = await http.post("/user/login", loginForm.value);
    await success(res.token);
  } catch (error) {
    loading.value = false;
  }
}
async function register() {
  const { pwd, confirmPwd, account } = registerForm.value;
  let msg = "";
  if (!account) {
    msg = "请输入账号";
  } else if (!pwd) {
    msg = "请输入密码";
  } else if (!confirmPwd) {
    msg = "请再次输入密码";
  } else if (pwd !== confirmPwd) {
    msg = "两次输入密码不一致";
  }
  if (msg) {
    showToast({ message: msg });
    return;
  }
  loading.value = true;
  try {
    const res = await http.post("/user/register", registerForm.value);
    success(res.token);
  } catch (error) {
    loading.value = false;
  }
}

async function success(token: string) {
  localStorage.setItem("token", token);
  router.replace("/");
}
async function forgetPwd() {
  showDialog({
    title: "忘记密码",
    message: "请联系奕爸(微信号：simon_sayto)找回密码",
  });
}
</script>

<template>
  <div class="pt-[200px]">
    <div v-if="pageMode === 'login'">
      <VanField
        v-model="loginForm.account"
        label="账号"
        placeholder="请输入账号"
      />
      <VanField
        v-model="loginForm.pwd"
        label="密码"
        placeholder="请输入密码"
        type="password"
      />
      <div class="p-4">
        <VanButton type="primary" block round @click="login" :loading="loading"
          >登录</VanButton
        >
      </div>
      <div class="flex items-center justify-between px-8">
        <a @click="forgetPwd">忘记密码</a>
        <a @click="pageMode = 'register'">注册</a>
      </div>
    </div>
    <div v-else-if="pageMode === 'register'">
      <div class="p-4 text-sm text-gray-500">
        <span>建议您设置手机号作为账号，以免后期忘记账号无法找回</span>
      </div>
      <VanField
        v-model="registerForm.account"
        label="账号"
        placeholder="请输入账号"
      />
      <VanField
        v-model="registerForm.pwd"
        label="密码"
        placeholder="请输入密码"
        type="password"
      />
      <VanField
        v-model="registerForm.confirmPwd"
        label="确认密码"
        placeholder="请再次输入密码"
        type="password"
      />
      <div class="p-4">
        <VanButton
          type="primary"
          block
          round
          @click="register"
          :loading="loading"
          >注册</VanButton
        >
      </div>
      <div class="flex items center justify-between px-8">
        <a @click="pageMode = 'login'">已有账号，去登录</a>
      </div>
    </div>
  </div>
</template>
<style></style>
