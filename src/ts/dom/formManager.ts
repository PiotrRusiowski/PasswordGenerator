export default class FormManager {
  private id: string;
  private submitButtonMessage: string;
  private submitCallback: Function;
  private formHeaderText: string;
  constructor(
    id: string,
    submitButtonMessage: string,
    submitCallback: Function,
    formHeaderText: string
  ) {
    this.id = id;
    this.submitCallback = submitCallback;
    this.submitButtonMessage = submitButtonMessage;
    this.formHeaderText = formHeaderText;
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
