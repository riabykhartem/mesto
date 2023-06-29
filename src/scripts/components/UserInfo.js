export default class UserInfo {
  constructor(profileNameSelector, profileDescriptionSelector, avatarSelector) {
    this._profileName = document.querySelector(profileNameSelector),
    this._profileDescription = document.querySelector(
        profileDescriptionSelector
      ),
    this._avatarImage = document.querySelector(avatarSelector)
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      description: this._profileDescription.textContent,
    };
  }

  setUserInfo({avatar, name, description}) {
    this._avatarImage.src = avatar,
    this._profileName.textContent = name,
    this._profileDescription.textContent = description;
  }
}
