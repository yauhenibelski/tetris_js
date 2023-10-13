import { figures } from "./figures.js";
import addFigure from "./utils/addFigure.js";
import { getRandomNum } from "./utils/getRandomNum.js";
import ifSpaceBelowIsFree from "./utils/ifSpaceBelowIsFree.js";
import ifFigureInField from "./utils/ifFigureInField.js";
import moveFigure from "./utils/moveFigure.js";
import ifSpaceInTheLefOrRightOfFigure from "./utils/ifSpaceInTheLefOrRightOfFigure.js";

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
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,2,0,0,3,0,0,8,0],
    [2,2,2,3,3,3,0,8,0]
  ];
  figuresKeys = Object.keys(Object.fromEntries(figures));
  // firstRandomFigure = figures.get( this.figuresKeys[getRandomNum(this.figuresKeys.length, 0)] );
  firstRandomFigure = figures.get( this.figuresKeys[3] );

  currentFigure = Object.assign(this.firstRandomFigure, {
    figure: this.firstRandomFigure.positions[0],
    positionIndex: 0,
    x: 0,
    y: 0,
  })

  ifSpaceInTheLefOrRightOfFigure = ifSpaceInTheLefOrRightOfFigure.bind(this);
  ifSpaceBelowIsFree = ifSpaceBelowIsFree.bind(this);
  ifFigureInField = ifFigureInField.bind(this);
  moveFigure = moveFigure.bind(this);
  addFigure = addFigure.bind(this);

  run() {
    this.moveFigure('down');
    this.moveFigure('down');
    this.moveFigure('down');
    this.moveFigure('down');
    // this.moveFigure('down');
    this.moveFigure('down');
    this.moveFigure('down');
    this.moveFigure('down');
    this.moveFigure('down');
    this.moveFigure('down');
    this.moveFigure('down');
    this.moveFigure('down');
    this.moveFigure('down');
    this.moveFigure('down');
    this.moveFigure('down');
    this.moveFigure('right');
    // this.moveFigure('right');
    this.moveFigure('down');
    this.moveFigure('right');
    this.moveFigure('right');
    this.moveFigure('right');
    // this.moveFigure('left');
    // this.moveFigure('left');
    // this.moveFigure('left');
    this.moveFigure('right');
    // this.moveFigure('down');
    this.moveFigure('down');
    this.moveFigure('right');
    // this.moveFigure('left');
    // this.moveFigure('down');
    // this.moveFigure('down');

    // this.addFigure();
    // console.log(this.ifFigureInField());
    // console.log(this.currentFigure)
    // console.log(true)
    this.addFigure();
    this.ifSpaceInTheLefOrRightOfFigure('left');
    this.ifSpaceInTheLefOrRightOfFigure('right');
    document.body.innerHTML = this.field.join('<br>');
  }
}

const app = new App();
app.run();
