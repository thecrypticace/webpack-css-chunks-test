const pluginName = "TrimCSSPlugin";
const TrimmedSource = require("./TrimmedSource");

module.exports = class TrimCSSPlugin {
  isCSSChunk(chunk) {
    return chunk.ids.includes("mini-css-extract-plugin");
  }

  apply(compiler) {
    compiler.hooks.compilation.tap(pluginName, compilation => {
      compilation.hooks.optimizeChunkAssets.tap(pluginName, chunks => {
        for (const chunk of chunks) {
          // if (!this.isCSSChunk(chunk)) {
          //   continue;
          // }

          for (const file of chunk.files) {
            compilation.assets[file] = new TrimmedSource(
              compilation.assets[file]
            );
          }
        }
      });
    });
  }
};
