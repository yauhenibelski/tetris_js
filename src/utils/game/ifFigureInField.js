function ifFigureInField() {
  const { x: positionX, y: positionY, figure: currentFigure } = this.currentFigure;
  const fieldLineLength = this.field[0].length;
  const fieldColumns = this.field.length - 1;
  const figureSize = currentFigure[0].length

  return (
    (positionX + figureSize <= fieldLineLength)
      && (positionX >= 0)
      && (positionY <= fieldColumns)
  )
}

export default ifFigureInField;