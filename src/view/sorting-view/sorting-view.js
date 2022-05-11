import { SortType } from "../../common/const";
import AbstractView from "../abstract-view";
import "./sorting.scss";

const createSortingTemplate = (currentSortType) =>
  `<div class="sorting__buttons">
          <button class="btn ${
            currentSortType === SortType.CHEAPEST ? "btn--active" : ""
          }" data-sort-type="${SortType.CHEAPEST}">Самый дешевый</button>
          <button class="btn ${
            currentSortType === SortType.FASTEST ? "btn--active" : ""
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
}
