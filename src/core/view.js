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

    const { figure, y, x } = this.game.currentFigure;
    const { field } = this.game;
    const figureContainer = createElement({ tagName: 'div', className: 'figure-container' });
    const width = this.container.offsetWidth / field[0].length;
    const height = this.container.offsetHeight / field.length;

    figure.forEach((line, lineIndex) => {
      line.forEach((columItem, columIndex) => {
        const item = createElement({ tagName: 'div', className: columItem ? 'item' : '' });

        const left = width * columIndex + x * width;
        const top = height * lineIndex + y * height;

        if (columItem !== 0 && item.classList.contains('item')) {
          item.style.width = `${width}px`;
          item.style.height = `${height}px`;
          item.style.left = `${left}px`;
          item.style.top = `${top}px`;

          item.style.backgroundColor = this.randomColor;
          figureContainer.append(item);
        }
      });
    });

    return figureContainer;
  }

  renderFigure() {
    this.currentFigure.innerHTML = '';

    const { figure, y, x } = this.game.currentFigure;
    const { field } = this.game;
    const width = this.container.offsetWidth / field[0].length;
    const height = this.container.offsetHeight / field.length;

    figure.forEach((line, lineIndex) => {
      line.forEach((columItem, columIndex) => {
        const item = createElement({ tagName: 'div', className: columItem ? 'item' : '' });

        const left = width * columIndex + x * width;
        const top = height * lineIndex + y * height;3

        item.style.width = `${width}px`;
        item.style.height = `${height}px`;
        item.style.left = `${left}px`;
        item.style.top = `${top}px`;

        if (columItem !== 0 && item.classList.contains('item')) {
          item.style.backgroundColor = this.randomColor;

          this.currentFigure.append(item);
        }
      });
    });
  }

  moveFigure() {
    document.onkeydown = (e) => {
      const { moveFigure, ifSpaceBelowIsFree, ifRowFill, rotateFigure } = this.game;

      if ( e.key === 'ArrowDown') {
        moveFigure('down');
        this.renderFigure();

        if(!ifSpaceBelowIsFree()) {
          this.fixationFigure();

          // if (ifRowFill.bind(this.game)()) {
          //   const fullRows = ifRowFill.bind(this.game)();

          //   const items = Array.from(document.querySelectorAll('.item'))
          //     .filter((elem) => fullRows.includes(Number(elem.getAttribute('y'))));

          //   items.forEach((item) => item.remove());

          //   // itemsContainers.forEach((elem) => {
          //   //   const top = parseInt(elem.style.top);
          //   //   const height = parseInt(elem.children[0].style.height);

          //   //   elem.style.top = `${top + height}px`;
          //   // });
          // }

          this.addNewFigure();
        }
      }
      if ( e.key === 'ArrowLeft') {
        moveFigure('left');
        this.renderFigure();
      }
      if ( e.key === 'ArrowRight') {
        moveFigure('right');
        this.renderFigure();
      }
      if ( e.key === 'ArrowUp') {
        rotateFigure();
        this.renderFigure();
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
    const { getPositionNewFigureInMatrix } = this.game;
    const getPositionNewFigure = getPositionNewFigureInMatrix.bind(this.game);
    const position = getPositionNewFigure();

    Array.from(this.currentFigure.children).forEach((elem, i) => {
      const [y, x] = position[i];

      elem.setAttribute('y', y);
      elem.setAttribute('x', x);
    });
  }

  run() {
    this.moveFigure();
    this.container.append(this.currentFigure)
  }
}

export default View;