export default class FormValidator {
    constructor(formSelectors, formElement) {
      this._formElement = formElement;
  
      this._inputFieldSelector = formSelectors.inputFieldSelector;
      this._inputSelector = formSelectors.inputSelector;
      this._inputErrorSelector = formSelectors.inputErrorSelector;
      this._inputErrorClass = formSelectors.inputErrorClass;
      this._errorClass = formSelectors.errorClass;
      this._inactiveButtonClass = formSelectors.inactiveButtonClass;
      this._inputSelectorList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
      this._buttonElement = this._formElement.querySelector(formSelectors.buttonElement);
    }
  
    
    _showInputError = (inputElement, errorMessage) => {
      const errorElement = inputElement.closest(this._inputFieldSelector).querySelector(this._inputErrorSelector);
      inputElement.classList.add(this._inputErrorClass); 
      errorElement.textContent = errorMessage; 
      errorElement.classList.add(this._errorClass); 
    }
  
  
    _hideInputError = inputElement => {
      const errorElement = inputElement.closest(this._inputFieldSelector).querySelector(this._inputErrorSelector);
      inputElement.classList.remove(this._inputErrorClass);
      errorElement.classList.remove(this._errorClass);
      errorElement.textContent = '';
    }
  
  
    _isValid = inputElement => {
      if (!inputElement.validity.valid) {
        this._showInputError(inputElement, inputElement.validationMessage);
      } else {
        this._hideInputError(inputElement);
      }
    }
  
  
    _hasInvalidInput = () => {
      return this._inputSelectorList.some(inputElement => {
        return !inputElement.validity.valid;
      });
    }
  
  
    toggleButtonState = () => {
      if (this._hasInvalidInput()) {
        this._buttonElement.classList.add(this._inactiveButtonClass);
        this._buttonElement.setAttribute('disabled', true);
      } else {
        this._buttonElement.classList.remove(this._inactiveButtonClass);
        this._buttonElement.removeAttribute('disabled');
      }
    }
  
  
    _setEventListeners = () => {
      this.toggleButtonState(); 
  
      this._inputSelectorList.forEach(inputElement => { 
        inputElement.addEventListener('input', () => {
          this._isValid(inputElement);
           this.toggleButtonState();
        });
      });
    }
  
  
    enableValidation = () => {
      this._setEventListeners();
    };
}
