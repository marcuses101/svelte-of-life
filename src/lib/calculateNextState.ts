function getNeighbors(index: number, numberOfColumns: number) {
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

function getIndex(
  rowIndex: number,
  columnIndex: number,
  numberOfColumns: number
) {
  return rowIndex * numberOfColumns + columnIndex;
}

function countNeighbors({
  currentIndex,
  currentCells,
  numberOfColumns,
  numberOfRows,
}: {
  currentIndex: number;
  currentCells: (1 | 0)[];
  numberOfColumns: number;
  numberOfRows: number;
}): number {
  const coordinates = getNeighbors(currentIndex, numberOfColumns);
  const count = Object.values(coordinates).reduce(
    (acc, [rowCoordinate, columnCoordinate]) => {
      const rowValid = 0 <= rowCoordinate && rowCoordinate < numberOfRows;
      const columnValid =
        0 <= columnCoordinate && columnCoordinate <= numberOfColumns;
      if (!rowValid || !columnValid) return acc;
      const cellIndex = getIndex(
        rowCoordinate,
        columnCoordinate,
        numberOfColumns
      );
      return acc + currentCells[cellIndex];
    },
    0
  );
  return count;
}

export function calculateNextState(
  currentCells: boolean[],
  numberOfRows: number,
  numberOfColumns: number
) {
  const cellsInBits = currentCells.map((bool) => (bool ? 1 : 0));
  const newState = currentCells.map((bool, currentIndex) => {
    const numberOfNeighbors = countNeighbors({
      currentCells: cellsInBits,
      currentIndex,
      numberOfColumns,
      numberOfRows,
    });
    if (bool) return numberOfNeighbors === 2 || numberOfNeighbors === 3;
    return numberOfNeighbors === 3;
  });
  return newState;
}
