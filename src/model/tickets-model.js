import AbstractObservable from "./abstract-observable";
import { UpdateType } from "../common/const";

export default class TicketsModel extends AbstractObservable {
  #apiService = null;
  #tickets = [];

  constructor(apiService) {
    super();
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
    this.notify(UpdateType.INIT);
  };
}
