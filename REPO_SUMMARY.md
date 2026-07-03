# Algo App

## Overview

`algo-app` is a React-based educational web app for visualizing algorithms. It provides interactive demonstrations of sorting and pathfinding/search algorithms with animated, real-time updates.

## Key Features

- Search algorithm visualizations for:
  - Breadth-First Search (BFS)
  - Depth-First Search (DFS)
  - Linear Search
  - Binary Search
  - Exponential Search
- Sorting algorithm visualizations for:
  - Quick Sort
  - Merge Sort
  - Insertion Sort
  - Selection Sort
  - Heap Sort
  - Bubble Sort
- Customizable input parameters:
  - Grid size and obstacles for pathfinding (BFS/DFS) visualizations
  - Array size and target value for array-search (Linear/Binary/Exponential) visualizations
  - Array size and value range for sort visualizations
- Live statistics and color-coded animation feedback
- Responsive UI with modern navigation and SVG visuals

## Tech Stack

- React 19.2.0
- React Router DOM 7.10.0
- Create React App (`react-scripts` 5.0.1)
- Jest and React Testing Library for testing
- CSS for styling and animations

## Project Structure

- `src/App.js` - main app and routing
- `src/components/Home.js` - home page and navigation cards
- `src/components/Search/Search.js` - search algorithm visualizer
- `src/components/Sort/Sort.js` - sorting algorithm visualizer
- `src/components/Header/Header.js` - header navigation
- `src/components/Footer/Footer.js` - footer content

## Usage

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start development server:
   ```bash
   npm start
   ```
3. Build for production:
   ```bash
   npm run build
   ```
4. Run tests:
   ```bash
   npm test
   ```

## Purpose

This project is designed for learners who want to understand algorithm behavior visually. It is ideal for computer science students, interview preparation, and anyone exploring algorithm complexity through animation.

## Notes

- The repository is configured as a standard React app.
- The app includes both search/pathfinding and sorting visualizations.
- The project README contains more detailed usage instructions and feature descriptions.
