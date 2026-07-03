import React, { useState } from 'react';
import './Search.css';

/**
 * Search types:
 * Binary Search: This algorithm efficiently finds a target value within a sorted array. It repeatedly divides the search interval in half, eliminating a large portion of the data with each comparison. Its time complexity is O(log n).
 * Linear Search: The simplest search algorithm, linear search sequentially checks each element in a list until the target value is found or the end of the list is reached. It is suitable for small or unsorted datasets, with a time complexity of O(n).
 * Breadth-First Search (BFS): This graph traversal algorithm explores a graph level by level, starting from a source node and visiting all its neighbors before moving to the next level of neighbors. It is used to find the shortest path in unweighted graphs and has a time complexity of O(V+E), where V is the number of vertices and E is the number of edges.
 * Depth-First Search (DFS): Another graph traversal algorithm, DFS explores as far as possible along each branch before backtracking. It is typically implemented using a stack and is used for tasks like finding connected components or topological sorting. Its time complexity is also O(V+E).
 * Exponential Search: Best suited for unbounded or very large sorted datasets, exponential search first finds a range where the target element might reside by repeatedly doubling the search range. Once the range is found, a binary search is performed within that range. Its time complexity is O(log n).
 *
 * @returns
 */

const ARRAY_SEARCH_TYPES = new Set(['linear', 'binary', 'exponential']);

