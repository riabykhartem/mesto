import "./index.css";
import {
  validationConfig,
  popupOpenProfileButton,
  profileForm,
  buttonAddCard,
  formAddCard,
  popupWithImageSelector,
  cardsContainerSelector,
  avatarForm,
  avatarPopupSelector,
  avatarButton,
  avatarImage,
} from "../scripts/utils/constants.js";
import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidation.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithSubmit from "../scripts/components/PopupWithSubmit.js";
import Api from "../scripts/components/Api.js";

const api = new Api({
  headers: {
    authorization: "4c12c1a1-7aa0-4e54-ad87-1d23caeb5ea9",
    "Content-Type": "application/json",
  },
  url: 'https://mesto.nomoreparties.co/v1/cohort-69'
});

const popupWithImage = new PopupWithImage(popupWithImageSelector);
popupWithImage.setEventListeners();

const createCard = (element) => {
  const card = new Card(
    element,
    ".template",
    () => popupWithImage.open({ src: element.link, name: element.name }),
    (element) =>
      popupWithSubmit.open({ thisCard: card, cardId: element.cardId }),
    (cardId) => {
      if (card._isLiked()) {
        api
          .deleteLike(cardId)
          .then((res) => {
            card.toggleLike(res.likes);
          })
          .catch((err) => console.error(`ошибка при удалении лайка =>${err}`));
      } else {
        api
          .putLike(cardId)
          .then((res) => card.toggleLike(res.likes))
          .catch((err) =>
            console.error(`ошибка при добавлении лайка =>${err}`)
          );
      }
    }
  );
  const cardElement = card.createCard();
  return cardElement;
};

const section = new Section(createCard, cardsContainerSelector);

const userInfo = new UserInfo(
  ".profile__name",
  ".profile__description",
  ".profile__avatar"
);

const popupProfile = new PopupWithForm(".popup_place_profile", (formData) => {
  popupProfile.setLoadingText()
  api
    .editProfile(formData)
    .then((res) =>{
      userInfo.setUserInfo({
        avatar: res.avatar,
        name: res.name,
        description: res.about
      }),
      popupProfile.close()
    })
    .catch((err) => {
      `ошибка при редактировании профиля =>${console.error(err)}`;
    })
    .finally(popupProfile.setDefualtText());

});
popupProfile.setEventListeners();

popupOpenProfileButton.addEventListener("click", () => {
  profileFormValidation.resetValidation();
  popupProfile.setInputValues(userInfo.getUserInfo());
  popupProfile.open();
});

//экземпляр добавления карточки
const popupAddCard = new PopupWithForm(
  ".popup_place_add-card",
  (inputValues) => {
    api.addCard(inputValues)
      .then((dataCard) => {
        (dataCard.myId = dataCard.owner._id),
          section.addItem(createCard(dataCard)),
          popupAddCard.close();
      })
      .catch((err) => console.error(`ошибка при добавлении карточки: ${err}`));
  }
);
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

const avatarFormValidation = new FormValidator(validationConfig, avatarForm);
avatarFormValidation.enableValidation();

//экземпляр автара
const popupAvatar = new PopupWithForm(avatarPopupSelector, (formData) => {
  popupAvatar.setLoadingText()
  api
    .setAvatar(formData)
    .then((res) => {
      (avatarImage.src = res.avatar),
      popupAvatar.close()})
    .catch((err) => console.error(`ошибка при обновлении аватара ${err}`))
    .finally(popupAvatar.setDefualtText())

},

);

popupAvatar.setEventListeners();

avatarButton.addEventListener("click", () => {
  profileFormValidation.resetValidation();
  popupAvatar.open();
});

//экземпляр подтверждения удаления карточки
const popupWithSubmit = new PopupWithSubmit(
  ".popup_place_delete-card",
  ({ card, cardId }) => {
    popupWithSubmit.setLoadingText(),
    api
      .deleteCard(cardId)
      .then(() => {
        card.removeCard(), popupWithSubmit.close();
      })
      .catch((err) => console.error(err))
      .finally(popupWithSubmit.setDefualtText());
  }
);

popupWithSubmit.setEventListeners();

Promise.all([api.getInfo(), api.getInitialCards()]).then(
  ([dataUser, dataCard]) => {
    dataCard.forEach((element) => {
      element.myId = dataUser._id;
    });
    userInfo.setUserInfo({
      avatar: dataUser.avatar,
      name: dataUser.name,
      description: dataUser.about,
    });
    section.addInitialCards(dataCard);
  }
);
