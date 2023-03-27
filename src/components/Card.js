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
    this._likesCount = likes.length;
    this._owner = owner;
    this._templateSelector = templateSelector;
    this._handleRemoveCard = handleRemoveCard;
    this._handleLikeClick = handleLikeClick;
    this._handleOpenImagePopup = handleOpenImagePopup;
    this._element = document.querySelector('.profile');
    this._userId = this._element.getAttribute('data-id');
    this._likedByUser = likes.some(like => like._id === this._userId); 
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

  // обработчик лайков
  updateLikesCountElement(isLiked, likesCount) {
    this._likedByUser = isLiked;
    this._likesCount = likesCount;
    
    if (isLiked) {
      this._cardLikeButton.classList.add('card__like-button_active');
    } else {
      this._cardLikeButton.classList.remove('card__like-button_active');
    }
    
    if (likesCount === 0) {
      this._cardLikeCount.textContent = '';
    } else {
      this._cardLikeCount.textContent = likesCount;
    }
  }

  isLiked() {
    return this._likedByUser;
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener('click', (evt) => {
      this._handleLikeClick(this);
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
    this._cardLikeButton = this._card.querySelector('.card__like-button');//
    this._cardLikeCount = this._card.querySelector('.card__like-value');//
    this._cardRemoveButton = this._card.querySelector('.card__remove-button');


    this._card.querySelector('.card__title').textContent = this._name;
    this._card.setAttribute('data-id', this._id);
    this._cardImage.src = this._link;
    this._cardImage.alt = `Фотография ${this._name}`;

    this.updateLikesCountElement(this._likedByUser, this._likesCount);

    if (this._userId !== this._owner._id) {
      this._cardRemoveButton.remove();
    }

    this._setEventListeners()

    return this._card;
  }
};