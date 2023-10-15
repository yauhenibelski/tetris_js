import { figures } from "../../../assets/figures.js";
import { getRandomNum } from "./getRandomNum.js";

function addNewFigure() {
  const newFigurePositions = figures.get( this.figuresKeys[getRandomNum(this.figuresKeys.length, 0)]);
  this.currentFigure.figure = newFigurePositions.positions[0];
  this.currentFigure.positions = newFigurePositions.positions;
  this.currentFigure.positionIndex = 0;
  this.currentFigure.y = 0;
  this.currentFigure.x = 4;
}

export default addNewFigure;