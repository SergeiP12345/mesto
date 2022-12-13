const aboutButton = document.querySelector ('.profile__button');
const aboutPopup = document.querySelector ('.popup');
const aboutButtonclose = document.querySelector ('.popup__close-button');
let UserName = document.querySelector ('.profile__title');
let UserText = document.querySelector ('.profile__text');
let formElement = document.querySelector ('.popup__form');
let NameInput = document.querySelector ('.popup__name');
let textInput = document.querySelector ('.popup__text');
let popupSumbit = document.querySelector ('.popup__save-button');



  aboutButton.addEventListener  ('click' , (evt) => { 
    evt.preventDefault ();
     aboutPopup.classList.add('popup_opened');
     NameInput.value = UserName.textContent;
     textInput.value = UserText.textContent;
 });

 aboutButtonclose.addEventListener  ('click' , () => {
     aboutPopup.classList.remove('popup_opened');
     
 })
 
 function handleFormSubmit (evtm) {
     evtm.preventDefault();
     UserName.textContent = NameInput.value;
    UserText.textContent = textInput.value;
    aboutPopup.classList.remove('popup_opened');
   
 }
 
 formElement.addEventListener('submit', handleFormSubmit);
