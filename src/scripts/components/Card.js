export default class Card {
  constructor(cardData, templateSelector, zoomImage, openPopupWithSubmit, likeHandler) {
    this.cardData = cardData,
    this._myId = this.cardData.myId,
    this._ownerId = this.cardData.owner._id,
    this._cardId =cardData._id
    this.templateSelector = templateSelector,
    this._link = this.cardData.link,
    this._name = this.cardData.name,
    this._zoomImage = zoomImage,
    this._element = this._getTemplate(),
    this._cardImage = this._element.querySelector(".element__photo"),
    this._openPopupWithSubmit = openPopupWithSubmit,
    this._likesArray = cardData.likes,
    this._likesCounter = this._element.querySelector('.element__likes-counter'),
    this._likeHandler = likeHandler
  }
  removeCard(){
    this._element.remove();
    this._element = null;
  }

  toggleLike = (likes) => {
    this._buttonLike.classList.toggle("element__like-button_active");
    this._likesCounter.textContent = likes.length
  };

  _setEventListeners = () => {
    this._buttonLike.addEventListener("click", () => this._handleLike());
    this._buttonDelete.addEventListener("click", ()=> this._openPopupWithSubmit({card: this, cardId: this._cardId}));
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
    this._hideDeleteButton()
    this._setEventListeners();
    this._getLikesInfo()
    return this._element;
  };

  _isLiked() {
    if(this._buttonLike.classList.contains("element__like-button_active")){
      return true
    }
    else{
      return false
    }
  }

  _handleLike() {
    this._likeHandler(this._cardId);
  }

  _hideDeleteButton = () =>{
    if(this._myId !== this._ownerId) {
      this._buttonDelete.remove()
    }
  }

  _getLikesInfo = () => {
    this._likesArray.forEach(like => {
      if (like._id === this._myId){
        this._handleLike()
        return
      }
      this._likesCounter.textContent = this._likesArray.length
    });
  }



}
