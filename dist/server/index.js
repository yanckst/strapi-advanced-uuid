"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var register_1 = __importDefault(require("./register"));
var bootstrap_1 = __importDefault(require("./bootstrap"));
exports.default = {
    register: register_1.default,
    bootstrap: bootstrap_1.default
};
