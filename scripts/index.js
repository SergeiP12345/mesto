const headerPhoto = document.querySelector(".popup__header_photo");
const imgPopup = document.querySelector(".popup__image");
const photoPopup = document.querySelector(".popup_photo");
const profileButton = document.querySelector(".profile__button");
const cardNewButton = document.querySelector(".profile__addbutton");
const profilePopup = document.querySelector(".popup_profile");
const cardNewpopup = document.querySelector(".popup_add");
const popupWindow = document.querySelector(".popup");
const userName = document.querySelector(".profile__title");
const userText = document.querySelector(".profile__text");
const formElementprofile = document.querySelector(".popup__form_profile");
const nameInput = document.querySelector(".popup__name_type_about");
const textInput = document.querySelector(".popup__name_type_text");
const cardTemplate = document
  .querySelector(".item-template")
  .content.querySelector(".element");
const cardContainer = document.querySelector(".elements");
const formElementadd = document.querySelector(".popup__form_add");
const nameInputadd = document.querySelector(".popup__name_type_add");
const imageInput = document.querySelector(".popup__name_type_link");
const buttonCloseList = document.querySelectorAll(".popup__close-button");
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function addCard(event) {
  event.preventDefault();
  const name = nameInputadd.value;
  const link = imageInput.value;
  const newCard = createCard({ name, link });
  cardContainer.prepend(newCard);
  closePopup(event);
  nameInputadd.value = "";
  imageInput.value = "";
}

function createCard(element) {
  const card = cardTemplate.cloneNode(true);
  const templateTitle = card.querySelector(".element__title");
  templateTitle.textContent = element.name;
  const imgtemplate = card.querySelector(".element__image");
  imgtemplate.src = element.link;

  imgPopup.alt = templateTitle.textContent;

  const deleteButton = card.querySelector(".element__deletecard");

  const deleteCard = () => {
    card.remove();
  };
  deleteButton.addEventListener("click", deleteCard);

  const handleLikeButton = card.querySelector(".element__like");
  handleLikeButton.addEventListener("click", (evt) => {
    evt.target.classList.toggle("element__like_active");
  });
  function openImagepopup(evt) {
    openPopup(photoPopup);
    headerPhoto.textContent = element.name;
    imgPopup.src = element.link;
    imgtemplate.alt = templateTitle.textContent;
  }
  imgtemplate.addEventListener("click", () => openImagepopup());

  return card;
}

function renderCard() {
  initialCards.forEach((initialCard) => {
    const cardHtml = createCard(initialCard);
    cardContainer.append(cardHtml);
  });
}

function openPopupProfile() {
  nameInput.value = userName.textContent;
  textInput.value = userText.textContent;
  openPopup(profilePopup);
}

function saveFormProfileSubmit(evtm) {
  evtm.preventDefault();
  userName.textContent = nameInput.value;
  userText.textContent = textInput.value;
  closePopup(profilePopup);
}

/* Вызов функций */
renderCard();
formElementprofile.addEventListener("submit", saveFormProfileSubmit);
formElementadd.addEventListener("submit", addCard);
profileButton.addEventListener("click", openPopupProfile);
buttonCloseList.forEach((btn) => {
  const popup = btn.closest(".popup");
  btn.addEventListener("click", () => closePopup(popup));
});

cardNewButton.addEventListener("click", () => openPopup(cardNewpopup));
