export default class Popup {
  constructor(popupElement) {
    this._element = popupElement;
    this._closeButton = this._element.querySelector(".popup__close-button");
    this._handleEscClose = this._handleEscClose.bind(this);
    this.close = this.close.bind(this);
  }

  open() {
    this.setEventListeners();
    this._element.classList.add("popup_opened");
  }

  close() {
    this._element.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
    this._element.classList.remove("popup_opened");
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  _closePopupOnOverlay(evt) {
    if (evt.target.classList.contains("popup")) {
      this.close(evt.target);
    }
  }

  setEventListeners() {
    this._element.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup_opened")) {
        this.close();
      }
    });

    this._closeButton.addEventListener("click", this.close);
    document.addEventListener("keydown", this._handleEscClose);
  }
}
