"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formFieldsHeader = exports.formFieldsGenerator = void 0;
const types_1 = require("../model/types");
exports.formFieldsGenerator = [
    {
        wrapperClassName: `form-group-element form-group-element--${types_1.InputsTypes.RANGE}`,
        input: {
            type: types_1.InputsTypes.RANGE,
            id: "length",
            className: `form-group-element__input-${types_1.InputsTypes.RANGE}`,
            attributes: [
                ["min", "5"],
                ["max", "20"],
            ],
            initialValue: "5",
            label: "range",
        },
    },
    {
        wrapperClassName: `form-group-element form-group-element--${types_1.InputsTypes.CHECKBOX}`,
        input: {
            type: types_1.InputsTypes.CHECKBOX,
            id: types_1.Properties.LOWERCASE,
            attributes: [["checked", "5"]],
            className: `form-group-element__input-${types_1.InputsTypes.CHECKBOX}`,
            label: `Include ${types_1.Properties.LOWERCASE} Letters`,
        },
    },
    {
        wrapperClassName: `form-group-element form-group-element--${types_1.InputsTypes.CHECKBOX}`,
        input: {
            type: types_1.InputsTypes.CHECKBOX,
            id: types_1.Properties.UPPERCASE,
            attributes: [["checked", "5"]],
            className: `form-group-element__input-${types_1.InputsTypes.CHECKBOX}`,
            label: `Include ${types_1.Properties.UPPERCASE} Letters`,
        },
    },
    {
        wrapperClassName: `form-group-element form-group-element--${types_1.InputsTypes.CHECKBOX}`,
        input: {
            type: types_1.InputsTypes.CHECKBOX,
            id: types_1.Properties.NUMBER,
            attributes: [["checked", "5"]],
            className: `form-group-element__input-${types_1.InputsTypes.CHECKBOX}`,
            label: ` Include ${types_1.Properties.NUMBER}`,
        },
    },
    {
        wrapperClassName: `form-group-element form-group-element--${types_1.InputsTypes.CHECKBOX}`,
        input: {
            type: types_1.InputsTypes.CHECKBOX,
            id: types_1.Properties.SYMBOL,
            className: `form-group-element__input-${types_1.InputsTypes.CHECKBOX}`,
            label: `Include ${types_1.Properties.SYMBOL}`,
        },
    },
];
exports.formFieldsHeader = [
    {
        wrapperClassName: `form-group-element form-group-element--show-password`,
        input: {
            type: types_1.InputsTypes.STRING,
            id: "show-password",
            className: `form-group-element__input-show-password`,
            label: "",
        },
    },
];
