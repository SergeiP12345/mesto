export class UserInfo {
  constructor({ nameSelector, infoSelector, avatarElement }, profileApi) {
    this._nameSelector = nameSelector;
    this._infoSelector = infoSelector;
    this._avatarElement = avatarElement;
    this._profileApi = profileApi;
  }
  //публичный метод возвращает объект с данными пользователя
  getUserInfo() {
    const userData = {
      name: this._nameSelector.innerHTML,
      info: this._infoSelector.innerHTML,
    };
    return userData;
  }
  //публичный метод который принимает новые данные пользователя и добавляет их на страницу
  setUserInfo({ name, info }) {
    this._nameSelector.textContent = name;
    this._infoSelector.textContent = info;
  }

  setUserAvatar({ avatarUrl }) {
    this._avatarElement.src = avatarUrl;
  }
}
