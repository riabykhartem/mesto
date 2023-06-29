import Popup from "./Popup";

export default class PopupWithSubmit extends Popup{
  constructor(popupSelector, submitFunciton){
    super(popupSelector);
    this._submitFunction = submitFunciton;
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


}
