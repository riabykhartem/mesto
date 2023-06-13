import { Popup } from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitFunction) {
    super(popupSelector),
    this._submitFunction = submitFunction,
    this._form = this._popup.querySelector(".form"),
    this._inputList = this._form.querySelectorAll(".form__input");
  }

  //"Содержит приватный метод _getInputValues, который собирает данные всех полей формы."
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
  //"Перезаписывает родительский метод setEventListeners. Метод setEventListeners класса PopupWithForm должен
  // не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы."
  setEventListeners= () => {
    super.setEventListeners(),
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault(),
      this._submitFunction(this._getInputValues())});
  }

  close() {
    super.close(), this._form.reset();
  }
  su
}
