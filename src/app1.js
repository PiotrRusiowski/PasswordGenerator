"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PasswordsService_1 = __importDefault(require("./service/PasswordsService"));
const types_1 = require("./model/types");
const FormManager_1 = __importDefault(require("./dom/FormManager"));
const passwordGeneratorElement = document.querySelector(".passwordGenerator");
const ps = new PasswordsService_1.default();
const submit = () => {
    const checkboxes = [...document.querySelectorAll("input[name=checkbox]")].map((checkbox) => {
        const password = {};
        // @ts-ignore
        password[checkbox.id] = checkbox.checked;
        return password;
    });
    ps.passwordGenerator({ length: 8, properties: checkboxes });
    console.log(ps.getPassword());
};
const formProperties = {
    id: "dddd",
    submitButtonMessage: "generate",
    submitCallback: submit,
    formHeaderText: "password generator",
    formFields: [
        {
            type: "number",
            labels: ["length"],
        },
        {
            type: "checkbox",
            labels: [
                types_1.Properties.SYMBOL,
                types_1.Properties.NUMBER,
                types_1.Properties.LOWERCASE,
                types_1.Properties.UPPERCASE,
            ],
        },
    ],
};
const headerProperties = {
    id: "form",
    submitButtonMessage: "",
    submitCallback: submit,
    formHeaderText: "password generator",
    formFields: [
        {
            type: "string",
            labels: ["Password Generator"],
        },
    ],
};
const fm2 = new FormManager_1.default(headerProperties);
const formHeaderElement = fm2.createForm();
passwordGeneratorElement.appendChild(formHeaderElement);
const fm = new FormManager_1.default(formProperties);
const formElement = fm.createForm();
passwordGeneratorElement.appendChild(formElement);
