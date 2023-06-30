export default class Popup {
  constructor(popupSelector) {
    (this._popup = document.querySelector(popupSelector)),
      (this.popupCloseButton = this._popup.querySelector(
        ".popup__close-button"
      ));
    this._form = this._popup.querySelector(".form");
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleCloseByClick = (evt) => {
    if (
      evt.target === evt.currentTarget ||
      evt.target.classList.contains("popup__close-button")
    ) {
      this.close();
    }
  };

  setEventListeners() {
    this._popup.addEventListener("click", this._handleCloseByClick);
  }

}
