 import {Popup} from "./modal";

export default class PopupWithForm extends Popup {
    constructor({selector, handleFormSubmit}) {
      super(selector);
      this._handleFormSubmit = handleFormSubmit;
      this._form = document.querySelector(selector);
      this._inputList = this._form.querySelectorAll('.form__item');
    }
    _getInputValues() {
      this._formValues = {};
      this._inputList.forEach(input => {
        this._formValues[input.name] = input.value;
      });

      return this._formValues;
    }

    setEventListeners() {
      super.setEventListeners();
    
      this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._handleFormSubmit(this._getInputValues());
      });
    }

    close() {
      super.close();
      this._inputList.forEach((input) => {
        input.value = '';
      });
    }

}
