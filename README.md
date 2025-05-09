# vite-plugin-svg-icon-generator

## 🚀安装
```
npm install vite-plugin-svg-icon-generator -D
```
### 在vite使用
```js
// vite.config.ts
import { defineConfig } from 'vite'
import svgIconGenerator from 'vite-plugin-svg-icon-generator'
export default defineConfig({
  plugins: [
    svgIconGenerator({
      enter: 'src/assets/Icons', // SVG文件存放目录
      iconsOutput: 'src/components/Icons', // 输出图标组件
      iconOutput:'src/components' // 输出图标组件
    })
  ]
})
```

#### 目录结构示例

```
src/
  assets/
    Icons/
      ├── *.svg
```

### 使用Icon组件
```js
// main.js
import {createApp} from 'vue'
import Icon from 'src/components/Icon/Icon.vue'
import App from "./App.vue";
const app = createApp(App)
app.component('Icon', Icon)
```
- 在vue 中使用
```vue
<template>
  <Icon name="search" />
</template>
```

## 💡配置说明
| 参数        | 说明            | 类型   | 默认值               |
| ----------- | --------------- | ------ | -------------------- |
| enter       | SVG文件存放目录 | string | src/assets/Icons     |
| iconsOutput | 输出图标组件    | string | src/components/Icons |
| iconOutput  | 输出Icon组件    | string | src/components       |
### 📃特性说明

- 自动生成Vue图标组件
- 支持热重载
- 自动清理废弃图标
- 按需加载组件
### 📣注意事项
- SVG文件名将作为组件名直接使用
