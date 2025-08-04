# vite-plugin-svg-icon-generator

<div align="center">

![Vue](https://img.shields.io/badge/Vue.js-3.x-4FC08D?style=flat-square&logo=vue.js)
![TypeScript](https://img.shields.io/badge/TypeScript-4.x-3178C6?style=flat-square&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![NPM Version](https://img.shields.io/npm/v/vite-plugin-svg-icon-generator?style=flat-square)
![NPM Downloads](https://img.shields.io/npm/dm/vite-plugin-svg-icon-generator?style=flat-square)

SVG Icon Generator plugin that provides the functionality to automatically generate icon components.

</div>

<div align="center">
  <a href="https://gitee.com/salted-fish-333/vite-plugin-svg-icon-generator" target="_blank">
    <img src="https://gitee.com/salted-fish-333/vite-plugin-svg-icon-generator/badge/star.svg?theme=dark" alt="Gitee star" />
  </a>
  <a href="https://github.com/Saltedfish117/vite-plugin-svg-icon-generator" target="_blank">
    <img src="https://img.shields.io/github/stars/Saltedfish117/vite-plugin-svg-icon-generator?style=social" alt="GitHub star" />
  </a>
</div>

[中文 README](README.md)

## 🚀 Installation
```
npm install vite-plugin-svg-icon-generator -D
```
### Usage in Vite
```js
// vite.config.ts
import { defineConfig } from 'vite'
import svgIconGenerator from 'vite-plugin-svg-icon-generator'
export default defineConfig({
  plugins: [
    svgIconGenerator({
      enter: path.resolve(import.meta.dirname, 'src/assets/Icons'), // Directory where SVG files are stored
      output: path.resolve(import.meta.dirname, 'src/components/Icons'), // Directory for output icon components
    })
  ]
})
```

#### Directory Structure Example

```
src/
  assets/
    Icons/
      ├── *.svg
```
## 💡 Configuration
| Parameter | Description | Type | Default |
| --------- | ----------- | ---- | ------- |
| enter     | Directory where SVG files are stored | string | None |
| output    | Directory for output icon components | string | None |
### 📃 Features

- **Automatically generate Vue icon components**: Convert SVG files into directly usable Vue components
- **Support hot reloading**: In development mode, modifying SVG files will automatically regenerate components and refresh the page
- **Auto clean up deprecated icons**: When SVG files are deleted, corresponding component files are also automatically deleted
- **On-demand component loading**: Each SVG icon is generated as an independent component, supporting on-demand import

### Usage Example

#### Using in Vue Components

Generated icon components are located in the configured `output` directory and can be imported directly:

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

### 📣 Notes
- SVG filenames will be used as component names, it is recommended to use camelCase naming (e.g., `searchIcon.svg` will generate `SearchIcon.vue`)
- SVG files should be kept simple, avoiding overly complex styles and scripts
- Generated components support passing standard HTML attributes (such as `class`, `style`, `width`, `height`, etc.)
- If using in a TypeScript project, ensure correct type declarations are configured