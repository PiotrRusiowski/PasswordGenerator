"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PasswordsService_1 = __importDefault(require("./service/PasswordsService"));
const types_1 = require("./model/types");
const FormManager_1 = __importDefault(require("./dom/FormManager"));
const container = document.querySelector(".container");
const ps = new PasswordsService_1.default();
const submit = () => {
    const checkboxes = [...document.querySelectorAll("input[name=checkbox]")].map((checkbox) => {
        const password = {};
        // @ts-ignore
        password[checkbox.id] = checkbox.checked;
        return password;
    });
    //ps.passwordGenerator({ length: 8, properties: checkboxes });
};
const formProperties = {
    id: "form",
    submitButtonMessage: "generate",
    submitCallback: submit,
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
// const newPassword: Types = {
//   length: 8,
//   properties: [
//     { [Properties.LOWERCASE]: true },
//     { [Properties.NUMBER]: true },
//     { [Properties.SYMBOL]: true },
//     { [Properties.UPPERCASE]: true },
//   ],
// };
const form = fm.createForm();
container.appendChild(form);
