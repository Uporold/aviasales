import { SortType } from "../../common/const";
import AbstractView from "../abstract-view";
import "./sorting.scss";

const createSortingTemplate = (currentSortType) =>
  `<div class="sorting">
          <button class="sorting__btn ${
            currentSortType === SortType.CHEAPEST ? "sorting__btn--active" : ""
          }" data-sort-type="${SortType.CHEAPEST}">Самый дешевый</button>
          <button class="sorting__btn ${
            currentSortType === SortType.FASTEST ? "sorting__btn--active" : ""
          }" data-sort-type="${SortType.FASTEST}">Самый быстрый</button>
    </div>`;

export default class SortingView extends AbstractView {
  #currentSortType = null;

  constructor(currentSortType) {
    super();
    this.#currentSortType = currentSortType;
  }

  get template() {
    return createSortingTemplate(this.#currentSortType);
  }

  setSortTypeChangeHandler = (callback) => {
    this.callback.sortTypeChange = callback;
    this.element.addEventListener("click", this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== "BUTTON") {
      return;
    }

    evt.preventDefault();
    this.callback.sortTypeChange(evt.target.dataset.sortType);
  };
}
