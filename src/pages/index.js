import { Card } from "../scripts/card.js";
import { FormValidator } from "../scripts/validate.js";
import { validatorConfig, initialCards } from "../scripts/config.js";
import { Section } from "../scripts/Section.js";
import { UserInfo } from "../scripts/UserInfo.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
// index.js

import "./index.css";

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

const cardContainer = document.querySelector(".elements");
const formElementAdd = document.querySelector(".popup__form_add");
const nameInputAdd = document.querySelector(".popup__name_type_add");
const imageInput = document.querySelector(".popup__name_type_link");

const editProfileValidatior = new FormValidator(validatorConfig, formProfile);
const addCardValidator = new FormValidator(validatorConfig, formElementAdd);

const addPopup = new PopupWithForm(
  {
    submitHandler: () => {
      renderCards.addItem(
        createCard({ name: nameInputAdd.value, link: imageInput.value }),
        false
      );
      addPopup.close();
      addCardValidator.resetValidation();
    },
  },
  cardNewpopup,
  validatorConfig.inputSelector,
  validatorConfig.formSelector
);

const editPopup = new PopupWithForm(
  {
    submitHandler: (formData) => {
      userInfo.setUserInfo({
        name: nameInput.value,

        info: textInput.value,
      });
      editPopup.close();
      editProfileValidatior.resetValidation();
    },
  },
  profilePopup,
  validatorConfig.inputSelector,
  validatorConfig.formSelector
);

const popupWithImage = new PopupWithImage(photoPopup, headerPhoto, imgPopup);

const userInfo = new UserInfo({
  nameSelector: userName,
  infoSelector: userText,
});
function openAddCardPopup() {
  addPopup.open();
}

function openEditProfilePopup() {
  const getUserInfo = userInfo.getUserInfo();
  nameInput.value = getUserInfo.name;
  textInput.value = getUserInfo.info;
  editPopup.open();
}
const renderCards = new Section(
  {
    renderer: (item) => {
      const cardElement = createCard(item);
      renderCards.addItem(cardElement, true);
    },
  },
  cardContainer
);

function handleCardClick(name, link, headerPhoto) {
  popupWithImage.open(name, link, headerPhoto);
}

function createCard(item) {
  return new Card(item, "#template", handleCardClick).generateCard();
}

editProfileValidatior.enableValidation();
addCardValidator.enableValidation();

profileButton.addEventListener("click", openEditProfilePopup);
cardNewButton.addEventListener("click", openAddCardPopup);
renderCards.renderItems(initialCards);
