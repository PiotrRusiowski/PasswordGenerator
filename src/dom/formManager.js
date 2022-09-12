"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FormManager {
    constructor(formProperties) {
        const { id, submitCallback, submitButtonMessage, formHeaderText, formFields, } = formProperties;
        this.id = id;
        this.submitCallback = submitCallback;
        this.submitButtonMessage = submitButtonMessage;
        this.formHeaderText = formHeaderText;
        this.formFields = formFields;
    }
    createForm() {
        const formElement = document.createElement("form");
        formElement.id = this.id;
        const formHeader = document.createElement("h3");
        formHeader.className = "form-header";
        formHeader.textContent = this.formHeaderText;
        formElement.appendChild(formHeader);
        return formElement;
    }
}
exports.default = FormManager;
