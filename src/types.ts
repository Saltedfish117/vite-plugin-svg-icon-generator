export interface Options {
  enter: string; // Default directory to watch for SVG files 静态资源svg入口
  output: string; // Output directory for generated components 生成的组件输出目录
  // create?: boolean; // 是否创建引用组件，即创建一个可以通过svg文件名直接使用的组件，例：<svg-icon name="name" />
  // name?: string; // 引用组件名称
  // iconOutput?: string; // 引用组件输出目录
}
