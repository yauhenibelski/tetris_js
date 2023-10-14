function moveFigure(val) {
  switch(val) {
    case 'down': {
      if (this.ifFigureInField() && this.ifSpaceBelowIsFree()) {
        this.currentFigure.y += 1;
      }
      break;
    }
    case 'left': {
      if (this.ifSpaceInTheLeftOrRightOfFigure('left')) {
        this.currentFigure.x -= 1;

        if (!this.ifFigureInField()) {
          this.currentFigure.x += 1;
        }
      }
      break;
    }
    case 'right': {
      if (this.ifSpaceInTheLeftOrRightOfFigure('right')) {
        this.currentFigure.x += 1;

        if (!this.ifFigureInField()) {
          this.currentFigure.x -= 1;
        }
      }
      break;
    }
  }
}

export default moveFigure;