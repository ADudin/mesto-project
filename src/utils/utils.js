const renderLoading = (isLoading, button, loadingText, text) => {
  if (isLoading) {
    button.textContent = loadingText;
  } else {
    button.textContent = text;
  }
}

// const renderCard = (card, container) => {
//   container.prepend(card);
// }

export {
  renderLoading,
  //renderCard
};