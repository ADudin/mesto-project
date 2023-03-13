import '../pages/index.css';

import { 
  setUserData, 
  renderUserInfo
} from './profile.js';

import {
  Api
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
editUserAvatarButton.addEventListener('click', handleOpenUserAvatarForm);

buttonAddCard.addEventListener('click', () => {
  openPopup(popupAddCard);
});

// popupCloseButtons.forEach((item) => {
//   item.addEventListener('click', handleClosePopup);
// });

userDataForm.addEventListener('submit', handleUserDataFormSubmit);
userAvatarForm.addEventListener('submit', handleUserAvatarFormSubmit);
newCardForm.addEventListener('submit', handleNewCardFormSubmit);

enableValidation(validationParams);


const api = new Api ({
  baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-21',
  headers: {
    authorization: 'e22a7236-eb1c-4145-a157-f86fa0ccbc4e',
    'Content-Type': 'application/json'
  }
})

Promise.all([api.getUserData(), api.getInitialCards()])
    .then(([userData, cards]) => {
      renderUserInfo(userData);
      setUserData(userData);
      cards.forEach((card) => {
        renderCard(card, cardsList, api);
      });
    })
    .catch((error) => {
      console.log(`Ошибка загрузки информации о пользователе/карточек. Ошибка ${error}`);
    }
);

// const section = new Section({
//   items: api.getInitialCards(),
//   renderer: (item) => {
//     const card = new Card(item, '#card-template');
//     const cardElement = card.generateCard();
//      section.setCard(cardElement);
//
//   }
// }, cardsList)
// section.renderCards()