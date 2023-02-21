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
  .then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(res.status);
  })
  .catch((error) => {
    console.log(`Ошибка загрузки карточек. Ошибка ${error}`);
  });
}

const getUserData = () => {
  return fetch(`${config.serverUrl}/v1/${config.cohortId}/users/me`, {
    headers: {
      authorization: config.token
    }
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(res.status);
  })
  .catch((error) => {
    console.log(`Ошибка загрузки информации о пользователе. Ошибка ${error}`);
  });
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
  .then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(res.status);
  })
  .catch((error) => {
    console.log(`Ошибка обновления информации о пользователе. Ошибка ${error}`);
  });
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
  .then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(res.status);
  })
  .catch((error) => {
    console.log(`Ошибка добавления информации о новой карточке. Ошибка ${error}`);
  });
}

const deleteCard = (cardData) => {
  return fetch(`${config.serverUrl}/v1/${config.cohortId}/cards/${cardData._id}`, {
    method: 'DELETE',
    headers: {
      authorization: config.token,
    }
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(res.status);
  })
  .catch((error) => {
    console.log(`Ошибка удаления карточки. Ошибка ${error}`);
  });
}

const setLike = (cardData) => {
  return fetch(`${config.serverUrl}/v1/${config.cohortId}/cards/likes/${cardData._id}`, {
    method: 'PUT',
    headers: {
      authorization: config.token,
    }
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(res.status);
  })
  .catch((error) => {
    console.log(`Ошибка добавления лайка карточке. Ошибка ${error}`);
  });
}

const deleteLike = (cardData) => {
  return fetch(`${config.serverUrl}/v1/${config.cohortId}/cards/likes/${cardData._id}`, {
    method: 'DELETE',
    headers: {
      authorization: config.token,
    }
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(res.status);
  })
  .catch((error) => {
    console.log(`Ошибка удаления лайка у карточки. Ошибка ${error}`);
  });
}

export {
  getCards,
  getUserData,
  updateUserData,
  uploadNewCard,
  deleteCard,
  setLike,
  deleteLike
};