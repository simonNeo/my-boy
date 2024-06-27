<script setup lang="ts">
import { typeArr } from "../helper/constants";
import { useHttp } from "../helper/hooks";
import moment from "moment";
import {
  NavBar,
  CellGroup,
  Field,
  TimePicker,
  Picker,
  Checkbox,
  showToast,
  Radio,
  RadioGroup,
} from "vant";
import { watch } from "vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
// import {useUserStore} from '../store'

const router = useRouter();
const http = useHttp();
const now = moment();

const form = ref({
  type: 1,
  currentTime: [now.format("HH"), now.format("mm")],
  hasPoop: false,
  feedType: 1,
  feedTime: undefined,
  milkType: 1,
  feedCapacity: undefined,
  memo: "",
});

const isTimePickerShow = ref(false);
const isTypePickerShow = ref(false);

function back() {
  router.back();
}

const typeColumns = typeArr.map((e) => {
  return {
    text: e.text,
    value: e.id,
  };
});

// 切换为亲喂时，奶粉类型不可选
watch(
  () => form.value.feedType,
  (val) => {
    if (val === 1) {
      form.value.milkType = 1;
    }
  }
);

function showTimePicker() {
  isTimePickerShow.value = true;
}

function confirmType(res: any) {
  isTypePickerShow.value = false;
  form.value = {
    ...form.value,
    type: res.selectedOptions[0].value,
  };
}

// MARK: 提交
async function submit() {
  const body = {
    ...form.value,
    date: now.format("YYYY-MM-DD"),
    time: form.value.currentTime.join(":"),
  };
  await http.post("/record/add", body);
  showToast("添加成功!");
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  router.back();
}
</script>
<template>
  <div>
    <NavBar title="添加记录" left-arrow left-text="返回" @click-left="back" />
    <div>
      <CellGroup>
        <Field
          label="时间"
          input-align="right"
          placeholder="不填默认现在"
          readonly
          is-link
          @click="showTimePicker"
        >
          <template #input>
            <span>{{ form.currentTime.join(":") }}</span>
          </template>
        </Field>
        <Field label="事件" input-align="right" readonly>
          <template #input>
            <RadioGroup v-model="form.type" direction="horizontal">
              <Radio :name="1">喂奶</Radio>
              <Radio :name="2">换尿不湿</Radio>
            </RadioGroup>
          </template>
        </Field>
        <Field label="大便" input-align="right" readonly v-if="form.type === 2">
          <template #input>
            <Checkbox v-model="form.hasPoop" shape="square">有大便</Checkbox>
          </template>
        </Field>
        <template v-else-if="form.type === 1">
          <!-- 喂奶才有 -->
          <Field label="喂奶类型" input-align="right" readonly>
            <template #input>
              <RadioGroup v-model="form.feedType" direction="horizontal">
                <Radio :name="1">亲喂</Radio>
                <Radio :name="2">瓶喂</Radio>
              </RadioGroup>
            </template>
          </Field>
          <Field label="奶水类型" input-align="right" readonly>
            <template #input>
              <RadioGroup
                v-model="form.milkType"
                direction="horizontal"
                :disabled="form.feedType === 1"
              >
                <Radio :name="1">母乳</Radio>
                <Radio :name="2">奶粉</Radio>
              </RadioGroup>
            </template>
          </Field>

          <template v-if="form.feedType === 1">
            <!-- 亲喂 -->
            <Field
              input-align="right"
              v-model="form.feedTime"
              type="digit"
              placeholder="时长"
              clearable
              label="母乳喂奶时长"
            >
              <template #extra>
                <span>分钟</span>
              </template>
            </Field>
          </template>
          <template v-else-if="form.feedType === 2">
            <!-- 瓶喂 -->
            <Field
              input-align="right"
              v-model="form.feedCapacity"
              type="digit"
              placeholder="容量"
              clearable
              label="瓶喂容量"
            >
              <template #extra>
                <span>ml</span>
              </template>
            </Field>
          </template>
        </template>

        <Field
          v-model="form.memo"
          rows="1"
          autosize
          label="备注"
          type="textarea"
          placeholder="输入备注"
        />
      </CellGroup>

      <div class="p-4">
        <VanButton type="primary" block round @click="submit"> 提交 </VanButton>
      </div>
    </div>
    <VanPopup v-model:show="isTimePickerShow" round position="bottom">
      <TimePicker
        v-model="form.currentTime"
        @cancel="isTimePickerShow = false"
        @confirm="isTimePickerShow = false"
      ></TimePicker>
    </VanPopup>
    <VanPopup v-model:show="isTypePickerShow" round position="bottom">
      <Picker
        :columns="typeColumns"
        @confirm="confirmType"
        @cancel="isTypePickerShow = false"
      ></Picker>
    </VanPopup>
  </div>
</template>

<style>
.van-checkbox--horizontal {
  margin-top: 4px;
}
</style>
