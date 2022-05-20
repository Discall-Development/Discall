var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
__export(exports, {
  EncodingError: () => EncodingError,
  VersionError: () => VersionError
});
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
