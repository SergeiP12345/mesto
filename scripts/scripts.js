const aboutButton = document.querySelector ('.profile__button');
const aboutPopup = document.querySelector ('.popup');
const aboutButtonclose = document.querySelector ('.popup__close-button');
let UserName = document.querySelector ('.profile__title');
let UserText = document.querySelector ('.profile__text');
let formElement = document.querySelector ('.popup__form');
let NameInput = document.querySelector ('.popup__name');
let textInput = document.querySelector ('.popup__text');
let popupSumbit = document.querySelector ('.popup__save-button');

function openPopup () {
    aboutPopup.classList.add ('popup_opened');
    NameInput.value = UserName.textContent;
    textInput.value = UserText.textContent;
  }
  
  function closePopup ()  {
    aboutPopup.classList.remove ('popup_opened');
  }

  function formSubmitHandler (evt) {
    evt.preventDefault();
    UserName.textContent = NameInput.value;
    UserText.textContent = textInput.value;
    closePopup ();
}
  
  aboutButton.addEventListener ('click', openPopup);
  aboutButtonclose.addEventListener ('click', closePopup);
  formElement.addEventListener('submit', formSubmitHandler);
