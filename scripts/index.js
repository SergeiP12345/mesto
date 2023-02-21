import { Card } from "./card.js";
import { FormValidator } from "./validate.js";
import { validatorConfig } from "./config.js";

const headerPhoto = document.querySelector(".popup__header_photo");
const imgPopup = document.querySelector(".popup__image");
const photoPopup = document.querySelector(".popup_photo");
const profileButton = document.querySelector(".profile__button");
const cardNewButton = document.querySelector(".profile__addbutton");
const profilePopup = document.querySelector(".popup_profile");
const cardNewpopup = document.querySelector(".popup_add");

const userName = document.querySelector(".profile__title");
const userText = document.querySelector(".profile__text");
const formProfile = document.querySelector(".popup__form_profile");
const nameInput = document.querySelector(".popup__name_type_about");
const textInput = document.querySelector(".popup__name_type_text");
const itemTemplate = document
  .querySelector(".item-template")
  .content.querySelector(".element");
const cardContainer = document.querySelector(".elements");
const formElementAdd = document.querySelector(".popup__form_add");
const nameInputAdd = document.querySelector(".popup__name_type_add");
const imageInput = document.querySelector(".popup__name_type_link");
const buttonCloseList = document.querySelectorAll(".popup__close-button");
const popups = Array.from(document.querySelectorAll(".popup"));

const editProfileValidatior = new FormValidator(validatorConfig, profilePopup);
const addCardValidator = new FormValidator(validatorConfig, cardNewpopup);

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
  document.addEventListener("keyup", handleEscUp);
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  document.removeEventListener("keyup", handleEscUp);
  popup.classList.remove("popup_opened");
}

function addCard(event) {
  event.preventDefault();
  const name = nameInputAdd.value;
  const link = imageInput.value;
  const newCard = createCard({ name, link });
  cardContainer.prepend(newCard);
  closePopup(cardNewpopup);
  nameInputAdd.value = "";
  imageInput.value = "";
  addCardValidator.resetValidation();
}

(function renderCards() {
  cardContainer.append(...initialCards.map(createCard));
})();

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

const handleEscUp = (evt) => {
  if (evt.key === "Escape") {
    const activePopup = document.querySelector(".popup_opened");
    closePopup(activePopup);
  }
};

popups.forEach((popup) => {
  popup.addEventListener("click", closePopupOnOverlay);
});

function closePopupOnOverlay(evt) {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
}

function createCard(item) {
  return new Card(item, itemTemplate, handleCardClick).generateCard();
}

function handleCardClick(name, link) {
  imgPopup.src = link;
  imgPopup.alt = name;
  headerPhoto.textContent = name;
  openPopup(photoPopup);
}

/* Вызов функций */

formProfile.addEventListener("submit", saveFormProfileSubmit);
formElementAdd.addEventListener("submit", addCard);
profileButton.addEventListener("click", openPopupProfile);
buttonCloseList.forEach((btn) => {
  const popup = btn.closest(".popup");
  btn.addEventListener("click", () => closePopup(popup));
});

cardNewButton.addEventListener("click", () => openPopup(cardNewpopup));
editProfileValidatior.enableValidation();
addCardValidator.enableValidation();
