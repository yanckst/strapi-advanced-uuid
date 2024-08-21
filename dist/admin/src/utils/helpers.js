"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUUID = exports.generateUUID = exports.getTrad = void 0;
var randexp_1 = __importDefault(require("randexp"));
var pluginId_1 = __importDefault(require("../pluginId"));
var getTrad = function (id) { return "".concat(pluginId_1.default, ".").concat(id); };
exports.getTrad = getTrad;
var generateUUID = function (format) {
    try {
        var regexFormat = new RegExp(format);
        return new randexp_1.default(regexFormat).gen();
    }
    catch (error) {
        return null;
    }
};
exports.generateUUID = generateUUID;
var validateUUID = function (format, initialValue) {
    var newFormat = "^".concat(format, "$");
    var regexFormat = new RegExp(newFormat, "i");
    return regexFormat.exec(initialValue);
};
exports.validateUUID = validateUUID;
