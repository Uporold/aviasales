import "./filter.scss";
import { FilterType } from "../../common/const";
import AbstractView from "../abstract-view";

const createFilterItemTemplate = (filter, currentFilters) => {
  return `<label class="filter__check-option">
            <input type="checkbox" class="filter__input"
            value="${filter.value}" id="${filter.value}"
            ${currentFilters.has(filter.value) ? "checked" : ""} />
            <span class="filter__checkbox"></span>
            ${filter.name}
          </label>`;
};

const createFilterTemplate = (currentFilters) =>
  `<aside class="filter">
        <p class="filter__header">Количество пересадок</p>
        ${Object.values(FilterType)
          .map((filter) => createFilterItemTemplate(filter, currentFilters))
          .join("")}
    </aside>`;

export default class FilterView extends AbstractView {
  #currentFilters = null;

  constructor(currentFilters) {
    super();
    this.#currentFilters = currentFilters;
  }
  get template() {
    return createFilterTemplate(this.#currentFilters);
  }

  setFilterEventHandler(callback) {
    this.callback.filterEvent = callback;
    this.element.addEventListener("click", this.#filterClickHandler);
    this.element.addEventListener("keyup", this.#filterKeyupHandler);
  }

  #filterKeyupHandler = (evt) => {
    evt.preventDefault();
    if (evt.keyCode === 32 && evt.target.tagName === "INPUT") {
      const focusedElement = this.element.querySelector(":focus");
      this.callback.filterEvent(+evt.target.value);
      document.getElementById(focusedElement.id).focus();
    }
  };

  #filterClickHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.tagName === "LABEL") {
      this.callback.filterEvent(+evt.target.querySelector("input").value);
    }
  };
}
