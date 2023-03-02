export class UserInfo {
  constructor({ nameSelector, infoSelector }) {
    this._nameSelector = nameSelector;
    this._infoSelector = infoSelector;
  }

  getUserInfo() {
    const userData = {
      name: this._nameSelector.innerHTML,
      info: this._infoSelector.innerHTML,
    };
    return userData;
  }

  setUserInfo({ name, info }) {
    this._nameSelector.textContent = name;
    this._infoSelector.textContent = info;
  }
}
