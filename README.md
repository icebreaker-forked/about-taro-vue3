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

更改 build:h5 的 webpack splitchunks 配置 chunks:initial 为 all ？
