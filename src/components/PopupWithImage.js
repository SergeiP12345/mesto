import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._img = this._element.querySelector(".popup__image");
    this._imgTitle = this._element.querySelector(".popup__header_photo");
  }

  open(name, link) {
    this._imgTitle.textContent = name;
    this._img.src = link;
    this._img.alt = name;
    super.open();
  }
}
