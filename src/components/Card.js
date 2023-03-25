export class Card {
  constructor(
    template,
    data,
    handleRemoveButtonClick,
    handleCardClick,
    userId,
    like,
    dislike
  ) {
    this._title = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._templateContainer = template;
    this._handleCardClick = handleCardClick;
    this._like = like;
    this._dislike = dislike;

    this._handleRemoveButtonClick = handleRemoveButtonClick;
  }

  getCardId() {
    return this._id;
  }

  //прячем корзину, если чужая карточка
  hiddenDeleteBtn() {
    this._isOwner = this._ownerId === this._userId;
    this._deleteBtn.classList.toggle(
      "element__deletecard_hidden",
      !this._isOwner
    );
  }

  _getTemplateElement() {
    return document
      .querySelector("#template")
      .content.querySelector(".element")
      .cloneNode(true);
  }
  _toggleLike() {
    if (this._likeButton.classList.contains("element__like-button_active")) {
      this._dislike(this._id);
    } else {
      this._like(this._id);
    }
  }
  handleLikeCard(data) {
    this._likes = data.likes;
    this._countLikeElement.textContent = this._likes.length;
    this._likeButton.classList.toggle("element__like-button_active");
  }

  _userLiked() {
    this._likes.forEach((elementId) => {
      if (elementId._id === this._userId) {
        this._likeButton.classList.add("element__like-button_active");
      } else {
        this._likeButton.classList.remove("element__like-button_active");
      }
    });
  }
  removeCard() {
    this._cardElement.remove();
  }

  _setEventListeners() {
    this._deleteBtn.addEventListener("click", () => {
      this._handleRemoveButtonClick();
    });
    this._likeButton.addEventListener("click", () => this._toggleLike());
    this._cardsElementImage.addEventListener("click", () =>
      this.handleCardClick(this._link, this._title)
    );
  }

  generateCard() {
    this._cardElement = this._getTemplateElement();
    this._deleteBtn = this._cardElement.querySelector(".element__deletecard");
    this._cardsElementImage =
      this._cardElement.querySelector(".element__image");
    this._cardsElementTitle =
      this._cardElement.querySelector(".element__title");
    this._likeButton = this._cardElement.querySelector(".element__like");
    this._countLikeElement = this._cardElement.querySelector(
      ".element__like-number"
    );
    this._countLikeElement.textContent = this._likes.length;
    this._setEventListeners();
    this._userLiked();
    this.hiddenDeleteBtn();

    this._cardsElementImage.src = this._link;
    this._cardsElementImage.alt = this._title;
    this._cardsElementTitle.textContent = this._title;

    return this._cardElement;
  }
}
