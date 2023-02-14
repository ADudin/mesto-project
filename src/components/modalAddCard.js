import {
  profile,
  closePopup
} from "./modal.js";

import {renderCard} from "./card.js";

const buttonAddCard = profile.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_add-new-card');
const newCardForm = popupAddCard.querySelector('.form');
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
  closePopup(popupAddCard);
}

const handleNewCardForm = () => {
  newCardNameInput.value = '';
  newCardImageLinkInput.value = '';
}

export {
  buttonAddCard, 
  popupAddCard, 
  newCardForm,
  cardsList,
  handleNewCardFormSubmit, 
  handleNewCardForm
};