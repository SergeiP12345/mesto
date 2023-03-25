import Popup from "./Popup.js";

export class PopupConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupForm = this._element.querySelector(".popup__form");
  }

  setSubmitCallback(handleSubmit) {
    this._submitHandler = handleSubmit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this._submitHandler();
    });
  }
}
