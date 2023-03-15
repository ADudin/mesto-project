 import {Popup} from "./modal";

export default class PopupWithForm extends Popup {
    constructor({selector, callbackFormSubmit}) {
        super(selector);
        this._callbackFormSubmit = callbackFormSubmit;
        this._form = document.querySelector('.form')

    }
    _getInputValues(){
        this._inputList = document.querySelectorAll('.form__item');


        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value
        });

        return this._formValues;
    }

    setEventListeners(){
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._callbackFormSubmit(this._getInputValues());
        })

    }
    close() {
        super.close();
        this.selector.reset();
    }

}
