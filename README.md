yarn install

yarn run dev:weapp

yarn run dev:h5

# Issue

## 问题 1（目前已被解决）

最近自己在封装组件时，参考了 nutui-taro 的封装风格，但发现组件构建后经过 Taro 处理编译成 h5 时所有标签都不会被转换，从而造成了一些问题，

如 `<view />` 应该会被编译成 `<taro-view-core />`，但是仍然显示 `<view />`，这个 `<nut-tabs />` 的问题也是因为 `<scroll-view />` 不会被正常编译成 h5 版的 `<taro-scroll-view-core />` 导致的，

然后我就没有用 vite 构建组件了，直接源码扔到 npm 私仓，让 Taro 去打包就可以了（但是还是打包会好点），

所以我个人是猜测由于构建之后 Taro 无法识别标签，从而导致不会编译成 h5 标签，

这个库很棒！期待反馈 ❤️（这个问题我也会在 Taro 发一次）

# 问题 2（目前已被解决）

Vue3 build:h5 后 css 没有被提取成文件，还是在 js 中

# 问题 3

错误：weapp-tw + 自定义 webpack5 的 plugin 和 laoder，导致 weapp-tw 规则转译无效（热重载无效）（问题在小程序端，h5 不会有这个问题）

背景：由于目前 Taro 没有路由拦截功能，我的思路是使用 [webpack-virtual-modules](https://github.com/sysgears/webpack-virtual-modules) 虚拟模块，来进行对页面组件进行条件判断渲染。

如当前组件路径为 `pages/weapp-tw/index.vue`，我会基于它创建一个平级的虚拟文件 `pages/weapp-tw/origin.vue`，这一步是 `./myWebpackPlugin/plugin.js` 做的。

然后 `./myWebpackPlugin/loader.js` 把 `pages/weapp-tw/index.vue` 内容替换成以下内容，用于”路由拦截“

```html
<script setup lang="ts">
  import Origin from './origin.vue';
  const myFlag = true;
</script>
<template>
  <view>success!!!</view>
  <origin v-if="myFlag" />
</template>
```

这样子会导致 `weapp-tw` 热重载失效。比如我在页面 `pages/weapp-tw/index.vue` 修改了样式，小程序没有立即生效。

个人理解：有简单看了下 weapp-tw webpack 的 plugin 实现，照理说 `compilation.hooks.processAssets` && `stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE` 这个阶段应该是在产物都生成之后，再去替换相关 tw 规则，应该不会有什么错误的才对。

还是我的 webpack plguin 的 hooks 需要调整？
