## 封装一个sleep函数sdk

### 功能代码
```js
// src/index.js
export default {
  sleep: (time) => new Promise((resolve) => setTimeout(resolve, time))
}
```

### 使用rollup打包
```js
// rollup.config.js
import { defineConfig } from 'rollup'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import terser from '@rollup/plugin-terser'
import pkg from './package.json' assert { type: 'json' };


export default defineConfig({
  input: {
    main: 'src/index.js'
  },
  output: [
    {
      dir: 'dist', // 输出文件夹
      format: 'umd', // 输出格式,umd是通用模块定义，可以在浏览器和Node.js环境中使用
      name: 'gzhSleep',
      entryFileNames: `@gzh-sleep@${pkg.version}.umd.js` // 输出的文件名
    },
    {
      dir: 'dist',
      format: 'cjs', // 输出格式,commonjs是Node.js的模块系统
      entryFileNames: '@gzh-sleep.cmd.js'
    },
    {
      dir: 'dist',
      format: 'esm', // 输出格式,esm是ES6模块系统
      entryFileNames: '@gzh-sleep.esm.js'
    }
  ],
  plugins: [
    // Add plugins here
    resolve(), // 这个插件用于解决第三方模块的导入问题。在Rollup中，如果项目中使用了第三方模块，需要使用这个插件来正确处理模块的导入。
    commonjs(), // 这个插件用于将CommonJS模块转换为ES6模块。在Rollup中，如果项目中使用了CommonJS模块，需要使用这个插件来正确处理这些模块。
    babel({
      exclude: 'node_modules/**',
      presets: ['@babel/preset-env'],
    }), // 这个插件用于将代码转换为ES5。在Rollup中，如果项目中使用了ES6或更高版本的代码，需要使用这个插件来将代码转换为ES5，以便在旧版本的浏览器中运行。
    terser() // 这个插件用于压缩代码。在Rollup中，为了减小构建后的文件大小，可以使用这个插件来压缩代码。
  ]
})
```

### 支持三种形式导入
#### umd模式
```html
  <script src="../dist/@gzh-sleep@1.0.0.umd.js"></script>
  <script>
    console.log(gzhSleep.sleep);
  </script>
```
#### esm模式
```html
   <script type="module">  
    import sleep from '../dist/@gzh-sleep.esm.js';
    console.log(sleep);
  </script>
```
#### commonjs模式
```js
const sleepSdk = require('../dist/@gzh-sleep.cmd.js');
console.log(sleepSdk.sleep);
```

### package.json
```json
{
  "name": "@gzh/sleep",
  "version": "1.0.0",
  "description": "a simple sleep function",
  "type": "module",
  "main": "dist/@gzh-sleep.cmd.js", // commonjs模块入口，上传到npm依赖后，使用require引入
  "module": "dist/@gzh-sleep.esm.js", // esm模块入口，上传到npm依赖后，使用import from引入
  "browser": "dist/@gzh-sleep.umd.js", // 浏览器可以直接用cdn引入
  "scripts": {
    "build": "rollup -c"
  },
  "files": [
    "dist"
  ],
  "author": "gzh",
  "license": "ISC",
  "dependencies": {
    "@babel/core": "^7.25.2",
    "@babel/preset-env": "^7.25.3",
    "@rollup/plugin-babel": "^6.0.4",
    "@rollup/plugin-commonjs": "^26.0.1",
    "@rollup/plugin-json": "^6.1.0",
    "@rollup/plugin-node-resolve": "^15.2.3",
    "@rollup/plugin-terser": "^0.4.4",
    "lodash": "^4.17.21",
    "rollup": "^4.20.0"
  }
}
```