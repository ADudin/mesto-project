import { closePopup } from './modal.js';
import { deleteCard } from './api';

const popupRemoveCard = document.querySelector('.popup_type_remove');
const buttonConfirm = popupRemoveCard.querySelector('.popup__button');

const handleCardRemove = () => {
  const cardData = {};
  cardData._id = popupRemoveCard.getAttribute('data-id');
  const cardToDelete = document.querySelector(`.card[data-id='${cardData._id}']`);
  
  deleteCard(cardData)
    .catch((error) => {
      console.log(`Ошибка удаления карточки. Ошибка ${error}`);
    }
  );
  
  cardToDelete.remove();
  
  closePopup(popupRemoveCard);
}

buttonConfirm.addEventListener('click', handleCardRemove);

export {
  popupRemoveCard,
  buttonConfirm,
  handleCardRemove
}