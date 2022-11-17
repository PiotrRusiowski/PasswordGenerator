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
    static createPassStrength(strength = "") {
        const passStrength = FormHeader.createDivElement(`pass-strength`, "pass-strength");
        passStrength.textContent = "strength:";
        const passStrengthBoxes = strength.length
            ? FormHeader.createDivElement(`pass-strength pass-strength__boxes pass-strength__boxes--${strength}`)
            : FormHeader.createDivElement(`pass-strength pass-strength__boxes`);
        passStrengthBoxes.textContent = strength; /////////////////////////////TUTAJ
        new Array(4)
            .fill(strength.length
            ? `pass-strength pass-strength__boxes pass-strength__boxes--${strength} 
          pass-strength__boxes__box`
            : `pass-strength pass-strength__box`)
            .forEach((className) => passStrengthBoxes.appendChild(FormHeader.createDivElement(className)));
        passStrength.appendChild(passStrengthBoxes);
        return passStrength;
    }
}
exports.default = FormHeader;
