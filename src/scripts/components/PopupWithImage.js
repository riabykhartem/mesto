import { Popup } from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector),
      (this._popupImage = this._popup.querySelector(".zoom__image")),
      (this._popupImageCaption = this._popup.querySelector(".zoom__caption"));
  }
  open = (cardData) => {
    this._popupImage.src = cardData.src;
    this._popupImageCaption.textContent = cardData.name;
    super.open();
  };
}
