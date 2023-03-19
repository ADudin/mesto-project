import { userNameElement, userJobElement } from "./constants.js";

const profile = document.querySelector('.profile');
const userAvatarElement = profile.querySelector('.profile__avatar');
const setUserData = (userData) => {
  profile.setAttribute('data-id', userData._id);
}

const renderUserInfo = (userData) => {
  userAvatarElement.src = userData.avatar;
  userNameElement.textContent = userData.name;
  userJobElement.textContent = userData.about;
}

export {
  profile,
  userNameElement,
  userJobElement,
  userAvatarElement,
  setUserData,
  renderUserInfo
};