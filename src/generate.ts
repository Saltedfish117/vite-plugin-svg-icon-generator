import fs from "fs";
import path from "path";
import { glob } from "glob";
import type { Options } from "./types";
const createIconCom = (files: string[], dir: string) => {
  // 修正：确保 glob 路径以/开头
  const normalizedDir = dir.startsWith("/") ? dir : `/${dir}`;
  const enter = normalizedDir.endsWith("/") ? normalizedDir : normalizedDir + "/";

  // 生成Icon包装组件
  const iconComponent = `
    <script setup>
    import { defineAsyncComponent, computed } from 'vue'

    const props = defineProps({
      name: { type: String, required: true }
    })
    const modules = import.meta.glob('${enter}*.vue', { eager: false })
    const icons = {};
    Object.keys(modules).forEach(key => {
      const componentName = key.split('/').pop().replace('.vue', '')
      icons[componentName] = modules[key]
    })
    const iconComponent = computed(() => {
      const componentName = props.name;
      return defineAsyncComponent(icons[componentName]) ?? null;
    })
    // console.log(iconComponent.value)
    </script>

    <template>
      <component :is="iconComponent" v-if="iconComponent" />
    </template>
      `.trim();
  return iconComponent;
};
export function generateComponents({ enter = "src/assets/Icons", iconsOutput = "src/components/Icons", iconOutput = "src/components" }: Options) {
  // 创建目标目录
  const iconsDir = path.resolve(iconsOutput);
  if (!fs.existsSync(iconsDir)) fs.mkdirSync(iconsDir, { recursive: true });
  // 获取当前所有svg文件列表
  const currentSvgs = new Set(glob.sync(enter + "/**/*.svg").map((file) => path.basename(file, ".svg")));
  // 删除没有对应svg的旧组件
  fs.readdirSync(iconsDir)
    .filter((f) => f.endsWith(".vue"))
    .forEach((f) => {
      const componentName = path.basename(f, ".vue");
      if (!currentSvgs.has(componentName)) {
        fs.unlinkSync(path.join(iconsDir, f));
      }
    });

  // 生成新组件
  const files = glob.sync(enter + "/**/*.svg");
  files.forEach((file) => {
    const svg = fs.readFileSync(file, "utf-8");
    const name = path.basename(file, ".svg");
    const component = `
  <template>
    ${svg}
  </template>
      `.trim();

    // 内容对比逻辑
    const componentPath = path.join(iconsDir, `${name}.vue`);
    try {
      // 当文件不存在或内容不同时才写入
      if (!fs.existsSync(componentPath) || fs.readFileSync(componentPath, "utf8") !== component) {
        fs.writeFileSync(componentPath, component);
      }
    } catch (e) {
      // 如果读取失败则强制写入
      fs.writeFileSync(componentPath, component);
    }
  });
  const iconComponent = createIconCom(files, iconsOutput);
  const iconDir = path.resolve(iconOutput);
  if (!fs.existsSync(iconDir)) fs.mkdirSync(iconDir, { recursive: true });
  fs.writeFileSync(path.join(iconDir, "Icon/Icon.vue"), iconComponent);
}
export default generateComponents;
