import AbstractView from "../abstract-view";
import "./ticket.scss";
import {
  getDeclOfNum,
  getFormattedPrice,
  getTicketTimes,
} from "../../common/utils";

const createTicketRow = (data) => {
  const { origin, destination, date, stops, duration } = data;
  const {
    startHours,
    startMinutes,
    durationHours,
    durationMinutes,
    endHours,
    endMinutes,
  } = getTicketTimes(date, duration);

  return `<div class="ticket__row">
      <div class="row-block">
        <p class="row-block__header">${origin} – ${destination}</p>
        <p class="row-block__text">${startHours}:${startMinutes} – ${endHours}:${endMinutes}</p>
      </div>
      <div class="row-block">
        <p class="row-block__header">В пути</p>
        <p class="row-block__text">${durationHours}ч ${durationMinutes}м</p>
      </div>
      <div class="row-block">
        <p class="row-block__header">${getDeclOfNum(+stops.length)}</p>
        <p class="row-block__text">${stops.join(", ")}</p>
      </div>
    </div>`;
};

const createTicketTemplate = (ticket) => {
  const { price, carrier, segments } = ticket;
  const formattedPrice = getFormattedPrice(price);
  return `<li class="ticket">
      <div class="ticket__row ticket__row--main">
        <span>${formattedPrice} P</span>
        <img src="http://pics.avs.io/99/36/${carrier}.png" alt="Carrier company logo" />
      </div>
      ${segments.map((segment) => createTicketRow(segment)).join("")}
    </li>`;
};

export default class TicketView extends AbstractView {
  #ticket = null;

  constructor(ticket) {
    super();
    this.#ticket = ticket;
  }

  get template() {
    return createTicketTemplate(this.#ticket);
  }
}
