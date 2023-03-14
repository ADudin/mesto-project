import {
  //handleImagePopupData,
  PopupWithImage
} from './modalImage.js';

import { profile } from './profile.js';
import { openPopup } from './modal.js';

import { popupRemoveCard } from './modalRemoveCard.js';

import {
  setLike,
  deleteLike
} from './api.js';

const cardTemplate = document.querySelector('#card-template').content;

const updateLikesCountElement = (element, value) => {
  if (value === 0) {
    element.textContent = '';
  } else {
    element.textContent = value;
  }
}

const updateIsCardLikedElement = (cardData, userId, element) => {
  if (cardData.likes.length !== 0) {
    cardData.likes.forEach((like) => {
      if (Object.values(like).includes(userId)) {
        element.classList.add('card__like-button_active');
      }
    })
  }
}

const handleLikeClick = (likeElement, cardData, likesCountElement) => {
  const isLiked = likeElement.classList.contains('card__like-button_active');

  if (isLiked) {
    deleteLike(cardData)
      .then((data) => {
        likeElement.classList.toggle('card__like-button_active');
        updateLikesCountElement(likesCountElement, data.likes.length);
      })
      .catch((error) => {
        console.log(`Ошибка удаления лайка у карточки. Ошибка ${error}`);
      }
    );
  } else {
    setLike(cardData)
      .then((data) => {
        likeElement.classList.toggle('card__like-button_active');
        updateLikesCountElement(likesCountElement, data.likes.length);
      })
      .catch((error) => {
        console.log(`Ошибка добавления лайка карточке. Ошибка ${error}`);
      }
    );
  }
}

const createNewCard = (cardData, api) => {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardLikeButton = card.querySelector('.card__like-button');
  const cardLikeCount = card.querySelector('.card__like-value');
  const cardRemoveButton = card.querySelector('.card__remove-button');
  const userId = profile.getAttribute('data-id');

  card.querySelector('.card__title').textContent = cardData.name;
  card.setAttribute('data-id', cardData._id);
  cardImage.src = cardData.link;
  cardImage.alt = `Фотография ${cardData.name}`;

  updateLikesCountElement(cardLikeCount, cardData.likes.length);

  if (userId !== cardData.owner._id) {
    cardRemoveButton.remove();
  }

  updateIsCardLikedElement(cardData, userId, cardLikeButton);

  cardLikeButton.addEventListener('click', (evt) => {
    handleLikeClick(evt.target, cardData, cardLikeCount);
  });

  cardRemoveButton.addEventListener('click', () => {
    openPopup(popupRemoveCard);
    popupRemoveCard.setAttribute('data-id', cardData._id);
  });

  cardImage.addEventListener('click', () => {
    const popupWithImage = new PopupWithImage('.popup_type_image');
    popupWithImage.open(cardData.link, cardData.name);
  });

  return card;
}

const renderCard = (cardData, container, api) => {
  const newCard = createNewCard(cardData, api);
  container.prepend(newCard);
}

// класс card
//===============================================================================================
//
 class Card {
  constructor({
      id,
      name,
      link,
      likes,
      owner,
      handleRemoveCard,
      handleLikeClick,
      handleOpenImagePopup
    }, templateSelector) {
    this._id = id;
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._owner = owner;
    this._templateSelector = templateSelector;
    this._handleRemoveCard = handleRemoveCard;
    this._handleLikeClick = handleLikeClick;
    this._handleOpenImagePopup = handleOpenImagePopup;
  }

  //получение тимплейта
  _getElement() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  // счетчик лайков
  updateLikesCountElement(element, value) {
    if (value === 0) {
      element.textContent = '';
    } else {
      element.textContent = value;
    }
  }

  //постановка лайка
  _updateIsCardLikedElement(likes, userId, element) {
    if (likes.length !== 0) {
      likes.forEach((like) => {
        if (Object.values(like).includes(userId)) {
          element.classList.add('card__like-button_active');
        }
      })
    }
  }

  generateCard() {
    //создаем разметку для карточки из шаблона
    this._card = this._getElement();
    //сохраняем элементы разметки в переменные
    this._cardImage = this._card.querySelector('.card__image');
    this._cardLikeButton = this._card.querySelector('.card__like-button');
    this._cardLikeCount = this._card.querySelector('.card__like-value');
    this._cardRemoveButton = this._card.querySelector('.card__remove-button');
    this._userId = profile.getAttribute('data-id');

    //заполняем необходимые поля карточки
    this._card.querySelector('.card__title').textContent = this._name;
    this._card.setAttribute('data-id', this._id);
    this._cardImage.src = this._link;
    this._cardImage.alt = `Фотография ${this._name}`;

    this.updateLikesCountElement(this._cardLikeCount, this._likes.length);

    if (this._userId !== this._owner._id) {
      this._cardRemoveButton.remove();
    }

    this._updateIsCardLikedElement(this._likes, this._userId, this._cardLikeButton);

    //добавляем обрабочтики событий на кнопки карточки, тут надо будет переделать

    this._cardLikeButton.addEventListener('click', (evt) => {
      this._handleLikeClick(evt.target, this._id, this._cardLikeCount);
    });

    this._cardRemoveButton.addEventListener('click', () => {
      this._handleRemoveCard(this._id);
    });

    this._cardImage.addEventListener('click', () => {
      this._handleOpenImagePopup(this._link, this._name);
    });

    return this._card;
  }
}

//======================================================================================================

// const renderCard = (cardData, container) => {
//   const newCard = new Card(cardData, '#card-template');
//   container.prepend(newCard.generateCard());
// }

export {renderCard, Card};