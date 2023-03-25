export default class FormValidator {
  constructor(validationParams, formElement) {
    this._validationParams = validationParams;
    this._formElement = formElement;
  }

  _showInputError(validationParams, formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(validationParams.getErrorInputSelector(inputElement.id));

    inputElement.classList.add(validationParams.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationParams.errorClass);
  }

  _hideInputError(validationParams, formElement, inputElement) {
    const errorElement = formElement.querySelector(validationParams.getErrorInputSelector(inputElement.id));

    inputElement.classList.remove(validationParams.inputErrorClass);
    errorElement.classList.remove(validationParams.errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(validationParams, formElement, inputElement) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity('');
    }

    if (!inputElement.validity.valid) {
      this._showInputError(validationParams, formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(validationParams, formElement, inputElement);
    }
  }

  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._validationParams.inputSelector));
    const buttonElement = this._formElement.querySelector(this._validationParams.submitButtonSelector);
    const toggleButtonState = () => this._toggleButtonState(this._validationParams, inputList, buttonElement);
    
    this._formElement.parentElement.addEventListener('reset', () => {
      setTimeout(toggleButtonState, 0);
    });

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(this._validationParams, this._formElement, inputElement);
        toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
     });
    this._setEventListeners();
  }

  _hasInvalidinput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(validationParams, inputList, buttonElement) {
    if (this._hasInvalidinput(inputList)) {
      buttonElement.setAttribute('disabled', true);
      buttonElement.classList.add(validationParams.inactiveButtonClass);
    } else {
      buttonElement.removeAttribute('disabled');
      buttonElement.classList.remove(validationParams.inactiveButtonClass);
    }
  }
};