export const SortType = {
  CHEAPEST: "CHEAPEST",
  FASTEST: "FASTEST",
  NONE: "NONE",
};

export const UpdateType = {
  INIT: "INIT",
  FILTRATION: "FILTRATION",
};

export const FilterType = {
  ALL: { name: "Все", value: -1 },
  DIRECT: { name: "Без пересадок", value: 0 },
  ONE_TRANSFER: { name: "1 пересадка", value: 1 },
  TWO_TRANSFERS: { name: "2 пересадки", value: 2 },
  THREE_TRANSFERS: { name: "3 пересадки", value: 3 },
};
