const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];
  


const aboutButton = document.querySelector ('.profile__button');
const addButton = document.querySelector ('.profile__addbutton');
const aboutPopup = document.querySelector ('.popup');
const addPopup = document.querySelector ('.popup__add');
const photoPopup = document.querySelector ('.popup__photo');
const aboutButtonclose = document.querySelector ('.popup__close-button');
const addButtonclose = document.querySelector ('.popup__close-button_add');
const photoButtonclose = document.querySelector ('.popup__close-button_image')
let userName = document.querySelector ('.profile__title');
let userText = document.querySelector ('.profile__text');
let formElement = document.querySelector ('.popup__form');
let nameInput = document.querySelector ('.popup__name_type_about');
let textInput = document.querySelector ('.popup__name_type_text');
const cardTemplate = document.querySelector('.item-template').content.querySelector('.element');
const cardContainer = document.querySelector ('.elements');
let formElementadd = document.querySelector ('.popup__form_add');
let nameInputadd = document.querySelector ('.popup__name_type_add');
let imageInput = document.querySelector ('.popup__name_type_link');
let headerPhoto = document.querySelector ('.popup__header_photo')



function addCard(event) {
    
    event.preventDefault();
    const name = nameInputadd.value;
    const link = imageInput.value;
    const newCard = createCard({ name, link });
    cardContainer.prepend (newCard);
    addPopup.classList.remove('popup_add_opened');
   
};

function createCard (element){
    const card = cardTemplate.cloneNode(true);
   card.querySelector  ('.element__title').textContent = element.name;
   card.querySelector  ('.element__image').src = element.link;
 const deleteButton = card.querySelector ('.element__deletecard')

 const deleteCard = () => {
  card.remove ();
 };
    deleteButton.addEventListener ('click', deleteCard );

    const photoButton = card.querySelector('.element__image');

    photoButton.addEventListener ('click' , (evt) => { 
    
      photoPopup.classList.add('popup__photo_opened');
      const cardTitle = card.querySelector ('.element__title');
      const cardImage = card.querySelector  ('.element__image');
      const img = document.querySelector('.popup__image');
      const imgTitle = document.querySelector('.popup__header_photo');
      imgTitle.textContent = cardTitle.textContent;
      img.src = cardImage.src;
    });
    
    photoButtonclose.addEventListener ('click' , () => {
      photoPopup.classList.remove('popup__photo_opened');
      
    });

    return card;
};

function renderCard (){
    initialCards.forEach(initialCard => {
        const cardHtml = createCard (initialCard);
        cardContainer.append (cardHtml);
     
    });
};



addButton.addEventListener  ('click' , (evt) => { 
    
    addPopup.classList.add('popup_add_opened');
    nameInputadd.value = nameInputadd.textContent;
    
});

addButtonclose.addEventListener  ('click' , () => {
    addPopup.classList.remove('popup_add_opened');
    
});

  aboutButton.addEventListener  ('click' , (evt) => { 
    
     aboutPopup.classList.add('popup_opened');
     nameInput.value = userName.textContent;
     textInput.value = userText.textContent;
 });

 aboutButtonclose.addEventListener  ('click' , () => {
     aboutPopup.classList.remove('popup_opened');
     
 });
 
 function handleFormSubmit (evtm) {
     evtm.preventDefault();
     userName.textContent = nameInput.value;
    userText.textContent = textInput.value;
    aboutPopup.classList.remove('popup_opened');
   
 };

 cardContainer.addEventListener ('click', (evt)=> {
  if (evt.target.classList.contains('element__like')){
    evt.target.classList.toggle('element__like_active')
  }
}) ;

 /* Вызов функций */
 renderCard ()
 formElement.addEventListener('submit', handleFormSubmit);
 formElementadd.addEventListener('submit',addCard);

