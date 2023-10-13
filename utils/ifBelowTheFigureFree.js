function ifBelowTheFigureFree() {
  if (this.ifFigureInField()) {
    const { x: positionX, y: positionY, figure: currentFigureMatrix } = this.currentFigure;
    let currentFieldUnderTheFigure = [];

    currentFigureMatrix.forEach((line, lineIndex) => {
      line.forEach((columItem, columIndex) => {
        const figureItemIsFree = columItem !== 0;
        const currentFieldItemUnderItemFigure = this.field[lineIndex + this.currentFigure.y + 1][columIndex + this.currentFigure.x];

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
export default ifBelowTheFigureFree;
