const aboutButton = document.querySelector ('.profile__button');
const aboutPopup = document.querySelector ('.popup');
const aboutButtonclose = document.querySelector ('.popup__close-button');
let userName = document.querySelector ('.profile__title');
let userText = document.querySelector ('.profile__text');
let formElement = document.querySelector ('.popup__form');
let nameInput = document.querySelector ('.popup__name');
let textInput = document.querySelector ('.popup__name_text');




  aboutButton.addEventListener  ('click' , (evt) => { 
    
     aboutPopup.classList.add('popup_opened');
     nameInput.value = userName.textContent;
     textInput.value = userText.textContent;
 });

 aboutButtonclose.addEventListener  ('click' , () => {
     aboutPopup.classList.remove('popup_opened');
     
 })
 
 function handleFormSubmit (evtm) {
     evtm.preventDefault();
     userName.textContent = nameInput.value;
    userText.textContent = textInput.value;
    aboutPopup.classList.remove('popup_opened');
   
 }
 
 formElement.addEventListener('submit', handleFormSubmit);
