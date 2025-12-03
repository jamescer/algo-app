import './Footer.css';

const FooterComponent = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Algorithm Visualizer</h3>
          <p>Learn algorithms through interactive visualizations</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/search">Search</a>
            </li>
            <li>
              <a href="/sort">Sort</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Resources</h4>
          <ul>
            <li>
              <a href="#">Documentation</a>
            </li>
            <li>
              <a href="#">GitHub</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {currentYear} Algorithm Visualizer. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default FooterComponent;
