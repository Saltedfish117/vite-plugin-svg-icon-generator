

# vite-plugin-svg-icon-generator

这是一个为 Vite 项目设计的 SVG 图标生成工具插件，旨在帮助开发者更高效地管理和使用 SVG 图标。

## 🚀 安装

你可以通过以下命令安装插件：

```bash
npm install vite-plugin-svg-icon-generator --save-dev
```

或者使用 yarn：

```bash
yarn add -D vite-plugin-svg-icon-generator
```

## 在 Vite 中使用

安装完成后，在你的 `vite.config.ts` 文件中引入并配置插件：

```ts
import svgIconGenerator from 'vite-plugin-svg-icon-generator';

export default defineConfig({
  plugins: [
    svgIconGenerator({
      // 配置项
    }),
  ],
});
```

## 目录结构示例

该插件通常需要一个包含 SVG 图标的目录，例如：

```
project-root/
├── icons/
│   ├── icon1.svg
│   ├── icon2.svg
│   └── ...
├── vite.config.ts
└── ...
```

## 💡 配置说明

插件提供了一些配置选项来满足不同项目的需求。以下是一些常见的配置参数：

- `inputDir`: SVG 图标所在的目录。
- `outputDir`: 生成的图标组件输出目录。
- `iconComponentName`: 生成的图标组件名称。

## 📝 特性说明

- **自动图标生成**：从指定目录读取 SVG 文件并生成可复用的图标组件。
- **按需加载**：只在需要时加载图标，提高性能。
- **支持 Vue**：与 Vue 项目无缝集成，可以轻松在组件中使用图标。

## 使用示例

### 在 Vue 组件中使用

一旦插件配置完成，你可以像下面这样在 Vue 组件中使用图标：

```vue
<template>
  <div>
    <IconComponent name="icon1" />
    <IconComponent name="icon2" />
  </div>
</template>

<script setup>
import IconComponent from '@/components/IconComponent.vue';
</script>
```

## 📣 注意事项

- 确保 SVG 文件命名清晰且具有描述性，以便于后续引用。
- 插件默认不处理测试文件，如果你有需要，请在配置中明确启用。

## 📄 License

请查看项目中的 LICENSE 文件以了解详细的许可协议。