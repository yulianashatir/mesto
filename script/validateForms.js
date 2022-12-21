const showInputError = (formElement, inputElement, errorMessage, {inputErrorClass, errorClass}) => {
    const errorField = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorField.textContent = errorMessage;
    errorField.classList.add(errorClass);
  };
  
  const hideInputError = (formElement, inputElement, {inputErrorClass, errorClass}) => {
    const errorField = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorField.classList.remove(errorClass);
    errorField.textContent = '';
  };
  
  const toggleInputErrorState = (formElement, inputElement, combination) => {
    if (!inputElement.validity.valid) {
        showInputError (formElement, inputElement, inputElement.validationMessage, combination);
    } else {
        hideInputError(formElement, inputElement, combination);
    }
  };
  
  const listenInputEvent = (formElement, {inputSelector, submitButtonSelector, ...combination}) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonField = formElement.querySelector (submitButtonSelector);
    switchButtonState(inputList, buttonField, combination);
    inputList.forEach(function (inputElement) {
     inputElement.addEventListener('input', function () {
        toggleInputErrorState (formElement, inputElement, combination);
        switchButtonState(inputList, buttonField, combination);
     });
   });
  };
  
  const enableValidation = ({formSelector, ...combination}) => {
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach(function (formElement) {
      const fieldList = Array.from(document.querySelectorAll(formSelector));
      fieldList.forEach(function (field) {
        listenInputEvent (field, combination);
      });
    });
  };
  
  const hasIncorrectInput = (inputList) => {
    return inputList.some(function (inputElement) {
      return !inputElement.validity.valid;
    });
  };

  const enableButtonField = (buttonField, inactiveButtonClass) => {
    buttonField.classList.remove (inactiveButtonClass);
    buttonField.disabled = false;
  }

  const disableButtonField = (buttonField, inactiveButtonClass) => {
    buttonField.classList.add (inactiveButtonClass);
    buttonField.disabled = true;
  }
  
  const switchButtonState = (inputList, buttonField,{inactiveButtonClass}) => {
    if (hasIncorrectInput (inputList)) {
      disableButtonField(buttonField, inactiveButtonClass);
    } else {
      enableButtonField(buttonField, inactiveButtonClass);
    }
  };
  
  
  enableValidation ({
      formSelector: '.popup_type_elements',
      inputSelector: '.popup__input',
      submitButtonSelector: '.popup__button',
      inactiveButtonClass: 'popup__button-inactive',
      inputErrorClass: 'popup__input_type_error',
      errorClass: 'popup__input-error_active'
    });