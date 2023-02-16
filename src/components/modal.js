const popupCloseButtons = document.querySelectorAll('.popup__close-button');
const profile = document.querySelector('.profile');

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

export {
  popupCloseButtons, 
  profile, 
  openPopup, 
  closePopup, 
  handleClosePopup
};