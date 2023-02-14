import {openPopup} from "./modal.js";

const imagePopup = document.querySelector('.popup_type_image');
const image = imagePopup.querySelector('.popup__image');
const imageTitle = imagePopup.querySelector('.popup__image-title');

const handleImagePopupData = (cardData) => {
  image.src = cardData.link;
  image.alt = `Фотография ${cardData.name}`;
  imageTitle.textContent = cardData.name;
  openPopup(imagePopup);
}

export {handleImagePopupData};