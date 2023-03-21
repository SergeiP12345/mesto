export class FormValidator {
  constructor(validatorConfig, formElement) {
    this._inputSelector = validatorConfig.inputSelector;
    this._submitButtonSelector = validatorConfig.submitButtonSelector;
    this._inactiveButtonClass = validatorConfig.inactiveButtonClass;
    this._inputErrorClass = validatorConfig.inputErrorClass;
    this._errorClass = validatorConfig.errorClass;
    this._formElement = formElement;
    this._inputs = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  _checkformValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _toggleFormButtonState() {
    if (this._hasInvalideInput()) {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute("disabled");
    } else {
      this.disableSubmitButton();
    }
  }

  disableSubmitButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute("disabled", true);
  }

  resetValidation = () => {
    this._toggleFormButtonState();

    this._inputs.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  };

  _setEventListeners = () => {
    this._toggleFormButtonState();

    this._inputs.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkformValidity(inputElement);
        this._toggleFormButtonState();
      });
    });
  };

  _hasInvalideInput() {
    return this._inputs.every((inputElement) => {
      return inputElement.validity.valid;
    });
  }

  enableValidation = () => {
    this._setEventListeners();
  };
}
