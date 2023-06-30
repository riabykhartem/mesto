import Popup from "./Popup";

export default class PopupWithSubmit extends Popup{
  constructor(popupSelector, submitFunciton){
    super(popupSelector);
    this._submitFunction = submitFunciton,
    this._submitButton = this._popup.querySelector('.form__save-button'),
    this._defualtSubmitText = this._submitButton.textContent
  }

  open = ({thisCard, cardId})=> {
    super.open();
    this._element = thisCard,
    this._cardId = cardId
  }

  setEventListeners(){
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitFunction({card: this._element, cardId: this._cardId});
      this.close()
    })
  }

  setDefualtText(){
    this._submitButton.textContent = this._defualtSubmitText
  }

  setLoadingText(){
    this._submitButton.textContent = `${this._defualtSubmitText}...`
  }
}
