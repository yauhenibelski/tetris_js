import Game from "./src/core/game.js";
import View from "./src/core/view.js";

const root = document.querySelector('#root');

const game = new Game();
const view = new View(game, root);

view.run();
window.game = game;

