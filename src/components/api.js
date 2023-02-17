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
  })
}

export {getCards};