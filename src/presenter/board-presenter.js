import { remove, render, RenderPosition } from "../common/render";
import SortingView from "../view/sorting-view/sorting-view";
import TicketView from "../view/ticket-view/ticket-view";
import TicketsListView from "../view/tickets-list-view/tickets-list-view";
import { SortType, UpdateType } from "../common/const";
import { getSortedTickets } from "../common/utils";
import LoadingView from "../view/loading-view/loading-view";

export default class BoardPresenter {
  #boardContainer = null;
  #boardElement = document.createElement("main");

  #currentSortType = SortType.NONE;
  #sortingComponent = null;

  #ticketsListComponent = null;
  #ticketsModel = null;

  #loadingComponent = new LoadingView();
  #isLoading = true;

  constructor(boardContainer, ticketsModel) {
    this.#boardContainer = boardContainer;
    this.#ticketsModel = ticketsModel;
  }

  get tickets() {
    const tickets = this.#ticketsModel.tickets;

    const sortedTickets = getSortedTickets(this.#currentSortType, tickets);

    return sortedTickets;
  }

  init = () => {
    render(this.#boardContainer, this.#boardElement, RenderPosition.BEFOREEND);

    this.#ticketsModel.addObserver(this.#handleModelEvent);

    this.#renderBoard();
  };

  #handleModelEvent = (updateType) => {
    switch (updateType) {
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };

  #renderSort = () => {
    this.#sortingComponent = new SortingView(this.#currentSortType);
    this.#sortingComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);

    render(
      this.#boardElement,
      this.#sortingComponent,
      RenderPosition.AFTERBEGIN
    );
  };

  #renderLoading = () => {
    render(
      this.#boardElement,
      this.#loadingComponent,
      RenderPosition.AFTERBEGIN
    );
  };

  #renderTicket(container, ticket) {
    const ticketComponent = new TicketView(ticket);
    render(container, ticketComponent, RenderPosition.BEFOREEND);
  }

  #renderTickets(tickets) {
    this.#ticketsListComponent = new TicketsListView();
    render(
      this.#boardElement,
      this.#ticketsListComponent,
      RenderPosition.BEFOREEND
    );
    tickets.forEach((ticket) =>
      this.#renderTicket(this.#ticketsListComponent, ticket)
    );
  }

  #renderBoard = () => {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }
    this.#renderSort();
    this.#renderTickets(this.tickets);
  };

  #clearBoard = () => {
    remove(this.#sortingComponent);
    remove(this.#ticketsListComponent);
  };
}
