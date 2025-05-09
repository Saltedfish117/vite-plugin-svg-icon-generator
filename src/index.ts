import path from "path";
import type { Plugin } from "vite";
import { generateComponents } from "./generate";
import type { Options } from "./types.ts";
export default function vitePluginSvgIconGenerator({
  enter = "src/assets/Icons",
  ...options
}: Options = {}): Plugin {
  return {
    name: "vite-plugin-svg-icon-generator",
    configureServer(server) {
      const updateComponents = () => {
        generateComponents({
          enter,
          ...options,
        });
        server.ws.send({ type: "full-reload" });
      };
      server.watcher
        .add(path.join(enter, "**/*.svg"))
        .on("add", updateComponents)
        .on("unlink", updateComponents);
    },
    buildStart() {
      generateComponents({
        enter,
        ...options,
      });
    },
  };
}
