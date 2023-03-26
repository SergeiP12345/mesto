import { validatorConfig, connectionConfig } from "../utils/config.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Api } from "../components/Api.js";

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
let profileId;
let userId = "";
//для хранения данных картички
let cardData;

//экземпляр ProfileApi для контроля информации пользователя
const api = new Api(connectionConfig);

//функциии валидации форм:
//валидация редактирования аватара
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
          renderCards.addItem(createCard(item));
          addPopup.close();
        })
        .catch((err) => console.log(err))
        .finally(() => {
          addPopup.changeToOriginalText();
          addCardValidation.resetValidation();
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
          editProfileValidation.resetValidation();
        });
    },
  },
  profilePopup,
  validatorConfig
);

const popupConfirm = new PopupWithForm(
  {
    submitHandler: () => {
      api
        .confirmSubmit(cardData._id)
        .then((response) => {
          cardData._element.removeCard();
          popupConfirm.close();
          return response;
        })
        .catch((err) => console.log(err))
        .finally(() => {
          popupConfirm.changeToOriginalText();
        });
    },
  },
  popupConfident,
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
          editAvatarValidation.resetValidation();
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
      renderCards.addItem(cardElement, true);
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
  textInput.value = getUserInfo.info;

  editPopup.open();
}

function openEditAvatarPopup() {
  editAvatarValidation.resetValidation();

  editAvatarUrl.value = profileAvatar.src;

  popupEditAvatar.open();
}

function handleCardClick(name, link) {
  popupImage.open(name, link);
}

function handleDeleteCard(data) {
  cardData = data;
  popupConfirm.open();
}

function handleLikeCard(card, likeButton) {
  if (likeButton.classList.contains(likeCheckedSelector)) {
    api
      .deleteLike(card._id)
      .then((res) => {
        card.like(false);

        card.setLikesCount(res.likes.length);
      })
      .catch((err) => console.log(err));
  } else {
    api
      .addLike(card._id)
      .then((res) => {
        card.like(true);

        card.setLikesCount(res.likes.length);
      })
      .catch((err) => console.log(err));
  }
}

function createCard(item) {
  return new Card(
    handleCardClick,
    item,
    template,
    userId,
    handleDeleteCard
    /* handleLikeCard */
  ).generateCard();
}

editProfileValidation.enableValidation();
addCardValidation.enableValidation();
editAvatarValidation.enableValidation();

addPopup.setEventListeners();
editPopup.setEventListeners();
popupImage.setEventListeners();
/*  popupConfirm.setEventListeners(); */
popupEditAvatar.setEventListeners();

profileButton.addEventListener("click", openEditProfilePopup);

cardNewButton.addEventListener("click", openAddCardPopup);
//нажатие кнопки редактирования профиля
buttonUpdateAvatar.addEventListener("click", openEditAvatarPopup);

Promise.all([api.getProfileInfo(), api.getInitialCards()])
  .then(([profileInfo, cards]) => {
    userId = profileInfo._id;
    console.log(userId);
    userInfo.setUserInfo({
      name: profileInfo.name,
      info: profileInfo.about,
    });
    console.log(userId);

    userInfo.setUserAvatar({ avatarUrl: profileInfo.avatar });
    renderCards.renderItems(cards);
  })
  .catch((err) => console.log(err));
