
export default class UserInfo {
  constructor(userNameSelector, userAboutSelector, userAvatarSelector) {
    this._userName = document.querySelector(userNameSelector);
    this._userAbout = document.querySelector(userAboutSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
  }

  getUserInfo(){
    const  userData = {};
    userData.name = this._userName.textContent;
    userData.about = this._userAbout.textContent;
    userData.id = this._userId;
      
    return userData;
  }

  setUserInfo(name, about, id, avatar){
    this._userName.textContent = name;
    this._userAbout.textContent = about;
    this._id = id;
    
    if (avatar) {
      this._userAvatar.src = avatar;
      this._userAvatar.alt = `Аватар пользователя ${name}`;
    }
  }
};