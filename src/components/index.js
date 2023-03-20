import '../pages/index.css';

import Api from './api.js';

import PopupWithImage from './PopupWithImage.js';

import Card from './card.js';

import FormValidator from './validate.js';

import Section from "./section.js";

import PopupWithForm from "./PopupWithForm.js";

import { 
  renderLoading, 
  renderCard 
} from "./utils.js";

import UserInfo from "./UserInfo.js";

import {
  profile,
  buttonAddCard,
  cardsList,
  submitButtonAddCard,
  editUserAvatarButton,
  submitButtonEditAvatar,
  userAvatarElement,
  profileEditButton,
  submitButtonEditProfile,
  validationParams
} from './constants.js';

const formList = Array.from(document.querySelectorAll(validationParams.formSelector));

formList.forEach((formElement) => {
  const formValide = new FormValidator(validationParams,formElement);
  formValide.enableValidation();
});


const api = new Api ({
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


// обновление информации о пользователе
const userInfo = new UserInfo(
  '.profile__user-name',
  '.profile__user-description',
  '.profile__avatar'
);


const handleUpdateUserInfo = (userData) => {
  renderLoading(true, submitButtonEditProfile, 'Сохранение...', 'Сохранить');
  api.updateUserData(userData)
    .then(() => {
      userInfo.setUserInfo(userData.name, userData.about);
      popupUpdateUserInfo.close();
    })
    .catch((error) => {
      console.log(`Ошибка обновления данных пользователя. Ошибка ${error}`);
    })
    .finally(() => {
      renderLoading(false, submitButtonEditProfile, 'Сохранение...', 'Сохранить');
    }
  )
}

const popupUpdateUserInfo = new PopupWithForm({
    selector: '.popup_type_edit-user-data',
    handleFormSubmit: handleUpdateUserInfo
  }
);

popupUpdateUserInfo.setEventListeners();
profileEditButton.addEventListener('click', () => {
  popupUpdateUserInfo.setInputValues(userInfo.getUserInfo());
  popupUpdateUserInfo.open();
});

// обработка обновления аватара

const handleUpdateUserAvatar = (avatarInput) => {
  const userData = {};
  userData.avatar = avatarInput['user-avatar'];

  renderLoading(true, submitButtonEditAvatar, 'Сохранение...', 'Сохранить');

  api.updateUserAvatar(userData)
    .then(() => {
      userAvatarElement.src = userData.avatar;
      userAvatarElement.alt = 'Изображение аватара пользователя';
      popupUpdateAvatar.close();
    })
    .catch((error) => {
        console.log(`Ошибка обновления аватара пользователя. Ошибка ${error}`);
    })
    .finally(() => {
      renderLoading(false, submitButtonEditAvatar, 'Сохранение...', 'Сохранить');
    }
  )
}

const popupUpdateAvatar = new PopupWithForm({
  selector: '.popup_type_edit-user-avatar',
  handleFormSubmit: handleUpdateUserAvatar
})

popupUpdateAvatar.setEventListeners();

editUserAvatarButton.addEventListener('click', () => {
  popupUpdateAvatar.open();
});

Promise.all([api.getUserData(), api.getInitialCards()])
    .then(([userData, cards]) => {
      profile.setAttribute('data-id', userData._id);
      userInfo.setUserInfo(userData.name, userData.about, userData.avatar);
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
            handleLikeClick: handleLikeClick,
            handleOpenImagePopup: handleOpenImagePopup
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
