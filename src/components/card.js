import {handleImagePopupData} from './modalImage.js';

import { 
  getUserData,
  deleteCard
} from './api.js';

const cardTemplate = document.querySelector('#card-template').content;

const createNewCard = (cardData) => {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardLikeButton = card.querySelector('.card__like-button');
  const cardLikeCount = card.querySelector('.card__like-value');
  const cardRemoveButton = card.querySelector('.card__remove-button');

  card.querySelector('.card__title').textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = `Фотография ${cardData.name}`;

  if (cardData.likes.length === 0) {
    cardLikeCount.textContent = '';
  } else {
    cardLikeCount.textContent = cardData.likes.length;
  }

  cardLikeButton.addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__like-button_active');
  });

  getUserData()
    .then((userData) => {
      if (userData._id !== cardData.owner._id) {
        cardRemoveButton.remove();
      }
    }
  );

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