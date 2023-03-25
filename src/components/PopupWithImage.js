import Popup from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._img = this._element.querySelector(".popup__image");
    this._imgTitle = this._element.querySelector(".popup__header_photo");
  }

  open({ data }) {
    this._imgTitle.textContent = data.name;
    this._img.src = data.link;
    this._img.alt = data.name;
    super.open();
  }
}
