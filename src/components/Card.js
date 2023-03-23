export class Card {
  constructor(
    template,
    data,

    handleCardClick,
    userId,
    like,
    dislike,
    handleDeleteCard
  ) {
    this._title = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._isOwner = this._ownerId === this._userId;
    this._templateContainer = template;
    this._handleCardClick = handleCardClick;
    this._like = like;
    this._dislike = dislike;
    this._handleDeleteCard = handleDeleteCard;
  }

  getCardId() {
    return this._id;
  }

  handleLikeCard(value) {
    this._likes = value.likes;
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
      this.removeCard();
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
    this._deleteBtnremove = this._cardElement.querySelector(
      "element__deletecard_hidden"
    );
    this._setEventListeners();
    this._userLiked();
    this._hasDeleteBtn();

    this._cardsElementImage.src = this._link;
    this._cardsElementImage.alt = this._title;
    this._cardsElementTitle.textContent = this._title;

    console.log(this._ownerId);
    return this._cardElement;
  }
}
