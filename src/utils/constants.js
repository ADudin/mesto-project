const profile = document.querySelector('.profile');
const buttonAddCard = profile.querySelector('.profile__add-button');
const newCardForm = document.forms['add-new-card'];
const submitButtonAddCard = newCardForm.querySelector('.form__submit');
const editUserAvatarButton = profile.querySelector('.profile__edit-avatar-button');
const userAvatarForm = document.forms['user-avatar'];
const submitButtonEditAvatar = userAvatarForm.querySelector('.form__submit');
const profileEditButton = profile.querySelector('.profile__edit-button');
const userDataForm = document.forms['profile'];
const submitButtonEditProfile = userDataForm.querySelector('.form__submit');

const validationParams = {
  formSelector: '.form',
  fieldsetSelector: '.form__set',
  inputSelector: '.form__item',
  getErrorInputSelector: (inputId) => `.${inputId}-input-error`,
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__item-error_active'
};

export {
  profile,
  buttonAddCard,
  newCardForm,
  profileEditButton,
  submitButtonAddCard,
  editUserAvatarButton,
  submitButtonEditAvatar,
  submitButtonEditProfile,
  validationParams
};