import { 
  closePopup, 
  Popup 
} from './modal.js';

import { deleteCard } from './api';
import { renderLoading } from './utils.js';

const popupRemoveCard = document.querySelector('.popup_type_remove');
const buttonConfirm = popupRemoveCard.querySelector('.popup__button');

const handleCardRemove = () => { // удалить после перевода попапа с созданием карточки в класс
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

class PopupDeleteCard extends Popup {
  constructor(selector, cardId) {
    super(selector);
    this._buttonConfirm = document.querySelector('.popup__button');
    this._cardId = cardId;
  }

  _handleRemoveCard(api) {
    const cardData = {};
    cardData._id = this._cardId;
    
    const cardToDelete = document.querySelector(`.card[data-id='${cardData._id}']`);
    
    renderLoading(true, this._buttonConfirm, 'Удаление...', 'Да');
    
    api.deleteCard(cardData)
      .then(() => {
        cardToDelete.remove();
        this.close();
      })
      .catch((error) => {
        console.log(`Ошибка удаления карточки. Ошибка ${error}`);
      })
      .finally(() => {
        renderLoading(false, buttonConfirm, 'Удаление...', 'Да');
      }
    );
  }

  open(api) {
    this._buttonConfirm.addEventListener('click', () => {
      this._handleRemoveCard(api);
    });

    super.open();
  }
}

export {
  PopupDeleteCard,
  popupRemoveCard,
  //buttonConfirm,
  //handleCardRemove
}