import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ submitHandler }, popupElement, inputSelector, formSelector) {
    super(popupElement);
    this._submitHandler = submitHandler;
    this._form = popupElement.querySelector(formSelector);
    this._inputList = Array.from(this._element.querySelectorAll(inputSelector));
    this._formValues = {};
  }

  _getInputValues() {
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    this._form.addEventListener(
      "submit",
      (event) => {
        event.preventDefault();
        this._submitHandler(this._getInputValues());
      },
      { once: true }
    );
    super.setEventListeners();
  }

  close() {
    this._form.reset();
    super.close();
  }
}
