"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PasswordsService_1 = __importDefault(require("./service/PasswordsService"));
const FormManager_1 = __importDefault(require("./dom/FormManager"));
const types_1 = require("./model/types");
const passwordGeneratorElement = document.querySelector(".passwordGenerator");
const ps = new PasswordsService_1.default();
const submit = (_a) => {
    var { length } = _a, prop = __rest(_a, ["length"]);
    const lengthInput = document.querySelector("#length");
    const newPassword = ps.passwordGenerator({
        length: Number(length),
        properties: prop,
    });
    FormManager_1.default.showPassword(newPassword.stringPass, "show-password");
    reloadPassStrength(newPassword.passStrength);
};
const copyPassToClipBoard = () => {
    const textarea = document.createElement("textarea");
    const input = document.getElementById("show-password");
    const password = input.value;
    if (!password) {
        alert("please generate a password");
        return;
    }
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    alert("copy password to a clipboard!");
};
const reloadPassStrength = (strength) => {
    console.log(strength);
    const oldPassStr = document.querySelector("#pass-strength");
    const passStr = FormManager_1.default.createPassStrength(strength);
    oldPassStr && oldPassStr.replaceWith(passStr);
};
const formProperties = {
    id: "pass-form",
    DOMElement: passwordGeneratorElement,
    className: "passwordGenerator__box passwordGenerator__box--content",
    submitButtonMessage: "generate",
    submitCallback: submit,
    formHeaderText: "",
    formFields: [
        {
            type: "range",
            labels: ["length"],
            attributes: [
                ["min", "5"],
                ["max", "20"],
            ],
            initialValue: "5",
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
    DOMElement: passwordGeneratorElement,
    id: "",
    className: "passwordGenerator__box passwordGenerator__box--header",
    submitButtonMessage: "copy",
    submitCallback: copyPassToClipBoard,
    formHeaderText: "password generator",
    formFields: [
        {
            id: ["show-password"],
            type: "string",
            labels: [""],
        },
    ],
};
const fm2 = new FormManager_1.default(headerProperties);
const formHeaderElement = fm2.createForm();
passwordGeneratorElement.appendChild(formHeaderElement);
const fm = new FormManager_1.default(formProperties);
const formElement = fm.createForm();
passwordGeneratorElement.appendChild(formElement);
