export default class TicketsModel {
  #apiService = null;
  #tickets = [];

  constructor(apiService) {
    this.#apiService = apiService;
  }

  get tickets() {
    return this.#tickets.slice(0, 5);
  }

  init = async () => {
    try {
      this.#tickets = await this.#apiService.tickets;
    } catch (err) {
      this.#tickets = [];
    }
  };
}
