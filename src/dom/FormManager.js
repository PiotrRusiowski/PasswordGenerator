"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FormManager {
    constructor({ id, submitCallback, submitButtonMessage, formHeaderText, formFields, }) {
        this.formElement = this.createFormElement();
        this.state = {};
        this.id = id;
        this.submitCallback = submitCallback;
        this.submitButtonMessage = submitButtonMessage;
        this.formHeaderText = formHeaderText;
        this.formFields = formFields;
    }
    createFormElement() {
        const formElement = document.createElement("form");
        formElement.id = this.id;
        const formHeader = document.createElement("h3");
        formHeader.className = "form-header";
        formHeader.textContent = this.formHeaderText;
        formElement.appendChild(formHeader);
        return formElement;
    }
    createForm() {
        this.formFields.forEach((el) => this.createInput(el));
        this.formElement.appendChild(FormManager.createSubmitButton(this.submitButtonMessage));
        this.formElement.addEventListener("submit", (e) => {
            e.preventDefault();
            this.submitCallback();
        });
        return this.formElement;
    }
    createInput({ type, labels }) {
        return labels.forEach((label) => {
            const id = label;
            const formGroupElement = FormManager.createFormGroupElement();
            const inputElement = document.createElement("input");
            inputElement.id = id;
            inputElement.type = type;
            inputElement.name = type;
            inputElement.className = "form-control";
            formGroupElement.appendChild(inputElement);
            const labelElement = document.createElement("label");
            labelElement.setAttribute("for", id);
            labelElement.textContent = id;
            formGroupElement.appendChild(labelElement);
            this.formElement.appendChild(formGroupElement);
        });
    }
    static createFormGroupElement() {
        const formGroupElement = document.createElement("div");
        formGroupElement.className = "form-group";
        return formGroupElement;
    }
    static createSubmitButton(message) {
        const formattedMessage = message.toUpperCase();
        const buttonElement = document.createElement("button");
        buttonElement.className = "btn ";
        buttonElement.setAttribute("type", "submit");
        buttonElement.textContent = formattedMessage;
        console.log(buttonElement);
        return buttonElement;
    }
    setState() { }
}
exports.default = FormManager;
