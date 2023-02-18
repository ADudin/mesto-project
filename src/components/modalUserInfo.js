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

const popupEditProfile = document.querySelector('.popup_type_edit-user-data');
const profileEditButton = profile.querySelector('.profile__edit-button');
const userDataForm = document.forms['profile'];
const nameInput = popupEditProfile.querySelector('#user-name');
const jobInput = popupEditProfile.querySelector('#user-description');


const handleUserDataFormSubmit = (evt) => {
  evt.preventDefault();

  const userData = {};

  userData.name = nameInput.value;
  userData.about = jobInput.value;

  userNameElement.textContent = userData.name;
  userJobElement.textContent = userData.about;

  updateUserData(userData);
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