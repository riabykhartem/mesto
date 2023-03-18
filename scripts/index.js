// DOM элементы
const popupElement = document.querySelector(".popup");
const popupOpenButton = document.querySelector(".profile__edit-button");
const popupCloseButton = popupElement.querySelector(".popup__close-button");
const nameInput = popupElement.querySelector(".form__input_name");
const descriptionInput = popupElement.querySelector(".form__input_description");
const saveButton = popupElement.querySelector(".form__save-button");
const nameElement = document.querySelector(".profile__name");
const descriptionElement = document.querySelector(".profile__description");
let formElement = document.querySelector(".form");

// функции открытия закрытия попапа попапа
const openPopup = function () {
  nameInput.value = nameElement.textContent;
  descriptionInput.value = descriptionElement.textContent;
  popupElement.classList.add("popup_opened");
};
const closePopup = function () {
  popupElement.classList.remove("popup_opened");
};
popupOpenButton.addEventListener("click", openPopup);
popupCloseButton.addEventListener("click", closePopup);

// фукция изменения текстового содержания

function handleFormSubmit(evt) {
  evt.preventDefault();
  nameElement.textContent = nameInput.value;
  descriptionElement.textContent = descriptionInput.value;
  closePopup();
}
formElement.addEventListener("submit", handleFormSubmit);
