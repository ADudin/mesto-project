import { 
  profile, 
  userAvatarElement 
} from './profile.js';

import { 
  openPopup,
  closePopup
} from './modal.js';

import { updateUserAvatar } from './api.js';

const editUserAvatarButton = profile.querySelector('.profile__edit-avatar-button');
const popupEditUserAvatar = document.querySelector('.popup_type_edit-user-avatar');
const userAvatarForm = document.forms['user-avatar'];
const avatarInput = userAvatarForm.querySelector('#user-avatar');

const handleUserAvatarFormSubmit = (evt) => {
  evt.preventDefault();

  const userData = {};

  userData.avatar = avatarInput.value;
  userAvatarElement.src = userData.avatar;
  userAvatarElement.alt = 'Изображение аватара пользователя';

  updateUserAvatar(userData);
  closePopup(popupEditUserAvatar);
}

const handleOpenUserAvatarForm = () => {
  avatarInput.value = userAvatarElement.src;
  openPopup(popupEditUserAvatar);
}

export {
  editUserAvatarButton,
  userAvatarForm,
  handleUserAvatarFormSubmit,
  handleOpenUserAvatarForm
};