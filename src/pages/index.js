import "./index.css";
import {
  validationConfig,
  popupOpenProfileButton,
  profileForm,
  buttonAddCard,
  formAddCard,
  popupWithImageSelector,
  cardsContainerSelector,
} from "../scripts/utils/constants.js";
import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidation.js";
import { initialCards } from "../scripts/utils/initialCards.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";

const popupWithImage = new PopupWithImage(popupWithImageSelector);
popupWithImage.setEventListeners();

const createCard = (element) => {
  const card = new Card(element, ".template", () =>
    popupWithImage.open({ src: element.link, name: element.name })
  );
  const cardElement = card.createCard();
  return cardElement;
}

const section = new Section(
  {
    items: initialCards,
    renderer: createCard
  },
  cardsContainerSelector
);
section.addInitialCards();

const userInfo = new UserInfo(".profile__name", ".profile__description");

//экзэмпляр  профиля
const submitFunction = (formData) => {
  userInfo.setUserInfo(formData);
  popupProfile.close();
}
const popupProfile = new PopupWithForm(".popup_place_profile", submitFunction);
popupProfile.setEventListeners();

popupOpenProfileButton.addEventListener("click", () => {
  profileFormValidation.resetValidation();
  popupProfile.setInputValues(userInfo.getUserInfo());
  popupProfile.open();
});

//экземпляр добавления карточки
const popupAddCard = new PopupWithForm(".popup_place_add-card", (formData) => {
  section.addItem(section.renderer(formData));
  popupAddCard.close();
});
popupAddCard.setEventListeners();

buttonAddCard.addEventListener("click", () => {
  addCardFormValidation.resetValidation();
  popupAddCard.open();
});

//экземпляры валидации
const addCardFormValidation = new FormValidator(validationConfig, formAddCard);
addCardFormValidation.enableValidation();

const profileFormValidation = new FormValidator(validationConfig, profileForm);
profileFormValidation.enableValidation();
