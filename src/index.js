import "./styles/globals.scss";
import ApiService from "./api-service";
import BoardPresenter from "./presenter/board-presenter";
import TicketsModel from "./model/tickets-model";

const siteContainerElement = document.querySelector(".container");

const apiService = new ApiService("http://localhost:3000");
const ticketsModel = new TicketsModel(apiService);

const boardPresenter = new BoardPresenter(siteContainerElement, ticketsModel);
boardPresenter.init();
ticketsModel.init();
