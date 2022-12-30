const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');

popupClosingHandler = () => {
  const popupCloseButton = popup.querySelector('.popup__close-button');

  popup.classList.remove('popup_opened');
  popupCloseButton.removeEventListener('click', popupClosingHandler);
  profileEditButton.addEventListener('click', popupOpeningHandler);
}

popupOpeningHandler = () => {
  popup.classList.add('popup_opened');

  profileEditButton.removeEventListener('click', popupOpeningHandler);

  const popupCloseButton = popup.querySelector('.popup__close-button');

  popupCloseButton.addEventListener('click', popupClosingHandler);
}

profileEditButton.addEventListener('click', popupOpeningHandler);