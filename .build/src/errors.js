var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var errors_exports = {};
__export(errors_exports, {
  EncodingError: () => EncodingError,
  VersionError: () => VersionError
});
module.exports = __toCommonJS(errors_exports);
class VersionError extends Error {
  constructor(version) {
    super(`Version ${version} is not a vaild version.`);
  }
}
class EncodingError extends Error {
  constructor(encoding) {
    super(`Encoding ${encoding} is not a vaild encoding.`);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EncodingError,
  VersionError
});
//# sourceMappingURL=errors.js.map
