import createElement from '../utils/view/createElement.js';

class View {
  constructor(game, container) {
    this.container = container;
    this.game = game;
    this.currentFigure = this.addFigure();
  }

  addFigure() {
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

        item.style.width = `${width}px`;
        item.style.height = `${height}px`;
        item.style.left = `${left}px`;
        item.style.top = `${top}px`;

        figureContainer.append(item);
      });
    });

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

        this.currentFigure.append(item);
      });
    });
  }

  moveFigure() {
    const { field } = this.game
    const width = this.container.offsetWidth / field[0].length;
    const height = this.container.offsetHeight / field.length;

    document.onkeydown = (e) => {
      console.log(e)
      if ( e.key === 'ArrowDown') {
        const { moveFigure } = this.game;
        moveFigure('down');
        this.currentFigure.style.top = `${this.game.currentFigure.y * height}px`;
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

  run() {
    this.container.append(this.currentFigure);
    this.moveFigure();
    console.log(this.currentFigure)
  }
}

export default View;