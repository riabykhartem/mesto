export default class Section {
  constructor({ items, renderer }, cardsContainerSelector) {
    (this._cardsContainerSelector = document.querySelector(
      cardsContainerSelector
    )),
      (this._initialCard = items),
      (this.renderer = renderer);
  }
  addInitialCards() {
    this._initialCard.forEach((element) => {
      this.addItem(this.renderer(element));
    });
  }
  addItem = (element) => {
    this._cardsContainerSelector.prepend(element);
  };
}
