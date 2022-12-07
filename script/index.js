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


const editBtnElement = document.querySelector('.profile__edit-button'); 
const addBtnElement = document.querySelector('.profile__add-button'); 

const popupProfileElement = document.querySelector('.popup_type_profile'); 

const popupBtnExitElement = popupProfileElement.querySelector('.popup__button-exit'); 
const popupBtnElement = popupProfileElement.querySelector('.popup__button');
const popupProfileForm = popupProfileElement.querySelector('.popup__input-list');
const popupNameElement = popupProfileElement.querySelector('.popup__input_data_name');
const popupJobElement = popupProfileElement.querySelector('.popup__input_data_job');

const profileElement = document.querySelector('.profile');
const autorNameElement = profileElement.querySelector('.profile__title');
const autorJobElement = profileElement.querySelector('.profile__subtitle');

const popupElementsElement = document.querySelector('.popup_type_elements'); 

const popupElementsBtnExitElement = popupElementsElement.querySelector('.popup__button-exit');
const popupElementsBtnElement = popupElementsElement.querySelector('.popup__button');
const popupElementsForm = popupElementsElement.querySelector('.popup__input-list');
const popupPlaceElement = popupElementsElement.querySelector('.popup__input_place_name');
const popupLinkElement = popupElementsElement.querySelector('.popup__input_place_link');


const popupImageElement = document.querySelector('.popup_type_image');
const popupImgBtnExitElement = popupImageElement.querySelector('.popup__button-exit');
const popupFigcaptionElement = popupImageElement.querySelector('.popup__figcaption');


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
};

const closePopup = item => {
  item.classList.remove('popup_opened');
};

const createElement = (item) => {
 
  const itemElement = itemTemplate.content.cloneNode(true);
 
  const elementImgElm = itemElement.querySelector('.element__image');
  const popupImgElm = popupImageElement.querySelector('.popup__image');
 
  itemElement.querySelector('.element__title').textContent = item['name'];
  elementImgElm.src = item['link'];
  elementImgElm.alt = `${item['name']}. Фотография`;
 
  elementImgElm.addEventListener('click', function() {
    popupFigcaptionElement.textContent = item['name'];
    popupImgElm.src = item['link'];
    popupImgElm.alt = `${item['name']}. Фотография`;
    openPopup(popupImageElement);
  });
  
  itemElement.querySelector('.element__like-button').addEventListener('click', event => {toggleLikeBtn(event)});
 
  itemElement.querySelector('.element__delete-button').addEventListener('click', event => {removeElement(event)});

  return itemElement;
};


const renderElement = (name, link) => {
  listElement.prepend(createElement({name, link}));
};

const addNewElement = evt => {
  evt.preventDefault();
  renderElement(popupPlaceElement.value, popupLinkElement.value);
  closePopup(popupElementsElement);
  popupPlaceElement.value = ''; 
  popupLinkElement.value = '';
};

initialElements.reverse().forEach(item => {
  renderElement(item.name, item.link);
});

editBtnElement.addEventListener('click', () => {
  openPopup(popupProfileElement);
  autorNameElement.value = autorNameElement.textContent;
  autorJobElement.value = autorJobElement.textContent;
}); 
popupBtnExitElement.addEventListener('click', () => {closePopup(popupProfileElement)}); 
popupProfileForm.addEventListener('submit', evt => {
  evt.preventDefault();
  autorNameElement.textContent = popupNameElement.value;
  autorJobElement.textContent = popupJobElement.value;
  closePopup(popupProfileElement);
}); 

addBtnElement.addEventListener('click', () => {openPopup(popupElementsElement);}); 
popupElementsBtnExitElement.addEventListener('click', () => {closePopup(popupElementsElement);}); 

popupElementsForm.addEventListener('submit', evt => {addNewElement(evt);}); 
popupImgBtnExitElement.addEventListener('click', () => {closePopup(popupImageElement)});
