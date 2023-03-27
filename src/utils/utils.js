const renderLoading = (isLoading, button, loadingText, text) => {
  if (isLoading) {
    button.textContent = loadingText;
  } else {
    button.textContent = text;
  }
}

export {
  renderLoading
};