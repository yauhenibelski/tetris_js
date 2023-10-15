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

  getPositionNewFigureInMatrix() {
    const lastPositions = new Array(20).fill(0).map(() => [0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const currentFigurePosition = [];

    this.field.forEach((line, lineIndex) => {
      line.forEach((columItem, columIndex) => {
        lastPositions[lineIndex][columIndex] = columItem;
      });
    });

    this.addFigure();

    lastPositions.forEach((line, lineIndex) => {
      line.forEach((columItem, columIndex) => {
        if (this.field[lineIndex][columIndex] !== columItem) {
          currentFigurePosition.push([lineIndex, columIndex]);
        };
      });
    })
    return currentFigurePosition;
  }

  ifRowFull() {
    const rowIndexes = this.field.map((val, i) => {
      if (val.every((e) => e === 1)) {
        return i;
      }
    })
      .filter(e => e !== undefined);

    return rowIndexes.length
      ? rowIndexes
      : false;
  }
  removeFullRow(index) {
    const cleanLine = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    const f = [...this.field].filter((_, i) => i !== index);
    this.field = f;
    this.field.unshift(cleanLine);
  }

  ifGameLost() {
    return this.field[2].some((v) => v === 1);
  }
}

export default Game;