export default class Api {
  constructor(options) {
    this._headers = options.headers;
    this._authorization = options.headers.authorization;
  }

  getInfo() {
    return fetch("https://mesto.nomoreparties.co/v1/cohort-69/users/me", {
      headers: {
        authorization: this._authorization,
      },
    }).then((res) => {
      return res.ok ? res.json() : Promise.reject();
    });
  }

  getInitialCards() {
    return fetch("https://mesto.nomoreparties.co/v1/cohort-69/cards", {
      headers: {
        authorization: this._authorization,
      },
    }).then((res) => {
      return res.ok ? res.json() : Promise.reject();
    });
  }

  editProfile(data) {
    return fetch("https://mesto.nomoreparties.co/v1/cohort-69/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.description,
      }),
    }).then((res) => {
      return res.ok ? res.json() : Promise.reject();
    });
  }

  setAvatar(data) {
    return fetch(
      "https://mesto.nomoreparties.co/v1/cohort-69/users/me/avatar",
      {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar: data.avatar,
        }),
      }
    )
  }

  addCard(data){
    return fetch(
      "https://mesto.nomoreparties.co/v1/cohort-69/cards",
      {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          link: data.link
        })
      })
      .then((res) => {
        return res.ok ? res.json() : Promise.reject()})
  }

  putLike(cardId){
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-69/cards/${cardId}/likes`,{
      method: 'PUT',
      headers: this._headers,
    }).then((res) => {
      return res.ok ? res.json() : Promise.reject()})
  }

  deleteLike(cardId){
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-69/cards/${cardId}/likes`,{
      method: 'DELETE',
      headers: this._headers
    }).then((res) => {
      return res.ok ? res.json() : Promise.reject()})
  }

  deleteCard(cardId){
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-69/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    }).then((res) => {
      return res.ok ? res.json() : Promise.reject()})

  }

}
