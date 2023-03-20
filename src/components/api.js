import { checkResponse } from './utils.js';

export default class Api {
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

  // получение карточек от сервера

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
    .then(this._checkResponse);
  }

  // получение информации о пользователе

  getUserData () {
     return fetch(`${this._baseUrl}/users/me`, {
       headers: this._headers,
     })
    .then(this._checkResponse);
  }

  // обновление информации о пользователе

  updateUserData (userData) {
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

  // добавление новой карточки

  uploadNewCard (cardData)  {
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

  // удаление карточки

  deleteCard(cardData) {
    return fetch(`${this._baseUrl}/cards/${cardData._id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._checkResponse);
  }

  // добавление лайка

  setLike(cardData) {
    return fetch(`${this._baseUrl}/cards/likes/${cardData._id}`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then(checkResponse);
  }

  // удаление лайка

  deleteLike (cardData) {
    return fetch(`${this._baseUrl}/cards/likes/${cardData._id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(checkResponse);
  }

  // обноваление аватара пользователя

  updateUserAvatar (userData) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(userData)
    })
    .then(this._checkResponse);
  }
};