"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UriMode = exports.HttpUri = exports.HttpMode = void 0;
var HttpMode;
(function (HttpMode) {
    HttpMode[HttpMode["GET"] = 0] = "GET";
    HttpMode[HttpMode["POST"] = 1] = "POST";
    HttpMode[HttpMode["PUT"] = 2] = "PUT";
    HttpMode[HttpMode["PATCH"] = 3] = "PATCH";
    HttpMode[HttpMode["DELETE"] = 4] = "DELETE";
})(HttpMode = exports.HttpMode || (exports.HttpMode = {}));
var HttpUri;
(function (HttpUri) {
    HttpUri["create+id+message"] = "/channels/{channel_id}/messages";
})(HttpUri = exports.HttpUri || (exports.HttpUri = {}));
var UriMode;
(function (UriMode) {
    UriMode[UriMode["create+id+message"] = 1] = "create+id+message";
})(UriMode = exports.UriMode || (exports.UriMode = {}));
