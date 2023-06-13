export default class UserInfo {
  constructor(profileNameSelector, profileDescriptionSelector) {
    this._profileName = document.querySelector(profileNameSelector),
    this._profileDescription = document.querySelector(
        profileDescriptionSelector
      );
  }
  //"Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя.
  //Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии."
  getUserInfo() {
    return {
      name: this._profileName.textContent,
      description: this._profileDescription.textContent,
    };
  }

  //функция для профиля, кладёт имя и описание в инпуты при открытии попапа
  setUserInfo(data) {
    this._profileName.textContent = data.name,
    this._profileDescription.textContent = data.description;
  }
}
