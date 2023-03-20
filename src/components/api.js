import { checkResponse } from './utils.js';


class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse (res){ // приватный метод проверки статуса ответа от сервера
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка ${res.status}`);
  }

  getInitialCards() { // получение карточек от сервера
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
    .then(this._checkResponse);
  }

  getUserData () { // получение информации о пользователе
     return fetch(`${this._baseUrl}/users/me`, {
       headers: this._headers,
     })
    .then(this._checkResponse);
  }

  updateUserData (userData) { // обновление информации о пользователе
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,

      body: JSON.stringify({
        name: userData.name,
        about: userData.about
      })
    })
    .then(this._checkResponse);
  }

  uploadNewCard (cardData)  { // добавление новой карточки
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers:  this._headers,
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link
      })
    })
    .then(this._checkResponse);
  }

  deleteCard(cardData) { // удаление карточки
    console.log(cardData)
    return fetch(`${this._baseUrl}/cards/${cardData._id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._checkResponse);
  }

  setLike(cardData) { // добавление лайка
    return fetch(`${this._baseUrl}/cards/likes/${cardData._id}`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then(checkResponse);
  }

  deleteLike (cardData) { // удаление лайка
    return fetch(`${this._baseUrl}/cards/likes/${cardData._id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(checkResponse);
  }

  updateUserAvatar (userData) { // обноваление аватара пользователя
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(userData)
    })
    .then(this._checkResponse);
  }
}


export {
  Api,
};