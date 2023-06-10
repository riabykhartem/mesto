import './pages/index.css';
import {
  validationConfig,
  popupOpenProfileButton,
  profileForm,
  buttonAddCard,
  formAddCard,
  popupWithImageSelector,
  cardsContainerSelector,
} from "./scripts/utils/constants.js";
import Card from "./scripts/components/Card.js";
import FormValidator from "./scripts/components/FormValidation.js";
import { initialCards } from "./scripts/utils/initialCards.js";
import PopupWithImage from "./scripts/components/PopupWithImage.js";
import Section from "./scripts/components/Section.js";
import UserInfo from "./scripts/components/UserInfo.js";
import PopupWithForm from "./scripts/components/PopupWithForm.js";

const popupWithImage = new PopupWithImage(popupWithImageSelector);

const section = new Section(
  {
    items: initialCards,
    renderer: (element) => {
      const card = new Card(element, ".template", () =>
        popupWithImage.open({ src: element.link, name: element.name })
      );
      popupWithImage.setEventListeners();
      const cardElement = card.createCard();
      return cardElement;
    },
  },
  cardsContainerSelector
);
section.addInitialCards();

const userInfo = new UserInfo(".profile__name", ".profile__description");
//экзэмпляр  профиля
const popupProfile = new PopupWithForm(".popup_place_profile", (evt) => {
  evt.preventDefault();
  userInfo.setUserInfo(popupProfile.getInputValues());
  popupProfile.close();
});
popupProfile.setEventListeners();

popupOpenProfileButton.addEventListener("click", () => {
  profileFormValidation.resetValidation();
  popupProfile.setInputValues(userInfo.getUserInfo());
  popupProfile.open();
});

//экземпляр добавления карточки
const popupAddCard = new PopupWithForm(".popup_place_add-card", (evt) => {
  evt.preventDefault();
  section.addItem(section.renderer(popupAddCard.getInputValues()));
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
