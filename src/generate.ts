import fs from "fs";
import path from "path";
import { glob } from "glob";
import type { Options } from "./types";
// const createIconCom = (files: string[], dir: string) => {
//   // 修正：确保 glob 路径以/开头
//   const normalizedDir = dir.startsWith("/") ? dir : `/${dir}`;
//   const enter = normalizedDir.endsWith("/") ? normalizedDir : normalizedDir + "/";

//   // 生成Icon包装组件
//   const iconComponent = `
//     <script setup>
//     import { defineAsyncComponent, computed } from 'vue'

//     const props = defineProps({
//       name: { type: String, required: true }
//     })
//     const modules = import.meta.glob('${enter}*.vue', { eager: false })
//     const icons = {};
//     Object.keys(modules).forEach(key => {
//       const componentName = key.split('/').pop().replace('.vue', '')
//       icons[componentName] = modules[key]
//     })
//     const iconComponent = computed(() => {
//       const componentName = props.name;
//       return defineAsyncComponent(icons[componentName]) ?? null;
//     })
//     // console.log(iconComponent.value)
//     </script>

//     <template>
//       <component :is="iconComponent" v-if="iconComponent" />
//     </template>
//       `.trim();
//   return iconComponent;
// };
export function generateComponents(options: Options) {
  // 创建目标目录
  const iconsDir = path.resolve(options.output);
  const svgDir = path.resolve(options.enter);
  const globPattern = path.join(svgDir, "**", "*.svg");

  async function run() {
    // 创建输出目录
    await fs.promises.mkdir(iconsDir, { recursive: true });
    // 获取所有svg文件名
    const svgFiles = glob.sync(globPattern);
    const currentSvgs = new Set(svgFiles.map((file) => path.basename(file, ".svg")));
    // 删除没有对应svg的旧组件
    const vueFiles = (await fs.promises.readdir(iconsDir)).filter((f) => f.endsWith(".vue"));
    await Promise.all(
      vueFiles.map(async (f) => {
        const componentName = path.basename(f, ".vue");
        if (!currentSvgs.has(componentName)) {
          await fs.promises.unlink(path.join(iconsDir, f));
        }
      })
    );
    // 生成新组件
    await Promise.all(
      svgFiles.map(async (file) => {
        const svg = await fs.promises.readFile(file, "utf-8");
        const name = path.basename(file, ".svg");
        const component = `
<template>
  ${svg}
</template>
        `.trim();
        // 内容对比逻辑
        const componentPath = path.join(iconsDir, `${name}.vue`);
        let needWrite = true;
        try {
          const oldContent = await fs.promises.readFile(componentPath, "utf8");
          if (oldContent === component) needWrite = false;
        } catch (e) {
          // 文件不存在或读取失败则写入
          needWrite = true;
        }
        if (needWrite) {
          await fs.promises.writeFile(componentPath, component);
        }
      })
    );
  }
  run();
}
export default generateComponents;
