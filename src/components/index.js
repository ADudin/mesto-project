import '../pages/index.css';

import { 
  setUserData, 
  renderUserInfo
} from './profile.js';

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

import { 
  editUserAvatarButton,
  userAvatarForm,
  handleUserAvatarFormSubmit,
  handleOpenUserAvatarForm
} from './modalEditAvatar.js';

import {renderCard} from './card.js';

import { 
  buttonAddCard,
  //submitButtonAddCard,
  popupAddCard,
  newCardForm,
  cardsList,
  handleNewCardFormSubmit,
} from './modalAddCard.js';

import {
  validationParams,
  enableValidation
} from './validate.js';

//import { renderLoading } from './utils.js';

profileEditButton.addEventListener('click', handleOpenUserDataForm);
editUserAvatarButton.addEventListener('click', handleOpenUserAvatarForm);
//submitButtonAddCard.addEventListener('click', renderLoading(true, submitButtonAddCard, 'Создать'));

buttonAddCard.addEventListener('click', () => {
  openPopup(popupAddCard);
});

popupCloseButtons.forEach((item) => {
  item.addEventListener('click', handleClosePopup);
});

userDataForm.addEventListener('submit', handleUserDataFormSubmit);
userAvatarForm.addEventListener('submit', handleUserAvatarFormSubmit);
newCardForm.addEventListener('submit', handleNewCardFormSubmit);

enableValidation(validationParams);

getUserData().then((data) => {
  renderUserInfo(data);
  setUserData(data);
});

getCards().then((cards) => {
  cards.forEach((card) => {
    renderCard(card, cardsList);
  });
});