export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._element = this._copyTemplate();
    this._likeButton = this._element.querySelector(".element__like");
    this._imgTemplate = this._element.querySelector(".element__image");
    this._templateTitle = this._element.querySelector(".element__title");
    this._buttonDelete = this._element.querySelector(".element__deletecard");
    this._handleCardClick = handleCardClick;
  }

  _copyTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
  }

  generateCard() {
    this._setEventListeners();
    this._imgTemplate.src = this._link;
    this._imgTemplate.alt = this._name;
    this._templateTitle.textContent = this._name;
    return this._element;
  }

  _setEventListeners() {
    this._buttonDelete.addEventListener("click", () => this._removeCard());
    this._likeButton.addEventListener("click", (event) =>
      this._likeCard(event.target)
    );

    this._imgTemplate.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  _removeCard() {
    this._element.remove();
  }

  _likeCard() {
    this._likeButton.classList.toggle("element__like_active");
  }
}
