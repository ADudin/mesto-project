import { handleImagePopupData } from './modalImage.js';
import { profile } from './profile.js';

import { 
  deleteCard,
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

const handleLikeClick = (clickElement, cardData, likesCountElement) => {
  const isLiked = clickElement.classList.contains('card__like-button_active');
  
  if (isLiked) {
    deleteLike(cardData)
      .then((data) => {
        updateLikesCountElement(likesCountElement, data.likes.length);
    });
  } else {
    setLike(cardData)
      .then((data) => {
        updateLikesCountElement(likesCountElement, data.likes.length);
    });
  }
}

const createNewCard = (cardData) => {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardLikeButton = card.querySelector('.card__like-button');
  const cardLikeCount = card.querySelector('.card__like-value');
  const cardRemoveButton = card.querySelector('.card__remove-button');
  const userId = profile.getAttribute('data-id');

  card.querySelector('.card__title').textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = `Фотография ${cardData.name}`;
  
  updateLikesCountElement(cardLikeCount, cardData.likes.length);

  if (userId !== cardData.owner._id) {
    cardRemoveButton.remove();
  }

  updateIsCardLikedElement(cardData, userId, cardLikeButton);

  cardLikeButton.addEventListener('click', (evt) => {
    handleLikeClick(evt.target, cardData, cardLikeCount);
    evt.target.classList.toggle('card__like-button_active');
  });

  cardRemoveButton.addEventListener('click', () => {
    deleteCard(cardData);
    card.remove();
  });

  cardImage.addEventListener('click', () => {
    handleImagePopupData(cardData);
  });

  return card;
}

const renderCard = (cardData, container) => {
  const newCard = createNewCard(cardData);
  container.prepend(newCard);
}

export {renderCard};