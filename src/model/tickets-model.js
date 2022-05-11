export default class TicketsModel {
  #apiService = null;
  #tickets = [];

  constructor(apiService) {
    this.#apiService = apiService;
  }

  get tickets() {
    return this.#tickets;
  }

  init = async () => {
    try {
      this.#tickets = await this.#apiService.tickets;
    } catch (err) {
      this.#tickets = [];
    }
  };
}
