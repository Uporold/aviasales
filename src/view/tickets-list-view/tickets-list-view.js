import AbstractView from "../abstract-view";
import "./tickets-list.scss";

export const createTicketsListTemplate = () => `<ul class="tickets-list"></ul>`;

export default class TicketsListView extends AbstractView {
  get template() {
    return createTicketsListTemplate();
  }
}
