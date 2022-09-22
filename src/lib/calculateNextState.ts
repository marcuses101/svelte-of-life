function getNeighbors(index, numberOfColumns) {
  const rowIndex = Math.floor(index / numberOfColumns);
  const columnIndex = index % numberOfColumns;
  const coordinates: Record<string, [number, number]> = {
    top: [rowIndex - 1, columnIndex],
    topRight: [rowIndex - 1, columnIndex + 1],
    right: [rowIndex, columnIndex + 1],
    bottomRight: [rowIndex + 1, columnIndex + 1],
    bottom: [rowIndex + 1, columnIndex],
    bottomLeft: [rowIndex + 1, columnIndex - 1],
    left: [rowIndex, columnIndex - 1],
    topLeft: [rowIndex - 1, columnIndex - 1],
  };
  return coordinates;
}

function getIndex(rowIndex, columnIndex, numberOfColumns) {
  return rowIndex * numberOfColumns + columnIndex;
}

function countNeighbors({currentIndex, currentCells, numberOfColumns, numberOfRows}): number {
  const coordinates = getNeighbors(currentIndex, numberOfColumns);
  const indexes = Object.values(coordinates)
    .filter(([row, column]) => {
      const rowValid = 0 <= row && row < numberOfRows;
      const columnValid = 0 <= column && column < numberOfColumns;
      return rowValid && columnValid;
    })
    .map(([row, column]) => getIndex(row, column, numberOfColumns));
  const count = indexes.reduce(
    (acc, currentIndex) => acc + (currentCells[currentIndex] ? 1 : 0),
    0
  );
  return count;
}

export function calculateNextState(
  currentCells: boolean[],
  numberOfRows: number,
  numberOfColumns: number
) {
  const newState = currentCells.map((bool, currentIndex) => {
    const numberOfNeighbors = countNeighbors({currentCells, currentIndex, numberOfColumns, numberOfRows});
    if (bool) return numberOfNeighbors === 2 || numberOfNeighbors === 3;
    return numberOfNeighbors === 3
  });
  return newState
}