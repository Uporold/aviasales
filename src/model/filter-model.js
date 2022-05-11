import { UpdateType } from "../common/const";
import AbstractObservable from "./abstract-observable";

export default class FilterModel extends AbstractObservable {
  #filters = new Set();

  get filters() {
    return this.#filters;
  }

  setFilter = (filter) => {
    if (this.#filters.has(filter)) {
      this.#filters.delete(filter);
    } else {
      this.#filters.add(filter);
    }
    this.notify(UpdateType.FILTRATION);
  };
}
