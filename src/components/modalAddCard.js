import { profile } from './profile.js';
import { closePopup } from './modal.js';
import { renderCard } from './card.js';

const buttonAddCard = profile.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_add-new-card');
const newCardForm = document.forms['add-new-card'];
const newCardNameInput = popupAddCard.querySelector('#card-name');
const newCardImageLinkInput = popupAddCard.querySelector('#card-image');
const cardsList = document.querySelector('.cards__list');

const handleNewCardFormSubmit = (evt) => {
  evt.preventDefault();
  
  const cardData = {
    name: newCardNameInput.value,
    link: newCardImageLinkInput.value
  }
  
  renderCard(cardData, cardsList);
  evt.target.reset();
  closePopup(popupAddCard);
}

export {
  buttonAddCard, 
  popupAddCard, 
  newCardForm,
  cardsList,
  handleNewCardFormSubmit
};