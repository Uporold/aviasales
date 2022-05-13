import { SortType } from "./const";

export const getSortedTickets = (currentSortType, tickets) => {
  switch (currentSortType) {
    case SortType.CHEAPEST:
      return tickets.slice().sort((a, b) => a.price - b.price);
    case SortType.FASTEST:
      return tickets
        .slice()
        .sort(
          (a, b) =>
            a.segments.reduce((acc, val) => val.duration + acc, 0) -
            b.segments.reduce((acc, val) => val.duration + acc, 0)
        );
    case SortType.NONE:
      return tickets.slice();
  }
};

export const getFilteredTickets = (tickets, filters) => {
  if (filters.size === 0) {
    return tickets.slice(0, 5);
  }
  return tickets
    .filter(
      (ticket) =>
        filters.has(-1) ||
        (filters.has(ticket.segments[0].stops.length) &&
          filters.has(ticket.segments[1].stops.length))
    )
    .slice(0, 5);
};

export const getDeclOfNum = (length) => {
  switch (true) {
    case length === 1:
      return `${length} пересадка`;
    case length >= 2 && length <= 4:
      return `${length} пересадки`;
    default:
      return `${length} пересадок`;
  }
};

const addZero = (number) => {
  const string = String(number);
  const length = string.length;
  return length < 2 ? "0" + string : string;
};

export const getTicketTimes = (date, duration) => {
  const formattedDate = new Date(date);
  const startHours = addZero(formattedDate.getHours());
  const startMinutes = addZero(formattedDate.getMinutes());
  const durationHours = addZero(Math.floor(duration / 60));
  const durationMinutes = addZero(duration % 60);
  formattedDate.setHours(formattedDate.getHours() + durationHours);
  formattedDate.setMinutes(formattedDate.getMinutes() + durationMinutes);
  const endHours = addZero(formattedDate.getHours());
  const endMinutes = addZero(formattedDate.getMinutes());
  return {
    startHours,
    startMinutes,
    durationHours,
    durationMinutes,
    endHours,
    endMinutes,
  };
};

export const getFormattedPrice = (price) =>
  new Intl.NumberFormat("ru-RU").format(price);
