const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');
const addNewCardButton = profile.querySelector('.profile__add-button');
const popups = document.querySelectorAll('.popup');
const editUserDataPopup = document.querySelector('.popup_type_edit-user-data');
const addNewCardPopup = document.querySelector('.popup_type_add-new-card');

// popup close/open

const openingAnimation = [
  {
    visibility: 'hidden',
    opacity: 0
  },
  {
    visibility: 'visible',
    opacity: 1
  }
];

const closingAnimation = [
  {
    visibility: 'visible',
    opacity: 1
  },
  {
    visibility: 'hidden',
    opacity: 0
  }
];

const animationTiming = {
  duration: 500,
  iterations: 1
}

const popupClosingHandler = () => {
  const popup = document.querySelector('.popup_opened');

  closePopup(popup);
}

const openPopup = (popup) => {
  popup.animate(openingAnimation, animationTiming);
  popup.classList.add('popup_opened');

  const popupCloseButton = popup.querySelector('.popup__close-button');
  popupCloseButton.addEventListener('click', popupClosingHandler);
}

const closePopup = (popup) => {
  popup.animate(closingAnimation, animationTiming);
  popup.classList.remove('popup_opened');

  const popupCloseButton = popup.querySelector('.popup__close-button');
  const formElement = popup.querySelector('.form');

  if (formElement) {
    formElement.reset();
  }

  popupCloseButton.removeEventListener('click', popupClosingHandler);
}

// user data processing

const userNameElement = profile.querySelector('.profile__user-name');
const userJobElement = profile.querySelector('.profile__user-description');
const userDataFrom = editUserDataPopup.querySelector('.form');
const nameInput = editUserDataPopup.querySelector('#user-name');
const jobInput = editUserDataPopup.querySelector('#user-description');

const handleUserDataFormSubmit = (evt) => {
  evt.preventDefault();
  const name = nameInput.value;
  const job = jobInput.value;

  userNameElement.textContent = name;
  userJobElement.textContent = job;
  nameInput.placeholder = name;
  jobInput.placeholder = job;
  userDataFrom.removeEventListener('submit', handleUserDataFormSubmit);
}

const handleUserDataForm = () => {
  nameInput.value = userNameElement.textContent;
  jobInput.value = userJobElement.textContent;

  userDataFrom.addEventListener('submit', handleUserDataFormSubmit);
}

// image popup

const imagePopup = document.querySelector('.popup_type_image');
const image = imagePopup.querySelector('.popup__image');
const imageTitle = imagePopup.querySelector('.popup__image-title');

const handleImagePopupData = (name, link) => {
  image.src = link;
  image.alt = 'Фотогрфия ' + name;
  imageTitle.textContent = name;
}

// new cards adding & removing

const cardsList = document.querySelector('.cards__list');
const newCardForm = addNewCardPopup.querySelector('.form');
const newCardNameInput = addNewCardPopup.querySelector('#card-name');
const newCardImageLinkInput = addNewCardPopup.querySelector('#card-image');

const createNewCard = (name, link) => {
  cardListElement = document.createElement('li');
  const cardTemplate = document.querySelector('#card-template').content;
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardLikeButton = card.querySelector('.card__like-button');
  const cardRemoveButton = card.querySelector('.card__remove-button');

  card.querySelector('.card__title').textContent = name;
  cardImage.src = link;
  cardImage.alt = 'Фотогрфия ' + name;

  cardLikeButton.addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__like-button_active');
  });

  cardRemoveButton.addEventListener('click', () => {
    cardListElement.remove();
  });

  cardImage.addEventListener('click', () => {
    handleImagePopupData(name, link);
    openPopup(imagePopup);
  });

  cardListElement.append(card);

  return cardListElement;
}

const renderCard = (name, link, container) => {
  const newCard = createNewCard(name, link);
  container.prepend(newCard);
}

const handleNewCardFormSubmit = (evt) => {
  evt.preventDefault();
  const cardName = String(newCardNameInput.value);
  const cardImageLink = String(newCardImageLinkInput.value);
  
  renderCard(cardName, cardImageLink, cardsList);
  newCardForm.removeEventListener('submit', handleNewCardFormSubmit);
  closePopup(addNewCardPopup);
}

const handleNewCardForm = () => {
  newCardForm.addEventListener('submit', handleNewCardFormSubmit);
}

// initial cards rendering

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

initialCards.forEach((item) => {
  renderCard(item.name, item.link, cardsList);
});

// main eventListeners

profileEditButton.addEventListener('click', () => {
  openPopup(editUserDataPopup);
  handleUserDataForm();
});

addNewCardButton.addEventListener('click', () => {
  openPopup(addNewCardPopup);
  handleNewCardForm();
})