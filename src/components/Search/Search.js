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

  const runSearch = () => {
    if (!startPoint || !endPoint || grid.length === 0) {
      alert('Please generate a grid first!');
      return;
    }

    if (searchType === 'bfs') {
      performBFS();
    } else if (searchType === 'dfs') {
      performDFS();
    } else if (searchType === 'binary') {
      alert('Binary Search is not applicable to grid pathfinding.');
    } else if (searchType === 'linear') {
      alert('Linear Search is not applicable to grid pathfinding.');
    } else if (searchType === 'exponential') {
      alert('Exponential Search is not applicable to grid pathfinding.');
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

  return (
    <div className="search-container">
      <h1>Search Component</h1>

      <div className="controls">
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
          <label htmlFor="search-type">Search Type:</label>
          <select
            id="search-type"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            disabled={isSearching}
          >
            <option value="bfs">Breadth-First Search (BFS)</option>
            <option value="dfs">Depth-First Search (DFS)</option>
          </select>
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

        <button
          onClick={runSearch}
          className="btn-search"
          disabled={isSearching || grid.length === 0}
        >
          {isSearching ? 'Searching...' : 'Start Search'}
        </button>
      </div>

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
    </div>
  );
};

export default SearchComponent;
