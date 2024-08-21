"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUUID = void 0;
var uuid_1 = require("uuid");
var randexp_1 = __importDefault(require("randexp"));
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
exports.default = (function (_a) {
    var strapi = _a.strapi;
    var contentTypes = strapi.contentTypes;
    var models = Object.keys(contentTypes).reduce(function (acc, key) {
        var _a;
        var contentType = contentTypes[key];
        if (!key.startsWith("api"))
            return acc;
        var attributes = Object.keys(contentType.attributes).filter(function (attrKey) {
            var attribute = contentType.attributes[attrKey];
            if (attribute.customField === "plugin::strapi-advanced-uuid.uuid") {
                return true;
            }
        });
        if (attributes.length > 0) {
            return __assign(__assign({}, acc), (_a = {}, _a[key] = attributes, _a));
        }
        return acc;
    }, {});
    var modelsToSubscribe = Object.keys(models);
    if (strapi.db) {
        strapi.db.lifecycles.subscribe(function (event) {
            if (event.action === "beforeCreate" &&
                modelsToSubscribe.includes(event.model.uid)) {
                models[event.model.uid].forEach(function (attribute) {
                    if (!event.params.data[attribute]) {
                        if (event.model.attributes) {
                            var options = event.model.attributes[attribute]["options"];
                            if (options) {
                                var uuidFormat = options["uuid-format"];
                                event.params.data[attribute] = uuidFormat
                                    ? (0, exports.generateUUID)(uuidFormat)
                                    : (0, uuid_1.v4)();
                            }
                            else {
                                event.params.data[attribute] = (0, uuid_1.v4)();
                            }
                        }
                        else {
                            event.params.data[attribute] = (0, uuid_1.v4)();
                        }
                    }
                });
            }
        });
    }
});
