import Popup from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor({ submitHandler }, popupElement, config) {
    super(popupElement);
    this._submitHandler = submitHandler;
    this._form = popupElement.querySelector(".popup__form");
    this._inputList = Array.from(
      this._element.querySelectorAll(config.inputSelector)
    );
    this._submitButton = document.querySelector(".popup__save-button");
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._formValues = {};
  }

  _getInputValues() {
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._changeToLoadingText();
      this._submitHandler(this._getInputValues(this));
    });
    super.setEventListeners();
  }

  close() {
    super.close();
    this._form.reset();
  }
  _changeToLoadingText() {
    this._submitButton.textContent = "Сохранить...";
  }

  changeToOriginalText() {
    this._submitButton.textContent = this._submitButton.value;
  }
}
