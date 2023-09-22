const fs = require('fs');
const path = require('path');
const fg = require('fast-glob');

// https://github.com/sysgears/webpack-virtual-modules

const VirtualModulesPlugin = require('webpack-virtual-modules');

module.exports = class MyPlugin {
  constructor(options) {}

  apply(compiler) {
    const virtualModules = new VirtualModulesPlugin();
    virtualModules.apply(compiler);

    compiler.hooks.compilation.tap('MyPlugin', compilation => {
      const entries = fg.sync(
        [path.resolve(process.cwd(), `./src/pages/weapp-tw/index.vue`)],
        {
          onlyFiles: true,
          objectMode: true,
          ignore: this.options?.exclude || []
        }
      );
      for (const { name, path: path2 } of entries) {
        const source = fs.readFileSync(path2, 'utf-8');
        virtualModules.writeModule(
          path.resolve(process.cwd(), path2.replace('index.vue', 'origin.vue')),
          source
        );
      }
    });
  }
};
