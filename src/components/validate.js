const form = {
  formSelector: '.form',
  fieldsetSelector: '.form__set',
  inputSelector: '.form__item',
  getErrorInputSelector: (inputId) => `.${inputId}-input-error`,
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__item-error_active'
};

const showInputError = (form, formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(form.getErrorInputSelector(inputElement.id));

  inputElement.classList.add(form.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(form.errorClass);
}

const hideInputError = (form, formElement, inputElement) => {
  const errorElement = formElement.querySelector(form.getErrorInputSelector(inputElement.id));

  inputElement.classList.remove(form.inputErrorClass);
  errorElement.classList.remove(form.errorClass);
  errorElement.textContent = '';
}

const checkInputValidity = (form, formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity('');
  }

  if (!inputElement.validity.valid) {
    showInputError(form, formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(form, formElement, inputElement);
  }
}

const setEventListeners = (form, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(form.inputSelector));
  const buttonElement = formElement.querySelector(form.submitButtonSelector);

  toggleButtonState(form, inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(form, formElement, inputElement);
      toggleButtonState(form, inputList, buttonElement);
    });
  });
}

const enableValidation = (form) => {
  const formList = Array.from(document.querySelectorAll(form.formSelector));
  
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    const fieldsetList = Array.from(formElement.querySelectorAll(form.fieldsetSelector));
    
    fieldsetList.forEach((fieldset) => {
      setEventListeners(form, fieldset);
    });
  });
}

const hasInvalidinput = (inputList) => {

  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

const toggleButtonState = (form, inputList, buttonElement) => {
  if (hasInvalidinput(inputList)) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(form.inactiveButtonClass);
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(form.inactiveButtonClass);
  }
}

export {
  form, 
  enableValidation
};