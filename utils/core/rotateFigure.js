function rotateFigure() {
  const { x: positionX, y: positionY, figure, positions, positionIndex } = this.currentFigure;
  const figureWidth = figure[0].length;
    const fieldLineLength = this.field[0].length;
    const spaceLeft = [];
    const spaceRight = [];

    const nextPositionIndex = positions[positionIndex + 1] ? positionIndex + 1 : 0;
    const nextPositionFigure = positions[nextPositionIndex];
    const nextFigureWidth = nextPositionFigure[0].length;
    const nextFigureHeight = nextPositionFigure.filter((v) => v.every((e) => e !== 0)).length;

    for(let i = 0; i < nextFigureWidth; i++) {
      spaceRight.push(this.field[positionY + nextFigureHeight - 1][positionX + i]);
    }
    const ifSpaceRightFree = spaceRight.every((v) => v === 0)

    for(let i = 1; i <= nextFigureWidth; i++) {
      spaceLeft.push(this.field[positionY + nextFigureHeight][positionX - i]);
    }
    const ifSpaceLeftFree = spaceLeft.every((v) => v === 0 && v !== undefined)

    if (!this.ifSpaceInTheLeftOrRightOfFigure('left') && ifSpaceRightFree) {
      this.currentFigure.positionIndex = nextPositionIndex;
      this.currentFigure.figure = positions[this.currentFigure.positionIndex];

      if (positionX + figureWidth > fieldLineLength) {
        positionX = fieldLineLength - figureWidth;
      }
      return;
    }
    if (ifSpaceLeftFree) {
      this.currentFigure.positionIndex = nextPositionIndex;
      this.currentFigure.figure = positions[this.currentFigure.positionIndex];
      this.currentFigure.x = positionX - nextFigureWidth;
    }
}
export default rotateFigure;