function rotateFigure() {
  const { x: positionX, y: positionY, positions, positionIndex } = this.currentFigure;
  const spaceLeft = [];
  const spaceRight = [];

  const nextPositionIndex = positions[positionIndex + 1] ? positionIndex + 1 : 0;
  const nextPositionFigure = positions[nextPositionIndex];

  const nextFigureWidth = nextPositionFigure[0].length;
  const nextFigureHeight = nextPositionFigure.filter((v) => v.every((e) => e !== 0)).length;

  for(let i = 0; i < nextFigureWidth; i++) {
    spaceRight.push(this.field[positionY + nextFigureHeight + 1][positionX + i + 1]);
  }
  const ifSpaceRightFree = spaceRight.every((v) => v === 0)

  for(let i = 1; i <= nextFigureWidth; i++) {
    spaceLeft.push(this.field[positionY + nextFigureHeight + 1][positionX - i]);
  }

  const freeSpace = [...spaceLeft, ...spaceRight].filter((v) => v === 0).length;

  if (ifSpaceRightFree) {
    this.currentFigure.positionIndex = nextPositionIndex;
    this.currentFigure.figure = positions[this.currentFigure.positionIndex];
    return;
  }

  if (!ifSpaceRightFree && freeSpace >= nextFigureWidth) {
    this.currentFigure.positionIndex = nextPositionIndex;
    this.currentFigure.figure = positions[this.currentFigure.positionIndex];

    this.currentFigure.x = this.currentFigure.x - spaceRight.filter((v) => v !== 0).length + 1;
    return;
  }
}
export default rotateFigure;