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


const config = {
  cohortId: 'plus-cohort-21',
  token: 'e22a7236-eb1c-4145-a157-f86fa0ccbc4e',
  serverUrl: 'https://mesto.nomoreparties.co'
}

// const getCards = () => {
//   return fetch(`${config.serverUrl}/v1/${config.cohortId}/cards`, {
//     headers: {
//       authorization: config.token
//     }
//   })
//   .then(checkResponse);
// }

// const getUserData = () => {
//   return fetch(`${config.serverUrl}/v1/${config.cohortId}/users/me`, {
//     headers: {
//       authorization: config.token
//     }
//   })
//   .then(checkResponse);
// }

const updateUserData = (userData) => {
  return fetch(`${config.serverUrl}/v1/${config.cohortId}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: config.token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: userData.name,
      about: userData.about
    })
  })
  .then(checkResponse);
}

const uploadNewCard = (cardData) => {
  return fetch(`${config.serverUrl}/v1/${config.cohortId}/cards`, {
    method: 'POST',
    headers: {
      authorization: config.token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: cardData.name,
      link: cardData.link
    })
  })
  .then(checkResponse);
}

const deleteCard = (cardData) => {
  return fetch(`${config.serverUrl}/v1/${config.cohortId}/cards/${cardData._id}`, {
    method: 'DELETE',
    headers: {
      authorization: config.token,
    }
  })
  .then(checkResponse);
}

const setLike = (cardData) => {
  return fetch(`${config.serverUrl}/v1/${config.cohortId}/cards/likes/${cardData._id}`, {
    method: 'PUT',
    headers: {
      authorization: config.token,
    }
  })
  .then(checkResponse);
}

const deleteLike = (cardData) => {
  return fetch(`${config.serverUrl}/v1/${config.cohortId}/cards/likes/${cardData._id}`, {
    method: 'DELETE',
    headers: {
      authorization: config.token,
    }
  })
  .then(checkResponse);
}

const updateUserAvatar = (userData) => {
  return fetch(`${config.serverUrl}/v1/${config.cohortId}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: config.token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: userData.avatar
    })
  })
  .then(checkResponse);
}

export {
  Api,
  //getCards,
  //getUserData,
  updateUserData,
  updateUserAvatar,
  uploadNewCard,
  deleteCard,
  setLike,
  deleteLike
};