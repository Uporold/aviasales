import { remove, render, RenderPosition } from "../common/render";
import SortingView from "../view/sorting-view/sorting-view";
import TicketView from "../view/ticket-view/ticket-view";
import TicketsListView from "../view/tickets-list-view/tickets-list-view";
import { SortType } from "../common/const";
import { getSortedTickets } from "../common/utils";

export default class BoardPresenter {
  #boardContainer = null;
  #boardElement = document.createElement("main");

  #currentSortType = SortType.NONE;
  #sortingComponent = null;

  #ticketsListComponent = null;
  #ticketsModel = null;

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

    this.#renderBoard();
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
    this.#renderSort();
    this.#renderTickets(this.tickets);
  };

  #clearBoard = () => {
    remove(this.#sortingComponent);
    remove(this.#ticketsListComponent);
  };
}
