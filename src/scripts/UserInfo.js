export class UserInfo {
  constructor({ nameElement, infoElement }) {
    this._nameElement = nameElement;
    this._infoElement = infoElement;
  }

  getUserInfo() {
    const userData = {
      name: this._nameElement.innerHTML,
      info: this._infoElement.innerHTML,
    };
    return userData;
  }

  setUserInfo({ name, info }) {
    this._nameElement.textContent = name;
    this._infoElement.textContent = info;
  }
}
