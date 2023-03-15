import { profile } from './profile.js';
import { closePopup } from './modal.js';
import { renderCard } from './card.js';
import { uploadNewCard } from './api.js';
import { renderLoading } from './utils.js';

const buttonAddCard = profile.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_add-new-card');
const newCardForm = document.forms['add-new-card'];
const newCardNameInput = popupAddCard.querySelector('#card-name');
const newCardImageLinkInput = popupAddCard.querySelector('#card-image');
const cardsList = document.querySelector('.cards__list');
const submitButtonAddCard = newCardForm.querySelector('.form__submit');

const handleNewCardFormSubmit = (evt) => {
  evt.preventDefault();
  renderLoading(true, submitButtonAddCard, 'Сохранение...', 'Создать');

  const cardData = {
    name: newCardNameInput.value,
    link: newCardImageLinkInput.value,
  }

  uploadNewCard(cardData)
    .then((cardData) => {
      renderCard(cardData, cardsList);
      evt.target.reset();
      closePopup(popupAddCard);
    })
    .catch((error) => {
      console.log(`Ошибка добавления информации о новой карточке. Ошибка ${error}`);
    })
    .finally(() => {
      renderLoading(false, submitButtonAddCard, 'Сохранение...', 'Создать');
    }
  );
}

export {
  buttonAddCard,
  popupAddCard, 
  newCardForm,
  cardsList,
  handleNewCardFormSubmit,
  submitButtonAddCard
};