const initialElements = [ 
    {
      name: 'Завтрак',
      link: './image/alice-pasqual-M6ZYi6AH2-s-unsplash.jpg'
    },
    {
      name: 'Ланч',
      link: './image/bakd-raw-by-karolin-baitinger-eYuOHOq2tQE-unsplash.jpg'
    },
    {
      name: 'Обед',
      link: './image/ali-choubin-I0B_QnY2VOQ-unsplash.jpg'
    },
    {
      name: 'Полдник',
      link: './image/paras-kapoor-p0NGpQt-Mmw-unsplash.jpg'
    },
    {
      name: 'Ужин',
      link: './image/shayna-douglas-BOm2WQbfNe4-unsplash.jpg'
    },
    {
      name: 'Коктель',
      link: './image/kim-ick-yyoNYCmTVbw-unsplash.jpg'
    }
    ];

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

const toggleLikeBtn = event => {
  event.target.classList.toggle('element__like-button_active');
};

const removeElement = event => {
  event.target.closest('.element').remove();
};

const openPopup = item => {
  item.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupWithEscBtn);
};


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

function closePopupWithClick (evt) {
 if (evt.target.classList.contains('popup_opened')) {
  closePopup(evt.target);
 };
}

popupImgBtnExitElement.addEventListener('click', () => {
    closePopup(popupImageElement)
  }); 

popupBtnExitElement.addEventListener('click', () => {
    closePopup(popupEditProfile)
  }); 
  
  popupElementsBtnExitElement.addEventListener('click', () => {
    closePopup(popupAddCard);
  }); 

const addDataToPopupImg = ({name, link}) => {
    popupFigcaptionElement.textContent = name;
    popupImgElm.src = link;
    popupImgElm.alt = `${name}. Фотография`;
  };
  
const changeProfileData = evt => {
    evt.preventDefault();
    profileNameElement.textContent = popupNameElement.value;
    profileJobElement.textContent = popupJobElement.value;
    closePopup(popupEditProfile);
  };

const createElement = ({name, link}) => {
  const itemElement = itemTemplate.content.cloneNode(true);
  const elementImgElm = itemElement.querySelector('.element__image');
  
  itemElement.querySelector('.element__title').textContent = name ;
  elementImgElm.src = link;
  elementImgElm.alt = `${name}. Фотография`;
  elementImgElm.addEventListener('click', function() {
    addDataToPopupImg({name, link});
    openPopup(popupImageElement);

});
  
itemElement.querySelector('.element__like-button').addEventListener('click',toggleLikeBtn);

itemElement.querySelector('.element__delete-button').addEventListener('click',removeElement);

  return itemElement;
};


const renderElement = (name, link) => {
  listElement.prepend(createElement({name, link}));
};

const addNewElement = evt => {
  evt.preventDefault();
  renderElement(popupPlaceElement.value, popupLinkElement.value);
  closePopup(popupAddCard);
  popupElementsForm.reset();
};

initialElements.reverse().forEach(item => {
  renderElement(item.name, item.link);
});

popupEditBtnElement.addEventListener('click', () => {
  popupNameElement.value = profileNameElement.textContent;
  popupJobElement.value = profileJobElement.textContent;
  openPopup(popupEditProfile);
});
popupProfileForm.addEventListener('submit', changeProfileData);

popupAddBtnElement.addEventListener('click', () => openPopup(popupAddCard));

popupElementsForm.addEventListener('submit', addNewElement);

popupEditProfile.addEventListener ('click', closePopupWithClick);

popupAddCard.addEventListener ('click', closePopupWithClick);

popupImageElement.addEventListener ('click', closePopupWithClick);