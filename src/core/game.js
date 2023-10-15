import { figures } from "../../assets/figures.js";
import addFigure from "../utils/game/addFigure.js";
import { getRandomNum } from "../utils/game/getRandomNum.js";
import ifSpaceBelowIsFree from "../utils/game/ifSpaceBelowIsFree.js";
import ifFigureInField from "../utils/game/ifFigureInField.js";
import moveFigure from "../utils/game/moveFigure.js";
import ifSpaceInTheLeftOrRightOfFigure from "../utils/game/ifSpaceInTheLefOrRightOfFigure.js";
import rotateFigure from "../utils/game/rotateFigure.js";
import addNewFigure from "../utils/game/addNewFigure.js";

class Game {
  field = new Array(20).fill(0).map(() => [0, 0, 0, 0, 0, 0, 0, 0, 0]);

  figuresKeys = Object.keys(Object.fromEntries(figures));

  firstRandomFigure = figures.get( this.figuresKeys[getRandomNum(this.figuresKeys.length, 0)] );

  currentFigure = Object.assign(this.firstRandomFigure, {
    figure: this.firstRandomFigure.positions[0],
    positionIndex: 0,
    x: 4,
    y: 0,
  })

  ifSpaceInTheLeftOrRightOfFigure = ifSpaceInTheLeftOrRightOfFigure.bind(this);
  ifSpaceBelowIsFree = ifSpaceBelowIsFree.bind(this);
  ifFigureInField = ifFigureInField.bind(this);
  rotateFigure = rotateFigure.bind(this);
  addNewFigure = addNewFigure.bind(this);
  moveFigure = moveFigure.bind(this);
  addFigure = addFigure.bind(this);
}

export default Game;