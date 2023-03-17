import {api} from "./index";

export default class UserInfo {
    constructor({ userName, userAbout}) {
        this._userName = document.querySelector(userName);
        this._userAbout = document.querySelector(userAbout);
    }
    getUserInfo(){
      const  userData = {};
      userData.name = this._userName.textContent;
      userData.about = this._userAbout.textContent;

      return userData;
    }
    setUserInfo(name, about){
        this._userName.textContent = name;
        this._userAbout.textContent = about;
    }
}

