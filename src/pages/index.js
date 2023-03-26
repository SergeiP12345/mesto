import { validatorConfig, connectionConfig } from "../utils/config.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Api } from "../components/Api.js";
import { PopupConfirmation } from "../components/PopupConfirm.js";

import "./index.css";

const profileAvatar = document.querySelector(".profile__avatar");
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
const editAvatarUrl = document.querySelector(".popup__name_type_link");
const popupUpdateAvatar = document.querySelector(".popup_avatar");
const buttonUpdateAvatar = document.querySelector(".profile__cover");
const popupConfident = document.querySelector(".popup_confident");
const formElementAvatar = document.querySelector(".popup__form_avatar");

let userId = "";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-60",
  headers: {
    authorization: "014483e6-50f6-4a65-91e7-a3fda779d527",
    "Content-Type": "application/json",
  },
});

const editAvatarValidation = new FormValidator(
  validatorConfig,
  formElementAvatar
);

const editProfileValidation = new FormValidator(validatorConfig, formProfile);

const addCardValidation = new FormValidator(validatorConfig, formElementAdd);

const addPopup = new PopupWithForm(
  {
    submitHandler: (data) => {
      api
        .postNewCard(data.name, data.link)
        .then((item) => {
          renderCards.addItemPrepend(createCard(item));
          addPopup.close();
        })
        .catch((err) => console.log(err))
        .finally(() => {
          addPopup.changeToOriginalText();
        });
    },
  },

  cardNewpopup,
  validatorConfig
);

const editPopup = new PopupWithForm(
  {
    submitHandler: (formData) => {
      api
        .editProfileInfo(formData.name, formData.about)
        .then((res) => {
          userInfo.setUserInfo({
            name: res.name,
            info: res.about,
          });
          editPopup.close();
        })
        .catch((err) => console.log(err))
        .finally(() => {
          editPopup.changeToOriginalText();
        });
    },
  },

  profilePopup,
  validatorConfig
);

const popupEditAvatar = new PopupWithForm(
  {
    submitHandler: (data) => {
      popupEditAvatar;
      api
        .editProfileAvatar(data.avatar)
        .then((response) => {
          profileAvatar.src = response.avatar;
          popupEditAvatar.close();
        })
        .catch((err) => console.log(err))
        .finally(() => {
          popupEditAvatar.changeToOriginalText();
        });
    },
  },

  popupUpdateAvatar,
  validatorConfig
);

const popupImage = new PopupWithImage(photoPopup);

const userInfo = new UserInfo(
  {
    nameSelector: userName,
    infoSelector: userText,
    avatarElement: profileAvatar,
  },
  api
);

const renderCards = new Section(
  {
    renderer: (item) => {
      const cardElement = createCard(item);
      renderCards.addItemAppend(cardElement, true);
    },
  },
  cardContainer
);

function openAddCardPopup() {
  addCardValidation.resetValidation();
  addPopup.open();
}

function openEditProfilePopup() {
  editProfileValidation.resetValidation();

  const getUserInfo = userInfo.getUserInfo();

  nameInput.value = getUserInfo.name;
  textInput.value = getUserInfo.about;

  editPopup.open();
}

function openEditAvatarPopup() {
  editAvatarValidation.resetValidation();

  editAvatarUrl.value = profileAvatar.src;

  popupEditAvatar.open();
}

const popupConfirmation = new PopupConfirmation(popupConfident);

function createCard(item) {
  const card = new Card(template, {
    data: item,
    userId: userId,
    handleRemoveButtonClick: () => {
      popupConfirmation.open(card);
      popupConfirmation.setSubmitCallback(() => {
        api
          .deleteCard(card.getCardId())
          .then(() => {
            popupConfirmation.close();
            card.removeCard();
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      });
    },
    handleCardClick: (name, link) => {
      popupImage.open(name, link);
    },
    handleLikeButtonClick: () => {
      if (!card.isLike()) {
        api
          .addLike(card.getCardId())
          .then((res) => {
            card.handleLikeCard(res.likes.length);
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      } else {
        api
          .deleteLike(card.getCardId())
          .then((res) => {
            card.handleLikeCard(res.likes.length);
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      }
    },
  });
  return card.generateCard();
}

editProfileValidation.enableValidation();
addCardValidation.enableValidation();
editAvatarValidation.enableValidation();

addPopup.setEventListeners();
editPopup.setEventListeners();
popupImage.setEventListeners();
popupConfirmation.setEventListeners();
popupEditAvatar.setEventListeners();

profileButton.addEventListener("click", openEditProfilePopup);

cardNewButton.addEventListener("click", openAddCardPopup);
//нажатие кнопки редактирования профиля
buttonUpdateAvatar.addEventListener("click", openEditAvatarPopup);

Promise.all([api.getProfileInfo(), api.getInitialCards()])
  .then(([profileInfo, cards]) => {
    userId = profileInfo._id;

    userInfo.setUserInfo({
      name: profileInfo.name,
      info: profileInfo.about,
    });

    userInfo.setUserAvatar({ avatarUrl: profileInfo.avatar });
    renderCards.renderItems(cards);
  })
  .catch((err) => console.log(err));
