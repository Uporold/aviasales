import { createElement } from "../common/render";

export default class AbstractView {
  #element = null;
  callback = {};

  constructor() {
    if (new.target === AbstractView) {
      throw new Error("Can't instantiate AbstractView, only concrete one.");
    }
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    throw new Error("Abstract method not implemented: get template");
  }

  removeElement() {
    this.#element = null;
  }
}
