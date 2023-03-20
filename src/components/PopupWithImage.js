import {
  Popup
} from "./popup.js";

class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._image = this._popup.querySelector('.popup__image');
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
  PopupWithImage
};