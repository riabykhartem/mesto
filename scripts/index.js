import Card from './Card.js';
import {validationConfig, FormValidator} from './FormValidation.js';
import {initialCards} from './initialCards.js';
//переменные для профиля
const popupProfile = document.querySelector(".popup_place_profile");
const popupOpenProfileButton = document.querySelector(".profile__edit-button");
const nameInput = document.querySelector(".form__input_type_name");
const descriptionInput = document.querySelector(".form__input_type_description");
const profileForm = document.querySelector(".form_place_profile");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
//переменные для попапа добавления карточек
const cardsContainer = document.querySelector(".elements__list");
const popupAddCard = document.querySelector(".popup_place_add-card");
const buttonAddCard = document.querySelector(".profile__add-button");
const cardNameInput = document.querySelector(".form__input_type_title");
const cardLinkInput = document.querySelector(".form__input_type_url");
//переменные зума
const popupZoom = document.querySelector(".popup_place_zoom");
const zoomImage = document.querySelector(".zoom__image");
const zoomCaption = document.querySelector(".zoom__caption")

const popupList = Array.from(document.querySelectorAll(".popup"));
const formAddCard = document.querySelector(".form_place_add-card");
const submitCardButton = document.querySelector(".form__add-card-button");

initialCards.forEach((element) => {
  const card = new Card(element, '.template',() => openZoomPopup(event));
  const cardElement = card.createCard()
  cardsContainer.append(cardElement)
});

const closeByClickOverlay = (evt) => {
  if (evt.currentTarget === evt.target) {
    popupList.forEach((popup) => {
      closePopup(popup);
    });
  }
};
// функции открытия попапа профиля
popupOpenProfileButton.addEventListener("click", function () {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openPopup(popupProfile);
});
// фукция открыти попапа добавления карточки
buttonAddCard.addEventListener("click", () => {
  const formSaveButton = popupAddCard.querySelector('.form__save-button');
  formSaveButton.setAttribute('disabled', true);
  openPopup(popupAddCard)});
const submitNewCard = (evt) =>{
  evt.preventDefault();
  const data = { name: cardNameInput.value, link: cardLinkInput.value };
  const newCustomCard = new Card(data, '.template', () => openZoomPopup(event));
  const cardElement = newCustomCard.createCard();
  cardsContainer.prepend(cardElement);
  formAddCard.reset();
  closePopup(popupAddCard);
  formAddCard.setAttribute('disabled', true);
   }
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEsc);
  popup.addEventListener("click", closeByClickOverlay);
}
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(popupProfile);
};
profileForm.addEventListener("submit", handleProfileFormSubmit);
formAddCard.addEventListener('submit',(evt) => {
  submitNewCard(evt);
  submitCardButton.setAttribute('disabled', true)
});
const closeByEsc = (evt) => {
  if (evt.key === "Escape") {
    popupList.forEach((popup) => {
      closePopup(popup);
    });
  }
};
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", () => closeByEsc(evt));
  popup.removeEventListener("click", closeByClickOverlay);
}
document.querySelectorAll(".popup__close-button").forEach((button) => {
  const buttonsPopup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(buttonsPopup));
});

 const openZoomPopup=(event)=>{
  zoomImage.src = event.target.src;
  zoomImage.alt = event.target.alt;
  zoomCaption.textContent = event.target.alt;
  openPopup(popupZoom);
}
const profileFormValidation = new FormValidator(validationConfig, profileForm)
profileFormValidation.enableValidation()
const addCardFormValidation = new FormValidator(validationConfig, formAddCard)
addCardFormValidation.enableValidation()
