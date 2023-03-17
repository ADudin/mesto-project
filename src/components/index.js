import '../pages/index.css';

import {
    setUserData,
    renderUserInfo,
    userAvatarElement
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
  handleOpenUserAvatarForm,
  submitButtonEditAvatar
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
  handleNewCardFormSubmit,
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
import UserInfo from "./UserInfo";


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


export const api = new Api ({
  baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-21',
  headers: {
    authorization: 'e22a7236-eb1c-4145-a157-f86fa0ccbc4e',
    'Content-Type': 'application/json'
  }
});

// колбэк удаления карточки
const handleRemoveCard = (cardId) => {
  const cardData = {};
  cardData._id = cardId
  const cardToDelete = document.querySelector(`.card[data-id='${cardId}']`);
  api.deleteCard(cardData)
    .then(() => {
      cardToDelete.remove();
    })
    .catch((error) => {
      console.log(`Ошибка удаления карточки. Ошибка ${error}`);
    }
  );
};

// счетчик лайков
 const updateLikesCountElement = (element, value) => {
  if (value === 0) {
    element.textContent = '';
  } else {
    element.textContent = value;
  }
};

// колбэк клика по лайку
const handleLikeClick = (likeElement, id, likesCountElement) =>  { 
  const isLiked = likeElement.classList.contains('card__like-button_active');
  const cardData = {};
  
  cardData._id = id;

  if (isLiked) {
    api.deleteLike(cardData)
      .then((data) => {
        likeElement.classList.toggle('card__like-button_active');
        updateLikesCountElement(likesCountElement, data.likes.length);
      })
      .catch((error) => {
        console.log(`Ошибка удаления лайка у карточки. Ошибка ${error}`);
      });
  } else {
    api.setLike(cardData)
      .then((data) => {
        likeElement.classList.toggle('card__like-button_active');
        updateLikesCountElement(likesCountElement, data.likes.length);
      })
      .catch((error) => {
        console.log(`Ошибка добавления лайка карточке. Ошибка ${error}`);
      }
    );
  }
};
// колбэк открытия большой картинки
const handleOpenImagePopup = (link, name) => { //добавляем колбэк открытия модального окна с изображением
    const popupWithImage = new PopupWithImage('.popup_type_image');
    popupWithImage.setEventListeners();
    popupWithImage.open(link, name);
};

// обработка попапа с добавлением картинки
const popupAddCard = new PopupWithForm({ 
  selector: '.popup_type_add-new-card', 
  handleFormSubmit: (cardData) => {
    renderLoading(true, submitButtonAddCard, 'Сохранение...', 'Создать');
    api.uploadNewCard(cardData)
      .then((card) => {
        const newCard = new Card({
          id: card._id,
          name: card.name,
          link: card.link,
          likes: card.likes,
          owner: card.owner,
          handleRemoveCard: handleRemoveCard,
          handleLikeClick: handleLikeClick,
          // handleRemoveCard: (cardId) => { //добавляем колбэк удаления карточки
          //   const cardToDelete = document.querySelector(`.card[data-id='${cardId}']`);
          //   api.deleteCard(newCard)
          //       .then(() => {
          //         cardToDelete.remove();
          //       })
          //       .catch((error) => {
          //             console.log(`Ошибка удаления карточки. Ошибка ${error}`);
          //           }
          //       );
          // },
          // handleLikeClick: (likeElement, id, likesCountElement) => { //добавляем колбэк клика по лайку
          //   const isLiked = likeElement.classList.contains('card__like-button_active');
          //   const cardData = {};
          //   cardData._id = id;
          //
          //   if (isLiked) {
          //     api.deleteLike(cardData)
          //         .then((data) => {
          //           likeElement.classList.toggle('card__like-button_active');
          //           newCard.updateLikesCountElement(likesCountElement, data.likes.length);
          //         })
          //         .catch((error) => {
          //           console.log(`Ошибка удаления лайка у карточки. Ошибка ${error}`);
          //         });
          //   } else {
          //     api.setLike(cardData)
          //         .then((data) => {
          //           likeElement.classList.toggle('card__like-button_active');
          //           newCard.updateLikesCountElement(likesCountElement, data.likes.length);
          //         })
          //         .catch((error) => {
          //               console.log(`Ошибка добавления лайка карточке. Ошибка ${error}`);
          //             }
          //         );
          //   }
          // },
          handleOpenImagePopup: handleOpenImagePopup
        },'#card-template')
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
// обработка попапа с обновлением информации о пользователе

// const popupUpdateUserInfo = new PopupWithForm({
//     selector: '.popup_type_edit-user-data',
//     handleFormSubmit: (userData) => {
//         console.log(userData)
//
//
//     }
// })
// popupUpdateUserInfo.setEventListeners()
// profileEditButton.addEventListener('click', () => {
//     popupUpdateUserInfo.open()
// });


// обработка обновления аватара

// const handleUpdateUserAvatar = ( avatarInput) => {
//     const userData = {};
//     userData.avatar = avatarInput
//      //renderLoading(true, submitButtonEditAvatar, 'Сохранение...', 'Сохранить');
//     api.updateUserAvatar(userData)
//         .then(() => {
//             userAvatarElement.src = userData.avatar;)
//             userAvatarElement.alt = 'Изображение аватара пользователя';
//
//         })
//     // .catch((error) => {
//     //     console.log(`Ошибка обновления аватара пользователя. Ошибка ${error}`);
//     // })
//     .finally(() => {
//         // renderLoading(false, submitButtonEditAvatar, 'Сохранение...', 'Сохранить');
//         popupUpdateAvatar.close();
//     })
//     console.log('конец функции const handleUpdateUserAvatar')
// }
//
// const popupUpdateAvatar = new PopupWithForm({
//     selector: '.popup_type_edit-user-avatar',
//     handleFormSubmit: (userData) => {
//         handleUpdateUserAvatar(userData)
//     }
// })
// popupUpdateAvatar.setEventListeners();
// editUserAvatarButton.addEventListener('click', () => {
//     popupUpdateAvatar.open();
// });


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

            handleRemoveCard: handleRemoveCard,
            // (cardId) => { //добавляем колбэк удаления карточки
            //   // const popupRemoveCard = new PopupDeleteCard('.popup_type_remove', cardId);
            //   // popupRemoveCard.setEventListeners();
            //   // popupRemoveCard.open(api);
            //  // console.log(item)
            //   //console.log(cardId)
            //
            //   const cardToDelete = document.querySelector(`.card[data-id='${cardId}']`);
            //   api.deleteCard(item)
            //     .then(() => {
            //       console.log()
            //       cardToDelete.remove();
            //     })
            //     .catch((error) => {
            //       console.log(`Ошибка удаления карточки. Ошибка ${error}`);
            //     }
            //   );
            // },
            handleLikeClick: handleLikeClick,
            // handleLikeClick: (likeElement, id, likesCountElement) => { //добавляем колбэк клика по лайку
            //   const isLiked = likeElement.classList.contains('card__like-button_active');
            //   const cardData = {};
            //   cardData._id = id;
            //
            //   if (isLiked) {
            //     api.deleteLike(cardData)
            //       .then((data) => {
            //         likeElement.classList.toggle('card__like-button_active');
            //         card.updateLikesCountElement(likesCountElement, data.likes.length);
            //       })
            //       .catch((error) => {
            //         console.log(`Ошибка удаления лайка у карточки. Ошибка ${error}`);
            //       });
            //   } else {
            //     api.setLike(cardData)
            //       .then((data) => {
            //         likeElement.classList.toggle('card__like-button_active');
            //         card.updateLikesCountElement(likesCountElement, data.likes.length);
            //       })
            //       .catch((error) => {
            //         console.log(`Ошибка добавления лайка карточке. Ошибка ${error}`);
            //       }
            //     );
            //   }
            // },
              handleOpenImagePopup: handleOpenImagePopup
            // handleOpenImagePopup: (link, name) => { //добавляем колбэк открытия модального окна с изображением
            //   const popupWithImage = new PopupWithImage('.popup_type_image');
            //   popupWithImage.setEventListeners();
            //   popupWithImage.open(link, name);
            // }
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
