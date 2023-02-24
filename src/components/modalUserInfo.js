import { 
  profile,
  userNameElement,
  userJobElement
} from './profile.js';

import {
  closePopup,
  openPopup
} from './modal.js';

import { updateUserData } from './api.js';
import { renderLoading } from './utils.js';

const popupEditProfile = document.querySelector('.popup_type_edit-user-data');
const profileEditButton = profile.querySelector('.profile__edit-button');
const userDataForm = document.forms['profile'];
const nameInput = popupEditProfile.querySelector('#user-name');
const jobInput = popupEditProfile.querySelector('#user-description');
const submitButtonEditProfile = userDataForm.querySelector('.form__submit');

const handleUserDataFormSubmit = (evt) => {
  evt.preventDefault();
  renderLoading(true, submitButtonEditProfile, 'Сохранить');

  const userData = {};

  userData.name = nameInput.value;
  userData.about = jobInput.value;

  userNameElement.textContent = userData.name;
  userJobElement.textContent = userData.about;

  updateUserData(userData)
    .finally(() => {
      renderLoading(false, submitButtonEditProfile, 'Сохранить');
    }
  );

  closePopup(popupEditProfile);
}

const handleOpenUserDataForm = () => {
  nameInput.value = userNameElement.textContent;
  jobInput.value = userJobElement.textContent;
  openPopup(popupEditProfile);
}

export {
  profileEditButton, 
  userDataForm, 
  handleUserDataFormSubmit, 
  handleOpenUserDataForm
};