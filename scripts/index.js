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
const cardTemplate = document.querySelector('.template').content;
const cardsContainer = document.querySelector('.elements__list');
const popupAddCard = document.querySelector('.popup_place_add-card');
const openAddCardPopupButton = document.querySelector('.profile__add-button')
const closeAddCardPopupButton = document.querySelector('.popup__close-button_place_add-button');
const cardNameInput = document.querySelector('.form__input_type_title');
const cardLinkInput = document.querySelector('.form__input_type_url');
const submitCardButton = document.querySelector('.form__add-card-button');
const addButtonForm = document.querySelector('.form_place_add-card');
//переменные зума
const popupZoom = document.querySelector('.popup_place_zoom');
const closeZoomButton = document.querySelector('.popup__close-button_place_zoom');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];



// функции открытия и закрытия попапа профиля
const toggleProfilePopup = function () {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  popupProfile.classList.toggle("popup_opened");
};
popupOpenProfileButton.addEventListener("click", toggleProfilePopup);
popupCloseProfileButton.addEventListener("click", toggleProfilePopup);

//функция открытия и закрытия попапа добавления карточек
const toggleAddCardPopup = function  (){
  popupAddCard.classList.toggle("popup_opened");
}
openAddCardPopupButton.addEventListener('click', toggleAddCardPopup);
closeAddCardPopupButton.addEventListener('click', toggleAddCardPopup);
//функция закртытия попапа просмотра фотографии
closeZoomButton.addEventListener('click', toggleZoomPopup);

// фукция изменения текстового содержания
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  toggleProfilePopup();
}
profileForm.addEventListener("submit", handleFormSubmit);



// создание карточек на основе темлейта
function createCard(data){
  // Клонируем шаблон, наполняем его информацией из объекта data, навешиваем всякие обработчики событий
  const cardElement = cardTemplate.cloneNode(true);
  setEventListeners(cardElement);
  cardElement.querySelector('.element__name').textContent = data.name;
  cardElement.querySelector('.element__photo').alt = cardElement.querySelector('.element__name').textContent;
  cardElement.querySelector('.element__photo').src = data.link;
  function setEventListeners (cardElement) {
    cardElement.querySelector('.element__like-button').addEventListener('click', toogleLike);
    cardElement.querySelector('.element__trash-button').addEventListener('click', removeCard);
    cardElement.querySelector('.element__photo').addEventListener('click', toggleZoomPopup);
  };
  // Возвращаем получившуюся карточку
  return cardElement ;
};
function toogleLike(event){
  const likebutton = event.target;
  likebutton.classList.toggle('element__like-button_active');
};
function removeCard(event){
  const deleteButton = event.target.closest('.element');
  deleteButton.remove();
};
function toggleZoomPopup (event) {
  document.querySelector('.zoom__image').src = event.target.src;
  document.querySelector('.zoom__caption').textContent = event.target.alt;
  console.log(event.target.name);
  popupZoom.classList.toggle('popup_opened');
}
const renderCard = (data, cardsContainer) => {
  // Создаем карточку на основе данных
  const cardElement = createCard(data);
  // Помещаем ее в контейнер карточек
  cardsContainer.prepend(cardElement);

};
initialCards.forEach(cardElement => {
  renderCard(cardElement, cardsContainer) ;
});


const sumbitAddCardForm = function(evt) {
  evt.preventDefault();
  const data = {name: cardNameInput.value, link: cardLinkInput.value};
  renderCard(data, cardsContainer);
  toggleAddCardPopup();
};
submitCardButton.addEventListener('click', sumbitAddCardForm);
