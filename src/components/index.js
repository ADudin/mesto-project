import '../pages/index.css';

import { renderUserInfo } from './profile.js';

import { 
  getCards,
  getUserData
} from './api.js';

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
} from './modalAddCard.js';

import {
  validationParams,
  enableValidation
} from './validate.js';

profileEditButton.addEventListener('click', handleOpenUserDataForm);

buttonAddCard.addEventListener('click', () => {
  openPopup(popupAddCard);
});

popupCloseButtons.forEach((item) => {
  item.addEventListener('click', handleClosePopup);
});

userDataForm.addEventListener('submit', handleUserDataFormSubmit);

newCardForm.addEventListener('submit', handleNewCardFormSubmit);

enableValidation(validationParams);

getCards().then((cards) => {
  cards.forEach((card) => {
    renderCard(card, cardsList);
  });
});

getUserData().then((data) => {
  console.log(data);
  renderUserInfo(data);
});