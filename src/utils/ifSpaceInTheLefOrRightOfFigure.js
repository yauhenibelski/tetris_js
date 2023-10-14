function ifSpaceInTheLeftOrRightOfFigure(val) {
  const { x: positionX, y: positionY, figure: currentFigureMatrix } = this.currentFigure;
  const figureSize = currentFigureMatrix[0].length;
  const position = val === 'left' ? positionX  - 1 : positionX + figureSize;

  const itemLeftOfRightOfFigure = currentFigureMatrix.map((_, lineIndex) => {
    const item = this.field[lineIndex + positionY][position];

    return item;
  });

  return !itemLeftOfRightOfFigure.some((v) => v !== 0);
}

export default ifSpaceInTheLeftOrRightOfFigure;