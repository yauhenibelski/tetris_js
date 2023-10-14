function ifSpaceBelowIsFree() {
  if (this.ifFigureInField()) {
    const { x: positionX, y: positionY, figure: currentFigureMatrix } = this.currentFigure;
    const fieldLength = this.field.length;
    const currentFigureHeight = currentFigureMatrix.length;
    let currentFieldUnderTheFigure = [];

    if (fieldLength === positionY + currentFigureHeight) return false;

    currentFigureMatrix.forEach((line, lineIndex) => {
      line.forEach((columItem, columIndex) => {
        const figureItemIsFree = columItem !== 0;
        const currentFieldItemUnderItemFigure = this.field[lineIndex + positionY + 1][columIndex + positionX];

        if (figureItemIsFree) {
          currentFieldUnderTheFigure.push(currentFieldItemUnderItemFigure);
        }
      });
    });

    currentFieldUnderTheFigure = Array.from(new Set(currentFieldUnderTheFigure));

    const ifFieldItemsUnderItemsFigureFree = !currentFieldUnderTheFigure.some((v) => v !== 0);

    return ifFieldItemsUnderItemsFigureFree;
  }
}
export default ifSpaceBelowIsFree;
