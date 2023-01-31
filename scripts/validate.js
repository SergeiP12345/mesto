const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__name",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input-error",
  errorClass: "popup__input-error_active",
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

function toggleButtonState(inputList, buttonSave) {
  if (hasInvalidInput(inputList)) {
    buttonSave.classList.add(config.inactiveButtonClass);
    buttonSave.setAttribute("disabled", "disabled");
  } else {
    buttonSave.classList.remove(config.inactiveButtonClass);
    buttonSave.removeAttribute("disabled", "disabled");
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonSave = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonSave);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);

      toggleButtonState(inputList, buttonSave);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {});
    setEventListeners(formElement, config);
  });
};

/* Вызов функций */
enableValidation(config);
