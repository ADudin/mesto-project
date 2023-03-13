import {
  //handleImagePopupData,
  PopupWithImage
} from './modalImage.js';

import { profile } from './profile.js';
import { openPopup } from './modal.js';

import {
  popupRemoveCard,
  //PopupDeleteCard
} from './modalRemoveCard.js';

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
    //const popupDeleteCard = new PopupDeleteCard('.popup_type_remove');
    //popupDeleteCard.open(cardData._id, api);
  });

  // cardImage.addEventListener('click', () => {
  //   handleImagePopupData(cardData);
  // });

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
export class Card {
    constructor(cardData, templateSelector) {
        this._cardData = cardData;
        this._templateSelector = templateSelector;
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
    _updateLikesCountElement(element, value) {
        if (value === 0) {
            element.textContent = '';
        } else {
            element.textContent = value;
        }
    }
//постановка лайка
    _updateIsCardLikedElement(cardData, userId, element) {
        if (cardData.likes.length !== 0) {
            cardData.likes.forEach((like) => {
                if (Object.values(like).includes(userId)) {
                    element.classList.add('card__like-button_active');
                }
            })
        }
    }

    _handleLikeClick(likeElement, cardData, likesCountElement) {
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

    generateCard() {
        const card = this._getElement();
        this.cardImage = card.querySelector('.card__image');
       this.cardLikeButton = card.querySelector('.card__like-button');
        this.cardLikeCount = card.querySelector('.card__like-value');
        this.cardRemoveButton = card.querySelector('.card__remove-button');
        this.userId = profile.getAttribute('data-id');

        card.querySelector('.card__title').textContent = this._cardData.name;
        card.setAttribute('data-id', this._cardData._id);
        this.cardImage.src = this._cardData.link;
        this.cardImage.alt = `Фотография ${this._cardData.name}`;

        this._updateLikesCountElement(this.cardLikeCount, this._cardData.likes.length);

        if (this.userId !== this._cardData.owner._id) {
            this.cardRemoveButton.remove();
        }

        this._updateIsCardLikedElement(this._cardData, userId, this.cardLikeButton);

        this.cardLikeButton.addEventListener('click', (evt) => {
            this._handleLikeClick(evt.target, this._cardData, this.cardLikeCount);
        });

        this.cardRemoveButton.addEventListener('click', () => {
            openPopup(popupRemoveCard);
            popupRemoveCard.setAttribute('data-id', this._cardData._id);
        });

        // cardImage.addEventListener('click', () => {
        //     handleImagePopupData(cardData);
        // });

        this.cardImage.addEventListener('click', () => {
            const popupWithImage = new PopupWithImage('.popup_type_image');
            popupWithImage.open(this._cardData.link, this._cardData.name);
        });

        return card;
    }
}


  //======================================================================================================

export {renderCard};