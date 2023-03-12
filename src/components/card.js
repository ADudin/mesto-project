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

export {renderCard};