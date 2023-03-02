export class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = containerSelector;
  }

  renderItems = (items) => {
    items.forEach(this._renderer);
  };

  addItem(cardElement) {
    this._container.prepend(cardElement);
  }
}
