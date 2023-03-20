export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup__close-button') || evt.target.classList.contains('popup')) {
        this.close();
      }
    });

    document.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
  }

  open() {
    this._popup.classList.add('popup_opened');
  }

  close() {
    this._popup.classList.remove('popup_opened');
  }
};