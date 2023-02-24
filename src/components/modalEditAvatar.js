import { 
  profile, 
  userAvatarElement 
} from './profile.js';

import { 
  openPopup,
  closePopup
} from './modal.js';

import { updateUserAvatar } from './api.js';
import { renderLoading } from './utils.js';

const editUserAvatarButton = profile.querySelector('.profile__edit-avatar-button');
const popupEditUserAvatar = document.querySelector('.popup_type_edit-user-avatar');
const userAvatarForm = document.forms['user-avatar'];
const avatarInput = userAvatarForm.querySelector('#user-avatar');
const submitButtonEditAvatar = userAvatarForm.querySelector('.form__submit');

const handleUserAvatarFormSubmit = (evt) => {
  evt.preventDefault();
  renderLoading(true, submitButtonEditAvatar, 'Сохранить');
  
  const userData = {};

  userData.avatar = avatarInput.value;
  userAvatarElement.src = userData.avatar;
  userAvatarElement.alt = 'Изображение аватара пользователя';

  updateUserAvatar(userData)
    .finally(() => {
      renderLoading(false, submitButtonEditAvatar, 'Сохранить');
    }
  );

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