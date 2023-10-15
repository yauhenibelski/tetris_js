import createElement from '../utils/view/createElement.js';

class View {
  constructor(game, container) {
    this.container = container;
    this.game = game;
    this.randomColor = `#${Math.random().toString(16).substring(2, 8)}`;
    this.currentFigure = this.addFigure();
  }

  addFigure() {
    this.randomColor = `#${Math.random().toString(16).substring(2, 8)}`;

    const { figure, x, y } = this.game.currentFigure;
    const { field } = this.game;
    const figureContainer = createElement({ tagName: 'div', className: 'figure-container' });
    const width = this.container.offsetWidth / field[0].length;
    const height = this.container.offsetHeight / field.length;

    figureContainer.style.top = `${y * height}px`;
    figureContainer.style.left = `${x * width}px`;

    figure.forEach((line, lineIndex) => {
      line.forEach((columItem, columIndex) => {
        const item = createElement({ tagName: 'div', className: columItem ? 'item' : '' });

        const left = width * columIndex;
        const top = height * lineIndex;

        if (columItem !== 0) {
          item.style.width = `${width}px`;
          item.style.height = `${height}px`;
          item.style.left = `${left}px`;
          item.style.top = `${top}px`;

          item.style.backgroundColor = this.randomColor;
        }

        figureContainer.append(item);
      });
    });
    this.currentFigure = figureContainer;

    return figureContainer;
  }

  rotateFigure() {
    this.currentFigure.innerHTML = '';

    const { figure, x, y } = this.game.currentFigure;
    const { field } = this.game;
    const width = this.container.offsetWidth / field[0].length;
    const height = this.container.offsetHeight / field.length;

    figure.forEach((line, lineIndex) => {
      line.forEach((columItem, columIndex) => {
        const item = createElement({ tagName: 'div', className: columItem ? 'item' : '' });

        const left = width * columIndex;
        const top = height * lineIndex;

        item.style.width = `${width}px`;
        item.style.height = `${height}px`;
        item.style.left = `${left}px`;
        item.style.top = `${top}px`;

        if (columItem) {
          item.style.backgroundColor = this.randomColor;
          this.currentFigure.append(item);
        }

      });
    });
  }

  moveFigure() {
    const { field } = this.game
    const width = this.container.offsetWidth / field[0].length;
    const height = this.container.offsetHeight / field.length;

    document.onkeydown = (e) => {
      if ( e.key === 'ArrowDown') {
        const { moveFigure, ifSpaceBelowIsFree } = this.game;
        moveFigure('down');
        this.currentFigure.style.top = `${this.game.currentFigure.y * height}px`;

        if(!ifSpaceBelowIsFree()) {
          this.fixationFigure();
          this.addNewFigure();
        }
      }
      if ( e.key === 'ArrowLeft') {
        const { moveFigure } = this.game;

        moveFigure('left');
        this.currentFigure.style.left = `${this.game.currentFigure.x * width}px`;
      }
      if ( e.key === 'ArrowRight') {
        const { moveFigure } = this.game;

        moveFigure('right');
        this.currentFigure.style.left = `${this.game.currentFigure.x * width}px`;
      }
      if ( e.key === 'ArrowUp') {
        const { rotateFigure } = this.game;

        rotateFigure();
        this.rotateFigure();

        this.currentFigure.style.top = `${this.game.currentFigure.y * height}px`;
        this.currentFigure.style.left = `${this.game.currentFigure.x * width}px`;
      }
    }
  }

  addNewFigure() {
    const { addNewFigure } = this.game;
    addNewFigure();
    this.currentFigure = this.addFigure();
    this.container.append(this.currentFigure);
  }

  fixationFigure() {
    const { addFigure } = this.game;
    addFigure();
  }

  run() {
    this.moveFigure();
    this.container.append(this.currentFigure);
  }
}

export default View;