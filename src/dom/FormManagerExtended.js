"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../model/types");
const FormManager_1 = __importDefault(require("./FormManager"));
class FormManagerExtended extends FormManager_1.default {
    constructor({ className, id, submitCallback, submitButtonMessage, formHeaderText, formFields, DOMElement, formElement, initialState, }) {
        super({
            className,
            id,
            submitCallback,
            submitButtonMessage,
            formHeaderText,
            formFields,
            DOMElement,
            formElement,
        });
        this.state = initialState;
    }
    static showPassword(password, inputId) {
        const input = document.querySelector(`#${inputId}`);
        if (input)
            input.value = password;
    }
    createForm() {
        const formElement = super.createForm();
        formElement.appendChild(FormManagerExtended.createPassStrength());
        formElement.addEventListener("submit", (e) => {
            e.preventDefault();
            this.submitCallback(this.state, e);
        });
        return formElement;
    }
    createInput({ id, className, label, attributes, initialValue, type, }) {
        const inputElement = super.createInput({
            id,
            className,
            label,
            attributes,
            initialValue,
            type,
        });
        const labelElement = super.createLabelElement(label, id);
        if (initialValue) {
            inputElement.value = initialValue;
            labelElement.textContent = "pass length";
            labelElement.appendChild(FormManager_1.default.createSpanElement(initialValue));
        }
        inputElement.addEventListener("input", (event) => {
            const target = event.target;
            switch (type) {
                case types_1.InputsTypes.RANGE:
                    inputElement.value = target.value;
                    labelElement.textContent = `pass length ${target.value}`;
                    return this.setState(id, target.value);
                case types_1.InputsTypes.CHECKBOX:
                    return this.setState(id, target.checked);
            }
        });
        return inputElement;
    }
    static createPassStrength(strength = "") {
        const passStrength = FormManager_1.default.createDivElement(`pass-strength`, "pass-strength");
        passStrength.textContent = "strength:";
        const passStrengthBoxes = strength.length
            ? FormManager_1.default.createDivElement(`pass-strength pass-strength__boxes pass-strength__boxes--${strength}`)
            : FormManager_1.default.createDivElement(`pass-strength pass-strength__boxes`);
        passStrengthBoxes.textContent = strength; /////////////////////////////TUTAJ
        new Array(4)
            .fill(strength.length
            ? `pass-strength pass-strength__boxes pass-strength__boxes--${strength} 
          pass-strength__boxes__box`
            : `pass-strength pass-strength__box`)
            .forEach((className) => passStrengthBoxes.appendChild(FormManagerExtended.createDivElement(className)));
        passStrength.appendChild(passStrengthBoxes);
        return passStrength;
    }
    setState(name, value) {
        const state = {};
        state[name] = value;
        this.state = Object.assign(Object.assign({}, this.state), state);
    }
}
exports.default = FormManagerExtended;
