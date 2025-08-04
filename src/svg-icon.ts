// import fs from 'fs';
// import path from 'path';
// import { extend } from "./common";
import type { Options } from "./types";
export const createIcon = (_option: Options) => {
  //   if (!_option.create) return;
  //   const options = extend(true,{
  //     name:'svg-icon',
  //   },_option) as Options;
  //   const output = options.iconOutput ?? options.output;
  //   const svgIcon = `
  // import {defineComponent, ref, onMounted} from 'vue'
  // import {h} from 'vue'
  // const modules = import.meta.glob('${options.output}/**/*.vue')
  // const icons = Object.keys(modules).reduce((acc, cur) => {
  //   // 移除路径和 .vue 扩展名，仅保留文件名作为键
  //   const fileName = cur.replace(/^.*\//, '').replace(/\.vue$/, '');
  //   // 存储异步加载函数
  //   acc[fileName] = modules[cur];
  //   return acc;
  // }, {});
  // // 缓存已加载的组件
  // const loadedIcons = {};
  // export default defineComponent({
  //   name: '${options.name}',
  //   props: {
  //     name: {
  //       type: String,
  //       validator: (val) => {
  //         return icons[val]
  //       },
  //       required: true
  //     },
  //     size: {
  //       type: Number,
  //       default: 24
  //     }
  //   },
  //   setup(props, { attrs }) {
  //     const currentIcon = ref(null);
  //     // 异步加载组件
  //     const loadIcon = async (iconName) => {
  //       if (loadedIcons[iconName]) {
  //         currentIcon.value = loadedIcons[iconName];
  //         return;
  //       }
  //       try {
  //         const module = await icons[iconName]();
  //         loadedIcons[iconName] = module.default;
  //         currentIcon.value = module.default;
  //       } catch (error) {
  //         console.error(\`Failed to load icon \${iconName}: \`, error);
  //       }
  //     };
  //     onMounted(() => {
  //       loadIcon(props.name);
  //     });
  //     // 监听 name 属性变化
  //     watch(() => props.name, (newName) => {
  //       loadIcon(newName);
  //     });
  //     return () => {
  //       if (currentIcon.value) {
  //         return h(currentIcon.value, {
  //           width: props.size,
  //           height: props.size,
  //           ...attrs
  //         });
  //       }
  //       return null;
  //     };
  //   }
  // })
  // `;
  //   fs.writeFileSync(path.join(output, `${options.name}.ts`), svgIcon);
};
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