const SearchComponent = () => {
  const [gridSize, setGridSize] = useState(20);
  const [searchType, setSearchType] = useState('bfs');
  const [grid, setGrid] = useState([]);
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);
  const [hasObstacles, setHasObstacles] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [visitedCells, setVisitedCells] = useState(new Set());
  const [pathCells, setPathCells] = useState(new Set());

  const [arraySize, setArraySize] = useState(30);
  const [searchArray, setSearchArray] = useState([]);
  const [target, setTarget] = useState('');
  const [checkingIndices, setCheckingIndices] = useState(new Set());
  const [eliminatedIndices, setEliminatedIndices] = useState(new Set());
  const [foundIndex, setFoundIndex] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [searchStats, setSearchStats] = useState({ comparisons: 0 });

  const isArrayMode = ARRAY_SEARCH_TYPES.has(searchType);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const generateGrid = () => {
    const newGrid = Array(gridSize)
      .fill(null)
      .map(() => Array(gridSize).fill('empty'));

    // Generate random start point
    const randomStart = {
      row: Math.floor(Math.random() * gridSize),
      col: Math.floor(Math.random() * gridSize),
    };
    setStartPoint(randomStart);

    // Generate random end point (ensure it's different from start)
    let randomEnd;
    do {
      randomEnd = {
        row: Math.floor(Math.random() * gridSize),
        col: Math.floor(Math.random() * gridSize),
      };
    } while (
      randomEnd.row === randomStart.row &&
      randomEnd.col === randomStart.col
    );
    setEndPoint(randomEnd);

    // Add obstacles if checkbox is enabled
    if (hasObstacles) {
      const obstacleCount = Math.floor((gridSize * gridSize) / 5);
      for (let i = 0; i < obstacleCount; i++) {
        let row, col;
        do {
          row = Math.floor(Math.random() * gridSize);
          col = Math.floor(Math.random() * gridSize);
        } while (
          (row === randomStart.row && col === randomStart.col) ||
          (row === randomEnd.row && col === randomEnd.col)
        );
        newGrid[row][col] = 'obstacle';
      }
    }

    // Mark start and end points
    newGrid[randomStart.row][randomStart.col] = 'start';
    newGrid[randomEnd.row][randomEnd.col] = 'end';

    setGrid(newGrid);
    setVisitedCells(new Set());
    setPathCells(new Set());
  };

  const generateSearchArray = () => {
    const newArray = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push(Math.floor(Math.random() * 200));
    }
    newArray.sort((a, b) => a - b);

    const randomTarget = newArray[Math.floor(Math.random() * newArray.length)];

    setSearchArray(newArray);
    setTarget(randomTarget);
    setCheckingIndices(new Set());
    setEliminatedIndices(new Set());
    setFoundIndex(null);
    setNotFound(false);
    setSearchStats({ comparisons: 0 });
  };

  const performBFS = async () => {
    setIsSearching(true);
    setVisitedCells(new Set());
    setPathCells(new Set());

    const queue = [[startPoint.row, startPoint.col]];
    const visited = new Set();
    const parent = new Map();
    visited.add(`${startPoint.row},${startPoint.col}`);

    const directions = [
      [-1, 0], //left
      [1, 0], // right
      [0, -1], // up
      [0, 1], // down
    ];

    while (queue.length > 0) {
      const [row, col] = queue.shift();
      const cellKey = `${row},${col}`;
      setVisitedCells((prev) => new Set([...prev, cellKey]));
      await new Promise((resolve) => setTimeout(resolve, 10));

      if (row === endPoint.row && col === endPoint.col) {
        // Reconstruct path
        const path = new Set();
        let current = cellKey;
        while (current) {
          path.add(current);
          current = parent.get(current);
        }
        setPathCells(path);
        setIsSearching(false);
        return;
      }

      for (const [dr, dc] of directions) {
        const newRow = row + dr;
        const newCol = col + dc;
        const newKey = `${newRow},${newCol}`;

        if (
          newRow >= 0 &&
          newRow < gridSize &&
          newCol >= 0 &&
          newCol < gridSize &&
          !visited.has(newKey) &&
          grid[newRow][newCol] !== 'obstacle'
        ) {
          visited.add(newKey);
          parent.set(newKey, cellKey);
          queue.push([newRow, newCol]);
        }
      }
    }

    setIsSearching(false);
  };

  const performDFS = async () => {
    setIsSearching(true);
    setVisitedCells(new Set());
    setPathCells(new Set());

    const stack = [[startPoint.row, startPoint.col]];
    const visited = new Set();
    const parent = new Map();
    visited.add(`${startPoint.row},${startPoint.col}`);

    const directions = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];

    while (stack.length > 0) {
      const [row, col] = stack.pop();
      const cellKey = `${row},${col}`;
      setVisitedCells((prev) => new Set([...prev, cellKey]));
      await new Promise((resolve) => setTimeout(resolve, 50));

      if (row === endPoint.row && col === endPoint.col) {
        const path = new Set();
        let current = cellKey;
        while (current) {
          path.add(current);
          current = parent.get(current);
        }
        setPathCells(path);
        setIsSearching(false);
        return;
      }

      for (const [dr, dc] of directions) {
        const newRow = row + dr;
        const newCol = col + dc;
        const newKey = `${newRow},${newCol}`;

        if (
          newRow >= 0 &&
          newRow < gridSize &&
          newCol >= 0 &&
          newCol < gridSize &&
          !visited.has(newKey) &&
          grid[newRow][newCol] !== 'obstacle'
        ) {
          visited.add(newKey);
          parent.set(newKey, cellKey);
          stack.push([newRow, newCol]);
        }
      }
    }

    setIsSearching(false);
  };

  const performLinearSearch = async () => {
    setIsSearching(true);
    setFoundIndex(null);
    setNotFound(false);
    setEliminatedIndices(new Set());
    let comparisons = 0;

    for (let i = 0; i < searchArray.length; i++) {
      comparisons++;
      setCheckingIndices(new Set([i]));
      setSearchStats({ comparisons });
      await sleep(40);

      if (searchArray[i] === Number(target)) {
        setFoundIndex(i);
        setCheckingIndices(new Set());
        setIsSearching(false);
        return;
      }
    }

    setNotFound(true);
    setCheckingIndices(new Set());
    setIsSearching(false);
  };

  const performBinarySearch = async () => {
    setIsSearching(true);
    setFoundIndex(null);
    setNotFound(false);
    let comparisons = 0;
    let low = 0;
    let high = searchArray.length - 1;

    while (low <= high) {
      const eliminated = new Set();
      for (let k = 0; k < low; k++) eliminated.add(k);
      for (let k = high + 1; k < searchArray.length; k++) eliminated.add(k);
      setEliminatedIndices(eliminated);

      const mid = Math.floor((low + high) / 2);
      comparisons++;
      setCheckingIndices(new Set([mid]));
      setSearchStats({ comparisons });
      await sleep(400);

      if (searchArray[mid] === Number(target)) {
        setFoundIndex(mid);
        setCheckingIndices(new Set());
        setIsSearching(false);
        return;
      } else if (searchArray[mid] < Number(target)) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    setNotFound(true);
    setCheckingIndices(new Set());
    setIsSearching(false);
  };

  const performExponentialSearch = async () => {
    setIsSearching(true);
    setFoundIndex(null);
    setNotFound(false);
    setEliminatedIndices(new Set());
    let comparisons = 0;
    const n = searchArray.length;
    const targetNum = Number(target);

    if (n === 0) {
      setIsSearching(false);
      return;
    }

    comparisons++;
    setCheckingIndices(new Set([0]));
    setSearchStats({ comparisons });
    await sleep(400);

    if (searchArray[0] === targetNum) {
      setFoundIndex(0);
      setCheckingIndices(new Set());
      setIsSearching(false);
      return;
    }

    let bound = 1;
    while (bound < n && searchArray[bound] < targetNum) {
      comparisons++;
      setCheckingIndices(new Set([bound]));
      setSearchStats({ comparisons });
      await sleep(300);
      bound *= 2;
    }

    let low = Math.floor(bound / 2);
    let high = Math.min(bound, n - 1);

    while (low <= high) {
      const eliminated = new Set();
      for (let k = 0; k < low; k++) eliminated.add(k);
      for (let k = high + 1; k < n; k++) eliminated.add(k);
      setEliminatedIndices(eliminated);

      const mid = Math.floor((low + high) / 2);
      comparisons++;
      setCheckingIndices(new Set([mid]));
      setSearchStats({ comparisons });
      await sleep(400);

      if (searchArray[mid] === targetNum) {
        setFoundIndex(mid);
        setCheckingIndices(new Set());
        setIsSearching(false);
        return;
      } else if (searchArray[mid] < targetNum) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    setNotFound(true);
    setCheckingIndices(new Set());
    setIsSearching(false);
  };

  const runSearch = () => {
    if (isArrayMode) {
      if (searchArray.length === 0 || target === '') {
        alert('Please generate an array first!');
        return;
      }

      if (searchType === 'linear') {
        performLinearSearch();
      } else if (searchType === 'binary') {
        performBinarySearch();
      } else if (searchType === 'exponential') {
        performExponentialSearch();
      }
      return;
    }

    if (!startPoint || !endPoint || grid.length === 0) {
      alert('Please generate a grid first!');
      return;
    }

    if (searchType === 'bfs') {
      performBFS();
    } else if (searchType === 'dfs') {
      performDFS();
    }
  };

  const getCellClass = (cell, rowIndex, colIndex) => {
    const cellKey = `${rowIndex},${colIndex}`;
    if (pathCells.has(cellKey)) return 'cell cell-path';
    if (visitedCells.has(cellKey)) return 'cell cell-visited';
    if (cell === 'start') return 'cell cell-start';
    if (cell === 'end') return 'cell cell-end';
    if (cell === 'obstacle') return 'cell cell-obstacle';
    return 'cell cell-empty';
  };

  const getArrayCellClass = (index) => {
    if (foundIndex === index) return 'array-cell array-cell-found';
    if (checkingIndices.has(index)) return 'array-cell array-cell-checking';
    if (eliminatedIndices.has(index)) return 'array-cell array-cell-eliminated';
    return 'array-cell array-cell-default';
  };

  return (
    <div className="search-container">
      <h1>Search Component</h1>

      <div className="controls">
        <div className="control-group">
          <label htmlFor="search-type">Search Type:</label>
          <select
            id="search-type"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            disabled={isSearching}
          >
            <option value="bfs">Breadth-First Search (BFS)</option>
            <option value="dfs">Depth-First Search (DFS)</option>
            <option value="linear">Linear Search</option>
            <option value="binary">Binary Search</option>
            <option value="exponential">Exponential Search</option>
          </select>
        </div>

        {isArrayMode ? (
          <>
            <div className="control-group">
              <label htmlFor="array-size">Array Size:</label>
              <input
                id="array-size"
                type="number"
                min="5"
                max="100"
                value={arraySize}
                onChange={(e) => setArraySize(Number(e.target.value))}
                disabled={isSearching}
              />
            </div>

            <div className="control-group">
              <label htmlFor="target-value">Target:</label>
              <input
                id="target-value"
                type="number"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                disabled={isSearching}
              />
            </div>

            <button
              onClick={generateSearchArray}
              className="btn-generate"
              disabled={isSearching}
            >
              Generate Array
            </button>
          </>
        ) : (
          <>
            <div className="control-group">
              <label htmlFor="grid-size">Grid Size:</label>
              <input
                id="grid-size"
                type="number"
                min="5"
                max="50"
                value={gridSize}
                onChange={(e) => setGridSize(Number(e.target.value))}
                disabled={isSearching}
              />
            </div>

            <div className="control-group">
              <label htmlFor="obstacles">
                <input
                  id="obstacles"
                  type="checkbox"
                  checked={hasObstacles}
                  onChange={(e) => setHasObstacles(e.target.checked)}
                  disabled={isSearching}
                />
                Add Obstacles
              </label>
            </div>

            <button
              onClick={generateGrid}
              className="btn-generate"
              disabled={isSearching}
            >
              Generate Grid
            </button>
          </>
        )}

        <button
          onClick={runSearch}
          className="btn-search"
          disabled={
            isSearching ||
            (isArrayMode ? searchArray.length === 0 : grid.length === 0)
          }
        >
          {isSearching ? 'Searching...' : 'Start Search'}
        </button>
      </div>

      {isArrayMode ? (
        <>
          {searchArray.length > 0 && (
            <div className="grid-info">
              <p>Search Type: {searchType.toUpperCase()}</p>
              <p>Array Size: {arraySize} (sorted)</p>
              <p>
                Target: {target} | Comparisons: {searchStats.comparisons}
              </p>
              {foundIndex !== null && (
                <p>Found at index {foundIndex}!</p>
              )}
              {notFound && <p>Target not found in array.</p>}
            </div>
          )}

          <div className="array-wrapper">
            {searchArray.length > 0 ? (
              <div className="array-container">
                {searchArray.map((value, index) => (
                  <div
                    key={index}
                    className={getArrayCellClass(index)}
                    title={`index ${index}`}
                  >
                    {value}
                  </div>
                ))}
              </div>
            ) : (
              <p className="placeholder">Click "Generate Array" to start</p>
            )}
          </div>
        </>
      ) : (
        <>
          {grid.length > 0 && (
            <div className="grid-info">
              <p>Search Type: {searchType.toUpperCase()}</p>
              <p>
                Grid Size: {gridSize}x{gridSize}
              </p>
              <p>
                Visited: {visitedCells.size} | Path: {pathCells.size}
              </p>
            </div>
          )}

          <div className="grid-wrapper">
            {grid.length > 0 ? (
              <div
                className="grid"
                style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
              >
                {grid.map((row, rowIndex) =>
                  row.map((cell, colIndex) => (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      className={getCellClass(cell, rowIndex, colIndex)}
                      title={`(${rowIndex}, ${colIndex})`}
                    />
                  ))
                )}
              </div>
            ) : (
              <p className="placeholder">Click "Generate Grid" to start</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchComponent;
