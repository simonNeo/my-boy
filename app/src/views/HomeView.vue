<script setup lang="ts">
import { useRouter } from "vue-router";
import { useHttp } from "../helper/hooks";
import { Calendar } from "vant";
import { ref } from "vue";
import moment from "moment";
import { onMounted } from "vue";
import RecordItem from "../components/RecordItem/index.vue";
import { computed } from "vue";
import { useUserStore } from "../store";

const router = useRouter();
const http = useHttp();
const isCalendarShow = ref(false);
const userStore = useUserStore();

const oldDate = new Date(1990, 0, 1);

const now = moment();

const list = ref<any[]>([]);

const summary = computed(() => {
  let feedCount = 0;
  let poopCount = 0;
  let diaperCount = 0;
  let feedTime = 0;
  let feedCapacity = 0;
  let feedCapacityMom = 0; // 母乳
  let feedCapacityPowder = 0; // 奶粉

  list.value.forEach((item) => {
    if (item.type === 1) {
      feedCount++;
      if (item.feedType === 1) {
        feedTime += item.feedTime || 0;
      } else {
        feedCapacity += item.feedCapacity || 0;
        if (item.milkType === 1) feedCapacityMom += item.feedCapacity || 0;
        else feedCapacityPowder += item.feedCapacity || 0;
      }
    } else {
      diaperCount++;
      if (item.hasPoop) poopCount++;
    }
  });

  const momPercent =
    Math.round(
      (feedCapacityMom / (feedCapacityMom + feedCapacityPowder)) * 100
    ) || 0;
  return {
    feedCount,
    diaperCount,
    feedTime,
    feedCapacityMom,
    feedCapacityPowder,
    poopCount,
    momPercent,
    feedCapacity,
  };
});

// 筛选日期
const filter = ref({ date: now.format("YYYY-MM-DD") });

function goAdd() {
  router.push("/add");
}

async function loadList() {
  const res = await http.get("/record/list", { params: filter.value });
  list.value = res as unknown as any[];
}

async function onConfirmDate(value: any) {
  filter.value.date = moment(value).format("YYYY-MM-DD");
  isCalendarShow.value = false;
  loadList();
}

onMounted(() => loadList());
</script>

<template>
  <div class="p-4">
    <h1 class="text-center text-xl">
      {{ userStore.userInfo?.babyName }}的活动记录
    </h1>
    <div class="flex justify-between px-2 py-2">
      <span @click="isCalendarShow = true">
        <span>{{ filter.date }}</span>
        <VanIcon name="arrow-down" />
      </span>
      <span class="text-blue-600" @click="goAdd">新增</span>
    </div>

    <Calendar
      :min-date="oldDate"
      v-model:show="isCalendarShow"
      @confirm="onConfirmDate"
    ></Calendar>
    <!-- 列表 -->
    <div class="px-4 pb-[150px]">
      <RecordItem
        v-for="item in list"
        :key="item.id"
        :record="item"
        class="mt-2 first:mt-0"
      >
        <div
          class="top-bar"
          :class="item.type === 1 ? 'bg-indigo-400' : 'bg-green-400'"
        ></div>
        <div class="p-4">
          <div class="flex justify-between">
            <span class="text-2xl">{{ item.time }}</span>
            <span>{{ $typeStr(item.type) }}</span>
          </div>
          <div class="text-left text-gray-500" v-if="item.memo">
            {{ item.memo }}
          </div>
        </div>
      </RecordItem>
      <!-- 底部安全区 -->
      <div class="van-safe-area-bottom"></div>
    </div>
    <!-- 统计 -->
    <div
      class="fixed bottom-0 left-0 border-t border-gray-200 w-full bg-white py-2 shadow-[0_0_40px_-15px_rgba(0,0,0,0.3)]"
    >
      <div class="flex justify-between px-2">
        <span
          >换尿不湿: {{ summary.diaperCount }}次(臭臭{{
            summary.poopCount
          }}次)</span
        >
        <span>喂奶: {{ summary.feedCount }}次</span>
      </div>
      <div>
        <div class="px-4 flex items-center">
          <span>亲喂：</span>
          <div
            class="h-[20px] rounded-xl bg-blue-400 flex-1 flex justify-start items-center pl-[16px] text-white"
          >
            {{ summary.feedTime }}分钟
          </div>
        </div>
        <div class="px-4 mt-2 flex items-center">
          <span>瓶喂：</span>
          <div class="h-[20px] rounded-xl bg-green-400 flex-1 relative">
            <div
              class="h-full rounded-xl bg-blue-400 min-w-[10px]"
              :style="{ width: summary.momPercent + '%' }"
            ></div>
            <div
              class="absolute top-0 left-0 h-full w-full flex justify-start items-center pl-[16px] text-white"
            >
              共{{ summary.feedCapacity }}ml,母乳{{
                summary.feedCapacityMom
              }}ml, {{ summary.momPercent }}%
            </div>
          </div>
        </div>
      </div>
      <!-- 底部安全区 -->
      <div class="van-safe-area-bottom"></div>
    </div>
  </div>
</template>
