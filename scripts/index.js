import {
  validationConfig,
  popupProfile,
  popupOpenProfileButton,
  nameInput,
  descriptionInput,
  profileForm,
  profileName,
  profileDescription,
  cardsContainer,
  popupAddCard,
  buttonAddCard,
  cardNameInput,
  cardLinkInput,
  popupZoom,
  zoomImage,
  zoomCaption,
  popupList,
  formAddCard,
  submitCardButton,
} from "./constants.js";
import Card from "./Card.js";
import { FormValidator } from "./FormValidation.js";
import { initialCards } from "./initialCards.js";

const addCard = (placeToAdd, thingToAdd) => {
  placeToAdd.prepend(thingToAdd);
};
const createCard = (element) => {
  const card = new Card (element, ".template", () => openZoomPopup(event));
  const cardElement = card.createCard();
  return cardElement
}
initialCards.forEach((element) => {
  addCard(cardsContainer, createCard(element))
});

const handleCloseByClick = (evt) => {
  if (
    evt.target === evt.currentTarget ||
    evt.target.classList.contains("popup__close-button")
  ) {
    closePopup(evt.currentTarget);
  }
};

popupList.forEach((popup) => {
  popup.addEventListener("click", handleCloseByClick);
});
// функции открытия попапа профиля
popupOpenProfileButton.addEventListener("click", function () {
  profileFormValidation.resetValidation();
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openPopup(popupProfile);
});

buttonAddCard.addEventListener("click", () => {
  addCardFormValidation.resetValidation();
  openPopup(popupAddCard);
});

const submitNewCard = (evt) => {
  evt.preventDefault();
  const data = { name: cardNameInput.value, link: cardLinkInput.value}
  addCard(cardsContainer, createCard(data))
  formAddCard.reset();
  closePopup(popupAddCard);
};

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEsc);
}
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(popupProfile);
};
profileForm.addEventListener("submit", handleProfileFormSubmit);
formAddCard.addEventListener("submit", (evt) => {
  submitNewCard(evt);
  addCardFormValidation.resetValidation()
});
const closeByEsc = (evt) => {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
};
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEsc);
}
const openZoomPopup = (event) => {
  zoomImage.src = event.target.src;
  zoomImage.alt = event.target.alt;
  zoomCaption.textContent = event.target.alt;
  openPopup(popupZoom);
};
const profileFormValidation = new FormValidator(validationConfig, profileForm);
profileFormValidation.enableValidation();
const addCardFormValidation = new FormValidator(validationConfig, formAddCard);
addCardFormValidation.enableValidation();
