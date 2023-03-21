import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({selector, handleFormSubmit}) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    //this._form = document.querySelector(selector);
   // this._inputList = this._form.querySelectorAll('.form__item');
    this._inputList = this._popup.querySelectorAll('.form__item');
    this._formInput = this._popup.querySelector('.form')
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setInputValues(data) {
    this._inputList.forEach(input => {
      if (data.hasOwnProperty(input.name)) {
        input.value = data[input.name];
      }
    });
  }

  setEventListeners() {
    super.setEventListeners();
    
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    this._formInput.reset()
    super.close();
  }
};