let popupOpen = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupClose = document.querySelector('.popup__button-exit');
let Autorname = document.querySelector('.popup__input_data_name');
let Autorjob = document.querySelector('.popup__input_data_job');
let popupForm = document.querySelector('.popup__form');
let profilename = document.querySelector('.profile__name');
let profilejob = document.querySelector('.profile__job');

function open() {
  popup.classList.add('popup_opened');
  Autorname.value = profilename.textContent;
  Autorjob.value = profilejob.textContent;
}

function close() {
  popup.classList.remove('popup_opened');
}

function submit(evt) {
  evt.preventDefault();
  profilename.textContent = Autorname.value;
  profilejob.textContent = Autorjob.value;
  close();
}

if (popup.classList.contains('popup_opened') === false) {
  popupOpen.addEventListener('click', open);
}

popupClose.addEventListener('click', close);

popupForm.addEventListener('submit', submit);
