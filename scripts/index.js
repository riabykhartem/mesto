// DOM элементы
const popupElement = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupCloseButton = popupElement.querySelector('.form__close-button');
const nameInput = popupElement.querySelector('.form__input-name');
const descriptionInput = popupElement.querySelector('.form__input-description');
const saveButton = popupElement.querySelector('.form__save-button');
const nameElement = document.querySelector(".profile__name");
const descriptionElement = document.querySelector('.profile__description')

// функции открытия закрытия попапа попапа
const openPopup = function () {
    popupElement.classList.add("popup_is-opened");
};
const closePopup = function () {
    popupElement.classList.remove("popup_is-opened");
}
popupOpenButton.addEventListener("click", openPopup);
popupCloseButton.addEventListener("click", closePopup);

// фукция изменения текстового содержания
let formElement = document.querySelector('.form')
function handleFormSubmit (evt) {
    evt.preventDefault();
    nameElement.textContent = nameInput.value;
    descriptionElement.textContent = descriptionInput.value;
}
formElement.addEventListener('submit', handleFormSubmit)