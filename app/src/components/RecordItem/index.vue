<script setup lang="ts">
import ItemIcon from "../ItemIcon.vue";

const props = defineProps<{
  record: any;
}>();
const item = props.record;
</script>

<template>
  <div class="record-item relative">
    <div
      class="h-[8px] rounded-t-[8px]"
      :class="item.type === 1 ? 'bg-indigo-400' : 'bg-green-400'"
    ></div>
    <div class="p-2">
      <div class="flex justify-between">
        <span class="text-2xl flex items-center">
          <span>{{ item.time }}</span>
          <ItemIcon
            v-if="item.type === 2 && item.hasPoop"
            :item-id="36"
            :size="46"
            class="opacity-50"
          ></ItemIcon
        ></span>
        <span>{{ $typeStr(item.type) }}</span>
      </div>
      <div class="" v-if="item.type === 1">
        <span>{{ $typeStr(item.feedType, "feed") }}</span>
        <span>{{ $typeStr(item.milkType, "milk") }}</span>
        <span v-if="item.feedType === 1">,{{ item.feedTime }}分钟</span>
        <span v-else-if="item.feedType === 2">,{{ item.feedCapacity }}ml</span>
      </div>
      <div class="text-left text-gray-500" v-if="item.memo">
        {{ item.memo }}
      </div>
    </div>
    <ItemIcon
      v-if="item.type === 1"
      :item-id="438"
      :size="46"
      class="absolute -right-4 -top-4"
    ></ItemIcon>
    <ItemIcon
      v-if="item.type === 2"
      :item-id="378"
      :size="46"
      class="absolute -left-4 -top-4"
    ></ItemIcon>
  </div>
</template>

<style lang="less">
.record-item {
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.1);
  border: 1px solid #f0f0f0;
  border-radius: 8px;
}
</style>
