export default class Card {
  constructor(cardData, templateSelector, zoomImage) {
    (this.cardData = cardData),
      (this.templateSelector = templateSelector),
      (this._link = this.cardData.link),
      (this._name = this.cardData.name),
      (this._zoomImage = zoomImage),
      (this._element = this._getTemplate()),
      (this._cardImage = this._element.querySelector(".element__photo"));
  }

  _setEventListeners = () => {
    this._buttonLike.addEventListener("click", () => this._toggleLike());
    this._buttonDelete.addEventListener("click", () => this._removeCard());
    this._cardImage.addEventListener("click", () => this._zoomImage());
  };

  _getTemplate = () => {
    return document
      .querySelector(this.templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
  };

  createCard = () => {
    this._element.querySelector(".element__name").textContent = this._name;
    this._cardImage.alt = this._element.querySelector(".element__name").textContent;
    this._buttonDelete = this._element.querySelector(".element__trash-button");
    this._cardImage.src = this._link;
    this._buttonLike = this._element.querySelector(".element__like-button");
    this._setEventListeners();
    return this._element;
  };

  _toggleLike = () => {
    this._buttonLike.classList.toggle("element__like-button_active");
  };

  _removeCard = () => {
    this._element.remove();
    this._element = null;
  };
}
