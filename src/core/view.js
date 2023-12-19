import createElement from '../utils/view/createElement.js';
import getItemsByYIndex from '../utils/view/getItemsByYindex.js';
import getItemsUntilYIndex from '../utils/view/getItemsUntilYindex.js';
import { results, saveResultInLocalStorage, showResult } from '../utils/view/results.js';

class View {
  constructor(game, container) {
    this.rootContainer = container;
    this.container = container.firstElementChild;
    this.field = this.container.querySelector('.field');

    this.game = game;
    this.randomColor = `#${Math.random().toString(16).substring(2, 8)}`;
    this.currentFigure = this.addFigure();
    this.interval = undefined;
    this.lines = this.container.querySelector('.lines');
    this.resultElem = this.container.querySelector('.results');
    this.audio = document.querySelector('audio');
    this.muteBTN = document.querySelector('#mute');
  }

  addFigure() {
    this.randomColor = `#${Math.random().toString(16).substring(2, 8)}`;

    const { figure, y, x } = this.game.currentFigure;
    const { field } = this.game;
    const figureContainer = createElement({ tagName: 'div', className: 'figure-container' });
    const width = this.field.offsetWidth / field[0].length;
    const height = this.field.offsetHeight / field.length;

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
    const width = this.field.offsetWidth / field[0].length;
    const height = this.field.offsetHeight / field.length;

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

  moveDown() {
    const { moveFigure, ifSpaceBelowIsFree, ifRowFull, removeFullRow, field, ifGameLost } = this.game;

    const lostGame = ifGameLost.bind(this.game);

    if (lostGame()) {
      clearInterval(this.interval);
      const data = new Date()

      // добавить попап и навести порядок
      alert(`Your result ${this.lines.innerText} Lines!`);

      results.addResult([this.lines.innerText, `${data.getDate()}.${data.getMonth() + 1}.${data.getFullYear()} - ${data.getHours()}:${data.getMinutes()}`])

      saveResultInLocalStorage();
      showResult(this.resultElem);

      this.game.field = new Array(20).fill(0).map(() => [0, 0, 0, 0, 0, 0, 0, 0, 0]);
      this.field.innerHTML = '';
      this.lines.innerHTML = 0;
      this.currentFigure = this.addFigure();
      this.field.append(this.currentFigure);
      this.interval = setInterval(() => {
        this.moveDown();
      }, 500);
      return;
    }

    moveFigure('down');

    this.renderFigure();

    if(!ifSpaceBelowIsFree()) {
      this.fixationFigure();

      const fullRows = ifRowFull.bind(this.game)();
      const removeFullMatrixRow = removeFullRow.bind(this.game);

      if (fullRows) {
        const rows = this.game.field.length - 1;
        const itemsContainers = Array.from(document.querySelectorAll('.figure-container'));
        const items = Array.from(document.querySelectorAll('.item'));

        // remove && move down items
        field.forEach((line, i) => {
          const currentLine = getItemsByYIndex(items, i)
          const itemsToMoveDown = getItemsUntilYIndex(items, i)

          if (line.every((v) => v === 1)) {
            currentLine.forEach((elem) => elem.remove());
            removeFullMatrixRow(i);
            this.lines.innerText = `${Number(this.lines.innerText) + 1}`;

            itemsToMoveDown.forEach((elem) => {
              const top = parseInt(elem.style.top);
              const height = parseInt(elem.style.height);
              const y = Number(elem.getAttribute('y'))

              elem.setAttribute('y', y + 1 === rows ? rows : y + 1);
              elem.style.top = `${top + height}px`;
            })

          }
        });

        // remove empty containers
        itemsContainers.forEach((elem) => elem.firstChild ? false : elem.remove());
      }
      this.addNewFigure();
      // console.log([...field].join('\n'));
    }
  };

  moveFigure() {
    document.onkeydown = (e) => {
      const { moveFigure, rotateFigure, ifGameLost } = this.game;
      const lostGame = ifGameLost.bind(this.game);

      if ( e.key === 'ArrowDown') {
        this.moveDown();
      }
      if ( e.key === 'ArrowLeft' && !lostGame()) {
        moveFigure('left');
        this.renderFigure();
      }
      if ( e.key === 'ArrowRight' && !lostGame()) {
        moveFigure('right');
        this.renderFigure();
      }
      if ( e.key === 'ArrowUp' && !lostGame()) {
        rotateFigure();
        this.renderFigure();
      }
    }
  }

  addNewFigure() {
    const { addNewFigure } = this.game;
    addNewFigure();

    this.currentFigure = this.addFigure();
    this.field.append(this.currentFigure);
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
    this.field.append(this.currentFigure);

    alert(`Управление стрелками на клавиатуре \n Ps: Стрелка вверх вращает фигуру`);


    let clientX;
    let clientY; 
 
    document.body.oncontextmenu = (e) => e.stopPropagation(); 
    document.body.ontouchstart = (e) => {
      clientX = e.changedTouches[0].clientX;
      clientY = e.changedTouches[0].clientY;
    };
    document.body.ontouchend = (e) => {
      const differenceX = e.changedTouches[0].clientX - clientX;
      const differenceY = e.changedTouches[0].clientY - clientY;

      if(Math.abs(differenceX) > Math.abs(differenceY)) {
        const value = differenceX > 0 ? 'right' : 'left';
        if (Math.abs(differenceX) > 30) {
          this.game.moveFigure(value);
          this.renderFigure();
        }
      } else {
        const value = differenceY > 0 ? 'down' : 'top';
        if (Math.abs(differenceY) < 30) return;
        if (value === 'down') this.moveDown();
        if (value === 'top') {
          this.game.rotateFigure();
          this.renderFigure();
        }
      }
    };

    showResult(this.resultElem);

    this.muteBTN.onclick = (e) => {
      if (this.audio.paused) {
        this.audio.play();
        this.muteBTN.innerText = 'Mute OFF'
      } else {
        this.audio.pause();
        this.muteBTN.innerText = 'Mute ON'
      }
    }

    this.interval = setInterval(() => {
      this.moveDown();
    }, 500);
  }
}

export default View;