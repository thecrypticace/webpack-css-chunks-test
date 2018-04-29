const Source = require("webpack-sources/lib/Source");

class TrimmedSource extends Source {
  constructor(source) {
    super();

    this._source = source;
  }

  source() {
    const src =
      typeof this._source === "string" ? this._source : this._source.source();

    if (src.indexOf(".red[data-v-") !== -1) {
      // debugger;
    }

    return trimStr(src);
  }

  node(options) {
    return new SourceNode(null, null, null, [
      cloneAndTrim(this._source.node(options))
    ]);
  }

  listMap(options) {
    return this._source.listMap(options).mapGeneratedCode(trimStr);
  }

  updateHash(hash) {
    if (typeof this._source === "string") {
      hash.update(this._source);
    } else {
      this._source.updateHash(hash);
    }
  }
}

const whitespacePattern = /(^\s+|\s+$)/g;

function trimStr(str) {
  return str.replace(whitespacePattern, "");
}

function cloneAndTrim(node) {
  if (typeof node === "string") {
    return trimStr(node);
  }

  const newNode = new SourceNode(
    node.line,
    node.column,
    node.source,
    node.children.map(cloneAndTrim),
    node.name
  );

  newNode.sourceContents = node.sourceContents;

  return newNode;
}

require("webpack-sources/lib/SourceAndMapMixin")(TrimmedSource.prototype);

module.exports = TrimmedSource;
