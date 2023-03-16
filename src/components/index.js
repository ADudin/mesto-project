import '../pages/index.css';

import { 
  setUserData, 
  renderUserInfo
} from './profile.js';

import {
  Api,
} from './api.js';

import {
  closePopup,
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
   renderCard,
  Card
} from './card.js';

import {
  buttonAddCard,
  //popupAddCard,
  newCardForm,
  //cardsList,
  //handleNewCardFormSubmit,
  cardsList,
  submitButtonAddCard
} from './modalAddCard.js';

import { PopupDeleteCard } from './modalRemoveCard.js';

import {
  validationParams,
  //enableValidation,
  FormValidator
} from './validate.js';

import Section from "./section";
import PopupWithForm from "./PopupWithForm";
import {renderLoading} from "./utils";


profileEditButton.addEventListener('click', handleOpenUserDataForm);
editUserAvatarButton.addEventListener('click', handleOpenUserAvatarForm);

// buttonAddCard.addEventListener('click', () => {
//   openPopup(popupAddCard);
// });

userDataForm.addEventListener('submit', handleUserDataFormSubmit);
userAvatarForm.addEventListener('submit', handleUserAvatarFormSubmit);
//newCardForm.addEventListener('submit', handleNewCardFormSubmit);

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
});

const popupAddCard = new PopupWithForm({ 
  selector: '.popup_type_add-new-card', 
  handleFormSubmit: (cardData) => {
    renderLoading(true, submitButtonAddCard, 'Сохранение...', 'Создать');
    api.uploadNewCard(cardData)
      .then((card) => {
        console.log(card);
        const newCard = new Card({
          id: card._id,
          name: card.name,
          link: card.link,
          likes: card.likes,
          owner: card.owner,
          handleRemoveCard: (cardId) => { //добавляем колбэк удаления карточки
            // const popupRemoveCard = new PopupDeleteCard('.popup_type_remove', cardId);
            // popupRemoveCard.setEventListeners();
            // popupRemoveCard.open(api);
            const cardToDelete = document.querySelector(`.card[data-id='${cardId}']`);
            api.deleteCard(item)
                .then(() => {
                  cardToDelete.remove();
                })
                .catch((error) => {
                      console.log(`Ошибка удаления карточки. Ошибка ${error}`);
                    }
                );
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
            popupWithImage.setEventListeners();
            popupWithImage.open(link, name);
          }

        },'#card-template')
        //newCard.generateCard()
         renderCard(newCard.generateCard(),cardsList)


      })
      .catch((error) => {
        console.log(`Ошибка добавления информации о новой карточке. Ошибка ${error}`);
      })
      .finally(() => {
        renderLoading(false, submitButtonAddCard, 'Сохранение...', 'Создать');
        popupAddCard.close();
      }
    );
  }
});

popupAddCard.setEventListeners();
buttonAddCard.addEventListener('click', () => {
  popupAddCard.open();
});


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
          //console.log(item)
          const card = new Card({ // деструктуризация нужна, чтобы передать колбэки
            id: item._id, // деструктуризация item
            name: item.name,
            link: item.link,
            likes: item.likes,
            owner: item.owner,
            handleRemoveCard: (cardId) => { //добавляем колбэк удаления карточки
              // const popupRemoveCard = new PopupDeleteCard('.popup_type_remove', cardId);
              // popupRemoveCard.setEventListeners();
              // popupRemoveCard.open(api);
              const cardToDelete = document.querySelector(`.card[data-id='${cardId}']`);
              api.deleteCard(item)
                .then(() => {
                  cardToDelete.remove();
                })
                .catch((error) => {
                  console.log(`Ошибка удаления карточки. Ошибка ${error}`);
                }
              );
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
              popupWithImage.setEventListeners();
              popupWithImage.open(link, name);
            }
          },'#card-template'
        );
        
        const cardElement = card.generateCard();
        section.setCard(cardElement);
      }
    }, '.cards__list');

    section.renderCards();
  })
  .catch((error) => {
    console.log(`Ошибка загрузки информации о пользователе/карточек. Ошибка ${error}`);
  }
);

