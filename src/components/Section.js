export class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = containerSelector;
  }

  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItemPrepend(cardElement) {
    this._container.prepend(cardElement);
  }
  addItemAppend(cardElement) {
    this._container.append(cardElement);
  }


}
