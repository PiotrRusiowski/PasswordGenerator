"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FormManagerExtended_1 = __importDefault(require("./FormManagerExtended"));
const types_1 = require("../model/types");
class FormManager {
    constructor({ className, id, submitCallback, submitButtonMessage, formHeaderText, formFields, DOMElement, initialState, formElement, }) {
        this.id = id;
        this.DOMElement = DOMElement;
        this.className = className;
        this.submitCallback = submitCallback;
        this.submitButtonMessage = submitButtonMessage;
        this.formHeaderText = formHeaderText;
        this.formFields = formFields;
        this.state = initialState;
        this.formElement = this.createFormElement();
    }
    createForm() {
        this.formElement.id = this.id;
        this.formElement.className = this.className;
        this.formFields.forEach((field) => this.createFormField(field));
        if (this.id === "pass-form") {
            this.formElement.appendChild(FormManagerExtended_1.default.createPassStrength());
        }
        this.formElement.appendChild(FormManager.createSubmitButton(this.submitButtonMessage));
        this.formElement.addEventListener("submit", (e) => {
            e.preventDefault();
            this.submitCallback(this.state, e);
        });
        return this.formElement;
    }
    createFormElement() {
        return document.createElement("form");
    }
    createFormField({ wrapperClassName, input }) {
        const formField = FormManager.createDivElement(wrapperClassName);
        const inputElement = this.createInput(input, formField);
        this.formElement.appendChild(formField);
    }
    createInput({ id, className, label, attributes, initialValue, type }, domElement) {
        const inputElement = document.createElement("input");
        if (id) {
            inputElement.id = id;
        }
        inputElement.type = type;
        inputElement.className = className;
        domElement.appendChild(inputElement);
        if (attributes) {
            attributes.forEach(([name, value]) => {
                inputElement.setAttribute(name, value);
            });
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
        const labelElement = document.createElement("label");
        if (label) {
            labelElement.setAttribute("for", id);
            labelElement.textContent = label;
            domElement.appendChild(labelElement);
        }
        if (initialValue) {
            inputElement.value = initialValue;
            labelElement.textContent = "pass length";
            labelElement.appendChild(this.createSpanElement(initialValue));
        }
        return inputElement;
    }
    static createDivElement(className = "", id = "") {
        const divElement = document.createElement("div");
        if (id.length) {
            divElement.id = id;
        }
        if (className.length) {
            divElement.className = className;
        }
        return divElement;
    }
    createSpanElement(text) {
        const spanElement = document.createElement("span");
        spanElement.textContent = text;
        return spanElement;
    }
    static createSubmitButton(message) {
        const formattedMessage = message.toUpperCase();
        const buttonElement = document.createElement("button");
        buttonElement.className = "btn ";
        buttonElement.setAttribute("type", "submit");
        buttonElement.textContent = formattedMessage;
        return buttonElement;
    }
    setState(name, value) {
        const state = {};
        state[name] = value;
        this.state = Object.assign(Object.assign({}, this.state), state);
    }
}
exports.default = FormManager;
