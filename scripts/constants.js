const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save-button",
  inactiveButtonClass: "form__save-button_inactive",
  inputErrorClass: "form__input_error",
  errorClass: "error",
};
//переменные для профиля
const popupProfile = document.querySelector(".popup_place_profile");
const popupOpenProfileButton = document.querySelector(".profile__edit-button");
const nameInput = document.querySelector(".form__input_type_name");
const descriptionInput = document.querySelector(
  ".form__input_type_description"
);
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
const zoomCaption = document.querySelector(".zoom__caption");

const popupList = Array.from(document.querySelectorAll(".popup"));
const formAddCard = document.querySelector(".form_place_add-card");
const submitCardButton = document.querySelector(".form__add-card-button");
const popups = Array.from(document.querySelectorAll(".popup"));
export {
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
};
