# Algorithm Visualizer

An interactive web application for visualizing sorting and searching algorithms in real-time. Built with React, this educational tool helps users understand how different algorithms work through dynamic animations and step-by-step visualizations.

## Features

### 🔍 Search Algorithms
- **Breadth-First Search (BFS)** - Explores paths level by level
- **Depth-First Search (DFS)** - Explores paths as far as possible before backtracking
- Customizable grid size (5-50)
- Toggle obstacles on/off
- Real-time path visualization with color coding:
  - 🟢 Green: Start point
  - 🔴 Red: End point
  - 🟡 Yellow: Visited cells
  - 🟩 Light Green: Final path
  - ⬛ Black: Obstacles

### 📊 Sorting Algorithms
- **Quick Sort** - Divide-and-conquer with O(n log n) average complexity
- **Merge Sort** - Consistent O(n log n) performance
- **Insertion Sort** - Efficient for small datasets
- **Selection Sort** - Simple but slower O(n²) approach
- Customizable array size (10-200)
- Adjustable value range
- Live statistics (comparisons and swaps)
- Real-time bar visualization with color feedback:
  - 🔵 Blue: Default/unsorted
  - 🟠 Orange: Currently comparing
  - 🔴 Red: Recently swapped
  - 🟢 Green: Sorted elements

### 🏠 Home Page
- Beautiful gradient UI with modern navigation cards
- SVG visualizations for each algorithm category
- Quick access to all features
- Responsive design for all screen sizes

## Tech Stack

- **Frontend**: React 19.2.0
- **Routing**: React Router DOM 7.10.0
- **Styling**: CSS3 with animations
- **Testing**: Jest & React Testing Library

## How to Run

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd alg-app

# Install dependencies
npm install
```

### Development Mode

```bash
npm start
```

Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page reloads automatically when you make changes.

### Build for Production

```bash
npm run build
```

Builds the app for production to the `build` folder.

### Run Tests

```bash
npm test
```

Launches the test runner in interactive watch mode.

## Project Structure

```
src/
├── components/
│   ├── Header/              # Navigation header
│   ├── Home.js              # Home page with navigation cards
│   ├── Search/              # Search algorithm visualizer
│   ├── Sort/                # Sort algorithm visualizer
│   └── Footer/              # Footer component
├── App.js                   # Main app with routing
├── App.css                  # Global styles
└── index.js                 # React entry point
```

## How to Use

1. **Home Page**: Click on either "Search Algorithms" or "Sorting Algorithms" card
2. **Search Page**: 
   - Set grid size and toggle obstacles
   - Click "Generate Grid" to create random start/end points
   - Select BFS or DFS from dropdown
   - Click "Start Search" to visualize the algorithm
3. **Sort Page**:
   - Set array size and value range
   - Click "Generate Array" to create random numbers
   - Select a sorting algorithm
   - Click "Start Sort" to watch the visualization

## Performance Tips

- For larger arrays (150+), use Quick Sort or Merge Sort for faster execution
- Use smaller grids for Search (10-20) to see finer detail in pathfinding
- Each visualization updates at controlled intervals for optimal performance

## Learning Resources

This visualizer is perfect for:
- Computer Science students learning algorithm fundamentals
- Interview preparation
- Understanding algorithm complexity
- Comparing algorithm efficiency visually

## Future Enhancements

- [ ] Additional sorting algorithms (Heap Sort, Bubble Sort)
- [ ] Advanced search algorithms (A*, Dijkstra)
- [ ] Step-by-step replay functionality
- [ ] Speed adjustment slider
- [ ] Algorithm complexity analysis panel
- [ ] Code snippet display

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Feel free to submit pull requests or issues.