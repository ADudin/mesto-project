const profile = document.querySelector('.profile');
const userAvatarElement = profile.querySelector('.profile__avatar');
const userNameElement = profile.querySelector('.profile__user-name');
const userJobElement = profile.querySelector('.profile__user-description');

const setUserId = (userData) => {
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
  setUserId,
  renderUserInfo
};