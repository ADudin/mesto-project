import {api} from "./index";

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
      
      return userData;
    }

    setUserInfo(name, about, avatar){
      this._userName.textContent = name;
      this._userAbout.textContent = about;
      if (avatar) {
        this._userAvatar.src = avatar;
        this._userAvatar.alt = `Аватар пользователя ${name}`;
      }
    }
};

