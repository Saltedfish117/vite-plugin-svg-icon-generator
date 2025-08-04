import path from "path";
import type { Plugin } from "vite";
import { generateComponents } from "./generate";
import type { Options } from "./types";
export default function vitePluginSvgIconGenerator(options: Options): Plugin {
  return {
    name: "vite-plugin-svg-icon-generator",
    configureServer(server) {
      const updateComponents = () => {
        generateComponents(options);
        server.ws.send({ type: "full-reload" });
      };
      server.watcher
        .add(path.join(options.enter, "**/*.svg"))
        .on("add", updateComponents)
        .on("change", updateComponents)
        .on("unlink", updateComponents);
    },
    buildStart() {
      generateComponents(options);
    },
  };
}
