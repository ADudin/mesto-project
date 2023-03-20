const profile = document.querySelector('.profile');
const buttonAddCard = profile.querySelector('.profile__add-button');
const newCardForm = document.forms['add-new-card'];
const cardsList = document.querySelector('.cards__list');
const submitButtonAddCard = newCardForm.querySelector('.form__submit');
const editUserAvatarButton = profile.querySelector('.profile__edit-avatar-button');
const userAvatarForm = document.forms['user-avatar'];
const submitButtonEditAvatar = userAvatarForm.querySelector('.form__submit');
const userAvatarElement = profile.querySelector('.profile__avatar');
const profileEditButton = profile.querySelector('.profile__edit-button');
const userDataForm = document.forms['profile'];
const submitButtonEditProfile = userDataForm.querySelector('.form__submit');

export {profile,
    buttonAddCard,
    newCardForm,
    profileEditButton,
    cardsList,
    submitButtonAddCard,
    editUserAvatarButton,
    submitButtonEditAvatar,
    userAvatarElement,
    submitButtonEditProfile
};