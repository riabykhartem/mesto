export default class Section {
  constructor(renderer, cardsContainerSelector) {
    this._cardsContainerSelector = document.querySelector(
      cardsContainerSelector
    ),
    this.renderer = renderer;
  }
  addInitialCards(initialCardsArray) {
    initialCardsArray.forEach((element) => {
      this.addItem(this.renderer(element));
    });
  }
  addItem = (element) => {
    this._cardsContainerSelector.prepend(element);
  };
}
