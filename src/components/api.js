import { checkResponse } from './utils.js';

const config = {
  cohortId: 'plus-cohort-21',
  token: 'e22a7236-eb1c-4145-a157-f86fa0ccbc4e',
  serverUrl: 'https://mesto.nomoreparties.co'
}

const getCards = () => {
  return fetch(`${config.serverUrl}/v1/${config.cohortId}/cards`, {
    headers: {
      authorization: config.token
    }
  })
  .then(checkResponse);
}

const getUserData = () => {
  return fetch(`${config.serverUrl}/v1/${config.cohortId}/users/me`, {
    headers: {
      authorization: config.token
    }
  })
  .then(checkResponse);
}

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
  getCards,
  getUserData,
  updateUserData,
  updateUserAvatar,
  uploadNewCard,
  deleteCard,
  setLike,
  deleteLike
};