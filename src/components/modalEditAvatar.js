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

// const handleUserAvatarFormSubmit = (evt) => {
//   evt.preventDefault();
//   renderLoading(true, submitButtonEditAvatar,'Сохранение...', 'Сохранить');
//   const userData = {};
//   //console.log(userData)
//
//   userData.avatar = avatarInput.value;
//
//   updateUserAvatar(userData)
//     .then(() => {
//       userAvatarElement.src = userData.avatar;
//       userAvatarElement.alt = 'Изображение аватара пользователя';
//       closePopup(popupEditUserAvatar);
//     })
//     .catch((error) => {
//       console.log(`Ошибка обновления аватара пользователя. Ошибка ${error}`);
//     })
//     .finally(() => {
//       renderLoading(false, submitButtonEditAvatar, 'Сохранение...', 'Сохранить');
//     }
//   );
// }

// const handleOpenUserAvatarForm = () => {
//   avatarInput.value = userAvatarElement.src;
//   openPopup(popupEditUserAvatar);
// }

export {
  editUserAvatarButton,
  //userAvatarForm,
 // handleUserAvatarFormSubmit,
  //handleOpenUserAvatarForm,
  submitButtonEditAvatar,
  popupEditUserAvatar
};