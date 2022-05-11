import FilterView from "../view/filter-view/filter-view.js";
import { render, RenderPosition, replace, remove } from "../common/render.js";

export default class FilterPresenter {
  #filterContainer = null;
  #filterComponent = null;
  #filterModel = null;

  constructor(filterContainer, filterModel) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
  }

  init = () => {
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView(this.#filterModel.filters);
    this.#filterComponent.setFilterEventHandler(this.#handleFilterEvent);

    this.#filterModel.addObserver(this.#handleModelEvent);

    if (prevFilterComponent === null) {
      render(
        this.#filterContainer,
        this.#filterComponent,
        RenderPosition.BEFOREEND
      );
      return;
    }
    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  };

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterEvent = (filterType, focusedElement = undefined) => {
    this.#filterModel.setFilter(filterType);
    if (focusedElement) {
      document.getElementById(focusedElement.id).focus();
    }
  };
}
