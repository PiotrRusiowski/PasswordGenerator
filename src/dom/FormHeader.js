"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FormManager_1 = __importDefault(require("./FormManager"));
class FormHeader extends FormManager_1.default {
    constructor({ className, id, submitCallback, submitButtonMessage, formHeaderText, formFields, DOMElement, initialState, }) {
        super({
            className,
            id,
            submitCallback,
            submitButtonMessage,
            formHeaderText,
            formFields,
            DOMElement,
            initialState,
        });
    }
    static showPassword(password, inputId) {
        const input = document.querySelector(`#${inputId}`);
        if (input)
            input.value = password;
    }
    static createPassStrength(strength = "weak") {
        const domElement = FormHeader.createDivElement(`pass-strength--${strength}`, "pass-strength");
        domElement.textContent = strength;
        new Array(5)
            .fill("pass-strength__box")
            .forEach((className) => domElement.appendChild(FormHeader.createDivElement(className)));
        return domElement;
    }
}
exports.default = FormHeader;
