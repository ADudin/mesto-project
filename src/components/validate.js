const validationParams = {
  formSelector: '.form',
  fieldsetSelector: '.form__set',
  inputSelector: '.form__item',
  getErrorInputSelector: (inputId) => `.${inputId}-input-error`,
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__item-error_active'
};


// const showInputError = (validationParams, formElement, inputElement, errorMessage) => {
//   const errorElement = formElement.querySelector(validationParams.getErrorInputSelector(inputElement.id));
//
//   inputElement.classList.add(validationParams.inputErrorClass);
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add(validationParams.errorClass);
// }
//
// const hideInputError = (validationParams, formElement, inputElement) => {
//   const errorElement = formElement.querySelector(validationParams.getErrorInputSelector(inputElement.id));
//
//   inputElement.classList.remove(validationParams.inputErrorClass);
//   errorElement.classList.remove(validationParams.errorClass);
//   errorElement.textContent = '';
// }
//
// const checkInputValidity = (validationParams, formElement, inputElement) => {
//   if (inputElement.validity.patternMismatch) {
//     inputElement.setCustomValidity(inputElement.dataset.errorMessage);
//   } else {
//     inputElement.setCustomValidity('');
//   }
//
//   if (!inputElement.validity.valid) {
//     showInputError(validationParams, formElement, inputElement, inputElement.validationMessage);
//   } else {
//     hideInputError(validationParams, formElement, inputElement);
//   }
// }
//
// const setEventListeners = (validationParams, formElement) => {
//   const inputList = Array.from(formElement.querySelectorAll(validationParams.inputSelector));
//   const buttonElement = formElement.querySelector(validationParams.submitButtonSelector);
//
//   toggleButtonState(validationParams, inputList, buttonElement);
//
//   formElement.parentElement.addEventListener('reset', () => {
//     toggleButtonState(validationParams, inputList, buttonElement);
//     setTimeout(() => {
//       toggleButtonState(validationParams, inputList, buttonElement);
//     }, 0);
//   });
//
//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener('input', () => {
//       checkInputValidity(validationParams, formElement, inputElement);
//       toggleButtonState(validationParams, inputList, buttonElement);
//     });
//   });
// }
//
// const enableValidation = (validationParams) => {
//   const formList = Array.from(document.querySelectorAll(validationParams.formSelector));
//
//   formList.forEach((formElement) => {
//     formElement.addEventListener('submit', (evt) => {
//       evt.preventDefault();
//     });
//
//     const fieldsetList = Array.from(formElement.querySelectorAll(validationParams.fieldsetSelector));
//
//     fieldsetList.forEach((fieldset) => {
//       setEventListeners(validationParams, fieldset);
//     });
//   });
// }
//
// const hasInvalidinput = (inputList) => {
//
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   });
// }
//
// const toggleButtonState = (validationParams, inputList, buttonElement) => {
//   if (hasInvalidinput(inputList)) {
//     buttonElement.setAttribute('disabled', true);
//     buttonElement.classList.add(validationParams.inactiveButtonClass);
//   } else {
//     buttonElement.removeAttribute('disabled');
//     buttonElement.classList.remove(validationParams.inactiveButtonClass);
//   }
// }

export {
  validationParams,
  //enableValidation
  FormValidator
};
//================================================================================================
class FormValidator {
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

  _setEventListeners(validationParams, formElement) {
    const inputList = Array.from(formElement.querySelectorAll(validationParams.inputSelector));
    const buttonElement = formElement.querySelector(validationParams.submitButtonSelector);

    this._toggleButtonState(validationParams, inputList, buttonElement);

    formElement.parentElement.addEventListener('reset', () => {
      this._toggleButtonState(validationParams, inputList, buttonElement);
      setTimeout(() => {
        this._toggleButtonState(validationParams, inputList, buttonElement);
      }, 0);
    });

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(validationParams, formElement, inputElement);
        this._toggleButtonState(validationParams, inputList, buttonElement);
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
     });
    const fieldsetList = Array.from(this._formElement.querySelectorAll(this._validationParams.fieldsetSelector));

      fieldsetList.forEach((fieldset) => {
        this._setEventListeners(this._validationParams, fieldset);
      });

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
}
