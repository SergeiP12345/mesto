export class FormValidator {
  constructor(validationConfig, validationElement) {
    this._formSelector = validationConfig.formSelector;
    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._errorClass = validationConfig.errorClass;
    this._validationForm = validationElement.querySelector(this._formSelector);
    this._submitButton = this._validationForm.querySelector(
      this._submitButtonSelector
    );
    this._inputArray = Array.from(
      this._validationForm.querySelectorAll(this._inputSelector)
    );
  }

  clearValidation() {
    this._validationForm.reset();
    this._inputArray.forEach((_input) => {
      this._hideInputError(_input, this._getErrorElement(_input));
    });

    this._toggleButtonState();
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

  _hideInputError(_input, _errorElement) {
    _input.classList.remove(this._inputErrorClass);
    _errorElement.textContent = "";
    _errorElement.classList.remove(this._errorClass);
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
