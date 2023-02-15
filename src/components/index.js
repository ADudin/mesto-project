import '../pages/index.css';
import { initialCards } from './initialCards.js';

import {
  popupCloseButtons,
  openPopup,
  handleClosePopup
} from './modal.js';

import { 
  profileEditButton,
  userDataForm,
  handleUserDataFormSubmit,
  handleOpenUserDataForm
} from './modalUserInfo.js';

import {renderCard} from './card.js';

import { 
  buttonAddCard,
  popupAddCard,
  newCardForm,
  cardsList,
  handleNewCardFormSubmit,
  handleNewCardForm
} from './modalAddCard.js';

import {
  form,
  enableValidation
} from './validate.js';

initialCards.forEach((item) => {
  renderCard(item, cardsList);
});

profileEditButton.addEventListener('click', handleOpenUserDataForm);

buttonAddCard.addEventListener('click', () => {
  openPopup(popupAddCard);
  handleNewCardForm();
});

popupCloseButtons.forEach((item) => {
  item.addEventListener('click', handleClosePopup);
});

userDataForm.addEventListener('submit', handleUserDataFormSubmit);

newCardForm.addEventListener('submit', handleNewCardFormSubmit);

enableValidation(form);