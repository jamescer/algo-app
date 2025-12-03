import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const SearchSVG = () => (
  <svg
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
    className="nav-svg"
  >
    {/* Grid background */}
    <g stroke="#e0e0e0" strokeWidth="2">
      <line x1="40" y1="40" x2="160" y2="40" />
      <line x1="40" y1="70" x2="160" y2="70" />
      <line x1="40" y1="100" x2="160" y2="100" />
      <line x1="40" y1="130" x2="160" y2="130" />
      <line x1="40" y1="40" x2="40" y2="130" />
      <line x1="70" y1="40" x2="70" y2="130" />
      <line x1="100" y1="40" x2="100" y2="130" />
      <line x1="130" y1="40" x2="130" y2="130" />
      <line x1="160" y1="40" x2="160" y2="130" />
    </g>

    {/* Start point */}
    <circle cx="55" cy="55" r="6" fill="#4caf50" />

    {/* End point */}
    <circle cx="145" cy="115" r="6" fill="#f44336" />

    {/* Path line */}
    <path
      d="M 55 55 Q 100 70 145 115"
      stroke="#2196f3"
      strokeWidth="2"
      fill="none"
      strokeDasharray="4 4"
    />

    {/* Visited cells */}
    <rect x="68" y="53" width="16" height="16" fill="#fff59d" opacity="0.7" />
    <rect x="98" y="68" width="16" height="16" fill="#fff59d" opacity="0.7" />
    <rect x="128" y="98" width="16" height="16" fill="#fff59d" opacity="0.7" />
  </svg>
);

const SortSVG = () => (
  <svg
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
    className="nav-svg"
  >
    {/* Bars */}
    <rect x="30" y="120" width="15" height="40" fill="#2196f3" />
    <rect x="55" y="80" width="15" height="80" fill="#f44336" />
    <rect x="80" y="100" width="15" height="60" fill="#4caf50" />
    <rect x="105" y="70" width="15" height="90" fill="#ff9800" />
    <rect x="130" y="90" width="15" height="70" fill="#9c27b0" />
    <rect x="155" y="110" width="15" height="50" fill="#00bcd4" />

    {/* Arrow showing sort direction */}
    <defs>
      <marker
        id="arrowhead"
        markerWidth="10"
        markerHeight="10"
        refX="9"
        refY="3"
        orient="auto"
      >
        <polygon points="0 0, 10 3, 0 6" fill="#2196f3" />
      </marker>
    </defs>
    <path
      d="M 20 170 L 175 170"
      stroke="#2196f3"
      strokeWidth="2"
      markerEnd="url(#arrowhead)"
    />
    <text x="100" y="190" textAnchor="middle" fontSize="12" fill="#666">
      Sorting
    </text>
  </svg>
);

const HomeComponent = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="home-title">Algorithm Visualizer</h1>
        <p className="home-subtitle">
          Interactive visualization of sorting and searching algorithms
        </p>
      </header>

      <div className="nav-cards-grid">
        {/* Search Card */}
        <div
          className="nav-card"
          onClick={() => navigate('/search')}
          role="button"
          tabIndex="0"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              navigate('/search');
            }
          }}
        >
          <div className="nav-card-icon">
            <SearchSVG />
          </div>
          <div className="nav-card-content">
            <h2>Search Algorithms</h2>
            <p>
              Explore pathfinding algorithms like BFS and DFS on a 2D grid with
              obstacles.
            </p>
            <ul className="feature-list">
              <li>Breadth-First Search (BFS)</li>
              <li>Depth-First Search (DFS)</li>
              <li>Custom grid size & obstacles</li>
            </ul>
          </div>
          <div className="nav-card-arrow">→</div>
        </div>

        {/* Sort Card */}
        <div
          className="nav-card"
          onClick={() => navigate('/sort')}
          role="button"
          tabIndex="0"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              navigate('/sort');
            }
          }}
        >
          <div className="nav-card-icon">
            <SortSVG />
          </div>
          <div className="nav-card-content">
            <h2>Sorting Algorithms</h2>
            <p>
              Visualize how different sorting algorithms organize data in
              real-time.
            </p>
            <ul className="feature-list">
              <li>Quick Sort</li>
              <li>Merge Sort</li>
              <li>Insertion & Selection Sort</li>
            </ul>
          </div>
          <div className="nav-card-arrow">→</div>
        </div>
      </div>

      <footer className="home-footer">
        <p>
          Learn algorithms by seeing them in action. Choose a topic to get
          started!
        </p>
      </footer>
    </div>
  );
};

export default HomeComponent;