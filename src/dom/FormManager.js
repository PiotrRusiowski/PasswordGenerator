"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FormManager {
    constructor({ className, id, submitCallback, submitButtonMessage, formHeaderText, formFields, DOMElement, initialState, }) {
        this.id = id;
        this.DOMElement = DOMElement;
        this.className = className;
        this.submitCallback = submitCallback;
        this.submitButtonMessage = submitButtonMessage;
        this.formHeaderText = formHeaderText;
        this.formFields = formFields;
        this.state = initialState;
    }
    createForm() {
        this.formElement.id = this.id;
        this.formElement.className = this.className;
        this.formFields.forEach((el) => this.createInput(el));
        this.formElement.appendChild(FormManager.createSubmitButton(this.submitButtonMessage));
        this.formElement.addEventListener("submit", (e) => {
            e.preventDefault();
            this.submitCallback(this.state, e);
        });
        return this.formElement;
    }
    createFormElement() {
        const formElement = document.createElement("form");
        return formElement;
    }
    createInput({ type, labels, attributes, initialValue, id, }) {
        return labels.forEach((label) => {
            const formGroupElement = FormManager.createDivElement(`form-group-element form-group-element--${type}`);
            let inputId;
            id ? (inputId = id[0]) : (inputId = label);
            const inputElement = document.createElement("input");
            inputElement.id = inputId;
            inputElement.type = type;
            inputElement.name = type;
            inputElement.className = "form-control";
            formGroupElement.appendChild(inputElement);
            if (attributes) {
                attributes.forEach(([name, value]) => {
                    inputElement.setAttribute(name, value);
                });
            }
            const labelElement = document.createElement("label");
            labelElement.setAttribute("for", inputId);
            labelElement.textContent = inputId;
            formGroupElement.appendChild(labelElement);
            if (initialValue) {
                labelElement.textContent = initialValue;
                inputElement.value = initialValue;
            }
            inputElement.addEventListener("input", (event) => {
                const target = event.target;
                switch (type) {
                    case "range":
                        inputElement.value = target.value;
                        labelElement.textContent = target.value;
                        return this.setState(label, target.value);
                    case "checkbox":
                        return this.setState(label, target.checked);
                }
            });
            this.formElement.appendChild(formGroupElement);
        });
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
