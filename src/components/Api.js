export class Api {
  constructor(config) {
    this._token = config.token;
    this._groupId = config.groupId;
    this._url = config.url;
    this._cardsPage = `${this._url}/v1/${this._groupId}/cards`;
    this._profilePage = `${this._url}/v1/${this._groupId}/users/me`;
  }

  _answer(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _getResponse(url) {
    return fetch(url, {
      headers: {
        authorization: "98e7c878-b0cc-4c78-aade-66752389e35e",
      },
    });
  }

  getInitialCards() {
    return this._getResponse(this._cardsPage).then(this._answer);
  }

  postNewCard(name, link) {
    console.log(name, link);
    return fetch("https://mesto.nomoreparties.co/v1/cohort-61/cards", {
      method: "POST",
      headers: {
        authorization: "98e7c878-b0cc-4c78-aade-66752389e35e",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => {
      console.log(res);
    });
  }

  deleteLike(id) {
    return fetch("https://mesto.nomoreparties.co/v1/cohort-61/cards/cardId", {
      method: "DELETE",
      headers: {
        authorization: "98e7c878-b0cc-4c78-aade-66752389e35e",
      },
    }).then(this._answer);
  }

  addLike(id) {
    return fetch(`${this._cardsPage}/${id}/likes`, {
      method: "PUT",
      headers: {
        authorization: "98e7c878-b0cc-4c78-aade-66752389e35e",
      },
    }).then(this._answer);
  }

  deleteCard(cardId) {
    return fetch(`${this._cardsPage}/${cardId}`, {
      method: "DELETE",
    }).then(this._answer);
  }
  //profile methods
  getProfileInfo() {
    return this._getResponse(this._profilePage).then(this._answer);
  }

  editProfileInfo(name, about) {
    return fetch("https://mesto.nomoreparties.co/v1/cohort-61/users/me", {
      method: "PATCH",
      headers: {
        authorization: "98e7c878-b0cc-4c78-aade-66752389e35e",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._answer);
  }

  editProfileAvatar(url) {
    return fetch("https://mesto.nomoreparties.co/v1/cohort-61//avatar", {
      method: "PATCH",
      headers: {
        authorization: "98e7c878-b0cc-4c78-aade-66752389e35e",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: url,
      }),
    }).then(this._answer);
  }

  //submit methods
  confirmSubmit(cardId) {
    return fetch(`${this._cardsPage}/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: "98e7c878-b0cc-4c78-aade-66752389e35e",
      },
    }).then(this._answer);
  }
}
