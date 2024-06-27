<script setup lang="ts">
import { RouterView } from "vue-router";
import { FloatingBubble, showDialog } from "vant";

async function showTip() {
  await showDialog({
    title: "需要帮助？",
    message: "网页免费使用，有问题或建议可加奕爸微信反馈：simon_sayto",
  });
}
</script>

<template>
  <div>
    <RouterView />
    <FloatingBubble axis="xy" magnetic="x" icon="question" @click="showTip" />
  </div>
</template>

<style></style>
