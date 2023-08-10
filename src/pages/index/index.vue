<template>
  <view :class="$style.index">css not extract</view>
  <nut-tabs
    v-model="state.tab4value"
    title-scroll
    title-gutter="10"
    name="tab4value"
  >
    <nut-tab-pane v-for="item in state.list4" :title="'Tab ' + item">
      Tab {{ item }}
    </nut-tab-pane>
  </nut-tabs>
</template>
<script lang="ts">
import { reactive } from 'vue';
export default {
  setup() {
    const state = reactive({
      tab4value: '0',
      list4: Array.from(new Array(10).keys())
    });
    return { state };
  }
};
</script>

<style lang="scss" module>
.index {
  background-color: red;
}
</style>
