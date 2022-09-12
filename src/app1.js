"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PasswordsService_1 = __importDefault(require("./service/PasswordsService"));
const types_1 = require("./model/types");
const FormManager_1 = __importDefault(require("./dom/FormManager"));
const container = document.querySelector(".container");
const formProperties = {
    id: "form",
    submitButtonMessage: "generate",
    submitCallback: () => submit,
    formHeaderText: "password generator",
    formFields: [
        {
            type: "checkbox",
            labels: [
                types_1.Properties.SYMBOL,
                types_1.Properties.NUMBER,
                types_1.Properties.LOWERCASE,
                types_1.Properties.UPPERCASE,
            ],
        },
        {
            type: "text",
            labels: ["password"],
        },
    ],
};
const fm = new FormManager_1.default(formProperties);
const submit = () => console.log("submit");
const newPassword = {
    length: 8,
    properties: [
        { [types_1.Properties.LOWERCASE]: true },
        { [types_1.Properties.NUMBER]: true },
        { [types_1.Properties.SYMBOL]: true },
        { [types_1.Properties.UPPERCASE]: true },
    ],
};
const Ps = new PasswordsService_1.default();
Ps.passwordGenerator(newPassword);
const form = fm.createForm();
container.appendChild(form);
