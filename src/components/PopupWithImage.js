import Popup from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._img = this._element.querySelector(".popup__image");
    this._imgTitle = this._element.querySelector(".popup__header_photo");
  }

  open({ value }) {
    this._imgTitle.textContent = value.name;
    this._img.src = value.link;
    this._img.alt = value.name;
    super.open();
  }
}
