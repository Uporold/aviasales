import "./styles/globals.scss";
import ApiService from "./api-service";
import BoardPresenter from "./presenter/board-presenter";
import TicketsModel from "./model/tickets-model";
import FilterPresenter from "./presenter/filter-presenter";
import FilterModel from "./model/filter-model";

const siteContainerElement = document.querySelector(".container");

const apiService = new ApiService("http://localhost:3000");
const ticketsModel = new TicketsModel(apiService);
const filterModel = new FilterModel();

const filterPresenter = new FilterPresenter(siteContainerElement, filterModel);

const boardPresenter = new BoardPresenter(
  siteContainerElement,
  ticketsModel,
  filterModel
);

filterPresenter.init();
boardPresenter.init();
ticketsModel.init();
