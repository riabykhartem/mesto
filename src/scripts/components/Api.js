export default class Api {
  constructor(options) {
    this._headers = options.headers;
    this._authorization = options.headers.authorization;
    this._url = options.url
  }

  _getResponseData(res){
    return res.ok ? res.json() : Promise.reject()
  }
  _check
  getInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then(this._getResponseData);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    }).then(this._getResponseData);
  }

  editProfile(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.description,
      }),
    }).then(this._getResponseData);
  }

  setAvatar(data) {
    return fetch(
      `${this._url}/users/me/avatar`,
      {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar: data.avatar,
        }),
      }
    )
    .then(this._getResponseData)
  }

  addCard(data){
    return fetch(
      `${this._url}/cards`,
      {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          link: data.link
        })
      })
      .then(this._getResponseData)
  }

  putLike(cardId){
    return fetch(`${this._url}/cards/${cardId}/likes`,{
      method: 'PUT',
      headers: this._headers,
    }).then(this._getResponseData)
  }

  deleteLike(cardId){
    return fetch(`${this._url}/cards/${cardId}/likes`,{
      method: 'DELETE',
      headers: this._headers
    }).then(this._getResponseData)
  }

  deleteCard(cardId){
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    }).then(this._getResponseData)

  }

}
