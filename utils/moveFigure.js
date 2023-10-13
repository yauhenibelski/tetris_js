function moveFigure(val) {
  switch(val) {
    case 'down': {
      if (this.ifFigureInField() && this.ifBelowTheFigureFree()) {
        this.currentFigure.y += 1;
      }
      break;
    }
    case 'left': {
      this.currentFigure.x -= 1;
      if (!this.ifFigureInField()) {
        this.currentFigure.x += 1;
      }
      break;
    }
    case 'right': {
      this.currentFigure.x += 1;
      if (!this.ifFigureInField()) {
        this.currentFigure.x -= 1;
      }
      break;
    }
  }
}

export default moveFigure;