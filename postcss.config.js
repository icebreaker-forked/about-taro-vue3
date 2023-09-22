// postcss.config.js
// 假如你使用的框架/工具不支持 postcss.config.js，则可以使用内联的写法
// 其中 `autoprefixer` 有可能已经内置了，假如框架内置了可以去除

// https://github.com/sonofmagic/weapp-tailwindcss/issues/75
const isH5 = process.env.TARO_ENV === 'h5';
const isApp = process.env.TARO_ENV === 'rn';
const WeappTailwindcssDisabled = isH5 || isApp;

module.exports = {
  plugins: [
    // require('autoprefixer')(),
    require('tailwindcss')(),
    // rem 转 rpx
    WeappTailwindcssDisabled
      ? undefined
      : require('postcss-rem-to-responsive-pixel')({
          // 32 意味着 1rem = 32rpx
          rootValue: 32,
          // rootValue: 40,
          // 默认所有属性都转化
          propList: ['*'],
          // 转化的单位,可以变成 px / rpx
          transformUnit: 'rpx'
        })
  ]
};
