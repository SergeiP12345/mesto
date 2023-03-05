import { validatorConfig, initialCards } from "../components/config.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";

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

const popupAddCard = new PopupWithForm(
  {
    submitHandler: () => {
      cardsList.addItem(
        createCard({ name: nameInputAdd.value, link: imageInput.value }),
        false
      );
      popupAddCard.close();
      addCardValidator.resetValidation();
    },
  },
  cardNewpopup,
  validatorConfig.inputSelector,
  validatorConfig.formSelector
);
popupAddCard.setEventListeners();

const popupEditProfile = new PopupWithForm(
  {
    submitHandler: () => {
      userInfo.setUserInfo({
        name: nameInput.value,

        info: textInput.value,
      });
      popupEditProfile.close();
      editProfileValidatior.resetValidation();
    },
  },
  profilePopup,
  validatorConfig.inputSelector,
  validatorConfig.formSelector
);
popupEditProfile.setEventListeners();

const popupWithImage = new PopupWithImage(photoPopup, headerPhoto, imgPopup);

const userInfo = new UserInfo({
  nameElement: userName,
  infoElement: userText,
});
function openAddCardPopup() {
  popupAddCard.open();
}

function openEditProfilePopup() {
  const getUserInfo = userInfo.getUserInfo();
  nameInput.value = getUserInfo.name;
  textInput.value = getUserInfo.info;
  popupEditProfile.open();
}
const cardsList = new Section(
  {
    renderer: (item) => {
      const cardElement = createCard(item);
      cardsList.addItem(cardElement, true);
    },
  },
  cardContainer
);

function handleCardClick(name, link, headerPhoto) {
  popupWithImage.open(name, link, headerPhoto);
}
popupWithImage.setEventListeners();

function createCard(item) {
  return new Card(item, "#template", handleCardClick).generateCard();
}

editProfileValidatior.enableValidation();
addCardValidator.enableValidation();

profileButton.addEventListener("click", openEditProfilePopup);
cardNewButton.addEventListener("click", openAddCardPopup);
cardsList.renderItems(initialCards);
