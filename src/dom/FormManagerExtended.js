"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../model/types");
const FormManager_1 = __importDefault(require("./FormManager"));
class FormManagerExtended extends FormManager_1.default {
    constructor({ className, id, submitButton, submitButtonMessage, formHeaderText, formFields, DOMElement, formElement, initialState, }) {
        super({
            className,
            id,
            submitButton,
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
        this.formElement.className = this.className;
        this.formFields.forEach((field) => this.createFormField(field));
        this.formElement.appendChild(FormManagerExtended.createPassStrength());
        this.formElement.appendChild(FormManager_1.default.createSubmitButton(this.submitButtonMessage, this.submitButton.className));
        this.formElement.addEventListener("submit", (e) => {
            e.preventDefault();
            this.submitButton.submitCallback(this.state, e);
        });
        return this.formElement;
    }
    createFormField({ wrapperClassName, input }) {
        const { type, initialValue, label, id } = input;
        const formField = FormManager_1.default.createDivElement(wrapperClassName);
        const inputElement = this.createInput(input);
        const labelElement = this.createLabelElement(label, id);
        if (initialValue) {
            inputElement.value = initialValue;
            FormManagerExtended.createRangeLabel(inputElement.value, labelElement);
        }
        formField.appendChild(inputElement);
        formField.appendChild(labelElement);
        inputElement.addEventListener("input", (event) => {
            const target = event.target;
            switch (type) {
                case types_1.InputsTypes.RANGE:
                    FormManagerExtended.createRangeLabel(inputElement.value, labelElement);
                    return this.setState(id, target.value);
                case types_1.InputsTypes.CHECKBOX:
                    return this.setState(id, target.checked);
            }
        });
        this.formElement.appendChild(formField);
    }
    static createRangeLabel(passLength, labelElement) {
        labelElement.textContent = "pass length";
        labelElement.appendChild(FormManager_1.default.createSpanElement(passLength, "form-group-element__pass-length"));
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
        console.log(this.state);
        const state = {};
        state[name] = value;
        this.state = Object.assign(Object.assign({}, this.state), state);
    }
}
exports.default = FormManagerExtended;
