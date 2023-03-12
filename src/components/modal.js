const popupCloseButtons = document.querySelectorAll('.popup__close-button');

const handleEscClosePopup = (evt) => {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
}

const handleOverlayClick = (evt) => {
  const activePopup = document.querySelector('.popup_opened');
  if (evt.target === activePopup) {
    closePopup(activePopup);
  }
}

const handleClosePopup = (evt) => {
  closePopup(evt.target.closest('.popup'));
}

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscClosePopup);
  document.addEventListener('click', handleOverlayClick);
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscClosePopup);
  document.removeEventListener('click', handleOverlayClick);
}

class Popup {
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
    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove('popup_opened');
  }
}

export {
  Popup,
  popupCloseButtons, 
  openPopup, 
  closePopup, 
  handleClosePopup
};