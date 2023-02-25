const renderLoading = (isLoading, button, text) => {
  if (isLoading) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = text;
  }
}

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка ${res.status}`);
}

export {
  renderLoading,
  checkResponse
};