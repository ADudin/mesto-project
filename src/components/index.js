import '../pages/index.css';

import { 
  setUserData, 
  renderUserInfo
} from './profile.js';

import {
  Api
} from './api.js';

import {
  //popupCloseButtons,
  openPopup,
  //handleClosePopup
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

import { PopupWithImage } from './modalImage.js';

import {
 // renderCard,
  Card} from './card.js';

import { 
  buttonAddCard,
  popupAddCard,
  newCardForm,
  //cardsList,
  handleNewCardFormSubmit,
} from './modalAddCard.js';

import { PopupDeleteCard } from './modalRemoveCard.js';

import {
  validationParams,
  //enableValidation,
  FormValidator
} from './validate.js';

import Section from "./section";


profileEditButton.addEventListener('click', handleOpenUserDataForm);
editUserAvatarButton.addEventListener('click', handleOpenUserAvatarForm);

buttonAddCard.addEventListener('click', () => {
  openPopup(popupAddCard);
});

userDataForm.addEventListener('submit', handleUserDataFormSubmit);
userAvatarForm.addEventListener('submit', handleUserAvatarFormSubmit);
newCardForm.addEventListener('submit', handleNewCardFormSubmit);

//enableValidation(validationParams);
const formList = Array.from(document.querySelectorAll(validationParams.formSelector));

formList.forEach((formElement) => {
  const formValide = new FormValidator(validationParams,formElement);
  formValide.enableValidation()
});


const api = new Api ({
  baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-21',
  headers: {
    authorization: 'e22a7236-eb1c-4145-a157-f86fa0ccbc4e',
    'Content-Type': 'application/json'
  }
})

// Promise.all([api.getUserData(), api.getInitialCards()])
//     .then(([userData, cards]) => {
//       renderUserInfo(userData);
//       setUserData(userData);
//       const section = new Section({
//        items: cards,
//         renderer: (item) => {
//           const card = new Card(
//             item, 
//             '#card-template'
//           );
//          //console.log(card)
//          const cardElement = card.generateCard();
//          section.setCard(cardElement);
//        }
//     }, '.cards__list')
//      section.renderCards()
//    })
//     .catch((error) => {
//       console.log(`Ошибка загрузки информации о пользователе/карточек. Ошибка ${error}`);
//     }
// );

Promise.all([api.getUserData(), api.getInitialCards()])
    .then(([userData, cards]) => {
      renderUserInfo(userData);
      setUserData(userData);
      const section = new Section({
        items: cards,
        renderer: (item) => {
          const card = new Card({ // деструктуризация нужна, чтобы передать колбэки
            id: item._id, // деструктуризация item
            name: item.name,
            link: item.link,
            likes: item.likes,
            owner: item.owner,
            handleRemoveCard: (cardId) => { //добавляем колбэк удаления карточки
              const popupRemoveCard = new PopupDeleteCard('.popup_type_remove', cardId);
              popupRemoveCard.open(api);
            },
            handleLikeClick: (likeElement, id, likesCountElement) => { //добавляем колбэк клика по лайку
              const isLiked = likeElement.classList.contains('card__like-button_active');
              const cardData = {};
              cardData._id = id;

              if (isLiked) {
                api.deleteLike(cardData)
                  .then((data) => {
                    likeElement.classList.toggle('card__like-button_active');
                    card.updateLikesCountElement(likesCountElement, data.likes.length);
                  })
                  .catch((error) => {
                    console.log(`Ошибка удаления лайка у карточки. Ошибка ${error}`);
                  });
              } else {
                api.setLike(cardData)
                  .then((data) => {
                    likeElement.classList.toggle('card__like-button_active');
                    card.updateLikesCountElement(likesCountElement, data.likes.length);
                  })
                  .catch((error) => {
                    console.log(`Ошибка добавления лайка карточке. Ошибка ${error}`);
                  }
                );
              }
            },
            handleOpenImagePopup: (link, name) => { //добавляем колбэк открытия модального окна с изображением
              const popupWithImage = new PopupWithImage('.popup_type_image');
              popupWithImage.open(link, name);
            }
          },'#card-template'
        );

        const cardElement = card.generateCard();
        section.setCard(cardElement);
      }
    }, '.cards__list')

    section.renderCards()
  })
  .catch((error) => {
    console.log(`Ошибка загрузки информации о пользователе/карточек. Ошибка ${error}`);
  }
);

