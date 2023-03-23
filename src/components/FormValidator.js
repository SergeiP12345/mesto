export class FormValidator {
  constructor(validatorConfig, formElement) {
    this._formSelector = validatorConfig.formSelector;
    this._inputSelector = validatorConfig.inputSelector;
    this._submitButtonSelector = validatorConfig.submitButtonSelector;
    this._inactiveButtonClass = validatorConfig.inactiveButtonClass;
    this._inputErrorClass = validatorConfig.inputErrorClass;
    this._errorClass = validatorConfig.errorClass;
    this._validationForm = formElement;
    this._submitButton = this._validationForm.querySelector(
      this._submitButtonSelector
    );

    this._inputArray = Array.from(
      this._validationForm.querySelectorAll(this._inputSelector)
    );
  }

  resetValidation() {
    this._toggleButtonState();

    this._inputArray.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  _setEventListeners() {
    this._toggleButtonState();

    this._inputArray.forEach((_input) => {
      _input.addEventListener("input", () => {
        this._checkInputValidity(_input);

        this._toggleButtonState();
      });
    });
  }

  _hasInvalidInput() {
    return this._inputArray.some((_input) => {
      return !_input.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }

  _checkInputValidity(_input) {
    if (!_input.validity.valid) {
      this._showInputError(_input, this._getErrorElement(_input));
    } else {
      this._hideInputError(_input, this._getErrorElement(_input));
    }
  }

  _showInputError(_input, _errorElement) {
    _errorElement.textContent = _input.validationMessage;
    _errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._validationForm.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  _disableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _enableButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _getErrorElement(_input) {
    return this._validationForm.querySelector(`#${_input.id}-error`);
  }

  enableValidation() {
    this._setEventListeners();
  }
}
