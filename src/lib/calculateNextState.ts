function getNeighbors(
  index: number,
  numberOfRows: number,
  numberOfColumns: number
) {
  const rowIndex = Math.floor(index / numberOfColumns);
  const columnIndex = index % numberOfColumns;

  const topRowIndex = rowIndex === 0 ? numberOfRows - 1 : rowIndex - 1;
  const bottomRowIndex = rowIndex === numberOfRows - 1 ? 0 : rowIndex + 1;
  const leftColumnIndex =
    columnIndex === 0 ? numberOfColumns - 1 : columnIndex - 1;
  const rightColumnIndex =
    columnIndex === numberOfColumns - 1 ? 0 : columnIndex + 1;

  const coordinates: [number, number][] = [
    [topRowIndex, columnIndex],
    [topRowIndex, rightColumnIndex],
    [rowIndex, rightColumnIndex],
    [bottomRowIndex, rightColumnIndex],
    [bottomRowIndex, columnIndex],
    [bottomRowIndex, leftColumnIndex],
    [rowIndex, leftColumnIndex],
    [topRowIndex, leftColumnIndex],
  ];
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
  currentCells: boolean[];
  numberOfColumns: number;
  numberOfRows: number;
}): number {
  const coordinates = getNeighbors(currentIndex, numberOfRows, numberOfColumns);
  const count = coordinates.reduce((acc, [rowCoordinate, columnCoordinate]) => {
    const cellIndex = getIndex(
      rowCoordinate,
      columnCoordinate,
      numberOfColumns
    );
    return acc + (currentCells[cellIndex] ? 1 : 0);
  }, 0);
  return count;
}

export function calculateNextState(
  currentCells: boolean[],
  numberOfRows: number,
  numberOfColumns: number
) {
  const newState = currentCells.map((bool, currentIndex) => {
    const numberOfNeighbors = countNeighbors({
      currentCells,
      currentIndex,
      numberOfColumns,
      numberOfRows,
    });
    if (bool) return numberOfNeighbors === 2 || numberOfNeighbors === 3;
    return numberOfNeighbors === 3;
  });
  return newState;
}
