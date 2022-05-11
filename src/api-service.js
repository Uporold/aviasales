const Method = {
  GET: "GET",
};

export default class ApiService {
  #endPoint = null;

  constructor(endPoint) {
    this.#endPoint = endPoint;
  }

  get tickets() {
    return this.#load({ url: "tickets" }).then((response) => response.json());
  }

  #load = async ({ url, method = Method.GET }) => {
    const response = await fetch(`${this.#endPoint}/${url}`, {
      method,
    });

    try {
      ApiService.checkStatus(response);
      return response;
    } catch (err) {
      ApiService.catchError(err);
    }
  };

  static checkStatus = (response) => {
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  };

  static catchError = (err) => {
    throw err;
  };
}
