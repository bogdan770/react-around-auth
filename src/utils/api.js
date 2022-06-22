class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  async getCardList() {
    const res = await fetch(this._baseUrl + "/cards", {
      headers: this._headers,
    });
    return await (
      res.ok ? res.json() : Promise.reject("Error" + res.statusText));
  }

  async getUserInfo() {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
    return await (
      res.ok ? res.json() : Promise.reject("Error" + res.statusText));
  }

  getAppInfo() {
    return Promise.all([this.getUserInfo(), this.getCardList()]);
  }

  async addCard(name, link) {
    const res = await fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
    return await (
      res.ok ? res.json() : Promise.reject("Error" + res.statusText));
  }

  async removeCard(cardId) {
    const res = await fetch(`${this._baseUrl}/cards/${cardId}`, {
      headers: this._headers,
      method: "DELETE",
    });
    return await (
      res.ok ? res.json() : Promise.reject("Error" + res.statusText));
  }

  async changeLikeCardStatus(cardId, like) {
    if (like) {
      const res = await fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        headers: this._headers,
        method: "PUT",
        body: JSON.stringify({
          like,
        }),
      });
      return await (
        res.ok ? res.json() : Promise.reject("Error" + res.statusText));
    } else {
      const res_1 = await fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        headers: this._headers,
        method: "DELETE",
      });
      return await (
        res_1.ok ? res_1.json() : Promise.reject("Error" + res_1.statusText));
    }
  }

  async setUserInfo(name, about) {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
    return await (
      res.ok ? res.json() : Promise.reject("Error" + res.statusText));
  }

  async setUserAvatar(link) {
    const res = await fetch(`${this._baseUrl}/users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        avatar: link,
      }),
    });
    return await (
      res.ok ? res.json() : Promise.reject("Error" + res.statusText));
  }
}

export default new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "433f6e92-8eab-41fc-9b11-52559de1ddbb",
    "Content-Type": "application/json",
  },
});
