const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');
const addNewCardButton = profile.querySelector('.profile__add-button');
const popups = document.querySelectorAll('.popup');
const editUserDataPopup = document.querySelector('.popup_type_edit-user-data');
const addNewCardPopup = document.querySelector('.popup_type_add-new-card');

// Popup close/open

const popupOpeningAnimation = [
  {
    visibility: 'hidden',
    opacity: 0
  },
  {
    visibility: 'visible',
    opacity: 1
  }
];

const popupClosingAnimation = [
  {
    visibility: 'visible',
    opacity: 1
  },
  {
    visibility: 'hidden',
    opacity: 0
  }
];

const popupAnimationTiming = {
  duration: 500,
  iterations: 1
}

const popupClosingHandler = () => {
  const popup = document.querySelector('.popup_opened');

  closePopup(popup);
}

const openPopup = (popup) => {
  popup.animate(popupOpeningAnimation, popupAnimationTiming);
  popup.classList.add('popup_opened');

  const popupCloseButton = popup.querySelector('.popup__close-button');
  popupCloseButton.addEventListener('click', popupClosingHandler);
}

const closePopup = (popup) => {
  popup.animate(popupClosingAnimation, popupAnimationTiming);
  popup.classList.remove('popup_opened');

  const popupCloseButton = popup.querySelector('.popup__close-button');
  const formElement = popup.querySelector('.form');

  if (formElement) {
    formElement.reset();
  }

  popupCloseButton.removeEventListener('click', popupClosingHandler);
}

// userData processing

const userNameElement = profile.querySelector('.profile__user-name');
const userJobElement = profile.querySelector('.profile__user-description');
const userDataFrom = editUserDataPopup.querySelector('.form');
const nameInput = editUserDataPopup.querySelector('#user-name');
const jobInput = editUserDataPopup.querySelector('#user-description');

handleUserDataFormSubmit = () => {
  const name = nameInput.value;
  const job = jobInput.value;

  userNameElement.textContent = name;
  userJobElement.textContent = job;
  nameInput.placeholder = name;
  jobInput.placeholder = job;
}

handleUserDataForm = () => {
  nameInput.value = userNameElement.textContent;
  jobInput.value = userJobElement.textContent;

  userDataFrom.addEventListener('submit', (evt) => {
    evt.preventDefault();
    handleUserDataFormSubmit();
  });
}

profileEditButton.addEventListener('click', () => {
  openPopup(editUserDataPopup);
  handleUserDataForm();
});

addNewCardButton.addEventListener('click', () => {
  openPopup(addNewCardPopup);
})