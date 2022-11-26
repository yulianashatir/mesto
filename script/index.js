const popupOpen = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__button-exit');
const autorName = document.querySelector('.popup__input_data_name');
const autorJob = document.querySelector('.popup__input_data_job');
const popupForm = document.querySelector('.popup__form');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

function open() {
  popup.classList.add('popup_opened');
  autorName.value = profileTitle.textContent;
  autorJob.value = profileSubtitle.textContent;
}

function close() {
  popup.classList.remove('popup_opened');
}

function submit(evt) {
  evt.preventDefault();
  profileTitle.textContent = autorName.value;
  profileSubtitle.textContent = autorJob.value;
  close();
}

popupOpen.addEventListener('click', open);

popupClose.addEventListener('click', close);

popupForm.addEventListener('submit', submit);
