import { 
  closePopup, 
  //Popup 
} from './modal.js';

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

// class PopupDeleteCard extends Popup {
//   constructor(selector) {
//     super(selector);
//     this._buttonConfirm = this._popup.querySelector('.popup__button');
//   }

//   _handleRemoveCard(cardId, api) {
//     const cardData = {};

//     cardData._id = cardId;
//     const cardToDelete = document.querySelector(`.card[data-id='${cardData._id}']`);
    
//     renderLoading(true, this._buttonConfirm, 'Удаление...', 'Да');
    
//     api.deleteCard(cardData)
//       .then(() => {
//         cardToDelete.remove();
//         this.close();
//       })
//       .catch((error) => {
//         console.log(`Ошибка удаления карточки. Ошибка ${error}`);
//       })
//       .finally(() => {
//         renderLoading(false, buttonConfirm, 'Удаление...', 'Да');
//       }
//     );
//   }

//   open(cardId, api) {
//     console.log(api);
//     super.open();

//     this._buttonConfirm.addEventListener('click', () => {
//       this._handleRemoveCard(cardId, api);
//     });
//   }
// }

export {
  //PopupDeleteCard,
  popupRemoveCard,
  buttonConfirm,
  handleCardRemove
}