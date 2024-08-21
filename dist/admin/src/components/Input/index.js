"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldActionWrapper = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_intl_1 = require("react-intl");
var styled_components_1 = __importDefault(require("styled-components"));
var icons_1 = require("@strapi/icons");
var uuid_1 = require("uuid");
var design_system_1 = require("@strapi/design-system");
var helpers_1 = require("../../utils/helpers");
exports.FieldActionWrapper = (0, styled_components_1.default)(design_system_1.FieldAction)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  svg {\n    height: 1rem;\n    width: 1rem;\n    path {\n      fill: ", ";\n    }\n  }\n\n  svg:hover {\n    path {\n      fill: ", ";\n    }\n  }\n"], ["\n  svg {\n    height: 1rem;\n    width: 1rem;\n    path {\n      fill: ", ";\n    }\n  }\n\n  svg:hover {\n    path {\n      fill: ", ";\n    }\n  }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.neutral400;
}, function (_a) {
    var theme = _a.theme;
    return theme.colors.primary600;
});
var Input = function (_a) {
    var attribute = _a.attribute, description = _a.description, placeholder = _a.placeholder, disabled = _a.disabled, error = _a.error, intlLabel = _a.intlLabel, labelAction = _a.labelAction, name = _a.name, onChange = _a.onChange, _b = _a.value, initialValue = _b === void 0 ? "" : _b;
    var formatMessage = (0, react_intl_1.useIntl)().formatMessage;
    var _c = (0, react_1.useState)(false), invalidUUID = _c[0], setInvalidUUID = _c[1];
    var ref = (0, react_1.useRef)("");
    var getUUIDFormat = function () {
        if (attribute.options && attribute.options["uuid-format"]) {
            return attribute.options["uuid-format"];
        }
        return null;
    };
    var getRegenerateOption = function () {
        if (attribute.options && attribute.options["disable-regenerate"]) {
            return attribute.options["disable-regenerate"];
        }
        return false;
    };
    var generateNewUUID = function () {
        var uuidFormat = getUUIDFormat();
        return uuidFormat ? (0, helpers_1.generateUUID)(uuidFormat) : (0, uuid_1.v4)();
    };
    (0, react_1.useEffect)(function () {
        var uuidFormat = getUUIDFormat();
        if (!initialValue) {
            var newUUID = generateNewUUID();
            onChange({ target: { value: newUUID, name: name } });
        }
        if (initialValue && initialValue !== ref.current)
            ref.current = initialValue;
        var validateValue = uuidFormat
            ? (0, helpers_1.validateUUID)(uuidFormat, initialValue)
            : (0, uuid_1.validate)(initialValue);
        if (!validateValue)
            return setInvalidUUID(true);
        setInvalidUUID(false);
    }, [initialValue, attribute]);
    return ((0, jsx_runtime_1.jsx)(design_system_1.Box, { children: (0, jsx_runtime_1.jsx)(design_system_1.Field, { id: name, name: name, hint: description && formatMessage(description), error: error !== null && error !== void 0 ? error : (invalidUUID
                ? formatMessage({
                    id: "uuid.form.field.error",
                    defaultMessage: "The UUID format is invalid.",
                })
                : null), children: (0, jsx_runtime_1.jsxs)(design_system_1.Stack, { spacing: 1, children: [(0, jsx_runtime_1.jsx)(design_system_1.Flex, { children: (0, jsx_runtime_1.jsx)(design_system_1.FieldLabel, { children: formatMessage(intlLabel) }) }), (0, jsx_runtime_1.jsx)(design_system_1.FieldInput, { onChange: onChange, labelAction: labelAction, placeholder: placeholder, disabled: disabled || true, required: true, value: initialValue, ref: ref, endAction: !getRegenerateOption() && ((0, jsx_runtime_1.jsx)(exports.FieldActionWrapper, { onClick: function () {
                                var newUUID = generateNewUUID();
                                onChange({ target: { value: newUUID, name: name } });
                            }, label: formatMessage({
                                id: "uuid.form.field.generate",
                                defaultMessage: "Generate",
                            }), children: (0, jsx_runtime_1.jsx)(icons_1.Refresh, {}) })) }), (0, jsx_runtime_1.jsx)(design_system_1.FieldHint, {}), (0, jsx_runtime_1.jsx)(design_system_1.FieldError, {})] }) }) }));
};
exports.default = Input;
var templateObject_1;
