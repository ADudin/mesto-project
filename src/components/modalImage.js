import {
  //openPopup,
  Popup
} from "./modal.js";

// const imagePopup = document.querySelector('.popup_type_image');
// const image = imagePopup.querySelector('.popup__image');
// const imageTitle = imagePopup.querySelector('.popup__image-title');

// const handleImagePopupData = (cardData) => {
//   image.src = cardData.link;
//   image.alt = `Фотография ${cardData.name}`;
//   imageTitle.textContent = cardData.name;
//   openPopup(imagePopup);
// }

class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._image = this._popup.querySelector('.popup__image');;
    this._title = this._popup.querySelector('.popup__image-title');
  }

  open(link, name) {
    this._image.src = link;
    this._image.alt = name;
    this._title.textContent = name;

    super.open();
  }
}

export {
  //handleImagePopupData,
  PopupWithImage
};