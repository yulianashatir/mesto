const popupEditBtnElement = document.querySelector('.profile__edit-button'); 
const popupAddBtnElement = document.querySelector('.profile__add-button'); 
//Popup 1
const popupEditProfile = document.querySelector('.popup_type_profile'); 

const popupBtnExitElement = popupEditProfile.querySelector('.popup__button-exit'); 
const popupBtnElement = popupEditProfile.querySelector('.popup__button');
const popupProfileForm = popupEditProfile.querySelector('.popup__input-list');
const popupNameElement = popupEditProfile.querySelector('#name-input');
const popupJobElement = popupEditProfile.querySelector('#job-input');

const profileElement = document.querySelector('.profile');
const profileNameElement = profileElement.querySelector('.profile__title');
const profileJobElement = profileElement.querySelector('.profile__subtitle');
//Popup 2
const popupAddCard = document.querySelector('.popup_type_elements'); 
const popupElementsBtnExitElement = popupAddCard.querySelector('.popup__button-exit');
const popupElementsBtnElement =popupAddCard.querySelector('.popup__button');
const popupElementsForm = popupAddCard.querySelector('.popup__input-list');
const popupPlaceElement = popupAddCard.querySelector('#place-input');
const popupLinkElement = popupAddCard.querySelector('#url-input');
//Popup 3
const popupImageElement = document.querySelector('.popup_type_image');
const popupImgBtnExitElement = popupImageElement.querySelector('.popup__button-exit');
const popupFigcaptionElement = popupImageElement.querySelector('.popup__figcaption');
const popupImgElm = popupImageElement.querySelector('.popup__image');
const itemTemplate = document.querySelector('#template');
const listElement = document.querySelector('.elements__list');


const formSelectors = {
    inputFieldSelector: '.popup__field',
    inputSelector: '.popup__input',
    inputErrorSelector: '.popup__input-error',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active',
    inactiveButtonClass: 'popup__button-inactive',
    buttonElement: '.popup__button'
  };
 
 const openPopup = item => {
    item.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupWithEscBtn);
  };
  
  export {openPopup};

  const closePopup = item => {
    item.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupWithEscBtn);
  };
  
  const closePopupWithEscBtn = evt => {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened');
      closePopup(openedPopup);
    };
  };
  
  const closePopupWithClick = evt => {
    const openedPopup = document.querySelector('.popup_opened');
    const closeBtnElement = openedPopup.querySelector('.popup__button-exit');
    if (evt.target.contains(closeBtnElement)) {
      closePopup(openedPopup);
    };
  };
  
  const changeProfileData = evt => {
    evt.preventDefault();
    profileNameElement.textContent = popupNameElement.value;
    profileJobElement.textContent = popupJobElement.value;
    closePopup(popupEditProfile);
  };
  
  import {initialElements} from "./initialElements.js";
  
  import Card from "./Card.js";
  
  
  const createCard = (name, link) => {
    const card = new Card({name, link}, '#template');
    const generatedCard = card.generateCard();
    return generatedCard;
  };
  
  
  const renderCard = (name, link) => {
    listElement.prepend(createCard(name, link));
  };
  
  
  const addNewCard = evt => {
    evt.preventDefault();
    renderCard(popupPlaceElement.value, popupLinkElement.value);
    closePopup(popupAddCard);
    popupElementsForm.reset(); 
  };
  
  
  initialElements.reverse().forEach(item => renderCard(item.name, item.link));
  
  
  popupEditBtnElement.addEventListener('click', () => {
    popupNameElement.value = profileNameElement.textContent;
    popupJobElement.value = profileJobElement.textContent;
    openPopup(popupEditProfile);
  });
  
  
  popupEditProfile.addEventListener('click', closePopupWithClick);
  
  popupProfileForm.addEventListener('submit', changeProfileData);
  
  popupAddBtnElement.addEventListener('click', () => {
    newCardValidation.toggleButtonState();
    openPopup(popupAddCard);
  });
  
  popupAddCard.addEventListener('click', closePopupWithClick);
  
  popupElementsForm.addEventListener('submit', addNewCard);
  
  popupImageElement.addEventListener('click', closePopupWithClick);
  
  import FormValidator from "./FormValidator.js";
  
  const profileValidation = new FormValidator(formSelectors, popupEditProfile);
  const newCardValidation = new FormValidator(formSelectors, popupAddCard);
  profileValidation.enableValidation();
  newCardValidation.enableValidation();

