const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save-button",
  inactiveButtonClass: "form__save-button_inactive",
  inputErrorClass: "form__input_error",
  errorClass: "error",
};
//переменные для профиля
const popupOpenProfileButton = document.querySelector(".profile__edit-button");
const profileForm = document.querySelector(".form_place_profile");
//переменные для попапа добавления карточек
const cardsContainer = document.querySelector(".elements__list");
const popupAddCard = document.querySelector(".popup_place_add-card");
const buttonAddCard = document.querySelector(".profile__add-button");
const cardNameInput = document.querySelector(".form__input_type_title");
const cardLinkInput = document.querySelector(".form__input_type_url");
//переменные зума
const popupZoom = document.querySelector(".popup_place_zoom");
const zoomImage = document.querySelector(".zoom__image");
const zoomCaption = document.querySelector(".zoom__caption");

const popupList = Array.from(document.querySelectorAll(".popup"));
const formAddCard = document.querySelector(".form_place_add-card");
const submitCardButton = document.querySelector(".form__add-card-button");
const popups = Array.from(document.querySelectorAll(".popup"));

const popupWithImageSelector = '.popup_place_zoom';
const cardsContainerSelector = '.elements__list'
export {
  validationConfig,
  popupOpenProfileButton,
  profileForm,
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
  popupWithImageSelector,
  cardsContainerSelector
};
