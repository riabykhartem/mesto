import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitFunction) {
    super(popupSelector),
    this._submitFunction = submitFunction,
    this._form = this._popup.querySelector(".form"),
    this._inputList = this._form.querySelectorAll(".form__input"),
    this.sumbitButton = this._popup.querySelector('.form__save-button'),
    this._defualtSubmitText = this.sumbitButton.textContent
  }

  _getInputValues = () => {
    this._values = {};
    this._inputList.forEach((element) => {
    this._values[element.name] = element.value;
    });
    return this._values;
  };

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners= () => {
    super.setEventListeners(),
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault(),
      this._submitFunction(this._getInputValues())});
  }

  close() {
    super.close(),
    this._form.reset();
  }

  setDefualtText(){
    this.sumbitButton.textContent = this._defualtSubmitText
  }
  setLoadingText(){
    this.sumbitButton.textContent = `Сохранение...`
  }
}
