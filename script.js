const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');
const userNameElement = profile.querySelector('.profile__user-name');
const userJobElement = profile.querySelector('.profile__user-description');
const popup = document.querySelector('.popup');
const popupCloseButton = popup.querySelector('.popup__close-button');
const formElement = popup.querySelector('.form');
const nameInput = formElement.querySelector('#user-name');
const jobInput = formElement.querySelector('#user-description');

handleFormUserData = () => {
  nameInput.placeholder = userNameElement.textContent;
  jobInput.placeholder = userJobElement.textContent;
}

handleFormSubmit = (evt) => {
  evt.preventDefault();
  const name = nameInput.value;
  const job = jobInput.value;

  userNameElement.textContent = name;
  userJobElement.textContent = job;
}

popupClosingHandler = () => {
  if (formElement) {
    formElement.reset();
  }
  
  popup.classList.remove('popup_opened');
  popupCloseButton.removeEventListener('click', popupClosingHandler);
  profileEditButton.addEventListener('click', popupOpeningHandler);
}

popupOpeningHandler = () => {
  popup.classList.add('popup_opened');

  if (formElement) {
    handleFormUserData();
    formElement.addEventListener('submit', handleFormSubmit);
  }
  
  profileEditButton.removeEventListener('click', popupOpeningHandler);
  popupCloseButton.addEventListener('click', popupClosingHandler);
}

profileEditButton.addEventListener('click', popupOpeningHandler);