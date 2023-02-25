const renderLoading = (isLoading, button, loadingText, text) => {
  if (isLoading) {
    button.textContent = loadingText;
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