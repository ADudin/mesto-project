import './index.css';

import Api from '../components/Api.js';

import PopupWithImage from '../components/PopupWithImage.js';

import Card from '../components/Card.js';

import FormValidator from '../components/FormValidator.js';

import Section from "../components/Section.js";

import PopupWithForm from "../components/PopupWithForm.js";

import {
  renderLoading
} from "../utils/utils.js";

import UserInfo from "../components/UserInfo.js";

import {
  profile,
  buttonAddCard,
  submitButtonAddCard,
  editUserAvatarButton,
  submitButtonEditAvatar,
  profileEditButton,
  submitButtonEditProfile,
  validationParams
} from '../utils/constants.js';

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

// создаем экземпляр класса модального окна с картинкой

const popupWithImage = new PopupWithImage('.popup_type_image');
popupWithImage.setEventListeners();

// создаем экземпляр класса секции с карточками

const section = new Section({
  renderer: createCard
} ,'.cards__list');

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

// колбэк клика по лайку

const handleLikeClick = (card) => {
  if (card.isLiked()) {
    api.deleteLike(card)
      .then((data) => {
        card.updateLikesCountElement(!card.isLiked(), data.likes.length);
      })
      .catch((error) => {
        console.log(`Ошибка удаления лайка у карточки. Ошибка ${error}`);
      });
  } else {
    api.setLike(card)
      .then((data) => {
        card.updateLikesCountElement(!card.isLiked(), data.likes.length);
      })
      .catch((error) => {
        console.log(`Ошибка добавления лайка карточке. Ошибка ${error}`);
      }
    );
  }
};

// колбэк открытия большой картинки

const handleOpenImagePopup = (link, name) => { //добавляем колбэк открытия модального окна с изображением
  popupWithImage.open(link, name);
};

// функция создания карточки

function createCard(item) {
  const newCard = new Card({
    id: item._id,
    name: item.name,
    link: item.link,
    likes: item.likes,
    owner: item.owner,
    handleRemoveCard: handleRemoveCard,
    handleLikeClick: handleLikeClick,
    handleOpenImagePopup: handleOpenImagePopup
  },'#card-template').generateCard();

  return newCard;
}

// создание попапа с добавлением карточки

const popupAddCard = new PopupWithForm({ 
  selector: '.popup_type_add-new-card', 
  handleFormSubmit: (cardData) => {
    renderLoading(true, submitButtonAddCard, 'Сохранение...', 'Создать');
    api.uploadNewCard(cardData)
      .then((card) => {
        section.prependItem(createCard(card));
        popupAddCard.close();
      })
      .catch((error) => {
        console.log(`Ошибка добавления информации о новой карточке. Ошибка ${error}`);
      })
      .finally(() => {
        renderLoading(false, submitButtonAddCard, 'Сохранение...', 'Создать');
      }
    );
  }
});

popupAddCard.setEventListeners();
buttonAddCard.addEventListener('click', () => {
  popupAddCard.open();
});

// создание экземпляра класса с информацией о пользователе

const userInfo = new UserInfo(
  '.profile__user-name',
  '.profile__user-description',
  '.profile__avatar'
);

// колбэк обновления информации о пользователе

const handleUpdateUserInfo = (userData) => {
  renderLoading(true, submitButtonEditProfile, 'Сохранение...', 'Сохранить');
  api.updateUserData(userData)
    .then((res) => {
      userInfo.setUserInfo(res)
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

// создание экземпляра класса модального окна с информацией о пользователе

const popupUpdateUserInfo = new PopupWithForm({
  selector: '.popup_type_edit-user-data',
  handleFormSubmit: handleUpdateUserInfo
});

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
    .then((res) => {
      userInfo.setUserInfo(res)
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

    userInfo.setUserInfo(
      userData
    );

    section.renderCards(cards);
  })
  .catch((error) => {
    console.log(`Ошибка загрузки информации о пользователе/карточек. Ошибка ${error}`);
  }
);