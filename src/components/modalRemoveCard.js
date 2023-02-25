import { closePopup } from './modal.js';
import { deleteCard } from './api';
import { renderLoading } from './utils.js';

const popupRemoveCard = document.querySelector('.popup_type_remove');
const buttonConfirm = popupRemoveCard.querySelector('.popup__button');

const handleCardRemove = () => {
  const cardData = {};
  cardData._id = popupRemoveCard.getAttribute('data-id');
  const cardToDelete = document.querySelector(`.card[data-id='${cardData._id}']`);

  renderLoading(true, buttonConfirm, 'Удаление...', 'Да');
  
  deleteCard(cardData)
    .then(() => {
      cardToDelete.remove();
      closePopup(popupRemoveCard);
    })
    .catch((error) => {
      console.log(`Ошибка удаления карточки. Ошибка ${error}`);
    })
    .finally(() => {
      renderLoading(false, buttonConfirm, 'Удаление...', 'Да');
    }
  );
}

buttonConfirm.addEventListener('click', handleCardRemove);

export {
  popupRemoveCard,
  buttonConfirm,
  handleCardRemove
}