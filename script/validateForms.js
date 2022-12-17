
const popupFormList = document.querySelectorAll('.popup__input-list');

const showInputError = (inputElement, errorMessage) => {
  const errorElement = inputElement.closest('.popup__field').querySelector('.popup__input-error');
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
};

const hideInputError = inputElement => {
  const errorElement = inputElement.closest('.popup__field').querySelector('.popup__input-error');
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};

const isValid = inputElement => {
  if (!inputElement.validity.valid) {
    showInputError(inputElement, inputElement.validationMessage);
  } else {
    hideInputError(inputElement);
  }
};

const hasInvalidInput = inputList => {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__button-inactive');
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove('popup__button-inactive');
    buttonElement.removeAttribute('disabled');
  }
};

const setEventListeners = formElement => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      isValid(inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};
const enableValidation = () => {
  const formList = Array.from(popupFormList); 
  formList.forEach(formElement => setEventListeners(formElement));
};


enableValidation();