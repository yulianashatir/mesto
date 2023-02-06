const popupImageElement = document.querySelector('.popup_type_image');
const popupFigcaptionElement = popupImageElement.querySelector('.popup__figcaption');
const popupImgElm = popupImageElement.querySelector('.popup__image');

import {openPopup} from './index.js';

export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

 
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector) 
      .content
      .querySelector('.element')   
      .cloneNode(true);

    return cardElement;
  }

  
  generateCard() {
    this._cardElement = this._getTemplate();
    this._elementDeleteButton = this._cardElement.querySelector('.element__delete-button');
    this._cardElementTitle = this._cardElement.querySelector('.element__title');
    this._cardElementImage = this._cardElement.querySelector('.element__image');

    this._cardElementTitle.textContent = this._name;
    this._cardElementImage.src = this._link;
    this._cardElementImage.alt = `${this._name}. Фотография`;

    this._likeButton = this._cardElement.querySelector('.element__like-button');

    this._setEventListeners();

    return this._cardElement;
  }

 
  _setEventListeners() {
    
    this._cardElementImage.addEventListener('click', () => {
      this._addDataToPopupImg(this._name, this._link);
      openPopup(popupImageElement);
    });
   
    this._likeButton.addEventListener('click', () => {
      this._handleLikeButton();
    });

    this._elementDeleteButton.addEventListener('click', evt => {
      this._handlerDeleteButton();
    });
   
  }

  _handlerDeleteButton () {
   
      this._cardElement.remove();
      this._cardElement = null;
    
  }

  _handleLikeButton() {
    this._likeButton.classList.toggle('element__like-button_active');
  }

 
  _addDataToPopupImg = (name, link) => {
    popupFigcaptionElement.textContent = name;
    popupImgElm.src = link;
    popupImgElm.alt = `${name}. Фотография`;
  }
}
