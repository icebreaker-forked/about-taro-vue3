const wrapperTemplate = `<script setup lang="ts">
import Origin from './origin.vue';
const myFlag = true;
</script>
<template>
  <view>success!!!</view>
  <origin v-if="myFlag" />
</template>
`;

const shouldInclude = (resourcePath, include) => {
  return include.test(resourcePath);
};

const shouldExclude = (resourcePath, exclude) => {
  return !exclude.test(resourcePath);
};

module.exports = function (source) {
  const filePath = this.resourcePath;
  const exclude = /origin\.vue$/;
  if (shouldExclude(filePath, exclude)) return wrapperTemplate;
  return source;
};
