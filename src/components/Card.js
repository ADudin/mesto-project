
export default class Card {
  constructor({
      id,
      name,
      link,
      likes,
      owner,
      handleRemoveCard,
      handleLikeClick,
      handleOpenImagePopup
    }, templateSelector) {
    this._id = id;
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._owner = owner;
    this._templateSelector = templateSelector;
    this._handleRemoveCard = handleRemoveCard;
    this._handleLikeClick = handleLikeClick;
    this._handleOpenImagePopup = handleOpenImagePopup;
  }

  //получение тимплейта
  _getElement() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  // счетчик лайков
  updateLikesCountElement(element, value) {
    if (value === 0) {
      element.textContent = '';
    } else {
      element.textContent = value;
    }
  }

  //постановка лайка
  _updateIsCardLikedElement(likes, userId, element) {
    if (likes.length !== 0) {
      likes.forEach((like) => {
        if (Object.values(like).includes(userId)) {
          element.classList.add('card__like-button_active');
        }
      })
    }
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener('click', (evt) => {
      this._handleLikeClick(evt.target, this._id, this._cardLikeCount);
    });

    this._cardRemoveButton.addEventListener('click', () => {
      this._handleRemoveCard(this._id);
    });

    this._cardImage.addEventListener('click', () => {
      this._handleOpenImagePopup(this._link, this._name);
    });
  }

  generateCard() {
    this._card = this._getElement();

    this._cardImage = this._card.querySelector('.card__image');
    this._cardLikeButton = this._card.querySelector('.card__like-button');
    this._cardLikeCount = this._card.querySelector('.card__like-value');
    this._cardRemoveButton = this._card.querySelector('.card__remove-button');
    //this._userId = profile.getAttribute('data-id');
   this._element = document.querySelector('.profile');
   this._userId = this._element.getAttribute('data-id');// не забыть поправить


    this._card.querySelector('.card__title').textContent = this._name;
    this._card.setAttribute('data-id', this._id);
    this._cardImage.src = this._link;
    this._cardImage.alt = `Фотография ${this._name}`;

    this.updateLikesCountElement(this._cardLikeCount, this._likes.length);

    if (this._userId !== this._owner._id) {
      this._cardRemoveButton.remove();
    }

    this._updateIsCardLikedElement(this._likes, this._userId, this._cardLikeButton);


    this._setEventListeners()
    return this._card;
  }
};