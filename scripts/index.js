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
const formElement = document.querySelector(".popup__form");
const inputElement = document.querySelector(".popup__name");
const saveButton = document.querySelector(".popup__save-button");

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
  document.addEventListener("keydown", handleEscUp);
  document.addEventListener("click", closePopupOnOverlay);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscUp);
  document.removeEventListener("click", closePopupOnOverlay);
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
  imgtemplate.alt = templateTitle.textContent;
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
    imgPopup.alt = element.name;
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

const handleEscUp = (evt) => {
  const activePopup = document.querySelector(".popup_opened");
  if (evt.key === "Escape") {
    closePopup(activePopup);
  }
};

function closePopupOnOverlay(evt) {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
}

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hideInputError = () => {
  saveButton.classList.remove("popup__save-button_disabled");
};

const showInputError = () => {
  saveButton.classList.add("popup__save-button_disabled");
};
function toggleButtonState(inputList, saveButton) {
  if (hasInvalidInput(inputList)) {
    saveButton.classList.add("popup__save-button_disabled");
    saveButton.setAttribute("disabled", "disabled");
  } else {
    saveButton.classList.remove("popup__save-button_disabled");
    saveButton.removeAttribute("disabled", "disabled");
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__name"));
  const saveButton = formElement.querySelector(".popup__save-button");
  toggleButtonState(inputList, saveButton);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);

      toggleButtonState(inputList, saveButton);
    });
  });
  console.log(inputList);
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {});
    setEventListeners(formElement);
  });
};

/* Вызов функций */
enableValidation();
renderCard();

formElementprofile.addEventListener("submit", saveFormProfileSubmit);
formElementadd.addEventListener("submit", addCard);
profileButton.addEventListener("click", openPopupProfile);
buttonCloseList.forEach((btn) => {
  const popup = btn.closest(".popup");
  btn.addEventListener("click", () => closePopup(popup));
});

cardNewButton.addEventListener("click", () => openPopup(cardNewpopup));
