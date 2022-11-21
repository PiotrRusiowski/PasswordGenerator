"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FormManager {
    constructor({ className, id, submitCallback, submitButtonMessage, formHeaderText, formFields, DOMElement, formElement, }) {
        this.id = id;
        this.DOMElement = DOMElement;
        this.className = className;
        this.submitCallback = submitCallback;
        this.submitButtonMessage = submitButtonMessage;
        this.formHeaderText = formHeaderText;
        this.formFields = formFields;
        this.formElement = this.createFormElement();
    }
    createForm() {
        this.formElement.id = this.id;
        this.formElement.className = this.className;
        this.formFields.forEach((field) => this.createFormField(field));
        this.formElement.appendChild(FormManager.createSubmitButton(this.submitButtonMessage));
        this.formElement.addEventListener("submit", (e) => {
            e.preventDefault();
            this.submitCallback();
        });
        return this.formElement;
    }
    createFormElement() {
        return document.createElement("form");
    }
    createFormField({ wrapperClassName, input }) {
        const formField = FormManager.createDivElement(wrapperClassName);
        const inputElement = this.createInput(input);
        const labelElement = this.createLabelElement(input.label, input.id);
        formField.appendChild(labelElement);
        formField.appendChild(inputElement);
        this.formElement.appendChild(formField);
    }
    createInput({ id, className, attributes, type }) {
        const inputElement = document.createElement("input");
        if (id) {
            inputElement.id = id;
        }
        inputElement.type = type;
        inputElement.className = className;
        if (attributes) {
            attributes.forEach(([name, value]) => {
                inputElement.setAttribute(name, value);
            });
        }
        return inputElement;
    }
    createLabelElement(label, id) {
        const labelElement = document.createElement("label");
        if (label) {
            labelElement.setAttribute("for", id);
            labelElement.textContent = label;
        }
        return labelElement;
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
    static createSpanElement(text) {
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
}
exports.default = FormManager;
