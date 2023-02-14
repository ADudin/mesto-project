import {
  popupCloseButtons,
  openPopup,
  handleClosePopup
} from './components/modal.js';

import { 
  profileEditButton,
  userDataForm,
  handleUserDataFormSubmit,
  handleOpenUserDataForm
} from './components/modalUserInfo.js';

import {renderCard} from './components/card.js';

import { 
  buttonAddCard,
  popupAddCard,
  newCardForm,
  cardsList,
  handleNewCardFormSubmit,
  handleNewCardForm
} from './components/modalAddCard.js';

import {
  form,
  enableValidation
} from './components/validate.js';

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