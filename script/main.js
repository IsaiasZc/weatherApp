import { Weather } from "./weather.js";
import { Tools } from "../tools.js";

const w = new Weather();
const tools = new Tools();
const date = new Date();

const position = await w.getPosition();

const weather = await w.getWeather(position);


tools.newMainCard(weather, w.getImagePath(weather));


const nexts = await w.getNextDays(position,date.getDate());

nexts.forEach((day) => {
  let nodo = tools.newNextDay(day, w.getImagePath(day));
  tools.addPronosticNode(nodo);
})