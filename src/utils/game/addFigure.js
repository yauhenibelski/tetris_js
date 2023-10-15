function addFigure() {
  const { x: positionX, y: positionY, figure: currentFigureMatrix } = this.currentFigure;

  currentFigureMatrix.forEach((line, lineIndex) => {
    line.forEach((columItem, columIndex) => {
      if (this.ifFigureInField()) {
        const fieldItem = this.field[lineIndex + positionY][columIndex + positionX];
        const isFieldItemFree = fieldItem === 0;

        if (isFieldItemFree) {
          // fieldItem = columItem
          this.field[lineIndex + positionY][columIndex + positionX] = columItem;
        }
      }
    });
  })
}
export default addFigure;