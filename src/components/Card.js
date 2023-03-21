export class Card {
  constructor(
    template,
    data,
    owner,
    handleCardClick,
    userId,
    like,
    dislike,
    handleRemoveButtonClick
  ) {
    this._title = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;

    this._ownerId = owner._id;
    this._templateContainer = template;
    this._handleCardClick = handleCardClick;
    this._userId = userId;
    this._like = like;
    this._dislike = dislike;
    this._handleRemoveButtonClick = handleRemoveButtonClick;
  }

  getCardId() {
    return this._id;
  }

  handleLikeCard(data) {
    this._likes = data.likes;
    this._countLikeElement.textContent = this._likes.length;
    this._likeButton.classList.toggle("element__like_active");
  }

  _userLiked() {
    this._likes.forEach((elementId) => {
      if (elementId._id === this._userId) {
        this._likeButton.classList.add("element__like_active");
      } else {
        this._likeButton.classList.remove("element__like_active");
      }
    });
  }

  _hasDeleteBtn() {
    if (this._userId !== this._ownerId) {
      this._deleteBtn.remove();
    }
  }

  _getTemplateElement() {
    return document
      .querySelector("#template")
      .content.querySelector(".element")
      .cloneNode(true);
  }

  _toggleLike() {
    if (this._likeButton.classList.contains("element__like_active")) {
      this._dislike(this._id);
    } else {
      this._like(this._id);
    }
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
      this._handleCardClick(this._link, this._title)
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
    this._hasDeleteBtn();

    this._cardsElementImage.src = this._link;
    this._cardsElementImage.alt = this._title;
    this._cardsElementTitle.textContent = this._title;

    return this._cardElement;
  }
}
