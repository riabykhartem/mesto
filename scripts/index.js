// DOM элементы

//переменные для профиля
const popupProfile = document.querySelector(".popup_place_profile");
const popupOpenProfileButton = document.querySelector(".profile__edit-button");
const popupCloseProfileButton = document.querySelector(".popup__close-button_place_profile");
const nameInput = document.querySelector(".form__input_type_name");
const descriptionInput = document.querySelector(".form__input_type_description");
const profileForm = document.querySelector(".form_place_profile");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
//переменные для попапа добавления карточек
const cardTemplate = document.querySelector(".template").content;
const cardsContainer = document.querySelector(".elements__list");
const popupAddCard = document.querySelector(".popup_place_add-card");
const ButtonAddCard = document.querySelector(".profile__add-button");
const buttonCloseAddCardPopup = document.querySelector(".popup__close-button_place_add-button");
const cardNameInput = document.querySelector(".form__input_type_title");
const cardLinkInput = document.querySelector(".form__input_type_url");
const submitCardButton = document.querySelector(".form__add-card-button");
const cardForm = document.querySelector(".form_place_add-card");
//переменные зума
const popupZoom = document.querySelector(".popup_place_zoom");
const closeZoomButton = document.querySelector(".popup__close-button_place_zoom");

// универсальные функции открытия/закрытия попапов
function openPopup(popup) {
  popup.classList.add("popup_opened");
}
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

// функции открытия/закрытия попапа профиля
popupOpenProfileButton.addEventListener("click", function () {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openPopup(popupProfile);
});
popupCloseProfileButton.addEventListener("click", () =>
  closePopup(popupProfile)
);
//функция открытия попапа добавления карточек
ButtonAddCard.addEventListener("click", () => openPopup(popupAddCard));
//униерсльная функция закрытия попапов
document.querySelectorAll('.popup__close-button').forEach(button => {
  const buttonsPopup = button.closest('.popup'); // нашли родителя с нужным классом
  button.addEventListener('click', () => closePopup(buttonsPopup)); // закрыли попап
});

//функция открытия/закртытия попапа просмотра фотографии
function openZoomPopup(event) {
  document.querySelector(".zoom__image").src = event.target.src;
  document.querySelector(".zoom__image").alt = event.target.alt;
  document.querySelector(".zoom__caption").textContent = event.target.alt;
  openPopup(popupZoom);
}
closeZoomButton.addEventListener("click", () => closePopup(popupZoom));

// фукция изменения текстового содержания
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(popupProfile);
}
profileForm.addEventListener("submit", handleFormSubmit);

// создание карточек на основе темлейта
function createCard(data) {
  // Клонируем шаблон, наполняем его информацией из объекта data, навешиваем всякие обработчики событий
  const cardElement = cardTemplate.cloneNode(true);
  setEventListeners(cardElement);
  cardElement.querySelector(".element__name").textContent = data.name;
  cardElement.querySelector(".element__photo").alt = cardElement.querySelector(".element__name").textContent;
  cardElement.querySelector(".element__photo").src = data.link;
  function setEventListeners(cardElement) {
    cardElement.querySelector(".element__like-button").addEventListener("click", toogleLike);
    cardElement.querySelector(".element__trash-button").addEventListener("click", removeCard);
    cardElement.querySelector(".element__photo").addEventListener("click", openZoomPopup);
  }
  // Возвращаем получившуюся карточку
  return cardElement;
}
function toogleLike(event) {
  const likebutton = event.target;
  likebutton.classList.toggle("element__like-button_active");
}
function removeCard(event) {
  const deleteButton = event.target.closest(".element");
  deleteButton.remove();
}

const renderCard = (data, cardsContainer) => {
  // Создаем карточку на основе данных
  const cardElement = createCard(data);
  // Помещаем ее в контейнер карточек
  cardsContainer.prepend(cardElement);
};
initialCards.forEach((cardElement) => {
  renderCard(cardElement, cardsContainer);
});
const FormAddCard = document.querySelector('.form_place_add-card');
function submitAddCardForm(evt) {
  evt.preventDefault();
  const data = { name: cardNameInput.value, link: cardLinkInput.value };
  renderCard(data, cardsContainer);
  FormAddCard.reset();
  closePopup(popupAddCard);
}
FormAddCard.addEventListener("submit", submitAddCardForm);

