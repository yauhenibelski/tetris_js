import { figures } from "./figures.js";
import addFigure from "./utils/core/addFigure.js";
import { getRandomNum } from "./utils/getRandomNum.js";
import ifSpaceBelowIsFree from "./utils/core/ifSpaceBelowIsFree.js";
import ifFigureInField from "./utils/core/ifFigureInField.js";
import moveFigure from "./utils/core/moveFigure.js";
import ifSpaceInTheLeftOrRightOfFigure from "./utils/core/ifSpaceInTheLefOrRightOfFigure.js";
import rotateFigure from "./utils/core/rotateFigure.js";

class App {
  // field = new Array(20).fill(0).map(() => [0,0,0,0,0,0,0,0,0]);
  field = [
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [1,5,0,0,0,0,9,0,0],
    [3,0,0,0,0,5,8,0,0],
    [1,0,0,0,0,5,7,0,0],
    [1,0,0,0,0,5,6,0,0],
    [1,0,0,0,0,5,9,8,0],
    [2,2,2,3,3,3,9,8,0],
  ];
  figuresKeys = Object.keys(Object.fromEntries(figures));
  // firstRandomFigure = figures.get( this.figuresKeys[getRandomNum(this.figuresKeys.length, 0)] );
  firstRandomFigure = figures.get( this.figuresKeys[0] );

  currentFigure = Object.assign(this.firstRandomFigure, {
    figure: this.firstRandomFigure.positions[0],
    positionIndex: 0,
    x: 3,
    y: 3,
  })

  ifSpaceInTheLeftOrRightOfFigure = ifSpaceInTheLeftOrRightOfFigure.bind(this);
  ifSpaceBelowIsFree = ifSpaceBelowIsFree.bind(this);
  ifFigureInField = ifFigureInField.bind(this);
  rotateFigure = rotateFigure.bind(this);
  moveFigure = moveFigure.bind(this);
  addFigure = addFigure.bind(this);

  run() {
    this.moveFigure('right');
    this.moveFigure('right');
    this.moveFigure('left');
    this.moveFigure('down');
    this.moveFigure('down');
    this.moveFigure('down');
    this.moveFigure('down');
    this.moveFigure('down');
    this.moveFigure('down');
    // this.moveFigure('down');
    this.rotateFigure();
    // this.rotateFigure();

    this.moveFigure('down');

    console.log(this.ifSpaceBelowIsFree(), 'space');
    console.log(this.ifSpaceInTheLeftOrRightOfFigure('left'), this.ifSpaceInTheLeftOrRightOfFigure('right'));
    console.log(this.currentFigure);

    this.addFigure();
    document.body.innerHTML = this.field.join('<br>');
  }
}

const app = new App();
app.run();
