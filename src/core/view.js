import createElement from '../utils/view/createElement.js';

class View {
  constructor(game, container) {
    this.container = container;
    this.game = game;
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



    this.container.append(figureContainer);
    console.dir(this.container)
    console.log(figure);

    return figureContainer;
  }

  run() {
    this.addFigure();
  }
}

export default View;