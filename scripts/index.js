const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');
const buttonAddCard = profile.querySelector('.profile__add-button');
const userNameElement = profile.querySelector('.profile__user-name');
const userJobElement = profile.querySelector('.profile__user-description');

const popupEditProfile = document.querySelector('.popup_type_edit-user-data');
const popupAddCard = document.querySelector('.popup_type_add-new-card');
const popupCloseButtons = document.querySelectorAll('.popup__close-button');

const userDataForm = popupEditProfile.querySelector('.form');
const nameInput = popupEditProfile.querySelector('#user-name');
const jobInput = popupEditProfile.querySelector('#user-description');

const imagePopup = document.querySelector('.popup_type_image');
const image = imagePopup.querySelector('.popup__image');
const imageTitle = imagePopup.querySelector('.popup__image-title');

const cardsList = document.querySelector('.cards__list');
const newCardForm = popupAddCard.querySelector('.form');
const newCardNameInput = popupAddCard.querySelector('#card-name');
const newCardImageLinkInput = popupAddCard.querySelector('#card-image');
const cardTemplate = document.querySelector('#card-template').content;

// popup close/open

const handleClosePopup = (evt) => {
  closePopup(evt.target.closest('.popup'));
}

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
}

// user data processing

const handleUserDataFormSubmit = (evt) => {
  evt.preventDefault();

  const name = nameInput.value;
  const job = jobInput.value;

  userNameElement.textContent = name;
  userJobElement.textContent = job;

  closePopup(popupEditProfile);
}

const handleOpenUserDataForm = () => {
  nameInput.value = userNameElement.textContent;
  jobInput.value = userJobElement.textContent;
  openPopup(popupEditProfile);
}

// image popup

const handleImagePopupData = (cardData) => {
  image.src = cardData.link;
  image.alt = `Фотография ${cardData.name}`;
  imageTitle.textContent = cardData.name;
  openPopup(imagePopup);
}

// new cards adding & removing

const createNewCard = (cardData) => {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardLikeButton = card.querySelector('.card__like-button');
  const cardRemoveButton = card.querySelector('.card__remove-button');

  card.querySelector('.card__title').textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = `Фотография ${cardData.name}`;

  cardLikeButton.addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__like-button_active');
  });

  cardRemoveButton.addEventListener('click', () => {
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

// new card data processing

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

// initial cards rendering

initialCards.forEach((item) => {
  renderCard(item, cardsList);
});

// main eventListeners

profileEditButton.addEventListener('click', handleOpenUserDataForm);

buttonAddCard.addEventListener('click', () => {
  openPopup(popupAddCard);
  handleNewCardForm();
});

popupCloseButtons.forEach((item) => {
  item.addEventListener('click', handleClosePopup);
});

userDataForm.addEventListener('submit', handleUserDataFormSubmit);

newCardForm.addEventListener('submit', handleNewCardFormSubmit);