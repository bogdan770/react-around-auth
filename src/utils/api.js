class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getCardList() {
    return fetch(this._baseUrl + "/cards", {
      headers: this._headers,
    }).then((res) =>
      res.ok ? res.json() : Promise.reject("Error" + res.statusText)
    );
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) =>
      res.ok ? res.json() : Promise.reject("Error" + res.statusText)
    );
  }

  getAppInfo() {
    return Promise.all([this.getUserInfo(), this.getCardList()]);
  }

  addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) =>
      res.ok ? res.json() : Promise.reject("Error" + res.statusText)
    );
  }

  removeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      headers: this._headers,
      method: "DELETE",
    }).then((res) =>
      res.ok ? res.json() : Promise.reject("Error" + res.statusText)
    );
  }

  changeLikeCardStatus(cardId, like) {
    if (like) {
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        headers: this._headers,
        method: "PUT",
        body: JSON.stringify({
          like,
        }),
      }).then((res) =>
        res.ok ? res.json() : Promise.reject("Error" + res.statusText)
      );
    } else {
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        headers: this._headers,
        method: "DELETE",
      }).then((res) =>
        res.ok ? res.json() : Promise.reject("Error" + res.statusText)
      );
    }
  }

  setUserInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) =>
      res.ok ? res.json() : Promise.reject("Error" + res.statusText)
    );
  }

  setUserAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        avatar: link,
      }),
    }).then((res) =>
      res.ok ? res.json() : Promise.reject("Error" + res.statusText)
    );
  }
}

export default new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "433f6e92-8eab-41fc-9b11-52559de1ddbb",
    "Content-Type": "application/json",
  },
});
