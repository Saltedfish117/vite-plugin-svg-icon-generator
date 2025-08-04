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
      enter: path.resolve(import.meta.dirname, 'src/assets/Icons'), // SVG文件存放目录
      output: path.resolve(import.meta.dirname, 'src/components/Icons'), // 输出图标组件目录
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
## 💡配置说明
| 参数   | 说明            | 类型   | 默认值               |
| ------ | --------------- | ------ | -------------------- |
| enter  | SVG文件存放目录 | string | 无                   |
| output | 输出图标组件目录 | string | 无                   |
### 📃特性说明

- **自动生成Vue图标组件**：将SVG文件转换为可直接使用的Vue组件
- **支持热重载**：在开发模式下，修改SVG文件后会自动重新生成组件并刷新页面
- **自动清理废弃图标**：当SVG文件被删除时，对应的组件文件也会被自动删除
- **按需加载组件**：每个SVG图标独立生成一个组件，支持按需导入使用

### 使用示例

#### 在Vue组件中使用

生成的图标组件位于配置的`output`目录下，可以直接导入使用：

```vue
<template>
  <div>
    <SearchIcon />
    <UserIcon class="text-blue-500" />
    <SettingsIcon :size="24" />
  </div>
</template>

<script setup>
import SearchIcon from '@/components/Icons/Search.vue'
import UserIcon from '@/components/Icons/User.vue'
import SettingsIcon from '@/components/Icons/Settings.vue'
</script>
```

### 📣注意事项
- SVG文件名将作为组件名，建议使用驼峰命名法（如`searchIcon.svg`会生成`SearchIcon.vue`）
- SVG文件应保持简洁，避免包含过多复杂的样式和脚本
- 生成的组件支持传递标准HTML属性（如`class`、`style`、`width`、`height`等）
- 如需在TypeScript项目中使用，确保配置了正确的类型声明
