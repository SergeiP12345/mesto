export class Card {
  constructor(
    template,
    {data,
    userId,
    handleRemoveButtonClick,
    handleCardClick,
    handleLikeButtonClick}
  ) {
    this._data = data;
    this._title = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._templateContainer = template;
    this._handleCardClick = handleCardClick;
    this._handleLikeButtonClick = handleLikeButtonClick;
    this._handleRemoveButtonClick = handleRemoveButtonClick;
  }

  getCardId() {
    return this._id;
  }

  //прячем корзину, если чужая карточка
  hiddenDeleteBtn() {
    this._isMy = this._ownerId === this._userId;
    if (!this._isMy) {
      this._deleteBtn.classList.toggle("element__deletecard_hidden");
    }
  }

  //проверяем наличие лайка для обращения к серверу
  isLike() {
    return this._likeButton.classList.contains("element__like_active");
  }
  
  _getTemplateElement() {
    return document
      .querySelector("#template")
      .content.querySelector(".element")
      .cloneNode(true);
  }
  
  handleLikeCard(count) {
    this._likes = this._data.likes;
    this._countLikeElement.textContent = count;
    this._likeButton.classList.toggle("element__like_active");
  }
//показываем активный лайк
  userLiked() {
    this._likes.forEach((elem) => {
      if (elem._id === this._userId) {
        this._likeButton.classList.add("element__like_active");
      } });
  }
  removeCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _setEventListeners() {
    this._deleteBtn.addEventListener("click", () => {this._handleRemoveButtonClick(this._cardElement)});
    this._likeButton.addEventListener("click", () => {this._handleLikeButtonClick()});
    this._cardsElementImage.addEventListener("click", () => {this._handleCardClick(this._title, this._link)});
  }

  generateCard() {
    this._cardElement = this._getTemplateElement();
    this._deleteBtn = this._cardElement.querySelector(".element__deletecard");
    this._cardsElementImage = this._cardElement.querySelector(".element__image");
    this._cardsElementTitle = this._cardElement.querySelector(".element__title");
    this._likeButton = this._cardElement.querySelector(".element__like");
    this._countLikeElement = this._cardElement.querySelector(".element__like-number");
    this._countLikeElement.textContent = this._likes.length;
    this._setEventListeners();
    this.userLiked();
    this.hiddenDeleteBtn();

    this._cardsElementImage.src = this._link;
    this._cardsElementImage.alt = this._title;
    this._cardsElementTitle.textContent = this._title;

    return this._cardElement;
  }
}
